import VideoCollection  from './model';


export const uploadVideo = async(req,res,next) =>{
   
    
    const {fieldname,originalname,mimetype,filename,size,location} = req.file;
   console.log("hit upload video")
    
  
    if(filename === '' || location === ''){
        return res.status(400).json({error : true , message : 'something went  with file '})
    }

    const userId = req.body.userID;
    const userName = req.body.username
    console.log(userName)
   
   
    const userexists = await VideoCollection.findOne({userId})
    console.log(userexists)
    if(userexists){
       var newVideo = {fieldname,originalname,mimetype,location,size};
        VideoCollection.findOneAndUpdate(
        { userId: userId }, 
        { $push: { videoLinks: newVideo } },
       async function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    return res.status(200).json({error : false , Collection : await VideoCollection.findOne({userId})})
                }
            });
          
   }
   else{
   const videoCollection = new VideoCollection({userId,userName, videoLinks :{fieldname,originalname,mimetype,location,size}})
    try{
        return res.status(200).json({error : false, collection : await videoCollection.save()})
    }
    catch(e){
        return res.status(400).json({error : true, message : 'someting went wrong'})
    }
}       

}

export const getUserAllVideo = async (req,res) =>{
    const {userId} = req.body
    console.log(userId)
   // const collection = await VideoCollection.findOne({userId})

    try{
        return res.status(200).json({error : false,  collection : await VideoCollection.findOne({userId})})
    }
    catch(e){
        return res.status(400).json({error : true, message : "something went wrong"})
    }
}

export const getAllVideos = async (req,res) => {
    try{
        return res.status(200).json({ error : false , collection : await VideoCollection.find({})})
    }
    catch(e){
        return res.status(400).json({error : true, message : e})
    }
}