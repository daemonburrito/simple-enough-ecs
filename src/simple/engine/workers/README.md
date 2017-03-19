# Workers Package

Each JS module here can optionally be used with environments with threading APIs (e.g., WebWorkers). They are split into modules because the WebWorker API uses the "file" as the atomic unit of code to run in separate threads.

The execution model is also based on browser Workers:
* Data passed via serialized copies.
* Message-passing interface for communication.