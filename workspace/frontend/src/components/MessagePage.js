import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function MessagePage() {
  const { carId } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [receiver, setReceiver] = useState('');
  const [car, setCar] = useState(null);
  const [token] = useState(localStorage.getItem('token'));

  useEffect(() => {
    API.get(`/cars/${carId}`).then(res => setCar(res.data));
    API.get(`/messages/${carId}`).then(res => setMessages(res.data));
  }, [carId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    let recv = receiver;
    if (!recv && car && car.seller) recv = car.seller._id;
    await API.post(`/messages/${carId}`, { content, receiver: recv });
    setContent('');
    setReceiver('');
    API.get(`/messages/${carId}`).then(res => setMessages(res.data));
  };

  return (
    <div>
      <h2>Mesajlar</h2>
      <ul>
        {messages.map(msg => (
          <li key={msg._id}><b>{msg.sender.name}:</b> {msg.content}</li>
        ))}
      </ul>
      {token ? (
        <form onSubmit={sendMessage}>
          <input type="text" placeholder="Mesajınız" value={content} onChange={e => setContent(e.target.value)} required />
          <button type="submit">Gönder</button>
        </form>
      ) : (
        <p>Mesaj göndermek için giriş yapmalısınız.</p>
      )}
    </div>
  );
}

export default MessagePage;
