import * as mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone?: string;
  allowNotifications?: boolean;
  deviceId?: string;
  profilePhoto?: string;
  useGoogleMaps?: boolean;
  useSatelliteView?: boolean;
}

const UserRepo = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    allowNotifications: {
      type: Boolean,
      required: false,
      default: true
    },
    deviceId: {
      type: String,
      required: false
    },
    profileImage: {
      type: String,
      required: false
    },
    useGoogleMaps: {
      type: Boolean,
      required: false,
      default: true
    },
    useSatelliteView: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: { createdAt: 'created' }
  }
);

UserRepo.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true
});

const LocalUser = mongoose.model('users', UserRepo) as mongoose.PassportLocalModel<IUser>;
export default LocalUser;
