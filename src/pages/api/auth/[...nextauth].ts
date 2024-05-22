// pages/api/auth/[...nextauth].ts
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      role: string | undefined;
    } & DefaultSession["user"];
  }
  interface User {
    role: string | undefined;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
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
      },
      async authorize(credentials, req) {
        var user;
        if(process.env.NEXT_PUBLIC_MAINTENANCE == "true") {
          user = {
            id: "1",
            name: "admin",
            email: "admin@mail.com",
            password: "admin",
            role: "ADMIN",
            image: "/media/avatars/300-1.jpg",
          };
        } else {
          user = {
            id: req?.body?.id,
            name: req?.body?.name,
            email: req?.body?.email,
            password: req?.body?.password,
            role: req?.body?.role,
            image: req?.body?.image,
          };
        }
        if (
          user.email === credentials?.email &&
          user.password === credentials?.password
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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
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
