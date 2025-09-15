from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api_meals import router as meals_router
from api_users import router as users_router
from api_admin import router as admin_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meals_router)
app.include_router(users_router)
app.include_router(admin_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to MacMealMatch API!"}

# Placeholder: Add endpoints for meals, users, preferences, etc. 