import { useEffect, useState } from 'react';

export default function App() {
  //–– Data stores
  const [places, setPlaces]                   = useState([]);
  const [placeDetails, setPlaceDetails]       = useState({});
  const [restaurants, setRestaurants]         = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({});

  //–– UI state
  const [view, setView]                         = useState('home');           // 'home' | 'places' | 'restaurants'
  const [selectedPlace, setSelectedPlace]       = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantType, setRestaurantType]     = useState('Indian');        // 'Indian' | 'Multi'

  // Load JSON from public/
  useEffect(() => {
    fetch('/mustVisit.json').then(r => r.json()).then(setPlaces);
    fetch('/placeDetails.json').then(r => r.json()).then(setPlaceDetails);
    fetch('/restaurants.json').then(r => r.json()).then(setRestaurants);
    fetch('/restaurantDetails.json').then(r => r.json()).then(setRestaurantDetails);
  }, []);

  //–– 1) Place Detail View
  if (selectedPlace) {
    const items = placeDetails[selectedPlace] || [];
    return (
      <div className="p-8">
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => {
            setSelectedPlace(null);
            setView('places');
          }}
        >
          ← Back to Places
        </button>
        <h1 className="text-2xl font-bold mb-4">{selectedPlace}</h1>
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li key={i} className="border p-3 rounded">
              <strong>{it.category}:</strong> {it.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  //–– 2) Restaurant Detail View
  if (selectedRestaurant) {
    const items = restaurantDetails[selectedRestaurant] || [];
    return (
      <div className="p-8">
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => {
            setSelectedRestaurant(null);
            setView('restaurants');
          }}
        >
          ← Back to Restaurants
        </button>
        <h1 className="text-2xl font-bold mb-4">{selectedRestaurant}</h1>
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li key={i} className="border p-3 rounded">
              <strong>{it.category}:</strong> {it.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  //–– 3) Restaurants List View
  if (view === 'restaurants') {
    const list = restaurants[restaurantType] || [];
    return (
      <div className="p-8">
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => {
            setView('home');
          }}
        >
          ← Home
        </button>
        <h1 className="text-3xl font-bold mb-4">Must-Visit Restaurants</h1>
        <div className="flex space-x-4 mb-6">
          {['Indian', 'Multi'].map(type => (
            <button
              key={type}
              onClick={() => setRestaurantType(type)}
              className={
                restaurantType === type
                  ? 'px-4 py-2 border-b-2 border-blue-600 font-semibold'
                  : 'px-4 py-2 text-gray-600'
              }
            >
              Top 10 {type}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((r, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedRestaurant(r.name);
              }}
              className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={r.img}
                alt={r.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium">{r.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  //–– 4) Places List View
  if (view === 'places') {
    return (
      <div className="p-8">
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => {
            setView('home');
          }}
        >
          ← Home
        </button>
        <h1 className="text-3xl font-bold mb-6">Must-Visit Miami Spots</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((p, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedPlace(p.title);
              }}
              className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium">{p.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  //–– 5) Home View
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Miami Explorer</h1>
      <div className="flex space-x-8">
        <button
          onClick={() => setView('places')}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg shadow"
        >
          Must-Visit Places
        </button>
        <button
          onClick={() => setView('restaurants')}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg shadow"
        >
          Must-Visit Restaurants
        </button>
      </div>
    </div>
  );
}
