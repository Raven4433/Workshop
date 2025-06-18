import { useState, useEffect } from 'react'
import './App.css'
import WorkshopItems from './components/WorkshopItems'
import Hero from './components/Hero'
import Footer from './components/Footer'

interface WorkshopItem {
  elnevezes: string;
  rovid_info: string;
  darabszam: number;
  ar_ft: number;
  kepek: string[];
  reszletes_leiras: string[];
}

function App() {
  const [items, setItems] = useState<WorkshopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/items.json')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Adatok betöltése...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <WorkshopItems items={items} />
      </main>
      <Footer />
    </div>
  )
}

export default App
