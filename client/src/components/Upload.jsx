import React, { useState, useRef } from 'react';

export default function Upload() {
  const [image, setImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      readAndSetImage(file);
    } else {
      alert('Invalid file type. Please select a .jpeg, .jpg, or .png file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      readAndSetImage(file);
    } else {
      alert('Invalid file type. Please drop a .jpeg, .jpg, or .png file.');
    }
  };

  const readAndSetImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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

  return (
    <div>
    <div
      className={`text-center border-4 border-primary-500 rounded p-8 bg-cover bg-center relative h-screen   w-90 ${
        image ? 'lg:flex-row' : 'lg:flex-col'
      }`}
      style={{ backgroundImage: "url('client/src/assets/backgorund.jpeg')" }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="w-1/2 h-screen/2 border border-dotted border-gray-700 mx-auto my-auto">

      </div>
      <h2 className="text-2xl text-lime-100 font-bold mb-4">Image Uploader</h2>
      <label
        htmlFor="imageInput"
        className="cursor-pointer inline-block px-4 py-2 border-2 border-primary-100 rounded"
      >
        Select Image
      </label>
      <input
        type="file"
        id="imageInput"
        accept=".jpeg, .jpg, .png"
        onChange={handleImageChange}
        className="hidden"
      />
      <br />
      <button
        onClick={handleCaptureClick}
        disabled={isCapturing}
        className="bg-primary-600 text-white px-4 py-2 rounded mt-4"
      >
        Capture Image from Camera
      </button>
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
      <br />
      {image && (
        <div className="lg:flex lg:justify-between">
          <div className="lg:w-1/2">
            <img
              src={image}
              alt="Uploaded"
              className="mt-4 max-w-full max-h-48 rounded shadow-md"
            />
          </div>
          <div className="lg:w-1/2">
            <p className="mt-4">or</p>
            <p>Drag and drop your image here</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => alert("Upload button clicked!")}
            >
              Upload
            </button>
          </div>
        </div>
      )}
      {isCapturing && (
        <canvas ref={canvasRef} className="hidden"></canvas>
      )}
    </div>
    </div>
  );
}
