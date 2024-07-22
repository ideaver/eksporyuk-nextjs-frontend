// pages/api/auth/[...nextauth].ts
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      token: string | undefined;
      role: string | undefined;
    } & DefaultSession["user"];
  }
  interface User {
    role: string | undefined;
    token: string | undefined;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string | undefined;
    role: string | undefined;
  }
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        id: { label: "User Id", type: "text" },
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
        image: { label: "Image", type: "text" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials, req) {
        var user;
        if (process.env.NEXT_PUBLIC_MAINTENANCE == "true") {
          user = {
            id: "1",
            token: "token",
            name: "admin",
            email: "admin@mail.com",
            password: "admin",
            role: "ADMIN",
            image: "/media/avatars/blank.png",
          };
        } else {
          user = {
            token: req?.body?.token,
            id: req?.body?.id,
            name: req?.body?.name,
            email: req?.body?.email,
            password: req?.body?.password,
            role: req?.body?.role,
            image: req?.body?.image,
          };
        }
        if (
          (user.email === credentials?.email &&
            user.password === credentials?.password) ||
          user.token == undefined
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth",
    error: "/error",
    newUser: "/home",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.token = token.token;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
  },
});
