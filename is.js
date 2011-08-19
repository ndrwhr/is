
(function(exports, undefined){

var CLASS_REGEX = /\[.* (.*)\]/i, // Matches: '[object Date]' => 'Date'
    TO_STRING = Object.prototype.toString;

// Returns a function to be used when comparing nodes.
var domNodeCheck = function(nodeType){
    return function(obj){
        return obj && obj.nodeType === nodeType;
    };
};

var CUSTOM_TYPES = {
    USER: {},
    DOM: {
        'element' : domNodeCheck(1),
        'textnode': domNodeCheck(3),
        'comment' : domNodeCheck(8),
        'document': domNodeCheck(9),
        'fragment': domNodeCheck(11)
    }
};

// Returns the base type of an object as determined by Object.prototype.toString.
var basicType = function(obj){
    return CLASS_REGEX.exec(TO_STRING.apply(obj))[1].toLowerCase();
};

// Returns a custom type if found.
var customType = function(name, obj){
    var types = CUSTOM_TYPES[name];

    for (var type in types){
        if (types[type](obj)) return type;
    }

    return false;
};

// Actual is definition:
exports.is = function(obj, type){
    if (arguments.length === 2){

        if (type === undefined) type = 'undefined';
        else if (type === null) type = 'null';

        var typeComparitor = CUSTOM_TYPES.USER[type] || CUSTOM_TYPES.DOM[type.toLowerCase()];

        if (typeComparitor && typeComparitor(obj)) return true;

        return basicType(obj) === type.toLowerCase();

    } else {

        var userType = customType('USER', obj);
        if (userType) return userType;

        return (obj && obj.nodeType !== undefined && customType('DOM', obj)) || basicType(obj);

    }
};

exports.is.add = function(type, comparitor){
    CUSTOM_TYPES.USER[type] = comparitor;
};

exports.is.remove = function(type){
    delete CUSTOM_TYPES.USER[type];
};

})(window);
