import {Router} from "express";
import {createTransaction} from "../services/midtrans.js";
import cors from "cors";

const router = Router();

router.post("/checkout", createTransaction);

export default router;