import { useQuery } from '@tanstack/react-query';

import Comments from '@/components/dashbord/comments';
import { trpc } from '@/lib/trpc/client';

interface PostComments {
  postId: number;
  onAddComment: (postId: number, text: string) => void;
  onDeleteComment: (commentId: number) => void;
}

export default function PostComments({
  postId,
  onAddComment,
  onDeleteComment,
}: PostComments) {
  const { data: comments } = trpc.commentsRouter.findByPostId.useQuery({
    postId,
  });

  return (
    <Comments
      comments={comments || []}
      onAddComment={(text) => onAddComment(postId, text)}
      onDeleteComment={onDeleteComment}
    />
  );
}
