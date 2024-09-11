import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { checkUserId } from "../helpers";

export const getMembersForTeam = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const members = await ctx.db
      .query("members")
      .withIndex("team_id", (q) => q.eq("teamId", args.teamId))
      .order("desc")
      .collect();

    return members;
  },
});

export const addMemberToTeam = mutation({
  args: {
    teamId: v.id("teams"),
    memberId: v.id("users"),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const memberId = await ctx.db.insert("members", {
      teamId: args.teamId,
      memberId: args.memberId,
      role: args.role,
    });

    return memberId;
  },
});
