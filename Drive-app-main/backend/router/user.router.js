import { Router } from "express";
import { callBackFuntion, googleAuthentication } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get('/signup', googleAuthentication);
userRouter.get('/signup/callback', callBackFuntion);

export default userRouter;
