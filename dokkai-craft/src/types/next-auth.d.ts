// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
//
//   interface User {
//     id: string;
//   }
// }

declare module "next-auth" {
  import {DefaultSession} from "next-auth";

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    userId?: string;
  }
}