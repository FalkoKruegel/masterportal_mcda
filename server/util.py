import hashlib
import os
from datetime import datetime, timedelta
from typing import Any, Literal

import jwt

from fastapi import HTTPException, status

import config

def get_hashed_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed_password: str) -> bool:
    return get_hashed_password(password) == hashed_password

def create_access_token(subject: Any) -> str:
    expires_delta = datetime.utcnow() + timedelta(seconds=config.ACCESS_TOKEN_EXPIRE_SECONDS)
    to_encode = {"exp": expires_delta, "sub": subject}
    encoded_jwt = jwt.encode(to_encode, config.JWT_SECRET_KEY, config.ALGORITHM)
    return encoded_jwt

def create_refresh_token(subject: Any) -> str:
    expires_delta = datetime.utcnow() + timedelta(seconds=config.REFRESH_TOKEN_EXPIRE_SECONDS)
    to_encode = {"exp": expires_delta, "sub": subject}
    encoded_jwt = jwt.encode(to_encode, config.JWT_REFRESH_SECRET_KEY, config.ALGORITHM)
    return encoded_jwt

def decode_token(token: str, token_type: Literal["access", "refresh"] = "access") -> Any:
    try:
        match token_type:
            case "access":
                payload = jwt.decode(token, config.JWT_SECRET_KEY, algorithms=[config.ALGORITHM])
            case "refresh":
                payload = jwt.decode(token, config.JWT_REFRESH_SECRET_KEY, algorithms=[config.ALGORITHM])
    except:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate token", headers={"WWW-Authenticate": "Bearer"})
    if datetime.fromtimestamp(payload["exp"]) < datetime.now():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired", headers={"WWW-Authenticate": "Bearer"})
    return payload["sub"]
