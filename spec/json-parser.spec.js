describe("JsonParser", function() {
    var parser;
    beforeEach(function() {
      parser = new JsonParser();
    });

    describe("jsonObject(obj)", function() {

        it("should throw an error when called with parameter other then Object", function() {
            expect(function() {new JsonObject()}).toThrow('obj is not an Object!');
        });
        var jsonObject = new JsonObject({'a':new JsonNumber(3)});

        it("new JsonObject({'a':3}).getValue() should be equal to {a:3}", function() {
            expect(jsonObject.getValue()).toEqual({'a':new JsonNumber(3)});
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

    describe("for empty json", function() {

        it("should generate an empty tree", function() {
            expect(parser.parse("{}")).toEqual(JsonObject.empty());
        });
    });

    describe("object with single number", function() {
        it("should generate a tree with one child a=3", function() {
            expect(parser.parse('{"a":3}')).toEqual((new JsonObject({'a':new JsonNumber(3)})));
        });
        it("should generate a tree with one child a=4", function() {
            expect(parser.parse('{"a":4}')).toEqual(new JsonObject({'a':new JsonNumber(4)}));
        });
        it("should generate a tree with one child b=3", function() {
            expect(parser.parse('{"b":3}')).toEqual((new JsonObject({'b':new JsonNumber(3)})));
        });

    });

    describe("object with single String", function() {
        it("should generate a tree with one child a='shir'", function() {
            expect(parser.parse('{"a":"string"}')).toEqual((new JsonObject({'a':new JsonString("string")})));
        });
    });
    describe("object with single Boolean", function() {
        it("should generate a tree with one child a=true", function() {
            expect(parser.parse('{"a":true}')).toEqual((new JsonObject({'a':new JsonBoolean(true)})));
        });
    });

    describe("object with single Array", function() {
        it("should generate a tree with one child a=[1,2]", function() {
            expect(parser.parse('{"a":[1,2]}')).toEqual((new JsonObject({'a':new JsonArray([new JsonNumber(1),new JsonNumber(2)])})));
        });
        it("should generate a tree with one child a=['str1','str2']", function() {
            expect(parser.parse('{"a":["str1","str2"]}')).toEqual((new JsonObject({'a':new JsonArray([new JsonString('str1'),new JsonString('str2')])})));
        });
        it("should generate a tree with one child a=[true,false]", function() {
            expect(parser.parse('{"a":[true,false]}')).toEqual((new JsonObject({'a':new JsonArray([new JsonBoolean(true),new JsonBoolean(false)])})));
        });
        it("should generate a tree with one child a=[[arr11, arr12],[arr21, arr22]]", function() {
            expect(parser.parse('{"a":[["arr11", "arr12"],["arr21", "arr22"]]}')).toEqual((new JsonObject({'a':new JsonArray([new JsonArray([new JsonString('arr11'), new JsonString('arr12')]), new JsonArray([new JsonString('arr21'), new JsonString('arr22')])])})));
        });
        it("should generate a tree with one child a=[[[arr11, arr12], [arr11, arr12]],[[arr11, arr12], [arr11, arr12]]]", function() {
            expect(parser.parse('{"a":[[["arr11", "arr12"], ["arr11", "arr12"]],[["arr11", "arr12"], ["arr11", "arr12"]]]}')).toEqual(new JsonObject({'a':new JsonArray([new JsonArray([new JsonArray([new JsonString("arr11"), new JsonString("arr12")]),new JsonArray([new JsonString("arr11"), new JsonString("arr12")])]),new JsonArray([new JsonArray([new JsonString("arr11"), new JsonString("arr12")]),new JsonArray([new JsonString("arr11"), new JsonString("arr12")])])])}));
        });
    });

    describe("object with multiple elements", function() {
        it("should generate a tree with a child key-value for every element", function() {
            expect(parser.parse('{"elem1":2, "elem2":"s", "elem3":false, "elem4":[1, 2, 3]}')).toEqual((new JsonObject({'elem1':new JsonNumber(2), 'elem2':new JsonString("s"), 'elem3':new JsonBoolean(false), 'elem4':new JsonArray([new JsonNumber(1), new JsonNumber(2), new JsonNumber(3)])})));
        });
//        it("should throw exception for invalid elements", function() {
//            expect(parser.parse('{"elem1":2, "elem2":"s", "elem3":false, "elem4":[1, 2, 3]}')).toEqual((new JsonObject({'elem1':2, 'elem2':"s", 'elem3':false, 'elem4':[1, 2, 3]})));
//        });
    });
    describe("object with nested objects", function() {
        it("should ....", function() {
            expect(parser.parse('{"elem":{}}')).toEqual((new JsonObject({'elem':new JsonObject.empty()})));
        });
        it("should 2....", function() {
            expect(parser.parse('{"elem":{"innerElem":4}}')).toEqual((new JsonObject({'elem':new JsonObject({'innerElem':new JsonNumber(4)})})));
        });
    });

  describe("toString()", function() {
    it("for JsonNumber", function() {
      expect((new JsonNumber(3).toString())).toEqual('3');
    });
    it("for JsonString", function() {
      expect((new JsonString('I\'m a string!').toString())).toEqual('"I\'m a string!"');
    });
    it("for JsonBoolean", function() {
      expect((new JsonBoolean(true).toString())).toEqual('true');
    });
    it("for JsonArray - empty array", function() {
      expect((new JsonArray([]).toString())).toEqual('[]');
    });
    it("for JsonArray - array with single number", function() {
      expect((new JsonArray([new JsonNumber(2)]).toString())).toEqual('[2]');
    });
    it("for JsonObject - empty JsonObject", function() {
      expect((new JsonObject({}).toString())).toEqual('{}');
    });
    it("for JsonObject - JsonObject with number", function() {
      expect((new JsonObject({"a": new JsonNumber(3)}).toString())).toEqual('{"a": 3}');
    });
    it("for JsonObject - multiple members", function() {
      expect((new JsonObject({'elem1':new JsonNumber(2), 'elem2':new JsonString("s"), 'elem3':new JsonBoolean(false), 'elem4':new JsonArray([new JsonNumber(1), new JsonNumber(2), new JsonNumber(3)])}).toString())).toEqual('{"elem1": 2, "elem2": "s", "elem3": false, "elem4": [1,2,3]}');
    });
    it("for JsonObject - nested object", function() {
      expect((new JsonObject({'elem':new JsonObject({'innerElem':new JsonNumber(4)})})).toString()).toEqual('{"elem": {"innerElem": 4}}');
    });
  });
});
