import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { Button, Snackbar, TextField } from "@material-ui/core";
import { Brightness3, Brightness7 } from "@material-ui/icons";
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';
import axios from "axios";

import { GradientDiv } from "../../styles/common";
const API_URL = "http://localhost:8080/api/urls";


const CustomBtn = styled(Button)`
width: 400px;
    font-size: 20px !important;
    background-color: #e1eef4 !important;
    margin: 40px !important;
    padding: 13px !important;
`

export const Home = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState('')
  const [responseStatus, setResponseStatus] = useState<String | null>(null)
const [allData, setAllData] = useState([])

useEffect(() => {
  axios.get(
    API_URL+ `/`
  ).then((res)=>{
    console.log('All data fetched : ', res.data)
    setAllData(res.data)
  })


}, [response]);


  const onSubmit = async () => {
   
    try {
      setIsSubmitting(true);
   const data = {
     originalUrl, postFixTerm, expiryDate:selectedDate
   }
   console.log('Data - ', data)
      const res: any = await axios.post(
        API_URL+ `/`,
        data
      );
      console.log("Res - ", res);
      setIsSubmitting(false);
      setResponse(res.data.message)
      setResponseStatus('success')
      setOpen(true);
    
    } catch (error) {
      setOpen(true);
      if (error.errors) {
      }
      setIsSubmitting(false);
      
      setResponse(error.message)
      setResponseStatus('error')
    }
  };

  useEffect(() => {
    if (response) {
      setIsSubmitting(false);
    }
  
  }, [response]);

  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  const [dataTypes, setDataTypes] = useState(false);
  const toggleDataTypes = () => {
    setDataTypes(!dataTypes);
  };
  const [theme, setTheme] = useState(true);
  const icon = !theme ? <Brightness7 /> : <Brightness3 />;
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [originalUrl, setOriginalUrl] = useState('');
  const [postFixTerm, setPostFixTerm] = useState('');
  const handleDateChange = (event:any) => {
    console.log(event)
    setSelectedDate(event);
  };
  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setResponse('')
      setResponseStatus(null)
  };

  

  return (
    <>
    {
      responseStatus && ( <Snackbar open={open} autoHideDuration={100000} onClose={handleSnackbarClose}>
<Alert onClose={handleSnackbarClose} severity={responseStatus === 'error' ? "error" : "success"}>
<AlertTitle>{responseStatus==='error' ? "Error" : "Success"}</AlertTitle>
{responseStatus === 'error' ? <><strong>{response}</strong></>  : <><strong>{response}</strong></>}
  </Alert></Snackbar>

      )
    }
      {" "}
      <GradientDiv>
      <div><span className={'gradient1-text'} style={{fontSize:43}}>Intput</span></div>
      <TextField
          style={{    width: '95%',margin: '31px',  marginBottom:'15px'}}
          label="Original URL"
          placeholder={'Type your url here ...'}
          variant="outlined"
          value={originalUrl}
          onChange={(e)=>{setOriginalUrl(e.target.value)}}
          id="mui-theme-provider-outlined-input"
        />
        <div style={{display: 'flex',justifyContent: 'space-between', paddingBottom: '31px'}}>
         <TextField
          style={{    width: '40%',margin: '31px', marginBottom:'15px'}}
          label="Key"
          placeholder={'Type any key/unique term for your short url ...'}
          variant="outlined"
          value={postFixTerm}
          onChange={(e)=>{setPostFixTerm(e.target.value)}}
          id="mui-theme-provider-outlined-input"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
    
        <KeyboardDatePicker
          margin="normal"
          style={{    width: '40%',margin: '31px', marginBottom:'15px'}}
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          inputVariant='outlined'
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
    </div>
    <CustomBtn onClick={onSubmit}>Generate Short URL</CustomBtn>
      </GradientDiv>
      <br />
      <br />
    
      <GradientDiv style={{ overflow: "hidden" }}>
        <div><span className={'gradient1-text'} style={{fontSize:43}}>Output</span></div>
       
<PerfectScrollbar>
  <div style={{maxHeight: "50vh"}}>
       </div></PerfectScrollbar>
      </GradientDiv>
    </>
  );
};
