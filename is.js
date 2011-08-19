
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
        },

        'boolean': function(obj){
            return proto(obj) === '[object Boolean]';
        },

        'string': function(obj){
            return proto(obj) === '[object String]';
        },

        'number': function(obj){
            return proto(obj) === '[object Number]';
        },

        'array': function(obj){
            return proto(obj) === '[object Array]';
        },

        'function': function(obj){
            return proto(obj) === '[object Function]';
        },

        'object': function(obj){
            return proto(obj) === '[object Object]';
        }
    },
    DOMTypes: {
        'element': function(element){
            return element.nodeType === 1;
        },
        'textnode': function(element){
            return element.nodeType === 3;
        },
        'comment': function(element){
            return element.nodeType === 8;
        },
        'document': function(element){
            return element.nodeType === 9;
        },
        'fragment': function(element){
            return element.nodeType === 11;
        }
    }
};

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
