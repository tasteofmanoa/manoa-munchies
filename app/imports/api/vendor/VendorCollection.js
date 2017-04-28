import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { Munchies } from '/imports/api/munchie/MunchieCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Vendor */

/**
 * Vendors provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class VendorCollection extends BaseCollection {

  /**
   * Creates the Vendor collection.
   */
  constructor() {
    super('Vendor', new SimpleSchema({
      vusername: { type: String},
      name: { type: String, optional: true },
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
      munchies: { type: [String], optional: true },
      tastes: { type: [String], optional: true },
      location: { type: String, optional: true },
      rating: { type: Number, decimal: true, optional: true, min: 1.0, max: 5.0 },
      favorites: { type: Number, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      reviews: { type: Number, optional: true}
    }));
  }

  /**
   * Defines a new Vendor.
   * @example
   * Vendors.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   tastes: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Tastes is an array of defined tastes names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more tastes are not defined, or if facbeook and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ vusername = '', name = '', description = '', available, munchies, tastes, location = '', rating = 0, favorites = 0, picture = '', reviews = 0}) {
    // make sure required fields are OK.
    const checkPattern = {
      vusername: String,
      name: String,
      description: String,
      location: String,
      rating: Number,
      favorites: Number,
      picture: String,
      reviews: Number
    };
    check({ vusername, name, description, location, rating, favorites, picture, reviews }, checkPattern);

    if (this.find({ vusername }).count() > 0) {
      throw new Meteor.Error(`${vusername} is previously defined in another Vendor`);
    }

    // Throw an error if any of the passed Taste names are not defined.
    Tastes.assertNames(tastes);
    Munchies.assertNames(munchies);
    return this._collection.insert({  vusername, name, description, available, munchies, tastes, location, rating, favorites, picture, reviews });
  }

  /**
   * Returns an object representing the Vendor docID in a format acceptable to define().
   * @param docID The docID of a Vendor.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const vusername = doc.vusername;
    const name = doc.name;
    const description = doc.description;
    const available = doc.available;
    const munchies = doc.munchies;
    const tastes = doc.tastes;
    const location = doc.location;
    const rating = doc.rating;
    const favorites = doc.favorites;
    const picture = doc.picture;
    const reviews = doc.reviews;
    return { vusername, name, description, available, munchies, tastes, location, rating, favorites, picture, reviews };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Vendors = new VendorCollection();
