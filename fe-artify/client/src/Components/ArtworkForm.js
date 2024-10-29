import React, { useState } from 'react';
import '../utils/Assets/CSS/ArtworkForm.css';
import '../Reusables/Footer'
import '../Reusables/Header'
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
function ArtworkForm() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    artworkName: '',
    quantity: '',
    collectionTitle: '',
    demoLink: '',
    price: '',
    currency: 'USD',
    description: '',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData, file);

  };

  return (
    
    <div>
      <Header/>
      <div className="artwork-form-container">
      <h2>Create Your Artwork Masterpiece</h2>
      <form onSubmit={handleSubmit}>
        <div className="file-upload">
          <label htmlFor="file-upload" className="file-upload-label">
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="file-input"
              accept=".png, .gif, .webp, .mp4, .mp3"
            />
            <div className="file-upload-box">
              <p>Choose a file or drag & drop it here</p>
              <p>Drop your files here. PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
            </div>
          </label>
        </div>

        <div className="form-section-group">
          <h3>Artwork Information</h3>
          <div className="form-group">
            <div class="form-label">
              <label>Artwork Name*</label>
              <input
                type="text"
                name="artworkName"
                placeholder="Artwork Name"
                value={formData.artworkName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-label">
            <label>Starting Bid*</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            </div>
            </div>
            <div class="category-group">
            <label>Category*</label>
            <input
              type="text"
              name="currency"
              placeholder="Category"
              value={formData.currency}
              onChange={handleInputChange}
              required
            />
            </div>
            <div class="description-group">
          <label>Artwork Description</label>
          <textarea
            name="description"
            placeholder="Artwork Description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          ></textarea>
          </div>
        </div>

        <button type="submit" className="submit-button">Create Item</button>
      </form>
      </div>
      <Footer/>
    </div>
  );
}

export default ArtworkForm;
