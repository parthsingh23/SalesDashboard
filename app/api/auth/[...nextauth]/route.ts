import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const response = await fetch(`${process.env.API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        const meResponse = await fetch(`${process.env.API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        if (!meResponse.ok) {
          return null;
        }

        const user = await meResponse.json();

        return {
          id: String(user.id),
          email: user.email,
          role: user.role,
          accessToken: data.access_token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;

      if (session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
