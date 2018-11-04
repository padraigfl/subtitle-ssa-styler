import { hex } from 'rgba-convert';

interface SsaStylesObj {
  Name?: string;
  BorderStyle?: number;
  Shadow?: number;
  AlphaLevel?: number;
  Encoding?: number;
  MarginL?: number;
  MarginR?: number;
  MarginV?: number;
  Fontname?: string;
  PrimaryColour?: string;
  SecondaryColour?: string;
  TertiaryColour?: string;
  BackColour?: string;
  Alignment: 2|6;
  Fontsize?: number;
  Bold?: 0|1;
  Italic?: 0|1;
  Outline?: 0|1;
  [key: string]: any;
}

interface ColorObj {
  color: string;
}

interface ConfigStylesObj {
  name?: string;
  font?: string;
  fontsize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  marginH?: number;
  marginV?: number;
  topAlign?: boolean;
  outline?: ColorObj;
  background?: ColorObj;
}

const styleFormat = [
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
const getSsaColor = (rgbaColor = ''): string => {
  let convertedRgba = hex(rgbaColor).toUpperCase().replace('#', '');
  if (convertedRgba.length < 5) {
    convertedRgba = convertedRgba.split('').reduce((acc, char) => acc + char + char, '');
  }
  if (convertedRgba.length === 6) {
    convertedRgba = convertedRgba + 'FF';
  }
  return '&H' + convertedRgba;
};

const processColor = (value: string|undefined, defaults?: string): string => (
  getSsaColor(typeof value === 'string' ? value : defaults)
);

const getFont = (fontStr = 'Tahoma'): string => {
  switch (fontStr.toLowerCase()) {
    case 'times new roman':
      return 'Times New Roman';
    default:
      return fontStr;
  }
};

const getInteger = (value = 0) => (
  Number.isInteger(value) ? value : Math.floor(value)
);

const getAlignment = (alignAttr?: boolean): (2|6) => {
  if (alignAttr) {
    return 6;
  }
  return 2;
};

const getBorderStyle = ({ background, outline}: ConfigStylesObj): number => {
  if (background) {
    return 3;
  } else if (outline) {
    return 1;
  }
  return 0;
};

const getOutlineOrBackColor = (outline?: ColorObj, background?: ColorObj): string => {
  if (background && background.color) {
    return processColor(background.color);
  } else if (outline && outline.color) {
    return processColor(outline.color);
  }
  return processColor('rgba(0, 0, 0, 0)');
};

const buildStyle = (stylesArray: ConfigStylesObj[]): string => {
  const defaults: ConfigStylesObj = {
    name: 'Default',
    font: 'Tahoma',
    fontsize: 24,
    color: 'rgba(0, 0, 0, 0.99)',
    bold: false,
    italic: false,
    marginH: 30,
    marginV: 10,
  };

  if (!stylesArray) {
    stylesArray = [ defaults ];
  }

  const styles = stylesArray.map((styleObj: ConfigStylesObj, idx: number) => {

    const obj: ConfigStylesObj = Object.assign({}, defaults, styleObj);

    const color = processColor(obj.color || defaults.color);
    const marginH = getInteger(obj.marginH || defaults.marginH);
    let name;

    if (idx === 0) {
      name = 'primary';
    } else if (idx === 1) {
      name = 'secondary';
    } else {
      name = (obj.name || 'Failed') + idx;
    }

    const valid: SsaStylesObj = {
      Name: name,
      BorderStyle: getBorderStyle(obj),
      Shadow: 0,
      AlphaLevel: 0,
      Encoding: 0,
      MarginL: marginH,
      MarginR: marginH,
      MarginV: getInteger(obj.marginV || defaults.marginV),
      Fontname: getFont(obj.font || defaults.font),
      PrimaryColour: color,
      SecondaryColour: color,
      TertiaryColour: color,
      BackColour: (obj.outline || obj.background) ?
        getOutlineOrBackColor(obj.outline, obj.background) : '&H000000FF',
      Alignment: getAlignment(obj.topAlign),
      Fontsize: getInteger(obj.fontsize || defaults.fontsize),
      Bold: obj.bold ? 1 : 0,
      Italic: obj.italic ? 1 : 0,
      Outline: (obj.outline || obj.background) ? 1 : 0,
    };

    const style = styleFormat.reduce((acc, val, i) => (
      acc + valid[val] + ((i !== styleFormat.length - 1) ? ',' : '')
    ), '');

    return 'Style: ' + style;
  });

  return styles.reduce((acc, style) => acc + style + '\n', '');
};

const getFormat = (): string => 'Format: ' + styleFormat.reduce((acc, val) => acc + ',' + val);

const buildStyleSection = (styles: ConfigStylesObj|ConfigStylesObj[]) => {
  if (!Array.isArray(styles) && typeof styles === 'object') {
    styles = [styles];
  } else if (!!styles && typeof styles !== 'object') {
    throw TypeError('invalid argument type');
  }
  return '[V4 Styles]\n' +
    getFormat() + '\n' +
    buildStyle(styles);
};

module.exports = buildStyleSection;
