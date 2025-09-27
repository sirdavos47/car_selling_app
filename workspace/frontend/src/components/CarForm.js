import React, { useState } from 'react';
import API from '../api';


function CarForm({ onCarAdded }) {
  const [form, setForm] = useState({
    title: '', description: '', price: '', year: '', brand: '', model: '', mileage: '', location: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => data.append(key, val));
      if (image) data.append('image', image);
      await API.post('/cars', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm({ title: '', description: '', price: '', year: '', brand: '', model: '', mileage: '', location: '' });
      setImage(null);
      setError('');
      if (onCarAdded) onCarAdded();
    } catch (err) {
      setError('İlan eklenemedi! Giriş yapmış olmalısınız.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Yeni İlan Ekle</h3>
      <input name="title" placeholder="Başlık" value={form.title} onChange={handleChange} required />
      <input name="price" placeholder="Fiyat" value={form.price} onChange={handleChange} required type="number" />
      <input name="year" placeholder="Yıl" value={form.year} onChange={handleChange} />
      <input name="brand" placeholder="Marka" value={form.brand} onChange={handleChange} />
      <input name="model" placeholder="Model" value={form.model} onChange={handleChange} />
      <input name="mileage" placeholder="Kilometre" value={form.mileage} onChange={handleChange} />
      <input name="location" placeholder="Konum" value={form.location} onChange={handleChange} />
      <textarea name="description" placeholder="Açıklama" value={form.description} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImage} />
      <button type="submit">Ekle</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </form>
  );
}

export default CarForm;
