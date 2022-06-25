import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./account/presenter/Account";
import LoginPage from "./login/presenter/LoginPage";
import RegisterPage from "./register/presenter/RegisterPage";
import Home from "./home/presenter/Home";
import CreateEventPage from "./create_event/presenter/CreateEventPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Context from "./Context/Context";
import Cookies from 'universal-cookie';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (usuario !== null) {
      return;
    }

    const cookies = new Cookies();
    const user = cookies.get('user');
    if (user === undefined) {
      return;
    }

    setUsuario(user);
  }, [usuario]);

  return (
    <Context.Provider value={[usuario, setUsuario]}>
      { usuario === null 
      ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/Registrar" element={<RegisterPage/>}/>
          </Routes>
        </BrowserRouter>
      ) 
      : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Conta/:id" element={<Account/>}/>
            <Route path="/CriarEvento" element={<CreateEventPage/>}/>
          </Routes>
        </BrowserRouter>
      ) }
    </Context.Provider>
  );
}

export default App;
