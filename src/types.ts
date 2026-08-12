export type Category = 'Горячее' | 'Салаты' | 'Паста' | 'Супы' | 'Десерты';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  checked?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  category: Category;
  time: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  calories: string;
  portions: number;
  image: string;
  ingredients: Ingredient[];
  steps: string[];
  serving: {
    temp: string;
    garnish: string;
    pairing: string;
  };
}
