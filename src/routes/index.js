import { Router } from 'express';
import pharmacyController from '../controllers/index.js'

const router = Router()

router.get("/", (req, res) => {
    res.send("______Pharmacy Service API is running 🚀");
});

// { "method": "POST", "route": "/prescriptions", "description": "Prescrire un médicament (Médecin)" },
router.post("/prescription", pharmacyController.createPrescriptions);

// { "method": "POST", "route": "/parmacy", "description": "Create un Parmacy (admin)" },
router.post("/pharmacy", pharmacyController.createParmacy);

// { "method": "PUT", "route": "/prescriptions/{id}/sign", "description": "Signer une prescription (Médecin)" },
router.put("/prescriptions/:id/sign", pharmacyController.signPrescriptions);

// { "method": "PUT", "route": "/prescriptions/{id}/assign", "description": "Assigner une prescription à une pharmacie (Médecin/Patient)" },
router.put("/prescriptions/:id/assign", pharmacyController.assignPrescriptionToPharmacy);

// { "method": "PUT", "route": "/prescriptions/{id}/dispense", "description": "Mettre à jour le statut de remise (Pharmacien)" },
router.put("/prescriptions/:id/dispense", pharmacyController.dispensePrescription);


// { "method": "GET", "route": "/pharmacies", "description": "Lister les pharmacies partenaires" },
router.get("/pharmacies", pharmacyController.getPharmacies); 



export default router;