import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase";

import styles from "../../styles/Home.module.css";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    title: "",
  });

  useEffect(() => {
    const employeesRef = collection(firestore, "team");
    const unsubscribe = onSnapshot(employeesRef, (snapshot) => {
      const employeesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employeesData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddEmployee = async () => {
    try {
      const employeesRef = collection(firestore, "team");
      const newDoc = await addDoc(employeesRef, newEmployee);
      setEmployees([...employees, { id: newDoc.id, ...newEmployee }]);
      setNewEmployee({
        name: "",
        role: "",
        title: "",
      });
    } catch (error) {
      console.error("Error adding new employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const employeeRef = doc(firestore, "team", id);
      await deleteDoc(employeeRef);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddEmployee();
        }}
        className="bg-neutral-700 p-6 rounded-md space-y-6"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Add Employee
        </h3>
        <div>
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-2">
            Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newEmployee.title}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, title: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-neutral-800 ${styles.mcBackColor} ${styles.backHov}`}
        >
          Add Employee
        </button>
      </form>
      <h3 className="text-2xl font-semibold my-8 text-center">Employees</h3>
      <ul className="space-y-4">
        {employees.map((employee) => (
          <li
            key={employee.id}
            className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
          >
            <span>
              {employee.name} - {employee.role} - {employee.title}
            </span>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-500 ml-1 p-2 rounded-md text-neutral-100"
              onClick={() => handleDeleteEmployee(employee.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EmployeeManagement;
