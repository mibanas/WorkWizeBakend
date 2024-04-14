const User = require('../../models/authentification/userModel')
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

class Authentification {
    register = async (req, res) => {
        const { first_name, last_name, email, password } = req.body;
        try {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({ 
                first_name, 
                last_name, 
                email, 
                password : hashPassword,
                uuid: uuidv4()
            })

            const activationLink = `http://localhost:3000/validate/${newUser.uuid}`
            
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass:  process.env.EMAIL_PASSWORD
                }
            })

            // Envoyer un e-mail de notification
            const sendMail = await transporter.sendMail({
                from: process.env.EMAIL,
                to: process.env.EMAIL,
                subject: 'Confirmation d\'inscription',
                text: `Bonjour ${first_name}, cliquez sur le lien suivant pour activer votre compte : ${activationLink}`
            })

            return res.status(201).json({ 
                success: true, 
                message: 'Utilisateur créé avec succès', 
                user: newUser 
            });
        } catch (error) {
            console.log("🚀 ~ Erreur lors de l\'enregistrement de l\'utilisateur= ~ error:", error)
            return res.status(500).json({ 
                success: false, 
                error: 'Erreur lors de l\'enregistrement de l\'utilisateur' 
            });
        }
    }

    validate = async (req ,res) => {
        
        const uuid = req.params.uuid

        try {
            const user = await User.findOne({ uuid : uuid });
            console.log("🚀 ~ Authentification ~ validate= ~ user:", "1")

            if (!user) {
                return res.status(400).json({
                success: false,
                message: 'Invalid uuid or activation link'
              })
            }
            
            console.log("🚀 ~ Authentification ~ validate= ~ user:", "2")

            // Check if user is already activated (optional)
            if (user.compte_active) {
                console.log("🚀 ~ Authentification ~ validate= ~ user.compte_active:", user.compte_active)
                
                return res.status(400).json({
                    success: false,
                    message: 'User account already activated'
              })
            }
            
            console.log("🚀 ~ Authentification ~ validate= ~ user:", "3")

            // Update user to activated state
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { compte_active: true },
                { new: true }
            )
            // console.log("🚀 ~ Authentification ~ validate= ~ updatedUser:", updatedUser)
            console.log("🚀 ~ Authentification ~ validate= ~ user:", "4")
        
            return res.status(200).json({
                success: true,
                message: 'Account activation successful',
                user: updatedUser
            })


          } catch (error) {
                console.error("🚀 ~ eror during account validation:", error.message)
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
            })
          }
    }

    login = async (req, res) => {
        console.log('login');

        const { password } = req.body
        const user = req.user
        try {
                        
            // Vérifier le mot de passe
            if (!(await bcrypt.compare(password, user.password))) {
                // Incrémenter le nombre de tentatives de connexion
                await User.findByIdAndUpdate(user._id, { 
                    signup_attempts: user.signup_attempts + 1
                });

                return res.status(401).json({ 
                    success: false, 
                    error: 'Email or password is incorrect' 
                });
            }
    
            // Générer un token JWT
            const accessToken = jwt.sign({ 
                id: user._id, 
                email: user.email 
            }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '7d' })
    
            // Générer un refresh token JWT
            const refreshToken = jwt.sign({ 
                id: user._id, 
                email: user.email 
            }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' })
    
            // Ajouter le refresh token à la liste des tokens de l'utilisateur et mettre à jour en base
            const updatedUser = await User.findByIdAndUpdate(user._id, { 
                    accessToken: accessToken, 
                    refreshToken: refreshToken,
                    signup_attempts: 0, 
                    lockout_until: null
                } 
            , { new: true });
                
            return res.status(200).json({ 
                success: true, 
                message: 'Authentication successful', 
                token: accessToken,
                refreshToken: refreshToken,
                user : updatedUser
            })
        } catch (error) {
            console.error('Error during login:', error)
            return res.status(500).json({ 
                success: false, 
                error: 'Internal server error' 
            })
        }
    }
    
}

module.exports = new Authentification()