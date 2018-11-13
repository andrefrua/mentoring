var btnRunMapFunction = document.getElementById("btnRunMapFunction");

var lblResultDefaultMap = document.getElementById("lblResultDefaultMap");
var lblResultCustomMap = document.getElementById("lblResultCustomMap");
var lblStatus = document.getElementById("lblStatus");

btnRunMapFunction.onclick = function () {
    // This affects the way the scope works. If non use strict is in place then the `this` reaching the function will be
    // the window variable. Using the strict mode the `this` if not provided will be set to `undefined`
    "use string";

    var sampleArr = [1, 2, 3, 4];

    var myThis = {
        multiplier: 3,
        mode: "multiply", // multiply
        callback: function(element, index, arr) {
            if(this.mode === "multiply") {
                return element * this.multiplier;
            }
            return element;
        }
    }

    var defaultMAPResult = simpleMap(sampleArr, myThis.callback, myThis);
    // TODO: How to send myThis into the default map function
    var customMAPResult = sampleArr.map(function(element) {
        return element * 3;
    });

    lblResultDefaultMap.innerText = defaultMAPResult;
    lblResultCustomMap.innerText = customMAPResult;

    if (JSON.stringify(defaultMAPResult) === JSON.stringify(customMAPResult)) {
        lblStatus.innerText = "CORRECT";
        lblStatus.classList.add("correct");
    } else {
        lblStatus.innerText = "INCORRECT";
        lblStatus.classList.add("incorrect");
    }
}



function simpleMap(arr, fun, scope) {
    var L = arr.length;
    var out = new Array(L);

    //fun = fun.bind(this);

    for (var i = 0; i < L; i++) {
      if (i in arr) {
        //out[i] = fun(arr[i], i, arr);
        //out[i] = fun.call(null, arr[i], i, arr);
        out[i] = fun.call(scope, arr[i], i, arr);
        //out[i] = fun.apply(scope, [arr[i], i, arr]);
        //out[i] = fun.apply(scope, arguments);
      }
    }

    return out;
  }
