import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlashCard from "./pages/FlashCard";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class">
          <Route path=":id" element={<FlashCard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
