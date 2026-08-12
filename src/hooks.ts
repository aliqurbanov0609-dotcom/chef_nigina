import { useState, useEffect } from 'react';

export function useShoppingList() {
  const [list, setList] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setList(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return { shoppingList: list, toggleShoppingItem: toggleItem };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return { favorites, toggleFavorite };
}
