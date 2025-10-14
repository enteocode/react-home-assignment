React Home Assignment
=====================

[![Build Status](https://github.com/enteocode/react-home-assignment/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/enteocode/react-home-assignment/actions/workflows/ci.yml)

This project demonstrates a responsive file hashing application built with **React**, designed to keep the UI 
interactive even during heavy computation. It was originally done for a home assignment challenge, then extended and 
refined for public demonstration and continuous integration testing.


### Requirements

- **Node.js LTS** (version **22.x**) for development
- **Docker** to run dev-server

### Instructions

- The **UI must remain responsive** while the file hash is being calculated.
  To demonstrate this, add a **“File Description”** text box where the user can enter a short description of the file (
  maximum **500 characters**).

- Once the hash computation is complete, display the following information:
    - **Hash** (colored **green**)
    - **File name**
    - **File size**
    - **Description** (entered by the user)

- Display **error messages in blue**, and allow the user to **retry the hash computation** if it fails.

### Bonus Tasks

* Display **progress** during hash computation

## Development

To start the development environment using Docker, copy `.env.example`
as `.env` and run:

```bash
docker-compose up
```

This will launch the development container with all necessary dependencies.
The server will be listening on [http://localhost:8080][D].

## Production

To build the optimized production bundle locally, ensure you have **Node.js LTS (version 22)** installed and run:

```bash
npm i
npm run build
```

The optimized, ready-to-deploy files will be generated in the `dist` directory.

**Important!**

In production, the use of **HTTPS** is essential to work with the [File API][F] needed
to read local files for digest calculations.

---

### License

[MIT][L] © 2025, Ádám Székely


[D]: http://localhost:8080
[F]: https://developer.mozilla.org/en-US/docs/Web/API/File_API
[L]: ./LICENSE
