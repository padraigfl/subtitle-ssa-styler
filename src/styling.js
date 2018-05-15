'use strict';
var hex = require('rgba-convert').hex;

var styleFormat = [
  'Name',
  'BorderStyle', // e.g. 1
  'Shadow', // eg 0 (binary?)
  'AlphaLevel', // 0
  'Encoding', // 0
  'MarginL', // eg 30
  'MarginR', // eg 30
  'MarginV', // eg. 10
  'Fontname', // e.g. Tahoma
  'PrimaryColour', // e.g. 16777215
  'SecondaryColour',
  'TertiaryColour',
  'BackColour',
  'Alignment', // eg 2
  'Fontsize', // int e.g. 24
  'Bold', // binary 1/0
  'Italic', // binary 1/0
  'Outline', // binary 1/0
];

// TODO, switch to other color scheme
function getSsaColor (rgbaColor) {
  if(!rgbaColor) {
    rgbaColor = '';
  }
  var convertedRgba = hex(rgbaColor).toUpperCase().replace('#', '');
  if(convertedRgba.length<5) {
    convertedRgba = convertedRgba.split('').reduce(function(acc, char) {
      return acc + char + char;
    }, '');
  }
  if(convertedRgba.length === 6){
    convertedRgba = convertedRgba + 'FF';
  }
  return '&H'+convertedRgba;
}

function processColor (value, defaults) {
  return getSsaColor(typeof value === 'string' ? value : defaults);
}

function getFont (fontStr) {
  switch (fontStr.toLowerCase()) {
    case 'times new roman':
      return 'Times New Roman';
    default:
      return 'Tahoma';
  }
}

function getInteger(value, defaults){
  return Number.isInteger(value) ? value : defaults;
}

function getAlignment(alignAttr) {
  if (alignAttr) {
    return 6;
  }
  return 2;
}

function getBorderStyle(outline, background) {
  if (background) {
    return 3;
  } else if (outline) {
    return 1;
  }
  return 0;
}

function getOutlineOrBackColor(outline, background, defaultColor) {
  if(background) {
    return processColor(background.color, defaultColor);
  } else if (outline) {
    return processColor(outline.color, defaultColor);
  }
}

function buildStyle (stylesArray) {
  var defaults = {
    name: 'Default',
    font: 'Tahoma',
    fontsize: 24,
    color: 'rgba(0, 0, 0, 0.99)',
    bold: false,
    italic: false,
    marginH: 30,
    marginV: 10,
  };
  if(!stylesArray) {
    stylesArray = [ defaults ];
  }

  var styles = stylesArray.map(function(styleObj, idx) {

    var obj = Object.assign({}, defaults, styleObj);

    var color = processColor(obj.color, defaults.color);
    var marginH = getInteger(obj.marginH, defaults.marginH);
    var name;

    if (idx === 0) {
      name = 'primary';
    } else if (idx === 1) {
      name = 'secondary';
    } else {
      name = obj.name + idx;
    }
  
    var valid = {
      Name: name,
      BorderStyle: getBorderStyle(obj.outline, obj.background),
      Shadow: 0,
      AlphaLevel: 0,
      Encoding: 0,
      MarginL: marginH,
      MarginR: marginH,
      MarginV: getInteger(obj.marginV, defaults.marginV),
      Fontname: getFont( typeof obj.font === 'string' ? obj.font : defaults.font),
      PrimaryColour: color,
      SecondaryColour: color,
      TertiaryColour: color,
      BackColour: (obj.outline || obj.background) ?
        getOutlineOrBackColor(obj.outline, obj.background, defaults.outlineColor) : processColor(),
      Alignment: getAlignment(obj.topAlign),
      Fontsize: getInteger(obj.fontsize, defaults.fontsize),
      Bold: obj.bold ? 1 : 0,
      Italic: obj.italic ? 1 : 0,
      Outline: (obj.outline || obj.background) ? 1 : 0,
    };
  
    var style = styleFormat.reduce(function (acc, val, i) {
      return acc + valid[val] + ((i !== styleFormat.length - 1) ? ',': '');
    }, '');
  
    return 'Style: ' + style;
  });

  return styles.reduce(function(acc, style) {
    return acc + style + '\n';
  }, '');
}

function getFormat () {
  return 'Format: ' + styleFormat.reduce( function (acc, val) {
    return acc + ',' + val;
  });
}

function buildStyleSection(styles) {
  if (!Array.isArray(styles) && typeof styles === 'object') {
    styles = [styles];
  } else if (!!styles && typeof styles !== 'object') {
    throw TypeError('invalid argument type');
  }
  return '[V4 Styles]\n' +
    getFormat() + '\n' +
    buildStyle(styles);
}

module.exports = buildStyleSection;
