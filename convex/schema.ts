import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  orbits: defineTable({
    userId: v.id("users"),
    userEmail: v.string(),
    name: v.string(),
    website: v.string(),
    status: v.string(),
  })
    // using indexes for search
    // https://docs.convex.dev/database/indexes/indexes-and-query-perf
    .index("creator", ["userEmail"])
    .searchIndex("search_body", {
      // https://docs.convex.dev/search/text-search
      searchField: "name",
    }),
  feedback: defineTable({
    orbitId: v.id("orbits"),
    by: v.string(),
    content: v.string(),
    type: v.string(),
    location: v.string(),
    country_code: v.string(),
    route: v.string(),
    image: v.string(),
    image_storage_id: v.optional(v.id("_storage")),
  }),
  feedbackImages: defineTable({
    storageId: v.id("_storage"),
    feedbackId: v.id("feedback"),
  }),
  proUsers: defineTable({
    userId: v.id("users"),
    email: v.string(),
  }),
  // tracking emails sent and feedback length
  emails: defineTable({
    orbitId: v.id("orbits"),
    lastSent: v.number(),
    lastFeedbackLength: v.number(),
  }),
});

export default schema;
