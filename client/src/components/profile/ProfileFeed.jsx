import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Post from "src/components/Post";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = process.env.REACT_APP_API_URL;

const ProfileFeed = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // https://www.robinwieruch.de/react-remove-item-from-list
  const handleRemove = (id) => {
    const newList = posts.filter((post) => post.id !== id);
    setPosts(newList);
  };

  useEffect(() => {
    setPosts([]);
    setPostsLoading(true);
    fetch(`${API_URL}/author/${props.authorID}/posts/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let j = 0; j < data.length; j++) {
          setPosts((oldArray) => [...oldArray, data[j]]);
        }
        setPostsLoading(false);
      })

      .catch((error) => console.log("ProfileFeed useEffect", error));
  }, [props.authorID]);

  return (
    <Box display="flex" flexDirection="column">
      {postsLoading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : posts.length ? (
        posts.map((post, idx) => (
          <Post
            key={idx}
            id={post.id}
            title={post.title}
            description={post.description}
            author={props.author}
            contentType={post.contentType}
            content={post.content}
            count={idx}
            comments={[]}
            handleRemove={handleRemove}
          />
        ))
      ) : (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#858585", marginTop: "10%" }}
        >
          <i>Looks like you have no posts. Why not try creating one!</i>
        </Typography>
      )}
    </Box>
  );
};

export default ProfileFeed;
