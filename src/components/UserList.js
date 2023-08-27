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
} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CustomTable from "./Table/Table";
import { getUserList, updateuser, deleteuser } from "./../service/user";
import { ToastContainer, toast } from "react-toastify";
//icone
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

export const Userlist = () => {
  const router = useRouter();
  const [user, setUser] = useState([]);

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
                  <Button
                    onClick={(e) => {
                      setDatadel(userch);
                      handleClose();
                    }}
                  >
                    Delete
                  </Button>
                </Typography>
              </Popover>
            </Grid>
          </Grid>
        </>
      ),
    },
  ];

  const EditHandler = (row) => {
    // console.log(row);
    // router.push("/edit-user/" + row.user_id);
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
      <CustomTable rows={user} columns={columns} />
    </Card>
  );
};
