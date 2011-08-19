
(function(exports, undefined){

var CLASS_REGEX = /\[.* (.*)\]/i, // Matches: '[object Date]' => 'Date'
    TO_STRING = Object.prototype.toString;

var basicType = function(obj){
    return CLASS_REGEX.exec(TO_STRING.apply(obj))[1].toLowerCase();
};

var customType = function(name, obj){
    var types = CUSTOM_TYPES[name];

    for (var type in types){
        if (types[type](obj)) return type;
    }

    return false;
};

var domCheck = function(nodeType){
    return function(obj){
        return obj && obj.nodeType === nodeType;
    };
};

var CUSTOM_TYPES = {
    USER: {},
    DOM: {
        'element' : domCheck(1),
        'textnode': domCheck(3),
        'comment' : domCheck(8),
        'document': domCheck(9),
        'fragment': domCheck(11)
    }
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
