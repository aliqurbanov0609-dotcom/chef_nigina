import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { MainScreen } from './components/MainScreen';
import { RecipeScreen } from './components/RecipeScreen';
import { BottomNav } from './components/BottomNav';
import { useFavorites, useShoppingList } from './hooks';
import { RECIPES } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<'splash' | 'app'>('splash');
  const [activeTab, setActiveTab] = useState<'recipes' | 'home' | 'favorites'>('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const { favorites, toggleFavorite } = useFavorites();
  const { shoppingList, toggleShoppingItem } = useShoppingList();

  const selectedRecipe = selectedRecipeId ? RECIPES.find(r => r.id === selectedRecipeId) : null;

  return (
    <div className="w-full min-h-screen bg-[#FFF6ED] flex justify-center items-center font-sans text-gray-800 selection:bg-soft-purple/30">
      <div className="w-full max-w-md min-h-screen bg-app-gradient relative overflow-x-hidden shadow-2xl flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {currentView === 'splash' ? (
            <SplashScreen key="splash" onEnter={() => setCurrentView('app')} />
          ) : (
            <div key="app" className="relative w-full min-h-screen flex flex-col">
              {/* Ambient Decor Fixed Behind Everything */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-br from-[#FFF6ED] to-[#FFCFE1] rounded-full blur-[70px] opacity-70"></div>
                <div className="absolute top-[35%] -right-16 w-60 h-60 bg-gradient-to-br from-[#D9EEFF] to-[#CDB8FF] rounded-full blur-[80px] opacity-60"></div>
                <div className="absolute -bottom-20 -left-12 w-64 h-64 bg-gradient-to-tr from-[#D8F5E8] to-[#FFF6ED] rounded-full blur-[70px] opacity-70"></div>
              </div>
              
              {/* Main Content View with padding for bottom nav */}
              <div className="relative z-10 w-full flex-1 pb-28">
                <MainScreen 
                  onLogout={() => setCurrentView('splash')} 
                  onRecipeClick={(id) => setSelectedRecipeId(id)}
                  activeTab={activeTab}
                  onChangeTab={setActiveTab}
                  favorites={favorites}
                />
              </div>
              
              {/* Recipe Details Modal/View */}
              <AnimatePresence>
                {selectedRecipe && (
                  <RecipeScreen
                    key="recipe"
                    recipe={selectedRecipe}
                    onBack={() => setSelectedRecipeId(null)}
                    isFavorite={favorites.has(selectedRecipe.id)}
                    onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
                    shoppingList={shoppingList}
                    onToggleShoppingItem={toggleShoppingItem}
                  />
                )}
              </AnimatePresence>

              {/* Fixed Bottom Navigation */}
              {!selectedRecipeId && (
                <BottomNav 
                  activeTab={activeTab} 
                  onChange={setActiveTab} 
                  cartCount={shoppingList.size}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
