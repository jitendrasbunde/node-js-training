const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const db = require('./dbConnect');


const username=process.env.USERNAME;
const password=process.env.PASSWORD;

console.log(username+"  "+password);

router.post('/add',function (req,res) {
  console.log(req.body);

  db.get().collection('user').insertOne(req.body, function(err, res) 
  {    
    if (err) 
    { //if inserting data fails
      console.log(err);
    }
    console.log("1 document inserted");

  });

  res.json({'url':'`json object sended`'});
});

router.put('/update/:name_a',function (req,res) {
  console.log(req.params.name_a);
  let selectInfo= { name:req.params.name_a}
  let updateInfo= { $set: req.body };
  console.log(selectInfo)
  console.log(updateInfo)
  db.get().collection('user').updateOne(selectInfo,updateInfo, function(err, res) {
    if (err){
      console.log(err)
    }
    console.log("document updated");
  });
  res.json({'url':'`json object sended`'});
});

router.delete('/delete/:name',function (req,res) {
  console.log(req.body);
  var myquery = {name :req.params.name}
  console.log(req.params.name); 
  db.get().collection('user').deleteOne(myquery, function(err, obj) {
    if (err){
      console.log(err);
    }
    console.log("1 document deleted");
  });

  res.json({'url':'`json object sended`'});
});

router.get('/list',function (req,res) {
  console.log(req.body);

  db.get().collection("user").find({}).toArray(function(err, result) {
    if (err){
      console.log(err);
    }
    console.log(result);
    res.json(result)
  });
});

module.exports = router;

