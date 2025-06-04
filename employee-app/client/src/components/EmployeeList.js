import React, { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/employee/allEmp") // path to match backend equivalent
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((emp, idx) => (
          <li key={idx}>
            {emp.firstName} {emp.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
