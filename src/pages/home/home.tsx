import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { BuildOutlined, Settings } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "styled-components";
import { GradientDiv } from "../../styles/common";
let referralCodeGenerator = require('referral-code-generator')


const API_URL = "http://localhost:8080/api/urls";

const CustomBtn = styled(Button)`
width: 400px;
font-size: 17px !important;
font-weight: bold !important;
background-color: #5ab1c9 !important;
margin: 40px !important;
color: white !important;
padding: 13px !important;
`;
const CustomBtn1 = styled(Button)`
width: 200px;
background-color: #ffe1df !important;
margin-left: 20px !important;
padding: 17px !important;
`;
const OutputDiv = styled.div`
  font-size: 23px;
  margin: 46px;
  font-weight: bold;
`;

export const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState<String | null>(null);
  const [output, setOutput] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get(API_URL + `/`).then((res) => {
      setAllData(res.data);
    });
  }, [response]);

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const data = {
        originalUrl,
        postFixTerm,
        expiryDate: selectedDate,
        isProtected,
        password,
      };
      const res: any = await axios.post(API_URL + `/`, data);
      setIsSubmitting(false);
      setResponse(res.data.message);
      if (res.data.data) {
        setOutput(res.data.data.shortUrl);
        setResponseStatus("success");
      } else {
        setResponseStatus("error");
      }
      setOpen(true);
    } catch (error) {
      setOpen(true);
      if (error.errors) {
      }
      setIsSubmitting(false);

      setResponse(error.message);
      setResponseStatus("error");
    }
  };

  useEffect(() => {
    if (response) {
      setIsSubmitting(false);
    }
  }, [response]);

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [originalUrl, setOriginalUrl] = useState("");
  const [postFixTerm, setPostFixTerm] = useState("");
  const [isProtected, setIsProtected] = useState<Boolean>(false);
  const [password, setPassword] = useState("");
  const handleDateChange = (event: any) => {
    setSelectedDate(event);
  };
  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setResponse("");
    setResponseStatus(null);
  };

  return (
    <>
      {responseStatus && (
        <Snackbar
          open={open}
          autoHideDuration={100000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={responseStatus === "error" ? "error" : "success"}
          >
            <AlertTitle>
              {responseStatus === "error" ? "Error" : "Success"}
            </AlertTitle>
            {responseStatus === "error" ? (
              <>
                <strong>{response}</strong>
              </>
            ) : (
              <>
                <strong>{response}</strong>
              </>
            )}
          </Alert>
        </Snackbar>
      )}{" "}
      <GradientDiv>
        <div>
          <span className={"gradient1-text"} style={{ fontSize: 43 }}>
            Intput
          </span>
        </div>
        <TextField
          style={{ width: "95%", margin: "31px", marginBottom: "15px" }}
          label="Original URL"
          placeholder={"Type your url here ..."}
          variant="outlined"
          value={originalUrl}
          onChange={(e) => {
            setOriginalUrl(e.target.value);
          }}
          id="url"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "31px",
          }}
        >
         <div   style={{ width: "40%", margin: "31px", marginBottom: "15px" }}>
         <TextField
            label="Key"
            placeholder={"Type any key/unique term for your short url ..."}
            variant="outlined"
            value={postFixTerm}
            onChange={(e) => {
              setPostFixTerm(e.target.value);
            }}
            id="postFixTerm"
          />
          <CustomBtn1 startIcon={<BuildOutlined/>} onClick={()=>{
            setPostFixTerm(referralCodeGenerator.alpha('lowercase',6));
          }}>Generate Code</CustomBtn1>
           </div> 
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              style={{ width: "40%", margin: "31px", marginBottom: "15px" }}
              label="DateTimePicker"
              inputVariant="outlined"
              format="MMMM d, yyyy hh:mm a"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "31px",
          }}
        >
          <div style={{ width: "43%" }}>
            <InputLabel id="demo-simple-select-outlined-label">
              Password Protected
            </InputLabel>
            <Select
              style={{ width: "40%", margin: "31px", marginBottom: "15px" }}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              variant="outlined"
              value={isProtected}
              onChange={(e) => {
                const convertedBooleanKey =
                  e.target.value === "true" ? true : false;
                setIsProtected(convertedBooleanKey);
              }}
              disabled={password.trim().length !== 0}
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </div>

          {isProtected && (
            <TextField
              style={{ width: "40%", margin: "31px", marginBottom: "15px" }}
              label="Password"
              placeholder={"Type password ..."}
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="mui-theme-provider-outlined-input"
            />
          )}
        </div>
        <CustomBtn startIcon={<Settings/>} onClick={onSubmit}>Generate Short URL</CustomBtn>
      </GradientDiv>
      <br />
      <br />
      <GradientDiv style={{ overflow: "hidden" }}>
        <div>
          <span className={"gradient1-text"} style={{ fontSize: 43 }}>
            Output
          </span>
        </div>
        {output && (
          <OutputDiv>
            <a rel="noreferrer" target="_blank" href={`//${output}`}>
              {output}
            </a>
          </OutputDiv>
        )}
        {isSubmitting && (
          <div style={{ margin: 20 }}>
            <CircularProgress color="primary" />
          </div>
        )}
        <PerfectScrollbar>
          <div style={{ maxHeight: "50vh" }}></div>
        </PerfectScrollbar>
      </GradientDiv>{" "}
      <br />
      <br />
      {allData.length > 0 && (
        <GradientDiv>
          <div>
            <span className={"gradient1-text"} style={{ fontSize: 43 }}>
              Records available : {allData.length}
            </span>
          </div>
          <br />
          <Table aria-label="simple table">
            <TableHead style={{ background: "#eaf8fc" }}>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell align="center">Key</TableCell>
                <TableCell align="center">Expiry Date</TableCell>
                <TableCell align="center">Short URL</TableCell>
                <TableCell align="center">Protected</TableCell>
                <TableCell align="center">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((row: any) => (
                <TableRow key={row?.postFix}>
                  <TableCell component="th" scope="row">
                    {row?.originalUrl}
                  </TableCell>
                  <TableCell align="center">{row.postFix}</TableCell>
                  <TableCell align="center">
                    {moment(row.expiryDate).format("LLL")}
                  </TableCell>
                  <TableCell align="left">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={"//" + row.shortUrl}
                    >
                      {row.shortUrl}
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    {row.isProtected ? (
                      <span style={{ color: "green" }}>YES</span>
                    ) : (
                      <span style={{ color: "red" }}>NO</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.createdAt).format("LLL")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GradientDiv>
      )}
    </>
  );
};
