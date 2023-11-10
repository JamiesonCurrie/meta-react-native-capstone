/*****************************************************************************/
/*****************************************************************************/

export const validateEmail = (email) => (
  email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
);

export const validateName = (name) => (
  name.match(/^[A-Za-z]+$/)
);

export const validatePhoneNumber = (phoneNumber) => (
  phoneNumber.match(/^[1-9][0-9]{9}$/)
);

/*****************************************************************************/

export const getInitials = (first, last) => {
  const fi = (first) ? first[0].toUpperCase() : '';
  const li = (last)  ? last[0].toUpperCase()  : '';
  return fi + li;
};

/*****************************************************************************/

export const blankProfile = {
  'firstname':              ''
, 'lastname':               ''
, 'phone_number':           ''
, 'email':                  ''
, 'email_orders':           true
, 'email_password_changes': true
, 'email_specials':         true
, 'email_newsletter':       true
, 'profile_image':          ''
};

export const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

/*****************************************************************************/
/*****************************************************************************/
