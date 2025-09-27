import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    API.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  if (!car) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h2>{car.title}</h2>
      {car.image && <img src={car.image} alt="car" style={{width:300, height:200, objectFit:'cover'}} />}
      <p>{car.description}</p>
      <p>Fiyat: {car.price}₺</p>
      <p>Yıl: {car.year}</p>
      <p>Marka: {car.brand}</p>
      <p>Model: {car.model}</p>
      <p>Kilometre: {car.mileage}</p>
      <p>Konum: {car.location}</p>
      <Link to={`/messages/${car._id}`}>Satıcıya Mesaj Gönder</Link>
    </div>
  );
}

export default CarDetail;
