import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
  await connectDb();

  await User.updateOne(
    { email: user.email },
    {
      $setOnInsert: {
        email: user.email,
        name: user.name || "",
        username: user.email.split("@")[0],
        profilepic: user.image || "/default-profile.jpg",
        coverpic: "/default-cover.jpg",
        type: "donater",
        description: "",
        razorpayid: "",
        razorpaysecret: ""
      }
    },
    { upsert: true }
  );

  return true;
},

    async session({ session }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.name = dbUser.username;
        session.user.profilepic = dbUser.profilepic;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
