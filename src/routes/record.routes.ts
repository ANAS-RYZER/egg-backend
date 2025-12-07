import { Router } from 'express';
import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} from '../controller/record.controller';

const router = Router({ mergeParams: true }); // important to access farmId from parent

// POST   /api/farms/:farmId/records
router.post('/', createRecord);


// GET    /api/farms/:farmId/records
router.get('/', getRecords);

// GET    /api/farms/:farmId/records/:recordId
router.get('/:recordId', getRecordById);

// PUT    /api/farms/:farmId/records/:recordId
router.put('/:recordId', updateRecord);

// DELETE /api/farms/:farmId/records/:recordId
router.delete('/:recordId', deleteRecord);

export default router;
