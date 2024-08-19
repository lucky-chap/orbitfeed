import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

const schema = defineSchema({
  ...authTables,
  orbits: defineTable({
    userId: v.id("users"),
    name: v.string(),
    website: v.string(),
    status: v.string(),
  }).searchIndex("search_body", {
    // https://docs.convex.dev/search/text-search
    searchField: "name",
    // filterFields: ["website"],
  }),
  feedback: defineTable({
    orbitId: v.id("orbits"),
    by: v.string(),
    content: v.string(),
    type: v.string(),
    location: v.string(),
    image: v.string(),
  }),
})

export default schema
