import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../../../models/user.js";
import varenv from "../../../dotenv.js";

const cookieExtractor = req => {
    console.log(req.cookies)
    const token = req.cookies ? req.cookies.jwtCookie : {}
    return token
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: varenv.jwt_secret
}

export const strategyJWT = new JwtStrategy(jwtOptions, async(payload, done) => {
    try {
        const user = await userModel.findById(payload.user._id)
        if (!user) {
            return done(null, false)
        } else {
            return done(null, user)
        }
    } catch (error) {
        return done(error, null)
    }
})