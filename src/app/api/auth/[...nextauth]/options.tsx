import prisma from '../../../../lib/prismadb'
import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";


export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials:any){
                const {email, password} = credentials

                try{
                    const user = await prisma.user.findUnique({where:{email}})

                    if(!user || !user.hashedPassword){
                        return null
                    }
                    const isValid = await bcrypt.compare(password, user.hashedPassword);
                        if (!isValid) {
                        return null;
                    }
                    return user;
                }catch(error){
                    console.log('error logging in', error)
                    return null
                }
            }
        })
    ],
    session:{
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/'
    },
    callbacks: {
        /** JWT callback is called on sign-in and whenever a token is refreshed */
        async jwt({ token, user }) {
          // On initial sign in, attach the user.id into the JWT
          if (user) {
            token.id = user.id;
          }
          return token;
        },
        /** Session callback is called whenever getSession/getServerSession is used */
        async session({ session, token }) {
          // Make the user.id available on session.user.id
          if (session.user && token.id) {
            session.user.id = token.id as string;
          }
          return session;
        },
      },
}