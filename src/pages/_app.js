import { Fragment, useEffect } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "../contexts/auth-context";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { theme } from "../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { authCheck } from "../service/login";
import { useRouter } from "next/router";
registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    authCheck(
      localStorage.getItem("token"),
      (r) => {
        console.log(console.log("localStorage.getItem=>", r));
      },
      (err) => {
        // console.log(console.log("localStorage.getItem=>ee", err));
        if (router.pathname != "/login" && router.pathname != "/register") {
          toast.error("Please!! Login To Continue", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          router.push("/login");
        }
      }
    );
  });
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Admin Panel</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AuthConsumer>
              {(auth) => (auth.isLoading ? <Fragment /> : getLayout(<Component {...pageProps} />))}
            </AuthConsumer>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
      <ToastContainer />
    </CacheProvider>
  );
};

export default App;
