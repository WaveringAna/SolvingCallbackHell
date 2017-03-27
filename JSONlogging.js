var timestamp = require('./timestamp.js')

var fs = require('fs');

module.exports = function(method, obj) {
    if (method === "block") {
        /*fs.readFile("./logs/blocks.json", 'utf8', function readFileCallback(err, data) {
            if (err) {
                if (err.code === "ENOENT") {
                    var array = [];
                    array[0] = obj;
                    fs.writeFile("./logs/blocks.json", JSON.stringify(array), function(err) {
                        if (err)
                            console.log("Error creating blocks.json: " + err);
                    })
                } else {
                    console.log("Error reading blocks.json: " + err);
                }
            } else {
                var old = JSON.parse(data);
                old.push(obj);

                fs.writeFile("./logs/blocks.json", JSON.stringify(old), function writeFileCallback(err) {
                    if (err) console.log("Error updating blocks.json: " + err)
                })
            }
        })*/

        fs.readFile('./logs/blocks.json', 'utf8', updateBlocksJSON);  //After reading blocks.json, go to updateBlocksJSON() either with an error or the JSON

        function updateBlocksJSON(err, data) {
            if (err) {
                if (err.code === "ENOENT") {  //Oh oh, the file didn't exist, lets create one instead
                    createBlocksJSON(obj)
                } else {
                    console.log("["+timestamp()+"]" + err)  //The error was something else, lets log it since logging isn't that important to kill the process for
                }
            }

            var object = JSON.parse(data)
            object.push(obj)

            fs.writeFile('./logs/blocks.json', JSON.stringify(object), done)  //Rewrite blocks.json with the new JSON and then go to done()
        }

        function createBlocksJSON(data) {
            fs.writeFile("./logs/blocks.json", JSON.stringify(data), done)   //Create blocks.json then go to done()
        }

        function done(err) {
          if (err) console.log(err)   //There was an error writing blocks.json, log it
          console.log("["+timestamp()+"] Done updating logs/blocks.json") //We're done! See how you can easily read it top to down clearly compared to the messy code above?
        }
    }
}
