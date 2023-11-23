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
import { getProducts, searchHair } from "../../service/product";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import Image from "next/image";

export const Productlist = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "images",
      headerName: "Image",
      width: 200,
      height: 200,
      renderCell: ({ row }) => (
        <>
          {row?.images?.map((r, i) =>
            i < 3 ? (
              <>
                <span>
                  <Image
                    src={"https://crowningglorylm.com/hair-backend/uploads/image/" + r.filename}
                    className="img-fluid"
                    height="120"
                    width="100"
                  />
                </span>
                <br />
              </>
            ) : (
              <></>
            )
          )}
        </>
      ),
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
        console.log("r=>>1", r);
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
    router.push("/edit-hair/" + row.product_id);
  };

  const handleChangeSearch = (event) => {
    if (event.target.value.length >= 2) {
      console.log(event.target.value);
      searchHair(
        event.target.value,
        (r) => {
          setProduct(r);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      getProducts(
        [],
        (r) => {
          // console.log("r=>>13", r);
          setProduct(r);
        },
        (err) => {
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      );
    }
  };
  return (
    <>
      <form
        autoComplete="off"
        noValidate
        // onSubmit={onClickSubmit}
        // {...props}
        style={{ marginBottom: 15 }}
      >
        <Card>
          <CardHeader
            // subheader="The information can be edited"
            title="User Search"
            style={{
              background: "#4607ad",
              color: "white",
              height: 10,
            }}
          />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Hair Name"
                  label="Name"
                  name="name"
                  onChange={handleChangeSearch}
                  required
                  // value={values.hairName}
                  variant="outlined"
                />
                {/* {error.hairName ? (
                  <span style={{ color: "red", fontSize: "10pt" }}>*Hair Name is required</span>
                ) : (
                  ""
                )} */}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              p: 2,
            }}
          >
            <Button color="error" variant="contained" >
              Clear
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Save Hair
            </Button>
          </Box> */}
        </Card>
      </form>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="Product List"
          style={{
            background: "#4607ad",
            color: "white",
            height: 10,
          }}
        />
        <CustomTable rows={product} columns={columns} rowHeight={120} />
      </Card>
    </>
  );
};
