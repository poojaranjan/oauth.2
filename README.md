# oauth.2
This is an Oauth 2 implementation using Node.js and Mongodb. Implemeation would be improved supporting all kinds of grant types. To make it work, you need a Mongodb instance. 

# Steps to Install
* Clone the project
* Go to Home directory of project and  run 
  * **npm install**
* Start the App
  * **npm start**

# Curl to test it
* Register user
  * **curl -i -X POST -H "Content-Type:application/json" http://localhost:3000/user/registeruser -d '{"username":"test","password":"test123"}'**
* Get token
  * **curl -i -X POST -u clientid:clientsecret -H "Content-Type:application/json" http://localhost:3000/oauth/token -d '{"username":"ttfssasccds56","password":"asddfsdfs","grant_type": "password"}'**
* Test protected API
  * **curl -i -X POST -H "Authorization:Bearer accesstoken" -H "Content-Type:application/json" http://localhost:3000/api/v1/protect**





