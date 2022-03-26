import jwt from '../utils/jwt';
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../constants'
import model from '../models';
const { User, Board, Column } = model;

export default {
    async register({ email, password, first_name, last_name }) {
        const encrypted = await bcrypt.hash(password, 10)
        const user = await User.create({ email, first_name, last_name, password: encrypted })
        let token = await this.login({ email, password });
        await this.createBoard(user);
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
    },
    async createBoard(user) {
        const board = await Board.create({
            name: 'Kanban Board',
            goals: "",
            description: "Kanban Board",
            user_id: user.id,
            start_date: new Date(),
            end_date: new Date(),
          })
        
          const columnsList = [
            {
              name: "TODO",
              index: 0,
              board_id: board.id,
              user_id: user.id,
            },
            {
              name: "IN PROGRESS",
              index: 1,
              board_id: board.id,
              user_id: user.id,
            },
            {
              name: "CODE REVIEW",
              index: 2,
              board_id: board.id,
              user_id: user.id,
            },
            {
              name: "IN TEST",
              index: 3,
              board_id: board.id,
              user_id: user.id,
            },
            {
              name: "DONE",
              index: 4,
              board_id: board.id,
              user_id: user.id,
            },
          ]
        
        let columns = await Column.bulkCreate(columnsList)
        return board
    }
}