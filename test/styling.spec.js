/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var styler = require('../src/styling');

describe('SSA:', function() {
  describe('style', function() {
    it('works with default json fields', function() {
      var result = '[V4 Styles]\n' +
        'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
        'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
        'Style: primary,1,0,0,0,30,30,10,Tahoma,&HFFFFFFFF,&HFFFFFFFF,&HFFFFFFFF,&H00000033,2,24,0,0,1\n' +
        'Style: secondary,3,0,0,0,30,30,10,Tahoma,&HFFFFFFFF,&HFFFFFFFF,&HFFFFFFFF,&H00000033,2,16,0,0,1\n';

      expect(styler()).to.equal(result);
    });
    it('reverts to defaults when passed junk', function() {
      var result = '[V4 Styles]\n' +
        'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
        'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
        'Style: primary,1,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&HFFFFFF33,2,24,0,0,1\n' +
        'Style: secondary,1,0,0,0,30,30,10,Tahoma,&H000000FC,&H000000FC,&H000000FC,&HFFFFFF33,2,24,0,0,1\n';
      expect(styler('wrongformat', {})).to.equal(result);
      expect(styler(3, {})).to.equal(result);
    });
  });
});
