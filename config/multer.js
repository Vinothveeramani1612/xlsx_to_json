const multer=require('multer')
/*const csvfilter=(req,file,cb)=>{
    if(file.mimetype.includes('csv')){
        cb(null,true)
    }else{
        cb("Kindly Upload CSV file",false)
        return console.log("please upload csv file");
    }
}*/


const storage1=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./files/')
    },
    filename:(req,file,cb)=>{
        console.log(file.originalname);
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

var upload=multer({storage:storage1/*,fileFilter:csvfilter*/});

module.exports=upload