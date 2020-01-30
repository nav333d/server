import VideoCollection  from './model';


export const uploadVideo = async(req,res,next) =>{
   
    
    const {fieldname,originalname,mimetype,filename,path,size,} = req.file;
    
  
    if(filename === '' || path === ''){
        return res.status(400).json({error : true , message : 'something went '})
    }
//    const {_id, userId} = req.body
    const userId = 'dsf3732rufbjbewf003prhf498r6cbjd'
   
    const userexists = await VideoCollection.findOne({userId})
    if(userexists){
       var newVideo = {fieldname,originalname,mimetype,filename,path,size};
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
   const videoCollection = new VideoCollection({userId, videoLinks :{fieldname,originalname,mimetype,filename,path,size}})
    try{
        return res.status(200).json({error : false, collection : await videoCollection.save()})
    }
    catch(e){
        return res.status(400).json({error : true, message : 'someting went wrong'})
    }

   }
    

    
 
    
}