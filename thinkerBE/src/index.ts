import express from 'express'
import jwt from 'jsonwebtoken'
// import z from "zod"
import { JWT_SECRET } from './config';
import { ContentModel, LinkModel, UserModel } from './db';
import { authMiddleware } from './auth';
import { random } from './random';
import cors from "cors"
import { checkPoint } from './zod';

const app = express();
app.use(express.json())
app.use(cors())
//@ts-ignore
 app.post("/api/v1/signup" , async (req, res)=>{

   const username = req.body.username;
   const password = req.body.password;
   const email = req.body.email;

    const check = checkPoint.safeParse(req.body);

    if (!check.success) { 
      const formattedErrors = check.error.errors.map((error) => ({
        field: error.path[0], 
        message: error.message, 
      }));
  
      return res.status(400).json({
        errors: formattedErrors, 
      });
    }
    try{
      const existingUser = await UserModel.findOne({
        email : email ,
      })
      if(!existingUser){
          await UserModel.create(
            {
              username: username,
              password : password,
              email : email
            })
           return res.json({ 
              message : "enter successfully"
            })  
       }
        else{
           return res.status(401).json({   //frontend errors
            message : "User Already exist with this email id"})
             }     
        }
    catch(e){
           return res.status(403).json({
            message : "signup crashed"
            })
            }
})
 //@ts-ignore
 app.post("/api/v1/signin" , async (req, res)=>{
    const { email , password } = req.body;
    const check = checkPoint.safeParse(req.body);

    if (!check.success) { 
      const formattedErrors = check.error.errors.map((error) => ({
        field: error.path[0], 
        message: error.message, 
      }));
  
      return res.status(400).json({
        errors: formattedErrors, 
      });
    }
  
    const existingUser = await UserModel.findOne({
      email
    })
   try{
    if (!existingUser) {
      return res.status(404).json({
        errors: [
          {
            field: 'email',
            message: 'No user exists with this emailll',  // frontend error
          }, 
        ],
      });
    }
    if (existingUser.password !== password) {
      return res.status(401).json({
        errors: [
          {
            field: 'password',
            message: 'Password does not belong to this email',
          },
        ],
      });
    }
     else{
      const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
    return res.json({
      token,
    });

     }
   }
   catch(e){
    res.status(411).json({
      message : "Login First."
    })
   }
 })
 app.post("/api/v1/content" , authMiddleware ,async (req, res)=>{
      const { link , title } = req.body 
      const type = req.body.type;

       await ContentModel.create({
        link : link,
        title : title,
        type,
        //@ts-ignore
        userId : req.userId
      })
       try{
        res.json({
          message : "content added"
        })
       }
       catch{
        res.status(500).json({
          message : "OOPS.. Something went wrong"
        })
       }


 })
 app.get("/api/v1/content" ,authMiddleware , async (req, res)=>{
  //@ts-ignore
    const userId = req.userId

    const myContent = await ContentModel.find({
      userId : userId
    }).populate("userId", "username")
    try{
      res.json({
        myContent
      })
    }
    catch(e){
      res.status(403).json({
        message : "Can't find the data"
      })

    }

 })
 app.delete("/api/v1/content" ,authMiddleware,  async (req, res)=>{
 
  const contentId = req.body.contentId 

  await ContentModel.deleteOne({
    _id : contentId,
   
    //@ts-ignore
    userId : req.userId
  })
  try{
    res.json({
        message : "Deleted Sucessfully"
    }
    )
  }
  catch(e){
    res.status(500).json({
      message : "something went wrong "
  })
  }
   
 })
 app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {

  const share = req.body.share;

  if (share) {
          const existingLink = await LinkModel.findOne({
            //@ts-ignore
              userId: req.userId
          });

          if (existingLink) {
              res.json({
                  hash: existingLink.hash
              })
              return;
          }
          const hash = random(10);
          await LinkModel.create({
            //@ts-ignore
              userId: req.userId,
              hash: hash
          })

          res.json({
             message : "link created successfully",
             hash
          })
  } else {
      await LinkModel.deleteOne({
            //@ts-ignore
          userId: req.userId
      });

      res.json({
          message: "Removed link"
      })
  }
})
 app.get("/api/v1/think/:shareLink" , async (req, res)=>{
  const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content
       
    })

})

 app.listen(3008)


 