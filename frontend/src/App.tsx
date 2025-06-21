import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { logout } from './store/authSlice';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import './App.css';

function App() {
  const { isAuth, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  if (!isAuth) {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/registration">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <div>
      <h1>Welcome, {'nickname' in user && user.nickname}!</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <p>Your content here</p>
    </div>
  );
}

export default App;
