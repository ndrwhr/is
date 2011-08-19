
(function(exports, undefined){

// Returns the passed in objects prototype
// as a string. eg '[object Object]'
var proto = function(obj){
    return Object.prototype.toString.apply(obj);
};

// If none of the other checks succeed, we can use
// this function to return the objects type. Eg.
// array out of [object Array] or string out of [object String]
var fallback = function(obj){
    return (/\[.* (.*)\]/i).exec(proto(obj))[1].toLowerCase();
};


// A more compact way to add a bunch of comparisons that only
// differ by the value they are comparing, but not the way
// that they're compared.
var addMultiple = function(to, pairs, check){
    for (var type in pairs){
        (function(type, property){
            to[type] = function(obj){ return check(obj, property); };
        })(type, pairs[type]);
    }
    return to;
};

// Type - check pairs that will be run when is is called.
var Checks = {
    // No user defined types yet.
    UserTypes: {},
    // These are the core javascript types to check.
    BaseTypes: addMultiple(
        {
            'null': function(obj){
                return null === obj;
            },
            'undefined': function(obj){
                return undefined === obj;
            }
        }, {
            'boolean': '[object Boolean]',
            'string': '[object String]',
            'number': '[object Number]',
            'array': '[object Array]',
            'function': '[object Function]',
            'object': '[object Object]'
        },
        function(obj, type){
            return proto(obj) === type;
        }
    ),
    // Specific DOM element checks.
    DOMTypes: addMultiple(
        {},
        {
            'element': 1,
            'textnode': 3,
            'comment': 8,
            'document': 9,
            'fragment': 11
        },
        function(element, nodeType){
            return element && element.nodeType === nodeType;
        }
    )
};

// Actual is definition:
exports.is = function(obj, type){
    if (arguments.length === 2){
        // Allow users to pass in literal null or undefined.
        if (null === type) type = 'null';
        if (undefined == type) type = 'undefined';

        // Try to find a comparitor that matches the users provided type.
        var comparitor = Checks.UserTypes[type] || Checks.DOMTypes[type.toLowerCase()] || Checks.BaseTypes[type.toLowerCase()];
        if (comparitor) return comparitor(obj);

        throw new Error('"' +type + '" is not supported by is.');
    } else {
        // Compare against user values first.
        for (type in Checks.UserTypes)
            if (Checks.UserTypes[type](obj)) return type;

        // Then DOM.
        if (obj && obj.nodeType !== undefined){
            for (type in Checks.DOMTypes)
                if (Checks.DOMTypes[type](obj)) return type;
        }

        // Then the BaseChecks.
        for (type in Checks.BaseTypes)
            if (Checks.BaseTypes[type](obj)) return type;

        // Then the fallback.
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
