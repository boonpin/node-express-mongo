## NODE ExpressJs with Mongo

Framework base for build the API Service with Express + Mongo


### Installation

1. npm install
2. npm run seed
3. npm run dev


### Folder Structure

    app
        controllers - Http Controllers
        errors - Error Type Obeject
        middleware - Http Middleware
        models - Data Model (Mongo)
        routes - Http Routes

    config - services config (TODO)
    script - setup or console scripts
    storage
        logs - log files
        temp - temporary folder


### TODO

1. env file for manage the database url
2. proper error handling
3. proper log handling
4. console scripts
5. environment setup
    - auto create needed directories
