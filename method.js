/*
    How this is called: Language("languageWanted", "keyOfText", argsPassedToKey)
    
    Should use database/config to determine what is passed for **lang**,
    this is meant to be dynamic and not used on a large scale.

    Inspired by Klasa framework (discord.js framework) language feature 

*/

// Used to choose what language to use
// Must retrun as to pass the text of key
function LangMethod(languageStr /*Str*/, key /*Str*/, ...args /*Rest of args*/) {
    switch (languageStr) {
        case "english":
            return typeRun(require("./languages/en"), key /*id of text*/, ...args /*Passes through rest of args*/);
        case "french":
            return typeRun(require("./languages/fn"), key /*id of text*/, ...args /*Passes through rest of args*/);
        default:
            return typeRun(require("./languages/en"), key, ...args); //Default set as english
    }
}

// Desgined as a catch if something isn't defined/tranlated yet
// Must retrun as to pass the text of key
function typeRun(lang, key, ...args) {
    const func = lang[key];

    switch (typeof func) {
        case "function":
            return lang[key](...args);
        case "undefined":
            return lang.default(key);
        default:
            return "Something weird happened.";
    }
}

module.exports = LangMethod;