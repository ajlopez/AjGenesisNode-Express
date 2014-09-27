# AjGenesisNode Express

AjGenesisNode Express tasks and templates, to generate web sites using Express. WIP.

## Setup

Install [Node.js](http://nodejs.org).

Install latests version of AjGenesis for Node and Express modules as global modules:
```
npm install ajgenesis -g
npm install ajgenesisnode-express -g
```
In Linux, you should use `sudo npm ...` to install global modules

## Quick start

In any working directory, create an application
```
ajgenesis express:create demo
cd demo
npm install
```

The created directory contains the seed of an Express 4.x application.

And there is a subdirectory `ajgenesis` with:

- `ajgenesis/models`: where the free model files reside
- `ajgenesis/tasks`: tasks to run
- `ajgenesis/templates`: templates to be used
- `ajgenesis/libs`: additional modules used by tasks

Install additional ajgenesis modules:
```
ajgenesis install entity
ajgenesis install model
```
The modules code and templates are installed under `ajgenesis/modules` folder.

Let add some entities and propeties:
```
ajgenesis entity:add customer
ajgenesis entity:addproperty customer name
ajgenesis entity:addproperty customer address
ajgenesis entity:add supplier
ajgenesis entity:addproperty supplier name
ajgenesis entity:addproperty supplier address
```

`.json` files are added to `ajgenesis/models` folder. You can edit those file manually, instead
of relaying in auxiliary `entity` module.

Generate the web site:

```
ajgenesis generate
```

The web site is generated in the current directory.

The site use MongoDB. Install it from [here](http://www.mongodb.org/).

Start the site
```
npm start
```

The site is available in your browser using `http://localhost:3000`.

## Development

```
npm install -g ajgenesis
git clone git://github.com/ajlopez/AjGenesisNode-Express.git
cd AjGenesisNode-Express
npm link ajgenesis
npm install
npm test
```

## Versions

- 0.0.1: Published
- 0.0.2: Published. Use of local `entity` module. Models in `ajgenesis/models`
- 0.0.3: Published. Use the current directory as Express application instead of `build`
- 0.0.4: Published. Generate code for Express 4.x

## References

Useful articles to use in development:

- [How to change bower's default components folder?](http://stackoverflow.com/questions/14079833/how-to-change-bowers-default-components-folder)
- [Express.js routing for bower components](http://stackoverflow.com/questions/18333310/express-js-routing-for-bower-components)
- [Using bootstrap with bower](http://stackoverflow.com/questions/14450408/using-bootstrap-with-bower)
- [Bower](https://github.com/bower/bower)

## Contribution

Feel free to [file issues](https://github.com/ajlopez/AjGenesisNode-Express) and submit
[pull requests](https://github.com/ajlopez/AjGenesisNode-Express/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.
