import { useState, useEffect } from "react";
import { Box, Grid, Typography, Hidden, Container } from "@mui/material";
import SideProfile from "src/components/dashboard/SideProfile";

import Post from "src/components/post/Post";
import CreateNewPostContainer from "src/components/dashboard/CreateNewPostContainer";
import CircularProgress from "@mui/material/CircularProgress";

const Feed = (props) => {
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
    for (let i = 0; i < props.recentAuthors.length; i++) {
      fetch(`${props.recentAuthors[i].id}/posts/`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (let j = 0; j < data.length; j++) {
            setPosts((oldArray) => [...oldArray, data[j]]);
            console.log(data[j]);
            console.log(data[j]["categories"][0]);
          }
          setPostsLoading(false);
        })
        .catch((error) => console.log("Feed useEffect", error));
    }
  }, [props.recentAuthors]);

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      <Box display="flex" my="85px">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <CreateNewPostContainer setPosts={setPosts} />
            {postsLoading ? (
              <Box display="flex" justifyContent="center" mt={3}>
                <CircularProgress />
              </Box>
            ) : posts.length ? (
              posts
                .sort((p1, p2) => {
                  const d1 = new Date(p1.published);
                  const d2 = new Date(p2.published);
                  return d2 - d1;
                })
                .map((post, idx) => {
                  return (
                    <Post
                      key={idx}
                      id={post.id}
                      title={post.title}
                      description={post.description}
                      author={post.author}
                      contentType={post.contentType}
                      content={post.content}
                      published={post.published}
                      categories={post.categories}
                      count={1}
                      likes={[]}
                      handleRemove={handleRemove}
                    />
                  );
                })
            ) : (
              <Typography
                variant="h6"
                align="center"
                sx={{ color: "#858585", marginTop: "10%" }}
              >
                <i>It's quiet here, why not add a new post?</i>
              </Typography>
            )}
          </Grid>
          <Hidden mdDown>
            <Grid
              display={{ xs: "none", sm: "none", md: "flex" }}
              alignItems="flex-start"
              justifyContent="center"
              item
              md={4}
              lg={3}
              sx={{ marginTop: 1 }}
            >
              <SideProfile recentAuthors={props.recentAuthors} />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Container>
  );
};

export default Feed;
