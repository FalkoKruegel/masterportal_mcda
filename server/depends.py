from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from db import USERS
from util import decode_token

reusable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)

async def get_current_user(token: Annotated[str, Depends(reusable_oauth)]):
    subject = decode_token(token)
    if subject["name"] not in USERS:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user = USERS[subject["name"]]
    return user
