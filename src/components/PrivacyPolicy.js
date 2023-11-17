import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FileOpen } from "@mui/icons-material";
import { editContent, getContent } from "../service/content.js";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@mui/styles";

const states = [
  {
    value: 0,
    label: "No",
  },
  {
    value: 1,
    label: "Yes",
  },
];
const useStyles = makeStyles({
  label: {
    transform: "none",
    marginTop: -12,
    marginLeft: 10,
    background: "white",
  },
});

const startYear = 2020;
const endYear = new Date().getFullYear() + 5;
export const PrivacyPolicy = (props) => {
  const token = localStorage.getItem("token");

  const Richtext = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      title: event.target.value,
    });
  };
  const handleReachTextChange = (event) => {
    setValues({
      ...values,
      content: event,
    });
  };
  const onClickSubmit = (event) => {
    console.log("values are", values);
    event.preventDefault();

    editContent(
      "privacy-policy",
      values,
      (r) => {
        toast.success("Privacy Policy Posted!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  };
  //get privacy policy
  useEffect(() => {
    getContent(
      "privacy-policy",
      (r) => {
        setValues(r[0]);
        console.log("pri vay", r);
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
    <form autoComplete="off" noValidate {...props} onSubmit={onClickSubmit}>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="Post Privacy Policy"
          style={{
            background: "#4607ad",
            color: "white",
            height: 10,
          }}
        />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Basic Info</Typography>
              <Divider />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                // helperText="Press Release Title"
                label="Title"
                name="title"
                onChange={handleChange}
                required
                value={values.title}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <h4>Description</h4>
              <Richtext onChange={handleReachTextChange} value={values.content} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            p: 2,
          }}
        >
          <Button color="error" variant="contained">
            Reset
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
