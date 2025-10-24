import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"


// Pages
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import Dashboard from './pages/Dashboard.tsx'
import ImportTracklist from './pages/ImportTracklist.tsx'
import Settings from './pages/Settings.tsx'
import NotFound from './pages/NotFound.tsx'


import ProtectedRoute from './components/ProtectedRoute.tsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="*" element={<NotFound />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

    <Route path='/dashboard' element={<ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>} />

    <Route path="/import-tracklist" element={<ProtectedRoute>
      <ImportTracklist />
    </ProtectedRoute>} />

    <Route path="/settings" element={<ProtectedRoute>
      <Settings />
    </ProtectedRoute>} />


    </Route>
  )
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
