# Copyright (C) 2023 Authors of the MCDA project - All Rights Reserved

from typing import Annotated, Any

from fastapi import FastAPI, status, HTTPException, Depends, Cookie
from fastapi.responses import Response, RedirectResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn

import config
from util import create_access_token, create_refresh_token, decode_token
from db import User, get_user
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
    return FileResponse("./app/main.js", headers={"Content-Type": "text/javascript"})

class Login(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    token: str

@app.post("/login")
async def login(data: Login, response: Response) -> Token:
    user = get_user(data.username)
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    if not user.verify_password(data.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    access_token = create_access_token({"name": user.get_name(), "email": user.get_email()})
    refresh_token = create_refresh_token({"name": user.get_name()})
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
    user = get_user(subject["name"])
    if user is None:
        return {
            "is_logged_in": False
        }
    return {
        "is_logged_in": True
    }

@app.get("/refresh_token")
async def refresh_token(refresh_token: Annotated[str, Cookie()], response: Response) -> Token:
    subject = decode_token(refresh_token, "refresh")
    user = get_user(subject["name"])
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    access_token = create_access_token({"name": user.get_name(), "email": user.get_email()})
    refresh_token = create_refresh_token({"name": user.get_name()})
    response.set_cookie("refresh_token", refresh_token, httponly=True, samesite="strict")
    return {
        "token": access_token
    }

app.get("/user")
async def get_me(user: Annotated[Any, Depends(get_current_user)]):
    return user

app.mount("/", StaticFiles(directory="app", html = True))

if __name__ == '__main__':
    uvicorn.run(app, host=config.API_HOST, port=config.API_PORT)
