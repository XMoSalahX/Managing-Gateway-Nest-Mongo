<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Env

POSTGRES_USER=postgres

POSTGRES_PASSWORD=postgres

POSTGRES_DB=posts

POSTGRES_PORT=5432

POSTGRES_HOST=postgres

SWAGGER_ROUTE=api

SERVER_PORT=3000

SECRET_KEY=fortestcode

BCRYPT_PASSWORD=testajsdalk

SALT_ROUND=10

# Technical Notes

## Server Environment

- **Node.js version:** v20.5.1
- **NestJS version:** 10.3.2
- **TypeScript version:** 5.1.6
- **PostgreSQL version:** 16.2

## Server Extra Features

Note: All features mentioned in the requirements are included.

- The server contains a base abstract class to handle repositories with repeated operations.
- An exception handler is implemented to extract useful errors in the response.
- Logging is performed using Winston with log files created per day.
- The server handles graceful shutdown correctly.

## Business Logic

- There are three user types in the system: ADMIN, EDITOR, and Reader.
- When a user logs in, they retrieve their documents and posts if they exist.
- Admins can access all features.
- Editors can't modify admin users but can perform any update or removal operation on the entire app.
- Users can only read.

## User Scaling

As we anticipate significant growth in user numbers, it's crucial to develop and implement robust strategies for scaling our user service infrastructure effectively. One key strategy is to utilize a load balancing architecture, which ensures that incoming traffic is evenly distributed across multiple instances of our application. This prevents any single instance from becoming overloaded, optimizing the use of our resources and enhancing the resilience of our system.

Another vital technique is implementing advanced database sharding. This involves partitioning our database horizontally, spreading data across multiple database servers. By dividing our dataset into manageable shards, each server can handle a portion of the workload, reducing strain on individual nodes and improving scalability and fault tolerance.

To further optimize performance, we can leverage cutting-edge caching mechanisms. These mechanisms store frequently accessed data in high-speed caches, minimizing the need for repeated database queries and significantly reducing latency. This leads to better system responsiveness and an enhanced user experience.

In addition, adopting sophisticated horizontal scaling strategies allows us to deploy our application across multiple servers or containerized environments. This enables us to seamlessly expand our computational resources in response to growing user demands, ensuring optimal performance and scalability across various operational scenarios.

We can also integrate Content Delivery Networks (CDNs) to cache and deliver static assets to users more efficiently. By caching content closer to users, CDNs reduce latency, improve application performance, and enhance the overall quality of service delivery.

Furthermore, implementing meticulous data optimization methodologies, such as efficient indexing and query optimization techniques, helps maintain optimal data retrieval performance, even as our data volumes increase. This ensures that we uphold stringent service level agreements and provide seamless user experiences.

Finally, we can harness the power of automated scalability through sophisticated autoscaling mechanisms offered by leading cloud service providers. These mechanisms dynamically adjust computational resources based on real-time traffic patterns and workload demands, ensuring unparalleled system agility, cost optimization, and operational efficiency. This empowers us to navigate volatile market dynamics and evolving user demands seamlessly.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
