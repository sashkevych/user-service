import { NextFunction } from "express";
import { Socket } from "socket.io";
import { role } from "../types/user.js";
import JWT from "../utils/jwt.utils.js";

export const validateRole = (requiredRole: role) => {
  return function (socket: Socket, next: NextFunction) {
    try {
      const { token } = socket.handshake.auth;

      if (!token) {
        throw new Error("Token required");
      }
      const { role } = JWT.getPayLoad(token);
      const UserHasPermission = role === requiredRole;

      if (!UserHasPermission) {
        throw new Error("No permission");
      }

      console.log(socket.handshake.auth);
      next();
    } catch (err) {
      next(err);
    }
  };
};
