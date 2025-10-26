import Pharmacy from '../models/pharmacieModel.js';
import Prescription from '../models/prescriptionModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const createParmacy = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const exists = await Pharmacy.findOne({ identifiant: payload.identifiant });
  if (exists) return next(new AppError('Pharmacie avec cet identifiant existe déjà', 409, 'VALIDATION_ERROR'));

  const pharmacy = await Pharmacy.create(payload);
  res.status(201).json({ success: true, message: 'Pharmacie créée', data: pharmacy });
});

const createPrescriptions = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const prescriptions = await Prescription.create(payload);
  res.status(201).json({ success: true, message: 'Prescroption créé avec succeé', data: prescriptions });
});


const signPrescriptions = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const prescription = await Prescription.findOneAndUpdate(
    { _id: id },
    { $set: { status: 'signed' } },
    { new: true }
  );

  if (!prescription)
    return next(new AppError("Prescription n'existe pas !!", 404, 'NOT_FOUND'));

  res.status(200).json({
    success: true,
    message: 'Prescription signée avec succès',
    data: prescription
  });
});


const assignPrescriptionToPharmacy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { pharmacyId } = req.body;

  const prescription = await Prescription.findByIdAndUpdate(
    id,
    { pharmacyId },
    { new: true }
  );

  if (!prescription)
    return next(new AppError("Prescription n'existe pas !", 404));

  res.status(200).json({
    success: true,
    message: "Prescription assignée à la pharmacie",
    data: prescription,
  });
});

const dispensePrescription = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const prescription = await Prescription.findOneAndUpdate(
    { _id: id },
    { $set: { status: 'dispensed' } },
    { new: true }
  );

  if (!prescription)
    return next(new AppError("Prescription n'existe pas !", 404));

  res.status(200).json({
    success: true,
    message: "Prescription marquée comme dispensée",
    data: prescription,
  });
});

const getPharmacies = catchAsync(async (req, res, next) => {

  const pharmacies = await Pharmacy.find();

  if (!pharmacies || pharmacies.length === 0)
    return next(new AppError("Aucune pharmacie trouvée !", 404, 'NOT_FOUND'));

  res.status(200).json({
    success: true,
    message: "pharmacies recuperées avec succès",
    data: pharmacies,
  });
});


export default {
  createParmacy,
  signPrescriptions,
  createPrescriptions,
  assignPrescriptionToPharmacy,
  dispensePrescription,
  getPharmacies
};