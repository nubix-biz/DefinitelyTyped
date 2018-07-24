// Type definitions for virtual-keyboard 1.26
// Project: https://www.npmjs.com/package/virtual-keyboard
// Definitions by: Bogdan Surai <https://github.com/bsurai>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

/// <reference types="jquery" />

export interface KeyPressed {
    /** caret start position. */
    readonly start: number;
    /** caret end position. */
    readonly end: number;

    /** jQuery object of the last key pressed (empty array if physical keyboard was used). */
    readonly $key?: JQuery | any[];
    /** text of last key pressed (may not reflect accurately if mousewheel was used). */
    readonly key: string;
    /** event.which value of the last physical key typed; set as an empty string for virtual keys. */
    readonly keyPress?: number | '';

    /** previous preview input value. */
    readonly preVal: string;
    /** last (current) preview input value. */
    readonly val: string;

    /** last layout used by the keyboard (see https://github.com/Mottie/Keyboard/issues/333). */
    readonly layout: string;
    /** array of keyset states for: [ shift, alt, meta ] keys. */
    readonly keyset: boolean[];

    /** last keyboard event (either keypress, mousedown or touchstart). */
    readonly event?: Event;
    /** time of last event, likely not the same as the keyboard.last.event.timeStamp value. In v1.22.0, this contains the time when the keyboard closed - useful if you want to prevent reopening the same keyboard when clicking an external link; see #333. */
    readonly eventTime?: number;

    /** if true, the virtual keyboard caused the last (usually "change") event. If false, the physical keyboard caused the last event. */
    readonly virtual: boolean;
}

export interface KeyboardData {
    // Objects
    /** original keyboard input object. */
    readonly el: Element;
    /** original keyboard input jQuery object; it's the same as doing $( keyboard.el ). */
    readonly $el: JQuery;
    /**
     * - This will point to the preview window input object, if the usePreview option is true
     * - It will point to keyboard.el if usePreview is false.
     * - And it will be undefined if the keyboard is closed.
     */
    readonly preview?: Element;
    /**
     * - This will point to the preview window input jQuery object, if the usePreview option is true
     * - It will point to keyboard.$el if usePreview is false.
     * - And it will be undefined if the keyboard is closed.
     */
    readonly $preview?: JQuery;
    /**
     * - jQuery object of the entire keyboard.
     * - This object will be an empty array if the keyboard is closed (use keyboard.$keyboard.length to check).
     */
    readonly $keyboard: JQuery;

    // Values
    /** contains the text from the input/textarea before the keyboard opened. */
    readonly originalContent: string;
    /**  access any of the options; try not to modify them from here as it may break the keyboard. */
    readonly options: KeyboardOptions;
    /** contains information about the last key pressed */
    readonly last: KeyPressed;

    // States
    /**  true when the keyboard is visible; false when hidden. */
    readonly isVisible: boolean;
    /**  function returns true when the keyboard is the current; Needed to figure out which one has focus when multiple keyboards are open (alwaysOpen: true). */
    isCurrent(): boolean;
    /**  true when the shift key is active; false when not active. */
    readonly shiftActive: boolean;
    /**  true when the alt key is active; false when not active. */
    readonly altActive: boolean;
    /**  false when the meta key is no active, and contains the meta key name when it is active (e.g. meta99 or meta_symbols) */
    readonly metaActive: boolean;
    /**  true when the caps lock key is active; false when not active. Please note that this particular value is not 100% reliable as it isn't possible to detect the actual state of this key. */
    readonly capsLock: boolean;
    /**  true when the keyboard (all keys and preview) are enabled; set to false then call the keyboard.toggle() function to disable the keyboard keys & input. */
    readonly enabled: boolean;
}

export interface KeyData {
    /** true if key is an action key */
    readonly isAction: boolean;
    /** key class name suffix ( prefix = 'ui-keyboard-' ); may include decimal ascii value of character */
    readonly name: string;
    /** text inserted (non-action keys) */
    readonly value: string;
    /** title attribute of key */
    readonly title: string;
    /** keyaction name */
    readonly action: string;
    /** HTML of the key; it includes a <span> wrapping a modified data.value */
    readonly html: string;

    // use to modify HTML
    /** jQuery selector of key which is already appended to keyboard */
    readonly $key: JQuery;
}

export type kbEventHandler             = (event: Event | string, keyboard: KeyboardData, el?: Element) => void;
export type kbBeforeCloseEventHandler  = (event: Event | string, keyboard: KeyboardData, el?: Element, accepted?: boolean) => void;
export type kbBeforeInsertEventHandler = (event: Event | string, keyboard: KeyboardData, el?: Element, textToAdd?: string) => boolean | undefined;

export type kbBuildKeyHandler          = (keyboard: KeyboardData, data: KeyData) => boolean;
export type kbSwitchInputHandler       = (keyboard: KeyboardData, goToNext?: boolean, isAccepted?: boolean) => boolean;
export type kbValidateHandler          = (keyboard: KeyboardData, value: string, isClosing?: boolean) => boolean;

export interface NavigateOptions {
    focusClass?: string;
    position?: number[];
    rowLooping?: boolean;
    toggleMode?: boolean;
}

export interface CustomLayout {
    [index: string]: string[];
}

export interface KeyboardOptions {
    type: string;
    layout?: string;
    color?: string;
    class?: string;
    updateOnChange?: boolean;
    customLayout?: CustomLayout;
    position?: boolean | object;
    reposition?: boolean;
    css?: object;
    display?: object;
    language?: string | string[];
    wheelMessage?: string;
    comboRegex?: RegExp;
    rtl?: boolean;
    acceptValid?: boolean;
    alwaysOpen?: boolean;
    appendLocally?: boolean;
    appendTo?: string | object;
    autoAccept?: boolean;
    autoAcceptOnEsc?: boolean;
    autoAcceptOnValid?: boolean;
    cancelClose?: boolean;
    caretToEnd?: boolean;
    closeByClickEvent?: boolean;
    combos?: object;
    enterMod?: string;
    enterNavigation?: boolean;
    ignoreEsc?: boolean;
    initialFocus?: boolean;
    keyBinding?: string;
    lockInput?: boolean;
    maxInsert?: boolean;
    maxLength?: boolean | number;
    noFocus?: boolean;
    openOn?: string;
    preventPaste?: string;
    repeatDelay?: number;
    repeatRate?: number;
    resetDefault?: boolean;
    restrictInclude?: string;
    restrictInput?: boolean;
    scrollAdjustment?: number | string;
    stayOpen?: boolean;
    stickyShift?: boolean;
    stopAtEnd?: boolean;
    tabNavigation?: boolean;
    useCombos?: boolean;
    usePreview?: boolean;
    useWheel?: boolean;
    userClosed?: boolean;

    accepted?: kbEventHandler;
    beforeClose?: kbBeforeCloseEventHandler;
    beforeInsert?: kbBeforeInsertEventHandler;
    beforeVisible?: kbEventHandler;
    canceled?: kbEventHandler;
    change?: kbEventHandler;
    hidden?: kbEventHandler;
    initialized?: kbEventHandler;
    restricted?: kbEventHandler;
    visible?: kbEventHandler;

    buildKey?: kbBuildKeyHandler;
    switchInput?: kbSwitchInputHandler;
    validate?: kbValidateHandler;
}

declare global {
    interface JQuery {
        keyboard(options: KeyboardOptions): this;
        addNavigation(options: NavigateOptions): this;
        getkeyboard(): KeyboardData
    }
}
