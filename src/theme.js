'use strict';

import MaterialUI from 'material-ui';

var Colors = MaterialUI.Styles.Colors;
var Spacing = MaterialUI.Styles.Spacing;
var ColorManipulator = MaterialUI.Utils.ColorManipulator;

export default {
    spacing: Spacing,
    fontFamily: 'Helvetica, Roboto, sans-serif',
    palette: {
        primary1Color: Colors.orange500,
        primary2Color: Colors.brown500,
        primary3Color: Colors.grey500,
        accent1Color: Colors.amberA200,
        accent2Color: Colors.amberA400,
        accent3Color: Colors.amberA100,
        textColor: Colors.fullWhite,
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
        disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3)
    }
};