import { Route, Routes } from "react-router-dom";
import "./index.css";
import Root from "./layouts/root/Root";
import Article from "./pages/article/Article";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/news" element={<Home />} />
          <Route path="/news/article/:id" element={<Article />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
