interface BottomNavProps {
  activeTab: 'recipes' | 'home' | 'favorites';
  onChange: (tab: 'recipes' | 'home' | 'favorites') => void;
  cartCount?: number;
}

export function BottomNav({ activeTab, onChange, cartCount = 0 }: BottomNavProps) {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 max-w-md mx-auto px-4 w-full box-border pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-2xl rounded-[32px] p-2 border border-white/90 shadow-[0_16px_35px_rgba(107,77,171,0.25)] flex items-center justify-between gap-1.5 w-full box-border">
        
        {/* RECIPES BUTTON */}
        <button 
          onClick={() => onChange('recipes')}
          className={`flex-1 py-2.5 px-2 rounded-[22px] bg-gradient-to-b from-[#CDB8FF] to-[#BFA7FF] flex items-center justify-center text-white transition-all active:scale-95 border border-white/80 ${
            activeTab === 'recipes' 
              ? 'ring-2 ring-[#8B5CF6]/50 opacity-100 shadow-sm' 
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span className="text-[9.5px] font-black tracking-wider uppercase drop-shadow-xs">РЕЦЕПТЫ</span>
        </button>

        {/* MAIN BRAND LE BUFFET BUTTON */}
        <button 
          onClick={() => onChange('home')}
          className={`flex-1 py-3 px-2 rounded-[24px] bg-gradient-to-b from-[#A78BFA] to-[#8B5CF6] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(139,92,246,0.4)] transition-all active:scale-95 border-2 border-white -mt-5 ${
            activeTab === 'home' 
              ? 'ring-2 ring-purple-300 opacity-100 scale-102' 
              : 'opacity-90 hover:opacity-100'
          }`}
        >
          <span className="text-[10.5px] font-black tracking-[0.15em] drop-shadow-xs">LE BUFFET</span>
        </button>

        {/* FAVORITES BUTTON */}
        <button 
          onClick={() => onChange('favorites')}
          className={`flex-1 py-2.5 px-2 rounded-[22px] bg-gradient-to-b from-[#CDB8FF] to-[#BFA7FF] flex items-center justify-center text-white transition-all active:scale-95 border border-white/80 relative ${
            activeTab === 'favorites' 
              ? 'ring-2 ring-[#8B5CF6]/50 opacity-100 shadow-sm' 
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span className="text-[9.5px] font-black tracking-wider uppercase drop-shadow-xs">ФАВОРИТЫ</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1 bg-[#FF90B3] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-xs z-10">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
