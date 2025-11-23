import {auth} from "express-oauth2-jwt-bearer" //middleware
import dotenv from "dotenv"

dotenv.config()

export const jwtCheck = auth({ //checks Authorization Bearer<token>
    audience:process.env.AUTH0_AUDIENCE, //Token is intended for your API
    issuerBaseURL:"https://dev-0qnd2er0ikfxb611.us.auth0.com/", //Token was issued by your Auth0 tenant
    tokenSigningAlg:"RS256" //algorithm
})














//Audience -> The API identifier that tells Auth0 which API this token is meant for
//issuerBaseURL -> The URL of the Auth0 tenant that issued the token.
//"RS256" → Most secure (recommended)