// THIS IS NOT THE ACTUAL USER MODEL
// THIS IS USED FOR ACCESSING PARTS OF THE
// ORIGINAL USER MODEL/TABLE CREATED BY THE AUTH PROVIDER
import { v } from "convex/values";

import { query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    // TODO: update to current API
    const userId = await auth.getUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});

export const getUser = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    return user;
  },
});

export const account = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { userId } = args;
    const account = await ctx.db
      .query("authAccounts")
      .filter((q) => q.eq(q.field("userId"), userId))
      .unique();

    // remember to paginate the results
    // return both the account and the length

    return account;
  },
});
