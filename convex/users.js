import { mutation, query } from "./_generated/server";

export const store = mutation({
    args: {},
    // ctx = context
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Called storeUser with authentication present");
        }
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique()

        if (user !== null){
            if(user.name !== identity.name){
                await ctx.db.patch(user._id, {name: identity.name});
            }
            return user._id
        }
        // New User
        return await ctx.db.insert("users", {
            name: identity.name ?? "Anonymous",
            tokenIdentifier: identity.tokenIdentifier,
            email: identity.email ?? "",
            imageUrl: identity.pictureUrl,
            hasCompletedOnboarding: false,
            freeEventsCreated: 0,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
    }
})

export const getCurrentUser = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            return null;
        }

        const user = await ctx.db.query("users")
            .withIndex("tokenIdentifier",identity.tokenIdentifier)
            .unique()

        if(!user){
            throw new Error("User Not Found");
        }

        return user
    }
})