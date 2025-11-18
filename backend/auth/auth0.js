import {auth} from "express-oauth2-jwt-bearer"
import dotenv from "dotenv"

dotenv.config()

export const jwtCheck = auth({
    audience:process.env.AUTH0_AUDIENCE,
    issuerBaseURL:"https://dev-0qnd2er0ikfxb611.us.auth0.com/",
    tokenSigningAlg:"RS256" //algorithm
})