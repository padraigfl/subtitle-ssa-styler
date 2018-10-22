"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rgba_convert_1 = require("rgba-convert");
var styleFormat = [
    'Name',
    'BorderStyle',
    'Shadow',
    'AlphaLevel',
    'Encoding',
    'MarginL',
    'MarginR',
    'MarginV',
    'Fontname',
    'PrimaryColour',
    'SecondaryColour',
    'TertiaryColour',
    'BackColour',
    'Alignment',
    'Fontsize',
    'Bold',
    'Italic',
    'Outline',
];
// TODO, switch to other color scheme
const getSsaColor = (rgbaColor = '') => {
    let convertedRgba = rgba_convert_1.hex(rgbaColor).toUpperCase().replace('#', '');
    if (convertedRgba.length < 5) {
        convertedRgba = convertedRgba.split('').reduce((acc, char) => acc + char + char, '');
    }
    if (convertedRgba.length === 6) {
        convertedRgba = convertedRgba + 'FF';
    }
    return '&H' + convertedRgba;
};
const processColor = (value, defaults) => (getSsaColor(typeof value === 'string' ? value : defaults));
const getFont = (fontStr = 'Tahoma') => {
    switch (fontStr.toLowerCase()) {
        case 'times new roman':
            return 'Times New Roman';
        default:
            return fontStr;
    }
};
const getInteger = (value = 0) => (Number.isInteger(value) ? value : Math.floor(value));
const getAlignment = (alignAttr) => {
    if (alignAttr) {
        return 6;
    }
    return 2;
};
const getBorderStyle = ({ background, outline }) => {
    if (background) {
        return 3;
    }
    else if (outline) {
        return 1;
    }
    return 0;
};
const getOutlineOrBackColor = (outline, background) => {
    if (background && background.color) {
        return processColor(background.color);
    }
    else if (outline && outline.color) {
        return processColor(outline.color);
    }
    return processColor('rgba(0, 0, 0, 0)');
};
const buildStyle = (stylesArray) => {
    const defaults = {
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
        stylesArray = [defaults];
    }
    const styles = stylesArray.map((styleObj, idx) => {
        const obj = Object.assign({}, defaults, styleObj);
        var color = processColor(obj.color || defaults.color);
        var marginH = getInteger(obj.marginH || defaults.marginH);
        var name;
        if (idx === 0) {
            name = 'primary';
        }
        else if (idx === 1) {
            name = 'secondary';
        }
        else {
            name = (obj.name || 'Failed') + idx;
        }
        const valid = {
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
        const style = styleFormat.reduce((acc, val, i) => (acc + valid[val] + ((i !== styleFormat.length - 1) ? ',' : '')), '');
        return 'Style: ' + style;
    });
    return styles.reduce((acc, style) => acc + style + '\n', '');
};
const getFormat = () => 'Format: ' + styleFormat.reduce((acc, val) => acc + ',' + val);
const buildStyleSection = (styles) => {
    if (!Array.isArray(styles) && typeof styles === 'object') {
        styles = [styles];
    }
    else if (!!styles && typeof styles !== 'object') {
        throw TypeError('invalid argument type');
    }
    return '[V4 Styles]\n' +
        getFormat() + '\n' +
        buildStyle(styles);
};
module.exports = buildStyleSection;
