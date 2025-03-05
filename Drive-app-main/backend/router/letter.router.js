import { Router } from "express";
import { isAuth } from "../middleware/auth.js";
import { getLetter, saveLetter } from "../controller/letter.controller.js";

const letterRouter = Router();

letterRouter.post('/save', isAuth, saveLetter);
letterRouter.get('/', isAuth, getLetter)

export default letterRouter;