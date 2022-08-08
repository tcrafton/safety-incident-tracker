import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { sendReport } from './SendReport';

const createPdf = async (reportData, reportName, caseNumber, reportType) => {
  const doc = new jsPDF();
  doc.page = 1;
  doc.setFont('Times').setFontSize(18).setFont(undefined, 'bold');
  doc.text(`Magnitude 7 Metals`, doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  });

  doc.setFont('Times').setFontSize(14).setFont(undefined, 'bold');
  doc.text(`${reportName}`, doc.internal.pageSize.getWidth() / 2, 27, {
    align: 'center',
  });

  if (reportName === 'Incident Report') {
    createIncidentDataTable(doc, reportData, caseNumber, reportType);
  } else if (reportName === 'Near Miss Report') {
    createNearMissDataTable(doc, reportData, caseNumber, reportType);
  } else if (reportName === 'Property Damage Report') {
    createPropertyDamageDataTable(doc, reportData, caseNumber, reportType);
  } else if (reportName === 'Hazardous Condition Report') {
    createHazardConditionDataTable(doc, reportData, caseNumber, reportType);
  }

  doc.setFont('Times').setFontSize(12).setFont(undefined, 'bold');
  var currentDate = new Date();
  doc.text(
    currentDate.toLocaleString(),
    doc.internal.pageSize.getWidth() / 2,
    285,
    {
      align: 'center',
    }
  );

  if (reportType === 'email') {
    let binary = doc.output();
    return binary ? btoa(binary) : '';
  } else {
    doc.save(`${reportName.replace(/\s+/g)}.pdf`);
  }
};

const createIncidentDataTable = async (
  doc,
  reportData,
  caseNumber,
  reportType
) => {
  let tableBody = [];
  tableBody.push([
    { content: 'Case #' },
    { content: caseNumber },
    { content: 'Type' },
    { content: 'Injury' },
  ]);
  tableBody.push([{ content: 'Employee' }, { content: reportData.NAME }]);
  tableBody.push([
    { content: 'Employee ID' },
    { content: reportData.CLOCKNBR },
  ]);
  tableBody.push([
    { content: 'Incident Date' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTDATE
          : new Date(reportData.ACCIDENTDATE).toLocaleDateString(),
    },
    { content: 'Assigned Shift' },
    { content: reportData.SHIFT },
  ]);
  tableBody.push([
    { content: 'Incident Time' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTTIME
          : new Date(reportData.ACCIDENTTIME).toLocaleTimeString(),
    },
    { content: 'Shift Incident Occurred On' },
    { content: reportData.SHIFT_OCCURED },
  ]);
  tableBody.push([
    { content: 'Incident Location' },
    { content: reportData.GENERAL_AREA },
    { content: 'Job Code' },
    { content: reportData.JOBCODE },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_PRIMARY, colSpan: 3 },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_LOCATION, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Task Being Performed' },
    { content: reportData.TASK_BEING_PERFORMED, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Likely Outcome' },
    { content: reportData.EXPECTED_OUTCOME, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Potential Outcome' },
    { content: reportData.POTENTIAL_OUTCOME, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Nature of Incident' },
    { content: reportData.NATUREOFINJURY, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Authorized By' },
    { content: reportData.FOREMANNAME, colSpan: 3 },
  ]);

  doc.autoTable({
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.4,
    },
    bodyStyles: {
      lineWidth: 0.4,
    },
    columnStyles: {
      0: {
        cellWidth: 50,
        fontStyle: 'bold',
      },
      1: {
        cellWidth: 60,
      },
      2: {
        cellWidth: 60,
        fontStyle: 'bold',
      },
      3: {
        cellWidth: 25,
      },
    },
    startY: 34,
    margin: { left: 10 },
    styles: { fontSize: 12 },
    theme: 'grid',
    tableWidth: 'wrap',
    body: tableBody,
  });
};

const createNearMissDataTable = async (
  doc,
  reportData,
  caseNumber,
  reportType
) => {
  let tableBody = [];
  tableBody.push([
    { content: 'Case #' },
    { content: caseNumber },
    { content: 'Type' },
    { content: 'Near Miss' },
  ]);
  tableBody.push([{ content: 'Employee' }, { content: reportData.NAME }]);
  tableBody.push([
    { content: 'Employee ID' },
    { content: reportData.CLOCKNBR },
  ]);
  tableBody.push([
    { content: 'Incident Date' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTDATE
          : new Date(reportData.ACCIDENTDATE).toLocaleDateString(),
    },
    { content: 'Assigned Shift' },
    { content: reportData.SHIFT },
  ]);
  tableBody.push([
    { content: 'Incident Time' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTTIME
          : new Date(reportData.ACCIDENTTIME).toLocaleTimeString(),
    },
    { content: 'Shift Incident Occurred On' },
    { content: reportData.SHIFT_OCCURED },
  ]);
  tableBody.push([
    { content: 'Near Miss Location' },
    { content: reportData.GENERAL_AREA },
    { content: 'Job Code' },
    { content: reportData.JOBCODE },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_PRIMARY, colSpan: 3 },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_LOCATION, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Nature of Near Miss' },
    { content: reportData.NATUREOFINJURY, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Authorized By' },
    { content: reportData.FOREMANNAME, colSpan: 3 },
  ]);

  doc.autoTable({
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.4,
    },
    bodyStyles: {
      lineWidth: 0.4,
    },
    columnStyles: {
      0: {
        cellWidth: 50,
        fontStyle: 'bold',
      },
      1: {
        cellWidth: 60,
      },
      2: {
        cellWidth: 60,
        fontStyle: 'bold',
      },
      3: {
        cellWidth: 25,
      },
    },
    startY: 34,
    margin: { left: 10 },
    styles: { fontSize: 12 },
    theme: 'grid',
    tableWidth: 'wrap',
    body: tableBody,
  });
};

const createPropertyDamageDataTable = async (
  doc,
  reportData,
  caseNumber,
  reportType
) => {
  let tableBody = [];
  tableBody.push([
    { content: 'Case #' },
    { content: caseNumber },
    { content: 'Type' },
    { content: 'Equipment Loss' },
  ]);
  tableBody.push([{ content: 'Employee' }, { content: reportData.NAME }]);
  tableBody.push([
    { content: 'Employee ID' },
    { content: reportData.CLOCKNBR },
  ]);
  tableBody.push([
    { content: 'Date of Loss' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTDATE
          : new Date(reportData.ACCIDENTDATE).toLocaleDateString(),
    },
    { content: 'Assigned Shift' },
    { content: reportData.SHIFT },
  ]);
  tableBody.push([
    { content: 'Time of Loss' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTTIME
          : new Date(reportData.ACCIDENTTIME).toLocaleTimeString(),
    },
    { content: 'Shift Incident Occurred On' },
    { content: reportData.SHIFT_OCCURED },
  ]);
  tableBody.push([
    { content: 'Location' },
    { content: reportData.GENERAL_AREA },
    { content: 'Job Code' },
    { content: reportData.JOBCODE },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_PRIMARY, colSpan: 3 },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_LOCATION, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Nature of Equipment Loss' },
    { content: reportData.NATUREOFINJURY, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Authorized By' },
    { content: reportData.FOREMANNAME, colSpan: 3 },
  ]);

  doc.autoTable({
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.4,
    },
    bodyStyles: {
      lineWidth: 0.4,
    },
    columnStyles: {
      0: {
        cellWidth: 50,
        fontStyle: 'bold',
      },
      1: {
        cellWidth: 60,
      },
      2: {
        cellWidth: 60,
        fontStyle: 'bold',
      },
      3: {
        cellWidth: 25,
      },
    },
    startY: 34,
    margin: { left: 10 },
    styles: { fontSize: 12 },
    theme: 'grid',
    tableWidth: 'wrap',
    body: tableBody,
  });
};

