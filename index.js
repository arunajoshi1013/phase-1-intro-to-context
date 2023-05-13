// Your code here
function createEmployeeRecord(empInfo) {
  return {
    firstName: empInfo[0],
    familyName: empInfo[1],
    title: empInfo[2],
    payPerHour: empInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}
 function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array));
}
function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employeeRecord;
}
function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ")

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })

  return employee
}
function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
  const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  
  return hoursWorked;
}
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payRate = employeeRecord.payPerHour;
  const wagesEarned = hoursWorked * payRate;
  return wagesEarned;
}
function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(event => event.date);
  const wages = dates.map(date => wagesEarnedOnDate(employee, date));
  const totalWages = wages.reduce((acc, wage) => acc + wage, 0);
  return totalWages;
}
function calculatePayroll(records) {
  let totalPay = 0;
  for (const record of records) {
    totalPay += allWagesFor(record);
  }
  return totalPay;
}
