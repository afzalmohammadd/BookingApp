import express from "express"
import { createUser,updateUser, deleteUser,getUser,getUsers } from "../controllers/user.js"
import { verifyToken, verifyUser ,verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkauthentication", verifyToken,(req,res,next)=>{
//     res.send("hello user, you are logged in")
//     next()
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account")
//     next()
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin, you are logged in and you can delete all accounts")
//     next()
// })

// UPDATE
router.put("/:id",verifyUser, updateUser)
 
// DELETE
router.delete("/:id",verifyUser, deleteUser)

// GET
router.get("/:id",verifyUser, getUser)

// GET ALL
router.get("/",verifyAdmin, getUsers)

export default router