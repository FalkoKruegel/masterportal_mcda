from util import get_hashed_password

USERS = {
    "admin": {
        "email": "dvan@admin.org",
        "password": get_hashed_password("password")
    }
}
