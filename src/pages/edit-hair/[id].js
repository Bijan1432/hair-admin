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
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { FileOpen } from "@mui/icons-material";
import { editHairAll, getHair, postHair, uploadImages } from "../../service/Hair";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";

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

const EditHair = (props) => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const { id } = router.query;

  const [error, setError] = useState({
    hairName: false,
    status: false,
    data: false,
  });
  const Richtext = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    status: "",
    images: "",
  });
  const [hairCat, setHairCat] = useState([]);
  const [imageUp, setImageUp] = useState([]);

  useEffect(() => {
    console.log(id, "hair edit");
    getHair(
      id,
      (r) => {
        console.log(r, "hair edit");
        setValues({
          name: r.name,
          status: r.status,
          images: r.images,
        });
        r.images.map((e) => {
          setSections([...sections, { varientColour: e.colour, image: e.filename }]);
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
  const [sections, setSections] = useState([{ varientColour: "", image: null }]);
  const addSection = () => {
    setSections([...sections, { varientColour: "", image: null }]);
  };

  const handleChange2 = (index, event) => {
    const updatedSections = [...sections];
    if (event.target.type === "file") {
      updatedSections[index].image = event.target.files[0];
      setFiles([...files, event.target.files[0]]);
    } else {
      updatedSections[index].varientColour = event.target.value;
      let colours = colour;
      colours[index] = event.target.value;
      setcolour([...colours]);
    }
    setSections(updatedSections);
  };
  const removeSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };
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

    editHair(
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
        router.push("/hair-list");
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
    <form
      autoComplete="off"
      noValidate
      onSubmit={onClickSubmit}
      // {...props}
    >
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="Edit Hair"
          style={{
            background: "#2e5cb8",
            color: "white",
            height: 10,
          }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                // helperText="Hair Name"
                label="Hair Name"
                name="hairName"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
              {error.hairName ? (
                <span style={{ color: "red", fontSize: "10pt" }}>*Hair Name is required</span>
              ) : (
                ""
              )}
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.status}
                variant="outlined"
                InputLabelProps={{ classes: { outlined: classes.label } }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Status
                </option>

                <option value="active">Active</option>
                <option value="inactive">In-active</option>
              </TextField>
              {error.status ? (
                <span style={{ color: "red", fontSize: "10pt" }}>*Status is required</span>
              ) : (
                ""
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <Divider>
                <Chip label="Images And Varients" />
              </Divider>
            </Grid>

            {sections.map((section, index) => {
              return (
                <>
                  <Grid item md={4} xs={12}>
                    <TextField
                      fullWidth
                      label="Verient Colour"
                      name="varientColour"
                      onChange={(event) => handleChange2(index, event)}
                      // required
                      value={section.varientColour}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      // label="Image"
                      name="image"
                      type="file"
                      onChange={(event) => handleChange2(index, event)}
                      inputProps={{
                        multiple: true,
                        accept: ".jpg,.jpeg,.png",
                      }}
                      // required
                      // select
                      // SelectProps={{ native: true }}
                      // value={values.sin}
                      // variant="outlined"
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => removeSection(index)}
                    >
                      Remove Section
                    </Button>
                  </Grid>
                </>
              );
            })}
            <Grid item md={6} xs={12}>
              {" "}
              <Button variant="outlined" className="mt-3" color="primary" onClick={addSection}>
                Add Section
              </Button>
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
          <Button color="error" variant="contained" onClick={() => router.push("/product-list")}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Save Hair
          </Button>
        </Box>
      </Card>
    </form>
  );
};

EditHair.getLayout = (EditHair) => <DashboardLayout>{EditHair}</DashboardLayout>;
export default EditHair;
