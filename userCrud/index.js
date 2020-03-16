const express = require('express');
const user = require('./userApi');
const db = require('./dbConnect');
const app = express();



app.use('/user',user);
db.connect(()=>{app.listen(3007,function(){
	console.log('Server is running on Port 3007');
}
);
}
);

