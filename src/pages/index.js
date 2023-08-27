import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Products } from "../components/dashboard/products-list";
// import { LatestOrders } from "../components/dashboard/latest-orders";
// import { LatestProducts } from "../components/dashboard/latest-products";
// import { Sales } from '../components/dashboard/sales';
// import { TasksProgress } from "../components/dashboard/tasks-progress";
import { Blogs } from "../components/dashboard/total-blogs";
import { Leads } from "../components/dashboard/total-Leads.js";
// import { TotalProfit } from "../components/dashboard/total-profit";
// import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>Dashboard | Admin Panel</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Products />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Blogs />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Leads />
          </Grid>
          {/* <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
