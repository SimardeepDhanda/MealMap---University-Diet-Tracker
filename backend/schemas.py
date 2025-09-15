from pydantic import BaseModel
from typing import List, Optional, Dict
import datetime

class NutrientSchema(BaseModel):
    calories: Optional[float]
    protein: Optional[float]
    carbs: Optional[float]
    fat: Optional[float]
    sodium: Optional[float]
    sugar: Optional[float]
    fiber: Optional[float]

class AllergenSchema(BaseModel):
    peanuts: Optional[bool]
    gluten: Optional[bool]
    dairy: Optional[bool]
    soy: Optional[bool]
    egg: Optional[bool]
    fish: Optional[bool]
    shellfish: Optional[bool]
    tree_nuts: Optional[bool]
    sesame: Optional[bool]

class MealSchema(BaseModel):
    id: int
    name: str
    station: Optional[str]
    serving_time: Optional[str]
    date_available: Optional[datetime.date]
    price: Optional[float]
    tags: Optional[List[str]]
    nutrients: Optional[NutrientSchema]
    allergens: Optional[AllergenSchema]

    class Config:
        from_attributes = True

class MealListResponse(BaseModel):
    meals: List[MealSchema]

class UserPreferencesSchema(BaseModel):
    allergies: Optional[List[str]]
    dietary_tags: Optional[List[str]]
    nutrition_goals: Optional[Dict[str, float]]
    budget_per_meal: Optional[float]
    budget_per_day: Optional[float]

    class Config:
        from_attributes = True

class FavoriteSchema(BaseModel):
    meal_id: int
    date_favorited: Optional[datetime.date]

    class Config:
        from_attributes = True

class IntakeTrackingSchema(BaseModel):
    meal_id: int
    date: Optional[datetime.date]

    class Config:
        from_attributes = True

class UserSchema(BaseModel):
    id: int
    email: str
    name: Optional[str]
    created_at: Optional[datetime.date]
    preferences: Optional[UserPreferencesSchema]

    class Config:
        from_attributes = True 