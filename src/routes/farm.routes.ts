import { Router } from 'express';
import { addFarm, listFarms , singleFarm } from '../controller/farm.controller';
import recordsRouter from './record.routes';

const router = Router();

router.post('/', addFarm);       // POST /api/farms
router.get('/', listFarms);      // GET  /api/farms
router.use('/:farmId/records', recordsRouter);
router.use('/:farmId',singleFarm )

export default router;
