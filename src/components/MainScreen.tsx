import { motion } from 'framer-motion';
import { Search, Heart, Clock, Flame, Sparkles } from 'lucide-react';
import { RECIPES, DAILY_TIPS } from '../data';
import { useState, useMemo } from 'react';
import splashImg from '../assets/images/splash_chef_1786540704109.jpg';

interface MainScreenProps {
  onLogout: () => void;
  onRecipeClick: (id: string) => void;
  activeTab: 'recipes' | 'home' | 'favorites';
  onChangeTab: (tab: 'recipes' | 'home' | 'favorites') => void;
  favorites: Set<string>;
}

export function MainScreen({ onLogout, onRecipeClick, activeTab, onChangeTab, favorites }: MainScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dailyTip = useMemo(() => DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)], []);

  const displayedRecipes = useMemo(() => {
    let filtered = RECIPES;

    // Filter by tab
    if (activeTab === 'favorites') {
      filtered = filtered.filter(r => favorites.has(r.id));
    } else if (activeTab === 'home' && selectedCategory) {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.category.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [activeTab, favorites, selectedCategory, searchQuery]);

  return (
    <motion.div 
      className="w-full px-4 pt-4 flex flex-col box-border"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#BFA7FF]">Chef Nigina</span>
          <h2 className="text-xl font-black text-[#6B4DAB] leading-none">Le Buffet</h2>
          <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#BFA7FF] mt-0.5">BISTRO • WINE • COFFEE</span>
        </div>
        <button 
          onClick={onLogout} 
          className="bg-white px-3.5 py-1.5 rounded-full text-[10px] font-extrabold text-[#FF90B3] shadow-[0_4px_10px_rgba(255,144,179,0.15)] border border-purple-50 active:scale-95 transition-transform"
        >
          ВЫХОД
        </button>
      </div>

      {activeTab === 'home' && (
        <>
          {/* Chef Greeting Banner */}
          <div className="w-full bg-white rounded-[28px] border-2 border-[#E6E0F8] p-3 flex items-center gap-3 relative shadow-[0_12px_24px_rgba(205,184,255,0.18)] mb-4">
            <div className="w-20 h-20 flex-shrink-0 relative rounded-full overflow-hidden border-3 border-white shadow-md">
              <img 
                src={splashImg} 
                alt="Chef Nigina" 
                className="w-full h-full object-cover scale-[1.35] object-top mt-1" 
              />
            </div>
            
            <div className="flex flex-col flex-1 items-center justify-center text-center">
              <h3 className="text-[#4B2A5E] font-black text-sm leading-tight">Доброе утро, Нигина</h3>
              <p className="text-[#7D6B91] font-bold text-[10px] mt-0.5 mb-2.5">Что будем готовить сегодня?</p>
              <button 
                onClick={() => onChangeTab('recipes')}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-2 rounded-full text-[11px] font-black shadow-[0_6px_14px_rgba(139,92,246,0.35)] transition-transform active:scale-95"
              >
                Начать готовить
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full mb-4">
            <div className="w-full bg-white rounded-[20px] px-4 py-2.5 shadow-[inset_2px_2px_5px_#e2e2e2,inset_-2px_-2px_5px_#ffffff,0_4px_10px_rgba(0,0,0,0.02)] text-gray-400 text-xs flex items-center gap-2.5 border border-white">
              <Search size={16} className="text-[#BFA7FF] flex-shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Найти блюдо или ингредиент..." 
                className="bg-transparent outline-none w-full placeholder-[#CDB8FF] text-[#6B4DAB] font-bold text-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-gray-400 px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Scroll Categories */}
          <div className="w-full mb-4 overflow-hidden">
            <div className="w-full flex gap-2.5 overflow-x-auto hide-scrollbar pb-1 px-0.5 touch-pan-x whitespace-nowrap">
              {[
                { icon: '🍳', name: 'ЗАВТРАКИ', category: 'Завтраки', bg: 'bg-[#FFF6ED]', color: 'text-[#FF9800]' },
                { icon: '🍲', name: 'СУПЫ', category: 'Супы', bg: 'bg-[#FFDCC8]', color: 'text-[#FF9800]' },
                { icon: '🥗', name: 'САЛАТЫ', category: 'Салаты', bg: 'bg-[#D9EEFF]', color: 'text-[#2196F3]' },
                { icon: '🧀', name: 'ЗАКУСКИ', category: 'Холодные закуски', bg: 'bg-[#E6E6FA]', color: 'text-[#8A2BE2]' },
                { icon: '🥞', name: 'БЛИНЧИКИ', category: 'Блинчики и крепы', bg: 'bg-[#FFFACD]', color: 'text-[#DAA520]' },
                { icon: '🍖', name: 'ОСНОВНЫЕ', category: 'Основные блюда', bg: 'bg-[#D8F5E8]', color: 'text-[#4CAF50]' },
                { icon: '🍟', name: 'ГАРНИРЫ', category: 'Гарниры', bg: 'bg-[#FDF5E6]', color: 'text-[#CD853F]' },
                { icon: '🍕', name: 'ПИЦЦЫ', category: 'Пиццы и киши', bg: 'bg-[#FFE4E1]', color: 'text-[#CD5C5C]' },
                { icon: '🥪', name: 'СЭНДВИЧИ', category: 'Сэндвичи', bg: 'bg-[#F0F8FF]', color: 'text-[#4682B4]' },
                { icon: '🍝', name: 'ПАСТА', category: 'Паста', bg: 'bg-[#FFCFE1]', color: 'text-[#E91E63]' },
                { icon: '🍰', name: 'ДЕСЕРТЫ', category: 'Десерты', bg: 'bg-[#F0E68C]', color: 'text-[#6B4DAB]' },
              ].map(cat => (
                <button 
                  key={cat.name} 
                  onClick={() => setSelectedCategory(prev => prev === cat.category ? null : cat.category)}
                  className={`flex-shrink-0 w-15 h-15 ${cat.bg} rounded-2xl flex flex-col items-center justify-center shadow-sm transition-all border border-white/60 ${
                    selectedCategory === cat.category ? 'scale-105 border-2 border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20' : 'active:scale-95'
                  }`}
                >
                  <span className="text-xl leading-none">{cat.icon}</span>
                  <span className={`text-[8px] font-black mt-1 ${cat.color}`}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Chef Tip Banner */}
          <div className="w-full p-3.5 bg-[#D8F5E8] rounded-[22px] flex items-center gap-3 shadow-sm mb-5 border border-white/80">
            <Sparkles size={20} className="text-[#426E5D] flex-shrink-0" />
            <p className="text-[10px] text-[#426E5D] font-bold leading-snug">
              <span className="block uppercase tracking-wider opacity-60 text-[8px]">Daily Chef Tip</span>
              {dailyTip}
            </p>
          </div>
        </>
      )}

      {/* Recipes List Header */}
      <div className="w-full flex justify-between items-center mb-3">
        <h2 className="text-xs font-black text-[#6B4DAB] uppercase tracking-wider opacity-90">
          {activeTab === 'home' 
            ? (selectedCategory ? `Категория: ${selectedCategory}` : 'Меню Le Buffet') 
            : activeTab === 'recipes' 
            ? 'Все рецепты' 
            : 'Избранное'}
        </h2>
        <span className="text-[10px] font-extrabold text-[#BFA7FF] bg-white px-2.5 py-0.5 rounded-full border border-purple-50 shadow-2xs">
          {displayedRecipes.length} блюд
        </span>
      </div>

      {/* Recipes Grid (2 Columns Mobile First) */}
      {displayedRecipes.length === 0 ? (
        <div className="w-full bg-white rounded-3xl p-8 text-center my-4 shadow-sm border border-purple-50">
          <p className="text-3xl mb-2">🍽️</p>
          <p className="text-xs font-bold text-gray-500">Рецепты не найдены</p>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-3 text-[11px] font-black text-[#8B5CF6] underline"
            >
              Сбросить фильтр
            </button>
          )}
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 gap-3.5">
          {displayedRecipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => onRecipeClick(recipe.id)}
              className="w-full bg-white rounded-[24px] p-3 shadow-[0_10px_20px_rgba(205,184,255,0.18)] border border-white/80 relative cursor-pointer active:scale-98 transition-transform flex flex-col justify-between"
            >
              <div>
                {/* Food Image Container */}
                <div className="w-full h-24 rounded-[18px] bg-gradient-to-br from-[#FFF6ED] to-[#F3E8FF] flex items-center justify-center text-4xl mb-2.5 relative border border-white/60">
                  <span>{recipe.image}</span>
                  
                  {/* Heart Favorite Icon */}
                  {favorites.has(recipe.id) && (
                    <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#FF90B3] shadow-sm">
                      <Heart size={13} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Recipe Title */}
                <h4 className="text-[#4B2A5E] font-extrabold text-xs leading-snug line-clamp-2">
                  {recipe.title}
                </h4>
              </div>

              {/* Recipe Meta Info */}
              <div className="mt-2.5 pt-2 border-t border-purple-50/60 flex justify-between items-center text-[9px] text-[#8B5CF6] font-extrabold">
                <div className="flex items-center gap-1">
                  <Clock size={11} className="text-[#BFA7FF]" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Flame size={11} className="text-[#FF90B3]" />
                  <span>{recipe.calories.replace(' ккал', 'к')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
