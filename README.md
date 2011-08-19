# IS
A really simple library to do basic type checking in javascript (without coercion)

## Usage:

There are two different ways to use *is*:

    // Called with single argument, 'is' will return
    // the of the object as a lower case string.
    is('mystring'); // returns 'string'
    is([1, 2, 3]); // returns 'array'
    is(true); //returns 'boolean'

    // Called with two arguments, it will verify the
    // type of the first to the string passed in.
    is('mystring', 'string') // returns true
    is(3.14, 'number') // returns true
    is(42, 'string') // returns false

You can also add type checking for your own objects:

    var larry = {
        dressesInWomensClothing: true,
        hangsAroundInBars: true,
        chopTree: function(){}
    };

    is.add('Lumberjacks', function(obj){
        return obj.dressesInWomensClothing && obj.hangsAroundInBars;
    });
    
    is(larry, 'Lumberjack') // returns true

And if for some reason you want to remove an added type at a later time:

    is.remove('Lumberjack');
    
    is(larry) // return 'object'
