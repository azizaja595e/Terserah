import {Router} from "express";
import {createTransaction} from "../services/midtrans.js";
import cors from "cors";
import { handleNotification } from "../services/midtrans.js";

const router = Router();

router.post("/checkout", createTransaction);

router.post("/notification", handleNotification);

export default router;