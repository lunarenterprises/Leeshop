const model =require('../model/login');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
 module.exports.login = async (req, res) => {
    try {
        const { email, password,role } = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                result:false,
                message:'insufficient parameters',

              });
        }
    const SECRET_KEY = 'dkjghkdghfhglknghdxlkdnflsfjopoijoigjhpokp';
    const checkuser=await model.checkuser(email,role);
    if(checkuser.length===0){
        return res.status(400).json({
            result:false,
            message:'user not found',
          });
    }
    console.log('checkuser:', checkuser);
    
    //verify password
    const isPasswordValid = await bcrypt.compare(password, checkuser[0].u_password);
    if(!isPasswordValid) {
        return res.status(400).json({
            result:false,
            message:'invalid credentials',

          });
    }   
    //generate jwt token
    const payload = {
        userId: checkuser[0].u_id,
        email: checkuser[0].u_email,
    
    };
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({
        result:true,
        message:'login successful',
        user: {
            id: checkuser[0].u_id,
            email: checkuser[0].u_email,
            role: checkuser[0].u_role,
            user_token:token,
        },
    });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            result:false,
            message:error.message,
        });
    }
};