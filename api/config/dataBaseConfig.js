const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }

    async _connect() {
        try {
            await mongoose.connect(process.env.DATABASE_URL, {
                dbName: process.env.DB_NAME
            });
            console.log('Connexion à MongoDB réussie');
        } catch (err) {
            console.error('Erreur de connexion à MongoDB :', err);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('Déconnexion de MongoDB réussie');
        } catch (err) {
            console.error('Erreur lors de la déconnexion de MongoDB :', err);
        }
    }
}

module.exports = new Database();