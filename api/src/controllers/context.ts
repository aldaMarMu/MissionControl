import { ApolloError, AuthenticationError } from "apollo-server-koa";
import { IUserInToken } from "../types/types";
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const checkOtherSessionOpen = async (user: IUserInToken, justToken: string) => {
//   let reply: string;
//   if (user.userID) {
//     reply = await redisClient.getAsync("authToken-" + user.userID);
//   } else if (user.submissionID) {
//     reply = await redisClient.getAsync("subToken-" + user.submissionID);
//   }
//   if (reply === justToken) {
//     return user;
//   } else {
//     throw new ApolloError(
//       "Token not valid. More than one session opened",
//       "ANOTHER_OPEN_SESSION"
//     );
//   }
// };

const contextController = {
  getMyUser: async context => {
    let type: string;
    let token1: string;
    let justToken: string;
    if (context.headers) {
      // authorization for queries and mutations
      token1 = context.headers.authorization || "";
      type = token1.split(" ")[0];
      justToken = token1.split(" ")[1];
    } else if (context.authorization) {
      // authorization for subscriptions
      token1 = context.authorization || "";
      type = token1.split(" ")[0];
      justToken = token1.split(" ")[1];
    } else {
      token1 = "";
      type = "";
      justToken = "";
    }
    // comprobar si el token que recibe es el que está guardado en la base de datos
    // -> sesión única simultánea
    if (type === "Bearer") {
      if (justToken) {
        let user: IUserInToken;
        try {
          user = await jsonwebtoken.verify(justToken, process.env.JWT_SECRET);
        } catch (e) {
          return undefined;
        }
        return user;
        // check if there is another open session
        // if (user.role === "USER") {
        //   if (process.env.USE_REDIS === "true") {
        //     return checkOtherSessionOpen(user, justToken);
        //   }
        //   return user;
        // } else if (user.role === "ADMIN") {
        //   if (process.env.USE_REDIS === "true") {
        //     return checkOtherSessionOpen(user, justToken);
        //   }
        //   return user;
        // }
      }
    }
  },
  getDataInToken: async inToken => {
    if (inToken) {
      try {
        return await jsonwebtoken.verify(inToken, process.env.JWT_SECRET);
      } catch (e) {
        throw new AuthenticationError("Token not value.");
      }
    }
  },

  getDataInBasicAuth: async inToken => {
    if (inToken) {
      try {
        const data: string = Buffer.from(inToken, "base64").toString("ascii");
        return data;
      } catch (e) {
        throw new AuthenticationError("Token not value.");
      }
    }
  },

  generateLoginToken: async user => {
    const token = await jsonwebtoken.sign(
      {
        email: user.email,
        userID: user._id,
        role: user.admin ? "ADMIN" : "USER"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1.1h" }
    );
    const role = user.admin ? "admin" : "user";
    return { token, role };
  }
};

export { contextController };
