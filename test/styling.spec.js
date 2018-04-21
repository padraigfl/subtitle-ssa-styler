/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var styler = require('../src/styling');

describe('style', function() {
  it('works with default', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: Default0,1,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&HFFFFFF33,2,24,0,0,1\n';

    expect(styler()).to.equal(result);
  });
  it('reverts to defaults when passed invalid objects', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: Default0,1,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&HFFFFFF33,2,24,0,0,1\n';
    expect(styler({})).to.equal(result);
  });
  it('handles multiple entries via array argument', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: Default0,1,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&HFFFFFF33,2,24,0,0,1\n' +
      'Style: Default1,1,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&HFFFFFF33,2,24,0,0,1\n' +
      'Style: Default2,1,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&HFFFFFF33,2,24,0,0,1\n';
    expect(styler([{}, {}, {}])).to.equal(result);
  });
  it('handles correctly specified style objects', function() {
    var result = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
      'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: whiteTextBlackOverlay0,3,0,0,0,30,30,10,Tahoma,&H000000FF,&H000000FF,&H000000FF,&HFFFFFFFF,2,24,0,0,1\n' +
      'Style: blackTextWhiteOutline1,1,0,0,0,30,30,10,Tahoma,&H000000FF,&H000000FF,&H000000FF,&HFFFFFFFF,2,24,0,0,1\n';
    expect(styler([
      {
        name: 'whiteTextBlackOverlay',
        fontsize: 24,
        color: 'rgb(0,0,0)',
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
});
