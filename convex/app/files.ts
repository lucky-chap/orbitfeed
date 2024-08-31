import { v } from "convex/values";

import { Id } from "../_generated/dataModel";
import { internalMutation, mutation } from "../_generated/server";
import { checkUserId } from "../helpers";

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx, args) => {
    // await checkUserId(ctx);

    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveStorageId = mutation({
  // You can customize these as you like
  args: {
    storageId: v.id("_storage"),
    feedbackId: v.id("feedback"),
    // other args...
  },
  handler: async (ctx, args) => {
    // await checkUserId(ctx);
    const uploadId = await ctx.db.patch(args.feedbackId, {
      image_storage_id: args.storageId,
    });
    // or `patch`/`replace`. this method would be used for updating the storageId
    //   ctx.db.patch(args.storageId, {
    //     storageId: args.storageId,
    //     projectId: args.projectId,
    //   });

    return uploadId;
  },
});

export const serveFile = mutation({
  args: {
    feedbackId: v.id("feedback"),
  },
  handler: async (ctx, args) => {
    // await checkUserId(ctx);
    // 1. Query feedbackImages table and find the record with the orbitId
    // 2. Get the storageId
    // 3. Serve the file
    const result = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("_id"), args.feedbackId))
      .take(1);
    if (!result) throw new Error("Image not found");

    // We check if the project exists
    if (result[0] == undefined) {
      return null;
    } else {
      // Since the image_storage_id can be undefined, we may not be able
      // to generate an image url at all. In this case, we just return the
      // "no_image" string
      if (result[0].image_storage_id == undefined) {
        return "no_image";
      }
      console.log("Storage id: ", result[0].image_storage_id);

      const url = await ctx.storage.getUrl(
        result[0].image_storage_id as string
      );
      const url2 = ctx.db.system.get(
        result[0].image_storage_id as Id<"_storage">
      );

      console.log("This mutation url: ", url);
      console.log("This mutation db url: ", url2);

      return url;
    }

    // return await ctx.storage.serveFile(args.projectId);
  },
});

export const deleteFile = internalMutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const deleted = await ctx.storage.delete(args.storageId);
    if (deleted !== null) {
      return "deleted";
    } else {
      return null;
    }
  },
});
