# NestJS x Passport.js (OAuth2 & JWT)

Example API in NestJS with authorization from OAuth2 provider (Keycloak in this
case) and local authorization via JWT.

## Installation
Prerequisites:
- [Docker](https://www.docker.com/) with
  [Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) >= 16
- [Yarn v1](https://classic.yarnpkg.com/)

```shell
$ yarn install --frozen-lockfile
```

## Usage
Hit commands in terminal and enjoy working with application
```shell
$ docker compose up --detach
$ yarn dev
```

### Login to application
Backend application have integration to external user provider. Locally it's
[Keycloak](https://www.keycloak.org/) which is preconfigured with `my-app`
realm. Available users:

* `admin` with `Password1` password,
- `user` with `Password1` password.

_Notice that users are named like admin/user, but actually we don't fetch any
roles data from OAuth2 token._

### Keycloak admin console

Keycloak have admin console via WebUI available at http://localhost:8080/.
Admin account is predefined with environments in docker-compose file.

Hit `admin` with `admin` password to login to console.  

## Contributing
Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

No tests so please make sure you want to add some or check it twice manually
:wink:

## License
[MIT](https://choosealicense.com/licenses/mit/)
