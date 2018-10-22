# Style Object Formatting

- font: string, specify a font name (default Tahoma)
- fontsize: numeric, ideally keep between 12 and 36 (default 24)
- color: requires exact string matches, see section below on supported colors (default white)
- italic: boolean (default false)
- bold: boolean (default false)
- outline: either omit or mark false for none, include an object with a color attribute to have one
- background: will override outline (as both dictated by borderStyle), a solid block background behind the text
- topAlign: boolean (default false, aligns to bottom of screen)
- marginH, marginV: margins on text, try to keep low

Currently supported colours (must match casing):
_(note: this will change to rgba provided hex based formats work, drastically improving options)_

- black
- white
- red
- green
- blue
- yellow

Currently supported fonts:

- Tahoma
- Times New Roman
