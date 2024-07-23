import { Typography } from "@mui/material";
import type { Comment } from "@prisma/client";

export function Comment({ comment }: { comment: Comment }) {
	return (
		<>
			<Typography variant="body1">{comment.content}</Typography>
			<div>---</div>
		</>
	);
}
