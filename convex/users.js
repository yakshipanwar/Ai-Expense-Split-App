import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Try to find an existing user by their Clerk tokenIdentifier
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    // If user exists, update name/image if changed
    if (user !== null) {
      const updateData = {};
      if (user.name !== identity.name) updateData.name = identity.name;
      if (user.imageUrl !== identity.picture) updateData.imageUrl = identity.picture;
      if (Object.keys(updateData).length > 0) {
        await ctx.db.patch(user._id, updateData);
      }
      return user._id;
    }

    // Otherwise, insert a new user
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      email: identity.email ?? null,
      tokenIdentifier: identity.tokenIdentifier
    });
  },
});
