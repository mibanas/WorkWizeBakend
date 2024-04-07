const RelanceRecruteur = require('../models/RelanceRecruteur');

class RelanceRecruteurController {
    async createRelanceRecruteur(req, res) {
        try {
            const newRelanceRecruteur = await RelanceRecruteur.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Relance de recruteur créée avec succès',
                data: newRelanceRecruteur
            });
        } catch (error) {
            console.error('Erreur lors de la création de la relance de recruteur :', error);
            res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }

    async getAllRelancesRecruteur(req, res) {
        try {
            const relancesRecruteur = await RelanceRecruteur.find();
            res.status(200).json({
                success: true,
                data: relancesRecruteur
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des relances de recruteur :', error);
            res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }

    async getRelanceRecruteurById(req, res) {
        const { id } = req.params;
        try {
            const relanceRecruteur = await RelanceRecruteur.findById(id);
            if (!relanceRecruteur) {
                return res.status(404).json({
                    success: false,
                    error: 'Relance de recruteur non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                data: relanceRecruteur
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de la relance de recruteur :', error);
            res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }

    async updateRelanceRecruteur(req, res) {
        const { id } = req.params;
        try {
            const updatedRelanceRecruteur = await RelanceRecruteur.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedRelanceRecruteur) {
                return res.status(404).json({
                    success: false,
                    error: 'Relance de recruteur non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Relance de recruteur mise à jour avec succès',
                data: updatedRelanceRecruteur
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la relance de recruteur :', error);
            res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }

    async deleteRelanceRecruteur(req, res) {
        const { id } = req.params;
        try {
            const deletedRelanceRecruteur = await RelanceRecruteur.findByIdAndDelete(id);
            if (!deletedRelanceRecruteur) {
                return res.status(404).json({
                    success: false,
                    error: 'Relance de recruteur non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Relance de recruteur supprimée avec succès'
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la relance de recruteur :', error);
            res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }
}

module.exports = new RelanceRecruteurController();
 