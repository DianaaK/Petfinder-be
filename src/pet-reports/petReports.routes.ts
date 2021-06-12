import * as express from 'express';
import petReportsService from './petReports.service';
import errorHandler from '../utils/errors';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const reports = await petReportsService.getAll();
    res.status(200).send(reports);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.get('/:reportId', async (req, res, next) => {
  try {
    const users = await petReportsService.getById(req.params.reportId);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const reports = await petReportsService.getByUserId(req.params.userId);
    res.status(200).send(reports);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const newReport = await petReportsService.add(req.body);
    res.status(200).send(newReport);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.delete('/:reportId', async (req, res, next) => {
  try {
    const response = await petReportsService.delete(req.params.reportId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

router.put('/:reportId', async (req, res, next) => {
  try {
    const updatedReport = await petReportsService.update(req.params.reportId, req.body);
    res.status(200).send(updatedReport);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
});

export default router;
