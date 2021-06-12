import * as express from 'express';
import authService from './auth.service';
import errorHandler from '../utils/errors';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    authService.register(req.body, (err: any, user: any) => {
      if (err) {
        res.status(500).send(errorHandler(err));
      }
      res.status(200).send(user);
    });
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const authUser = await authService.login(req, res);
    res.status(200).send(authUser);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.get('/logout', (req: any, res, next) => {
  req.logout();
  req.session.save((err: any) => {
    if (err) {
      return next(err);
    }
    res.status(200).send('Logout successful');
  });
});

router.post('/changePass', async (req, res, next) => {
  try {
    const changedPass = await authService.changePass(req, res);
    res.status(200).send(changedPass);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

export default router;
