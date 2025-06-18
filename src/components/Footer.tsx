import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Kapcsolat</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+36 30 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@muhely-gepek.hu</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Budapest, Magyarország</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Nyitvatartás</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p>Hétfő - Péntek: 8:00 - 17:00</p>
                  <p>Szombat: 9:00 - 14:00</p>
                  <p>Vasárnap: Zárva</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Szolgáltatások</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Gép értékesítés</li>
              <li>• Technikai tanácsadás</li>
              <li>• Szállítás szervezés</li>
              <li>• Gép állapot felmérés</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Információ</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professzionális műhely berendezések értékesítése több mint 10 éves tapasztalattal. 
              Minden gépünk alapos ellenőrzésen esik át értékesítés előtt.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Műhely Gépek és Eszközök. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
