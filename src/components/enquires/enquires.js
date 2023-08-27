import { useState, useEffect } from "react";
const XLSX = require("xlsx");
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
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { getQoutes } from "../../service/qoutes";

export const EnquiryList = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [qoutes, setQoutes] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "email", headerName: "Email", width: 130 },

    {
      field: "message",
      headerName: "Message",
      width: 130,
    },
    {
      field: "time",
      headerName: "Time",
      width: 170,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 160,
    //   renderCell: ({ row }) => (
    //     <>
    //       <Grid container spacing={3}>
    //         <Grid item md={6} xs={6}>
    //           <Tooltip title="Edit">
    //             <EditIcon onClick={() => EditHandler(row)} />
    //           </Tooltip>
    //         </Grid>
    //         {/* <Grid item md={6} xs={6}>
    //             <a href={`http://arizton-base.markobrando.com/blog/` + row.slug} target="_blank" rel="noreferrer">
    //               <Tooltip title="Preview">
    //                 <LinkIcon />
    //               </Tooltip>
    //             </a>
    //           </Grid> */}
    //       </Grid>
    //     </>
    //   ),
    // },
  ];

  useEffect(() => {
    getQoutes(
      token,
      (r) => {
        setQoutes(r);
        console.log("enquries are-", r);
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
    router.push("/edit-product/" + row.product_id);
  };

  //xsl sheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([["Name", "Phone", "Email", "Message", "Time"]]);

  // Format the data
  const formattedData = qoutes
    .filter((item) => !item.productName)
    .map((enquiry) => [enquiry.name, enquiry.phone, enquiry.email, enquiry.message, enquiry.time]);

  // Add the data to the worksheet
  XLSX.utils.sheet_add_aoa(worksheet, formattedData, { origin: "A2" });

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

  // Save the workbook
  const downloadenquiry = () => {
    XLSX.writeFile(workbook, "enquiries.xlsx");
    console.log("XLS file created successfully");
  };

  return (
    <Card>
      <CardHeader
        // subheader="The information can be edited"
        title="Enquires List"
        style={{
          background: "#2e5cb8",
          color: "white",
          height: 10,
        }}
      />
      <CustomTable rows={qoutes.filter((item) => !item.productName)} columns={columns} />

      <Button
        color="success"
        variant="contained"
        sx={{
          marginTop: 1,
          marginButtom: 1,
        }}
        onClick={downloadenquiry}
      >
        Download Enquiry
      </Button>
    </Card>
  );
};
