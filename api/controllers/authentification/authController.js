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

            const activationLink = `http://localhost:${process.env.PORT}/api/v1/auth/validate/${newUser.uuid}`
            
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

            if (!user) {
                return res.status(400).json({
                success: false,
                error: 'Invalid uuid or activation link'
              })
            }
        
            // Check if user is already activated (optional)
            if (user.compte_active) {
                return res.status(400).json({
                    success: false,
                    error: 'User account already activated'
              })
            }
        
            // Update user to activated state
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { compte_active: true },
                { new: true }
            )
        
            return res.status(200).json({
                success: true,
                message: 'Account activation successful',
                user: updatedUser
            })
          } catch (error) {
                console.error("🚀 ~ eror during account validation:", error.message)
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error'
            })
          }
    }

    login = async (req, res) => {
    }
}

module.exports = new Authentification()