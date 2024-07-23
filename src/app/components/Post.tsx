import Card from "@mui/material/Card";
import type { Post } from "@prisma/client";

import CardContent from "@mui/material/CardContent";
import { Button, CardActions, Typography } from "@mui/material";
import { PostWithComments } from "@/trpc/trpcRouter";
import { useState } from "react";
import { Comment } from "./Comment";
import { CommentInput } from "./CommentInput";

export function Post({ post }: { post: PostWithComments }) {
	const [showComments, setShowComments] = useState(false);

	return (
		<Card sx={{ width: 512 }}>
			<CardContent>
				<Typography variant="h3">{post.title}</Typography>
				<Typography variant="body1">{post.content}</Typography>
				<CardActions>
					{post.comments.length ? (
						<Button size="small" onClick={() => setShowComments(!showComments)}>
							{post.comments.length} Comments
						</Button>
					) : null}
				</CardActions>
				{showComments && (
					<>
						{post.comments.map(comment => (
							<Comment key={comment.id} comment={comment} />
						))}
						<CommentInput postId={post.id} />
					</>
				)}
			</CardContent>
		</Card>
	);
}
