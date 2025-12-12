import express from "express"
import { me, signin, signout, signup } from "../controllers/auth.controllers.js";

const authRouter = express.Router();


authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.post("/signout", signout)
authRouter.get("/me", me)

export default authRouter;