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
JsonObject.prototype.toString = function () {
  return '{' + this.getContentString() + '}'
}
JsonObject.prototype.getContentString = function () {
  var first = true;
  var result = '';
  for(var key in this.content) {
    if (this.content.hasOwnProperty(key)){
      if (first){
        first = false;
      }else{
        result += ', ';
      }
      result += '"' + key + '": ' + this.content[key].toString();
    }
  }
  return result;
}

function JsonNumber(num) {
  if (isNaN(num)){
    throw new Error('int is not a Number!');
  }
  this.content = num;
};

JsonNumber.prototype.getValue = function () {
  return this.content;
}
JsonNumber.prototype.toString = function () {
  return this.content.toString();
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
JsonString.prototype.toString = function () {
  return '"' + this.content + '"';
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
JsonBoolean.prototype.toString = function () {
  return this.content.toString();
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
JsonArray.prototype.toString = function () {
  return '[' + this.content.toString() + ']';
}

function JsonParser() {

};


JsonParser.prototype.parse = function (str) {
  return parseObject(str)
};

function parseObject(str) {
  if (str === '{}'){
    return JsonObject.empty();
  }
  var o = splitToObject(trimEdges(str.trim()).split(','));
  return (new JsonObject(o));
};

JsonObject.empty = function () {
  return new JsonObject({});
};

function trimEdges(str) {
  return str.substr(1,str.length-2);
};

function extractProperty(member) {
  var splitted = member.split(':');
  var value = splitted.slice(1).join(':');
  var key = splitted[0]
//
//  console.log("KEY:" + key);
//  console.log("VALUE:" + value);
  return [key,value];
  //return member.split(':');
}

function propertyKey(property) {
  return property[ 0].trim();
}

function propertyValue(property) {
  return property[1].trim();
}

function addValidProperty(member, result) {
  var property = extractProperty(member);
  result[trimEdges(propertyKey(property))] = convertByType(propertyValue(property));
}
function splitToObject (splittedObject) {
  var result = {};
  for (var i = 0; i < splittedObject.length; i++){
    var member = splittedObject[i].trim();
    while ((i < splittedObject.length) && (!validParentheses(member))){
      member += ',' + splittedObject[++i];
    }
    if (!validParentheses(member)){
      throw new Error('Invalid object!');
    }else{
      addValidProperty(member, result);
    }
  }
//  return helper(splittedObject, result, 'Invalid object!', addValidProperty())
  return result;
};

function addValidMember(member) {
  arr.push(convertByType(member));
}
function helper (splitted, result, errorMsg, addToResult) {
  for (var i = 0; i < splitted.length; i++){
    var member = splitted[i].trim();
    while ((i < splitted.length) && (!validParentheses(member))){
      member += ',' + splitted[++i];
    }
    if (!validParentheses(member)){
      throw new Error(errorMsg);
    }else{
      addToResult(member, result);
    }
  }
  return result;
};

function isNumber(str) {
  return !isNaN(Number(str));
}
function isObject(str) {
  return containsEdges(str, '{', '}');
}
function parseString(str) {
  return new JsonString(trimEdges(str));
}
function parseNumber(str) {
  return new JsonNumber(Number(str));
}
function convertByType (str) {
  //console.log(str);
  if (isArrayString(str))
    return parseArray(trimEdges(str).split(','));
  if (isString(str))
    return parseString(str);
  if (isNumber(str))
    return parseNumber(str);
  if (isObject(str)) {
    return parseObject(str);
    //return JsonObject.empty();
  }

  return parseBoolean(str);
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
function parseArray (splittedMembers) {
  //console.log(splittedMembers);
  var result = [];
  for (var i = 0; i < splittedMembers.length; i++){
    var member = splittedMembers[i].trim();
    while ((i < splittedMembers.length) && (!validParentheses(member))){
      member += ',' + splittedMembers[++i];
    }
    if (!validParentheses(member)){
      throw new Error('Invalid array!');
    }else{
      result.push(convertByType(member));
    }
  }
  return new JsonArray(result);
};

function parseBoolean (str) {
  return new JsonBoolean(str === 'true');
};
function validParentheses (str) {
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
