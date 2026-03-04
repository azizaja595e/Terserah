import {Router} from "express";
import {createTransaction} from "../services/midtrans.js";

const router = Router();

router.post("/checkout", createTransaction);

export default router;