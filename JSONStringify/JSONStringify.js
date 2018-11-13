var btnStringify = document.getElementById("btnStringify");
var btnGetJSTypes = document.getElementById("btnGetJSTypes");

var lblResult = document.getElementById("lblResult");
var lblResultJSONStringify = document.getElementById("lblResultJSONStringify");
var lblStatus = document.getElementById("lblStatus");

btnStringify.onclick = function () {
    var simpleObj = {
        id: 14
        , name: "Object 1"
        , creationDate: "01/10/2018"
        , arrayOfNumbers: [14, 24, 34, 44]
        , arrayOfStrings: ["Dog", "Cat", "Horse", "Cow"]
        , childObject: {
            id: 24
            , name: "Object 2"
            , creationDate: "02/10/2018"
            , arrayOfNumbers: [56, 48, 43.5, 87.4]
            , grandChildObject: {
                id: 24
                , name: "Object 3"
                , creationDate: "03/10/2018"
            }
        }
        , arrayOfObjects: [
            { id: 55, name: "Object in array 1" }
            , { id: 56, name: "Object in array 2" }
            , { id: 57, name: "Object in array 3" }
            , { id: 58, name: "Object in array 4" }
        ]
        , undefinedType: undefined
        , nullType: null
        , functionType: function () { return ""; }
        , dateType: new Date(2018, 10, 12)
        , booleanType: true
        , symbolType: Symbol('test')
        , numberType: new Number(23)
        , stringType: new String("TESTING")
        , numberType2: Number("45")
    }

    var stringifyObjectResult = stringify(simpleObj);
    var JSONStringifyResult = JSON.stringify(simpleObj);

    lblResult.innerText = stringifyObjectResult;
    lblResultJSONStringify.innerText = JSONStringifyResult;

    if (stringifyObjectResult === JSONStringifyResult) {
        lblStatus.innerText = "CORRECT";
        lblStatus.classList.add("correct");
    } else {
        lblStatus.innerText = "INCORRECT";
        lblStatus.classList.add("incorrect");
    }
}

/**
 * Serializes a JavaScript value as a JSON string.
 * 
 * The value `undefined` is returned when there is no JSON representation for the value.
 *
 * @param {*} value - The JavaScript value.
 * @return {string|undefined} A JSON string or `undefined`.
 */
function stringify(value) {
    // JS primitive values reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
    switch (typeof value) {
        case "string":
            return stringifyString(value);

        case "boolean":
        case "number":
            return value.toString(); //Converts the object to a string.

        case "object":
            if (value === null) return String(value); // Casts the object to a string, same as -> "" + obj;
            
            if (typeof value.toJSON === "function") {
                // This handles Dates and other custom classes with toJSON function, in other words converts the obj
                // into a stringifiable object
                return stringify(value.toJSON());
            }

            if(value instanceof Object) {
                var value2 = value.valueOf();
                // Was a distinct, more primitve value returned? 
                if(value2 !== value) {
                    return stringify(value2);
                }
            }
            
            return stringifyObject(value);

        case "undefined":
        case "function":
        default:
            return undefined;
    }
}


var O_hasOwn = Object.prototype.hasOwnProperty;

/**
 * Converts a JavaScript object into a JSON string.
 *
 * @param {object} obj - JavaScript object to be converted.
 * @return {string} A string in JSON format representing the original JavaScript object.
 */
function stringifyObject(obj) {
    // Checks if the object is an array.
    var isArray = obj instanceof Array;

    var props = [];

    // Iterate through all the properties of the object.
    for (var property in obj) {
        // Checks if the property exists in the object, now using the protected method :)
        if (!O_hasOwn.call(obj, property)) continue;

        // Converts the property value to a JSON string.
        var value = stringify(obj[property]);
        if (value !== undefined) {
            props.push(concatProperty(isArray, property, value));
        }
    }

    // Encloses the object in {} or [] according to it's type.
    return encloseObject(props.join(","), isArray);
}

/**
 * Serializes a given JavaScript string as a JSON string.
 *
 * @param {string} value - The string to serialize.
 * 
 * @return {string} The JSON string.
 */
function stringifyString(value) {
    return "\"" + value + "\"";
}

/********************
 * Utility functions
 ********************/

/**
 * Concatenates the property and value. If it's an array the property is discarded.
 *
 * Returns a string with the format `"PropertyName: Value"`.
 * 
 * @param {boolean} isArray - Indicates if it is an array property.
 * @param {string} property - The name of the property.
 * @param {string} value - The JSON serialization of the value.
 * 
 * @return {string} The concatenated property and value.
 */
function concatProperty(isArray, property, value) {
    return (!isArray ? stringifyString(property) + ":" : "") + value;
}

/**
 * Encloses the JSON contents of an object.
 *
 * @param {string} str - The object's contents as a JSON string.
 * @param {boolean} isArray - Indicates if the object is an array.
 * 
 * @return {string} The enclosed object.
 */
function encloseObject(str, isArray) {

    var openningChar = isArray ? "[" : "{";
    var closingChar = isArray ? "]" : "}";

    return openningChar + str + closingChar;
}