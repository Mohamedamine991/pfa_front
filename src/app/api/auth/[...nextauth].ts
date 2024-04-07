import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import axios from "axios"
const nextOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "email", placeholder: "Enter Email" },
        password: { label: "password", placeholder: "Enter Pass" },
      },
      async authorize(creds: any) {
        try {
          const res = await axios.post(
            `${process.env.BACKEND}/auth/login`,
            creds,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          if (res.data) {
            const { user, jwt } = res.data
            return { ...user, jwt }
          }

          return null
        } catch (e) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },

  callbacks: {
    session: async ({ session, token }: any) => {
      session.id = token.id
      session.jwt = token.jwt
      return Promise.resolve(session)
    },
    jwt: async ({ token, user, account }: any) => {
      if (account?.type === "credentials") {
        token.id = user.id
        token.jwt = user.jwt
        return Promise.resolve(token)
      }
      const isSignIn = !!user
      if (isSignIn) {
        token.id = user.id
        token.jwt = user.jwt
      }
      return Promise.resolve(token)
    },
  },
  secret: process.env.TOKEN_SECRET as string,

  debug: true,
}

const handler = NextAuth(nextOptions)

export { handler as GET, handler as POST }
