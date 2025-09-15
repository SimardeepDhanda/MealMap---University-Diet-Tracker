from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Date, Time, JSON
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Meal(Base):
    __tablename__ = 'meals'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    station = Column(String)
    serving_time = Column(String)
    date_available = Column(Date)
    price = Column(Float)
    tags = Column(JSON)  # e.g., ["vegan", "halal"]
    nutrients = relationship("Nutrient", back_populates="meal", cascade="all, delete-orphan")
    allergens = relationship("Allergen", back_populates="meal", cascade="all, delete-orphan")

class Nutrient(Base):
    __tablename__ = 'nutrients'
    id = Column(Integer, primary_key=True)
    meal_id = Column(Integer, ForeignKey('meals.id'))
    calories = Column(Float)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    sodium = Column(Float)
    sugar = Column(Float)
    fiber = Column(Float)
    meal = relationship("Meal", back_populates="nutrients")

class Allergen(Base):
    __tablename__ = 'allergens'
    id = Column(Integer, primary_key=True)
    meal_id = Column(Integer, ForeignKey('meals.id'))
    peanuts = Column(Boolean)
    gluten = Column(Boolean)
    dairy = Column(Boolean)
    soy = Column(Boolean)
    egg = Column(Boolean)
    fish = Column(Boolean)
    shellfish = Column(Boolean)
    tree_nuts = Column(Boolean)
    sesame = Column(Boolean)
    meal = relationship("Meal", back_populates="allergens")

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String)
    created_at = Column(Date)
    preferences = relationship("UserPreferences", back_populates="user", uselist=False)
    favorites = relationship("Favorite", back_populates="user")
    intake = relationship("IntakeTracking", back_populates="user")

class UserPreferences(Base):
    __tablename__ = 'user_preferences'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    allergies = Column(JSON)  # e.g., ["peanuts", "gluten"]
    dietary_tags = Column(JSON)  # e.g., ["vegetarian"]
    nutrition_goals = Column(JSON)  # e.g., {"min_protein": 30, "max_sodium": 1000}
    budget_per_meal = Column(Float)
    budget_per_day = Column(Float)
    user = relationship("User", back_populates="preferences")

class Favorite(Base):
    __tablename__ = 'favorites'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    meal_id = Column(Integer, ForeignKey('meals.id'))
    date_favorited = Column(Date)
    user = relationship("User", back_populates="favorites")
    meal = relationship("Meal")

class IntakeTracking(Base):
    __tablename__ = 'intake_tracking'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    meal_id = Column(Integer, ForeignKey('meals.id'))
    date = Column(Date)
    user = relationship("User", back_populates="intake")
    meal = relationship("Meal") 