import { v } from "convex/values";

import { IParticipant, ITeam, IUser } from "@/lib/types";

import { action, internalQuery, mutation, query } from "../_generated/server";
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

    let userIds = members.map((member) => member.memberId);
    let docId = members.map((member) => member._id);
    let participants: IParticipant[] = [];
    for (let i = 0; i < userIds.length; i++) {
      const user = await ctx.db.get(userIds[i]);
      // get the member here
      const member = await ctx.db.get(docId[i]);
      if (user && member) {
        participants.push({ ...user, role: member.role });
      }
    }

    return participants;
  },
});

export const getSingleMemberForTeam = query({
  args: {
    teamId: v.id("teams"),
    memberId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const member = await ctx.db
      .query("members")
      .withIndex("team_id", (q) => q.eq("teamId", args.teamId))
      .filter((q) => q.eq(q.field("memberId"), args.memberId))
      .first();

    return member;
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

export const updateMemberRole = mutation({
  args: {
    teamId: v.id("teams"),
    memberId: v.id("users"),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const member = await ctx.db
      .query("members")
      .withIndex("team_id", (q) => q.eq("teamId", args.teamId))
      .filter((q) => q.eq(q.field("memberId"), args.memberId))
      .first();

    if (member) {
      await ctx.db.patch(member._id, { role: args.role });
    }

    return member;
  },
});

export const getTeamsUserBelongsTo = query({
  args: {
    memberId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const members = await ctx.db
      .query("members")
      .withIndex("member_id", (q) => q.eq("memberId", args.memberId))
      .order("desc")
      .collect();

    let teamIds = members.map((member) => member.teamId);
    // console.log("Team ids: ", teamIds);
    // now for each id, fetch teams basedd on these ids and put into new array
    // TODO: Find a better way of returning teams. If the user is in 100 teams
    // this will make 100 db calls, which is not so good for performance
    let teams: ITeam[] = [];
    for (let i = 0; i < teamIds.length; i++) {
      const team = await ctx.db.get(teamIds[i]);
      if (team) {
        teams.push(team);
      }
    }
    console.log("Teams: ", teams);

    return teams;
  },
});
