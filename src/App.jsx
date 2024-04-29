import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./frontend/pages/Home";
import FlashCard from "./frontend/pages/FlashCard";
import PageNotFound from "./frontend/pages/PageNotFound";

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
