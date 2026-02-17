import {prisma} from "../config/db.js";
import bcrypt from "bcrypt";

const register= async (req,res) =>{
    res.send("register route");
}

export {register};  