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
import EditIcon from "@mui/icons-material/Edit";
import CustomTable from "../Table/Table";
import { makeStyles } from "@mui/styles";
import {
  editBlogCat,
  getBlogCatEdit,
  getBlogCategoryList,
  getBlogEdit,
  postBlogCategory,
} from "../../service/blog";
import { ToastContainer, toast } from "react-toastify";

const states = [
  {
    value: 0,
    label: "No",
  },
  {
    value: 1,
    label: "Yes",
  },
];

const useStyles = makeStyles({
  label: {
    transform: "none",
    marginTop: -12,
    marginLeft: 10,
    background: "white",
  },
});

export const BlogCategoryDetails = (props) => {
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    slug: "",
    description: "",
    active: "",
    sin: "",
    priority: "",
    pageTitle: "",
    metaKeywords: "",
    metaDescription: "",
    edit: false,
  });
  const [blogCat, setBlogCat] = useState([]);
  const [submitButton, setSubmitButton] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "slug", headerName: "Slug", width: 130 },
    {
      field: "description",
      headerName: "Description",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      renderCell: ({ row }) => (
        <>
          <Grid container spacing={3}>
            <Grid item md={6} xs={6}>
              <Tooltip title="Edit">
                <EditIcon onClick={() => EditHandler(row)} />
              </Tooltip>
            </Grid>
            {/* <Grid item md={6} xs={6}>
              <Tooltip title="Preview">
                <a href={`http://arizton-base.markobrando.com/report/` + row.slug}><LinkIcon/></a>
              </Tooltip>
            </Grid> */}
          </Grid>
        </>
      ),
    },
  ];

  const onClickSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    setSubmitButton(true);
    if (values.edit === false) {
      postBlogCategory(
        values,
        token,
        (r) => {
          setSubmitButton(false);
          toast.success("Blog Category Added!!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setValues({
            name: "",
            slug: "",
            description: "",
            active: "",
            sin: "",
            priority: "",
            pageTitle: "",
            metaKeywords: "",
            metaDescription: "",
          });
        },
        (err) => {
          setSubmitButton(false);
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      );
    } else {
      editBlogCat(
        values,
        token,
        (r) => {
          setSubmitButton(false);
          toast.success("Blog Category Edited!!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        },
        (err) => {
          setSubmitButton(false);
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      );
    }
  };

  useEffect(() => {
    getBlogCategoryList(
      (r) => {
        console.log(r, "cat list");
        setBlogCat(r);
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, [submitButton]);

  const EditHandler = (row) => {
    getBlogCatEdit(
      row.blogCat_id,
      (r) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setValues({
          name: r.name,
          slug: r.slug,
          description: r.description,
          active: r.active === true ? 1 : 0,
          sin: r.sin === true ? 1 : 0,
          priority: r.priority,
          pageTitle: r.page_title,
          metaKeywords: r.meta_keyword,
          metaDescription: r.meta_desc,
          edit: true,
          blogCat_id: r.blogCat_id,
        });
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  };

  return (
    <>
      <form autoComplete="off" noValidate {...props} onSubmit={onClickSubmit}>
        <Card>
          <CardHeader
            // subheader="The information can be edited"
            title="Add Category"
            style={{
              background: "#4607ad",
              color: "white",
              height: 10,
            }}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Please Name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Slug"
                  name="slug"
                  onChange={handleChange}
                  required
                  value={values.slug}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values.description}
                  variant="outlined"
                  multiline={true}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Active"
                  name="active"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.active}
                  variant="outlined"
                  InputLabelProps={{ classes: { outlined: classes.label } }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Show in Navigation"
                  name="sin"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.sin}
                  variant="outlined"
                  InputLabelProps={{ classes: { outlined: classes.label } }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Priority"
                  name="priority"
                  onChange={handleChange}
                  type="text"
                  value={values.priority}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Page Title"
                  name="pageTitle"
                  onChange={handleChange}
                  type="text"
                  value={values.pageTitle}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Meta Keywords"
                  name="metaKeywords"
                  onChange={handleChange}
                  type="text"
                  value={values.metaKeywords}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Meta Description"
                  name="metaDescription"
                  onChange={handleChange}
                  type="text"
                  value={values.metaDescription}
                  variant="outlined"
                  multiline={true}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              p: 2,
            }}
          >
            <Button color="error" variant="contained">
              Reset
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Save details
            </Button>
          </Box>
        </Card>
      </form>
      <Divider style={{ margin: 5 }} />
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="All Category"
          style={{
            background: "#4607ad",
            color: "white",
            height: 10,
          }}
        />
        <CustomTable rows={blogCat} columns={columns} />
      </Card>
    </>
  );
};
