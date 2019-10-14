import { ApolloError, AuthenticationError } from "apollo-server-koa";
import { contextController } from "../controllers/context";
import { IUser, UserModel } from "../models/user";

import { IEmailData, IResetPasswordToken, ISignUpToken } from "../types/types";
import { DocumentModel } from "../models/document";
import ObjectId from "bson";
import { SubmissionModel } from "../models/submission";
import { ExerciseModel } from "../models/exercise";
import { FolderModel } from "../models/folder";

const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const saltRounds = 7;

const userResolver = {
  Mutation: {
    // Public mutations:

    /*
      Login: login with a registered user.
      It returns the authorization token with user information.
      args: email and password.
    */
    login: async (root: any, { email, password }) => {
      const contactFound: IUser = await UserModel.findOne({ email });
      if (!contactFound) {
        throw new AuthenticationError("Email or password incorrect");
      }
      if (!contactFound.active) {
        throw new ApolloError(
          "Not active user, please activate your account",
          "NOT_ACTIVE_USER"
        );
      }
      // Compare passwords from request and database
      const valid: boolean = await bcrypt.compare(
        password,
        contactFound.password
      );
      if (valid) {
        const { token, role } = await contextController.generateLoginToken(
          contactFound
        );

        // Update the user information in the database
        await UserModel.updateOne(
          { _id: contactFound._id },
          { $set: { authToken: token } }
        );
        return token;
      } else {
        throw new AuthenticationError("Email or password incorrect");
      }
    },

    /*
      Update user: update existing user.
      It updates the user with the new information provided.
      args: user ID, new user information.
    */
    updateUserRoles: async (root: any, args: any, context: any, input: any) => {
      if (context.user.role !== "ADMIN") {
        return new AuthenticationError("Role not value");
      }
      const contactFound: IUser = await UserModel.findOne({
        _id: args.id
      });
      if (!contactFound) {
        return new ApolloError("User does not exist", "USER_NOT_FOUND");
      }
      return await UserModel.findOneAndUpdate(
        { _id: contactFound._id },
        { $set: args.input },
        { new: true }
      );
    },

    deleteUser: async (root: any, args: any, context: any) => {
      if (context.user.role !== "ADMIN") {
        return new AuthenticationError("Role not value");
      }
      const contactFound: IUser = await UserModel.findOne({
        _id: args.id
      });
      if (!contactFound) {
        return new ApolloError("User does not exist", "USER_NOT_FOUND");
      }
      await SubmissionModel.deleteMany({ user: contactFound._id });
      await ExerciseModel.deleteMany({ user: contactFound._id });
      await DocumentModel.deleteMany({ user: contactFound._id });
      await FolderModel.deleteMany({ user: contactFound._id });
      return await UserModel.deleteOne({ _id: contactFound._id }); // Delete every data of the user
    }
  },

  Query: {
    /**
     *  Me: returns the information of the user provided in the authorization token.
     *  args: nothing.
     */
    me: async (root: any, args: any, context: any) => {
      const contactFound: IUser = await UserModel.findOne({
        email: context.user.email,
        _id: context.user.userID
      });
      if (!contactFound) {
        return new ApolloError("Error with user in context", "USER_NOT_FOUND");
      }
      return contactFound;
    },

    /**
     *  Users: returns all the users in the platform. It can be executed only by admin user.
     *  args: nothing.
     */
    users: async (root: any, args: any, context: any) => {
      return await UserModel.find({});
    },

    /**
     *  UsersAnalytics: returns all the users in the platform. It can be executed only by admin user.
     *  args: nothing.
     */
    usersAnalytics: async (root: any, args: any, context: any) => {
      const date = new Date();
      const registered: number = await UserModel.countDocuments({});
      const active: number = await UserModel.countDocuments({ active: true });
      const admin: number = await UserModel.countDocuments({ admin: true });
      const publisher: number = await UserModel.countDocuments({
        publisher: true
      });
      const teacher: number = await UserModel.countDocuments({ teacher: true });
      const teacherPro: number = await UserModel.countDocuments({
        teacherPro: true
      });
      const family: number = await UserModel.countDocuments({ family: true });

      const lastWeekLogin = await UserModel.countDocuments({
        lastLogin: {
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
          ),
          $gte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() + 1
          )
        }
      });

      const twoWeeksAgoLogin = await UserModel.countDocuments({
        lastLogin: {
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() + 1
          ),
          $gte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() - 6
          )
        }
      });

      const threeWeeksAgoLogin = await UserModel.countDocuments({
        lastLogin: {
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() + -6
          ),
          $gte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() - 13
          )
        }
      });

      const fourWeeksAgoLogin = await UserModel.countDocuments({
        lastLogin: {
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() - 13
          ),
          $gte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() - 20
          )
        }
      });

      const fiveWeeksAgoLogin = await UserModel.countDocuments({
        lastLogin: {
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() - 20
          ),
          $gte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() - 27
          )
        }
      });

      const allUsers = await UserModel.find({});
      let docsByUser: number[] = [];
      for (let user of allUsers) {
        docsByUser.push(await DocumentModel.countDocuments({ user: user._id }));
      }

      const docsByUserAvg =
        docsByUser.reduce((a, b) => a + b, 0) / docsByUser.length;
      const docsByUserMax = Math.max(...docsByUser);
      const docsByUserMin = Math.min(...docsByUser);

      return {
        registered,
        active,
        admin,
        publisher,
        teacher,
        teacherPro,
        family,
        lastWeekLogin,
        twoWeeksAgoLogin,
        threeWeeksAgoLogin,
        fourWeeksAgoLogin,
        fiveWeeksAgoLogin,
        docsByUserAvg,
        docsByUserMax,
        docsByUserMin
      };
    }
  }
};

export default userResolver;
