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
import { editHair, editHairAll, getHair, postHair, uploadImages } from "../../service/Hair";
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
    hairName: "",
    status: "",
    images: "",
  });
  const [hairCat, setHairCat] = useState([]);
  const [imageUp, setImageUp] = useState([]);
  const [colour, setcolour] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);

  useEffect(() => {
    console.log(id, "hair edit");
    getHair(
      id,
      (r) => {
        console.log(r, "hair edit");
        setValues({
          hairName: r.name,
          status: r.status,
          images: r.images,
          id: id,
        });
        setcolour(r.images);

        setSections((prevSections) => [
          ...prevSections,
          ...r.images.map((e) => ({
            varientColour: e.colour,
            image: e.filename,
            id: e._id,
          })),
        ]);
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, []);
  const [sections, setSections] = useState([]);
  const addSection = () => {
    setSections([...sections, { varientColour: "", image: null }]);
  };

  const handleChange2 = (index, event) => {
    const updatedSections = [...sections];
    if (event.target.type === "file") {
      const formData = new FormData();
      formData.append("images", event?.target?.files[0]);
      updatedSections[index].image = formData;

      setFiles([...files, event.target.files[0]]);
    } else {
      updatedSections[index].varientColour = event.target.value;
      let colours = colour ? colour : [];
      colours[index] = event.target.value;
      setcolour([...colours]);
    }
    setSections(updatedSections);
  };
  const removeSection = (index, event) => {
    console.log("index=>", event.id);
    setImagesToRemove([...imagesToRemove, event.id]);
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const handleChange = (event) => {
    if (event.target.name === "image") {
      // console.log(event.target.files[0], "image")
      // if (
      //   event.target.files[0].type === "image/jpeg" ||
      //   event.target.files[0].type === "image/jpg" ||
      //   event.target.files[0].type === "image/png"
      // ) {
      //   setFiles([...files, event.target.files]);
      //   updatedSections[index].image = event.target.files[0];
      //   console.log(event.target.files);
      //   setImageUp(event.target.files);
      // } else {
      // }
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
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    console.log("colour1", colour);
    console.log("colour2", formData);
    console.log("colour3", values);
    console.log("colour4", imagesToRemove);

    editHair(
      values,
      sections,
      imagesToRemove,
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
                value={values.hairName}
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
              console.log("section=>", sections);
              return (
                <>
                  <Grid item md={4} xs={12} key={section.id}>
                    <TextField
                      type="color"
                      fullWidth
                      label="Verient Colour"
                      name="varientColour"
                      onChange={(event) => handleChange2(index, event)}
                      // required
                      value={section.varientColour}
                      variant="outlined"
                      key={section.id}
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
                      key={section.id}
                      helperText={typeof section?.image === "object" ? "" : section?.image}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={(event) => removeSection(index, section)}
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
          <Button color="error" variant="contained" onClick={() => router.push("/hair-list")}>
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
