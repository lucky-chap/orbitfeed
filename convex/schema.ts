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
    teamId: v.optional(v.id("teams")),
  })
    // https://docs.convex.dev/database/indexes/indexes-and-query-perf
    .index("creator", ["userEmail"])
    .index("team", ["teamId"])
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
    status: v.string(), // resolved or pending
  })
    .index("orbit_id", ["orbitId"])
    .index("status", ["status"]),
  teams: defineTable({
    leader: v.id("users"),
    name: v.string(),
  }).index("leader", ["leader"]),
  members: defineTable({
    teamId: v.id("teams"),
    memberId: v.id("users"),
    memberName: v.string(),
    memberEmail: v.string(),
    memberImage: v.string(),
    role: v.string(), // editor or viewer
  })
    .index("team_id", ["teamId"])
    // this index would be used for finding teams a member is in
    .index("member_id", ["memberId"]),
  invites: defineTable({
    senderEmail: v.string(),
    recipientEmail: v.string(),
    recipientRole: v.string(),
    teamId: v.id("teams"),
  }).index("recipient", ["recipientEmail"]),
  activityFeed: defineTable({
    orbitId: v.id("orbits"),
    actorId: v.id("users"),
    actorName: v.string(),
    actorImage: v.string(),
    action: v.string(), // resolved, pending or removed
  })
    .index("orbit_id", ["orbitId"])
    .index("actor", ["actorId"]),
  proUsers: defineTable({
    userId: v.id("users"),
    email: v.string(),
  }),
});

export default schema;
