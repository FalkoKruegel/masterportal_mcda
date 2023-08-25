# Build build image
FROM node:16.16.0 as build

WORKDIR /app

COPY . .

RUN npm install

RUN node devtools/tasks/build_portal.mjs

# Build runtime image
FROM python:3.10-slim

WORKDIR /masterportal

COPY ./server/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY --from=build /app/dist ./app

COPY ./server .

EXPOSE 5005

CMD ["python3", "main.py"]