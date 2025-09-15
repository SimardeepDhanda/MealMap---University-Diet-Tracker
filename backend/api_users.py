from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from database import SessionLocal
from models import User, UserPreferences, Favorite, IntakeTracking, Meal
from schemas import UserPreferencesSchema, FavoriteSchema, IntakeTrackingSchema, MealSchema

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# User Preferences
@router.get("/users/{user_id}/preferences", response_model=UserPreferencesSchema)
def get_preferences(user_id: int, db: Session = Depends(get_db)):
    prefs = db.query(UserPreferences).filter(UserPreferences.user_id == user_id).first()
    if not prefs:
        raise HTTPException(status_code=404, detail="Preferences not found")
    return prefs

@router.post("/users/{user_id}/preferences", response_model=UserPreferencesSchema)
def set_preferences(user_id: int, prefs: UserPreferencesSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    existing = db.query(UserPreferences).filter(UserPreferences.user_id == user_id).first()
    if existing:
        for k, v in prefs.dict(exclude_unset=True).items():
            setattr(existing, k, v)
    else:
        existing = UserPreferences(user_id=user_id, **prefs.dict())
        db.add(existing)
    db.commit()
    db.refresh(existing)
    return existing

# Favorites
@router.get("/users/{user_id}/favorites", response_model=List[MealSchema])
def get_favorites(user_id: int, db: Session = Depends(get_db)):
    favs = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    meals = [db.query(Meal).filter(Meal.id == fav.meal_id).first() for fav in favs]
    return meals

@router.post("/users/{user_id}/favorites", response_model=FavoriteSchema)
def add_favorite(user_id: int, fav: FavoriteSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    meal = db.query(Meal).filter(Meal.id == fav.meal_id).first()
    if not user or not meal:
        raise HTTPException(status_code=404, detail="User or meal not found")
    existing = db.query(Favorite).filter(Favorite.user_id == user_id, Favorite.meal_id == fav.meal_id).first()
    if existing:
        return existing
    new_fav = Favorite(user_id=user_id, meal_id=fav.meal_id, date_favorited=fav.date_favorited)
    db.add(new_fav)
    db.commit()
    db.refresh(new_fav)
    return new_fav

@router.delete("/users/{user_id}/favorites/{meal_id}")
def remove_favorite(user_id: int, meal_id: int, db: Session = Depends(get_db)):
    fav = db.query(Favorite).filter(Favorite.user_id == user_id, Favorite.meal_id == meal_id).first()
    if not fav:
        raise HTTPException(status_code=404, detail="Favorite not found")
    db.delete(fav)
    db.commit()
    return {"detail": "Favorite removed"}

# Intake Tracking
@router.get("/users/{user_id}/intake", response_model=List[IntakeTrackingSchema])
def get_intake(user_id: int, date: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(IntakeTracking).filter(IntakeTracking.user_id == user_id)
    if date:
        query = query.filter(IntakeTracking.date == date)
    return query.all()

@router.post("/users/{user_id}/intake", response_model=IntakeTrackingSchema)
def add_intake(user_id: int, intake: IntakeTrackingSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    meal = db.query(Meal).filter(Meal.id == intake.meal_id).first()
    if not user or not meal:
        raise HTTPException(status_code=404, detail="User or meal not found")
    new_intake = IntakeTracking(user_id=user_id, meal_id=intake.meal_id, date=intake.date)
    db.add(new_intake)
    db.commit()
    db.refresh(new_intake)
    return new_intake 