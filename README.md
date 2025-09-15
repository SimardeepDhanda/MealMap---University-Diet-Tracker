# McMaster Diet Plan - University Diet Tracker

A comprehensive web application designed to help McMaster University students plan their daily campus meals. The application pulls daily menu data from McMaster Nutrition Services, takes user goals and budget into account, and generates personalized meal plans.

## 🚀 Features

- **Meal Planning**: Personalized meal recommendations based on dietary preferences and budget
- **Nutrition Tracking**: Comprehensive nutrition information for all menu items
- **Allergen Information**: Detailed allergen information for food safety
- **Multiple Frontend Options**: React, Angular, and Next.js implementations
- **User Preferences**: Customizable dietary restrictions and nutrition goals
- **Budget Management**: Track spending and stay within budget limits

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM)
- **PostgreSQL**: Primary database (with SQLite fallback)
- **Alembic**: Database migration tool

### Frontend Options
1. **React** (`/frontend`) - Traditional React application
2. **Angular** (`/frontend-angular`) - Angular application with Tailwind CSS
3. **Next.js** (`/frontend-next`) - Next.js application with TypeScript

## 📁 Project Structure

```
mcmasterdietplan/
├── backend/                 # Python FastAPI backend
│   ├── api_*.py            # API endpoints
│   ├── models.py           # Database models
│   ├── database.py         # Database configuration
│   ├── schemas.py          # Pydantic schemas
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
├── frontend-angular/       # Angular frontend
├── frontend-next/          # Next.js frontend
└── README.md
```

## 🛠️ Installation & Setup

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**:
   ```bash
   alembic upgrade head
   ```

5. **Start the server**:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

#### React Frontend
```bash
cd frontend
npm install
npm start
```

#### Angular Frontend
```bash
cd frontend-angular
npm install
ng serve
```

#### Next.js Frontend
```bash
cd frontend-next
npm install
npm run dev
```

## 🗄️ Database Models

- **Meal**: Menu items with nutrition information
- **Nutrient**: Detailed nutrition data (calories, protein, carbs, etc.)
- **Allergen**: Allergen information (gluten, dairy, nuts, etc.)
- **User**: User accounts and preferences
- **UserPreferences**: Dietary restrictions and nutrition goals
- **Favorite**: User's favorite meals
- **IntakeTracking**: Meal consumption tracking

## 🔧 API Endpoints

- `GET /meals` - Get all meals
- `GET /meals/{id}` - Get specific meal details
- `POST /users` - Create user account
- `GET /users/{id}/preferences` - Get user preferences
- `POST /users/{id}/preferences` - Update user preferences
- `POST /favorites` - Add meal to favorites
- `GET /favorites/{user_id}` - Get user's favorite meals

## 🎯 Key Features

### Meal Planning
- Personalized recommendations based on dietary preferences
- Budget-conscious meal suggestions
- Nutrition goal tracking

### Allergen Safety
- Comprehensive allergen information
- Filter meals by allergen restrictions
- Safety warnings for sensitive users

### User Experience
- Multiple frontend options to choose from
- Responsive design for all devices
- Intuitive meal browsing and selection

## 🚀 Deployment

The application can be deployed using various methods:

- **Backend**: Deploy to services like Heroku, Railway, or AWS
- **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
- **Database**: Use PostgreSQL on services like Supabase, AWS RDS, or Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Simardeep Dhanda**
- GitHub: [@SimardeepDhanda](https://github.com/SimardeepDhanda)

## 🙏 Acknowledgments

- McMaster University Nutrition Services for providing menu data
- The open-source community for the amazing tools and libraries used
