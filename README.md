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


# Gateway Management API
This is a RESTful API built using Nest.js for managing gateways and their associated peripheral devices. It allows you to create gateways, add devices to gateways, retrieve gateway details, and remove devices from a gateway. The project includes meaningful unit tests to ensure functionality.

## Features

- **Create Gateway**: Store information about new gateways.
- **Retrieve Gateways**: Retrieve a list of all gateways with their associated devices.
- **Retrieve Specific Gateway**: Retrieve detailed information about a specific gateway.
- **Add Device**: Add a peripheral device to a gateway, with validation to ensure no more than 10 devices per gateway.
- **Remove Device**: Remove a peripheral device from a gateway.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/XMoSalahX/Managing-Gateway-Nest-Mongo.git

2. Navigate into the project directory:
    ```bash
   cd Managing-Gateway-Nest-Mongo

3. Install dependencies:
    ```bash
   npm install
    
4. Set up environment variables (e.g., for your MongoDB connection) in a .env file:
    ```env
   SWAGGER_ROUTE=api

   SERVER_PORT=3000

   SECRET_KEY=fortestcode

   BCRYPT_PASSWORD=testajsdalk

   SALT_ROUND=10

   MONGODB_URI=mongodb+srv://XMoSalahX:Mohammed123@private.hpheqtq.mongodb.net/Geteways

5. Run the development server:
    ```bash
   npm run start:dev

## API Endpoints

### **POST /gateway**
Create a new gateway with the following fields:

#### Request Body:
```json
{
  "serialNumber": "string",  // Must be unique
  "name": "string",           // Name of the gateway
  "ipv4": "string",           // Valid IPv4 address
  "devices": [                // Array of devices (maximum of 10 devices)
    {
      "uid": "number",        // Unique identifier for the device
      "vendor": "string",     // Vendor name
      "dateCreated": "Date",  // Date the device was created
      "status": "ONLINE | OFFLINE"  // Status of the device (ONLINE or OFFLINE)
    }
  ]
}
```

### **GET /gateway**
Retrieve all stored gateways with their associated devices.

### **GET /gateway/:id**
Retrieve details of a specific gateway by its ID.

### **PATCH /gateway/:id**
Add a peripheral device to a gateway. The following validation applies:
- No more than 10 devices per gateway.
- All device UIDs must be unique.

### **DELETE /gateway/devices**
Remove a device from a gateway by providing the `gatewayId` and `deviceId`.

# Architecture and Design Decisions

## Embedded Documents vs. References

In this implementation, **devices** are stored as embedded documents within the **gateway** collection rather than as references to a separate collection. This design choice was made after careful consideration of the project requirements and the context of the use case.

### Key Reasons for Using Embedded Documents:

1. **Atomicity**:
   - Using embedded documents ensures that when a gateway and its devices are updated, the entire document is updated in a single atomic operation. This is crucial for maintaining consistency when devices are tightly coupled with the gateway.

2. **Performance**:
   - Since devices are always accessed in conjunction with their parent gateway (ex: retrieving all devices for a specific gateway), embedding them directly within the gateway document eliminates the need for additional database queries to resolve references. This results in faster read operations.

3. **Simplicity**:
   - By embedding devices within the gateway, the data model is kept simple and avoids the added complexity of managing references between different collections. This simplicity is advantageous for development and maintenance.

4. **Limited Device Count**:
   - The requirement to limit the number of devices associated with each gateway to a maximum of 10 devices makes embedding a practical solution. This limit ensures that the document size remains well within MongoDB's 16MB document size limit, making the embedded approach scalable for this specific use case.

5. **No Cross-Gateway Device Association**:
   - No project requirements exist for devices to be associated with multiple gateways. Also, you don't need to update or reflect changes across multiple gateways. Given these constraints, the embedded document approach is optimal, aligning with the project's focus on isolated gateway-device relationships.


### Limitations and Considerations:

1. **Document Size Limit**:
   - MongoDB enforces a 16MB document size limit. While this is not a concern for this project due to the limited number of devices per gateway, it is a factor to consider for future scalability.

2. **Flexibility**:
   - Embedded documents are less flexible if future requirements change, such as needing to access devices independently of gateways or associating devices with multiple gateways. If such flexibility becomes necessary, a referenced model might be more appropriate.

### Conclusion:
Given the project constraints, such as a limited number of devices per gateway, no need for cross-gateway device association, and the absence of any requirements for devices to join multiple gateways, the embedded document approach is the most efficient and appropriate choice for this application. Should the project requirements evolve to require greater flexibility or scalability, a shift to a referenced model could be considered.

## Swagger Documentation
The API is documented using Swagger. After starting the development server, you can view the Swagger documentation at http://localhost:3000/api


