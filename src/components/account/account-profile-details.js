import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { getUser, updateImage } from "../../service/user";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

export const AccountProfileDetails = (props) => {
  const [files,setFiles] = useState([])
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getUser(
      localStorage.id,
      (r) => {
        console.log("check1=>", r.user.name);
        setValues({
          firstName: r.user.name,
          lastName:  r.user.name,
          email:  r.user.email,
          // phone: "",
          password: r.user.password,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, [localStorage.id]);

  const handleChange2 =(event)=>{
    setFiles([...files, event.target.files[0]]);
  }

  const handelSubumit=()=>{
    const formData = new FormData();
      formData.append("imagesProfile", files[0]);
    updateImage(
      localStorage.id,
      formData,
      (r)=>{
        console.log('check2=>',r);
      },(err)=>{

      }
    )
  }
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              // label="Image"
              name="image"
              type="file"
              onChange={handleChange2}
              inputProps={{
                multiple: true,
                accept: ".jpg,.jpeg,.png",
              }}
              // required
              // select
              // SelectProps={{ native: true }}
              // value={values.sin}
              // variant="outlined"
            />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={handelSubumit}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
