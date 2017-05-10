import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

class ReviewCollection extends BaseCollection {

  /*
   * Creates the Review collection.
   */

  constructor() {
    super('Review', new SimpleSchema({
      username: { type: String, optional: true },
      munchie: { type: String, optional: true },
      vendor: { type: String, optional: true },
      comment: { type: Object, optional: true },
      'comment.$.title': {
        type: String,
      },
      'comment.$.description': {
        type: String,
      },
      rating: { type: Number, decimal: true, min: 1.0, max: 5.0 },
    }));
  }

  define({ username = '', munchie = '', vendor = '', comment, rating = 0 }) {
    // make sure required fields are OK.
    const checkPattern = {
      username: String,
      munchie: String,
      vendor: String,
      rating: Number,
    };
    check({ username, munchie, vendor, rating }, checkPattern);

    // Throw an error if any of the passed Taste names are not defined.
    return this._collection.insert({ username, munchie, vendor, comment, rating });
  }

  /*
   * Returns the review name corresponding to the passed review docID.
   * @param reviewID A review docID.
   * @returns { String } A review name.
   * @throws { Meteor.Error} If the taste docID cannot be found.
   */

  findName(reviewID) {
    this.assertDefined(reviewID);
    return this.findDoc(reviewID).name;
  }

  /*
   * Returns a list of review names corresponding to the passed list of review docIDs.
   * @param reviewIDs A list of review docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(reviewIDs) {
    return reviewIDs.map(reviewID => this.findName(reviewID));
  }

  /*
   * Throws an error if the passed name is not a defined review name.
   * @param name The name of a review.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all review names.
   * @param names An array of (hopefully) review names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /*
   * Returns the docID associated with the passed review name, or throws an error if it cannot be found.
   * @param { String } name A review name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an review.
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
   * Returns an object representing the review docID in a format acceptable to define().
   * @param docID The docID of a review.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const munchie = doc.munchie;
    const vendor = doc.vendor;
    const comment = doc.comment;
    const rating = doc.rating;
    return { username, munchie, vendor, comment, rating };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Reviews = new ReviewCollection();
