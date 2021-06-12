import PetReportRepo, { IPetReport } from './petReports.model';
import logger from '../utils/logger';

class PetReportsService {
  constructor() {}

  async getAll() {
    logger.msg('Getting all pet reports.');
    const reports = await PetReportRepo.find().sort('created').populate('user', 'firstname email phone profileImage');
    return reports;
  }

  async getById(id: string) {
    logger.msg('Getting pet report with id: ' + id);
    return await PetReportRepo.findById(id);
  }

  async getByUserId(id: string) {
    logger.msg('Getting pet reports for user with id: ' + id);
    return await PetReportRepo.find({ userId: id }).sort('created');
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
}

export default new PetReportsService();
