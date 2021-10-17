import { useContext } from "react";
import { Avatar, Card, CardContent, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AuthContext from "src/store/auth-context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#EDECEC",
  },
  buttonContainer: {
    textAlign: "center",
  },
  cardContent: {
    padding: theme.spacing(3),
  },
}));

const CreateNewPostContainer = (props) => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);

  return (
    <Card sx={{ paddingBottom: 0, backgroundColor: "EDECEC" }}>
      <CardContent
        className={classes.cardContent}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          alt="Avatar"
          src={authCtx.userdata.profileImage}
          sx={{ width: 56, height: 56, marginRight: 1.5 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            px: 1,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "15px",
              justifyContent: "center",
              backgroundColor: "#eaeaea",
              marginBottom: 1.3,
            }}
            fullWidth
            onClick={() => props.setIsModalOpen(true)}
          >
            Write a text post
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "15px",
              justifyContent: "center",
              backgroundColor: "#eaeaea",
            }}
            fullWidth
          >
            Upload an image
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateNewPostContainer;
