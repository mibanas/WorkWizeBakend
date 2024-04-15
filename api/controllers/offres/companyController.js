const offreModel = require('../../models/offres/offreModel')
const companyModel = require('../../models/offres/companyModel')

class CompanyController {
    async createCompany(req, res) {
        const { offerId } = req.params;
        try {
            const { companyName, city, email, phone, website } = req.body;
            
            // Créer une nouvelle entreprise
            const newCompany = await companyModel.create({ 
                companyName, 
                city, 
                email, 
                phone, 
                website 
            });
    
            // Mettre à jour l'offre avec l'ID de la nouvelle entreprise
            const updatedOffer = await offreModel.findByIdAndUpdate(offerId, {
                company: newCompany._id
            }, { new: true });
    
            return res.status(201).json({ 
                success: true, 
                data: { 
                    company: newCompany, 
                    offer: updatedOffer
                }
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    }
    

    async getCompanies(req, res) {
        try {
            const companies = await companyModel.find({ isDeleted : false })     
            return res.status(200).json({
                success: true,
                data: companies
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur interne du serveur'
            });
        }
    }
    

    async updateCompany(req, res) {
        try {
            const { id } = req.params;
            const { companyName, city, email, phone, website } = req.body
    
            const updateFields = {}
            if (companyName) updateFields.companyName = companyName
            if (city) updateFields.city = city
            if (email) updateFields.email = email
            if (phone) updateFields.phone = phone
            if (website) updateFields.website = website
    
            const updatedCompany = await companyModel.findByIdAndUpdate(
                id, 
                updateFields, 
                { new: true }
            )
    
            if (!updatedCompany) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Entreprise non trouvée' 
                })
            }
    
            return res.status(200).json({ 
                success: true, 
                data: updatedCompany 
            })
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                error: error.message 
            })
        }
    }
    
    async deleteCompany(req, res) {
        try {
            const { id } = req.params;
            const deletedCompany = await companyModel.findByIdAndDelete(id);
    
            if (!deletedCompany) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Company not found' 
                })
            }
    
            return res.status(200).json({ 
                success: true, 
                message: 'Company deleted successfully' 
            })
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    }
    
}

module.exports = new CompanyController();
