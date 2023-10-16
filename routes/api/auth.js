import express from 'express';
import { validateBody } from '../../middlewares/validateBody.js';
import { logInSchema, patchSubscriptionSchema, registerSchema } from '../../models/user.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { getCurrent, login, logout, patchSubscription, register } from '../../controllers/auth.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { isEmptyBody } from '../../middlewares/isEmptyBody.js';
const router = express.Router();

router.post('/register', isEmptyBody, validateBody(registerSchema), cntrlTryCatchWrapper(register));
router.post('/login', isEmptyBody, validateBody(logInSchema), cntrlTryCatchWrapper(login));
router.get('/current', authenticate, cntrlTryCatchWrapper(getCurrent));
router.post('/logout', authenticate, cntrlTryCatchWrapper(logout));
router.patch('/', authenticate, isEmptyBody, validateBody(patchSubscriptionSchema), cntrlTryCatchWrapper(patchSubscription))

export default router;