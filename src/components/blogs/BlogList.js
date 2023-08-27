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
import { getBlog } from "../../service/blog";
import { ToastContainer, toast } from "react-toastify";
//icone
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

export const Bloglist = () => {
  const router = useRouter();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    getBlog(
      (r) => {
        setBlog(r);
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "slug", headerName: "Slug", width: 130 },
    { field: "published", headerName: "Published", width: 100 },
    {
      field: "description",
      headerName: "Description",
      width: 200,
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

  const EditHandler = (row) => {
    console.log(row);
    router.push("/edit-blog/" + row.blog_id);
  };
  return (
    <Card>
      <CardHeader
        // subheader="The information can be edited"
        title="All Category"
        style={{
          background: "#2e5cb8",
          color: "white",
          height: 10,
        }}
      />
      <CustomTable rows={blog} columns={columns} />
    </Card>
  );
};
