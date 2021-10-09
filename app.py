import asyncio

from aiohttp import web
import aiohttp_cors
from aiohttp.web_response import Response, json_response
from aiohttp_cors import CorsViewMixin
from aiohttp.web import View
import sqlite3


API_PREFIX = '/api'


class CorsFixedResource(View, CorsViewMixin):
    pass


class LoginResource(CorsFixedResource):
    async def post(self) -> Response:
        print("Received Login request")
        print("Yuval and Or are here 1!!!!!!")
        data = await self.request.json()
        print("Yuval and Or are here 2!!!!!!")
        try:
            password = data['password']
            email = data['email']

            conn = sqlite3.connect('/home/ubuntu/dirot/rest_server/database.db')
            query = f"SELECT * FROM users WHERE password = '{password}' AND  email = '{email}'"
            print(f"login: {query}")
            results = conn.execute(query)
            raw_results = results.fetchall()
        except Exception as e:
            print(str(e))
            return Response(
                f"login process failed: {str(e)}",
                status=500,
            )

        if not raw_results:
            return json_response(data=dict(success=False, data="no"), status=200)

        return json_response(data=dict(success=True, data="yes"), status=200)


class RegisterResource(CorsFixedResource):
    async def post(self) -> Response:
        print("Received Register request")
        data = await self.request.json()

        try:
            first_name = data['first_name']
            last_name = data['last_name']
            password = data['password']
            email = data['email']

            if not password or not email:
                return json_response(
                    data=dict(success=False, reason="Email and password is required"),
                    status=200,
                )

            conn = sqlite3.connect('/home/ubuntu/dirot/rest_server/database.db')
            query = f"INSERT INTO users (first_name, last_name, password, email) VALUES ('{first_name}', '{last_name}', '{password}', '{email}')"
            print(f"login: {query}")
            conn.execute(query)
            conn.commit()
        except Exception as e:
            print(str(e))
            return json_response(
                data=dict(success=False, reason=f"User creation failed: {str(e)}"),
                status=200,
            )

        return json_response(
            data=dict(success=True),
            status=200)


class OnlineResource(CorsFixedResource):
    async def get(self) -> Response:
        print("Received IsOnline request")
        return json_response(data=dict(success=True), status=200)

    async def post(self) -> Response:
        print("Received IsOnline request")
        return json_response(data=dict(success=True), status=200)



def attach_resources(cors, app) -> None:
    cors.add(app.router.add_route('GET', f'{API_PREFIX}/', OnlineResource))

    cors.add(app.router.add_route('*', f'{API_PREFIX}/login', LoginResource))
    cors.add(app.router.add_route('*', f'{API_PREFIX}/register', RegisterResource))

def initalize_cors(app):
    cors = aiohttp_cors.setup(app, defaults={
        '*': aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers='*',
            allow_methods='*',
            allow_headers='*',
        ),
    })
    attach_resources(cors, app)


async def get_app():
    app = web.Application()
    initalize_cors(app)
    return app


def main():
    loop = asyncio.get_event_loop()
    app = loop.run_until_complete(get_app())
    web.run_app(app, host='0.0.0.0', port=5000,
                access_log_format='%a %t "%r" %s %b "%{Referer}i"')


async def get_app():
    app = web.Application()
    initalize_cors(app)
    return app


def main():
    loop = asyncio.get_event_loop()
    app = loop.run_until_complete(get_app())

    print('Starting the rest server.')
    web.run_app(app, host='localhost', port=5000)


if __name__ == '__main__':
    # conn = sqlite3.connect('/home/ubuntu/dirot/rest_server/database.db')
    # print("Opened database successfully")
    # # conn.execute('DROP TABLE users')
    # conn.execute('CREATE TABLE users (first_name TEXT, last_name TEXT, email TEXT, password TEXT)')
    # print("Table created successfully")
    # conn.close()
    main()
