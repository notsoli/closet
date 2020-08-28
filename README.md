# sam's closet

## about
sam's closet is a site i created in order to have an easy way to display my outfits, both for me and for others. it allows me to see how my sense has changed over time, and how often i wear certain items. i originally intended one of my other projects to fill this purpose (hmpg.io), but as the intentions of that site changed, i realized this would be better as its own project.

## technologies
web framework: [koa](https://github.com/koajs/koa)  
database: [MongoDB](https://github.com/mongodb/mongo)/[Mongoose](https://github.com/Automattic/mongoose)  
templating engine: [pug](https://github.com/pugjs/pug)  

## structure
data (such as images as well as the config file) is stored in a folder named 'data' at the same level as the foldler containing the source components.  

The general file structure looks like this:
```
data
| images
| | full
| | preview
| | temp
| config.yml
src
| ...
```

## configuration
configuration is stored in the config.yml file in the data directory in YAML format. 

A regular config file looks like this:
```yaml
url: "mongodb://localhost:27017/closet"
uploadPass: "password"
```
