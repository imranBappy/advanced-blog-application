import React from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import { usePostCommentMutation } from "@/features/comment/commentApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Comments = (props: any) => {
  const { comments = [] } = props.blog || {};
  const [postComment, { data, isLoading, isError, error }] =
    usePostCommentMutation();
  const { user }: any = useSelector((state: any) => state.auth) || {};

  useEffect(() => {
    if (isError) toast.error("There was an error !");
    if (!isError && data) toast.success("Successfully Comment Submit!");
  }, [isLoading, isError, data]);
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/do5erbtee/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688325761/thumbnail/url-1688325757974-profile-pic.png.jpeg.jpg?_s=public-apps";

  return (
    <>
      <CommentBox
        url={user?.url || DEFAULT_AVATAR_URL}
        postComment={postComment}
      />
      <div className="mt-5">
        {comments?.map((comment: any) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default Comments;
