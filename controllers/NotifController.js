const notificationModel = require("../models/notification");



exports.getnotifications = async (req,res)=>{
    try {
        const notifications = await notificationModel.find({user:req.params.id});
        notifications && res.status(200).json(notifications);
        !notifications && res.status(404).json({message:"notification not found"});
    
    }
    catch(err) {
        return res.status(500).json(err);
    }

}