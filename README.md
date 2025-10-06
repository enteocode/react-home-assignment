![ReversingLabs](./resources/reversing-labs.logo.png)

# ReversingLabs Home Assignment

## Requirements

- **Node.js LTS** (version **22.x**)

## Instructions

- The **UI must remain responsive** while the file hash is being calculated.
  To demonstrate this, add a **“File Description”** text box where the user can enter a short description of the file (
  maximum **500 characters**).

- Once the hash computation is complete, display the following information:
    - **Hash** (colored **green**)
    - **File name**
    - **File size**
    - **Description** (entered by the user)

- Display **error messages in blue**, and allow the user to **retry the hash computation** if it fails.

## Bonus Tasks

* Display **progress** during hash computation
* Add **tests** to verify the functionality

## Development

To start the development environment using Docker, copy `.env.example`
as `.env` and run:

```bash
docker-compose up
```

This will launch the development container with all necessary dependencies.

## Production

To build the optimized production bundle locally, ensure you have **Node.js LTS (version 22)** installed and run:

```bash
npm install
npm run build
```

The optimized, ready-to-deploy files will be generated in the `dist` directory.
