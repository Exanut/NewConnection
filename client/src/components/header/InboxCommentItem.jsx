import { Box, Typography, Avatar } from "@mui/material";

import { useNavigate } from "react-router-dom";

const InboxCommentItem = (props) => {
  const item = props.item;
  const navigate = useNavigate();

  let commentText = ` commented: ${item.comment}`;
  if (commentText.length > 25) {
    commentText = commentText.substring(0, 25) + "...";
  }

  const fetchPost = async () => {
    try {
      const response = await fetch(`${item.id}`, {
        headers: {
          Authorization: `Basic ` + btoa("admin:NewConnectionAdmin"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        const author_array = data.author.id.split("/");
        const author_id = author_array[author_array.length - 1];
        const post_array = data.id.split("/");
        const post_id = post_array[post_array.length - 1];
        navigate(`/app/author/${author_id}/post/${post_id}`, { state: data }); // state contains the post
      }
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        py: 0,
      }}
      // Navigate to the ViewPost page, pass the entire item into the state for ViewPost to use
      onClick={() => {
        fetchPost();
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Avatar"
          src={item.author.profileImage}
          sx={{
            width: 17,
            height: 17,
            marginRight: 1,
            cursor: "pointer",
            border: 1,
            borderColor: "gray",
          }}
          onClick={() => {
            const words = item.author.id.split("/");
            const word = words[words.length - 1];
            navigate(`/app/author/${word}`, { state: item.author });
          }}
        />
        <Typography variant="body2">
          <b>{item.author.displayName}</b>
          {commentText}
        </Typography>
      </Box>
    </Box>
  );
};

export default InboxCommentItem;
