
const db = require('./dbConnect');

module.exports = class User{
  constructor(obj=''){
    this.name = obj.name;
    this.email = obj.email;
    this.adharNo = obj.adhar;
    this.panCard = obj.pan;
    this.mobileNo = obj.mobile;
  }
  validate(){
    console.log(this.name+"  "+this.email+"  "+this.adharNo+"  "+this.panCard+"  "+this.mobileNo);
    if(!this.nameValidate(this.name)) {
      console.log(this.name +"is Not Correct");
      return false;
    } else if(!this.emailValidate(this.email)) {
      console.log(this.email +"is Not Correct");
      return false;
    }else  if(!this.adharValidate(this.adharNo)){
      console.log(this.adhar +"is Not Correct");
      return false;
    }else if(!this.panCardValidate(this.panCard)){
      console.log(this.panCard +"is Not Correct");
      return false;
    }else if(!this.mobileValidate(this.mobileNo)){
      console.log(this.mobileNo +"is Not Correct");
      return false;
    }else{
      console.log("All Correct");
      return true;
    }
  }

  emailValidate(mail=''){
    let validate=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.match(validate))
      return true;
    else
      return false;
  }

  nameValidate(name=''){
    if(name.match(/^[A-Za-z]+$/))
      return true;
    else
      return false;
  }

  adharValidate(adhar=''){
    if(adhar.match(/^\d{12}$/))
      return true;
    else
      return false;
  }

  mobileValidate(mobile=''){
    if(mobile.match(/^\d{10}$/))
      return true;
    else
      return false;
  }

  panCardValidate(panCode=''){
    if(panCode.match(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/))
      return true;
    else
      return false;
  }

  emailExists(emailId){
    db.get().collection("user").find({email:emailId}).toArray(function(err, result) {
      if (err){
        console.log(err);
      }else if(result.lenght==0){
        return true;
      }else
        return false;
    });
  }

  nameExists(userName,callback){
    let status;
    db.get().collection("user").find({name:userName}).toArray(function(err, result) {
      if (err){
        console.log(err);
      }else if(result.lenght==0){
        status= false;
      }else
        status= true;
        callback();
    });
  }
}

/*
var obj={
  name:"Jitu",
  email:"Jitu@gmail.com",
  adhar:"121232324444",
  pan:"ASDFG1234A",
  mobile:"9518709596"
}

temp = new User(obj);
temp.validate();*/