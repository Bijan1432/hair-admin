import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";

import { ContactUs } from "../components/contactUs/contactUs";

const Page = () => (
  <>
    <Head>
      <title>Contacts Us | Admin Panel</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth={false}>
        {/* <CustomerListToolbar /> */}
        <Box sx={{ mt: 3 }}>
          <ContactUs/>

        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
