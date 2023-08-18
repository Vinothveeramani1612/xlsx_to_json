const mongoose = require("mongoose")
const empDetailsSchema = new mongoose.Schema({
    Company_Name: String,
    Employee_id: String,
    Employee_Name: String,
    Gender: String,
    Date_of_Joining: String,
    Location: String,
    Mobile_Number : Number
});

const collect = mongoose.model('empdetails', empDetailsSchema)
const savedetails =async(data)=>
    {
        if(data.length!==0)
        {
            const existingemp = await collect.findOne({Mobile_Number:data.Mobile_Number})
            if(existingemp)
            {
                return false
            }
            else
        {
        const getdata = new collect(data)
        const savedata = await getdata.save()
        return savedata
    }}}

    const payrollDetailsSchema = new mongoose.Schema({
        Employee_id: String,
        Salary: String,
        Basic: String,
        HRA: String,
        Conveyance: String,
        Other_allowance: String,
        Total_Detuctions : String,
        LOP: String,
        Month: String,
        Year: String,
        Designation: String,
        PAN: String,
        Bank_AC_Number: String
    });

    const collect1 = mongoose.model('payroll', payrollDetailsSchema)
    const payroll = async(data)=>
    {
        const getinfo = new collect1(data)
        const getdetails = await getinfo.save()
        return getdetails

    }
    //find employee from emp-details
    const empdata = async(data)=>
{
    const input = await collect.findOne({Employee_id : data.Employee_id})
    return input
}
//find employee from payroll
const emppayroll = async(data)=>
{
    const input = await collect1.findOne({Employee_id : data.Employee_id})
    return input
}
//find salary 
const findsalary= async(data)=>
{
    const input = await collect1.findOne({$and :[{Employee_id:data.Employee_id},
        {Month:data.Month},{Year:data.Year} ]})
        return input
}

//combine two collections
const retrivePayslip=async(data)=>{
    console.log(data);
    let getInfo
    
        getInfo=await collect1.aggregate([
            {$match:{Employee_id:data.emp_id,Month:data.month,Year:data.year}},
            {
                $lookup: {
                    from: 'empdetails',
                    localField: 'Employee_id',
                    foreignField: 'Employee_id',
                    as: 'payroll'
                }
            },
            { $unwind: "$payroll" },
            {
                $project: {
                    "Company_Name":"$payroll.Company_Name",
                    "Employee_id":"$Employee_id",
                    "Employee_Name": "$payroll.Employee_Name",
                    
                    "Gender": "$payroll.Gender",
                    "Location":"$payroll.Location",
                    "Mobile_Number": "$payroll.Mobile_Number",
                    "Date_of_Joining": "$payroll.Date_of_Joining",
                    "Designation": "$Designation",
                    "Bank_AC_Number": "$Bank_AC_Number",
                    
                    "Basic": "$Basic",
                    "HRA": "$HRA",
                    "PAN": "$PAN",
                    "LOP":"$LOP",
                    "Conveyance": "$Conveyance",
                    "Other_allowance": "$Other_allowance",
                    "Salary": "$Salary",
                    "Total_Detuctions":"$Total_Detuctions",
                    "Month":"$Month",
                    "Year":"$Year"
                }
            }
           ])
    
    
     
   return getInfo
}
//update employee collection

const empupdate = async(data)=>
{
    const update = await collect.updateOne({Employee_id:data.Employee_id},{Mobile_Number:data.Mobile_Number})
    return update
}
//update payroll many details

const updatemanydata = async(data)=>
{
    const updatedata = await collect1.findOneAndUpdate({Employee_id:data.Employee_id, Month:data.Month, Year:data.Year},
        {$set: 
        {
            Salary: data.Salary,
            HRA: data.HRA,
            Basic: data.Basic,
            Conveyance: data.Conveyance
        }},{multi : true});
        return updatedata

}


    module.exports=
    {
        savedetails,
        payroll,
        empdata,
        emppayroll,
        findsalary,
        retrivePayslip,
        empupdate,
        updatemanydata
    }