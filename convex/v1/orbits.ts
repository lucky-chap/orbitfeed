import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { checkUserId } from "../helpers";

export const searchOrbits = query({
  args: {
    searchTerm: v.string(),
    paginationOpts: paginationOptsValidator,
    userId: v.any(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const searchResults = await ctx.db
      .query("orbits")
      .withSearchIndex("search_body", (q) => q.search("name", args.searchTerm))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .paginate(args.paginationOpts);

    return searchResults;
  },
});

// TODO?: write another fetch function that fetches the first created 6 projects
// this functin would be used when the user is not on a pro plan. so always
// in client whether the user is on a pro plan or not.
export const fetchOrbits = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.any(),
    user_email: v.any(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const orbits = await ctx.db
      .query("orbits")
      .withIndex("creator", (q) => q.eq("userEmail", args.user_email))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .paginate(args.paginationOpts);

    return orbits;
  },
});

// fetch ortbis for a team
export const fetchOrbitsForTeam = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    const orbits = await ctx.db
      .query("orbits")
      .withIndex("team", (q) => q.eq("teamId", teamId))
      .order("desc")
      .collect();

    return orbits;
  },
});

// fetch single orbit by id
export const fetchSingleOrbit = query({
  args: {
    id: v.optional(v.id("orbits")),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const { id } = args;
    if (!id) return null;
    const orbit = await ctx.db.get(id);
    return orbit;
  },
});

// fetch single orbit by id on a route handler (no auth)
export const fetchSingleOrbitNoAuth = query({
  args: {
    id: v.optional(v.id("orbits")),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const orbit = await ctx.db.get(id);
    return orbit;
  },
});

// Create a new orbit
export const createOrbit = mutation({
  args: {
    name: v.string(),
    website: v.string(),
    userEmail: v.string(),
    teamId: v.optional(v.id("teams")),
  },
  handler: async (ctx, { name, website, userEmail, teamId }) => {
    const userId = await checkUserId(ctx);
    const orbitId = await ctx.db.insert("orbits", {
      userId,
      userEmail,
      name,
      website,
      status: "Active",
      teamId,
    });

    return orbitId;
  },
});

// Update an orbit
export const updateOrbit = mutation({
  args: {
    orbitId: v.id("orbits"),
    name: v.string(),
    website: v.string(),
    status: v.string(),
    teamId: v.optional(v.id("teams")),
  },
  handler: async (ctx, { orbitId, name, website, status, teamId }) => {
    await checkUserId(ctx);
    await ctx.db.patch(orbitId, {
      name,
      website,
      status,
      teamId,
    });
    return "updated";
  },
});

// Delete a orbit & all of its feedback
export const deleteOrbit = mutation({
  args: {
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const deletedOrbit = await ctx.db.delete(args.orbitId);
    if (deletedOrbit !== null) {
      const feedbacks = await ctx.db
        .query("feedback")
        .filter((q) => q.eq(q.field("orbitId"), args.orbitId))
        .collect();
      if (feedbacks !== null) {
        feedbacks.map(async (feedback) => {
          await ctx.db.delete(feedback._id);
        });
        return "deleted";
      }
      return "deleted";
    } else {
      return null;
    }
  },
});

export const createAnalysisDate = mutation({
  args: {
    orbitId: v.id("orbits"),
    date: v.number(),
  },
  handler: async (ctx, { orbitId, date }) => {
    await checkUserId(ctx);
    await ctx.db.patch(orbitId, {
      lastAnalysed: date,
    });
    return "updated";
  },
});
