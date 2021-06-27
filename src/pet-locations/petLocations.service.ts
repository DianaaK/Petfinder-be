import PetLocationRepo, { IPetLocation } from './petLocations.model';
import logger from '../utils/logger';
import petReportsService from '../pet-reports/petReports.service';
import usersService from '../users/users.service';
import NotificationsService from '../utils/notifications';

class PetLocationsService {
  constructor() {}

  async getByPetId(id: string) {
    logger.msg('Getting pet locations for report with id: ' + id);
    return await PetLocationRepo.find({ petId: id }).sort('created').populate('user', 'firstname');
  }

  async add(location: IPetLocation) {
    logger.msg('Adding pet location.');
    const newLocation = new PetLocationRepo(location);

    const petReport: any = await petReportsService.getById(location.petId + '');
    if (petReport) {
      const userId = petReport.user;
      const user = await usersService.getById(userId);
      if (user?.deviceId) {
        const notificationTitle = `${petReport.name}'s location has been updated!`;
        const notificationDescription = 'Looks like someone just saw your missing pet! Check the map for more details!';
        NotificationsService.sendNotificationTo([user.deviceId], notificationTitle, notificationDescription, { data: petReport._id });
      }
    }

    await newLocation.save();
    return await PetLocationRepo.findById(newLocation._id);
  }
}

export default new PetLocationsService();
