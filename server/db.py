import hashlib

from sqlalchemy import create_engine, Engine, MetaData, Table
from sqlalchemy.orm import Session
from sqlalchemy import select

import config

class User:
    name: str
    email: str
    group: str
    salt: str
    hash: str

    def __init__(self, name: str, email: str, group: str, salt: str, hash: str):
        self.name = name
        self.email = email
        self.group = group
        self.salt = salt
        self.hash = hash

    def get_name(self) -> str:
        return self.name

    def get_email(self) -> str:
        return self.email

    def get_group(self) -> str:
        return self.group

    def verify_password(self, password) -> bool:
        salted = ''.join([password, self.salt])
        hashed = hashlib.sha256(salted.encode()).hexdigest()
        return hashed == self.hash

ENGINE: Engine = create_engine(f"postgresql+psycopg2://{config.DATABASE_USER}:{config.DATABASE_PASSWORD}@{config.DATABASE_HOST}:5432/{config.DATABASE_DB}")
META_DATA: MetaData = MetaData()
META_DATA.reflect(bind=ENGINE)

def get_table(table_name: str) -> Table | None:
    if table_name in META_DATA.tables:
        return META_DATA.tables[table_name]
    return None

def get_user(username: str) -> User | None:
    user_table = get_table("users")
    if user_table is None:
        return None
    with Session(ENGINE) as session:
        stmt = select(user_table.c.username, user_table.c.email, user_table.c.group, user_table.c.password_salt, user_table.c.password_hash).where(user_table.c.username == username)
        rows = session.execute(stmt).fetchall()
        for row in rows:
            name = row[0]
            email = row[1]
            group = row[2]
            salt = row[3]
            hash = row[4]
            return User(name, email, group, salt, hash)
        return None

