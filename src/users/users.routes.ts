import * as express from 'express';
import usersService from './users.service';
import errorHandler from '../utils/errors';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const newUser = await usersService.add(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const updatedUser = await usersService.update(req.params.userId, req.body);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

export default router;
