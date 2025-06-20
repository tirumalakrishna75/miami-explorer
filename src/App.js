import { useState, useEffect } from 'react';

export default function App() {
  const [section, setSection] = useState('home');
  const [places, setPlaces] = useState([]);
  const [placeDetails, setPlaceDetails] = useState({});
  const [restaurants, setRestaurants] = useState({});
  const [restDetails, setRestDetails] = useState({});
  const [selected, setSelected] = useState(null);
  const [restType, setRestType] = useState('Indian');

  useEffect(() => {
    fetch('/mustVisit.json').then(r => r.json()).then(setPlaces);
    fetch('/placeDetails.json').then(r => r.json()).then(setPlaceDetails);
    fetch('/restaurants.json').then(r => r.json()).then(setRestaurants);
    fetch('/restaurantDetails.json').then(r => r.json()).then(setRestDetails);
  }, []);

  // Home
  if (section === 'home') {
    return (
      <div className="home">
      {/* New quote line */}
      <p className="quote">
        “A place is only a backdrop until you fill it with laughter, memories, and the company of friends.”  
        <br/>— TK
      </p>
        <h1>Miami Explorer</h1>
        <div className="buttons">
          <button onClick={() => setSection('places')}>Places</button>
          <button onClick={() => setSection('restaurants')}>Restaurants</button>
        </div>
      </div>
    );
  }

  // Places Grid
  if (section === 'places') {
    return (
      <div className="container">
        <button className="backButton" onClick={() => setSection('home')}>
          ← Home
        </button>
        <h2 className="heading">Must-Visit Miami Spots</h2>
        <div className="grid">
          {places.map((p, i) => (
            <div
              key={i}
              className="card"
              onClick={() => {
                setSelected(p.title);
                setSection('placeDetail');
              }}
            >
              <img src={p.img} alt={p.title} />
              <h2>{p.title}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Place Detail
  if (section === 'placeDetail' && selected) {
    const items = placeDetails[selected] || [];
    return (
      <div className="container">
        <button className="backButton" onClick={() => setSection('places')}>
          ← Back to Places
        </button>
        <h2 className="heading">{selected}</h2>
        {items.map((it, i) => (
          <div key={i} className="listItem">
            <span>{it.category}:</span> {it.text}
          </div>
        ))}
      </div>
    );
  }

  // Restaurants Grid
  if (section === 'restaurants') {
    const list = restaurants[restType] || [];
    return (
      <div className="container">
        <button className="backButton" onClick={() => setSection('home')}>
          ← Home
        </button>
        <h2 className="heading">Must-Visit Restaurants</h2>
        <div style={{ marginBottom: '1rem' }}>
          {['Indian', 'Multi'].map(type => (
            <button
              key={type}
              onClick={() => setRestType(type)}
              style={{
                marginRight: '0.5rem',
                background: restType === type ? '#4ECDC4' : 'transparent',
                border: restType === type ? 'none' : '1px solid #4ECDC4',
                color: restType === type ? 'white' : '#4ECDC4',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Top 10 {type}
            </button>
          ))}
        </div>
        <div className="grid">
          {list.map((r, i) => (
            <div
              key={i}
              className="card"
              onClick={() => {
                setSelected(r.name);
                setSection('restDetail');
              }}
            >
              <img src={r.img} alt={r.name} />
              <h2>{r.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Restaurant Detail
  if (section === 'restDetail' && selected) {
    const items = restDetails[selected] || [];
    return (
      <div className="container">
        <button className="backButton" onClick={() => setSection('restaurants')}>
          ← Back to Restaurants
        </button>
        <h2 className="heading">{selected}</h2>
        {items.map((it, i) => (
          <div key={i} className="listItem">
            <span>{it.category}:</span> {it.text}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
