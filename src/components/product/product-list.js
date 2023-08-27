import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";

import CustomTable from "../Table/Table";
import { getProducts } from "../../service/product";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

export const Productlist = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 300 },
    { field: "slug", headerName: "Slug", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "description",
      headerName: "Description",
      width: 190,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: ({ row }) => (
        <>
          <Grid container spacing={3}>
            <Grid item md={6} xs={6}>
              <Tooltip title="Edit">
                <EditIcon onClick={() => EditHandler(row)} />
              </Tooltip>
            </Grid>
            {/* <Grid item md={6} xs={6}>
                <a href={`http://arizton-base.markobrando.com/blog/` + row.slug} target="_blank" rel="noreferrer">
                  <Tooltip title="Preview">
                    <LinkIcon />
                  </Tooltip>
                </a>
              </Grid> */}
          </Grid>
        </>
      ),
    },
  ];

  useEffect(() => {
    getProducts(
      [],
      (r) => {
        setProduct(r);
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, []);

  const EditHandler = (row) => {
    console.log(row);
    router.push("/edit-product/" + row.product_id);
  };
  return (
    <Card>
      <CardHeader
        // subheader="The information can be edited"
        title="Product List"
        style={{
          background: "#2e5cb8",
          color: "white",
          height: 10,
        }}
      />
      <CustomTable rows={product} columns={columns} />
    </Card>
  );
};
