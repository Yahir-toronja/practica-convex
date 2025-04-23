import {
    query,
    mutation,
    action,
    internalMutation,
    ActionCtx,
  } from "./_generated/server";
  import { internal } from "./_generated/api";
  import { v } from "convex/values";

  export const getAlumnos = query({
    handler: async (ctx) => {
      return await ctx.db.query("alumnos").collect();
    },
  });