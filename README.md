# cubx-grunt-generate-webpackage-readme-file

[![Build Status](https://travis-ci.org/cubbles/cubx-grunt-generate-webpackage-readme-file.svg?branch=master)](https://travis-ci.org/cubbles/cubx-grunt-generate-webpackage-readme-file)

Grunt plugin for preparing and finishing the release of a webpackage

## Usage:

### Default

Install the grunt plugin 

```
npm install cubx-grunt-generate-webpackage-readme-file --save-dev
```

Gruntfile

* Load the grunt plugin
    
```    
grunt.loadNpmTasks(cubx-grunt-generate-webpackage-readme-file)
```
        
* Set config (path to webpackage to convert)
    
```        
grunt.initConfig({
   webpackagepath: ...
});
```

 
### Integrate in devtools: 
* Just install grunt plugin
  
```
npm install cubx-grunt-generate-webpackage-readme-file --save
```
