import { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { getBlog } from "../../service/blog";
import { ToastContainer, toast } from "react-toastify";
export const Blogs = (props) => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    getBlog(
      (r) => {
        setBlog(r);
        console.log(r, "blog");
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, []);

  return (
    <>
      <Card sx={{ boxShadow: "2px 2px 10px lightgreen" }} {...props}>
        <div
          style={{ background: `linear-gradient(82.59deg, #03fc3d 0%, #00c48c 100%)`, height: 10 }}
        />
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="#14B8A6" gutterBottom variant="overline">
                TOTAL USERS
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {blog.length}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "secondary.main",
                  height: 56,
                  width: 56,
                }}
              >
                <RssFeedIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2,
            }}
          ></Box>
        </CardContent>
      </Card>
    </>
  );
};
