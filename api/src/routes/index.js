import AuthController from '../controllers/AuthController';
import BoardController from '../controllers/BoardController';
import jwtAuth from '../middlewares/jwt';
import isAuthor from '../middlewares/isAuthorMiddleware';

export default (app) => {
    app.post('/register', AuthController.register);
    app.post('/login', AuthController.login);
    app.post('/boards', jwtAuth, BoardController.createBoard);
    app.put('/boards/:id', jwtAuth, isAuthor, BoardController.updateBoard);
    app.get('/boards/:id', jwtAuth, isAuthor, BoardController.showBoard);
    app.delete('/boards/:id', jwtAuth, isAuthor, BoardController.deleteBoard);
    app.get('/boards', jwtAuth, BoardController.listBoard);

    // Create a catch-all route for testing the installation.
    app.all('*', (req, res) => res.status(404).send({
        message: 'Not found!',
    }));
};