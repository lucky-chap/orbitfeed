import { cronJobs } from "convex/server";

import { internal } from "./_generated/api";
import { internalMutation, internalQuery } from "./_generated/server";

const crons = cronJobs();

export default crons;
