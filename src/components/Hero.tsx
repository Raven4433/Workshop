import { Wrench, Star, Shield, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Wrench className="w-4 h-4" />
            Professzionális Műhely Berendezések
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Kiváló Állapotú
            <span className="block text-blue-400">Műhely Gépek</span>
            Eladók
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professzionális használt műhely berendezések széles választéka. Esztergák, szalagfűrészek, 
            gyalugépek és eszközkészletek kiváló áron, megbízható minőségben.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kiváló Minőség</h3>
              <p className="text-gray-600 text-sm">Minden gép gondosan karbantartott és működőképes állapotban.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Megbízható Forrás</h3>
              <p className="text-gray-600 text-sm">Professzionális műhelyből származó, eredeti dokumentumokkal.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Szakértő Támogatás</h3>
              <p className="text-gray-600 text-sm">Részletes információk és tanácsadás minden termékhez.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
