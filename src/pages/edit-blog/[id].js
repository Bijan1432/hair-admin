import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FileOpen } from "@mui/icons-material";
import { editBlog, getBlogCategory, getBlogEdit, postBlog } from "../../service/blog";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";

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

const startYear = 2020;
const endYear = new Date().getFullYear() + 5;

const EditBlog = (props) => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const { id } = router.query;
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({
      label: year,
      value: year,
    });
  }
  const months = [
    { value: "JAN", label: "January" },
    { value: "FAB", label: "February" },
    { value: "MAR", label: "March" },
    { value: "APR", label: "April" },
    { value: "MAY", label: "May" },
    { value: "JUN", label: "June" },
    { value: "JUL", label: "July" },
    { value: "AUG", label: "August" },
    { value: "SEP", label: "September" },
    { value: "OCT", label: "October" },
    { value: "NOV", label: "November" },
    { value: "DEC", label: "December" },
  ];
  const Richtext = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    slug: "",
    category: "",
    exlink: "",
    intro: "",
    description: "",
    published: "",
    publishedMonth: "",
    publishedYear: "",
    author: "",
    image: "",
    imageAlt: "",
    metaDescription: "",
    metaKeywords: "",
    metaTitle: "",
    canonicalLink: "",
  });
  const [blogCat, setBlogCat] = useState([]);
  const [imageUp, setImageUp] = useState([]);

  useEffect(() => {
    getBlogCategory(
      (r) => {
        setBlogCat(r);
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );

    getBlogEdit(
      id,
      (r) => {
        console.log(r, "blog edit");
        setValues({
          title: r.title,
          slug: r.slug,
          category: r.category,
          exlink: r.exlink,
          category_id: r.category_id,
          intro: r.intro,
          description: r.description,
          published: r.published,
          publishedMonth: r.pub_month,
          publishedYear: r.pub_year,
          author: r.author,
          image: r.image,
          imageAlt: r.image_alt,
          metaDescription: r.meta_desc,
          metaKeywords: r.meta_keyword,
          metaTitle: r.meta_title,
          canonicalLink: r.title,
          blog_id: r.blog_id,
        });
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, []);
  const handleChange = (event) => {
    if (event.target.name === "image") {
      // console.log(event.target.files[0].type)
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/jpg" ||
        event.target.files[0].type === "image/png"
      ) {
        setImageUp(event.target.files[0]);
      } else {
        toast.error("Please!! Select JPG or JPEG or PNG File", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } else if (event.target.name === "category") {
      setValues({
        ...values,
        [`${event.target.name}_id`]: Number(event.target.value),
        [event.target.name]: event.target[event.target.selectedIndex].text,
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleReachTextChange = (event) => {
    setValues({
      ...values,
      description: event,
    });
  };
  const onClickSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageUp);

    editBlog(
      formData,
      values,
      token,
      (r) => {
        toast.success(r, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        // setValues({
        //   title: "",
        //   slug: "",
        //   category: "",
        //   category_id: "",
        //   intro: "",
        //   description: "",
        //   published: "",
        //   publishedMonth: "",
        //   publishedYear: "",
        //   author: "",
        //   image: "",
        //   imageAlt: "",
        //   metaDescription: "",
        //   metaKeywords: "",
        //   metaTitle: "",
        //   canonicalLink: "",
        // });
        router.push("/blog-list");
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
    <form autoComplete="off" noValidate {...props} onSubmit={onClickSubmit}>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="Post Blog"
          style={{
            background: "#4607ad",
            color: "white",
            height: 10,
          }}
        />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Basic Info</Typography>
              <Divider />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                // helperText="Press Release Title"
                label="Title"
                name="title"
                onChange={handleChange}
                required
                value={values.title}
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.category}
                variant="outlined"
                InputLabelProps={{ classes: { outlined: classes.label } }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {blogCat.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography variant="h6">About</Typography>
              <Divider />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Intro"
                name="intro"
                onChange={handleChange}
                required
                value={values.intro}
                variant="outlined"
                multiline={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">External Link</Typography>
              <Divider />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="External Link"
                name="exlink"
                onChange={handleChange}
                value={values.exlink}
                variant="outlined"
                multiline={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <h4>Description</h4>
              <Richtext onChange={handleReachTextChange} value={values.description} />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Publish info</Typography>
              <Divider />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Published"
                name="published"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.published}
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
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Published Month"
                name="publishedMonth"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.publishedMonth}
                variant="outlined"
                InputLabelProps={{ classes: { outlined: classes.label } }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {months.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Published Year"
                name="publishedYear"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.publishedYear}
                variant="outlined"
                InputLabelProps={{ classes: { outlined: classes.label } }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {years.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                onChange={handleChange}
                type="text"
                value={values.author}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Image</Typography>
              <Divider />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                // label="Image"
                name="image"
                type="file"
                onChange={handleChange}
                // required
                // select
                // SelectProps={{ native: true }}
                // value={values.sin}
                // variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                // helperText="Press Release Title"
                label="Image Alt"
                name="imageAlt"
                onChange={handleChange}
                required
                value={values.imageAlt}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography variant="h6">SEO</Typography>
              <Divider />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                name="metaTitle"
                onChange={handleChange}
                required
                value={values.metaTitle}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Meta Keywords"
                name="metaKeywords"
                onChange={handleChange}
                required
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
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Canonical Link"
                name="canonicalLink"
                onChange={handleChange}
                required
                value={values.canonicalLink}
                variant="outlined"
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
          <Button color="error" variant="contained" onClick={() => router.push("/blog-list")}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

EditBlog.getLayout = (EditBlog) => <DashboardLayout>{EditBlog}</DashboardLayout>;
export default EditBlog;
