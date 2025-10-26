import mongoose from 'mongoose';

const coordonneesSchema = new mongoose.Schema({
  adresse: { type: String, required: true },
  ville: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const pharmacySchema = new mongoose.Schema(
  {
    identifiant: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    coordonnees: { type: coordonneesSchema, required: true },
    horaires: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Pharmacy', pharmacySchema);
