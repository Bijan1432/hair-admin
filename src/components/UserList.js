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
  Popover,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CustomTable from "./Table/Table";
import { getUserList, updateuser, deleteuser, searchUser } from "./../service/user";
import { ToastContainer, toast } from "react-toastify";
//icone
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

export const Userlist = () => {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [values, setValues] = useState([]);
  //modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [openMod, setOpenMod] = useState(false);
  const handleOpenMod = () => setOpenMod(true);
  const handleCloseMod = () => setOpenMod(false);

  useEffect(() => {
    getUserList(
      (r) => {
        setUser(r);
        // console.log("users", r);
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, []);

  //user edit

  const [data, setData] = useState([]);
  const handleChange = (event, status) => {
    setData({
      ...event,
      ["status"]: status,
    });
  };
  useEffect(() => {
    updateuser(
      data._id,
      data,
      (r) => {
        // setUser(r);
        console.log("users", r);
        getUserList(
          (r) => {
            setUser(r);
            console.log("users", r);
          },
          (err) => {
            toast.error(err, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
        );
        toast.success("user Updated!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, [data]);
  //user Delete
  const [datadel, setDatadel] = useState([]);
  useEffect(() => {
    deleteuser(
      datadel._id,

      (r) => {
        // setUser(r);
        console.log("users", r);
        getUserList(
          (r) => {
            setUser(r);
            console.log("users", r);
          },
          (err) => {
            toast.error(err, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
        );
        toast.success("user Deleted!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      },
      (err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    );
  }, [datadel]);

  //pover
  const [anchorEl, setAnchorEl] = useState(null);
  const [userch, userchset] = useState(null);

  const handleClick = (event) => {
    // console.log("event.currentTarget", event.currentTarget);
    // userchset(row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "gender", headerName: "Gender", width: 130 },
    { field: "dob", headerName: "DOB", width: 130 },
    { field: "status", headerName: "Status", width: 100 },

    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: ({ row }) => (
        <>
          <Grid container spacing={3}>
            <Grid item md={6} xs={6}>
              <Button
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => {
                  userchset(row);
                  handleClick(e);
                }}
              >
                <EditIcon />
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  <Button
                    onClick={(e) => {
                      // console.log(userch);
                      handleChange(userch, "active");
                      handleClose();
                    }}
                  >
                    Active
                  </Button>
                  <Button
                    onClick={(e) => {
                      handleChange(userch, "Inactive");
                      handleClose();
                    }}
                  >
                    Inactive
                  </Button>
                  <Button onClick={handleOpenMod}>Delete</Button>
                  <Modal
                    open={openMod}
                    onClose={handleCloseMod}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete The User
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Do You want to delete this user ?
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        className="mt-3"
                        onClick={(e) => {
                          setDatadel(userch);
                          handleClose();
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Modal>
                </Typography>
              </Popover>
            </Grid>
          </Grid>
        </>
      ),
    },
  ];

  const handleChangeSearch = (event) => {
    if (event.target.value.length >= 2) {
      console.log(event.target.value);
      searchUser(
        event.target.value,
        (r) => {
          console.log("user=>", r);
          setUser(r);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      getUserList(
        (r) => {
          setUser(r);
          // console.log("users", r);
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
          title="User List"
          style={{
            background: "#4607ad",
            color: "white",
            height: 10,
          }}
        />
        <CustomTable rows={user.filter((e) => e.name != "admin")} columns={columns} />
      </Card>
    </>
  );
};
