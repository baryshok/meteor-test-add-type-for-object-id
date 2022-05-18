import React from "react";
import { Mongo } from "meteor/mongo";
import { ObjectId } from "meteor/ejson-objectid";
import { useTracker } from "meteor/react-meteor-data";
import { LinksCollection } from "/imports/api/links";

export const Hello = () => {
  useTracker(() => {
    const docs = LinksCollection.find({}).fetch();
    console.log("Docs", docs);
  });

  const testObjectIdPassthrough = () => {
    const id = new ObjectId();

    Meteor.call("testIdPassthrough", id, (_, result) => {
      console.log(
        "Is received ObjectId value equal to the sent one?",
        id.equals(result)
      );
    });
  };

  const testMongoObjectIdPassthrough = () => {
    const id = new Mongo.ObjectID();

    Meteor.call("testIdPassthrough", id, (_, result) => {
      console.log(
        "Is received Mongo.ObjectID value equal to the sent one?",
        id.equals(result)
      );
    });
  };

  const fetchAllDocsViaMongoCollection = () => {
    Meteor.call("fetchAllDocsViaMongoCollection", (_, result) => {
      console.log("docs", result);
    });
  };

  const fetchAllDocsViaRawCollection = () => {
    Meteor.call("fetchAllDocsViaRawCollection", (_, result) => {
      console.log("docs", result);
    });
  };

  const fetchDocByObjectIdViaMongoCollection = () => {
    const id = new ObjectId("627fe63214294baff02995c4");

    Meteor.call("fetchDocByIdViaMongoCollection", id, (_, result) => {
      console.log("doc", result);
    });
  };

  const fetchDocByMongoObjectIdViaMongoCollection = () => {
    const id = new Mongo.ObjectID("627fe63214294baff02995c5");

    Meteor.call("fetchDocByIdViaMongoCollection", id, (_, result) => {
      console.log("doc", result);
    });
  };

  const fetchDocByObjectIdViaRawCollection = () => {
    const id = new ObjectId("627fe63214294baff02995c4");

    Meteor.call("fetchDocByIdViaRawCollection", id, (_, result) => {
      console.log("doc", result);
    });
  };

  const fetchDocByMongoObjectIdViaRawCollection = () => {
    const id = new Mongo.ObjectID("627fe63214294baff02995c5");

    Meteor.call("fetchDocByIdViaRawCollection", id, (_, result) => {
      console.log("doc", result);
    });
  };

  const subscribeToAllDocs = () => {
    const handle = Meteor.subscribe("allDocs", () => {
      handle.stop();
    });
  };

  const subscribeToDocByMongoObjectId = () => {
    const id = new Mongo.ObjectID("627fe63214294baff02995c4");
    const handle = Meteor.subscribe("docById", id, () => {
      handle.stop();
    });
  };

  const subscribeToDocByObjectId = () => {
    const id = new ObjectId("627fe63214294baff02995c4");
    const handle = Meteor.subscribe("docById", id, () => {
      handle.stop();
    });
  };

  return (
    <div>
      <h3>Methods</h3>
      <button onClick={testObjectIdPassthrough}>
        Test ObjectId passthrough with a Method
      </button>
      <br />
      <br />
      <button onClick={testMongoObjectIdPassthrough}>
        Test Mongo.ObjectID passthrough with a Method
      </button>
      <br />
      <br />
      <button onClick={fetchAllDocsViaMongoCollection}>
        Fetch all docs via Mongo.Collection
      </button>
      <br />
      <br />
      <button onClick={fetchAllDocsViaRawCollection}>
        Fetch all docs via rawCollection)
      </button>
      <br />
      <br />
      <button onClick={fetchDocByObjectIdViaMongoCollection}>
        Fetch doc by "_id" (ObjectId + Mongo.Collection)
      </button>
      <br />
      <br />
      <button onClick={fetchDocByMongoObjectIdViaMongoCollection}>
        Fetch doc by "_id" (Mongo.ObjectID + Mongo.Collection)
      </button>
      <br />
      <br />
      <button onClick={fetchDocByObjectIdViaRawCollection}>
        Fetch doc by "_id" (ObjectId + rawCollection)
      </button>
      <br />
      <br />
      <button onClick={fetchDocByMongoObjectIdViaRawCollection}>
        Fetch doc by "_id" (Mongo.ObjectID + rawCollection)
      </button>
      <br />
      <br />
      <hr />
      <h3>Subscriptions</h3>
      <button onClick={subscribeToAllDocs}>Subscribe to all docs</button>
      <br />
      <br />
      <button onClick={subscribeToDocByMongoObjectId}>
        Subscribe to doc by "_id" (Mongo.ObjectID)
      </button>
      <br />
      <br />
      <button onClick={subscribeToDocByObjectId}>
        Subscribe to doc by "_id" (ObjectId)
      </button>
    </div>
  );
};
