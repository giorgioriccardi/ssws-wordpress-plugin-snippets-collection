import getIEVersion from './utils/getIE';

/**
 * Sets the ie class on the body. This is required for the
 * CSS grid mixing fallback to work properly.
 * @return {[type]} [description]
 */
export default function() {
  if (getIEVersion() > 0) {
    document.body.classList.add('ie');
    document.body.classList.add(`ie${getIEVersion()}`);
  }
}
