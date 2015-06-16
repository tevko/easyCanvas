
easyCanvas
----------

[![buld status](https://travis-ci.org/tevko/easyCanvas.svg?branch=master)](https://travis-ci.org/tevko/easyCanvas)

##What is it?

A zero dependency JavaScript library to make working with the Canvas element easier - 1.3k minified + gzip

##Why?
 
Working with canvas can be tough. easyCanvas simplifies that by exposing simple methods that enable a wide array of features, eliminating many of the headaches that come when working with the canvas element. Great for automation or those just starting out with the canvas element.

##How to use

Just drop easyCanvas.min.js in your template, declare a canvas element, give it a class, and then call the function!

    var test = Object.create(easyCanvas);
    test.init('.test', '2d').setBG('orange');

##Features
 - Set width, height, and color
 - Draw rectangles
 - Click to draw
 - Draw Images
 - Manipulate Event Listeners
 - Clear shapes and lines
 - Save and restore current state
 - Easy function chaining syntax
 - State is stored in an object
 - Much more on its way!

##Developer Guidlines

Git clone, npm install, run gulp, and that's pretty much it. Make sure your tests pass, and if gulp is failing it's probably cause eslint found a problem with your code.
