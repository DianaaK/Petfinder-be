import logger from '../utils/logger';

export default function errorHandler(error: any) {
  logger.err(error.message);
  return { ERROR: error };
}
