import passport from "passport";
import { Strategy as LocalStrategy } from "passport";
import { handleLogin } from "../services/client/auth.service";

export const configPassportLocal = () => {
    passport.use(new LocalStrategy(function verify(username, password, callback) {
        return handleLogin(username, password, callback);
    }));
}