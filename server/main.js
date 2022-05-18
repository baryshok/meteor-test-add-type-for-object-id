import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { ObjectId } from "meteor/ejson-objectid";
import { LinksCollection } from "/imports/api/links";

async function insertLinkWithObjectId({ id, title }) {
  await LinksCollection.rawCollection().insertOne({
    _id: id,
    otherId: id,
    title,
  });
}

function insertLinkWithMongoObjectID({ id, title }) {
  LinksCollection.insert({
    _id: id,
    otherId: id,
    title,
  });
}

Meteor.startup(async () => {
  if (LinksCollection.find().count() === 0) {
    await insertLinkWithObjectId({
      id: new ObjectId("627fe63214294baff02995c4"),
      title: "Follow the Guide",
    });

    insertLinkWithMongoObjectID({
      id: new Mongo.ObjectID("627fe63214294baff02995c5"),
      title: "Read the Docs",
    });
  }
});

function logIdType(id) {
  if (id instanceof ObjectId)
    return console.log('Received "id" is an instance of "ObjectId"');

  if (id instanceof Mongo.ObjectID)
    return console.log('Received "id" is an instance of "Mongo.ObjectID"');

  return console.log(
    'Received "id" is not an instance of "ObjectId" or "Mongo.ObjectID"'
  );
}

Meteor.methods({
  testIdPassthrough(id) {
    logIdType(id);
    return id;
  },

  fetchAllDocsViaMongoCollection() {
    const docs = LinksCollection.find({}).fetch();
    console.log("docs", docs);
    return docs;
  },

  async fetchAllDocsViaRawCollection() {
    const docs = await LinksCollection.rawCollection().find({}).toArray();
    console.log("docs", docs);
    return docs;
  },

  fetchDocByIdViaMongoCollection(id) {
    console.log("id", id);
    const doc = LinksCollection.findOne({ _id: id });
    console.log("doc", doc);
    return doc;
  },

  async fetchDocByIdViaRawCollection(id) {
    console.log("id", id);
    const doc = await LinksCollection.rawCollection().findOne({ _id: id });
    console.log("doc", doc);
    return doc;
  },
});

Meteor.publish("allDocs", () => {
  return LinksCollection.find({});
});

Meteor.publish("docById", (id) => {
  return LinksCollection.find({ _id: id });
});
