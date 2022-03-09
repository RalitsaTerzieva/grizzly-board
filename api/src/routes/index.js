import AuthController from '../controllers/AuthController';
import BoardController from '../controllers/BoardController';
import StatsController from '../controllers/StatsController';
import jwtAuth from '../middlewares/jwt';
import isAuthor from '../middlewares/isAuthorMiddleware';

export default (app) => {
    app.post('/register', AuthController.register);
    app.post('/login', AuthController.login);
    app.post('/boards', jwtAuth, BoardController.createEntry);
    app.put('/boards/:id', jwtAuth, isAuthor, BoardController.updateEntry);
    app.get('/boards/:id', jwtAuth, isAuthor, BoardController.showEntry);
    app.delete('/boards/:id', jwtAuth, isAuthor, BoardController.deleteEntry);
    app.get('/boards', jwtAuth, BoardController.listEntries);
    app.get('/stats', StatsController.stats);

    // Create a catch-all route for testing the installation.
    app.all('*', (req, res) => res.status(404).send({
        message: 'Not found!',
    }));
};