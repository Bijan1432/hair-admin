import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Bloglist } from "../components/blogs/BlogList";
import { DashboardLayout } from "../components/dashboard-layout";
import { EnquiryList } from "../components/enquires/enquires";

const Page = () => (
  <>
    <Head>
      <title>Enquires List | Admin Panel</title>
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
          Enquires List
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <EnquiryList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
