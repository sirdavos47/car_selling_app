import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import CarForm from './CarForm';

function CarList() {
  const [cars, setCars] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [showMine, setShowMine] = useState(false);
  const [token] = useState(localStorage.getItem('token'));
  const [filter, setFilter] = useState({ brand: '', model: '', min: '', max: '' });

  const fetchCars = () => {
    API.get('/cars').then(res => {
      let all = res.data;
      if (filter.brand) all = all.filter(car => car.brand && car.brand.toLowerCase().includes(filter.brand.toLowerCase()));
      if (filter.model) all = all.filter(car => car.model && car.model.toLowerCase().includes(filter.model.toLowerCase()));
      if (filter.min) all = all.filter(car => car.price >= Number(filter.min));
      if (filter.max) all = all.filter(car => car.price <= Number(filter.max));
      setCars(all);
      if (token) {
        const userId = JSON.parse(atob(token.split('.')[1])).userId;
        setMyCars(all.filter(car => car.seller && car.seller._id === userId));
      }
    });
  };

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line
  }, [filter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
    await API.delete(`/cars/${id}`);
    fetchCars();
  };

  return (
    <div>
      <h2>Araba İlanları</h2>
      {token && <CarForm onCarAdded={fetchCars} />}
      <button onClick={() => setShowMine(!showMine)}>{showMine ? 'Tüm İlanlar' : 'Sadece Benim İlanlarım'}</button>
      <div style={{margin:'16px 0'}}>
        <input placeholder="Marka" value={filter.brand} onChange={e => setFilter(f => ({...f, brand: e.target.value}))} />
        <input placeholder="Model" value={filter.model} onChange={e => setFilter(f => ({...f, model: e.target.value}))} />
        <input placeholder="Min Fiyat" type="number" value={filter.min} onChange={e => setFilter(f => ({...f, min: e.target.value}))} style={{width:90}} />
        <input placeholder="Max Fiyat" type="number" value={filter.max} onChange={e => setFilter(f => ({...f, max: e.target.value}))} style={{width:90}} />
        <button onClick={fetchCars}>Filtrele</button>
      </div>
      <ul>
        {(showMine ? myCars : cars).map(car => (
          <li key={car._id}>
            <Link to={`/cars/${car._id}`}>{car.title} - {car.price}₺</Link>
            {token && myCars.find(c => c._id === car._id) && (
              <button onClick={() => handleDelete(car._id)} style={{marginLeft:8}}>Sil</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
