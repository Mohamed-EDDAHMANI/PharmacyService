const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Had l-model dyal l-pharmacies l-partenaires
const pharmacieSchema = new Schema(
    {
        identifiant: {
            type: String,
            required: true,
            unique: true,
        },
        nom: {
            type: String,
            required: true,
        },
        coordonnees: {
            adresse: String,
            telephone: String,
            email: String,
        },
        horaires: {
            type: String, // e.g., "Lundi-Vendredi: 9h-18h"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Pharmacie', pharmacieSchema);