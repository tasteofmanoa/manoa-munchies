import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';


/*                        LANDING ROUTE                       */


export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});

/*                        FOOTER ROUTE                       */




/*                        DIRECTORY ROUTE                       */


function addDirectoryBodyClass() {
  $('body').addClass('directory-page-body');
}

function removeDirectoryBodyClass() {
  $('body').removeClass('directory-page-body');
}

export const directoryPageRouteName = 'Directory_Page';
FlowRouter.route('/directory', {
  name: directoryPageRouteName,
  action() {
    BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
  },
  triggersEnter: [addDirectoryBodyClass],
  triggersExit: [removeDirectoryBodyClass],
});


/*                        USER ROUTES                      */


function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const userProfilePageRouteName = 'User_Profile_Page';
userRoutes.route('/user-profile', {
  name: userProfilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: userProfilePageRouteName });
  },
});


export const filterPageRouteName = 'Filter_Page';
userRoutes.route('/filter', {
  name: filterPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterPageRouteName });
  },
});

export const vendorPageRouteName = 'Vendor_Profile_Page';
userRoutes.route('/vendor', {
  name: vendorPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: vendorPageRouteName });
  },
});

export const vendorProfilePageRouteName = 'Vendor_Page';
userRoutes.route('/vendor-profile', {
  name: vendorProfilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: vendorProfilePageRouteName });
  },
});

export const homePageRouteName = 'User_Home_Page';
userRoutes.route('/home', {
  name: homePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: homePageRouteName });
  },
});

export const feedPageRouteName = 'User_Feed_Page';
userRoutes.route('/search', {
  name: feedPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: feedPageRouteName });
  },
});

/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
