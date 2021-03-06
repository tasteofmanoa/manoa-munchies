import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

const selectedTastesKey = 'selectedTastes';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Tastes.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedTastesKey, undefined);
});

Template.Filter_Page.helpers({
  profiles() {
    // Initialize selectedTastes to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedTastesKey)) {
      Template.instance().messageFlags.set(selectedTastesKey, _.map(Tastes.findAll(), taste => taste.name));
    }
    // Find all profiles with the currently selected tastes.
    const allProfiles = Profiles.findAll();
    const selectedTastes = Template.instance().messageFlags.get(selectedTastesKey);
    return _.filter(allProfiles, profile => _.intersection(profile.tastes, selectedTastes).length > 0);
  },

  tastes() {
    return _.map(Tastes.findAll(),
        function makeTasteObject(taste) {
          return {
            label: taste.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedTastesKey), taste.name),
          };
        });
  },
});

Template.Filter_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedTastesKey, _.map(selectedOptions, (option) => option.value));
  },
});
