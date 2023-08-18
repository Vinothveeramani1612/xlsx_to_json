const db = require('./service')
const xlsx = require('xlsx')



const importusers=async(req,res)=>{
    try{/*
        if((req.file==undefined)||(req.file==null)){
            res.send({code:404,message:"please upload csv file...!"})
            return console.log('kindly select and upload csv file');
        }*/
        let path = "./files/" + req.file.filename;
        const workbook = xlsx.readFile(path);
        const sheetName = workbook.SheetNames[0];
        const details = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

     
    
        
        for (const item of details){
            const servicesave =await db.savedetails(item);
            const contactsave = await db.payroll(item);
        }
        res.send({status:200,success:true ,message:"uploaded succesfully"})
    }catch(error){
        res.send({message:error,status:"not uploaded"})
    
    }    
    }

    const showemployee = async(req,res)=>
{
    const showone = await db.empdata(req.body)
    res.send(showone)
}

const emp_pay = async(req,res)=>
{
    const showone = await db.emppayroll(req.body)
    res.send(showone)
}
const showsalary = async(req,res)=>
{
    const show = await db.findsalary(req.body)
    res.send(show)
}


//combine two collection

const combinedata = async(req,res)=>
{ var emp_id = req.body.Employee_id
    var month = req.body.Month
    var year= req.body.Year
    const data = await db.retrivePayslip({emp_id,month,year})
    res.send(data)
}

//update emp details
const updateemp = async(req,res)=>
{
    const details = await db.empupdate(req.body)
    res.send(details)
}
//update many in payroll
const updatemny = async(req,res)=>
{
    const details = await db.updatemanydata(req.body)
    res.send(details)
}




    module.exports=
    {
        importusers,
        showemployee,
        emp_pay,
        showsalary,
        combinedata,
        updateemp,
        updatemny

    }