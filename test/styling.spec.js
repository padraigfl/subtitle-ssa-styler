/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var styler = require('../dist/styling');

describe('style', function() {
  it('works with default', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: primary,0,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&H000000FF,2,24,0,0,0\n';

    expect(styler()).to.equal(result);
  });
  it('reverts to defaults when passed invalid objects', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: primary,0,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&H000000FF,2,24,0,0,0\n';
    expect(styler({})).to.equal(result);
  });
  it('handles multiple entries via array argument', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: primary,0,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&H000000FF,2,24,0,0,0\n' +
      'Style: secondary,0,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&H000000FF,2,24,0,0,0\n' +
      'Style: Default2,0,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&H000000FF,2,24,0,0,0\n';
    expect(styler([{}, {}, {}])).to.equal(result);
  });
  it('handles correctly specified style objects', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: primary,3,0,0,0,30,30,10,Tahoma,&H000000FF,&H000000FF,&H000000FF,&HFFFFFFFF,2,24,0,0,1\n' +
      'Style: secondary,1,0,0,0,30,30,10,Tahoma,&H000000FF,&H000000FF,&H000000FF,&HFFFFFFFF,2,24,0,0,1\n';
    expect(styler([
      {
        name: 'whiteTextBlackOverlay',
        fontsize: 24,
        color: 'rgba(0,0,0,1)',
        topAlign: false,
        background: {
          color: 'rgb(255,255,255)'
        },
        bold: false,
        italic: false
      },
      {
        name: 'blackTextWhiteOutline',
        fontsize: 24,
        color: 'rgb(0,0,0)',
        topAlign: false,
        outline: {
          color: 'rgb(255,255,255)'
        },
        bold: false,
        italic: false
      }
      
    ])).to.equal(result);
  });
  it('handles different font', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: primary,1,0,0,0,10,10,10,Times New Roman,&HFFFFFFFF,&HFFFFFFFF,&HFFFFFFFF,&H000000FF,6,12,1,1,1\n';
    expect(styler([
      {
        name: 'everything',
        font: 'Times New Roman',
        fontsize: 12,
        color: 'white',
        topAlign: true,
        outline: {
          color:  'rgb(0,0,0)'
        },
        bold: true,
        italic: true,
        marginH: 10
      }
    ])).to.equal(result);
  });
  it('handles no outline', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: primary,0,0,0,0,10,10,10,Times New Roman,&HFFFFFFFF,&HFFFFFFFF,&HFFFFFFFF,&H000000FF,6,12,1,1,0\n';
    expect(styler([
      {
        name: 'everything',
        font: 'Times New Roman',
        fontsize: 12,
        color: 'white',
        topAlign: true,
        bold: true,
        italic: true,
        marginH: 10
      }
    ])).to.equal(result);
  });
  it('throws error when given wrong format', function (){
    expect( 
      function() {
        styler('potato');
      }
    ).to.throw(TypeError);
  });
});
