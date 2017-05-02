import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Munchie */

/**
 * Munchies provide food and time data for a user.
 * @extends module:Base~BaseCollection
 */

class MunchieCollection extends BaseCollection {

  /**
   * Creates the Munchie collection.
   */
  constructor() {
    super('Munchie', new SimpleSchema({
      name: { type: String, optional: true },
      vendor: { type: String, optional: true },
      description: { type: String, optional: true },
      available: { type: [Object], optional: true },
      "available.$.day": {
        type: Number,
        min: 1,
        max: 7
      },
      "available.$.start": {
        type: String,
      },
      "available.$.end": {
        type: String,
      },
      tastes: { type: [String], optional: true },
      location: { type: String, optional: true },
      rating: { type: Number, decimal: true, optional: true, min: 1.0, max: 5.0 },
      favorites: { type: Number, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      reviews: { type: Number, optional: true}
    }));
  }

  /**
   * Defines a new Munchie.
   * @example
   * Munchies.define({ name: 'Orange Chicken',
                       vendor: 'Panda Express',
                       description: 'Sweet and savory citrus chicken goodness',
                       available: ,
                       tastes: { type: [String], optional: true },
                       location: { type: String, optional: true },
                       picture: { type: SimpleSchema.RegEx.Url, optional: true }
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Tastes is an array of defined tastes names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more tastes are not defined, or if facbeook and instagram are not URLs.
   * @returns The newly created docID.
   */

  define({ name = '', vendor = '', description = '', available, tastes, location = '', rating = 0, favorites = 0, picture = '', reviews = 0}) {
    // make sure required fields are OK.
    const checkPattern = {
      name: String,
      vendor: String,
      description: String,
      location: String,
      rating: Number,
      favorites: Number,
      picture: String,
      reviews: Number
    };
    check({ name, vendor, description, location, rating, favorites, picture, reviews }, checkPattern);

    if (this.find({ name, vendor }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Munchie of the same ${vendor}`);
    }

    // Throw an error if any of the passed Taste names are not defined.
    Tastes.assertNames(tastes);
    return this._collection.insert({ name, vendor, description, available, tastes, location, rating, favorites, picture, reviews });
  }

  /**
   * Returns the Munchie name corresponding to the passed Munchie docID.
   * @param munchieID A munchie docID.
   * @returns { String } An taste name.
   * @throws { Meteor.Error} If the taste docID cannot be found.
   */
  findName(munchieID) {
    this.assertDefined(munchieID);
    return this.findDoc(munchieID).name;
  }

  /**
   * Returns a list of Munchie names corresponding to the passed list of Munchie docIDs.
   * @param munchieIDs A list of Munchie docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(munchieIDs) {
    return munchieIDs.map(munchieID => this.findName(munchieID));
  }

  /**
   * Throws an error if the passed name is not a defined munchie name.
   * @param name The name of a munchie.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Munchie names.
   * @param names An array of (hopefully) Munchie names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Munchie name, or throws an error if it cannot be found.
   * @param { String } name A munchie name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Munchie.
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
   * Returns an object representing the Munchie docID in a format acceptable to define().
   * @param docID The docID of a Munchie.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const vendor = doc.vendor;
    const description = doc.description;
    const available = doc.available;
    const tastes = doc.tastes;
    const location = doc.location;
    const rating = doc.rating;
    const favorites = doc.favorites;
    const picture = doc.picture;
    const reviews = doc.reviews;
    return { name, vendor, description, available, tastes, location, rating, favorites, picture, reviews };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Munchies = new MunchieCollection();
