import { HomeController} from '@controllers/home.controller'
import { Router } from 'express';

const router = Router();
const homeCtrl = new HomeController(); 

router.get("/", homeCtrl.home);

export default router;