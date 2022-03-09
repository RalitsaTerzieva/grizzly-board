import jwt from '../utils/jwt';
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../constants'
import model from '../models';
const { User } = model;

export default {
    async register({ email, password, first_name, last_name }) {
        const encrypted = await bcrypt.hash(password, 10)
        await User.create({ email, first_name, last_name, password: encrypted })
        let token = await this.login({ email, password });
        return token
    },
    async login({ email, password }) {
        let user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Ivalid email or password!');
        }

        let isValid = await this.validatePassword(password, user);

        if (!isValid) {
            throw new Error('Ivalid email or password!');
        }

        let payload = { _id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email }
        let token = await jwt.sign(payload, JWT_SECRET);

        return token
    },
    async validatePassword(password, user) {
        return await bcrypt.compare(password, user.password);
    }
}