

describe('is', function(){
    
    it('should be defined on global scope', function(){
        expect(is).toBeDefined();
    });

    describe('single argument call', function(){
        
        it('should detect undefined', function(){
            var a;
            expect(is(a)).toBe('undefined');
        });

        it('should detect null', function(){
            expect(is(null)).toBe('null');
        });
        
        it('should detect string', function(){
            expect(is('hello')).toBe('string');
            expect(is(new String('world'))).toBe('string');
        });

        it('should detect boolean', function(){
            expect(is(true)).toBe('boolean');
            expect(is(false)).toBe('boolean');
        })

        it('should detect array', function(){
            expect(is([])).toBe('array');
        });

        it('should detect function', function(){
            var anonFunc = function(){};
            function namedFunc(){};
            expect(is(anonFunc)).toBe('function');
            expect(is(namedFunc)).toBe('function');
        });

        it('should detect object', function(){
            var objLiteral = {};
            var objConstructed = new function(){};
            expect(is(objLiteral)).toBe('object');
            expect(is(objConstructed)).toBe('object');
        });

    });

    describe('two argument call', function(){
        
        it('should accept literal null', function(){
            expect(is(null, null)).toBe(true);
        });

        it('should accept literal undefined', function(){
            expect(is(undefined, undefined)).toBe(true);
        });

        it('should accept string null', function(){
            expect(is(null, 'null')).toBe(true);
        });

        it('should accept string undefined', function(){
            expect(is(undefined, 'undefined')).toBe(true)
        });

        it('should detect null is not undefined', function(){
            expect(is(null, undefined)).toBe(false);
            expect(is(undefined, null)).toBe(false);
        });

    });

});