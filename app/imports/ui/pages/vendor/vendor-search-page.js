import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { Munchies } from '/imports/api/munchie/MunchieCollection';
import { Vendors } from '/imports/api/vendor/VendorCollection';

const selectedTastesKey = 'selectedTastes';

Template.Vendor_Search_Page.onCreated(function onCreated() {
  this.subscribe(Tastes.getPublicationName());
  this.subscribe(Munchies.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Vendors.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedTastesKey, undefined);
});

Template.Vendor_Search_Page.helpers({
  vendors() {
    // Initialize selectedTastes to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedTastesKey)) {
      Template.instance().messageFlags.set(selectedTastesKey, _.map(Tastes.findAll(), taste => taste.name));
    }
    // Find all vendors with the currently selected tastes.
    const allVendors = Vendors.findAll();
    const selectedTastes = Template.instance().messageFlags.get(selectedTastesKey);
    return _.filter(allVendors, vendor => _.intersection(vendor.tastes, selectedTastes).length > 0);
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

Template.Vendor_Search_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedTastesKey, _.map(selectedOptions, (option) => option.value));
  },
});



