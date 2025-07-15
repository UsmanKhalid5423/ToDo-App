// // src/App.tsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { Login } from "./pages/login"
// import Layout from "./layout"
// import Dashboard from "./pages/dashboard" // You'll create this page

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           }
//         />
//       </Routes>
//     </Router>
//   )
// }

// export default App


// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login"
import Layout from "./layout"
import Dashboard from "./pages/dashboard"
import TaskTypesList from "./pages/taskTypes/list" // New page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Authenticated layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="task-types" element={<TaskTypesList />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
