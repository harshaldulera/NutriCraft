import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Upload from "./components/Upload";
import Signup from "./pages/Auth/Signup";
import Parameters  from "./components/Parameters";
import CopyUpload from "./components/CopyUpload";
import Recipe from "./components/Recipe";
import Heatmap from "./components/Heatmap";

import Ingredients from "./pages/Ingredients";
import Piechart from "./components/Piechart";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
export const Router = () => {
    return (
        <>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path='/upload' element={<Upload/>}/>
                <Route path='copyupload' element={<CopyUpload/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/parameters" element={<Parameters ingredients="flour sugar butter eggs milk baking powder vanilla"/>}/>
                <Route path="/recipe" element={<Recipe />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/dashboard" element={<Barchart />} />  
            </Routes>
        </>
    );
};