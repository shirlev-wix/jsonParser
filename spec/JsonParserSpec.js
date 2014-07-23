describe("JsonParser", function() {
    var parser;

    describe("jsonObject(obj)", function() {

        it("should throw an error when called with parameter other then Object", function() {
            expect(function() {new JsonObject()}).toThrow('obj is not an Object!');
        });
        var jsonObject = new JsonObject({'a':3});

        it("new JsonObject({'a':3}).getValue() should be equal to {a:3}", function() {
            expect(jsonObject.getValue()).toEqual({'a':3});
        });
    });

    describe("jsonNumber(num)", function() {

        it("should throw an error when called with parameter other then Number", function() {
            expect(function() {new JsonNumber()}).toThrow('int is not a Number!');
        });
        var jsonNumber = new JsonNumber(3);

        it("new JsonNumber(3).getValue() should equal 3", function() {
            expect(jsonNumber.getValue()).toEqual(3);
        });
//
//        it("should inherit from JsonObject", function() {
//            expect(jsonNumber instanceof JsonNumber).toBeTruthy;
//            expect(jsonNumber instanceof JsonObject).toBeTruthy;
//        });
    });

    describe("jsonString(str)", function() {

        it("should throw an error when called with parameter other then String", function() {
            expect(function() {new JsonString()}).toThrow('str is not a String!');
        });
        var jsonString = new JsonString('shir');

        it("new JsonString('shir').getValue() should be equal to 'shir'", function() {
            expect(jsonString.getValue()).toEqual('shir');
        });
    });

    describe("jsonBoolean(bool)", function() {

        it("should throw an error when called with parameter other then true/false", function() {
            expect(function() {new JsonBoolean()}).toThrow('bool is not a Boolean value!');
        });
        var jsonBoolean = new JsonBoolean(true);

        it("new JsonBoolean(true).getValue() should be equal to true", function() {
            expect(jsonBoolean.getValue()).toEqual(true);
        });
    });

    describe("jsonArray(arr)", function() {

        it("should throw an error when called with parameter other then Array", function() {
            expect(function() {new JsonArray()}).toThrow('arr is not an Array!');
        });
        var jsonArray = new JsonArray([1]);

        it("new JsonString('shir').getValue() should be equal to 'shir'", function() {
            expect(jsonArray.getValue()).toEqual([1]);
        });
    });

    beforeEach(function() {
        parser = new JsonParser();
    });
    describe("for empty json", function() {

        it("should generate an empty tree", function() {
            expect(parser.parse("{}")).toEqual(JsonObject.empty());
        });
    });

    describe("object with single number", function() {
        it("should generate a tree with one child a=3", function() {
            expect(parser.parse('{"a":3}')).toEqual((new JsonObject({'a':3})));
        });
        it("should generate a tree with one child a=4", function() {
            expect(parser.parse('{"a":4}')).toEqual((new JsonObject({'a':4})));
        });
        it("should generate a tree with one child b=3", function() {
            expect(parser.parse('{"b":3}')).toEqual((new JsonObject({'b':3})));
        });

    });

    describe("object with single String", function() {
        it("should generate a tree with one child a='shir'", function() {
            expect(parser.parse('{"a":"string"}')).toEqual((new JsonObject({'a':"string"})));
        });
    });
    describe("object with single Boolean", function() {
        it("should generate a tree with one child a=true", function() {
            expect(parser.parse('{"a":true}')).toEqual((new JsonObject({'a':true})));
        });
    });

    describe("object with single Array", function() {
        it("should generate a tree with one child a=[1,2]", function() {
            expect(parser.parse('{"a":[1,2]}')).toEqual((new JsonObject({'a':[1,2]})));
        });
        it("should generate a tree with one child a=['str1','str2']", function() {
            expect(parser.parse('{"a":["str1","str2"]}')).toEqual((new JsonObject({'a':['str1','str2']})));
        });
        it("should generate a tree with one child a=[true,false]", function() {
            expect(parser.parse('{"a":[true,false]}')).toEqual((new JsonObject({'a':[true,false]})));
        });
        it("should generate a tree with one child a=[[arr11, arr12],[arr21, arr22]]", function() {
            expect(parser.parse('{"a":[["arr11", "arr12"],["arr21", "arr22"]]}')).toEqual((new JsonObject({'a':[['arr11', 'arr12'],['arr21', 'arr22']]})));
        });
        it("should generate a tree with one child a=[[arr11, arr12],[arr21, arr22]]", function() {
            expect(parser.parse('{"a":[["arr11", "arr12"], "arr11", "arr12"]],["arr11", "arr12"], "arr11", "arr12"]]]}')).toEqual((new JsonObject({'a':[["arr11", "arr12"], "arr11", "arr12"]],["arr11", "arr12"], 'arr22']]})));
        });
    });
});