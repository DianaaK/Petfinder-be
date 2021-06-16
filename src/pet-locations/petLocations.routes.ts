import * as express from 'express';
import petLocationsService from './petLocations.service';
import errorHandler from '../utils/errors';

const router = express.Router();

router.get('/:petId', async (req, res, next) => {
  try {
    const locations = await petLocationsService.getByPetId(req.params.petId);
    res.status(200).send(locations);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const newLocation = await petLocationsService.add(req.body);
    res.status(200).send(newLocation);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

export default router;
