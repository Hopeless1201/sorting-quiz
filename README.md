# Hogwarts Sorting Hat Quiz

An interactive web application that predicts a user's Hogwarts house using a machine learning model built with Python and scikit-learn, served via a Flask backend, and visualized through a modern React frontend with animations and sound effects.

## Project Structure

```
sorting-quiz/
├── backend/
│   ├── app.py                     # Flask API service
│   ├── sorting_hat_model (4).pkl  # Pre-trained ML classification model
│   ├── feature_encoders (1).pkl   # Encoded question features
│   └── target_encoder (1).pkl    # House target label encoder
├── frontend/
│   ├── src/                       # React components & UI logic
│   ├── public/                    # Audio and visual assets
│   ├── package.json
│   └── vite.config.js
└── model/
    ├── model_code.txt             # Model training script
    └── testing and validation.txt  # Model evaluation and metrics
```

## Getting Started

### 1. Backend Setup (Flask)

Ensure you have Python installed, then install the required dependencies:

```bash
cd backend
pip install flask flask-cors joblib numpy pandas scikit-learn
python app.py
```

The Flask server will start on `http://127.0.0.1:5000`.

### 2. Frontend Setup (React + Vite)

In another terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173` to take the quiz.
