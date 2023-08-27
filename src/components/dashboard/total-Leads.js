import { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { getQoutes } from "../../service/qoutes";
import { ToastContainer, toast } from "react-toastify";
export const Leads = (props) => {
  const [lead, setLeads] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getQoutes(
      token,
      (r) => {
        setLeads(r);
        console.log("enquries are-", r);
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
                Total Leads
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {lead.length}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "warning.main",
                  height: 56,
                  width: 56,
                }}
              >
                <InsertChartIcon />
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
