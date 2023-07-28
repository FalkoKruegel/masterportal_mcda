# Copyright (C) 2023 Authors of the MCDA project - All Rights Reserved

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

import config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/", StaticFiles(directory="app", html = True), name="app")

if __name__ == '__main__':
    uvicorn.run(app, host=config.API_HOST, port=config.API_PORT)
