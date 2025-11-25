import { Router } from 'express';
import { adminRegister } from '../controller/user.controller';
const router = Router();

router.post('/login', adminRegister);


export default router;
