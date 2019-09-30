import { Document, Model, model, Schema } from "mongoose";
const timestamps = require("mongoose-timestamp");
import { ObjectID } from "bson";

// User in token user interface
export interface IUserInToken {
  email: string;
  userID: string;
  submissionID: string;
  role: string;
}

// Email data needed in mjml
export interface IEmailData {
  url: string;
}

export interface IResetPasswordToken {
  resetPassUserID: ObjectID;
}

export interface ISignUpToken {
  signUpUserID: ObjectID;
}

export interface IUser {
  _id: string;
  email?: string;
  password?: string;
  admin?: boolean;
  name?: string;
  center?: string;
  active?: boolean;
  signUpToken?: string;
  authToken?: string;
  notifications?: boolean;
  signUpSurvey?: JSON;
  rootFolder?: string;
}

export const ContactSchema: Schema = new Schema({
  // id: Schema.Types.ObjectId,

  email: {
    type: String,
    unique: true,
    required: "Please enter your email",
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  admin: {
    type: Boolean,
    default: false
  },

  name: {
    type: String
  },

  center: {
    type: String
  },

  active: {
    type: Boolean
  },

  signUpToken: {
    type: String,
    default: "aa"
  },

  authToken: {
    type: String,
    default: "aa"
  },

  notifications: {
    type: Boolean
  },

  signUpSurvey: {
    type: Schema.Types.Mixed
  },

  rootFolder: {
    type: Schema.Types.ObjectId,
    ref: "FolderModel"
  }
});

ContactSchema.plugin(timestamps);
export const UserModel: Model<IUser> = model<IUser>(
  "UserModels",
  ContactSchema
);
