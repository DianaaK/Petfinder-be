import PetReportRepo, { IPetReport } from './petReports.model';
import logger from '../utils/logger';
import { createReportsCriteria } from '../utils/criteria';

class PetReportsService {
  constructor() {}

  async getAll(criteria?: any) {
    logger.msg('Getting all pet reports.');
    const newCriteria = createReportsCriteria(criteria)
    const reports = await PetReportRepo.find(newCriteria)
      .sort([['created', -1]])
      .populate('user', 'firstname email phone profileImage');
    return reports;
  }

  async getById(id: string) {
    logger.msg('Getting pet report with id: ' + id);
    return await PetReportRepo.findById(id).populate('user', 'firstname email phone profileImage');
  }

  async getByUserId(id: string, criteria?: any) {
    logger.msg('Getting pet reports for user with id: ' + id);
    const newCriteria = createReportsCriteria(criteria);
    return await PetReportRepo.find({ user: id, ...newCriteria }).sort([['created', -1]]);
  }

  async add(report: IPetReport) {
    logger.msg('Adding pet report.');
    const newReport = new PetReportRepo(report);
    await newReport.save();
    return await PetReportRepo.findById(newReport._id);
  }

  async delete(id: string) {
    logger.msg('Deleting report with id: ' + id);
    const report = await this.getById(id);
    if (report) {
      await PetReportRepo.remove({ _id: id });
      return report;
    } else {
      throw { code: 'NOT_FOUND', message: 'report not found' };
    }
  }

  async update(id: string, updatedReport: IPetReport) {
    logger.msg('Updating report with id: ' + id);
    const entity = await this.getById(id);
    const mergedReport = Object.assign(entity, updatedReport);
    await PetReportRepo.updateOne({ _id: id }, mergedReport, { upsert: true });
    return mergedReport;
  }

  async favoriteReport(userId: string, reportId: string, favorite: boolean) {
    logger.msg('Favorite report with id: ' + reportId);
    const entity: any = await this.getById(reportId);
    if (favorite && entity) {
      if (entity.usersFavorite.indexOf(userId) === -1) {
        entity.usersFavorite.push(userId);
        await entity.save();
      }
    } else if (entity) {
      entity.usersFavorite = entity.usersFavorite.filter((uid: string) => {
        return uid.toString() !== userId;
      });
      await entity.save();
    }
    return entity;
  }

  async getFavoriteReports(userId: string, criteria?: any) {
    logger.msg('Getting favorite reports for user with id: ' + userId);
    const newCriteria = createReportsCriteria(criteria);
    const reports = await PetReportRepo.find({ usersFavorite: userId, ...newCriteria })
      .sort([['created', -1]])
      .populate('user', 'firstname email phone profileImage');
    return reports;
  }
}

export default new PetReportsService();
