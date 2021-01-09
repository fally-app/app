import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default (req, res) =>
    NextAuth(req, res, {
        session: {
            jwt: true,
        },
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        providers: [
            Providers.Credentials({
                authorize: {
                    // const user = /*{}*/
                },
            }),
        ],
        pages: {
            signIn: '/login',
        },
    })
