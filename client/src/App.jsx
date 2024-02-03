import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import Upload from './components/Upload'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App;