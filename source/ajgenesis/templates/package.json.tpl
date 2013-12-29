{
  "name": "${project.name}",
  "version": "${project.version}",
  "private": true,
  "scripts": {
    "start": "node app.js",
    "test": "simpleunit test"
  },
  "dependencies": {
    "express": "3.4.7",
    "ejs": "0.8.5",
    "ejs-locals": "1.0.2",
    "mongodb": "1.3.23"
  },
  "devDependencies": {
    "simpleunit": "0.0.2"
  }
}