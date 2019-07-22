/**
 * returns viewport wdith
 * @return {[number]}
 */
export const viewportWidth = function() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};


/**
 * returns viewport height
 * @return {[number]}
 */
export const viewportHeight = function() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};


/**
 * returns the media type
 * @param  {Integer} desktop The minimum desktop width
 * @return {String}         The viewport type
 */
export const mediaType = function(desktop) {
  let temp_viewport;
  let viewport_width;

  viewport_width = viewportWidth();

  if (viewport_width >= desktop) {
    temp_viewport = 'desktop';
  } else {
    temp_viewport = 'mobile';
  }

  return temp_viewport;
};


/**
 * the function attaches resize event listener to the window element,
 * if the viewport is changed it will trigger 'media_changed' event
 * @param  {[number]} desktop - viewport width
 * @return {[undefined]}
 */
export const mediaListen = function(desktop) {
  const $win = $(window);
  let viewport = mediaType(desktop);

  $win.resize($.throttle(100, function() {
    let temp_viewport = mediaType(desktop);

    if (temp_viewport !== viewport) {
      viewport = temp_viewport;
      $win.trigger('media_changed', viewport);
    }
  }));
};
