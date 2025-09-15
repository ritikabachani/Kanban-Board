import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { createContext, useState } from "react"
import Login from "./components/Login"
import Employee from "./components/Employee"
import KanbanBoard from "./components/KanbanBoard"
import AdminLayout from "./Layouts/AdminLayout"
import EmployeeUpload from "./components/EmployeeUpload"
import EmployeeView from "./components/EmployeeView"

export const employeeContext = createContext();
export const taskContext = createContext();
export const kanbanBoardColumnContext = createContext();
export const authContext = createContext();
const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Task 1 Description",
    assignee: 1
  }
];
// const initialTasks = [
//   {
//     id: 1,
//     title: "Task 1",
//     description: "Task 1 Description",
//     assignee: 1
//   }, {
//     id: 2,
//     title: "Task 2",
//     description: "Task 2 Description",
//     assignee: 2
//   }, {
//     id: 3,
//     title: "Task 3",
//     description: "Task 3 Description",
//     assignee: 1
//   }
// ];

const initialKanbanBoardColumns = [
  {
    id: 1,
    title: "To Do",
    tasks: [1]
  },
  {
    id: 2,
    title: "In Progress",
    tasks: []
  },
  {
    id: 3,
    title: "Done",
    tasks: []
  },
  {
    id: 4,
    title: "Backlog",
    tasks: []
  }
]
function App() {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe"
    }
  ]);
  const [tasks, setTasks] = useState(initialTasks);
  const [kanbanBoardColumns, setKanbanBoardColumns] = useState(initialKanbanBoardColumns);
  const [isLoggedIn, setIsLoggedIn] = useState(false);




  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>

      <kanbanBoardColumnContext.Provider value={{ kanbanBoardColumns, setKanbanBoardColumns }}>
        <taskContext.Provider value={{ tasks, setTasks }}>
          <employeeContext.Provider value={{ employees, setEmployees }}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={
                  isLoggedIn ? <Navigate to="/" /> : <Login />
                } />
                <Route path="/" element={
                  isLoggedIn ? <AdminLayout /> : <Navigate to="/login" />
                }>
                  <Route path="/" element={<Employee />} >
                    <Route path="/" element={<EmployeeUpload />} />
                    <Route path="/view" element={<EmployeeView />} />
                  </Route>
                  <Route path="board" element={<KanbanBoard />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </employeeContext.Provider>
        </taskContext.Provider>
      </kanbanBoardColumnContext.Provider>
    </authContext.Provider>

  )
}

export default App