const getIEVersion = function() {
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf('MSIE ');
  let version;
  let ie;

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer, return version number
    ie = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
    version = ie || 11;
  } else {
    // If another browser, return 0
    // alert('otherbrowser');
    version = 0;
  }

  // Detect microsoft edge
  if (/Edge/.test(navigator.userAgent)) {
    version = 12;
  }

  return version;
};

export default getIEVersion;
