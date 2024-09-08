import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { auth } from "../auth";
import { checkUserId } from "../helpers";

export const searchTeams = query({
  args: {
    searchTerm: v.string(),
    paginationOpts: paginationOptsValidator,
    userId: v.any(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const searchResults = await ctx.db
      .query("teams")

      .filter((q) => q.eq(q.field("leader"), args.userId))
      .paginate(args.paginationOpts);

    return searchResults;
  },
});

// since a user can only have a maximum of 5 teams, we can fetch without paginating
export const fetchTeams = query({
  args: {
    userId: v.any(),
    user_email: v.any(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const teams = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("leader"), args.userId))
      .order("desc")
      .collect();

    return teams;
  },
});

// fetch single team by id
export const fetchSingleTeam = query({
  args: {
    id: v.optional(v.id("teams")),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const { id } = args;
    if (!id) return null;
    const team = await ctx.db.get(id);
    return team;
  },
});

// fetch single team by id on a route handler (no auth)
export const fetchSingleTeamNoAuth = query({
  args: {
    id: v.optional(v.id("teams")),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const team = await ctx.db.get(id);
    return team;
  },
});

// Create a new team
export const createTeam = mutation({
  args: {
    name: v.string(),
    leader: v.id("users"),
  },
  handler: async (ctx, { name, leader }) => {
    const teamId = await ctx.db.insert("teams", {
      name,
      leader,
    });

    return teamId;
  },
});

// Update a team
export const updateTeam = mutation({
  args: {
    teamId: v.id("teams"),
    name: v.string(),
    leader: v.id("users"),
  },
  handler: async (ctx, { teamId, name, leader }) => {
    await checkUserId(ctx);
    await ctx.db.patch(teamId, {
      name,
      leader,
    });
    return "updated";
  },
});

// Delete a team & all of its members
export const deleteTeam = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const deletedTeam = await ctx.db.delete(args.teamId);
    if (deletedTeam !== null) {
      const members = await ctx.db
        .query("members")
        .filter((q) => q.eq(q.field("teamId"), args.teamId))
        .collect();
      if (members !== null) {
        members.map(async (member) => {
          await ctx.db.delete(member._id);
        });
        return "deleted";
      }
      return "deleted";
    } else {
      return null;
    }
  },
});
