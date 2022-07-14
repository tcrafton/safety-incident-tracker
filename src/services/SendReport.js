import axios from 'axios';

export const sendReport = async (reportData, reportName, reportSubject) => {
  try {
    axios
      .post(
        `http://nm-apps/mag7webapi/api/M7Email/SendPdfReport?reportName=${reportName}&subject=${reportSubject}`,
        //`http://localhost:64198/api/M7Email/SendPdfReport?reportName=${reportName}&subject=${reportSubject}`,
        {
          pdfData: JSON.stringify(reportData),
        }
      )
      .then((resp) => {
        console.log(`${reportName} Report Sent`);
      });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};
