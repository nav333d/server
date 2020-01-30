import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default  () =>{
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb+srv://naveed:2W4PYAvVjWhFJ7Q8@mycluster-mr0hd.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser : true})
    mongoose.connection
    .once('open', () =>{
        console.log('connected to database')
    })
    .on('error', err =>{
        console.log(err)
    })
}