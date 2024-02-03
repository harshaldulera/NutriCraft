import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Upload from "./components/Upload";
import Signup from "./pages/Auth/Signup";
import Parameters  from "./components/Parameters";
import CopyUpload from "./components/CopyUpload";
import Recipe from "./components/Recipe";
import Stats from "./pages/Stats";
export const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path='/upload' element={<Upload/>}/>
                <Route path='copyupload' element={<CopyUpload/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/parameters" element={<Parameters ingredients="flour sugar butter eggs milk baking powder vanilla"/>}/>
                <Route path="/recipe" element={<Recipe />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </>
    );
};