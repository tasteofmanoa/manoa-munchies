/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Munchies } from '/imports/api/profile/MunchieCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('MunchieCollection', function testSuite() {
    const tasteName = 'Software Engineering';
    const tasteDescription = 'Tools for software development';
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const username = 'johnson';
    const bio = 'I have been a professor of computer science at UH since 1990.';
    const tastes = [tasteName];
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const title = 'Professor Computer Science';
    const facebook = 'http://github.com/philipjohnson';
    const instagram = 'http://github.com/philipjohnson';
    const defineObject = { firstName, lastName, username, bio, tastes, picture, title, facebook, instagram };

    before(function setup() {
      removeAllEntities();
      // Define a sample taste.
      Tastes.define({ name: tasteName, description: tasteDescription });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Munchies.define(defineObject);
      expect(Munchies.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Munchies.findDoc(docID);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.username).to.equal(username);
      expect(doc.bio).to.equal(bio);
      expect(doc.tastes[0]).to.equal(tasteName);
      expect(doc.picture).to.equal(picture);
      expect(doc.title).to.equal(title);
      expect(doc.facebook).to.equal(facebook);
      expect(doc.instagram).to.equal(instagram);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { Munchies.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Munchie.
      const dumpObject = Munchies.dumpOne(docID);
      Munchies.removeIt(docID);
      expect(Munchies.isDefined(docID)).to.be.false;
      docID = Munchies.restoreOne(dumpObject);
      expect(Munchies.isDefined(docID)).to.be.true;
      Munchies.removeIt(docID);
    });
  });
}

