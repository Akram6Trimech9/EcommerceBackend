const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname);
    }
});


const fileFilter=function(req,file,cb){
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/pjpeg'){
         cb(null,true);
    }
    else 
       cb(null,false,new Error('type doesn\'t exists')); 
}

const upload = multer({storage:storage,
    fileLimits:{fileSize:1024*1024*5},
    fileFilter:fileFilter})

module.exports=upload;