import React, { useState } from 'react';

const AddDestinationForm = () => {

  const [file, setFile] = useState(null);

  const formDataToSend = new FormData();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    placesToVisit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  formDataToSend.append('name', formData.name);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('location', formData.location);
  formDataToSend.append('placesToVisit', formData.placesToVisit);
  formDataToSend.append('picturePath', file);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:9000/destinations', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: formDataToSend
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add destination');
      }
      return response.json();
    })
    .then(data => {
      console.log('Destination added successfully:', data);
      // Reset form fields
      setFormData({
        name: '',
        description: '',
        location: '',
        picturePath: '',
        placesToVisit: ''
      });
      console.log(formData)
    })
    .catch(error => {
      console.error('Error adding destination:', error);
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Add Destination</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data' className="flex flex-col gap-4">
        <label className="flex flex-col">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md" required />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded-md" required />
        </label>
        <label className="flex flex-col">
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="border p-2 rounded-md" required />
        </label>
        <label className="flex flex-col">
          Picture Path:
          <input type="file" name="picturePath" value={formData.picturePath} onChange={handleFileChange} className="border p-2 rounded-md" required />
        </label>
        <label className="flex flex-col">
          Places to Visit:
          <input type="text" name="placesToVisit" value={formData.placesToVisit} onChange={handleChange} className="border p-2 rounded-md" />
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddDestinationForm;