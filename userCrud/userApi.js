const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const User = require('./userClass');
const tempUser = new User();
const db = require('./dbConnect');

const username=process.env.USERNAME;
const password=process.env.PASSWORD;

console.log(username+"  "+password);

router.post('/add',function (req,res) {
  console.log(req.body);
  if(!tempUser.emailExists(req.body.email)){
    res.sendStatus(422);
  }else{
    let newUser = new User(req.body); 
    if(newUser.validate()){
      db.get().collection('user').insertOne(req.body, function(err, res) 
      {    
        if (err) 
        { //if inserting data fails
          console.log(err);
        }
        console.log("1 document inserted");

      });
      res.sendStatus(201);
    }else
      res.sendStatus(406);
  }  
});

router.put('/update/:name',function (req,res) {
  console.log(req.params.name);
  let selectInfo= { name:req.params.name}
  let updateInfo= { $set: req.body };
  console.log(selectInfo);
  console.log(updateInfo);
  if(tempUser.nameValidate(req.params.name)){
    tempUser.nameExists(req.params.name,()=>{
      db.get().collection('user').updateMany(selectInfo,updateInfo, function(err, result) {
        if (err){
          console.log(err)
        }
        console.log("document updated");
        res.sendStatus(202);
      });
    })
  }else
    res.sendStatus(404);
});

router.delete('/delete/:name',function (req,res) {
  var myquery = {name :req.params.name}
  console.log(req.params.name);
  if(tempUser.nameValidate(req.params.name)){ 
    db.get().collection('user').deleteOne(myquery, function(err, obj) {
      if (err){
        console.log(err);
      }
      console.log("1 document deleted");
    });
    res.sendStatus(200)
  }else
    res.sendStatus(406)
});

router.get('/',function (req,res) {
  console.log(req.body);

  db.get().collection("user").find().toArray(function(err, result) {
    if (err){
      console.log(err);
    }
    console.log(result);
    res.json(result)
  });
  res.sendStatus(200);
});

module.exports = router;

