import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart, Clock, Users, ChefHat, Check, ShoppingCart, Play, Thermometer, Wine } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeScreenProps {
  recipe: Recipe;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  shoppingList: Set<string>;
  onToggleShoppingItem: (id: string) => void;
}

export function RecipeScreen({ 
  recipe, 
  onBack, 
  isFavorite, 
  onToggleFavorite,
  shoppingList,
  onToggleShoppingItem 
}: RecipeScreenProps) {
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTimer = () => {
    const minutesMatch = recipe.time.match(/(\d+)/);
    if (minutesMatch) {
      setTimeLeft(parseInt(minutesMatch[1]) * 60);
      setTimerActive(true);
    }
  };

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-[#FFF6ED] bg-app-gradient z-40 overflow-y-auto pb-28 max-w-md mx-auto w-full box-border"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
    >
      {/* Top Nav Header */}
      <div className="sticky top-0 px-4 py-3 flex justify-between items-center z-20 backdrop-blur-xl bg-white/80 border-b border-white/60 shadow-2xs">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm border border-purple-50 active:scale-90 transition-transform"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="font-extrabold text-sm text-[#4B2A5E]">Детали рецепта</h2>
        <button 
          onClick={onToggleFavorite} 
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-purple-50 active:scale-90 transition-transform"
        >
          <Heart size={18} className={isFavorite ? "text-[#FF90B3] fill-[#FF90B3]" : "text-gray-400"} />
        </button>
      </div>

      <div className="px-4 py-4 w-full box-border">
        {/* Hero Food Visual */}
        <div className="w-full h-52 sm:h-56 rounded-[28px] bg-gradient-to-br from-white to-[#F3E8FF] flex items-center justify-center text-7xl sm:text-8xl shadow-md border-2 border-white/80 mb-5 relative">
          <motion.span
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.1 }}
          >
            {recipe.image}
          </motion.span>
        </div>

        {/* Recipe Title */}
        <h1 className="text-xl sm:text-2xl font-black text-[#4B2A5E] mb-4 leading-tight">{recipe.title}</h1>
        
        {/* Meta Badge Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 w-full">
          <div className="p-3 bg-white rounded-2xl flex flex-col items-center justify-center shadow-xs border border-white">
            <Clock size={18} className="text-[#8B5CF6] mb-1" />
            <span className="text-[11px] font-black text-gray-700">{recipe.time}</span>
          </div>
          <div className="p-3 bg-white rounded-2xl flex flex-col items-center justify-center shadow-xs border border-white">
            <Users size={18} className="text-[#FF9800] mb-1" />
            <span className="text-[11px] font-black text-gray-700">{recipe.portions} порц.</span>
          </div>
          <div className="p-3 bg-white rounded-2xl flex flex-col items-center justify-center shadow-xs border border-white">
            <ChefHat size={18} className="text-[#EC4899] mb-1" />
            <span className="text-[11px] font-black text-gray-700">{recipe.difficulty}</span>
          </div>
        </div>

        {/* Start Cooking Timer Button */}
        <button 
          onClick={timerActive ? () => setTimerActive(false) : startTimer}
          className={`w-full rounded-2xl py-3.5 px-4 font-black text-sm mb-6 flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
            timerActive 
              ? 'bg-[#FF90B3] text-white shadow-pink-200' 
              : 'bg-[#8B5CF6] text-white shadow-purple-200 hover:bg-[#7C3AED]'
          }`}
        >
          {timerActive ? (
            <span className="font-mono text-base">{formatTime(timeLeft)} — Нажмите для паузы</span>
          ) : (
            <>
              <Play size={16} fill="currentColor" /> Начать готовить ⏱️
            </>
          )}
        </button>

        {/* Ingredients Checklist Section */}
        <div className="mb-6 w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-black text-[#4B2A5E]">Ингредиенты</h3>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-[#8B5CF6] bg-purple-100/70 px-2.5 py-1 rounded-full">
              <ShoppingCart size={12} /> Нажмите чтобы отменить
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            {recipe.ingredients.map(ing => {
              const checked = shoppingList.has(ing.id);
              return (
                <div 
                  key={ing.id} 
                  onClick={() => onToggleShoppingItem(ing.id)}
                  className={`p-3.5 bg-white rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
                    checked ? 'opacity-50 border-gray-200 bg-gray-50' : 'border-purple-50/60 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      checked ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white' : 'border-gray-300'
                    }`}>
                      {checked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-xs font-extrabold text-gray-700 ${checked ? 'line-through' : ''}`}>
                      {ing.name}
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#8B5CF6]">{ing.amount}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-6 w-full">
          <h3 className="text-base font-black text-[#4B2A5E] mb-3">Способ приготовления</h3>
          <div className="flex flex-col gap-3 w-full">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3 w-full">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#FFDCC8] to-[#FFCFE1] flex items-center justify-center text-[#4B2A5E] font-black text-xs shadow-xs border border-white">
                  {idx + 1}
                </div>
                <div className="p-3.5 bg-white rounded-2xl flex-1 border border-purple-50/60 shadow-xs">
                  <p className="text-xs font-bold text-gray-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Serving Details Card */}
        <div className="mb-4 w-full">
          <h3 className="text-base font-black text-[#4B2A5E] mb-3">Подача</h3>
          <div className="p-4 bg-white/90 backdrop-blur rounded-2xl shadow-xs border border-white flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FFF6ED] rounded-xl text-[#FF9800]"><Thermometer size={16} /></div>
              <div>
                <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">Температура</p>
                <p className="text-xs font-bold text-gray-800">{recipe.serving.temp}</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D8F5E8] rounded-xl text-[#4CAF50]"><ChefHat size={16} /></div>
              <div>
                <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">Украшение</p>
                <p className="text-xs font-bold text-gray-800">{recipe.serving.garnish}</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F3E8FF] rounded-xl text-[#8B5CF6]"><Wine size={16} /></div>
              <div>
                <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">Рекомендуем</p>
                <p className="text-xs font-bold text-gray-800">{recipe.serving.pairing}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
