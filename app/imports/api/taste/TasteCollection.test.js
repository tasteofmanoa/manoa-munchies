import { Tastes } from '/imports/api/taste/TasteCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('TasteCollection', function testSuite() {
    const name = 'Software Engineering';
    const description = 'Tools and techniques for team-based development of high quality software systems';
    const defineObject = { name, description };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Tastes.define(defineObject);
      expect(Tastes.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Tastes.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Tastes.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Taste.
      const dumpObject = Tastes.dumpOne(docID);
      Tastes.removeIt(docID);
      expect(Tastes.isDefined(docID)).to.be.false;
      docID = Tastes.restoreOne(dumpObject);
      expect(Tastes.isDefined(docID)).to.be.true;
      Tastes.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Tastes.define(defineObject);
      expect(Tastes.isDefined(docID)).to.be.true;
      const docID2 = Tastes.findID(name);
      expect(docID).to.equal(docID2);
      Tastes.findIDs([name, name]);
      Tastes.removeIt(docID);
    });
  });
}

