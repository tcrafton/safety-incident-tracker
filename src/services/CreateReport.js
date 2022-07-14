import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const test = () => {
  console.log('test');
};

export const createPdf = async (reportData, caseNumber) => {
  console.log(caseNumber);
  const doc = new jsPDF();
  doc.page = 1;
  doc.setFont('Times').setFontSize(18).setFont(undefined, 'bold');
  doc.text(`Magnitude 7 Metals`, doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  });

  doc.setFont('Times').setFontSize(14).setFont(undefined, 'bold');
  doc.text(`Incident Report`, doc.internal.pageSize.getWidth() / 2, 27, {
    align: 'center',
  });

  createDataTable(doc, reportData, caseNumber);

  var currentDate = new Date().toLocaleDateString();
  doc.text(170, 10, currentDate);
  // createAreaField(doc, 'Task Being Performed', reportData.TASK_BEING_PERFORMED);
  // createAreaField(doc, 'Nature of Incident', reportData.NATUREOFINJURY);

  doc.save(`IncidentReport.pdf`);
};

const createDataTable = async (doc, reportData, caseNumber) => {
  console.log(reportData);
  let tableBody = [];
  tableBody.push([
    { content: 'Case #:' },
    { content: caseNumber },
    { content: 'Type:' },
    { content: 'Injury' },
  ]);
  tableBody.push([{ content: 'Employee:' }, { content: reportData.NAME }]);
  tableBody.push([
    { content: 'Employee ID:' },
    { content: reportData.CLOCKNBR },
  ]);
  tableBody.push([
    { content: 'Incident Date:' },
    { content: reportData.ACCIDENTDATE },
    { content: 'Assigned Shift:' },
    { content: reportData.SHIFT },
  ]);
  tableBody.push([
    { content: 'Incident Time:' },
    { content: reportData.ACCIDENTTIME },
    { content: 'Shift Incident Occurred On:' },
    { content: reportData.SHIFT_OCCURED },
  ]);
  tableBody.push([
    { content: 'Incident Location:' },
    { content: reportData.GENERAL_AREA },
    { content: 'Job Code:' },
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
        cellWidth: 50,
        fontStyle: 'bold',
      },
      3: {
        cellWidth: 30,
      },
    },
    startY: 34,
    margin: { left: 10 },
    //styles: { fontSize: 10, halign: 'right' },
    theme: 'grid',
    // head: [['Date', 'Total Pounds Delivered', 'Metric Tons']],
    tableWidth: 'wrap',
    body: tableBody,
  });
};

const createAreaField = async (doc, title, note) => {
  console.log('got here');
  let tableBody = [];
  tableBody.push([{ content: `${title}:` }, { content: note }]);

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
        cellWidth: 40,
      },
      1: {
        cellWidth: 110,
        halign: 'left',
      },
    },
    styles: { fontSize: 10, halign: 'right' },
    theme: 'grid',
    tableWidth: 'wrap',
    body: tableBody,
  });
};
