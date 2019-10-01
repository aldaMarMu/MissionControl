import { ApolloError, AuthenticationError } from "apollo-server-koa";
import { contextController } from "../controllers/context";
import { IUser, UserModel } from "../types/user";

import { IEmailData, IResetPasswordToken, ISignUpToken } from "../types/user";

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
      console.log(args.input);
      return await UserModel.findOneAndUpdate(
        { _id: contactFound._id },
        { $set: args.input },
        { new: true }
      );
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
      const registered: number = await UserModel.countDocuments({});
      const active: number = await UserModel.countDocuments({ active: true });
      const admin: number = await UserModel.countDocuments({ admin: true });
      let lastLogin: number = 0;
      if (args.loginAfter) {
        lastLogin = await UserModel.countDocuments({
          createdAt: { $gte: args.loginAfter }
        });
      }
      return { registered, active, admin, lastLogin };
    }
  }
};

export default userResolver;
