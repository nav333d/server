import mongoose, { Schema} from 'mongoose';

const videoSchema = new Schema({
userId:{
    type: String,
    required : true
},
userName:{
    type : String,
    required : true
},
videoLinks :[
    {  
        fieldname :{type : String},
        originalname : {type : String},
        mimetype : {type : String},
       
        location : {type : String , required :true},
        size : {type : String}
      

    }
]



})

export default mongoose.model('VideoCollection', videoSchema)