import { EJSON } from "meteor/ejson";
import { MongoInternals } from "meteor/mongo";

const ObjectId = MongoInternals.NpmModule.ObjectID;

ObjectId.prototype.typeName = function () {
  return "ObjectId";
};

ObjectId.prototype.toJSONValue = function () {
  return this.toJSON();
};

ObjectId.prototype.clone = function () {
  return new ObjectId(this);
};

EJSON.addType("ObjectId", function fromJSONValue(json) {
  return new ObjectId(json);
});

export { ObjectId };
