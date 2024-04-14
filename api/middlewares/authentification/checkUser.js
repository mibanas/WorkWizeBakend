const User = require('../../models/authentification/userModel');

const checkUser = async (req, res, next) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: 'User already exists' 
            })
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        })
    }
    
    next()
}

module.exports = checkUser;
