import { BrowserRouter, Routes, Route} from "react-router-dom";
import UnAuthorized from "./pages/UnAuthorized";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/unauthorized" element={<UnAuthorized />} />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
      </BrowserRouter>
  );
}

export default App;
