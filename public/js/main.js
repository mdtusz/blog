(function () {
  'use strict';

  var nav = document.getElementById('sidebar');
  var navHeight = nav.clientHeight;
  var yPos = window.pageYOffset || document.documentElement.scrollTop;

  document.onscroll = function (e) {
    if (window.innerWidth === nav.clientWidth) {
      var newPos = window.pageYOffset || document.documentElement.scrollTop;
      if (newPos > yPos) {
        nav.style.top = '-' + navHeight + 'px';
      } else if (newPos < yPos) {
        nav.style.top = '0';
      }
      yPos = newPos;
    }
  };

})();