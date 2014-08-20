Building Complex JS Apps
========================

### Quick Start

```
git clone git@github.com:ryan-mahoney/Front-End-MVC.git
cd Front-End-MVC
composer install
npm install
gulp production
gulp watch
```

### Folder Structure

```
├── js/
│   ├── app/
│   │   ├── App.js
│   │   ├── Helpers.js
│   │   ├── ModuleA/
│   │   │   ├── ModuleA.js
│   │   │   ├── ModuleAController.js
│   │   │   ├── ModuleARouter.js
│   │   │   │   ├── Models/
│   │   │   │   │   ├── ModuleAModel.js
│   │   │   │   │   ├── ModuleACollection.js
│   │   │   │   ├── Views/
│   │   │   │   │   ├── ModuleAIndexView.js
│   │   │   │   │   ├── ModuleAView.js
│   │   │   │   ├── Templates/
│   │   │   │   │   ├── ModuleAIndex.hbs
│   │   │   │   │   ├── Module.hbs
│   │   │   │   ├── Helpers/
│   │   │   │   │   ├── SomeHelper.js
│   ├── vendor
│   │   ├── jquery.js
│   │   ├── handlebars.js
│   │   ├── backbone.js
│   │   ├── backbone.marionette.js
│   │   ├── etc...
├── publc/
│   ├── build/
│   │   ├── js/
│   │   │   ├── mvc-{uniq}.js
│   │   │   ├── vendor.js
```

### The Problem

Despite the availability of high quality front-end frameworks for building complex Javascript applications, often such frameworks are either not utilized, or incorporated in a sub-optimal manner. The effect of this problem is that front-ends are built with inconsistent methodologies that tend to be more error-prone and ultimately cost more to create and maintain over time. 

### The Solution

Use proven front-end technologies in a consistent manner to achieve standardization, modularization, scale and optimum maintainability.  *Backbone*, *Backbone-Marionette*, *Handlebars*, *Browserify*, *NPM* and *Gulp* have been selected as collectively they address the issues in an elegant manner.

### Individual Components

#### Backbone

[Backbone.js](http://backbonejs.org/) was selected because the file structure and MVC methodology is consistent with established development frameworks utilized in back-end and mobile development.  Backbone allows for the quick immersion of full stack developers and promotes the ability of developers to move across application layers.  Due to the widespread adoption of Backbone over the past few years, there is a healthy ecosystem of plugins and a wealth of support information provided by a thriving online community.  Backbone utilizes jQuery and Underscore.js internally.

#### Backbone.Marionette

[Marionette.js](http://marionettejs.com/) is a Backbone extension that adds more framework infrastructure to Backbone which is itself not a framework but rather a collection of useful libraries.  The advantage of Marionette is that it simplifies common use cases without obscuring its Backbone underpinnings.  Marionette has an excellent module, compositing and messaging system.  Marionette contributes to the overall consistency of the Backbone approach to building large scale applications.

#### Handlebars

Backbone by default utilizes Underscore templates.  [Handlebars.js](http://handlebarsjs.com/) is a drop-in replacement and allows for a flexible “less-logic” approach to templating while also allowing for pre-compilation of templates directly into Javascript for maximum execution speed in the browser.

#### Browserify

Javascript has long been plagued by dependency management and version incompatibilities. As dependency management problems have been identified as a key contributor to software defects, it is important to address this problem holistically. While there have been several attempts to address this problem through common-js packaging, AMD loaders and Require.js, no single solution has been universally adopted due to their complexity and tedious nature. [Browserify](http://browserify.org/) simplifies dependency management, through its automatic code containment, dependency injection, and shimming capabilities.  Browserify also integrates with NPM to allow for simplified package management.

#### NPM

[NPM](https://www.npmjs.org/) has been adopted by the Javascript community as the central package management system for both front-end and back-end Javascript packages.  Utilizing NPM allows for simpler deployments, easier project setups and better tracking and adherence to specific and tested package versions.  NPM is used by Gulp for the build environement and Browserify for the front-end environment.

#### Gulp

[Gulp](http://gulpjs.com/) is a new and flexible Javascript continuous-integration oriented build system that allows for the project to be combined into a single Javascript file, tying together Browserify and a range of code optimizations task in one quick and automated process.  In this project, Gulp is also creating a unique version number for each build.  The webserver has been tuned to use long expiration headers and gzip to ensure that the javascript build file is as small as possible and rarely gets re-downloaded unless it has actually been modified.  Since Gulp is building the JS for distribution, the underlying source files are kept outside of the webroot.

## Architectural Overview

The development folder structure is located in {project}/js/app and compiles into {project}/public/build/js/mvc-{uuid}.js where “public” is the webroot.

In the js folder, there is an App.js file that addresses dependency loading and the application's central bootstrapping.  This file will play the role of front-controller to the Javascript application. This is also the place to add front-end JS depenedencies.  In some case, a shim may need to be added in the gulpfile.js.

In the js folder, there is a sub-folder named “app”.  The app folder contains a subdirectory named for each distinct module.  Within each module folder, there is a {Name}Module.js file that contains the module's definition, as well as a {Name}Controller and {Name}Router. Marionette modules have only one controller. There are sub-folders for views, models, templates and helpers. Modules can easily be used accross projects.

Module files utilize a strict naming convention to prevent naming collisions and clarify the role of each Javascript object.  For example: FooModule.js, FooSidebarModel.js, FooSidebarView.js, etc.

#### Ramifications for Back-End Development

Projects that utilize this sort of front-end framework can create back-ends that are truly only RESTful APIs with little or no templating taking place on the server at all.  This speeds up back-end development as it becomes model-controller development only as there is no need for the creation of maintenance of server-side views.

## Requirements

To run this, you will need:

- a local web server (.htaccess included for Apache)
- PHP >= 5.4
- PHP composer
- node
- npm
- gulp

It is outside the scope of this document to describe installing these software requirements, but as they are extremely common, information on how to do so is available through simple web searchs.

## Acknowledgment

Many of the concepts for this project grew out of a recent internal Hackathon hosted by my employer [Blue State Digital](http://www.bluestatedigital.com) and guidance on using Gulp from colleague [Max Hallinan](https://github.com/maxhallinan).
