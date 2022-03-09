import model from '../models';
const { Entry } = model;

export default async (req, res, next) => {
    const board = await Entry.findByPk(req.params.id)
    if(board && board.user_id == req.user._id) {
        next();
    } else {
        res.status(404).send({
            message: 'Not found!',
        })
    }
}