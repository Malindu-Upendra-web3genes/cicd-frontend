import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoutes from './routes/ProtectedRoutes';
import OfflineRoutes from './routes/OfflineRoutes';
import ForceSessCloseRoutes from './routes/ForceSessCloseRoutes';
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import AddPass from './pages/AddPass';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path="/" exact />
        </Route>
        <Route element={<OfflineRoutes />}>
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<VerifyOtp />} path="/verify-otp/:verifyKey" />
        </Route>
        <Route element={<ForceSessCloseRoutes />}>
          <Route element={<AddPass />} path="/activate/:token" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
