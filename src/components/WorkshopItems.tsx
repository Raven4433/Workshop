import { useState } from 'react';
import { ChevronDown, ChevronUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

interface WorkshopItem {
  elnevezes: string;
  rovid_info: string;
  darabszam: number;
  ar_ft: number;
  kepek: string[];
  reszletes_leiras: string[];
}

interface WorkshopItemsProps {
  items: WorkshopItem[];
}

// Image mapping - maps original paths to our downloaded images
const imageMapping: Record<string, string> = {
  // Hyundai Lathe
  'data/images/02 Eszterga/01.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  'data/images/02 Eszterga/02.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  'data/images/02 Eszterga/03.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  'data/images/02 Eszterga/04.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  'data/images/02 Eszterga/05.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  'data/images/02 Eszterga/06.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  'data/images/02 Eszterga/07.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  'data/images/02 Eszterga/08.jpg': '/images/eszterga-hyundai-hyd500.jpg',
  
  // Lathe knife sets
  'data/images/02 Eszterga/Esztergakesek/00.jpg': '/images/eszterga-kes-keszlet.jpg',
  'data/images/02 Eszterga/Esztergakesek/01.jpg': '/images/eszterga-kes-keszlet.jpg',
  'data/images/02 Eszterga/Esztergakesek/02.jpg': '/images/eszterga-kes-keszlet.jpg',
  'data/images/02 Eszterga/Esztergakesek/03.jpg': '/images/eszterga-kes-keszlet.jpg',
  'data/images/02 Eszterga/Esztergakesek/04.jpg': '/images/eszterga-kes-keszlet.jpg',
  
  // BASA1 Band Saw
  'data/images/01 Faipari/01 - BASA1/01.jpg': '/images/szalagfuresz-scheppach-basa1.jpg',
  'data/images/01 Faipari/01 - BASA1/02.jpg': '/images/szalagfuresz-scheppach-basa1.jpg',
  'data/images/01 Faipari/01 - BASA1/03.jpg': '/images/szalagfuresz-scheppach-basa1.jpg',
  'data/images/01 Faipari/01 - BASA1/04.jpg': '/images/szalagfuresz-scheppach-basa1.jpg',
  'data/images/01 Faipari/01 - BASA1/05.jpg': '/images/szalagfuresz-scheppach-basa1.jpg',
  
  // BASA3 Band Saw
  'data/images/01 Faipari/02 - BASA3/01.jpg': '/images/szalagfuresz-scheppach-basa3.jpg',
  'data/images/01 Faipari/02 - BASA3/02.jpg': '/images/szalagfuresz-scheppach-basa3.jpg',
  'data/images/01 Faipari/02 - BASA3/03.jpg': '/images/szalagfuresz-scheppach-basa3.jpg',
  'data/images/01 Faipari/02 - BASA3/04.jpg': '/images/szalagfuresz-scheppach-basa3.jpg',
  'data/images/01 Faipari/02 - BASA3/05.jpg': '/images/szalagfuresz-scheppach-basa3.jpg',
  'data/images/01 Faipari/02 - BASA3/06.jpg': '/images/szalagfuresz-scheppach-basa3.jpg',
  'data/images/01 Faipari/02 - BASA3/07.jpg': '/images/szalagfuresz-scheppach-basa3.jpg',
  
  // HMS1070 Planer
  'data/images/01 Faipari/03 - HMS 1070/01.jpg': '/images/gyalugep-scheppach-hms1070.jpg',
  'data/images/01 Faipari/03 - HMS 1070/02.jpg': '/images/gyalugep-scheppach-hms1070.jpg',
  'data/images/01 Faipari/03 - HMS 1070/03.jpg': '/images/gyalugep-scheppach-hms1070.jpg',
  'data/images/01 Faipari/03 - HMS 1070/04.jpg': '/images/gyalugep-scheppach-hms1070.jpg',
  
  // SD1600V Scroll Saw
  'data/images/01 Faipari/04 - SD 1600/01.jpg': '/images/dekopirf-scheppach-sd1600v.jpg',
  'data/images/01 Faipari/04 - SD 1600/02.jpg': '/images/dekopirf-scheppach-sd1600v.jpg',
  'data/images/01 Faipari/04 - SD 1600/03.jpg': '/images/dekopirf-scheppach-sd1600v.jpg',
  'data/images/01 Faipari/04 - SD 1600/04.jpg': '/images/dekopirf-scheppach-sd1600v.jpg',
  'data/images/01 Faipari/04 - SD 1600/05.jpg': '/images/dekopirf-scheppach-sd1600v.jpg',
  
  // Router bit sets
  'data/images/01 Faipari/05 - Felsomaro kesek/00.jpg': '/images/felsomaro-kes-keszlet.jpg',
  'data/images/01 Faipari/05 - Felsomaro kesek/01.jpg': '/images/felsomaro-kes-keszlet.jpg',
  'data/images/01 Faipari/05 - Felsomaro kesek/02.jpg': '/images/felsomaro-kes-keszlet.jpg',
  
  // Metal cutting band saw
  'data/images/03 Szalagfuresz/01.jpg': '/images/femvago-szalagfuresz.jpg',
  'data/images/03 Szalagfuresz/02.jpg': '/images/femvago-szalagfuresz.jpg',
  
  // Work tables
  'data/images/04 Vasasztalok/01.jpg': '/images/kerekes-vasasztal.jpg',
  'data/images/04 Vasasztalok/02.jpg': '/images/kerekes-vasasztal.jpg',
  'data/images/04 Vasasztalok/03.jpg': '/images/kerekes-vasasztal.jpg',
  'data/images/04 Vasasztalok/04.jpg': '/images/kerekes-vasasztal.jpg',
  'data/images/04 Vasasztalok/05.jpg': '/images/kerekes-vasasztal.jpg',
  
  // Storage rack
  'data/images/05 Vasallvanyok/T1/01.jpg': '/images/vas-taroloallvany.jpg',
  'data/images/05 Vasallvanyok/T1/02.jpg': '/images/vas-taroloallvany.jpg',
  'data/images/05 Vasallvanyok/T1/03.jpg': '/images/vas-taroloallvany.jpg',
};

const WorkshopItems = ({ items }: WorkshopItemsProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
  }>({ isOpen: false, images: [], currentIndex: 0 });

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const openLightbox = (images: string[], startIndex: number) => {
    const mappedImages = images.map(img => imageMapping[img] || img);
    setLightboxData({ isOpen: true, images: mappedImages, currentIndex: startIndex });
  };

  const closeLightbox = () => {
    setLightboxData({ isOpen: false, images: [], currentIndex: 0 });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('hu-HU').format(price) + ' Ft';
  };

  const parseDescription = (description: string) => {
    // Handle bold text **text** -> <strong>text</strong>
    let parsed = description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle bullet points
    if (parsed.startsWith('- ')) {
      parsed = '<li>' + parsed.substring(2) + '</li>';
    }
    
    return parsed;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Elérhető Műhely Berendezések</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tekintse meg részletes leírással és képekkel ellátott termékeinket. 
          Kattintson bármelyik termékre a további információkért.
        </p>
      </div>

      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div 
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleItem(index)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.elnevezes}</h3>
                <p className="text-gray-600">{item.rovid_info}</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Darabszám: {item.darabszam} db</div>
                  <div className="text-2xl font-bold text-blue-400">{formatPrice(item.ar_ft)}</div>
                </div>
                
                <div className="flex-shrink-0">
                  {expandedItems.has(index) ? 
                    <ChevronUp className="w-6 h-6 text-gray-400" /> : 
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedItems.has(index) && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* Images */}
              {item.kepek && item.kepek.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Képek</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {item.kepek.map((image, imgIndex) => {
                      const mappedImage = imageMapping[image] || image;
                      return (
                        <div 
                          key={imgIndex}
                          className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                          onClick={() => openLightbox(item.kepek, imgIndex)}
                        >
                          <img 
                            src={mappedImage}
                            alt={`${item.elnevezes} - kép ${imgIndex + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkluZ2VuIGtlcA==';
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Részletes leírás</h4>
                <div className="prose prose-gray max-w-none">
                  <ul className="space-y-2">
                    {item.reszletes_leiras.map((desc, descIndex) => (
                      <li 
                        key={descIndex}
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: parseDescription(desc) }}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Lightbox */}
      {lightboxData.isOpen && (
        <ImageLightbox
          images={lightboxData.images}
          currentIndex={lightboxData.currentIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

export default WorkshopItems;
