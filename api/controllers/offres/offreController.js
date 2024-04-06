const offreModel = require('../../models/offres/offreModel')
const OfferStatus = require('../../utils/offreStatus')


class offreController {
    addOffer = async (req, res) => {

        const { title, description, link, publicationDate, source } = req.body;
    
        try {
            const newOffer = await offreModel.create({
                userId : req.user.id,
                title,
                description,
                link,
                publicationDate,
                source,
                status : OfferStatus.PREPARATION
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
                .populate('recruiters')
                .exec()
            
            return res.status(200).json({
                success: true,
                data: offers
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }
    
}

module.exports = new offreController()
