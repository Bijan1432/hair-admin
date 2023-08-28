import Head from "next/head";
import Router from "next/router";

import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { continueUrl } = router.query;
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm({
    mode: "all",
  });

  const login = (data) => {
    console.log("create", data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(process.env.API_END_POINT + "/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          // console.log(Router)
          toast(result.message, { type: "success", position: "bottom-center" });
          reset1();
          let role = result?.data?.role;
          localStorage.setItem("token", result?.data?.token);
          localStorage.setItem("role", role);
          localStorage.setItem("name", result?.data?.name);

          Router.push(role == "Admin" && continueUrl == "/users" ? continueUrl : "/" ?? "/").catch(
            console.error
          );
        } else {
          toast(result.message, { type: "warning", position: "bottom-center" });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast("Something went wrong! Please try agian later.", {
          type: "error",
          position: "bottom-center",
        });
      });
  };
  return (
    <>
      <Head>
        <title>Hair app | Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit1(login)}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>

            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Login with email address
              </Typography>
            </Box>
            <TextField
              {...register1("email", { required: true })}
              error={!!errors1.email}
              fullWidth
              helperText={errors1.password?.message}
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
            />
            <TextField
              {...register1("password", { required: true })}
              error={!!errors1.password}
              fullWidth
              helperText={errors1.password?.message}
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
