# AjGenesisNode Express

AjGenesisNode Express tasks and templates, to generate web sites using Express. WIP.

## Installation

Install [AjGenesis for Node](https://github.com/ajlopez/AjGenesisNode) globally using:
```
npm install -g ajgenesis
```

## Setup

Install [Node.js](http://nodejs.org).

Install globally latests version of AjGenesis for Node, and Entity module:
```
npm install ajgenesis -g
npm install ajgenesisnode-entity -g
```

## Quick start

In any directory, create an application
```
ajgenesis express:create demo
cd demo
```

The new directory has subdirectories:

- `models`: where the free model files reside.
- `ajgenesis`: additional tasks and remplates for AjGenesis.
- `site`: initial static files for a new web site.

Add some entities and propeties:

```
ajgenesis entity:add customer
ajgenesis entity:addproperty customer name
ajgenesis entity:addproperty customer address
ajgenesis entity:add supplier
ajgenesis entity:addproperty supplier name
ajgenesis entity:addproperty supplier address
```

The new .json files will be added to `models` director.

Generate the web site:

```
ajgenesis generate
```

The web site is generated in a new directory `build`.

Install the dependencies
```
cd build
npm install
```

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

- 0.0.1: WIP

## Contribution

Feel free to [file issues](https://github.com/ajlopez/AjGenesisNode-Express) and submit
[pull requests](https://github.com/ajlopez/AjGenesisNode-Express/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.
