'use client';

import { useEffect, useState } from 'react';
import MealDetailModal from '../../components/MealDetailModal';

interface Nutrient {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  sodium?: number;
  sugar?: number;
  fiber?: number;
}

interface Allergen {
  peanuts?: boolean;
  gluten?: boolean;
  dairy?: boolean;
  soy?: boolean;
  egg?: boolean;
  fish?: boolean;
  shellfish?: boolean;
  tree_nuts?: boolean;
  sesame?: boolean;
}

interface Meal {
  id: number;
  name: string;
  station?: string;
  serving_time?: string;
  date_available?: string;
  price?: number;
  tags?: string[];
  nutrients?: Nutrient;
  allergens?: Allergen;
}

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/meals')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch meals');
        return res.json();
      })
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  if (loading) return <div>Loading meals...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Meals</h1>
      <p className="text-gray-600 mb-6">Click on any meal to see detailed nutrition information and allergens.</p>
      
      <ul className="space-y-4">
        {meals.map((meal) => (
          <li 
            key={meal.id} 
            className="p-4 bg-white rounded shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openModal(meal)}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="text-xl font-semibold text-gray-800 mb-2">{meal.name}</div>
                <div className="text-gray-500 mb-2">{meal.station} • {meal.serving_time}</div>
                
                {/* Tags */}
                {meal.tags && meal.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {meal.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Quick nutrition preview */}
                {meal.nutrients && (
                  <div className="flex gap-4 text-sm text-gray-600">
                    {meal.nutrients.calories && (
                      <span>🔥 {meal.nutrients.calories} cal</span>
                    )}
                    {meal.nutrients.protein && (
                      <span>💪 {meal.nutrients.protein}g protein</span>
                    )}
                    {meal.nutrients.carbs && (
                      <span>🍞 {meal.nutrients.carbs}g carbs</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Click indicator */}
              <div className="text-blue-500 text-sm mt-2 md:mt-0">
                Click to view details →
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Meal Detail Modal */}
      <MealDetailModal
        meal={selectedMeal}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
} 