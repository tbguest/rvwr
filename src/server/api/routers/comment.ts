import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const createInput = z.object({
  documentId: z.string(),
  body: z.string(),
});

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ documentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.comment.findMany({
        where: {
          documentId: input.documentId,
        },
      });
    }),

  create: publicProcedure
    .input(createInput)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return await ctx.prisma.comment.create({
        data: {
          documentId: input.documentId,
          body: input.body,
          userId: ctx.session?.user.id || "",
        },
      });
    }),
});
