import mongoose from 'mongoose';
const { Schema } = mongoose;

// Sub-document l-dwa
const medicationSchema = new Schema({
    medicament: {
        type: String,
        required: true,
    },
    dosage: {
        type: String, // e.g., "100mg"
    },
    frequence: {
        type: String, // e.g., "2 fois/jour"
    },
    duree: {
        type: String, // e.g., "7 jours"
    },
}, { _id: false });

const prescriptionSchema = new Schema(
    {
        // IMPORTANT: IDs mn CliniqueService DB, bla 'ref'
        patientId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        medecinId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        // Hna nqdrou ndiro 'ref' 7it Pharmacie kayna f nafs l-DB
        pharmacyId: {
            type: Schema.Types.ObjectId,
            ref: 'Pharmacie',
            nullable: true, // L-patient yقدر ykhtar l-pharmacie mn be3d
        },
        status: {
            type: String,
            enum: ['draft', 'signed', 'sent', 'dispensed'],
            default: 'draft',
        },
        medications: [medicationSchema], // Array dyal les médicaments
    },
    { timestamps: true }
);

export default mongoose.model('Prescription', prescriptionSchema);