import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Upload from "./components/Upload";
import Signup from "./pages/Auth/Signup";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path='/upload' element={<Upload/>}/>
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </>
    );
};