import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Munchies } from '/imports/api/munchie/MunchieCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

const selectedTastesKey = 'selectedTastes';

Template.Search_Results_Page.onCreated(function onCreated() {
  this.subscribe(Tastes.getPublicationName());
  this.subscribe(Munchies.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedTastesKey, undefined);
});

Template.Search_Results_Page.helpers({
  munchies() {
    // Initialize selectedTastes to user tastes if messageFlags is undefined.
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    if (!Template.instance().messageFlags.get(selectedTastesKey)) {
      Template.instance().messageFlags.set(selectedTastesKey, profile.tastes);
    }
    // Find all munchies with the currently selected tastes.
    const allMunchies = Munchies.findAll();
    const selectedTastes = Template.instance().messageFlags.get(selectedTastesKey);
    return _.filter(allMunchies, munchie => _.intersection(munchie.tastes, selectedTastes).length > 0);
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

Template.Search_Results_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedTastesKey, _.map(selectedOptions, (option) => option.value));
  },
});


