import { v } from "convex/values";
import { query } from "./_generated/server";

export const getFeaturedEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const events = await ctx.db
      .query("events")
      .withIndex("by_start_date")
      .filter((q) => q.gte(q.field("startDate"), now))
      .order("desc")
      .collect();

    // Sort by registration count
    const featured = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 3);
    return featured;
  },
});

// Location-wise
export const getEventByLocation = query({
  args: {
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let events = await ctx.db
      .query("events")
      .withIndex("by_start_date")
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();

    if (args.city) {
      events = events.filter(
        (e) => e.city.toLowerCase() === args.city.toLowerCase(),
      );
    } else if (args.state) {
      events = events.filter(
        (e) => e.state.toLowerCase() === args.state.toLowerCase(),
      );
    }
    return events.slice(0, args.limit ?? 4);
  },
});

// Popular events
export const getPopularEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let events = await ctx.db
      .query("events")
      .withIndex("by_start_date")
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();

    const popular = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 5);

    return popular;
  },
});

// Category-wise
export const getEventByCategory = query({
  args: {
    category: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const events = await ctx.db
      .query("events")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();

    return events.slice(0, args.limit ?? 12);
  },
});

export const getCategoryCount = query({
    handler: async (ctx) => {
        const now = Date.now();
        const events = await ctx.db
        .query('events')
        .withIndex("by_start_date")
        .filter((q) => q.gte(q.field("startDate"), now ))
        .collect();

        const counts = {};
        events.forEach((event) => {
            counts[event.category] = (counts[event.category] || 0) + 1;
        });

        return counts;
    }
})