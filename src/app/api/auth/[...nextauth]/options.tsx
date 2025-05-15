import prisma from '../../../../lib/prismadb'
import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'

const bcrypt = require('bcrypt')

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials:{},

            async authorize(credentials:any){
                const {email, password} = credentials

                try{
                    const user = await prisma.user.findUnique({where:{email}})

                    if(!user){
                        return null
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
    }
}