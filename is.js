
(function(exports, undefined){

var proto = function(obj){
    return Object.prototype.toString.apply(obj);
};

var fallback = function(obj){
    return (/\[.* (.*)\]/i).exec(proto(obj))[1].toLowerCase();
};

var Checks = {
    UserTypes: {},
    BaseTypes: {
        'null': function(obj){
            return null === obj;
        },
        'undefined': function(obj){
            return undefined === obj;
        }
    },
    DOMTypes: {}
};

var addMultiple = function(pairs, check, addTo){
    for (var type in pairs){
        (function(type, property){
            addTo[type] = function(obj){ return check(obj, property); };
        })(type, pairs[type]);
    }
};

// Add aditional base types
addMultiple({
    'boolean': '[object Boolean]',
    'string': '[object String]',
    'number': '[object Number]',
    'array': '[object Array]',
    'function': '[object Function]',
    'object': '[object Object]'
}, function(obj, type){
    return proto(obj) === type;
}, Checks.BaseTypes);

// Add aditional base types
addMultiple({
    'element': 1,
    'textnode': 3,
    'comment': 8,
    'document': 9,
    'fragment': 11
}, function(element, nodeType){
    return element && element.nodeType === nodeType;
}, Checks.DOMTypes);

exports.is = function(obj, type){
    if (arguments.length === 2){
        if (null === type) type = 'null';
        if (undefined == type) type = 'undefined';

        var comparitor = Checks.UserTypes[type] || Checks.DOMTypes[type.toLowerCase()] || Checks.BaseTypes[type.toLowerCase()];
        if (comparitor) return comparitor(obj);

        throw new Error('"' +type + '" is not supported by is.');
    } else {
        for (type in Checks.UserTypes)
            if (Checks.UserTypes[type](obj)) return type;

        if (obj && obj.nodeType !== undefined){
            for (type in Checks.DOMTypes)
                if (Checks.DOMTypes[type](obj)) return type;
        }

        for (type in Checks.BaseTypes)
            if (Checks.BaseTypes[type](obj)) return type;

        return fallback(obj);
    }
};

exports.is.add = function(type, comparitor){
    Checks.UserTypes[type] = comparitor;
};

exports.is.remove = function(type){
    delete Checks.UserTypes[type];
};

})(window);
