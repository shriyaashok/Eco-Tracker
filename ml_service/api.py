"""FastAPI stub for ML microservice
TODO: implement /predict and /avatar endpoints that the backend can call for suggestions and clustering
"""
from fastapi import FastAPI

app = FastAPI()


@app.get('/predict')
async def predict():
    # TODO: accept features and return predicted impact or labels
    return {"message": "predict stub"}


@app.get('/avatar')
async def avatar():
    # TODO: return user cluster/label or avatar recommendation
    return {"message": "avatar stub"}
