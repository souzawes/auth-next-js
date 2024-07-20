import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import db from '@/lib/db'
import { compareSync } from 'bcrypt-ts';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [Credentials({
    credentials: {
      email: {
        label: 'Email',
        type: 'email'
      },
      password: {
        label: 'Password',
        type: 'password'
      }
    },
    async authorize(credentials) {
      const email = credentials.email as string
      const password = credentials.password as string

      if (!email || !password) {
        return null
      }
      const user = await db.user.findUnique({
        where: {
          email: email
        }
      })
      if (!user) {
        return null
      }
      const isValidPassword = compareSync(password, user.password ?? '')

      if (!isValidPassword) {
        return null
      }

      return { id: user.id, name: user.name, email: user.email }

    }
  })
  ],
});