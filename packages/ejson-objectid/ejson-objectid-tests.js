// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by ejson-objectid.js.
import { name as packageName } from "meteor/ejson-objectid";

// Write your tests here!
// Here is an example.
Tinytest.add("ejson-objectid - example", function (test) {
  test.equal(packageName, "ejson-objectid");
});
