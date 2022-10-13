# React x NestJS x Passport.js

Example is an app with frontend (React) and backend (NestJS) with authorisation via OIDC.

## Installation
Prerequisites:
- [Docker](https://www.docker.com/) with [Compose](https://docs.docker.com/compose/)
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
Backend application have integration to external user provider. Locally it's [Authelia](https://www.authelia.com/) which is statically configured to serve users from YAML file. List of users is available in file `docker/oidc_provider/users.yml`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
