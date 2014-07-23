"use strict";

function JsonObject(obj) {
    if (typeof obj !== 'object'){
        throw new Error('obj is not an Object!');
    }
    this.content = obj;
};

JsonObject.prototype.getValue = function () {
    return this.content;
}


function JsonNumber(num) {
    if (isNaN(num)){
        throw new Error('int is not a Number!');
    }
    this.content = num;
};
//JsonNumber.prototype = new JsonObject({});

JsonNumber.prototype.getValue = function () {
    return this.content;
}


function JsonString(str) {
    if (typeof str !== 'string'){
        throw new Error('str is not a String!');
    }
    this.content = str;
};

JsonString.prototype.getValue = function () {
    return this.content;
}

function JsonBoolean(bool) {
    if (typeof bool !== 'boolean'){
        throw new Error('bool is not a Boolean value!');
    }
    this.content = bool;
};

JsonBoolean.prototype.getValue = function () {
    return this.content;
}

function JsonArray(arr) {
    if (!Array.isArray(arr)){
        throw new Error('arr is not an Array!');
    }
    this.content = arr;
};

JsonArray.prototype.getValue = function () {
    return this.content;
}

function JsonParser() {

};


JsonParser.prototype.parse = function (str) {
    if (str === '{}'){
        return JsonObject.empty();
    }
    var o = splitToObject(trimEdges(str.trim()));
    return (new JsonObject(o));
};
JsonObject.empty = function () {
    return new JsonObject({});
};

function trimEdges(str) {
    return str.substr(1,str.length-2);
};

function splitToObject (str) {
    var pair = str.split(':')
    var o = {};
    o[trimEdges(pair[0].trim())] = convertByType(pair[1].trim());
    return o;
};

function convertByType (str) {
     //console.log(str);
     if (isArrayString(str)){
         return convertToArray(trimEdges(str).split(','));
     }
    if (isString(str)) return trimEdges(str);
    return isNaN(Number(str))? convertToBoolean(str) : Number(str);
};
function isArrayString (str) {
    return containsEdges(str, '[',']');
};
function isString (str) {
    return containsEdges(str, '"', '"');
};
function containsEdges (str, left, right) {
    return ((str.charAt(0) === left) &&
        (str.charAt(str.length-1)) === right);
};
function convertToArray (splittedMembers) {
    console.log(splittedMembers);
    var arr = [];
    for (var i = 0; i < splittedMembers.length; i++){
        var member = splittedMembers[i].trim();
        while ((i < splittedMembers.length) && (!validSubString(member))){
            member += ',' + splittedMembers[++i];
        }
        if (!validSubString(member)){
            throw new Error('Invalid array!');
        }else{
            arr.push(convertByType(member));
        }
    }
    return arr;
};

function convertToBoolean (str) {
    return str === 'true';
};
function validSubString (str) {
    for (var countCurl = 0, i = 0, countSqur = 0; i < str.length; i++){
        switch (str[i]){
            case ('['): { countSqur++ ; continue;};
            case (']'): { countSqur--  ; continue;};
            case ('{'): { countCurl++  ; continue;};
            case ('}'): { countCurl--  ; continue;};
            default: { continue; }
        }
    }
    return (countCurl === 0) && (countSqur === 0);
};
