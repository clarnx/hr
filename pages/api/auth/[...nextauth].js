import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '../../../libs/api';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Sign in with Email',
      credentials: {
        phone_number: { label: 'phone_number', type: 'number' },
        otp: { label: 'otp', type: 'number' },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */

        
        try {


          console.log("Phone no", credentials.phone_number)
          console.log("Generated Otp", credentials.generatedOtp)
          console.log("ENTERED Otp", credentials.otp)

          console.log(credentials.generatedOtp == credentials.otp)

          if(credentials.generatedOtp == credentials.otp) {
            

            let user = await getUser(credentials.phone_number)

            console.log("USER", user)
            if(user) {
              return {user: user, id: user.id};
            } else {
              throw new Error("User not found")
              return null
            }
          } else {
            return null
          }

          
        } catch (error) {
          // Sign In Fail
          console.log(error)
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user = token.user;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user, account }) => {
      console.log("Account", account);
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.user = user;
      }
      return Promise.resolve(token);
    },
  },
});