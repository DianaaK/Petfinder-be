import mongoose from 'mongoose';

const DB_URL = 'mongodb+srv://diana:petfinder123456@petfinder.gfa23.mongodb.net/PetFinder';

// mongoose
(mongoose as any).Promise = global.Promise;
export default mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  return mongoose.connection;
});
