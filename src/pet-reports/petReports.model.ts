import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

const Schema = mongoose.Schema;

export enum ReportType {
  LOST,
  FOUND
}

export enum ReportStatus {
  ACTIVE,
  INACTIVE
}

export enum PetGender {
  MALE,
  FEMALE
}

export enum PetSpecies {
  CAT,
  DOG,
  OTHER
}

export interface IPetReport extends mongoose.Document {
  name: string;
  description: string;
  type: ReportType;
  species: PetSpecies;
  gender: PetGender;
  breed: string;
  age: string;
  media: [string];
  userId: ObjectID;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  usersFavorite?: [ObjectID];
  status?: ReportStatus;
  deleted?: boolean;
}

const PetReportRepo = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      enum: ReportType
    },
    species: {
      type: Number,
      enum: PetSpecies
    },
    gender: {
      type: Number,
      enum: PetGender
    },
    breed: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    media: {
      type: [String],
      required: true
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
    },
    usersFavorite: {
      type: [Schema.Types.ObjectId],
      ref: 'users',
      default: []
    },
    status: {
      type: Number,
      enum: ReportStatus,
      default: ReportStatus.ACTIVE
    }
  },
  {
    timestamps: { createdAt: 'created' }
  }
);

const PetReport = mongoose.model('pet-reports', PetReportRepo);
export default PetReport;
