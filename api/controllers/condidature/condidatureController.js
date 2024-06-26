const candidatureModel = require('../../models/condidature/condidatureModel')
const OfferStatus = require('../../utils/offreStatus')
const relanceModel = require('../../models/relance/relanceModel')
const offreModel = require('../../models/offres/offreModel')
const statusModel = require('../../models/status/statusModel')

// Créer une candidature
exports.createCandidature = async (req, res) => {
    const  { modeEnvoi, dateCandidature, cv, lettreMotivation} = req.body
    const offreId = req.params.id
    try {

        const offre = await offreModel.findById(offreId)
            .populate('company')
            .populate('status')
            .populate('recruiters')

        // return res.json(offre.status._id)
        const condidatureData = {}
        if (modeEnvoi) condidatureData.modeEnvoi = modeEnvoi
        if (dateCandidature) {
            condidatureData.dateCandidature = new Date(dateCandidature)
        }
        else {
            condidatureData.dateCandidature = new Date()
        }
        if (cv) condidatureData.cv = cv
        if (lettreMotivation) condidatureData.lettreMotivation = lettreMotivation
        condidatureData.status = OfferStatus.CANDIDATURE_SOUMISE
        if (offreId) condidatureData.offreId = offreId

        const newCandidature = await candidatureModel.create(condidatureData)

        const udpateStatus = await statusModel.findByIdAndUpdate(offre.status._id, {
            name : OfferStatus.CANDIDATURE_SOUMISE
        })

        const addRelance = await relanceModel.create({
            idOffre : offreId,
            dateRelance : condidatureData.dateCandidature + 7,
            status : OfferStatus.RELANCE_EN_ATTENTE
        })


        return res.status(201).json({
            success: true,
            message: 'Candidature créée avec succès',
            data: newCandidature,
            relance : addRelance,
            newStatus : udpateStatus
        })
    } catch (error) {
        console.error('Erreur lors de la création de la candidature :', error);
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        })
    }
}

// Obtenir toutes les candidatures
exports.getAllCandidatures = async (req, res) => {
    try {
        const allCandidatures = await candidatureModel.find();
        return res.status(200).json({
            success: true,
            data: allCandidatures
        })
    } catch (error) {
        console.error('Erreur lors de la récupération des candidatures :', error);
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        })
    }
}

// Obtenir une candidature par son ID
exports.getCandidatureById = async (req, res) => {
    const { id } = req.params;
    try {
        const candidature = await candidatureModel.findById(id);
        if (!candidature) {
            return res.status(404).json({
                success: false,
                error: 'Candidature non trouvée'
            })
        }
        return res.status(200).json({
            success: true,
            data: candidature
        })
    } catch (error) {
        console.error('Erreur lors de la récupération de la candidature :', error);
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        })
    }
}

// Mettre à jour une candidature
exports.updateCandidature = async (req, res) => {
    const  { modeEnvoi, dateCandidature, cv, lettreMotivation} = req.body
    const condidatureId = req.params.id
    try {
        const condidatureData = {}
        if (modeEnvoi) condidatureData.modeEnvoi = modeEnvoi
        if (dateCandidature) condidatureData.dateCandidature = dateCandidature
        if (cv) condidatureData.cv = cv
        if (lettreMotivation) condidatureData.lettreMotivation = lettreMotivation

        const candidature = await candidatureModel.findByIdAndUpdate(
            condidatureId, 
            condidatureData, 
            { new: true }
        )

        if (!candidature) {
            return res.status(404).json({
                success: false,
                error: 'Candidature non trouvée'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Candidature mise à jour avec succès',
            data: candidature
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la candidature :', error);
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        });
    }
};

// Supprimer une candidature
exports.deleteCandidature = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCandidature = await candidatureModel.findByIdAndDelete(id);
        if (!deleteCandidature) {
            return res.status(404).json({
                success: false,
                error: 'Candidature non trouvée'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Candidature supprimée avec succès'
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de la candidature :', error);
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        });
    }
};
