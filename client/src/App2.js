import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

const App2 = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PrivateRoute><PrivateScreen/></PrivateRoute>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>}/> 
          <Route path="/forgotpassword" element={<ForgotPasswordScreen/>}/>
          <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen/>}/> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App2;