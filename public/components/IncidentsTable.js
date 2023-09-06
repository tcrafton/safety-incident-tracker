import { forwardRef, useEffect, useState } from 'react';

import React from 'react';
import axios from 'axios';
import { ExportCsv } from '@material-table/exporters';
import MaterialTable from '@material-table/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Print,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@mui/icons-material';
import { printReport } from '../services/CreateIncidentReport';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const IncidentsTable = ({
  columns,
  data,
  title,
  maxTableHeight,
  exportFileName,
}) => {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  return (
    <>
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          localization={{
            header: {
              actions: 'Report',
            },
          }}
          icons={tableIcons}
          columns={columns}
          data={gridData}
          title={title}
          options={{
            search: true,
            headerStyle: { position: 'sticky', top: 0 },
            maxBodyHeight: maxTableHeight,
            tableLayout: 'fixed',
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
            exportMenu: [
              // {
              //   label: 'Export PDF',
              //   //// You can do whatever you wish in this function. We provide the
              //   //// raw table columns and table data for you to modify, if needed.
              //   // exportFunc: (cols, datas) => console.log({ cols, datas })
              //   exportFunc: (cols, datas) =>
              //     ExportPdf(cols, datas, 'myPdfFileName'),
              // },
              {
                label: 'Export CSV',
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, exportFileName),
              },
            ],
          }}
          actions={[
            {
              icon: Print,
              tooltip: 'Download Report',
              onClick: (event, rowData) =>
                printReport(rowData, rowData.CASENUMBER),
            },
          ]}
        />
      </div>
    </>
  );
};

export default IncidentsTable;
