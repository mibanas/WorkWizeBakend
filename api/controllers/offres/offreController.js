const offreModel = require('../../models/offres/offreModel')
const OfferStatus = require('../../utils/offreStatus')
const statusModel = require('../../models/status/statusModel')

const OfferStatusNum = {
    0: 'Préparation',
    1: 'Candidature soumise',
    2: 'Relance en attente',
    3: 'Relance après soumission',
    4: 'Entretien(s)',
    5: 'Remerciement après entretien',
    6: 'En attente de décision',
    7: 'Résultat final'
  };

class offreController {
    addOffer = async (req, res) => {
        const { title, description, link, publicationDate, source } = req.body;
    
        try {

            const addStatus = await statusModel.create({
                name : OfferStatus.PREPARATION,
                date : new Date()
            })

            const newOffer = await offreModel.create({
                userId : req.user.id,
                title,
                description,
                link,
                publicationDate,
                source,
                status : addStatus._id
            });
    
            return res.status(201).json({
                success: true,
                message: 'Offre d\'emploi ajoutée avec succès',
                data: newOffer
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'offre d\'emploi:', error);
            return res.status(500).json({
                success: false,
                erreur : error.message,
                error: 'Erreur interne du serveur'
            });
        }    
    }

    // Méthode pour récupérer une offre d'emploi par son ID
    getOfferById = async (req, res) => {
        const { id } = req.params;
        try {
            const offer = await offreModel.findById(id)
                .populate('company')
                .populate('recruiters')
                .populate('status')
            
            if (!offer) {
                return res.status(404).json({
                    success: false,
                    error: 'Offre d\'emploi non trouvée'
                });
            }
            return res.status(200).json({
                success: true,
                data: offer
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'offre d\'emploi:', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }

    // Méthode pour mettre à jour une offre d'emploi
    updateOffer = async (req, res) => {
        const { id } = req.params;
        const { title, description, link, publicationDate, source } = req.body;
        const updateFields = {};
    
        // Filtrer les champs vides
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (link) updateFields.link = link;
        if (publicationDate) updateFields.publicationDate = publicationDate;
        if (source) updateFields.source = source;
    
        try {
            const updatedOffer = await offreModel.findByIdAndUpdate(id, updateFields, { new: true });
    
            if (!updatedOffer) {
                return res.status(404).json({
                    success: false,
                    error: 'Offre d\'emploi non trouvée'
                });
            }
    
            return res.status(200).json({
                success: true,
                message: 'Offre d\'emploi mise à jour avec succès',
                data: updatedOffer
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'offre d\'emploi:', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }

    // Méthode pour supprimer une offre d'emploi
    deleteOffer = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedOffer = await offreModel.findByIdAndUpdate(id, {
                isDeleted : true
            }, { new: true })
            if (!deletedOffer) {
                return res.status(404).json({
                    success: false,
                    error: 'Offre d\'emploi non trouvée'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Offre d\'emploi supprimée avec succès',
                data: deletedOffer
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'offre d\'emploi:', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }
  
    // Méthode pour récupérer toutes les offres d'emploi avec pagination et filtrage
    getOffers = async (req, res) => {
        const { page, limit } = req.query;
        const userId = req.user.id
        try {
            const limits = limit;
            const skip = (page - 1) * limit
  
            const offers = await offreModel.find({ 
                isDeleted : false,
                userId : userId
            })
                .skip(skip)
                .limit(limits)
                .populate('company')
                .populate('status') 
                .populate('recruiters')
                .exec()
            console.log("🚀 ~ offreController ~ getOffers= ~ offers:", offers)
            
            const totalOffers = await offreModel.countDocuments();
            
            return res.status(200).json({
                success: true,
                data: offers,
                count: totalOffers
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }
    
    changeStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { date } = req.body;
            const status = await statusModel.findById(id);
            if (!status) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Statut non trouvé' 
                });
            }
            
            let currentStatusIndex = Object.values(OfferStatusNum).indexOf(status.name);
            if (currentStatusIndex === -1) {
                return res.status(500).json({ 
                    success: false,
                    message: 'Statut invalide' 
                });
            }
            
            if (currentStatusIndex === 7) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Impossible de changer le statut à partir de "Résultat final"' 
                });
            }
    
            const newStatusName = OfferStatusNum[currentStatusIndex + 1];
    
            const updatedStatus = await statusModel.findByIdAndUpdate(id, {
                name: newStatusName,
                date : date
            }, { new: true });
    
            res.status(200).json({
                success: true,
                message: 'Statut mis à jour avec succès',
                data: updatedStatus
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
};



module.exports = new offreController()
