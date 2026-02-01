import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "../services/client/auth.service";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/client";

export const configPassportLocal = () => {
    passport.use(new LocalStrategy(function verify(username, password, callback) {
        return handleLogin(username, password, callback);
    }));

    passport.serializeUser(function (user: any, cb) {
        process.nextTick(function () {
            return cb(null, user.id);
        });
    });

    passport.deserializeUser(async function (id: number, cb) {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        return cb(null, user);
    });
}