import React from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import { usePostCommentMutation } from "@/features/comment/commentApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Comments = (props: any) => {
  // const { body, user } = props.blog.comments || {};
  const { comments } = props.blog || {};
  const [postComment, { data, isLoading, isError, error }] =
    usePostCommentMutation();
  // console.log(body, user);

  useEffect(() => {
    if (isError) toast.error("There was an error !");
    if (!isError && data) toast.success("Successfully Comment Submit!");
  }, [isLoading, isError, data]);

  return (
    <>
      <CommentBox postComment={postComment} />
      <div className="mt-5">
        {comments?.map((comment:any) => (
          <>
            <Comment comment={comment} />
          </>
        ))}
      </div>
    </>
  );
};

export default Comments;
