var needle = require('needle');


 var data = {
        "username":"ttfsss56",
        "password":"asddfsdfs",
        "grant_type": "password"


    }

    var auth = "Basic " + new Buffer("1489446233355" + ":" + "H1-DSs4il").toString("base64");
    var authbearer = "Bearer " + "6b6d2160-0841-11e7-a642-d3314bc452ef";

   var options={
      headers: { 'Authorization': auth},
       json: true

   }

   var optionsbearer={
      headers: { 'Authorization': authbearer},
       json: true

   }


// needle.post("http://localhost:3000/user/registeruser", data, {
//         json: true
//     }, function(err, resp, body) {
//         if (err) return res.send("ERROR");
//         console.log(body);
//     });


// needle.post("http://localhost:3000/oauth/token", data,options, function(err, resp, body) {
//          if (err) return res.send("ERROR");
//          console.log(body);
//      });


 needle.post("http://localhost:3000/api/v1/protect", data,optionsbearer, function(err, resp, body) {
         if (err) return res.send("ERROR");
         console.log(body);
    });