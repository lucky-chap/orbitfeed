import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"

import { mutation, query } from "../_generated/server"

// I could nest feedback in the project object
// but I want to keep the project object clean
// and avoid unnecessary performance issues.
// Even Convex advices so over here:
// https://docs.convex.dev/database/document-ids#trading-off-deeply-nested-documents-vs-relationships

// fetch the first 10 feedback for an orbit
export const fetchFeedbackForOrbit = query({
  args: {
    paginationOpts: paginationOptsValidator,
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    const { orbitId } = args
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("orbitId"), orbitId))
      .order("desc")
      .paginate(args.paginationOpts)

    // remember to paginate the results
    // return both the feedback and the length

    return feedback
  },
})

// fetch the first 10 feedback for an orbit (no auth)
export const fetchFeedbackForOrbitNoAuth = query({
  args: {
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    const { orbitId } = args
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("orbitId"), orbitId))
      .order("desc")
      .collect()

    // remember to paginate the results
    // return both the feedback and the length

    return {
      feedback,
      length: feedback.length,
    }
  },
})

export const getFeedbackLength = query({
  args: {
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    const { orbitId } = args
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("orbitId"), orbitId))
      .order("desc")
      .collect()

    return feedback.length
  },
})

// fetch single feedback by id
export const fetchSingleFeedback = query({
  args: {
    id: v.optional(v.id("feedback")),
  },
  handler: async (ctx, args) => {
    const { id } = args
    if (!id) return null
    const feedback = await ctx.db.get(id)
    return feedback
  },
})

// Create new feedback for orbit
export const createFeedbackForOrbit = mutation({
  args: {
    orbitId: v.id("orbits"),
    by: v.string(),
    content: v.string(),
    location: v.string(),
    type: v.string(),
    image: v.string(),
  },
  handler: async (ctx, { orbitId, by, content, location, type, image }) => {
    const feedbackId = await ctx.db.insert("feedback", {
      orbitId,
      by,
      content,
      location,
      type,
      image,
    })

    return feedbackId
  },
})

// Create new feedback for orbit (no auth)
export const createFeedbackForOrbitNoAuth = mutation({
  args: {
    orbitId: v.id("orbits"),
    by: v.string(),
    content: v.string(),
    location: v.string(),
    type: v.string(),
    image: v.string(),
  },
  handler: async (ctx, { orbitId, by, content, location, type, image }) => {
    const feedbackId = await ctx.db.insert("feedback", {
      orbitId,
      by: by,
      content: content,
      location: location,
      type: type,
      image: image,
    })

    return feedbackId
  },
})
