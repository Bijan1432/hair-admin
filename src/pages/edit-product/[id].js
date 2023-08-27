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

import Modal from "@mui/material/Modal";
import NextLink from "next/link";
import { subCategoryModelDropdown } from "../../service/category";
import { ToastContainer, toast } from "react-toastify";
import Editor from "../../components/product/CkEditor";
import { makeStyles } from "@mui/styles";
import {
  editProduct,
  editProductWithOutImage,
  getFaq,
  getImage,
  getProductsEdit,
  postProduct,
} from "../../service/product";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";
import Image from "next/image";

function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}

const useStyles = makeStyles({
  label: {
    transform: "none",
    marginTop: -12,
    marginLeft: 10,
    background: "white",
  },
});
const EditProduct = (props) => {
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const [values, setValues] = useState({
    subCatModel_id: "",
    subCatModel: "",
    productName: "",
    slug: "",
    videoLink: "",
    image: "",
    categories: "",
    description: "",
    status: "",
  });
  const [error, setError] = useState({
    slug: false,
    productName: false,
    status: false,
    subCatModel_id: false,
    description: false,
    data: false,
  });
  const [openModel, setOpenModel] = useState(false);
  const [features, setFeatures] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [faq, setFaq] = useState([]);
  const [imageUp, setImageUp] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "image") {
      // console.log(event.target.files[0], "image")
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/jpg" ||
        event.target.files[0].type === "image/png"
      ) {
        setImageUp(event.target.files);
      } else {
      }
    }
    // else if (event.target.name === "subCatModel") {
    //   setValues({
    //     ...values,
    //     [event.target.name]: event.target[event.target.selectedIndex].text,
    //     [`${event.target.name}_id`]: event.target.value,
    //   });
    // }
    else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {
    subCategoryModelDropdown(
      (r) => {
        setSubCategory(r);
      },
      (err) => {
        toast.error("No Sub Category Found!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
    getProductsEdit(
      id,
      (r) => {
        console.log(r, "r.subCat_id");
        setValues({
          subCatModel_id: r.subCatModel_id,
          subCatModel: r.subCatModel,
          productName: r.name,
          slug: r.slug,
          videoLink: r.video,
          image: r.image,
          categories: r.category,
          description: r.description,
          product_id: r.product_id,
          status: r.status,
        });
        setData(r.specification);
        setDescription(r.description);
        // getImage(
        //   r.image,
        //   (image) => {
        //     image.map((r) => console.log("image==>>", r), setImageList(r));
        //   },
        //   (err) => {}
        // );
      },
      (err) => {
        console.log(err);
      }
    );
    getFaq(
      id,
      (r) => {
        console.log(r, "faq list");
        setFaq(r);
      },
      (err) => {}
    );
  }, [router.isReady]);

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

  const addFaq = (event) => {
    setFaq((prv) => [
      ...prv,
      {
        faqTitle: toTitleCase(values.faqTitle),
        faqDescription: toTitleCase(values.faqDescription),
      },
    ]);
  };

  const handelRemoveFaq = (row, index) => {
    const resetTable = faq.filter((a, i) => i !== index);
    setFaq(resetTable);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    const { slug, productName, status, subCatModel_id } = values;
    const formData = new FormData();
    for (let i = 0; i < imageUp.length; i++) {
      formData.append("images", imageUp[i]);
    }
    if (!slug || !productName || !status || !subCatModel_id || !description || !data) {
      setError({
        slug: !slug,
        productName: !productName,
        status: !status,
        subCatModel_id: !subCatModel_id,
        description: !description,
        data: !data,
      });
      window.scrollTo(0, 0);
    } else {
      if (imageUp.length > 0) {
        editProduct(
          formData,
          values,
          token,
          data,
          faq,
          description,
          (r) => {
            toast.success("Product Updated!! ✔✔✔", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            router.push("/product-list");
          },
          (err) => {
            toast.error(err, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
        );
      } else {
        editProductWithOutImage(
          values,
          token,
          data,
          faq,
          description,
          (r) => {
            toast.success("Product Updated!! ✔✔✔", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            router.push("/product-list");
          },
          (err) => {
            toast.error(err, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
        );
      }
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

  useEffect(() => {
    let modelis = subCategory?.filter((e) => e.value == 46)[0]?.subMainCategory;
    console.log("mode is", modelis);
  }, [subCategory]);
  return (
    <>
      {/* {imageList &&
        imageList.map(
          (r, i) => (console.log(r, "ggggg"), (<Image src={r} alt="/" height="600" width="600" />))
        )} */}
      <form
        autoComplete="off"
        noValidate
        onSubmit={onClickSubmit}
        // {...props}
      >
        <Card>
          <CardHeader
            // subheader="The information can be edited"
            title="Add Product"
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
                {/* <TextField
                  fullWidth
                  label="Sub Category Model"
                  name="subCatModel"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.subCatModel_id}
                  variant="outlined"
                  InputLabelProps={{ classes: { outlined: classes.label } }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {subCategory.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField> */}
                {/* <p>
                  {values.subCatModel +
                    " - " +
                    subCategory?.filter((e) => e.value == values?.subCatModel_id)[0]
                      ?.subMainCategory}
                </p> */}
                {/* {console.log("values.subCatModel", values.subCatModel)} */}
                <Autocomplete
                  // value={
                  //   values.subCatModel +
                  //   " - " +
                  //   subCategory?.filter((e) => e.value == values?.subCatModel_id)[0]
                  //     ?.subMainCategory
                  // }
                  onChange={(event, newValue) =>
                    handleOptionChange(
                      newValue ? newValue : "Select a Category Model",
                      "subCatModel"
                    )
                  }
                  options={subCategory}
                  getOptionLabel={(option) => option.label + " - " + option.subMainCategory}
                  // getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a Category Model" variant="outlined" />
                  )}
                />
                <span>
                  {values.subCatModel +
                    " - " +
                    subCategory?.filter((e) => e.value == values?.subCatModel_id)[0]
                      ?.subMainCategory}
                </span>
                {error.subCatModel_id ? (
                  <span style={{ color: "red", fontSize: "10pt" }}>*Category is required</span>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Product Name"
                  label="Product Name"
                  name="productName"
                  onChange={handleChange}
                  required
                  value={values.productName}
                  variant="outlined"
                />
                {error.productName ? (
                  <span style={{ color: "red", fontSize: "10pt" }}>*Product Name is required</span>
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
                <TextField
                  fullWidth
                  label="Slug"
                  name="slug"
                  onChange={handleChange}
                  required
                  value={values.slug}
                  variant="outlined"
                />
                {error.slug ? (
                  <span style={{ color: "red", fontSize: "10pt" }}>*Slug is required</span>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item md={12} xs={12}>
                {/* <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values.description}
                  variant="outlined"
                  multiline={true}
                /> */}
                <Editor
                  name="description"
                  onChange={(data) => {
                    setDescription(data);
                  }}
                  editorLoaded={editorLoaded}
                  value={description}
                />
                {error.description ? (
                  <span style={{ color: "red", fontSize: "10pt" }}>*Description is required</span>
                ) : (
                  ""
                )}
              </Grid>
              {/* <Grid item md={12} xs={12}>
                <Tooltip title="Add All The Features First">
                  <Divider>
                    <Chip label="Features" />
                  </Divider>
                </Tooltip>
              </Grid>
              <Grid item md={4} xs={12}>
                <Tooltip title="Add All The Features First">
                  <TextField
                    fullWidth
                    label="Features"
                    name="features"
                    onChange={handleChange}
                    required
                    value={values.features}
                    variant="outlined"
                  />
                </Tooltip>
              </Grid>
              <Grid item md={4} xs={12}>
                <Button
                  color="success"
                  variant="contained"
                  sx={{
                    marginTop: 1,
                  }}
                  onClick={onClickAddFeatures}
                >
                  Add
                </Button>
              </Grid> */}
              <Grid item md={12} xs={12}>
                {/* <Tooltip title="After Adding All The features Just Change The Model Name And Click On Add Specifiaction"> */}
                <Divider>
                  <Chip label="Add Model And Specifiactions" />
                </Divider>
                {/* </Tooltip> */}
              </Grid>
              <Grid item md={12} xs={12}>
                {/* <Tooltip title="After Adding All The features Just Change The Model Name And Click On Add Specifiaction">
                  <TextField
                    fullWidth
                    label="Product Model Name"
                    name="productModelName"
                    onChange={handleChange}
                    required
                    value={values.productModelNam}
                    variant="outlined"
                  />
                </Tooltip> */}
                <Editor
                  name="description"
                  onChange={(data) => {
                    setData(data);
                  }}
                  editorLoaded={editorLoaded}
                  value={data}
                />
                {error.data ? (
                  <span style={{ color: "red", fontSize: "10pt" }}>*Specifiaction is required</span>
                ) : (
                  ""
                )}
              </Grid>
              {/* <Grid item md={12} xs={12}>
                {features.map((row, i) => {
                  return (
                    <Grid container spacing={3} sx={{ marginTop: 1 }}>
                      <Grid item md={3} xs={12}>
                        <TextField
                          fullWidth
                          label="Features"
                          name="features"
                          required
                          value={row.field}
                          variant="outlined"
                          disabled
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <TextField
                          fullWidth
                          label="Unit"
                          name={`unit_${row.field}`}
                          onChange={handleChange}
                          required
                          value={values[`unit_${row.field}`]}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <TextField
                          fullWidth
                          label="Value"
                          name={`value_${row.field}`}
                          onChange={handleChange}
                          required
                          value={values[`value_${row.field}`]}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <Button
                          color="error"
                          variant="contained"
                          sx={{
                            marginTop: 1,
                          }}
                          onClick={() => removeFeatures(row, i)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid item>
                <Button color="success" variant="contained" onClick={onClickAddSpecifiaction}>
                  Add Model Specification
                </Button>
              </Grid>
              {specification.length > 0 ? (
                <Grid item md={12} xs={12}>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {columns.map((r, i) => {
                            return <TableCell align="left">{r.headerName}</TableCell>;
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {specification.map((row, k) => {
                          return (
                            <TableRow key={k}>
                              <TableCell component="th" scope="row">
                                {row.productModelName}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.features}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.unit}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.value}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                ""
              )} */}
              <Grid item md={12} xs={12}>
                <Divider>
                  <Chip label="Images And Videos" />
                </Divider>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Video Links"
                  name="videoLink"
                  onChange={handleChange}
                  // required
                  value={values.videoLink}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  // label="Image"
                  name="image"
                  type="file"
                  onChange={handleChange}
                  inputProps={{
                    multiple: true,
                    accept: ".jpg,.jpeg,.png",
                  }}
                  helperText={values.image ? values.image.map((r, i) => r.fileName + ",") : ""}
                />
                {console.log(imageUp, "image eeee")}
              </Grid>
              {/* <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Categories"
                  name="categories"
                  onChange={handleChange}
                  required
                  value={values.categories}
                  variant="outlined"
                />
              </Grid> */}
              {/* <Grid item md={12} xs={12}>
                <Divider>
                  <Chip label="FAQ" />
                </Divider>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="FAQ Title"
                  name="faqTitle"
                  onChange={handleChange}
                  // required
                  value={values.faqTitle}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="FAQ Description"
                  name="faqDescription"
                  onChange={handleChange}
                  // required
                  value={values.faqDescription}
                  variant="outlined"
                  multiline
                />
              </Grid>
              <Grid item>
                <Button color="success" variant="contained" onClick={addFaq}>
                  Add FAQ
                </Button>
              </Grid>
              {faq.length > 0 ? (
                <Grid item md={12} xs={12}>
                  <Grid item md={12} xs={12} sx={{ marginBottom: 1 }}>
                    <Divider>
                      <Chip label="FAQ List" />
                    </Divider>
                  </Grid>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">#</TableCell>
                          <TableCell align="center">Title</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {faq.map((row, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell align="left">{i + 1}</TableCell>
                              <TableCell align="center">{row.faqTitle}</TableCell>
                              <TableCell align="center">{row.faqDescription}</TableCell>
                              <TableCell align="center">
                                <Button
                                  key={i}
                                  color="error"
                                  variant="contained"
                                  onClick={(r) => handelRemoveFaq(r, i)}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                ""
              )} */}
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
              Save Product
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
            Would You Like To Add New Product Model Details?
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
EditProduct.getLayout = (EditProduct) => <DashboardLayout>{EditProduct}</DashboardLayout>;
export default EditProduct;
