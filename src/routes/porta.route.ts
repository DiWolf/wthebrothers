import { HomeController} from '@controllers/home.controller'
import { Router } from 'express';

const router = Router();
const homeCtrl = new HomeController(); 

router.get("/", homeCtrl.home);
router.get('/contacto',homeCtrl.contact);
router.get('/galeria', homeCtrl.galeria);
router.post("/api/contact", homeCtrl.contactSubmit); // <-- nueva
export default router;