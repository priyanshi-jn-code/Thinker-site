import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import Start from './pages/Start';
import { ShareLink } from './pages/ShareLink';

const ProtectedRoute = ({ children } : any) => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    alert("Please login first!");
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/shareLink/:shareLink" element={<ShareLink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
