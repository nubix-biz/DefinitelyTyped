import jQuery = require("jquery");
import { KeyboardOptions, NavigateOptions } from "virtual-keyboard";

const kbOptions: KeyboardOptions = {
    display: {
		bksp  :  "\u2190",
		accept: `Next` ,
		cancel: `Back`,
		normal: "ABC",
		meta1 : "#+-",
		space : "Space",
		alt   : `Alt`,
		s     : `ABC`,
	},
    acceptValid: true,
	type: "input",
    layout: "custom",
    customLayout: {
		normal: [
			`a b c d e f g h i j k l m`,
			`n o p q r s t u v x y z w`,
			`1 2 3 4 5 6 7 8 9 0 . _ @`,
			`{alt} {s} {space} {meta1} {s} {bksp} `,
			`{cancel}  {accept}`
		],
		shift: [
			`A B C D E F G H I J K L M`,
			`N O P Q R S T U V X Y Z W`,
			`1 2 3 4 5 6 7 8 9 0 . _ @`,
			`{alt} {s} {space} {meta1} {s} {bksp} `,
			`{cancel}  {accept}`
		],
		meta1: [
			`- / : ; ( ) \u20ac & \" ! ? ' \``,
			`[ ] { } # % ^ * + = ° ´ §`,
			` \\ | ~ < > $ \u00a3 \u00a5 , ' ² ³`,
			`{space} {meta1} {bksp}`,
			`{cancel}  {accept}`
		],
		"alt-shift": [
			`A B C D E F G H I J K L M N O`,
			`P Q R S T U V X Y Z W \u00df \u00dc \u00d6 \u00c4`,
			`1 2 3 4 5 6 7 8 9 0 . _ @ \u0301`,
			`{alt} {s} {space} {meta1} {s} {bksp} `,
			`{cancel}  {accept}`
		],
		alt: [
			`a b c d e f g h i j k l m n o`,
			`p q r s t u v x y z w \u00df \u00fc \u00f6 \u00e4`,
			`1 2 3 4 5 6 7 8 9 0 . _ @ \u0301`,
			`{alt} {s} {space} {meta1} {s} {bksp} `,
			`{cancel}  {accept}`
		],
	},
    lockInput: true,
    alwaysOpen: true,
    appendLocally: true,
    color: "light",
    class: "sxcycx",
    updateOnChange: true,
    usePreview: false,
    tabNavigation: false,

    accepted:      (event, keyboard, element) => { console.log("accepted"); },
    beforeClose:   (event, keyboard, element, accepted) => { console.log("beforeClose"); },
    beforeInsert:  (event, keyboard, element, txt) => { console.log("beforeInsert"); },
    beforeVisible: (event, keyboard, element) => { console.log("beforeVisible"); },
    canceled:      (event, keyboard, element) => { console.log("canceled"); },
    change:        (event, keyboard, element) => { console.log("change"); },
    hidden:        (event, keyboard, element) => { console.log("hidden"); },
    initialized:   (event, keyboard, element) => { console.log("initialized"); },
    restricted:    (event, keyboard, element) => { console.log("restricted"); },
    visible:       (event, keyboard, element) => { console.log("visible"); },

    buildKey:      (keyboard, data) => { console.log("buildKey"); },
    switchInput:   (keyboard, goToNext, isAccepted) => { console.log("switchInput"); },
    validate:      (keyboard, value, isClosing) => { console.log("validate"); return true; },
};

const navOptions: NavigateOptions = {
    position   : [0, 0],
    toggleMode : true,
    focusClass : "hasFocus",
    rowLooping : true,
  };

jQuery("#keyboard").keyboard(kbOptions).addNavigation(navOptions);

const data = jQuery("#keyboard").getkeyboard();
const last = data.last;
