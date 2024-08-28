import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Expense from "./Pages/expense-tracker/expense";

function App() {
  return (
    <>
      <div className="main">
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
