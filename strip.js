let stripDebug = require('strip-debug');
let fs = require('fs')

let output ="";

let global_data = fs.readFileSync("./dist/main.e6ce0a9393eae41feceb.bundle.js").toString();


output = stripDebug(global_data).toString();


fs.writeFile("./dist/main.test.js", output, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
