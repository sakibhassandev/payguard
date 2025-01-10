import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

class CustomError extends CredentialsSignin {
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  code = this.message;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          if (!email || !password) {
            throw new CustomError("All fields are required.");
          }

          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              password: true,
              role: true,
            },
          });

          if (!user) {
            throw new CustomError("User does not exist with this email.");
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) {
            throw new CustomError("Invalid credentials.");
          }
          user.password = "";
          return user;
        } catch (error) {
          if (error instanceof CustomError) {
            throw new CustomError(error.message);
          } else {
            throw new CustomError("Something went wrong.");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
