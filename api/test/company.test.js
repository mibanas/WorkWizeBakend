const { createCompany, getCompanies, deleteCompany, updateCompany } = require('../controllers/offres/companyController');
const companyModel = require('../models/offres/companyModel');
const offreModel = require('../models/offres/offreModel');

jest.mock('../models/offres/companyModel');
jest.mock('../models/offres/offreModel');

describe('createCompany', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new company and update the offer with the company ID', async () => {
    // Arrange
    const req = {
      params: { offerId: 'offerId123' },
      body: {
        companyName: 'New Company',
        city: 'City',
        email: 'company@example.com',
        phone: '1234567890',
        website: 'http://example.com'
      }
    };
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    };
    const mockNewCompany = { 
      _id: 'companyId123', 
      companyName: 
      req.body.companyName, 
      city: req.body.city, 
      email: req.body.email, 
      phone: req.body.phone, 
      website: req.body.website 
    };
    const mockUpdatedOffer = { 
      _id: 'offerId123', 
      company: 'companyId123' 
    };

    companyModel.create.mockResolvedValueOnce(mockNewCompany);
    offreModel.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedOffer);

    // Act
    await createCompany(req, res);

    // Assert
    expect(companyModel.create).toHaveBeenCalledWith({ companyName: req.body.companyName, city: req.body.city, email: req.body.email, phone: req.body.phone, website: req.body.website });
    expect(offreModel.findByIdAndUpdate).toHaveBeenCalledWith('offerId123', { company: 'companyId123' }, { new: true });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: { company: mockNewCompany, offer: mockUpdatedOffer } });
  });

  it('should return a 500 status and an error message if an error occurs', async () => {
    // Arrange
    const req = {
      params: { offerId: 'offerId123' },
      body: {
        companyName: 'New Company',
        city: 'City',
        email: 'company@example.com',
        phone: '1234567890',
        website: 'http://example.com'
      }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const errorMessage = 'An error occurred';
    companyModel.create.mockRejectedValueOnce(new Error(errorMessage));

    // Act
    await createCompany(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: errorMessage });
  });
});

describe('getCompanies', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return a list of companies', async () => {
      // Arrange
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockCompanies = [{ name: 'Company 1' }, { name: 'Company 2' }];
  
      companyModel.find.mockResolvedValueOnce(mockCompanies);
  
      // Act
      await getCompanies(req, res);
  
      // Assert
      expect(companyModel.find).toHaveBeenCalledWith({ isDeleted: false });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCompanies });
    });
  
    it('should return a 500 status and an error message if an error occurs', async () => {
      // Arrange
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = 'An error occurred';
      companyModel.find.mockRejectedValueOnce(new Error(errorMessage));
  
      // Act
      await getCompanies(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Erreur interne du serveur' });
    });
  });
  

  describe('updateCompany', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update an existing company', async () => {
      // Arrange
      const req = {
        params: { id: 'companyId123' },
        body: {
          companyName: 'New Company Name',
          city: 'New City',
          email: 'new@example.com',
          phone: '9876543210',
          website: 'http://newexample.com'
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockUpdatedCompany = { _id: 'companyId123', companyName: req.body.companyName, city: req.body.city, email: req.body.email, phone: req.body.phone, website: req.body.website };
  
      companyModel.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedCompany);
  
      // Act
      await updateCompany(req, res);
  
      // Assert
      expect(companyModel.findByIdAndUpdate).toHaveBeenCalledWith('companyId123', {
        companyName: req.body.companyName,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website
      }, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUpdatedCompany });
    });
  
    it('should return a 404 status if the company is not found', async () => {
      // Arrange
      const req = {
        params: { id: 'companyId123' },
        body: {
          companyName: 'New Company Name',
          city: 'New City',
          email: 'new@example.com',
          phone: '9876543210',
          website: 'http://newexample.com'
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      companyModel.findByIdAndUpdate.mockResolvedValueOnce(null);
  
      // Act
      await updateCompany(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Entreprise non trouvée' });
    });
  
    it('should return a 500 status and an error message if an error occurs', async () => {
      // Arrange
      const req = {
        params: { id: 'companyId123' },
        body: {
          companyName: 'New Company Name',
          city: 'New City',
          email: 'new@example.com',
          phone: '9876543210',
          website: 'http://newexample.com'
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = 'An error occurred';
      companyModel.findByIdAndUpdate.mockRejectedValueOnce(new Error(errorMessage));
  
      // Act
      await updateCompany(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: errorMessage });
    });
  });

  describe('deleteCompany', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete an existing company', async () => {
      // Arrange
      const req = { params: { id: 'companyId123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      companyModel.findByIdAndDelete.mockResolvedValueOnce({ _id: 'companyId123' });
  
      // Act
      await deleteCompany(req, res);
  
      // Assert
      expect(companyModel.findByIdAndDelete).toHaveBeenCalledWith('companyId123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Company deleted successfully' });
    });
  
    it('should return a 404 status if the company is not found', async () => {
      // Arrange
      const req = { params: { id: 'companyId123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      companyModel.findByIdAndDelete.mockResolvedValueOnce(null);
  
      // Act
      await deleteCompany(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Company not found' });
    });
  
    it('should return a 500 status and an error message if an error occurs', async () => {
      // Arrange
      const req = { params: { id: 'companyId123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = 'An error occurred';
      companyModel.findByIdAndDelete.mockRejectedValueOnce(new Error(errorMessage));
  
      // Act
      await deleteCompany(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: errorMessage });
    });
  });
  
  