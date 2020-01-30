import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema({
    firstName:{
        type :  String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    },
    userName:{
        type : String,
        required : true,
        unique : true,
        minlength : 2
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password :{
        type : String,
        required : true,
        minlength : [8, 'password should be atleast 8 characters'],
        max : 1024
    },
    date:{
        type: Date,
        default : Date.now()
    }
})

export default mongoose.model('User', userSchema)