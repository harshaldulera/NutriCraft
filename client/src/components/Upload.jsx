import { useRef, useState } from "react";
import '../css/upload.css'
import Navbar from "./Navbar";


export default function Upload(props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [files, setFiles] = useState([]);
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const [isCapturing, setIsCapturing] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files.length; i++) {
        setFiles((prevState) => [...prevState, e.target.files[i]]);
      }
    }
  }

  function handleSubmitFile(e) {
    if (files.length === 0) {
      // no file has been submitted
    } else {
      // write submit logic here
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName, idx) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }
  const handleCaptureClick = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };


  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataURL = canvasRef.current.toDataURL('image/png');
      setImage(imageDataURL);
      setIsCapturing(false);
    }
  };

  const handleStopCapture = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setIsCapturing(false);
      }
    }
  };
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = async () => {
    console.log("HI1")
    if (!image) {
       alert('Please select an image first.');
       return;
    }
    
    const base64Image = image.toString("base64");
    //console.log(base64Image)
    try {
       const response = await fetch('http://localhost:3000/generate-ingredients', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ b64: base64Image }),
       });
   
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
   
       const ings = await response.text();
       console.log(ings)
       if(ings === " ERROR")
       {
        alert('Failed to generate ingredients. Please upload another image.');
       }
      //  else
      //  {
      //   setIngredients(ings)
      //  }
       // Move to next screen bro
      //  alert(`Ingredients: ${ings}`);
      props.setIng(ings)
      props.handleNext()
    } catch (error) {
       console.error('Error:', error);
       alert('Failed to generate ingredients. Please upload another image.');
    }
   };
   
  return (
    <div className="flex flex-col items-center justify-space  h-screen ">
      <div className="flex flex-col items-center justify-space h-screen/2 ">
      
      </div>
      {/* <div className="words text-lg">
        <h1>
          HAVE INGREDIENTS AND DON'T KNOW WHAT TO EAT?
        </h1>
        <h1>
          TRY US!!
        </h1>
      </div> */}
      <div className="text-center mt-5 flex flex-col items-center h-screen  w-screen p">
      <form
        className={`${
          dragActive ? "bg-blue-400" : "bg-blue-100"
        } bg-primary-100 p-7 h-100 w-3/5 rounded-lg uploadImg  text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleImageChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        <p>
          Drag & Drop files or{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{" "}
          to upload
        </p>

        <div className="flex flex-col items-center p-3">
          {files.map((file, idx) => (
            <div key={idx} className="flex flex-row space-x-5">
              <span>{file.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                remove
              </span>
            </div>
          ))}
        </div>
        {!isCapturing && <button
        onClick={handleCaptureClick}
        disabled={isCapturing}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Capture Image 
      </button>}
      <br />
      {isCapturing && (
        <>
          <video ref={videoRef} autoPlay playsInline className="mt-4 max-w-full max-h-48 rounded shadow-md" />
          <br />
          <button
            onClick={handleCaptureImage}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Capture Image
          </button>
          <button
            onClick={handleStopCapture}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
          >
            Stop Capture
          </button>
        </>
      )}
      {isCapturing && (
        <canvas ref={canvasRef} className="hidden"></canvas>
      )}
      {(image || files) && (
        <div className="lg:flex flex-col lg:justify-center items-center">
          <div className="lg:w-1/2">
            {image &&<img
              src={image}
              alt="Uploaded"
              className="mt-4 max-w-full max-h-48 rounded shadow-md"
            />}
          </div>
          <div >
            
            <button
              id="capture"
              className="text-white px-4 py-2 rounded mt-4"
              onClick={() => {handleUploadClick()}}
            >
              Upload
            </button>
          </div>
        </div>
      )}
      </form>
      </div>
    </div>
  );
}
