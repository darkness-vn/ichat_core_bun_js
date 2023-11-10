import { Elysia, Context } from "elysia";
import AuthController from "./auth.controller";
import { RegisterBody } from "../../request.body/auth";
import { JWTPayloadSpec } from "@elysiajs/jwt";


const auth = new Elysia()
  .decorate("body", new RegisterBody)
  .decorate("jwt", { sign: async(payload: JWTPayloadSpec) => new String, verify: async(payload: string) => new Object })
  .post('/register', AuthController.register)

export default auth