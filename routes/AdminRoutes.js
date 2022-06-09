import express from "express";
import AdminModel from "../models/AdminModel.js";
import  bcrypt from 'bcrypt';
import {create, login, changePassword} from  '../middlewares/validate.js';
import {stringtoLowerCaseSpace, stringSpace} from '../middlewares/utils.js';
import {role} from '../middlewares/variables.js'

const route = express.Router();


//login
route.post('/signin', async(req, res) => {
    let body = req.body;
    body = {
      ...body,
      role: stringtoLowerCaseSpace(body.role)
    }
    const {error} = login.validate(body);
    if(error){
     return   res.send({ error: error.details[0].message})
    }

    AdminModel.findOne({
      userID: body.userID,
      role: body.role
      }).then((user) => {
       if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
             return  res.json({success: true, admin: user})
          } 
          else {
             return res.json({ error: 'Wrong Password or admin ID' })
          }
      } 
      else {
         return res.json({ error: 'Wrong Password or admin ID' })
      }
    }).catch(err => {
      console.log(err)
    })
  
  })
  
  




//change password
route.put('/changePassword/:id', async(req, res )=> {
    const {error} = changePassword.validate(req.body);
    if(error) {
        return  res.json({success: false, error : error.details[0].message})
    }
    AdminModel.findOne({_id:  req.params.id}).then(user => {
      if(user){
        if (bcrypt.compareSync(req.body.oldPassword, user.password)){
              bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if(err){
                  console.log("err")
                  return res.json( { success: false, error: err })
                }
                AdminModel.findOneAndUpdate({
                  adminID: req.params.id
                },{password: hash}, {
                     new: true
                })
                .then(doc => {
                     return res.json({success: true, message: "Password successfully changed"})
                  })
                .catch(e => {
                  console.log("e")
                    return res.json( { success: false, error: e + "e"})
                })
            })  
        }
        else{
            return res.json( { success: false, error: "Wrong old password"})
        }
      }
      else{
        return res.json({success: false, error: "admin does not exist"})
      }
    })
  })

  


export default route;