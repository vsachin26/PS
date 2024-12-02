import React, { useState } from 'react';
import './FileUpload.css';

function FileUpload() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.fileUrl); // Set the uploaded image URL
      } else {
        console.error('File upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
}

export default FileUpload;
