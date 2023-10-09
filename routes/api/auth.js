import express from 'express';
import { validateBody } from '../../middlewares/validateBody.js';
import { logInSchema, registerSchema } from '../../models/user.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { login, register } from '../../controllers/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), cntrlTryCatchWrapper(register));
router.post('/login', validateBody(logInSchema), cntrlTryCatchWrapper(login));
export default router;