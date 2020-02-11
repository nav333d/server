import mongoose,{Schema} from 'mongoose';

const AllVideosCollection = new Schema({
    userName :{type : String , required : true},
    videoUrl :{ type : String, required : true},
    profilePic : {type : String, required : true},
    like : {type : Number},
    dislike : {type : Number}
})

export default mongoose.model('AllVideoCollection', AllVideosCollection)