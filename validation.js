import Joi from '@hapi/joi';

// Register Validation
export const  registerValidation = (data) =>{
    const schema = {
        firstName : Joi.string()
                    .required(),
        
        lastName : Joi.string()
                    .required(),
        
        email : Joi.string()
                    .required()
                    .email(),
        password : Joi.string()
                      .required()
                      .min(8)
                        
    };
   return  Joi.validate(data, schema)

}

export const  loginValidation = (data) =>{
    const schema = { 
        email : Joi.string()
                    .required()
                    .email(),
        password : Joi.string()
                      .required()
                      .min(8)
                        
    };
   return  Joi.validate(data, schema)

}
