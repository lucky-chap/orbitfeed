import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { checkUserId } from "../helpers";

export const createActivity = mutation({
  args: {
    orbitId: v.id("orbits"),
    actorId: v.id("users"),
    actorName: v.string(),
    actorImage: v.string(),
    action: v.string(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const { orbitId, actorId, actorName, actorImage, action } = args;
    const activityId = await ctx.db.insert("activityFeed", {
      orbitId,
      actorId,
      actorName,
      actorImage,
      action,
    });
    return activityId;
  },
});

export const getActivitiesForOrbit = query({
  args: {
    orbitId: v.id("orbits"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const { orbitId, paginationOpts } = args;
    const activities = await ctx.db
      .query("activityFeed")
      .withIndex("orbit_id", (q) => q.eq("orbitId", orbitId))
      .order("desc")
      .paginate(paginationOpts);

    return activities;
  },
});
