import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { internal } from "../_generated/api";
import {
  action,
  internalMutation,
  mutation,
  query,
} from "../_generated/server";
import { auth } from "../auth";
import { checkUserId } from "../helpers";

// I could nest feedback in the project object
// but I want to keep the project object clean
// and avoid unnecessary performance issues.
// Even Convex advices so over here:
// https://docs.convex.dev/database/document-ids#trading-off-deeply-nested-documents-vs-relationships

export const fetchFeedbackForOrbit = query({
  args: {
    paginationOpts: paginationOptsValidator,
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    const { orbitId } = args;
    await checkUserId(ctx);
    const feedback = await ctx.db
      .query("feedback")
      .withIndex("orbit_id", (q) => q.eq("orbitId", orbitId))
      .filter((q) => q.eq(q.field("orbitId"), orbitId))
      .order("desc")
      .paginate(args.paginationOpts);

    return feedback;
  },
});

// used on the api route. no auth needed here
export const fetchFeedbackForOrbitNoAuth = query({
  args: {
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    const { orbitId } = args;

    const feedback = await ctx.db
      .query("feedback")
      .withIndex("orbit_id", (q) => q.eq("orbitId", orbitId))
      .filter((q) => q.eq(q.field("orbitId"), orbitId))
      .order("desc")
      .collect();

    return {
      feedback,
      length: feedback.length,
    };
  },
});

export const getFeedbackLength = query({
  args: {
    orbitId: v.id("orbits"),
  },
  handler: async (ctx, args) => {
    const { orbitId } = args;
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("orbitId"), orbitId))
      .order("desc")
      .collect();

    return feedback.length;
  },
});

// fetch single feedback by id
export const fetchSingleFeedback = query({
  args: {
    id: v.optional(v.id("feedback")),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const feedback = await ctx.db.get(id);
    return feedback;
  },
});

// Create new feedback for orbit
export const createFeedbackForOrbit = mutation({
  args: {
    orbitId: v.id("orbits"),
    by: v.string(),
    content: v.string(),
    location: v.string(),
    country_code: v.string(),
    type: v.string(),
    route: v.string(),
    image: v.string(),
    image_storage_id: v.optional(v.id("_storage")),
    status: v.string(),
  },
  handler: async (
    ctx,
    {
      orbitId,
      by,
      content,
      location,
      country_code,
      type,
      route,
      image,
      image_storage_id,
      status,
    }
  ) => {
    const feedbackId = await ctx.db.insert("feedback", {
      orbitId,
      by,
      content,
      location,
      country_code,
      type,
      route,
      image,
      image_storage_id,
      status: status,
    });

    return feedbackId;
  },
});

// Create new feedback for orbit (no auth)
export const createFeedbackForOrbitNoAuth = mutation({
  args: {
    orbitId: v.id("orbits"),
    by: v.string(),
    content: v.string(),
    location: v.string(),
    country_code: v.string(),
    type: v.string(),
    route: v.string(),
    image: v.string(),
    image_storage_id: v.optional(v.id("_storage")),
    status: v.string(),
  },
  handler: async (
    ctx,
    {
      orbitId,
      by,
      content,
      location,
      country_code,
      type,
      route,
      image,
      image_storage_id,
      status,
    }
  ) => {
    const feedbackId = await ctx.db.insert("feedback", {
      orbitId,
      by: by,
      content: content,
      location: location,
      country_code: country_code,
      type: type,
      route: route,
      image: image,
      image_storage_id: image_storage_id,
      status: status,
    });

    return feedbackId;
  },
});

// update feedback status

export const updateFeedbackStatus = mutation({
  args: {
    feedbackId: v.id("feedback"),
    feedbackStatus: v.string(),
  },
  handler: async (ctx, { feedbackId, feedbackStatus }) => {
    await checkUserId(ctx);
    await ctx.db.patch(feedbackId, {
      status: feedbackStatus,
    });
    return "feedback_status_updated";
  },
});

// update image for feedback
export const updateFeedbackImage = mutation({
  args: {
    feedbackId: v.id("feedback"),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.feedbackId, {
      image: args.image,
    });

    return "feedback_updated";
  },
});

// TODO: make this an internal mutation to be used
// by other mutations
// export const deleteFeedback = mutation({
//   args: {
//     feedbackId: v.id("feedback"),
//     storageId: v.optional(v.id("_storage")),
//   },
//   handler: async (ctx, args) => {
//     await checkUserId(ctx);
//     const deletedFeedback = await ctx.db.delete(args.feedbackId);
//     if (deletedFeedback !== null) {
//       if (args.storageId !== undefined) {
//         const deleted = await ctx.storage.delete(args.storageId);
//         if (deleted !== null) {
//           return "deleted";
//         } else {
//           return null;
//         }
//       }

//       return "deleted";
//     } else {
//       return null;
//     }
//   },
// });

export const deleteFeedback = internalMutation({
  args: {
    feedbackId: v.id("feedback"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const deletedFeedback = await ctx.db.delete(args.feedbackId);
    if (deletedFeedback !== null) {
      return "deleted";
    } else {
      return null;
    }
  },
});

export const deleteFeedbackAndFile = action({
  args: {
    feedbackId: v.id("feedback"),
    storageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const deleteFeedbackResult = await ctx.runMutation(
      internal.app.feedback.deleteFeedback,
      {
        feedbackId: args.feedbackId,
      }
    );
    if (deleteFeedbackResult !== null) {
      if (args.storageId !== undefined) {
        const deletedFileResult = await ctx.runMutation(
          internal.app.files.deleteFile,
          {
            storageId: args.storageId,
          }
        );
        if (deletedFileResult !== null) {
          return "deleted";
        } else {
          return null;
        }
      } else {
        return "deleted";
      }
    } else {
      return null;
    }
  },
});
