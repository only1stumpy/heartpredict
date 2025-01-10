from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import joblib
import pandas as pd

# Инициализация приложения
app = FastAPI()

# Настройка CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Загрузка модели
with open("./heart_disease_prediction_model.pkl", "rb") as file:
    model = joblib.load(file)

@app.post('/predict_heart_disease')
def predict(
    age: str = Form(...),
    sex: str = Form(...),
    cp: str = Form(...),
    trestbps: str = Form(...),
    chol: str = Form(...),
    fbs: str = Form(...),
    restecg: str = Form(...),
    thalach: str = Form(...),
    exang: str = Form(...),
    oldpeak: str = Form(...),
    slope: str = Form(...),
    ca: str = Form(...),
    thal: str = Form(...)
):
    # Создание DataFrame из полученных данных
    input_data = pd.DataFrame({
        'age': [int(age)],
        'sex': [int(sex)],
        'cp': [int(cp)],
        'trestbps': [int(trestbps)],
        'chol': [int(chol)],
        'fbs': [int(fbs)],
        'restecg': [int(restecg)],
        'thalach': [int(thalach)],
        'exang': [int(exang)],
        'oldpeak': [float(oldpeak)],
        'slope': [int(slope)],
        'ca': [int(ca)],
        'thal': [int(thal)]
    })


 
    print("Принятые данные:")
    print(input_data)
    print(type(model))
    try:
        # Предсказание
        prediction = model.predict(input_data)[0]
        result = "Вероятность заболевания сердца" if prediction == 1 else "Низкий риск заболевания сердца"
        return JSONResponse(content={"result": result}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"status": "error", "error_message": str(e)}, status_code=500)
