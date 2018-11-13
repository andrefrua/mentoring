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

    var stringifyObjectResult = stringifyObject(simpleObj);
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
 * Converts a JavaScript object into a JSON string.
 *
 * @param {Object} obj - JavaScript object to be converted.
 * @returns A string in JSON format representing the original JavaScript object.
 */
function stringifyObject(obj) {
    // Checks if the object is an array
    var isArray = obj instanceof Array;

    var stringified = "";

    // Iterate through all the properties of the object
    for (var property in obj) {
        // Checks if the property exists in the object, now using the protected method :)
        if (!Object.prototype.hasOwnProperty.call(obj, property)) continue;

        // Converts the object into a stringifiable object
        var value = flattenObject(obj[property]);
        if (value !== undefined) {
            stringified += concatProperty(isArray, property, value);
        }
    }
    // Encloses the object in {} or [] according to it's type and removes unecesseary commas
    return encloseAndCleanString(stringified, isArray);
}

/**
 * Flattens an object converting it to a valid string according to it's object type.
 *
 * @param {Object} obj - Object containing the value.
 * @returns A valid object to be stringidfied, or undefined if the object is not valid.
 */
function flattenObject(obj) {
    // JS primitive values reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
    switch (typeof obj) {
        case "string":
            return addQuotes(obj);
        case "boolean":
        case "number":
            return obj.toString(); //Converts the object to a string.
        case "object":
            if (obj === null) return String(obj); // Casts the object to a string, same as -> "" + obj;
            if (typeof obj.toJSON === "function") {
                // This handles Dates and other custom classes with toJSON function, in other words converts the obj
                // into a stringifiable object
                return flattenObject(obj.toJSON());
            }
            if (typeof obj.valueOf === "function" && isPrimitiveType(obj.valueOf())) {
                return flattenObject(obj.valueOf());
            }
            return stringifyObject(obj);
        case "undefined":
        case "function":
        default:
            return undefined;
    }
}

function isPrimitiveType(obj) {
    return typeof obj === "string" || typeof obj === "boolean" || typeof obj === "number";
}

/********************
 * Utility functions
 ********************/
/**
 * Encloses the received value in quotes.
 *
 * @param {value} value The value that we want to enclose in quotes.
 * @returns The received value enclosed in quotes.
 */
function addQuotes(value) {
    return "\"" + value + "\"";
}

/**
 * Concatenates the property and value. If it's an array the property is discarded.
 *
 * @param {boolean} isArray Flag informing if it's an array.
 * @param {string} property Name of the property.
 * @param {Object} value Object with the value.
 * @returns The concatenated string in the following format "PropertyName: Value"
 */
function concatProperty(isArray, property, value) {
    return (!isArray ? addQuotes(property) + ":" : "") + value + ",";
}

/**
 * Removes the last character in the string if it's a match to the one received.
 *
 * @param {string} str Value where we want to remove a character from.
 * @param {string} char Character that we want to remove from the string.
 * @returns The same string but with the last character removed in case it's a match to the one received.
 */
function removeLastMatchingCharacter(str, char) {
    if (str.slice(str.length - 1) === char) {
        return str.slice(0, str.length - 1);
    }
    return str;
}

/**
 * Encloses the value in [] or {} depending on if it's an Array or an Object.
 *
 * @param {string} str Value to be enclosed.
 * @param {boolean} isArray Flag informing if the object is an array.
 * @returns The string enclosed in adequate characters.
 */
function encloseAndCleanString(str, isArray) {
    var openningChar = isArray ? "[" : "{";
    var closingChar = isArray ? "]" : "}";

    return openningChar + removeLastMatchingCharacter(str, ",") + closingChar;
}
