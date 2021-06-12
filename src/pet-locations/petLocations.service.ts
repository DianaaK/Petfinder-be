import PetLocationRepo, { IPetLocation } from './petLocations.model';
import logger from '../utils/logger';

class PetLocationsService {
  constructor() {}

  async getByPetId(id: string) {
    logger.msg('Getting pet locations for report with id: ' + id);
    return await PetLocationRepo.find({ petId: id }).sort('created');
  }

  async add(location: IPetLocation) {
    logger.msg('Adding pet location.');
    const newLocation = new PetLocationRepo(location);
    await newLocation.save();
    return await PetLocationRepo.findById(newLocation._id);
  }
}

export default new PetLocationsService();
