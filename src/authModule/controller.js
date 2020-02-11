import User from './model';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';


export const createUser = async (req, res) =>{
    const {
            firstName,
            lastName,
            userName,
            email,
            password,

        } = req.body
        console.log(firstName,lastName,userName,email,password)

    // check if eamil exists
    const emailExists = await User.findOne({email})
    if(emailExists){
      
        return res.status(200).json({error : true , message : 'Email already Exists'})
    }

    //create hash of password
    const salt = await  bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({firstName,lastName,userName,email,password : hashedPassword})
   try{
       console.log('user saved')
       
       return res.status(200).json({error : false , user :  await newUser.save()})

    }
    catch(e){
        console.log('user not saved')
        return res.status(400).json({error : true, mesage : 'something went Wrong'})
    }
}

export const loginUser = async (req,res) =>{
    const {email, password} = req.body;
    console.log(email, "   " + password)

      
      const user = await User.findOne({email})
      console.log(user)
      console.log(user._id)
      if(!user){
          return res.status(200).json({error : true , message : 'Email or password is not correct'})
      }

      const validPassword = await bcrypt.compare(password, user.password)
      if(!validPassword){
          return res.status(200).json({error : true , message : 'Email or password is not correct'})
      }
      try{
        return res.status(200).json({error: false , message : 'yahoooo !! loged in', msg : 'another',userId : await user._id, userName : await user.userName })
      }
      catch(e){
          return res.status(200).json({error : true , mesage : 'something went wrong'})
      }     

}

export const sendOTPMail = async (req, res) =>{
   const {email,OTP} = req.body;
     try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
              user: 'nav12ktk@gmail.com', // generated ethereal user
              pass: 'ncpepptwbzpittdu' // generated ethereal password
            },
            tls:{
                rejectUnauthorized : false
            }
          });
          let info = await transporter.sendMail({
            from: '"App developer " <nav12ktk@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify Your Email buddy", // Subject line
            text: "Hello  ", // plain text body
            html: `<b> ${OTP} this is you snapchat email verification code please enter that code to create you account </b>` // html body
          });
        console.log("Message sent: %s", info.messageId + OTP);
        try{
            return res.status(200).json({error : false , message : 'hurrryyyy success !!'})
        }
        catch(e){
            return res.status(200).json({error : true, message : 'something wnet wrong'})
        }         

    }
    catch(e){
        console.log(e)
    }
   
}

export const matchEmailId = async (req,res) =>{
    const {email} = req.body;
    
    console.log( " req.email " + email)
    const emailExists = await User.findOne({email})
    console.log(" user hy ? " + emailExists)
    if(emailExists){
      
        return res.status(200).json({error : true , message : 'Email already Exists'})
    }
    else{
        console.log(emailExists)
        return res.status(200).json({error : false , message : 'user can create Account with this Email'})
    }


}
