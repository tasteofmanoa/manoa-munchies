import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Tastes.removeAll();
}
