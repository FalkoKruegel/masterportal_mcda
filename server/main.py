# Copyright (C) 2023 Authors of the MCDA project - All Rights Reserved

from typing import Annotated, Any

from fastapi import FastAPI, status, HTTPException, Depends, Cookie
from fastapi.responses import Response, RedirectResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn

import config
from util import create_access_token, create_refresh_token, verify_password, decode_token
from db import USERS
from depends import get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"{config.API_HOST}:{config.API_PORT}"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/")
def root() -> RedirectResponse:
    return RedirectResponse(url="/index.html")

@app.get("/main.js")
def root() -> RedirectResponse:
    return FileResponse("./main.js", headers={"Content-Type": "text/javascript"})

class Login(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    token: str

@app.post("/login")
async def login(data: Login, response: Response) -> Token:
    if data.username not in USERS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    user = USERS[data.username]
    hashed_password = user["password"]
    if not verify_password(data.password, hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    username = data.username
    useremail = user["email"]
    access_token = create_access_token({"name": username, "email": useremail})
    refresh_token = create_refresh_token({"name": username})
    response.set_cookie("refresh_token", refresh_token, httponly=True, samesite="strict")
    return {
        "token": access_token
    }

class IsLoggedIn(BaseModel):
    is_logged_in: bool

@app.get("/is_logged_in")
async def is_logged_in(response: Response, refresh_token: Annotated[str | None, Cookie()] = None) -> IsLoggedIn:
    if refresh_token is None:
        return {
            "is_logged_in": False
        }
    try:
        subject = decode_token(refresh_token, "refresh")
    except:
        return {
            "is_logged_in": False
        }
    username = subject["name"]
    if username not in USERS:
        return {
            "is_logged_in": False
        }
    return {
        "is_logged_in": True
    }

@app.get("refresh_token")
async def refresh_token(refresh_token: Annotated[str, Cookie()], response: Response) -> Token:
    subject = decode_token(refresh_token, "refresh")
    username = subject["name"]
    if username not in USERS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username")
    user = USERS[username]
    useremail = user["email"]
    access_token = create_access_token({"name": username, "email": useremail})
    refresh_token = create_refresh_token({"name": username})
    response.set_cookie("refresh_token", refresh_token, httponly=True, samesite="strict")
    return {
        "token": access_token
    }

app.get("/user")
async def get_user(user: Annotated[Any, Depends(get_current_user)]):
    return user

app.mount("/", StaticFiles(directory="./", html = True))

if __name__ == '__main__':
    uvicorn.run(app, host=config.API_HOST, port=config.API_PORT)
