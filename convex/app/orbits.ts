import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"

import { Id } from "../_generated/dataModel"
import { internalMutation, mutation, query } from "../_generated/server"
import { auth } from "../auth"

// fetch the first 10 project projects
// add pagination later
// write another fetch function that fetches the first created 6 projects
// this functin would be used when the user is not on a pro plan. so always
// in client whether the user is on a pro plan or not.
export const fetchOrbits = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.any(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (userId === null) {
      throw new Error("Client is not authenticated!")
    }
    const orbits = await ctx.db
      .query("orbits")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .paginate(args.paginationOpts)

    return orbits
  },
})

// fetch single orbit by id
export const fetchSingleOrbit = query({
  args: {
    id: v.optional(v.id("orbits")),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (userId === null) {
      throw new Error("Client is not authenticated!")
    }
    const { id } = args
    if (!id) return null
    const orbit = await ctx.db.get(id)
    return orbit
  },
})

// fetch single orbit by id on a route handler (no auth)
export const fetchSingleOrbitNoAuth = query({
  args: {
    id: v.optional(v.id("orbits")),
  },
  handler: async (ctx, args) => {
    const { id } = args
    if (!id) return null
    const orbit = await ctx.db.get(id)
    return orbit
  },
})

// Create a new orbit
export const createOrbit = mutation({
  args: {
    name: v.string(),
    website: v.string(),
  },
  handler: async (ctx, { name, website }) => {
    const userId = await auth.getUserId(ctx)
    if (userId === null) {
      throw new Error("Client is not authenticated!")
    }
    const orbitId = await ctx.db.insert("orbits", {
      userId,
      name,
      website,
      status: "Active",
    })

    return orbitId
  },
})

// Update an orbit
export const updateOrbit = mutation({
  args: {
    orbitId: v.id("orbits"),
    name: v.string(),
    website: v.string(),
    status: v.string(),
  },
  handler: async (ctx, { orbitId, name, website, status }) => {
    const userId = await auth.getUserId(ctx)
    if (userId === null) {
      throw new Error("Client is not authenticated!")
    }
    await ctx.db.patch(orbitId, {
      name,
      website,
      status,
    })
    return "updated"
  },
})

// Delete a orbit & all of its feedback
// 1. First delete the project
// 2. Query all the feedback for the project
// 3. Delete all the feedback.
export const deleteOrbit = mutation({
  args: {
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (userId === null) {
      throw new Error("Client is not authenticated!")
    }
    const deletedOrbit = await ctx.db.delete(args.orbitId)
    if (deletedOrbit !== null) {
      const feedbacks = await ctx.db
        .query("feedback")
        .filter((q) => q.eq(q.field("orbitId"), args.orbitId))
        .collect()
      if (feedbacks !== null) {
        feedbacks.map(async (feedback) => {
          await ctx.db.delete(feedback._id)
        })
        return "deleted"
      }
      // since null is always returned (I think), I want to return a
      // string to indicate that the project has been deleted.
      return "deleted"
    } else {
      return null
    }
  },
})
