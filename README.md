# Satr - Session Storage API

[Satr](https://isurfer21.github.io/satr/htdocs/index.html) is a generic REST API for session storage. It is a ready-made solution for session management in your project.

## Prerequisite

You should have these applications installed at your system.

- [node.js](https://nodejs.org/)
- `npm` (usually it comes along with `node.js`)

Along with the DB you want to use behind the scene

- [VxDB](https://github.com/isurfer21/vxdb)
- [BBolt API](https://github.com/hooksie1/bbolt-api)
- [SkyTable.js](https://github.com/isurfer21/skytable.js)

## Setup

You can install it at your system via npm

    npm install satr-api

## Compatibility

It is targetted to be compatible with KV Stores like Badger, BoltDB & SkyTable.

| Database | Dependency  | Status |
|----------|-------------|--------|
| Badger   | VxDB        | ✓      |
| BoltDB   | BBolt API   | ✓      |
| SkyTable | SkyTable.js | ✗      |

## Resources

- [OpenAPI Specification](https://isurfer21.github.io/satr/htdocs/satr.oas3.html)
- [Swagger](https://isurfer21.github.io/satr/htdocs/satr.swagger.yaml)
- [Postman Collection](https://isurfer21.github.io/satr/htdocs/satr.postman_collection.json)
