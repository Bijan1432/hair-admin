import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { PrivacyPolicy } from "../components/PrivacyPolicy.js";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>Privacy Policy | Admin Panel</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Privacy Policy
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <PrivacyPolicy />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
