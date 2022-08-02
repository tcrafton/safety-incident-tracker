export const links = [
  {
    id: 1,
    text: 'Injury Incident',
    url: '/SafetyIncidentTracker/injuryEntry',
  },
  {
    id: 2,
    text: 'Near Miss',
    url: '/SafetyIncidentTracker/nearMissEntry',
  },
  {
    id: 3,
    text: 'Property Damage',
    url: '/SafetyIncidentTracker/propertyDamageEntry',
  },
  {
    id: 4,
    text: 'Hazard Condition',
    url: '/SafetyIncidentTracker/hazardConditionEntry',
  },
  {
    id: 5,
    text: 'Reports',
    url: '/SafetyIncidentTracker/reports',
  },
];

const API_SERVER_EF = 'http://nm-apps/mag7webapief/';
//const API_SERVER_EF = 'http://localhost:49288/';

//const API_SERVER = 'http://nm-apps/mag7webapi/';
const API_SERVER = 'http://localhost:64198/';

export const ACCIDENT_API_EF_URL = `${API_SERVER_EF}api/AccidentData/`;
export const SAFETY_API_URL = `${API_SERVER}api/SafetyIncident/`;

export const HR_API_URL = `${API_SERVER}api/HR/`;
export const EMPLOYEE_API_URL = `${API_SERVER}api/Employee/`;
