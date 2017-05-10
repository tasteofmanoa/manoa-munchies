import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { Munchies } from '/imports/api/munchie/MunchieCollection';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Vendor } from '/imports/api/cendor/VendorCollection';


class ReviewCollection extends BaseCollection {

  /*
   * Creates the Munchie collection.
   */

  constructor() {
    super('Munchie', new SimpleSchema({
      username: { type: String },
      comment: { type: [Object], optional: true },
      'comment.$.Title': {
        type: String,
      },
      'comment.$.description': {
        type: String,
      },
      rating: { type: Number, decimal: true, min: 1.0, max: 5.0 },
    }));
  }

  define({ username = '', comment, rating = 0}) {
    // make sure required fields are OK.
    const checkPattern = {
      username: String,
      rating: Number,
      reviews: Number,
    };
    check({ username, rating, favorites }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Vendor`);
    }

    // Throw an error if any of the passed Taste names are not defined.
    return this._collection.insert({ username, comment, rating });
  }
  /*
   * Returns the Vendor name corresponding to the passed Vendor docID.
   * @param vendorID A vendor docID.
   * @returns { String } A vendor name.
   * @throws { Meteor.Error} If the taste docID cannot be found.
   */

  findName(vendorID) {
    this.assertDefined(vendorID);
    return this.findDoc(vendorID).name;
  }

  /*
   * Returns a list of Vendor names corresponding to the passed list of Vendor docIDs.
   * @param vendorIDs A list of Vendor docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(vendorIDs) {
    return vendorIDs.map(vendorID => this.findName(vendorID));
  }

  /*
   * Throws an error if the passed name is not a defined munchie name.
   * @param name The name of a munchie.
   */
  assertName() {
    this.findDoc(Title);
  }

  /**
   * Throws an error if the passed list of names are not all Munchie names.
   * @param names An array of (hopefully) Munchie names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /*
   * Returns the docID associated with the passed Vendor name, or throws an error if it cannot be found.
   * @param { String } name A vendor name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Vendor.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Taste names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of taste names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Taste name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Vendor docID in a format acceptable to define().
   * @param docID The docID of a Vendor.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const comment = doc.comment;
    const rating = doc.rating;
    return { username, comment, rating };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Review = new ReviewCollection();
