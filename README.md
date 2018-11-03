# SSA Styler

[![Build Status](https://travis-ci.org/padraigfl/subtitle-ssa-styler.svg?branch=master)](https://travis-ci.org/padraigfl/subtitle-ssa) [![Coverage Status](https://coveralls.io/repos/github/padraigfl/subtitle-ssa-styler/badge.svg?branch=master)](https://coveralls.io/github/padraigfl/subtitle-ssa?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/cb5ee9e6323c99158c20/maintainability)](https://codeclimate.com/github/padraigfl/subtitle-ssa-styler/maintainability)

1. [Introduction](#introduction)
2. [Setup](#setup)
3. [Functions](#exported-functions)
4. [Style Object](#style-object)

## Introduction

A module for generating the Style header for SSA/Aegisub/SubStation Alpha subtitle files.
Uses a limited object structure to determine styles which (hopefully) simplifies the process of including particular attributes.

## Setup

Dependencies: [https://www.npmjs.com/package/rgba-convert](rgba-convert) to handle conversion of rgb color specifications into an SSA friendly format.

- `npm run build` compiles the typescript files to JS for use in the /dist folder
- `npm run test` tests code and assesses coverage
- `npm run lint` fairly simple ES5 lint checks on both source code and test files

## Exported Functions

`buildStyleSection = (styles: ConfigStylesObj|ConfigStylesObj[]) -> String`

Converts a passed object (or array of objects into a string matching the styles section of an SSA subtitle file).

```js
  var styler = require('subtitle-ssa-styler');

  styler();
  // RETURNS
  // `
  // [V4 Styles]\n
  // Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,
  // PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline
  // Style: primary,0,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&H000000FF,2,24,0,0,0
  // `

  styler([{
    fontsize: 24,
    color: 'rgba(0,0,0,1)',
    topAlign: false,
    background: { color: 'rgb(255,255,255)' },
    bold: false,
    italic: false
  }, {
    fontsize: 24,
    color: 'rgb(0,0,0)',
    topAlign: false,
    outline: { color: 'rgb(255,255,255)' },
    bold: false,
    italic: false
  }]);
  // RETURNS
  // [V4 Styles]
  // Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname
  // PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline
  // Style: primary,3,0,0,0,30,30,10,Tahoma,&H000000FF,&H000000FF,&H000000FF,&HFFFFFFFF,2,24,0,0,1
  // Style: secondary,1,0,0,0,30,30,10,Tahoma,&H000000FF,&H000000FF,&H000000FF,&HFFFFFFFF,2,24,0,0,1
```

## Style Object

See the readme for styles within src/styles

## Contribution Notes

- I don't really expect anyone to but if they do, please flag an issue first and I'll get back within a day
- When flagging an issue, please inform me of the subtitle file which failed and what the possible causes may have been
- Ideas for extra functionality and more optimised code are very strongly encouraged!
