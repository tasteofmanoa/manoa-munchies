import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { Munchies } from '/imports/api/munchie/MunchieCollection';
import { Vendors } from '/imports/api/vendor/VendorCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Tastes.removeAll();
  Munchies.removeAll();
  Vendors.removeAll();
}
