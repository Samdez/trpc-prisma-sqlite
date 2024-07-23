import { Prisma } from "@prisma/client";
import { prismaClient } from "../../prisma/prismaClient";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { title } from "process";

const t = initTRPC.create({
	transformer: superjson,
});

//Generate dynamic types for nested queries
const postWithComments = Prisma.validator<Prisma.PostDefaultArgs>()({
	include: { comments: true },
});
export type PostWithComments = Prisma.PostGetPayload<typeof postWithComments>;

export const trpcRouter = t.router({
	getPosts: t.procedure.query(async ({ ctx, input }) => {
		return await prismaClient.post.findMany({
			include: {
				comments: true,
			},
		});
	}),

	//TODO: create separate router for comments and each entity
	createComment: t.procedure
		.input(z.object({ content: z.string(), postId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			return await prismaClient.comment.create({
				data: {
					content: input.content,
					post: {
						connect: { id: input.postId },
					},
				},
			});
		}),
});

export type TrpcRouter = typeof trpcRouter;
