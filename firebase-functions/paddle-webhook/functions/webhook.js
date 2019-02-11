const crypto = require('crypto');
const Serialize = require('php-serialize');

function ksort(obj){
    let keys = Object.keys(obj).sort();
    let sortedObj = {};
  
    for (var i in keys) {
      sortedObj[keys[i]] = obj[keys[i]];
    }
  
    return sortedObj;
  }

function validateWebhook(jsonObj, pubKey) {
    const mySig = Buffer.from(jsonObj.p_signature, 'base64');
    delete jsonObj.p_signature;
    // Need to serialize array and assign to data object
    jsonObj = ksort(jsonObj);
    for (var property in jsonObj) {
        if (jsonObj.hasOwnProperty(property) && (typeof jsonObj[property]) !== "string") {
            if (Array.isArray(jsonObj[property])) { // is it an array
                jsonObj[property] = jsonObj[property].toString();
            } else { //if its not an array and not a string, then it is a JSON obj
                jsonObj[property] = JSON.stringify(jsonObj[property]);
            }
        }
    }
    const serialized = Serialize.serialize(jsonObj);
    // End serialize data object
    const verifier = crypto.createVerify('sha1');
    verifier.update(serialized);
    verifier.end();

    return verifier.verify(pubKey, mySig);
}

exports.validate = validateWebhook;