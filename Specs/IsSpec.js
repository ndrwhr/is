

describe('is', function(){

    it('should be defined on global scope', function(){
        expect(is).toBeDefined();
    });

    describe('user defined types', function(){
        var userObj;

        beforeEach(function(){
            userObj = {
                identifyingFeature: true
            };
        });

        it('should add and remove user type', function(){
            is.add('userObj', function(obj){
                return obj.identifyingFeature;
            });

            expect(is(userObj)).toBe('userObj');
            expect(is(userObj, 'userObj')).toBe(true);

            is.remove('userObj');

            expect(is(userObj)).toBe('object');
        });

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

        it('should detect numbers', function(){
            expect(is(3)).toBe('number');
            expect(is(3.14)).toBe('number');
        });

        it('should detect boolean', function(){
            expect(is(true)).toBe('boolean');
            expect(is(false)).toBe('boolean');
        });

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
            expect(is(undefined, 'undefined')).toBe(true);
        });

        it('should detect null is not undefined', function(){
            expect(is(null, undefined)).toBe(false);
            expect(is(undefined, null)).toBe(false);
        });

    });

    describe('DOM types', function(){

        var element;

        beforeEach(function(){
            element = document.createElement('div');
        });

        it('should detect element', function(){
            expect(is(element)).toBe('element');
            expect(is(element, 'element')).toBe(true);
        });

        it('should detect textnode', function(){
            element.innerHTML = 'some text';

            var text = element.firstChild;

            expect(is(text)).toBe('textnode');
            expect(is(text, 'textnode')).toBe(true);
        });

        it('should detect comment', function(){
            element.innerHTML = '<!-- a comment -->';

            var text = element.firstChild;

            expect(is(text)).toBe('comment');
            expect(is(text, 'comment')).toBe(true);
        });

        it('should detect document', function(){
            expect(is(document)).toBe('document');
            expect(is(document, 'document')).toBe(true);
        });

        it('should detect fragment', function(){
            var fragment = document.createDocumentFragment();

            expect(is(fragment)).toBe('fragment');
            expect(is(fragment, 'fragment')).toBe(true);
        });

    });

});