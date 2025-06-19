import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState('toDo');

  useEffect(() => {
    fetch('/mustVisit.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load JSON', err));
  }, []);

  if (!data) {
    return <div className="p-8"><p>Loading Must-Visit Places…</p></div>;
  }

  const tabs = [
    { key: 'toDo',     label: 'Things To Do' },
    { key: 'familiar', label: 'Familiar Spots' },
    { key: 'trivia',   label: 'Fun Trivia' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Miami Explorer</h1>

      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-8">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={
              active === key
                ? 'px-4 py-2 border-b-2 border-blue-600 font-semibold'
                : 'px-4 py-2 text-gray-600'
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data[active].map((item, idx) => (
          <div
            key={idx}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            {item.img && (
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-medium">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
