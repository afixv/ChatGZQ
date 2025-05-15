import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string | null;
        parentName?: string | null;
        isCompleted?: boolean;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            parentName?: string | null;
            isCompleted?: boolean;
        } & DefaultSession["user"];
    }

    interface Account {
        provider: string;
        type: string;
        providerAccountId: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: {
            id: string;
            email: string;
            name?: string | null;
            parentName?: string | null;
            isCompleted?: boolean;
        };
    }
}