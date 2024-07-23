//TODO: whole app is made of client components now
"use client";

import { trpcReact } from "@/trpc/trpcReact";
import { Box } from "@mui/material";
import { Post } from "./components/Post";

//TODO: replace MUI with shad cn and tailwind for more customization options
// Why not use Next 15 and app router instead of trpc
//TODO: add logging via a trpc middleware and 3d party service such as datadog / sentry...

export default function Home() {
	//TODO: replace usequery with useInfiniteQuery to add pagination and improve performance, and react-intersection-observer to add infinite scroll
	//TODO: add Suspense component to show loading state
	const { data: posts } = trpcReact.getPosts.useQuery();

	return (
		<main>
			<Box
				display="flex"
				flexDirection="column"
				gap={2}
				alignItems="center"
				padding={4}
			>
				{posts?.map(post => (
					<Post key={post.id} post={post} />
				))}
			</Box>
		</main>
	);
}
