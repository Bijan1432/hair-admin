import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import CustomTable from "../Table/Table";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 180,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word", height: "100%" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>{params.value}</div>
    ),
  },
  { field: "country", headerName: "Country", width: 150 },
  { field: "phone", headerName: "Phone", width: 160 },
  { field: "email", headerName: "Email", width: 120 },
  {
    field: "message",
    headerName: "Message",
    width: 250,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>{params.value}</div>
    ),
  },
  { field: "action", headerName: "Action", width: 120 },
];

export const ContactUs = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {}, []);
  return (
    <Card>
      <CardHeader
        // subheader="The information can be edited"
        title="Contact Us Details"
        style={{
          background: "#4607ad",
          color: "white",
          height: 10,
        }}
      />
      <CustomTable rows={contact} columns={columns} />
    </Card>
  );
};
