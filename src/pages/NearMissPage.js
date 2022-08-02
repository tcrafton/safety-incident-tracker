import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import DatePicker from 'react-datepicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  ACCIDENT_API_EF_URL,
  HR_API_URL,
  EMPLOYEE_API_URL,
  SAFETY_API_URL,
} from '../utils/constants';

import { processNearMissReport } from '../services/CreateIncidentReport';

const initialState = {
  CLOCKNBR: '',
  NAME: '',
  SHIFT: '',
  SHIFT_OCCURED: '',
  DEPT: '',
  JOBCODE: '',
  FOREMANNAME: '',
  FOREMANCODE: '',
  ACCIDENTDATE: '',
  ACCIDENTTIME: '',
  DEPT_ASSIGNED: '',
  CHARGED_DEPT: '',
  NATUREOFINJURY: '',
  CARBON_PRIMARY: '',
  CARBON_LOCATION: '',
  CARBON_ID: '',
  LOCATION: '',
  POTENTIAL_OUTCOME: '',
  EXPECTED_OUTCOME: '',
  TASK_BEING_PERFORMED: '',
  TYPEOFACCIDENT: 'Near Miss',
  ENTEREDBY: 'WEBAPP',
  RCFA_REQUIRED: 1,
};

const NearMissPage = () => {
  const [employees, setEmployees] = useState([]);
  const [carbonCodes, setCarbonCodes] = useState([]);
  const [salaryEmployees, setSalaryEmployees] = useState([]);
  const [crews, setCrews] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [accidentData, setAccidentData] = useState(initialState);
  const [accidentDate, setAccidentDate] = useState(null);
  const [accidentTime, setAccidentTime] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [incidentLocation, setIncidentLocation] = useState(null);
  const [deptAssigned, setDeptAssigned] = useState(null);

  const outcomes = [
    'Fatality',
    'Lost Time',
    'Modified Work',
    'Medical Treatmeant',
    'First Aid',
  ];

  const shifts = ['Day', 'Night', 'A', 'B', 'C', 'D'];

  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    setAccidentData({ ...initialState });

    const fetchEmployees = async () => {
      const response = await fetch(`${HR_API_URL}GetActiveEmployees`);
      const data = await response.json();
      const filteredData = data.filter((emp) => emp.EMPLOYEEID.length > 3);
      setEmployees(filteredData);
    };

    const fetchSalaryEmployees = async () => {
      const response = await fetch(`${EMPLOYEE_API_URL}GetSalaryEmployees`);
      const data = await response.json();
      setSalaryEmployees(data);
    };

    const fetchDepartments = async () => {
      const response = await fetch(`${EMPLOYEE_API_URL}GetDepartments`);
      const data = await response.json();
      setDepartments(data);
    };

    const fetchCrews = async () => {
      const response = await fetch(`${HR_API_URL}GetCrews`);
      const data = await response.json();
      setCrews(data);
    };

    const fetchCarbonCodes = async () => {
      // const response = await fetch(`${ACCIDENT_API_EF_URL}GetCarbonCodes`);
      const response = await fetch(`${SAFETY_API_URL}GetAreas`);
      const data = await response.json();
      setCarbonCodes(data);
    };

    fetchEmployees();
    fetchSalaryEmployees();
    fetchDepartments();
    fetchCarbonCodes();
    fetchCrews();
  }, []);

  const handleInputChange = (e, param) => {
    if (param === 'ACCIDENTTIME') {
      setAccidentData({ ...accidentData, [param]: e.toLocaleTimeString() });
      setAccidentTime(e);
    } else if (param === 'ACCIDENTDATE') {
      setAccidentData({ ...accidentData, [param]: e.toLocaleDateString() });
      setAccidentDate(e);
    } else if (param === 'EMPLOYEE') {
      setAccidentData({
        ...accidentData,
        CLOCKNBR: e.EMPLOYEEID,
        NAME: e.NAME,
        DEPT: e.DEPTID,
        CHARGED_DEPT: e.DEPTID,
        JOBCODE: e.JOB_CODE,
      });
    } else {
      setAccidentData({ ...accidentData, [param]: e.target.value });
    }
  };

  const handleAutoCompleteChange = (value, param) => {
    if (param === 'DEPT_ASSIGNED') {
      setAccidentData({ ...accidentData, [param]: value.DESCRIPTION });
    } else if (param === 'LOCATION') {
      setAccidentData({
        ...accidentData,
        CARBON_PRIMARY: value.PRIMARY_AREA,
        CARBON_LOCATION: value.DESCRIPTION,
        CARBON_ID: value.INJURYCODE,
        LOCATION: value.MAJOR_LOCATION,
        GENERAL_AREA: value.GENERAL_AREA,
      });
    } else if (param === 'EMPLOYEE') {
      setAccidentData({
        ...accidentData,
        CLOCKNBR: value.EMPLOYEEID,
        NAME: value.NAME,
        DEPT: value.DEPTID,
        CHARGED_DEPT: value.DEPTID,
        JOBCODE: value.JOB_CODE,
      });
    } else if (param === 'FOREMANNAME') {
      setAccidentData({
        ...accidentData,
        FOREMANNAME: value.NAME,
        FOREMANCODE: value.EMPLOYEEID,
      });
    } else {
      setAccidentData({ ...accidentData, [param]: value });
    }
  };

  const handleSave = (e) => {
    if (checkEntries() === false) {
      return;
    }

    accidentData.ENTRYDATE = new Date(
      accidentData.ACCIDENTDATE
    ).toLocaleDateString();

    axios
      .post(`${ACCIDENT_API_EF_URL}SaveAccidentData`, accidentData)
      .then(function (response) {
        if (response.status === 200 || response.status === 204) {
          // creates PDF and sends it in an email
          processNearMissReport(accidentData, response.data.CASENUMBER);
          setAccidentData({ ...initialState });
          setSelectedSupervisor(null);
          setAccidentDate(null);
          setAccidentTime(null);
          setDeptAssigned(null);
          setIncidentLocation(null);
          notify('Data Saved');
        } else {
          notifyError('Error Saving Data');
        }
      });
  };

  const checkEntries = () => {
    if (!accidentData.CLOCKNBR) {
      notifyError('Select Employee');
      return false;
    }

    if (!accidentData.SHIFT) {
      notifyError('Select Shift');
      return false;
    }

    if (!accidentData.SHIFT_OCCURED) {
      notifyError('Select Shift Incident Occurred On');
      return false;
    }

    if (!accidentData.ACCIDENTDATE) {
      notifyError('Enter Incident Date');
      return false;
    }

    if (!accidentData.ACCIDENTTIME) {
      notifyError('Enter Incident Time');
      return false;
    }

    if (!accidentData.FOREMANNAME) {
      notifyError('Select Supervisor');
      return false;
    }

    if (!accidentData.DEPT_ASSIGNED) {
      notifyError('Select Dept. Employee Assigned To');
      return false;
    }

    if (!accidentData.FOREMANNAME) {
      notifyError('Select Supervisor');
      return false;
    }

    if (!accidentData.POTENTIAL_OUTCOME) {
      notifyError('Select Potential Outcome');
      return false;
    }

    if (!accidentData.NATUREOFINJURY) {
      notifyError('Enter Nature of Incident or Injury');
      return false;
    }
  };

  return (
    <>
      <Wrapper>
        <h4 className="pageHeader">Near Miss Entry</h4>
        <hr className="pageDivider"></hr>
        <div>
          <Box>
            <Grid container justify="space-around" spacing={2}>
              <Grid item xs={12}>
                <InputLabel>Employee</InputLabel>
                <Autocomplete
                  sx={{
                    maxWidth: '25%',
                  }}
                  id="size-small-outlined"
                  size="small"
                  options={employees}
                  getOptionLabel={(option) =>
                    `${option.NAME} (${option.CLOCKNBR})`
                  }
                  value={accidentData.NAME.length < 2 ? null : accidentData}
                  onChange={(e, label) => {
                    handleAutoCompleteChange(label, 'EMPLOYEE');
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel>Shift</InputLabel>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <TextField
                    style={{ width: '100%' }}
                    variant="outlined"
                    size="small"
                    value={accidentData.SHIFT}
                    onChange={(e, label) => handleInputChange(e, 'SHIFT')}
                    select
                  >
                    {crews.map((shift, i) => {
                      return (
                        <MenuItem key={i} value={shift.CREWCODE}>
                          {shift.CREWCODE}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <InputLabel>Shift Near Miss Occurred On</InputLabel>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <TextField
                    style={{ width: '100%' }}
                    variant="outlined"
                    size="small"
                    value={accidentData.SHIFT_OCCURED}
                    onChange={(e, label) =>
                      handleInputChange(e, 'SHIFT_OCCURED')
                    }
                    select
                  >
                    {shifts.map((shift, i) => {
                      return (
                        <MenuItem key={i} value={shift}>
                          {shift}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <InputLabel>Near Miss Date</InputLabel>
                <DatePicker
                  className="datePicker"
                  selected={accidentDate}
                  dateFormat="MM/dd/yyyy"
                  onChange={(e, label) => handleInputChange(e, 'ACCIDENTDATE')}
                />
              </Grid>
              <Grid item xs={3}>
                <InputLabel>Near Miss Time</InputLabel>
                <DatePicker
                  className="datePicker"
                  selected={accidentTime}
                  onChange={(e, label) => handleInputChange(e, 'ACCIDENTTIME')}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </Grid>
              <Grid item xs={5}>
                <InputLabel>Supervisor</InputLabel>
                <Autocomplete
                  sx={{
                    maxWidth: '50%',
                  }}
                  id="size-small-outlined"
                  size="small"
                  options={salaryEmployees}
                  value={selectedSupervisor}
                  getOptionLabel={(option) =>
                    `${option.NAME} (${option.EMPLOYEEID})`
                  }
                  onChange={(e, label) => {
                    handleAutoCompleteChange(label, 'FOREMANNAME');
                    setSelectedSupervisor(label);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Box width="100%" />
              <Grid item xs={5}>
                <InputLabel>Dept. Employee Assigned To</InputLabel>
                <Autocomplete
                  sx={{
                    maxWidth: '50%',
                  }}
                  id="size-small-outlined"
                  size="small"
                  options={departments}
                  value={deptAssigned}
                  getOptionLabel={(option) => option.DESCRIPTION}
                  onChange={(e, label) => {
                    handleAutoCompleteChange(label, 'DEPT_ASSIGNED');
                    setDeptAssigned(label);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Potential Outcome (Worst Case)</InputLabel>
                <FormControl sx={{ minWidth: 240 }} size="small">
                  <TextField
                    style={{ width: '100%' }}
                    variant="outlined"
                    size="small"
                    value={accidentData.POTENTIAL_OUTCOME}
                    onChange={(e, label) =>
                      handleInputChange(e, 'POTENTIAL_OUTCOME')
                    }
                    select
                  >
                    {outcomes.map((outcome, i) => {
                      return (
                        <MenuItem key={i} value={outcome}>
                          {outcome}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <InputLabel>Near Miss Location</InputLabel>
                <Autocomplete
                  sx={{
                    maxWidth: '50%',
                  }}
                  id="size-small-outlined"
                  size="small"
                  options={carbonCodes}
                  value={incidentLocation}
                  getOptionLabel={(option) =>
                    `${option.PRIMARY_AREA} - ${option.DESCRIPTION}`
                  }
                  onChange={(e, label) => {
                    handleAutoCompleteChange(label, 'LOCATION');
                    setIncidentLocation(label);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Nature of Near Miss</InputLabel>
                <TextareaAutosize
                  minRows={5}
                  aria-label="empty textarea"
                  value={accidentData.NATUREOFINJURY}
                  style={{
                    width: 750,
                    padding: '3px',
                    fontSize: '16px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.15008px',
                    display: 'block',
                  }}
                  onChange={(e, label) =>
                    handleInputChange(e, 'NATUREOFINJURY')
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
              </Grid>
              <Grid item xs={8}>
                <label>Email will be sent after successfully saved</label>
              </Grid>
            </Grid>
          </Box>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          transition={Slide}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 1em;

  .pageHeader {
    padding-top: 1em;
    margin-left: 1em;
  }

  .pageDivider {
    width: 98%;
    padding-bottom: 1rem;
    display: block;
    margin: auto;
  }

  .label {
    font-weight: 600;
  }

  .datePicker {
    padding: 9px;
    font-size: 16px;
    border-radius: 4px;
    border-color: rgba(0, 0, 0, 0.15);
    border-width: 1px;
    :hover {
      border-color: rgba(0, 0, 0, 0.85);
    }
  }
`;

export default NearMissPage;
