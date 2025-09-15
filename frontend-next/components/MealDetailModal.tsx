'use client';

import { useState } from 'react';

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

interface MealDetailModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MealDetailModal({ meal, isOpen, onClose }: MealDetailModalProps) {
  if (!isOpen || !meal) return null;

  const getActiveAllergens = (allergens: Allergen | undefined) => {
    if (!allergens) return [];
    return Object.entries(allergens)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()));
  };

  const activeAllergens = getActiveAllergens(meal.allergens);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{meal.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Location & Time</h3>
              <p className="text-gray-600">{meal.station || 'Not specified'}</p>
              <p className="text-gray-600">{meal.serving_time || 'Not specified'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Date Available</h3>
              <p className="text-gray-600">{meal.date_available || 'Not specified'}</p>
              {meal.price && (
                <p className="text-gray-600">Price: ${meal.price}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          {meal.tags && meal.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Dietary Tags</h3>
              <div className="flex flex-wrap gap-2">
                {meal.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition */}
          {meal.nutrients && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {meal.nutrients.calories && (
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{meal.nutrients.calories}</div>
                    <div className="text-sm text-green-700">Calories</div>
                  </div>
                )}
                {meal.nutrients.protein && (
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{meal.nutrients.protein}g</div>
                    <div className="text-sm text-blue-700">Protein</div>
                  </div>
                )}
                {meal.nutrients.carbs && (
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{meal.nutrients.carbs}g</div>
                    <div className="text-sm text-yellow-700">Carbs</div>
                  </div>
                )}
                {meal.nutrients.fat && (
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{meal.nutrients.fat}g</div>
                    <div className="text-sm text-red-700">Fat</div>
                  </div>
                )}
              </div>
              
              {/* Additional nutrients */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {meal.nutrients.sodium && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold text-gray-700">{meal.nutrients.sodium}mg</div>
                    <div className="text-sm text-gray-600">Sodium</div>
                  </div>
                )}
                {meal.nutrients.sugar && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold text-gray-700">{meal.nutrients.sugar}g</div>
                    <div className="text-sm text-gray-600">Sugar</div>
                  </div>
                )}
                {meal.nutrients.fiber && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold text-gray-700">{meal.nutrients.fiber}g</div>
                    <div className="text-sm text-gray-600">Fiber</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Allergens */}
          {meal.allergens && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Allergen Information</h3>
              {activeAllergens.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-red-600 font-medium">⚠️ Contains:</p>
                  <div className="flex flex-wrap gap-2">
                    {activeAllergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-green-600 font-medium">✅ No major allergens detected</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
