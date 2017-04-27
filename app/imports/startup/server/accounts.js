import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '/imports/api/profile/ProfileCollection';

/* eslint-disable no-console */

/* Create a profile document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    const username = user.services.cas.id;
    const picture = '/images/default-profile-picture.jpg';
    if (!Profiles.isDefined(username)) {
      Profiles.define({ username, picture });
    }
  }
  // All UH users are valid for BowFolios.
  return true;
});
