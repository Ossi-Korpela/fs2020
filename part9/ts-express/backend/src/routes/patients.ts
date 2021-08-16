import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('patients');
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entryObj: unknown = req.body;
  const newEntry = patientService.addEntry({id, entryObj});
  res.json(newEntry);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(patientService.getPatientById(id));
});

router.post('/', (req, res) => {
  const patientObj: unknown = req.body;
  const newDiaryEntry = patientService.addPatientEntry(patientObj);
  res.json(newDiaryEntry); 
});

export default router;