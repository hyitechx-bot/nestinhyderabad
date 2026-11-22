/* Amazon Associates India links for the Home Shopping section.
   Set your tracking ID once below (looks like "yourname-21"). Until it is set,
   links still open Amazon but will not earn commission.
   Clicks are recorded in GA4 as "amazon_click" only. They are NOT sent to the
   Google Ads lead-form conversion, so Amazon traffic stays separate from property leads. */
(function () {
  var AMAZON_TAG = 'nestinhyd-21'; // Amazon Associates India store ID
  var links = document.querySelectorAll('a[data-amazon]');
  for (var i = 0; i < links.length; i++) {
    (function (a) {
      if (AMAZON_TAG) {
        try { var u = new URL(a.href); u.searchParams.set('tag', AMAZON_TAG); a.href = u.toString(); } catch (e) {}
      }
      a.addEventListener('click', function () {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'amazon_click', { product: a.getAttribute('data-amazon'), page: window.location.pathname });
        }
      });
    })(links[i]);
  }
})();
