import{Router} from "express";
import {registeruser} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();

//here we are inserting middleware 
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),

    registeruser)
    
export default router;

