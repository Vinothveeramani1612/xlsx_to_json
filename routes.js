const express= require('express')
const router = express.Router()
const functions = require('./controller/index')
const multer = require('./config/multer')
    

let routes = (app)=>
{
    router.post('/uploadexcel',multer.single("upload"),functions.importusers);
    router.post('/empdetails', functions.showemployee);
    router.post('/emp_pay', functions.emp_pay)
    router.post('/showsalary', functions.showsalary)
    router.post('/combinecollect', functions.combinedata)
    router.post('/empupdate', functions.updateemp)
    router.post('/updatemany', functions.updatemny)
    app.use('/api',router)
        
}
module.exports=routes