import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

const Schema = mongoose.Schema;

export interface IPetLocation extends mongoose.Document {
  petId: ObjectID;
  userId: ObjectID;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const PetLocationRepo = new Schema(
  {
    petId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'pet-reports'
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    address: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  {
    timestamps: { createdAt: 'created' }
  }
);

const PetLocation = mongoose.model('pet-locations', PetLocationRepo);
export default PetLocation;
