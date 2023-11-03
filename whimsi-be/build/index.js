const express = require('express');
const bodyParser = require('body-parser');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerSpec = require('./swagger');
const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});
expressJSDocSwagger(app)(swaggerSpec);
const routes = require('./routes');
routes(app);
app.listen(port);
console.log(`Todo app REST API server started on: ${port}`);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsImJvZHlQYXJzZXIiLCJleHByZXNzSlNEb2NTd2FnZ2VyIiwic3dhZ2dlclNwZWMiLCJhcHAiLCJwb3J0IiwidXNlIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsInJlcSIsInJlcyIsIm5leHQiLCJoZWFkZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IGV4cHJlc3NKU0RvY1N3YWdnZXIgPSByZXF1aXJlKCdleHByZXNzLWpzZG9jLXN3YWdnZXInKTtcblxuY29uc3Qgc3dhZ2dlclNwZWMgPSByZXF1aXJlKCcuL3N3YWdnZXInKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IDgwODA7XG5cbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogdHJ1ZX0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdFwiKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ0dFVCwgUE9TVCwgREVMRVRFJyk7XG4gICAgbmV4dCgpO1xufSk7XG5cbmV4cHJlc3NKU0RvY1N3YWdnZXIoYXBwKShzd2FnZ2VyU3BlYylcblxuY29uc3Qgcm91dGVzID0gcmVxdWlyZSgnLi9yb3V0ZXMnKTtcblxucm91dGVzKGFwcCk7XG5cbmFwcC5saXN0ZW4ocG9ydCk7XG5cbmNvbnNvbGUubG9nKGBUb2RvIGFwcCBSRVNUIEFQSSBzZXJ2ZXIgc3RhcnRlZCBvbjogJHtwb3J0fWApO1xuIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDbEMsTUFBTUMsVUFBVSxHQUFHRCxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQ3pDLE1BQU1FLG1CQUFtQixHQUFHRixPQUFPLENBQUMsdUJBQXVCLENBQUM7QUFFNUQsTUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsV0FBVyxDQUFDO0FBRXhDLE1BQU1JLEdBQUcsR0FBR0wsT0FBTyxDQUFDLENBQUM7QUFDckIsTUFBTU0sSUFBSSxHQUFHLElBQUk7QUFFakJELEdBQUcsQ0FBQ0UsR0FBRyxDQUFDTCxVQUFVLENBQUNNLFVBQVUsQ0FBQztFQUFDQyxRQUFRLEVBQUU7QUFBSSxDQUFDLENBQUMsQ0FBQztBQUNoREosR0FBRyxDQUFDRSxHQUFHLENBQUNMLFVBQVUsQ0FBQ1EsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMxQkwsR0FBRyxDQUFDRSxHQUFHLENBQUMsVUFBU0ksR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtFQUM3QkQsR0FBRyxDQUFDRSxNQUFNLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDO0VBQzlDRixHQUFHLENBQUNFLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSxnREFBZ0QsQ0FBQztFQUM1RkYsR0FBRyxDQUFDRSxNQUFNLENBQUMsOEJBQThCLEVBQUUsbUJBQW1CLENBQUM7RUFDL0RELElBQUksQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDQUFDO0FBRUZWLG1CQUFtQixDQUFDRSxHQUFHLENBQUMsQ0FBQ0QsV0FBVyxDQUFDO0FBRXJDLE1BQU1XLE1BQU0sR0FBR2QsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVsQ2MsTUFBTSxDQUFDVixHQUFHLENBQUM7QUFFWEEsR0FBRyxDQUFDVyxNQUFNLENBQUNWLElBQUksQ0FBQztBQUVoQlcsT0FBTyxDQUFDQyxHQUFHLENBQUUsd0NBQXVDWixJQUFLLEVBQUMsQ0FBQyJ9