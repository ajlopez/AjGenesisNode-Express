# AjGenesisNode Express

AjGenesisNode Express tasks and templates, to generate web sites using Express. WIP.

## Installation

Install [AjGenesis for Node](https://github.com/ajlopez/AjGenesisNode) globally using:
```
npm install -g ajgenesis
```

## Usage

Creates an application and generate the web site
```
ajgenesis express:create mywebapp
cd mywebapp
ajgenesis generate
```

It will generate a `build` directory with the web site. Run the web site with:
```
cd mywebapp
npm install
node app
```

If you want to add an entity, back to project directory, and run:
```
ajgenesis entity:add customer
ajgenesis entity:addproperty customer name
ajgenesis entity:addproperty customer address
ajgenesis entity:add supplier
ajgenesis entity:addproperty supplier name
ajgenesis entity:addproperty supplier address
ajgenesis generate
```

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
