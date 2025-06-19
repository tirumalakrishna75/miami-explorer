import { useEffect, useState } from 'react';

export default function App() {
  const [places, setPlaces]       = useState([]);
  const [detailsMap, setDetails]  = useState({});
  const [selected, setSelected]   = useState(null);

  // 1. Load the list of places
  useEffect(() => {
    fetch('/mustVisit.json')
      .then(r => r.json())
      .then(setPlaces)
      .catch(console.error);
  }, []);

  // 2. Load the details mapping
  useEffect(() => {
    fetch('/placeDetails.json')
      .then(r => r.json())
      .then(setDetails)
      .catch(console.error);
  }, []);

  // 3. If a place is selected, render its detail view
  if (selected) {
    const items = detailsMap[selected] || [];
    return (
      <div className="p-8">
        <button
          onClick={() => setSelected(null)}
          className="mb-6 px-4 py-2 bg-gray-200 rounded"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-4">{selected}</h1>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="border p-3 rounded">
              <span className="font-semibold">{item.category}:</span> {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 4. Otherwise, render the grid of 10 places
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Must-Visit Miami Spots</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(place.title)}
            className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={place.img}
              alt={place.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-medium">{place.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
