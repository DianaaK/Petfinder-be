import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL || '';

// mongoose
(mongoose as any).Promise = global.Promise;
export default mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  return mongoose.connection;
});
