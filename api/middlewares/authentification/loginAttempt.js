const User = require('../../models/authentification/userModel')

const fakeLoginAttempt = async (req, res, next) => {
    const { email } = req.body;

    try {
        // Rechercher l'utilisateur dans la base de données
        const user = await User.findOne({ email });

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email or password is incorrect' 
            });
        }

        // Vérifier si Le compte est activé
        if (!user.compte_active) {
            return res.status(401).json({ 
                success: false, 
                message: 'Votre compte est inactif' 
            });
        }

        // Vérifier si l'utilisateur est bloqué
        if (user.lockout_until) {
            const remainingTime = user.lockout_until - new Date();
            if (remainingTime > 0) {
                // Convertir le temps restant en minutes
                const remainingMinutes = Math.ceil(remainingTime / (1000 * 60));
                return res.status(401).json({ 
                    success: false, 
                    message: `Account locked. Please try again in ${remainingMinutes} minutes.` 
                });
            }
        }

        // Vérifier le nombre de tentatives
        if (user.signup_attempts >= 3) {
            // Bloquer le compte pendant 30 minutes
            const lockoutTime = new Date();
            lockoutTime.setMinutes(lockoutTime.getMinutes() + 30);

            await User.findByIdAndUpdate(user._id, { 
                signup_attempts: 0, 
                lockout_until: lockoutTime 
            });

            return res.status(401).json({ 
                success: false, 
                message: 'Too many login attempts. Account locked for 30 minutes.' 
            });
        }

        // Incrémenter le nombre de tentatives
        await User.findByIdAndUpdate(user._id, { $inc: { signup_attempts: 1 } });

        // Passer l'utilisateur à la prochaine middleware
        req.user = user;
        // req.user = { ...req.user, ...user };

        console.log('here', req.body.password);

        // Continuer avec la tentative de connexion
        next();
    } catch (error) {
        console.error('Error during fake login attempt:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
};

module.exports = fakeLoginAttempt;