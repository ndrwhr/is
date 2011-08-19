Super simple js type checking library.

     _           _
    :_;         :_;
    .-. .--.    .-. .--.
    : :`._-.' _ : :`._-.'
    :_;`.__.':_;: :`.__.'
              .-. :
              `._.'

### Usage #1 (single argument call):

    // someObj {anything}: Object that you would like to know the type of.
    
    is(someObject);
    
    // Will return the type of the object as a lower case string.
    
    is('mystring'); // returns 'string'
    is([1, 2, 3]); // returns 'array'
    is(true); //returns 'boolean'

### Usage #2 (double argument call):

    // someObj  {anything}: Object that you would like to check the type of.
    // someType {string}: The name of the type you are expecting.
    
    is(someObject, someType);
    
    // Will return true if someObj matches someType. Eg:
    
    is('mystring', 'string'); // returns true
    is(3.14, 'number'); // returns true
    is(42, 'string'); // returns false

### Custom types:

If you have your own special objects that are identifiable by certain fields,
you can add your own types to check against:

    var larry = {
        dressesInWomensClothing: true,
        hangsAroundInBars: true,
        chopTree: function(){}
    };

    is.add('Lumberjacks', function(obj){
        // return true if obj is a lumberjack, otherwise false.
        return obj.dressesInWomensClothing && obj.hangsAroundInBars;
    });

    is(larry, 'Lumberjack'); // returns true

And if for some reason you want to remove an added type at a later time:

    is.remove('Lumberjack');

    is(larry); // return 'object'
