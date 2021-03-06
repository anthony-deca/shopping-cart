import { Router } from 'express';
import PaymentController from '../../controllers/Payment';
import auth from '../../middleware/auth';

const router: Router = Router();

router.post('/', auth, PaymentController.sendSessionId);
router.get('/webhook', auth, PaymentController.webhook);

export default router;