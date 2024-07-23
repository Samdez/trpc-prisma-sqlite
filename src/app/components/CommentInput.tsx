import { trpcReact } from "@/trpc/trpcReact";
import { TextField } from "@mui/material";
import { useState } from "react";

export function CommentInput({ postId }: { postId: number }) {
	const utils = trpcReact.useUtils();
	const [content, setContent] = useState("");
	//TODO: handle error in mutation (display toast with error message + logging)
	const mutation = trpcReact.createComment.useMutation({
		onSuccess: async () => {
			await utils.getPosts.invalidate();
			setContent("");
		},
		onError: () => {
			console.error(
				"🚀 ~ file: CommentInput.tsx ~ line 19 ~ onError ~ mutation.error:",
				mutation.error
			);
		},
	});

	return (
		<TextField
			fullWidth={true}
			label="Add a comment"
			value={content}
			onChange={e => setContent(e.target.value)}
			onKeyDown={e => {
				if (e.key === "Enter") {
					mutation.mutate({ content, postId });
				}
			}}
		/>
	);
}
