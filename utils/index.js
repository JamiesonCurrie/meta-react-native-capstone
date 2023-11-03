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
  phoneNumber.match(/^1[0-9]{10}$/)
);

/*****************************************************************************/

export const getInitials = (first, last) => {
  const fi = first[0] || '';
  const li = last[0]  || '';
  return fi.toUpperCase() + li.toUpperCase();
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
, 'profile_image':          null
};

/*****************************************************************************/
/*****************************************************************************/
