import NextAuth, { User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb"; 
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import type { Account } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({ email: credentials?.email });
        if (!user) throw new Error("Email tidak ditemukan");

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Password salah");

        return { 
            id: user._id.toString(), 
            email: user.email, 
            name: user.name?? "Unknown",
            parentName: user.parentName ?? "Unknown",
            isCompleted: user.isCompleted ?? false, 
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/masuk",
    error: "/masuk", 
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
        const client = await clientPromise;
        const usersCollection = client.db().collection("users");

        if (account?.provider === "google") {
          const existingUser = await usersCollection.findOne({ email: user.email });

          if (!existingUser) {
            await usersCollection.insertOne({
              name: user.name ?? "Unknown",
              email: user.email ?? "",
              provider: "google",
              createdAt: new Date(),
              isCompleted: false,
              parentName: null,
            });
            user.isCompleted = false;
            user.parentName = "Unknown";
          } else {
            user.isCompleted = existingUser.isCompleted ?? false;
            user.parentName = existingUser.parentName ?? "Unknown";
          }
        }

        return true;
    },

    async jwt({ token, user }: {token: JWT; user?: User }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "Unknown",
          parentName: user.parentName ?? "Unknown",
          isCompleted: user.isCompleted ?? false,
        };
      }
      return token;
    },
    
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.user?.id ?? "",
        email: token.user?.email ?? "",
        name: token.user?.name ?? "User",
        parentName: token.user?.parentName ?? "Unknown",
        isCompleted: token.user?.isCompleted ?? false,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };