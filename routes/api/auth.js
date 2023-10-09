import express from 'express';
import { validateBody } from '../../middlewares/validateBody.js';
import { logInSchema, registerSchema } from '../../models/user.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { getCurrent, login, logout, register } from '../../controllers/auth.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), cntrlTryCatchWrapper(register));
router.post('/login', validateBody(logInSchema), cntrlTryCatchWrapper(login));
router.get('/current', authenticate, cntrlTryCatchWrapper(getCurrent));
router.post('/logout', authenticate, cntrlTryCatchWrapper(logout));
export default router;