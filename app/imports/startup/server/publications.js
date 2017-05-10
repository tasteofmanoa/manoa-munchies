import { Tastes } from '/imports/api/taste/TasteCollection';
import { Munchies } from '/imports/api/munchie/MunchieCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Vendors } from '/imports/api/vendor/VendorCollection';
import { Reviews } from '/imports/api/review/ReviewCollection';

Tastes.publish();
Munchies.publish();
Profiles.publish();
Vendors.publish();
Reviews.publish();
