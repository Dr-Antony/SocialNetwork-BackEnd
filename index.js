import express from "express";
import mongoose from "mongoose";
import cors from "cors";



import { authMe, login, registration } from "./Controllers/UserController.js";
import { registerValidation, handleValidationErrors } from "./Validation/RegisterValidator.js";
import { loginValidation } from "./Validation/LoginValidation.js";
import checkAuthMe from "./Controllers/Utils/checkAuthMe.js";

mongoose.connect('mongodb+srv://admin:12345@cluster0.aebkplr.mongodb.net/SocialNetwork?').then(() => { console.log('DB has been connected!') }).catch((err) => { console.log(err) })


const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());


app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Port has been connected!")
});



app.post('/auth/register',registerValidation, handleValidationErrors, registration)
app.post('/auth/login', loginValidation, handleValidationErrors,login)
app.get('/auth/me', checkAuthMe, authMe)