const createHazardConditionDataTable = async (
  doc,
  reportData,
  caseNumber,
  reportType
) => {
  let tableBody = [];
  tableBody.push([
    { content: 'Case #' },
    { content: caseNumber },
    { content: 'Type' },
    { content: 'Hazardous Condition' },
  ]);
  tableBody.push([{ content: 'Employee' }, { content: reportData.NAME }]);
  tableBody.push([
    { content: 'Employee ID' },
    { content: reportData.CLOCKNBR },
  ]);
  tableBody.push([
    { content: 'Date of Hazardous Condition' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTDATE
          : new Date(reportData.ACCIDENTDATE).toLocaleDateString(),
    },
    { content: 'Assigned Shift' },
    { content: reportData.SHIFT },
  ]);
  tableBody.push([
    { content: 'Time of Loss' },
    {
      content:
        reportType === 'email'
          ? reportData.ACCIDENTTIME
          : new Date(reportData.ACCIDENTTIME).toLocaleTimeString(),
    },
    { content: 'Shift Hazardous Condition Found' },
    { content: reportData.SHIFT_OCCURED },
  ]);
  tableBody.push([
    { content: 'Location' },
    { content: reportData.GENERAL_AREA },
    { content: 'Job Code' },
    { content: reportData.JOBCODE },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_PRIMARY, colSpan: 3 },
  ]);
  tableBody.push([
    { content: '' },
    { content: reportData.CARBON_LOCATION, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Nature of Hazard Condition' },
    { content: reportData.NATUREOFINJURY, colSpan: 3 },
  ]);

  tableBody.push([
    { content: 'Authorized By' },
    { content: reportData.FOREMANNAME, colSpan: 3 },
  ]);

  doc.autoTable({
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.4,
    },
    bodyStyles: {
      lineWidth: 0.4,
    },
    columnStyles: {
      0: {
        cellWidth: 50,
        fontStyle: 'bold',
      },
      1: {
        cellWidth: 60,
      },
      2: {
        cellWidth: 60,
        fontStyle: 'bold',
      },
      3: {
        cellWidth: 25,
      },
    },
    startY: 34,
    margin: { left: 10 },
    styles: { fontSize: 12 },
    theme: 'grid',
    tableWidth: 'wrap',
    body: tableBody,
  });
};

export const processReport = async (reportData, caseNumber, reportSubject) => {
  const report = await createPdf(
    reportData,
    reportSubject,
    caseNumber,
    'email'
  );
  await sendReport(report, 'SAFETY_INCIDENT', reportSubject);
};

export const printReport = async (reportData, caseNumber) => {
  if (reportData.TYPEOFACCIDENT === 'Injury') {
    createPdf(reportData, 'Incident Report', caseNumber, 'print');
  } else if (reportData.TYPEOFACCIDENT === 'Near Miss') {
    createPdf(reportData, 'Near Miss Report', caseNumber, 'print');
  } else if (reportData.TYPEOFACCIDENT === 'Equipment Loss') {
    createPdf(reportData, 'Property Damage Report', caseNumber, 'print');
  } else if (reportData.TYPEOFACCIDENT === 'Hazard Cond') {
    createPdf(reportData, 'Hazardous Condition Report', caseNumber, 'print');
  }
};
