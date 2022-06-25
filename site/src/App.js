import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./account/presenter/Account";
import LoginPage from "./login/presenter/LoginPage";
import RegisterPage from "./register/presenter/RegisterPage";
import Home from "./home/presenter/Home";
import CreateEventPage from "./create_event/presenter/CreateEventPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/Registrar" element={<RegisterPage/>}/>
        <Route path="/Inicio" element={<Home/>}/>
        <Route path="/Conta/:id" element={<Account/>}/>
        <Route path="/CriarEvento" element={<CreateEventPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
