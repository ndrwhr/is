
(function(exports, undefined){

var proto = function(obj){
    return Object.prototype.toString.apply(obj);
};

var fallback = function(obj){
    return (/\[.* (.*)\]/i).exec(proto(obj))[1].toLowerCase()
};

var BaseTypes = {

    'null': function(obj){
        return null === obj;
    },

    'undefined': function(obj){
        return undefined === obj;
    },

    'boolean': function(obj){
        return proto(obj) === '[object Boolean]'
    },

    'string': function(obj){
        return proto(obj) === '[object String]';
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

};

exports.is = function(obj, type){
    if (arguments.length === 2){
        if (null === type) type = 'null';
        if (undefined == type) type = 'undefined'

        var comparitor = BaseTypes[type];
        if (comparitor) return comparitor(obj);

        throw new Error('"' +type + '" is not supported by is.');
    } else {
        for (type in BaseTypes)
            if (BaseTypes[type](obj)) return type;

        return fallback(obj);
    }
};

})(window);
