import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SubCategory } from '../components/category/subCategory';
import { Product } from '../components/product/product-card';

const Page = () => (
  <>
    <Head>
      <title>
        Product | Admin Panel
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
         Product
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <Product />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
