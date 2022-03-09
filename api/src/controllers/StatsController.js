import model from '../models';
const { User, Entry } = model;

export default {
    async stats(req, res) {
        try {
            const userCount = await User.count();
            const entryCount = await Entry.count();
            return res.status(200).send({ userCount, entryCount });
        } catch (e) {
            console.log(e);
            return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
        }
    }
}