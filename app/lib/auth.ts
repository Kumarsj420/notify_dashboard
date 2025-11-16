import AuthError from "../misc/AuthError";
import API from "../services/api";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Domain interface
export interface Domain {
  id: string;
  domain: string;
  isMain: boolean;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: Date;
}

// Company interface
export interface Company {
  id: number;
  vanity: string;
  companyId: number;
  companyMemberId: number;
  companyName: string;
  description: string;
  website: string;
  domain: string;
  linkedin: string | null;
  facebook: string;
  twitter: string;
  location: string;
  industry: string;
  founded: number;
  revenue: string;
  followersCount: number;
  employeesCount: number;
  countryCode: string;
  logoUrl: string;
  companyType: string;
  isActive: boolean;
  userId: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
}

// User interface matching Prisma schema
export interface User {
  id: string;
  email: string;
  emailVerified?: Date | null;
  name: string;
  userType: "USER" | "ADMIN";
  plan: "BASIC" | "PRO" | "ENTERPRISE";
  status: "PENDING" | "ACTIVE" | "REJECTED" | "SUSPENDED" | "DELETED";
  isActive: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  domains: Domain[];
  companies: Company[];
  token?: string; // For authentication token
  message?: string;
}

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string; // Required by NextAuth
    email: string; // Required by NextAuth
    emailVerified?: Date | null; // Required by NextAuth
    name: string;
    userType: "USER" | "ADMIN";
    plan: "BASIC" | "PRO" | "ENTERPRISE";
    status: "PENDING" | "ACTIVE" | "REJECTED" | "SUSPENDED" | "DELETED";
    isActive: boolean;
    emailVerificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    domains: Domain[];
    companies: Company[];
    token?: string;
    message?: string;
  }

  interface Session {
    token?: string;
    user: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    jwt?: string;
    user?: {
      id: string;
    };
  }
}

// Function to get user with defaults
const GetUserWithDefaults = (user: User | null): User => {
  if (!user) {
    return {
      id: "",
      email: "",
      emailVerified: null,
      name: "",
      userType: "USER",
      plan: "BASIC",
      status: "PENDING",
      isActive: true,
      emailVerificationToken: undefined,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
      lastLogin: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      domains: [],
      companies: [],
      token: undefined,
      message: undefined,
    };
  }

  return {
    id: user.id || "",
    email: user.email || "",
    emailVerified: user.emailVerified ?? null,
    name: user.name || "",
    userType: user.userType || "USER",
    plan: user.plan || "BASIC",
    status: user.status || "PENDING",
    isActive: user.isActive ?? true,
    emailVerificationToken: user.emailVerificationToken,
    resetPasswordToken: user.resetPasswordToken,
    resetPasswordExpires: user.resetPasswordExpires,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt || new Date(),
    updatedAt: user.updatedAt || new Date(),
    domains: user.domains || [],
    companies: user.companies || [],
    token: user.token,
    message: user.message,
  };
};

const config: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const loginResp = await API.post<
          { email: string; password: string },
          User
        >("/auth/login", {
          email: credentials?.email as string,
          password: credentials?.password as string,
        }).catch((err) => {
          console.log("errror here", err);
          return { message: err, token: null };
        });
        console.log("LOGIN RESP", loginResp);
        if (loginResp?.message)
          throw new AuthError(
            JSON.stringify({
              message: loginResp?.message,
            })
          );
        if (loginResp?.token) {
          // console.log('user', loginResp?.token);
          return { id: 1, token: loginResp?.token } as unknown as User;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.token;
        token.user = {
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.jwt) {
        session.token = String(token.jwt);
        const user = await API.get<User>(
          "/user/me",
          {},
          { headers: { Authorization: `Bearer ${token.jwt}` } }
        );
        const userWithDefaults = GetUserWithDefaults(user);
        session.user = {
          ...userWithDefaults,
          emailVerified: userWithDefaults.emailVerified ?? null,
        };
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

export default config;
