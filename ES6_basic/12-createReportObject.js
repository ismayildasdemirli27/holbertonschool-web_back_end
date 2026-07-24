import createEmployeesObject from './11-createEmployeesObject.js';

export default function createReportObject(employeesList) {
  return {
    allEmployees: {
      ...employeesList,
    },
    getNumberOfDepartments(nak) {
      return Object.keys(nak).length;
    },
  };
}
