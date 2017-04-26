import { Tastes } from '/imports/api/taste/TasteCollection';
import { Munchies } from '/imports/api/munchie/MunchieCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Tastes.publish();
Munchies.publish();
Profiles.publish();

