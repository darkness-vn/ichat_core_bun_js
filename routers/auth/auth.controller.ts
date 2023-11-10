import { Context } from "elysia";
import { RegisterBody } from "../../request.body/auth";
import { User } from "../../models/user.model";
import * as alert from "../../utils/alert"
import { JWTPayloadSpec } from '@elysiajs/jwt'

const REGEX = {
    INCLUDE_SPACE: RegExp(`^(?!\\s*$)[^\\s]+$`),
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}

export default class AuthController {
    static async register(
        ctx: Context<{ body: RegisterBody }> & {
            jwt: {
                sign: (payload: Object) => Promise<unknown>,
                verify: (payload: string) => Promise<unknown>
            }
        })
    {
        try {

            const { username, password, email } = ctx.body

            if (!REGEX.INCLUDE_SPACE.test(username)) {
                throw new Error(`Tên người dùng không được có khoảng trắng`)
            }

            if (!REGEX.INCLUDE_SPACE.test(password)) {
                throw new Error(`Mật khẩu không được có khoảng trắng`)
            }

            if (!REGEX.EMAIL.test(email)) {
                throw new Error(`Email không hợp lệ`)
            }

            const user = await User.create({ username, password, email })
            const token = await ctx.jwt.sign({ user:"123123123" })

            // jwt cua framework hinh nhu ko work

            console.log(token)

            return new Response(JSON.stringify(token))
        } catch (error: any) {

            alert.error(error)

            return new Response(JSON.stringify({
                status: 400,
                message: error.message
            }))
        }
    }
}