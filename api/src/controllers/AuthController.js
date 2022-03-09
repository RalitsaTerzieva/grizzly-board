import model from '../models';
const { User } = model;
import authService from '../services/AuthService';

export default {
    async register(req, res) {
        const { email, password, first_name, last_name } = req.body;
        try {
            const user = await User.findOne({ where: { email } });

            if (user) {
                return res.status(422)
                    .send({ message: 'User with that email already exists' });
            }

            const token = await authService.register({
                first_name,
                last_name,
                email,
                password,
            });

            return res.status(201).send({ message: 'Account created successfully', token: token });
        } catch (e) {
            console.log(e);
            return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
        }
    },
    async login(req, res) {
        const { email, password } = req.body;
        try {
            let token = await authService.login({ email: email, password: password });
            return res.send({ message: 'Welcome', token: token });
        } catch (e) {
            console.log(e)
            return res.status(401)
                .send(
                    { message: 'Wrong credentials. Please try again.' });
        }
    }
}