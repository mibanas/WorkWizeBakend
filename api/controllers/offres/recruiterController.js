const recruiterModel = require('../../models/offres/recruiterModel');
const offreModel = require('../../models/offres/offreModel')

class RecruiterController {
    async createRecruiter(req, res) {
        const listeRecruiters = req.body
        const offreId = req.params.offreId
        // return res.status(201).json(offreId)
        try {
            const recruiters = [];
            const recruitersIds = [];

            for (const recruiterData of listeRecruiters) {
                recruiterData.userId = req.user.id
                const recruiter = await recruiterModel.create(recruiterData);
                recruiters.push(recruiter);
                recruitersIds.push(recruiter._id)
            }

            await offreModel.findByIdAndUpdate(offreId, { $push: { recruiters: { $each: recruitersIds } } });

            return res.status(201).json({ 
                success: true, 
                message: 'Recruteurs créés avec succès', 
                recruiters 
            });
        } catch (error) {
            console.error('Erreur lors de la création des recruteurs :', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Erreur lors de la création des recruteurs',
                error: error.message
            });
        }
    }

    async getAllRecruiters(req, res) {
        try {
            const recruiters = await recruiterModel.find({
                userId : req.user.id
            });
            return res.status(200).json({ 
                success: true, 
                recruiters 
            })
        } catch (error) {
            console.error('Erreur lors de la récupération des recruteurs :', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Erreur lors de la récupération des recruteurs' 
            })
        }
    }

    async getRecruiterById(req, res) {
        const { id } = req.params;
        try {
            const recruiter = await recruiterModel.findById(id)
            if (!recruiter) {
                throw new Error('Recruteur non trouvé')
            }
            return res.status(200).json({ 
                success: true, 
                recruiter 
            })
        } catch (error) {
            console.error('Erreur lors de la récupération du recruteur :', error)
            return res.status(404).json({ 
                success: false, 
                error: 'Recruteur non trouvé' 
            })
        }
    }

    async updateRecruiter(req, res) {
        const { id } = req.params;
        const { fullName, position, phone, email, responsibility, jobOfferPublished } = req.body;
        const updateFields = {};
    
        // Filtrer les champs vides
        if (fullName) updateFields.fullName = fullName;
        if (position) updateFields.position = position;
        if (phone) updateFields.phone = phone;
        if (email) updateFields.email = email;
        if (responsibility) updateFields.responsibility = responsibility;
        if (jobOfferPublished !== undefined) updateFields.jobOfferPublished = jobOfferPublished;
    
        try {
            const updatedRecruiter = await recruiterModel.findByIdAndUpdate(id, updateFields, { new: true });
    
            if (!updatedRecruiter) {
                return res.status(404).json({
                    success: false,
                    error: 'Recruteur non trouvé'
                });
            }
    
            return res.status(200).json({
                success: true,
                message: 'Recruteur mis à jour avec succès',
                data: updatedRecruiter
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du recruteur :', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }
    

    async deleteRecruiter(req, res) {
        const { id } = req.params;
        try {
            const recruiter = await Recruiter.findByIdAndDelete(id);
            if (!recruiter) {
                throw new Error('Recruteur non trouvé');
            }
            return res.status(200).json({ success: true, message: 'Recruteur supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression du recruteur :', error);
            return res.status(404).json({ success: false, error: 'Recruteur non trouvé' });
        }
    }
}

module.exports = new RecruiterController();
