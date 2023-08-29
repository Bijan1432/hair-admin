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
  Typography,
  Chip,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Autocomplete from "@mui/material/Autocomplete";

import Modal from "@mui/material/Modal";
import NextLink from "next/link";

import { ToastContainer, toast } from "react-toastify";
import Editor from "./CkEditor";
import { makeStyles } from "@mui/styles";
import { postHair, uploadImages } from "../../service/Hair.js";
import { useRouter } from "next/router";

function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}

const columns = [
  { field: "productModelName", headerName: "Model Name", width: 350 },
  { field: "features", headerName: "Features", width: 130 },
  { field: "unit", headerName: "unit", width: 90 },
  { field: "value", headerName: "Value", width: 90 },
];
const useStyles = makeStyles({
  label: {
    transform: "none",
    marginTop: -12,
    marginLeft: 10,
    background: "white",
  },
});
export const Hair = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [imageUp, setImageUp] = useState([]);
  const [colour, setcolour] = useState([]);
  const [values, setValues] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({
    hairName: false,
    status: false,
    data: false,
  });
  const [openModel, setOpenModel] = useState(false);
  const [features, setFeatures] = useState([]);
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
  useEffect(() => {
    console.log("values are =  ", values);
  }, [values]);

  const modelClose = () => {
    setOpenModel(false);
  };

  const onClickAddFeatures = (event) => {
    setFeatures((prv) => [
      ...prv,
      {
        field: toTitleCase(values.features),
      },
    ]);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    console.log("files", files, colour, sections);
    const { hairName, status } = values;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    if (!hairName || !status) {
      setError({
        hairName: !hairName,
        status: !status,
      });
      window.scrollTo(0, 0);
    } else {
      console.log("values are =>>>", colour, values, imageUp);
      postHair(
        formData,
        colour,
        values,
        (r) => {
          toast.success("Hair Added!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setValues([])
          console.log(r);
          // router.push("/product-list");
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

  const removeFeatures = (row, index) => {
    const resetTable = features.filter((a, i) => i !== index);
    setFeatures(resetTable);
    console.log("to be remmoved:", row);
  };

  const onClickAddSpecifiaction = () => {
    features.map((r, i) => {
      setSpecification((prev) => [
        ...prev,
        {
          id: i,
          productModelName: values.productModelName,
          features: r.field,
          unit: values[`unit_${r.field}`],
          value: values[`value_${r.field}`],
        },
      ]);
    });
  };

  const handleOptionChange = (target, name) => {
    console.log("subCatModel_id-:", target, name);
    // let mainCat = subCategorymodel.find((obj) => obj.value == target.value);
    // console.log("subCategorymodel-:", subCategorymodel);
    // console.log("mainCat-:", mainCat);
    setValues({
      ...values,
      [name]: target.label,
      [`${name}_id`]: target.value,
      ["categories"]: target.mainCategory,
      ["subCat"]: target.subMainCategory,
      ["categories_id"]: target.mainCategory_id,
      ["subCat_id"]: target.subMainCategory_id,
    });
  };

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        onSubmit={onClickSubmit}
        // {...props}
      >
        <Card>
          <CardHeader
            // subheader="The information can be edited"
            title="Add Hair"
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

      <Modal
        open={openModel}
        onClose={modelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Would You Like To Add New Hair Model Details?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              p: 2,
            }}
          >
            <NextLink href={"/"}>
              <Button color="error" variant="contained">
                No
              </Button>
            </NextLink>
            <NextLink href={"/sub-category-model"}>
              <Button color="primary" variant="contained">
                Yes
              </Button>
            </NextLink>
          </Box>
        </Card>
      </Modal>
    </>
  );
};
