import { NextFunction , Request , Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from 'jsonwebtoken'

function authMiddleware(req : Request , res : Response, next : NextFunction){

    const token = req.headers["token"];

    const decode = jwt.verify(token as string , JWT_SECRET)
    if(decode){
        //@ts-ignore
        req.userId = decode.id
        next()
    }
    else{
        res.status(411).json({
            message : "Please signup first"
        })
    }
}




export {
      authMiddleware
  }