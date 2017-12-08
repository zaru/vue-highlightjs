'use strict';

var hljs = require('highlight.js/lib/highlight');

var vueHighlightJS = {};
vueHighlightJS.install = function install(Vue, languages) {

  if ((Array.isArray(languages)) {
    languages.forEach(function (lang) {
      var langModule = require('highlight.js/lib/languages/' + lang);
      hljs.registerLanguage(lang, langModule);
    })
  }

  Vue.directive('highlightjs', {
    deep: true,
    bind: function bind(el, binding) {
      // on first bind, highlight all targets
      var targets = el.querySelectorAll('code');
      var target;
      var i;

      for (i = 0; i < targets.length; i += 1) {
        target = targets[i];

        if (typeof binding.value === 'string') {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value;
        }

        hljs.highlightBlock(target);
      }
    },
    componentUpdated: function componentUpdated(el, binding) {
      // after an update, re-fill the content and then highlight
      var targets = el.querySelectorAll('code');
      var target;
      var i;

      for (i = 0; i < targets.length; i += 1) {
        target = targets[i];
        if (typeof binding.value === 'string') {
          target.textContent = binding.value;
          hljs.highlightBlock(target);
        }
      }
    }
  });
};

module.exports = vueHighlightJS;
