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
                authorize: async credentials => {
                    console.log(credentials)
                    // const user = /*{}*/
                },
            }),
        ],
        pages: {
            signIn: '/login',
        },
    })
