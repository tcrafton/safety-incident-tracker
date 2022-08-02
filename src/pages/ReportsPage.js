import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Grid, InputLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import IncidentsTable from '../components/IncidentsTable';
import { SAFETY_API_URL } from '../utils/constants';

const ReportsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState((dateVal) => {
    if (!dateVal) {
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 30
      );
    }
  });
  const [selectedEndDate, setSelectedEndDate] = useState((dateVal) => {
    if (!dateVal) {
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
    }
  });

  const handleDateChange = (dateVal, dateParam) => {
    let selectedDate = '';
    if (!dateVal) {
      selectedDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
    } else {
      selectedDate = new Date(dateVal);
    }

    if (dateParam === 'start') {
      setSelectedStartDate(selectedDate);
    } else if (dateParam === 'end') {
      setSelectedEndDate(selectedDate);
    }
  };

  const tableColumns = [
    {
      title: 'Incident Date',
      field: 'ACCIDENTDATE',
      type: 'date',
      width: '150px',
    },
    {
      title: 'Incident Time',
      field: 'ACCIDENTTIME',
      type: 'time',
      width: '150px',
    },
    { title: 'Emp. ID', field: 'CLOCKNBR', width: '150px' },
    { title: 'Employee', field: 'NAME', width: '250px' },
    { title: 'Expected Outcome', field: 'EXPECTED_OUTCOME', width: '250px' },
    { title: 'Area', field: 'CARBON_PRIMARY', width: '250px' },
    { title: 'Location', field: 'CARBON_LOCATION', width: '250px' },
    { title: 'Job Code', field: 'JOBCODE', width: '125px' },
    { title: 'Type', field: 'TYPEOFACCIDENT', width: '150px' },
    { title: 'Supervisor', field: 'FOREMANNAME', width: '250px' },
    { title: 'Description', field: 'NATUREOFINJURY', width: '350px' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${SAFETY_API_URL}GetIncidentsByDateRange?startDate=${selectedStartDate.toLocaleDateString()}&endDate=${selectedEndDate.toLocaleDateString()}`
      );
      const data = await response.json();
      setIncidents(data);
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate]);

  return (
    <Wrapper>
      <Box>
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={2} className="dateSelectors">
            <InputLabel>Start Date</InputLabel>
            <DatePicker
              label="Start Date"
              className="datePicker"
              selected={selectedStartDate}
              dateFormat="MM/dd/yyyy"
              onChange={(e, label) => handleDateChange(e, 'start')}
            />
          </Grid>
          <Grid item xs={2} className="dateSelectors">
            <InputLabel>End Date</InputLabel>
            <DatePicker
              label="End Date"
              className="datePicker"
              selected={selectedEndDate}
              dateFormat="MM/dd/yyyy"
              onChange={(e, label) => handleDateChange(e, 'end')}
            />
          </Grid>

          <hr className="pageDivider"></hr>

          <Grid item xs={12}></Grid>
        </Grid>
      </Box>

      <div className="table">
        <IncidentsTable
          data={incidents}
          columns={tableColumns}
          title={`Incidents`}
          maxTableHeight="60vh"
          exportFileName="SafetyTrackerIncidents"
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 1em;
  padding-left: 1em;

  .table {
    width: 100%;
    height: calc(100vh - 32px);
    overflow: auto;
  }

  .dateSelects {
    padding: 2em;
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

  .react-datepicker-popper {
    z-index: 4;
  }

  .pageDivider {
    width: 98%;
    padding-top: 1rem;
    display: block;
    margin: auto;
    margin-top: 1rem;
  }

  .MuiInput-input {
    border-bottom: none !important;
  }

  .MuiInput-input:focus {
    border-bottom: none !important;
    box-shadow: none !important;
  }

  .css-7wvc1d-MuiTableCell-root {
    z-index: 2;
  }

  .css-11w94w9-MuiTableCell-root {
    z-index: -1;
  }
`;

export default ReportsPage;
