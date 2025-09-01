const model = require('../model/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                result: false,
                message: 'insufficient parameters',
            });
        }

        const SECRET_KEY = 'dkjghkdghfhglknghdxlkdnflsfjopoijoigjhpokp';

        const checkuser = await model.checkUserOrShop(email);
        if (checkuser.length === 0) {
            return res.status(400).json({
                result: false,
                message: 'user not found',
            });
        }

        const user = checkuser[0];
console.log("user:",user)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                result: false,
                message: 'invalid credentials',
            });
        }

        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
            result: true,
            message: 'login successful',
            user: {
                id: user.id,
                role: user.role,
                user_token: token,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            result: false,
            message: error.message,
        });
    }
};
