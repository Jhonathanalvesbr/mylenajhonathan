import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ModalImport from "./components/modal";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ModalImport />} />
          <Route index element={<ModalImport />} />
          <Route path="/:id" element={<ModalImport />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
