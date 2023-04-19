import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import InstructionsPage from "./components/InstructionsPage/InstructionsPage";
import Document from "./components/Document/Document";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/document/:id" element={<Document />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
