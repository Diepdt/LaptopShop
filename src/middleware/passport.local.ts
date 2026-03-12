/// <reference path="../types/index.d.ts" />
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "../services/client/auth.service";
import { getUserWithRoleById } from "./auth";

export const configPassportLocal = () => {
    passport.use(new LocalStrategy(function verify(username, password, callback) {
        return handleLogin(username, password, callback);
    }));

    passport.serializeUser(function (user: Express.User, callback) { // lưu những thông tin cần thiết cho session
        return callback(null, user.id);                     // chỉ nên lưu những thông tin cần thiết, không lưu thông tin nhạy cảm
    });

    passport.deserializeUser(async function (id: number, cb) { // id lấy từ session đã callback từ serializeUser
        // querry in DB
        const userInDB = await getUserWithRoleById(id);
        return cb(null, userInDB);
    });
}