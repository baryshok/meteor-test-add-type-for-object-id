Package.describe({
  name: "ejson-objectid",
  version: "0.0.1",
  // Brief, one-line summary of the package.
  summary: "",
  // URL to the Git repository containing the source code for this package.
  git: "",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: "README.md",
});

Package.onUse(function (api) {
  api.versionsFrom("2.6");
  api.use(["ecmascript", "ejson"]);
  api.use("mongo", "server");
  api.mainModule("ejson-objectid_client.js", "client");
  api.mainModule("ejson-objectid_server.js", "server");
});

Npm.depends({
  bson: "4.6.3",
});
