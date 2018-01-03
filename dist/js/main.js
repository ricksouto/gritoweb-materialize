// Required for Meteor package, the use of window prevents export by Meteor
(function(window){
  if(window.Package){
    M = {};
  } else {
    window.M = {};
  }

  // Check for jQuery
  M.jQueryLoaded = !!window.jQuery;
})(window);


// AMD
if ( typeof define === "function" && define.amd ) {
	define( "M", [], function() {
		return M;
	} );

// Common JS
} else if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = M;
  }
  exports.default = M;
}

M.keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};


/**
 * TabPress Keydown handler
 */
M.tabPressed = false;
let docHandleKeydown = function(e) {
  if (e.which === M.keys.TAB) {
    M.tabPressed = true;
  }
};
let docHandleKeyup = function(e) {
  if (e.which === M.keys.TAB) {
    M.tabPressed = false;
  }
};
document.addEventListener('keydown', docHandleKeydown);
document.addEventListener('keyup', docHandleKeyup);


/**
 * Initialize jQuery wrapper for plugin
 * @param {Class} plugin  javascript class
 * @param {string} pluginName  jQuery plugin name
 * @param {string} classRef  Class reference name
 */
M.initializeJqueryWrapper = function(plugin, pluginName, classRef) {
  jQuery.fn[pluginName] = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (plugin.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        let instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);
      }

      // Void methods
      return this.each(function() {
        let instance = this[classRef];
        instance[methodOrOptions].apply(instance, params);
      });

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      plugin.init(this, arguments[0]);
      return this;

    }

    // Return error if an unrecognized  method name is passed in
    jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.${pluginName}`);
  };
};

/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
M.objectSelectorString = function(obj) {
  let tagStr = obj.prop('tagName') || '';
  let idStr = obj.attr('id') || '';
  let classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g,'');
};


// Unique Random ID
M.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
M.escapeHash = function(hash) {
  return hash.replace( /(:|\.|\[|\]|,|=)/g, "\\$1" );
};

M.elementOrParentIsFixed = function(element) {
  let $element = $(element);
  let $checkElements = $element.add($element.parents());
  let isFixed = false;
  $checkElements.each(function(){
    if ($(this).css("position") === "fixed") {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */

/**
 * Escapes hash from special characters
 * @param {Element} container  Container element that acts as the boundary
 * @param {Bounding} bounding  element bounding that is being checked
 * @param {Number} offset  offset from edge that counts as exceeding
 * @returns {Edges}
 */
M.checkWithinContainer = function(container, bounding, offset) {
  let edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };

  let containerRect = container.getBoundingClientRect();

  let scrollLeft = container.scrollLeft;
  let scrollTop = container.scrollTop;

  let scrolledX = bounding.left - scrollLeft;
  let scrolledY = bounding.top - scrollTop;

  // Check for container and viewport for each edge
  if (scrolledX < containerRect.left + offset ||
      scrolledX < offset) {
    edges.left = true;
  }

  if (scrolledX + bounding.width > containerRect.right - offset ||
      scrolledX + bounding.width > window.innerWidth - offset) {
    edges.right = true;
  }

  if (scrolledY < containerRect.top + offset ||
      scrolledY < offset) {
    edges.top = true;
  }

  if (scrolledY + bounding.height > containerRect.bottom - offset ||
      scrolledY + bounding.height > window.innerHeight - offset) {
    edges.bottom = true;
  }

  return edges;
};


M.checkPossibleAlignments = function(el, container, bounding, offset) {
  let canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };

  let containerAllowsOverflow = getComputedStyle(container).overflow === 'visible';
  let containerRect = container.getBoundingClientRect();
  let elOffsetRect = el.getBoundingClientRect();

  let scrollLeft = container.scrollLeft;
  let scrollTop = container.scrollTop;

  let scrolledX = bounding.left - scrollLeft;
  let scrolledY = bounding.top - scrollTop;

  // Check for container and viewport for left
  canAlign.spaceOnRight = !containerAllowsOverflow ? container.offsetWidth - (scrolledX + bounding.width) :
    window.innerWidth - (elOffsetRect.left + bounding.width);
  if ((!containerAllowsOverflow && scrolledX + bounding.width > container.offsetWidth) ||
      containerAllowsOverflow && (elOffsetRect.left + bounding.width > window.innerWidth)) {
    canAlign.left = false;
  }

  // Check for container and viewport for Right
  canAlign.spaceOnLeft = !containerAllowsOverflow ? scrolledX - bounding.width + elOffsetRect.width :
    elOffsetRect.right - bounding.width;
  if ((!containerAllowsOverflow && scrolledX - bounding.width + elOffsetRect.width < 0) ||
      containerAllowsOverflow && (elOffsetRect.right - bounding.width < 0)) {
    canAlign.right = false;
  }

  // Check for container and viewport for Top
  canAlign.spaceOnBottom = !containerAllowsOverflow ? containerRect.height - (scrolledY + bounding.height + offset) :
    window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if ((!containerAllowsOverflow && scrolledY + bounding.height + offset > containerRect.height) ||
      containerAllowsOverflow && (elOffsetRect.top + bounding.height + offset > window.innerHeight)) {
    canAlign.top = false;
  }

  // Check for container and viewport for Bottom
  canAlign.spaceOnTop = !containerAllowsOverflow ? scrolledY - (bounding.height + offset) :
    elOffsetRect.bottom - (bounding.height + offset);
  if ((!containerAllowsOverflow && scrolledY - bounding.height - offset < 0) ||
      containerAllowsOverflow && (elOffsetRect.bottom - bounding.height - offset < 0)) {
    canAlign.bottom = false;
  }

  return canAlign;
};


M.getOverflowParent = function(element) {
  if (element == null) {
    return null;
  }

  if (element === document.body || getComputedStyle(element).overflow !== 'visible') {
    return element;
  }

  return M.getOverflowParent(element.parentElement);
};


/**
 * Gets id of component from a trigger
 * @param {Element} trigger  trigger
 * @returns {string}
 */
M.getIdFromTrigger = function(trigger) {
  let id = trigger.getAttribute('data-target');
  if (!id) {
    id = trigger.getAttribute('href');
    if (id) {
      id = id.slice(1);
    } else {
      id = "";
    }
  }
  return id;
};


/**
 * Multi browser support for document scroll top
 * @returns {Number}
 */
M.getDocumentScrollTop = function() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

/**
 * Multi browser support for document scroll left
 * @returns {Number}
 */
M.getDocumentScrollLeft = function() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};


/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */


/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
let getTime = (Date.now || function () {
  return new Date().getTime();
});


/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
M.throttle = function(func, wait, options) {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  options || (options = {});
  let later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    let now = getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

(function ($, anim) {
  'use strict';

  let _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
  };


  /**
   * @class
   *
   */
  class Collapsible extends Component {
    /**
     * Construct Collapsible instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Collapsible, el, options);

      this.el.M_Collapsible = this;

      /**
       * Options for the collapsible
       * @member Collapsible#options
       * @prop {Boolean} [accordion=false] - Type of the collapsible
       * @prop {Function} onOpenStart - Callback function called before collapsible is opened
       * @prop {Function} onOpenEnd - Callback function called after collapsible is opened
       * @prop {Function} onCloseStart - Callback function called before collapsible is closed
       * @prop {Function} onCloseEnd - Callback function called after collapsible is closed
       * @prop {Number} inDuration - Transition in duration in milliseconds.
       * @prop {Number} outDuration - Transition duration in milliseconds.
       */
      this.options = $.extend({}, Collapsible.defaults, options);

      this._setupEventHandlers();

      // Open first active
      let $activeBodies = this.$el.children('li.active').children('.collapsible-body');
      if (this.options.accordion) { // Handle Accordion
        $activeBodies.first().css('display', 'block');

      } else { // Handle Expandables
        $activeBodies.css('display', 'block');
      }
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Collapsible;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.M_Collapsible = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
      this.el.addEventListener('click', this._handleCollapsibleClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleCollapsibleClickBound);
    }

    /**
     * Handle Collapsible Click
     * @param {Event} e
     */
    _handleCollapsibleClick(e) {
      let $header = $(e.target).closest('.collapsible-header');
      if (e.target && $header.length) {
        let $collapsible = $header.closest('.collapsible');
        if ($collapsible[0] === this.el) {
          let $collapsibleLi = $header.closest('li');
          let $collapsibleLis = $collapsible.children('li');
          let isActive = $collapsibleLi[0].classList.contains('active');
          let index = $collapsibleLis.index($collapsibleLi);

          if (isActive) {
            this.close(index);
          } else {
            this.open(index);
          }
        }
      }
    }

    /**
     * Animate in collapsible slide
     * @param {Number} index - 0th index of slide
     */
    _animateIn(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.children('.collapsible-body');

        anim.remove($body[0]);
        $body.css({
          display: 'block',
          overflow: 'hidden',
          height: 0,
          paddingTop: '',
          paddingBottom: ''
        });

        let pTop = $body.css('padding-top');
        let pBottom = $body.css('padding-bottom');
        let finalHeight = $body[0].scrollHeight;
        $body.css({
          paddingTop: 0,
          paddingBottom: 0
        });

        anim({
          targets: $body[0],
          height: finalHeight,
          paddingTop: pTop,
          paddingBottom: pBottom,
          duration: this.options.inDuration,
          easing: 'easeInOutCubic',
          complete: (anim) => {
            $body.css({
              overflow: '',
              paddingTop: '',
              paddingBottom: '',
              height: ''
            });

            // onOpenEnd callback
            if (typeof (this.options.onOpenEnd) === 'function') {
              this.options.onOpenEnd.call(this, $collapsibleLi[0]);
            }
          }
        });
      }
    }

    /**
     * Animate out collapsible slide
     * @param {Number} index - 0th index of slide to open
     */
    _animateOut(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.children('.collapsible-body');
        anim.remove($body[0]);
        $body.css('overflow', 'hidden');
        anim({
          targets: $body[0],
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: this.options.outDuration,
          easing: 'easeInOutCubic',
          complete: () => {
            $body.css({
              height: '',
              overflow: '',
              padding: '',
              display: ''
            });

            // onCloseEnd callback
            if (typeof (this.options.onCloseEnd) === 'function') {
              this.options.onCloseEnd.call(this, $collapsibleLi[0]);
            }
          }
        });
      }
    }

    /**
     * Open Collapsible
     * @param {Number} index - 0th index of slide
     */
    open(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains('active')) {

        // onOpenStart callback
        if (typeof (this.options.onOpenStart) === 'function') {
          this.options.onOpenStart.call(this, $collapsibleLi[0]);
        }

        // Handle accordion behavior
        if (this.options.accordion) {
          let $collapsibleLis = this.$el.children('li');
          let $activeLis = this.$el.children('li.active');
          $activeLis.each((el) => {
            let index = $collapsibleLis.index($(el));
            this.close(index);
          });
        }

        // Animate in
        $collapsibleLi[0].classList.add('active');
        this._animateIn(index);
      }
    }

    /**
     * Close Collapsible
     * @param {Number} index - 0th index of slide
     */
    close(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {

        // onCloseStart callback
        if (typeof (this.options.onCloseStart) === 'function') {
          this.options.onCloseStart.call(this, $collapsibleLi[0]);
        }

        // Animate out
        $collapsibleLi[0].classList.remove('active');
        this._animateOut(index);
      }
    }
  }

  M.Collapsible = Collapsible;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, 'collapsible', 'M_Collapsible');
  }

}(cash, M.anime));

(function($, anim) {
  'use strict';

  let _defaults = {
    alignment: 'left',
    constrainWidth: true,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };


  /**
   * @class
   */
  class Dropdown extends Component {
    constructor(el, options) {
      super(Dropdown, el, options);

      this.el.M_Dropdown = this;
      Dropdown._dropdowns.push(this);

      this.id = M.getIdFromTrigger(el);
      this.dropdownEl = document.getElementById(this.id);
      this.$dropdownEl = $(this.dropdownEl);


      /**
       * Options for the dropdown
       * @member Dropdown#options
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      this.options = $.extend({}, Dropdown.defaults, options);

      /**
       * Describes open/close state of dropdown
       * @type {Boolean}
       */
      this.isOpen = false;

      this.focusedIndex = -1;
      this.filterQuery = [];

      // Move dropdown-content after dropdown-trigger
      this.$el.after(this.dropdownEl);

      this._makeDropdownFocusable();
      this._resetFilterQueryBound = this._resetFilterQuery.bind(this);
      this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
      this._handleDropdownKeydownBound = this._handleDropdownKeydown.bind(this);
      this._handleTriggerKeydownBound = this._handleTriggerKeydown.bind(this);
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Dropdown;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._resetDropdownStyles();
      this._removeEventHandlers();
      Dropdown._dropdowns.splice(Dropdown._dropdowns.indexOf(this), 1);
      this.el.M_Dropdown = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      // Trigger keydown handler
      this.el.addEventListener('keydown', this._handleTriggerKeydownBound);

      // Hover event handlers
      if (this.options.hover) {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
        this.dropdownEl.addEventListener('mouseleave', this._handleMouseLeaveBound);

      // Click event handlers
      } else {
        this._handleClickBound = this._handleClick.bind(this);
        this.el.addEventListener('click', this._handleClickBound);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      // Trigger keydown handler
      this.el.removeEventListener('keydown', this._handleTriggerKeydownBound);

      if (this.options.hover) {
        this.el.removeEventHandlers('mouseenter', this._handleMouseEnterBound);
        this.el.removeEventHandlers('mouseleave', this._handleMouseLeaveBound);
        this.dropdownEl.removeEventHandlers('mouseleave', this._handleMouseLeaveBound);
      } else {
        this.el.removeEventListener('click', this._handleClickBound);
      }
    }

    _setupTemporaryEventHandlers() {
      // Use capture phase event handler to prevent click
      document.body.addEventListener('click', this._handleDocumentClickBound, true);
      this.dropdownEl.addEventListener('keydown', this._handleDropdownKeydownBound);
    }

    _removeTemporaryEventHandlers() {
      // Use capture phase event handler to prevent click
      document.body.removeEventListener('click', this._handleDocumentClickBound, true);
      this.dropdownEl.removeEventListener('keydown', this._handleDropdownKeydownBound);
    }

    _handleClick(e) {
      e.preventDefault();
      this.open();
    }

    _handleMouseEnter() {
      this.open();
    }

    _handleMouseLeave(e) {
      let toEl = e.toElement || e.relatedTarget;
      let leaveToDropdownContent = !!$(toEl).closest('.dropdown-content').length;
      let leaveToActiveDropdownTrigger = false;

      let $closestTrigger = $(toEl).closest('.dropdown-trigger');
      if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown &&
          $closestTrigger[0].M_Dropdown.isOpen) {
        leaveToActiveDropdownTrigger = true;
      }

      // Close hover dropdown if mouse did not leave to either active dropdown-trigger or dropdown-content
      if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
        this.close();
      }
    }

    _handleDocumentClick(e) {
      let $target = $(e.target);
      if (this.options.closeOnClick && $target.closest('.dropdown-content').length) {
        setTimeout(() => {
          this.close();
        }, 0);
      } else if ($target.closest('.dropdown-trigger').length) {
        setTimeout(() => {
          this.close();
        }, 0);
      } else if (!$target.closest('.dropdown-content').length) {
        setTimeout(() => {
          this.close();
        }, 0);
      }
    }

    _handleTriggerKeydown(e) {
      // ARROW DOWN OR ENTER WHEN SELECT IS CLOSED - open Dropdown
      if ((e.which === M.keys.ARROW_DOWN ||
           e.which === M.keys.ENTER) && !this.isOpen) {
        e.preventDefault();
        this.open();
      }
    }

    /**
     * Handle Dropdown Keydown
     * @param {Event} e
     */
    _handleDropdownKeydown(e) {
      if (e.which === M.keys.TAB) {
        e.preventDefault();
        this.close();

        // Navigate down dropdown list
      } else if ((e.which === M.keys.ARROW_DOWN ||
                  e.which === M.keys.ARROW_UP) && this.isOpen) {
        e.preventDefault();
        let direction = e.which === M.keys.ARROW_DOWN ? 1 : -1;
        this.focusedIndex =
          Math.max(Math.min(this.focusedIndex + direction, this.dropdownEl.children.length - 1), 0);
        this._focusFocusedItem();

        // ENTER selects choice on focused item
      } else if (e.which === M.keys.ENTER && this.isOpen) {
        // Search for <a> and <button>
        let focusedElement = this.dropdownEl.children[this.focusedIndex];
        let $activatableElement = $(focusedElement).find('a, button').first();

        // Click a or button tag if exists, otherwise click li tag
        !!$activatableElement.length ? $activatableElement[0].click() : focusedElement.click();

        // Close dropdown on ESC
      } else if (e.which === M.keys.ESC && this.isOpen) {
        e.preventDefault();
        this.close();
      }

      // CASE WHEN USER TYPE LETTERS
      let letter = String.fromCharCode(e.which).toLowerCase(),
          nonLetters = [9,13,27,38,40];
      if (letter && (nonLetters.indexOf(e.which) === -1)) {
        this.filterQuery.push(letter);

        let string = this.filterQuery.join(''),
            newOptionEl = $(this.dropdownEl).find('li').filter((el) => {
              return $(el).text().toLowerCase().indexOf(string) === 0;
            })[0];

        if (newOptionEl) {
          this.focusedIndex = $(newOptionEl).index();
          this._focusFocusedItem();
        }
      }

      this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1000);
    }

    /**
     * Setup dropdown
     */
    _resetFilterQuery() {
      this.filterQuery = [];
    }

    _resetDropdownStyles() {
      this.$dropdownEl.css({
        display: '',
        width: '',
        height: '',
        left: '',
        top: '',
        'transform-origin': '',
        transform: '',
        opacity: ''
      });
    }

    _makeDropdownFocusable() {
      if (this.dropdownEl.tabIndex === -1) {
        this.dropdownEl.tabIndex = 0;
      }

      $(this.dropdownEl).children().attr('tabindex', 0);
    }

    _focusFocusedItem() {
      if (this.focusedIndex >= 0 && this.focusedIndex < this.dropdownEl.children.length) {
        this.dropdownEl.children[this.focusedIndex].focus();
      }
    }

    _getDropdownPosition() {
      let offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
      let triggerOffset = {left: this.el.offsetLeft, top: this.el.offsetTop, width: this.el.offsetWidth, height: this.el.offsetHeight};
      let dropdownOffset = {left: this.dropdownEl.offsetLeft, top: this.dropdownEl.offsetTop, width: this.dropdownEl.offsetWidth, height: this.dropdownEl.offsetHeight};
      let triggerBRect = this.el.getBoundingClientRect();
      let dropdownBRect = this.dropdownEl.getBoundingClientRect();

      let idealHeight = dropdownBRect.height;
      let idealWidth = dropdownBRect.width;
      let idealXPos =  triggerOffset.left;
      let idealYPos = triggerOffset.top;

      let dropdownBounds = {
        left: idealXPos,
        top: idealYPos,
        height: idealHeight,
        width: idealWidth
      };


      // Countainer here will be closest ancestor with overflow: hidden
      let closestOverflowParent = this.dropdownEl.offsetParent;
      let alignments = M.checkPossibleAlignments(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);

      let verticalAlignment = 'top';
      let horizontalAlignment = this.options.alignment;
      idealYPos += (this.options.coverTrigger ? 0 : triggerBRect.height);
      if (!alignments.top) {
        if (alignments.bottom) {
          verticalAlignment = 'bottom';
        } else {
          // Determine which side has most space and cutoff at correct height
          if (alignments.spaceOnTop > alignments.spaceOnBottom) {
            verticalAlignment = 'bottom';
            idealHeight += alignments.spaceOnTop;
            idealYPos -= alignments.spaceOnTop;
          } else {
            idealHeight += alignments.spaceOnBottom;
          }
        }
      }

      // If preferred horizontal alignment is possible
      if (!alignments[horizontalAlignment]) {
        let oppositeAlignment = horizontalAlignment === 'left' ? 'right' : 'left';
        if (alignments[oppositeAlignment]) {
          horizontalAlignment = oppositeAlignment;
        } else {
          // Determine which side has most space and cutoff at correct height
          if (alignments.spaceOnLeft > alignments.spaceOnRight) {
            horizontalAlignment = 'right';
            idealWidth += alignments.spaceOnLeft;
            idealXPos -= alignments.spaceOnLeft;
          } else {
            horizontalAlignment = 'left';
            idealWidth += alignments.spaceOnRight;
          }
        }
      }

      if (verticalAlignment === 'bottom') {
        idealYPos = idealYPos - dropdownBRect.height +
          (this.options.coverTrigger ? triggerBRect.height : 0);
      }
      if (horizontalAlignment === 'right') {
        idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
      }
      return {x: idealXPos,
              y: idealYPos,
              verticalAlignment: verticalAlignment,
              horizontalAlignment: horizontalAlignment,
              height: idealHeight,
              width: idealWidth};
    }


    /**
     * Animate in dropdown
     */
    _animateIn(positionInfo) {
      // Place dropdown
      this.dropdownEl.style.left = positionInfo.x + 'px';
      this.dropdownEl.style.top = positionInfo.y + 'px';
      this.dropdownEl.style.height = positionInfo.height + 'px';
      this.dropdownEl.style.width = positionInfo.width + 'px';
      this.dropdownEl.style.transformOrigin =
        `${positionInfo.horizontalAlignment === 'left' ? '0' : '100%'} ${positionInfo.verticalAlignment === 'top' ? '0' : '100%'}`;

      anim.remove(this.dropdownEl);
      anim({
        targets: this.dropdownEl,
        opacity: {
          value: [0, 1],
          easing: 'easeOutQuad'
        },
        scaleX: [.3, 1],
        scaleY: [.3, 1],
        duration: this.options.inDuration,
        easing: 'easeOutQuint',
        complete: (anim) => {
          this.dropdownEl.focus();

          // onOpenEnd callback
          if (typeof(this.options.onOpenEnd) === 'function') {
            let elem = anim.animatables[0].target;
            this.options.onOpenEnd.call(elem, this.el);
          }
        }
      });
    }

    /**
     * Animate out dropdown
     */
    _animateOut() {
      anim.remove(this.dropdownEl);
      anim({
        targets: this.dropdownEl,
        opacity: {
          value: 0,
          easing: 'easeOutQuint'
        },
        scaleX: .3,
        scaleY: .3,
        duration: this.options.outDuration,
        easing: 'easeOutQuint',
        complete: (anim) => {
          this._resetDropdownStyles();

          // onCloseEnd callback
          if (typeof(this.options.onCloseEnd) === 'function') {
            let elem = anim.animatables[0].target;
            this.options.onCloseEnd.call(this, this.el);
          }
        }
      });
    }


    /**
     * Open Dropdown
     */
    open() {
      if (this.isOpen) {
        return;
      }
      this.isOpen = true;

      // onOpenStart callback
      if (typeof(this.options.onOpenStart) === 'function') {
        this.options.onOpenStart.call(this, this.el);
      }

      // Reset styles
      this._resetDropdownStyles();
      this.dropdownEl.style.display = 'block';

      // Set width before calculating positionInfo
      let idealWidth = this.options.constrainWidth ?
          this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
      this.dropdownEl.style.width = idealWidth + 'px';

      let positionInfo = this._getDropdownPosition();
      this._animateIn(positionInfo);
      this._setupTemporaryEventHandlers();
    }

    /**
     * Close Dropdown
     */
    close() {
      if (!this.isOpen) {
        return;
      }
      this.isOpen = false;
      this.focusedIndex = -1;

      // onCloseStart callback
      if (typeof(this.options.onCloseStart) === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      this._animateOut();
      this._removeTemporaryEventHandlers();
      this.el.focus();
    }
  }

  /**
   * @static
   * @memberof Dropdown
   */
  Dropdown._dropdowns = [];

  window.M.Dropdown = Dropdown;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Dropdown, 'dropdown', 'M_Dropdown');
  }

})(cash, M.anime);

(function($, anim) {
  'use strict';

  let _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };


  /**
   * @class
   *
   */
  class Modal extends Component {
    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Modal, el, options);

      this.el.M_Modal = this;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Callback function called before modal is opened
       * @prop {Function} onOpenEnd - Callback function called after modal is opened
       * @prop {Function} onCloseStart - Callback function called before modal is closed
       * @prop {Function} onCloseEnd - Callback function called after modal is closed
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      this.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      this.isOpen = false;

      this.id = this.$el.attr('id');
      this._openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');

      Modal._increment++;
      Modal._count++;
      this.$overlay[0].style.zIndex = 1000 + Modal._increment * 2;
      this.el.style.zIndex = 1000 + Modal._increment * 2 + 1;
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Modal;
    }

    /**
     * Teardown component
     */
    destroy() {
      Modal._count--;
      this._removeEventHandlers();
      this.el.removeAttribute('style');
      this.$overlay.remove();
      this.el.M_Modal = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
      this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);

      if (Modal._count === 1) {
        document.body.addEventListener('click', this._handleTriggerClick);
      }
      this.$overlay[0].addEventListener('click', this._handleOverlayClickBound);
      this.el.addEventListener('click', this._handleModalCloseClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (Modal._count === 0) {
        document.body.removeEventListener('click', this._handleTriggerClick);
      }
      this.$overlay[0].removeEventListener('click', this._handleOverlayClickBound);
      this.el.removeEventListener('click', this._handleModalCloseClickBound);
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    _handleTriggerClick(e) {
      let $trigger =  $(e.target).closest('.modal-trigger');
      if ($trigger.length) {
        let modalId = M.getIdFromTrigger($trigger[0]);
        let modalInstance = document.getElementById(modalId).M_Modal;
        if (modalInstance) {
          modalInstance.open($trigger);
        }
        e.preventDefault();
      }
    }

    /**
     * Handle Overlay Click
     */
    _handleOverlayClick() {
      if (this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Handle Modal Close Click
     * @param {Event} e
     */
    _handleModalCloseClick(e) {
      let $closeTrigger = $(e.target).closest('.modal-close');
      if ($closeTrigger.length) {
        this.close();
      }
    }

    /**
     * Handle Keydown
     * @param {Event} e
     */
    _handleKeydown(e) {
      // ESC key
      if (e.keyCode === 27 && this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Animate in modal
     */
    _animateIn() {
      // Set initial styles
      $.extend(this.el.style, {
        display: 'block',
        opacity: 0
      });
      $.extend(this.$overlay[0].style, {
        display: 'block',
        opacity: 0
      });

      // Animate overlay
      anim({
        targets: this.$overlay[0],
        opacity: this.options.opacity,
        duration: this.options.inDuration,
        easing: 'easeOutQuad'
      });

      // Define modal animation options
      let enterAnimOptions = {
        targets: this.el,
        duration: this.options.inDuration,
        easing: 'easeOutCubic',
        // Handle modal onOpenEnd callback
        complete: () => {
          if (typeof(this.options.onOpenEnd) === 'function') {
            this.options.onOpenEnd.call(this, this.el, this._openingTrigger);
          }
        }
      };

      // Bottom sheet animation
      if (this.el.classList.contains('bottom-sheet')) {
        $.extend(enterAnimOptions, {
          bottom: 0,
          opacity: 1
        });
        anim(enterAnimOptions);

      // Normal modal animation
      } else {
        $.extend(enterAnimOptions, {
          top: [this.options.startingTop, this.options.endingTop],
          opacity: 1,
          scaleX: [.8, 1],
          scaleY: [.8, 1]
        });
        anim(enterAnimOptions);
      }
    }

    /**
     * Animate out modal
     */
    _animateOut() {
      // Animate overlay
      anim({
        targets: this.$overlay[0],
        opacity: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuart'
      });

      // Define modal animation options
      let exitAnimOptions = {
        targets: this.el,
        duration: this.options.outDuration,
        easing: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          this.el.style.display = 'none';
          this.$overlay.remove();

          // Call onCloseEnd callback
          if (typeof(this.options.onCloseEnd) === 'function') {
            this.options.onCloseEnd.call(this, this.el);
          }
        }
      };

      // Bottom sheet animation
      if (this.el.classList.contains('bottom-sheet')) {
        $.extend(exitAnimOptions, {
          bottom: '-100%',
          opacity: 0
        });
        anim(exitAnimOptions);

      // Normal modal animation
      } else {
        $.extend(exitAnimOptions, {
          top: [this.options.endingTop, this.options.startingTop],
          opacity: 0,
          scaleX: 0.8,
          scaleY: 0.8
        });
        anim(exitAnimOptions);
      }
    }


    /**
     * Open Modal
     * @param {cash} [$trigger]
     */
    open($trigger) {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;

      // onOpenStart callback
      if (typeof(this.options.onOpenStart) === 'function') {
        this.options.onOpenStart.call(this, this.el, this._openingTrigger);
      }

      let body = document.body;
      body.style.overflow = 'hidden';
      this.el.classList.add('open');
      this.el.insertAdjacentElement('afterend', this.$overlay[0]);

      // Set opening trigger, undefined indicates modal was opened by javascript
      this._openingTrigger = !!$trigger ? $trigger[0] : undefined;

      if (this.options.dismissible) {
        this._handleKeydownBound = this._handleKeydown.bind(this);
        document.addEventListener('keydown', this._handleKeydownBound);
      }

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);
      this._animateIn();
      return this;
    }

    /**
     * Close Modal
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;

      // Call onCloseStart callback
      if (typeof(this.options.onCloseStart) === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      this.el.classList.remove('open');
      document.body.style.overflow = '';

      if (this.options.dismissible) {
        document.removeEventListener('keydown', this._handleKeydownBound);
      }

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);
      this._animateOut();
      return this;
    }
  }

  /**
   * @static
   * @memberof Modal
   */
  Modal._increment = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  M.Modal = Modal;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, 'modal', 'M_Modal');
  }

})(cash, M.anime);

(function ($, anim) {
  'use strict';

  let _defaults = {
    inDuration: 275,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };

  /**
   * @class
   *
   */
  class Materialbox extends Component {
    /**
     * Construct Materialbox instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      super(Materialbox, el, options);

      this.el.M_Materialbox = this;

      /**
       * Options for the modal
       * @member Materialbox#options
       * @prop {Number} [inDuration=275] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Callback function called before materialbox is opened
       * @prop {Function} onOpenEnd - Callback function called after materialbox is opened
       * @prop {Function} onCloseStart - Callback function called before materialbox is closed
       * @prop {Function} onCloseEnd - Callback function called after materialbox is closed
       */
      this.options = $.extend({}, Materialbox.defaults, options);

      this.overlayActive = false;
      this.doneAnimating = true;
      this.placeholder = $('<div></div>').addClass('material-placeholder');
      this.originalWidth = 0;
      this.originalHeight = 0;
      this.originInlineStyles = this.$el.attr('style');
      this.caption = this.el.getAttribute('data-caption') || "";

      // Wrap
      this.$el.before(this.placeholder);
      this.placeholder.append(this.$el);

      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Materialbox;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.M_Materialbox = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
      this.el.addEventListener('click', this._handleMaterialboxClickBound);
    }

    /**
     * Remove Event Handlers
     */
    removeEventHandlers() {
      this.el.removeEventListener('click', this._handleMaterialboxClickBound);
    }

    /**
     * Handle Materialbox Click
     * @param {Event} e
     */
    _handleMaterialboxClick(e) {
      // If already modal, return to original
      if (this.doneAnimating === false ||
          (this.overlayActive && this.doneAnimating)) {
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * Handle Window Scroll
     */
    _handleWindowScroll() {
      if (this.overlayActive) {
        this.close();
      }
    }

    /**
     * Handle Window Resize
     */
    _handleWindowResize() {
      if (this.overlayActive) {
        this.close();
      }
    }

    /**
     * Handle Window Resize
     * @param {Event} e
     */
    _handleWindowEscape(e) {
      // ESC key
      if (e.keyCode === 27 &&
          this.doneAnimating &&
          this.overlayActive) {
        this.close();
      }
    }

    /**
     * Find ancestors with overflow: hidden; and make visible
     */
    _makeAncestorsOverflowVisible() {
      this.ancestorsChanged = $();
      let ancestor = this.placeholder[0].parentNode;
      while (ancestor !== null && !$(ancestor).is(document)) {
        let curr = $(ancestor);
        if (curr.css('overflow') !== 'visible') {
          curr.css('overflow', 'visible');
          if (this.ancestorsChanged === undefined) {
            this.ancestorsChanged = curr;
          }
          else {
            this.ancestorsChanged = this.ancestorsChanged.add(curr);
          }
        }
        ancestor = ancestor.parentNode;
      }
    }

    /**
     * Animate image in
     */
    _animateImageIn() {
      let animOptions = {
        targets: this.el,
        height: this.newHeight,
        width: this.newWidth,
        left: M.getDocumentScrollLeft() + this.windowWidth/2 - this.placeholder.offset().left - this.newWidth/2,
        top: M.getDocumentScrollTop() + this.windowHeight/2 - this.placeholder.offset().top - this.newHeight/2,
        duration: this.options.inDuration,
        easing: 'easeOutQuad',
        complete: () => {
          this.doneAnimating = true;

          // onOpenEnd callback
          if (typeof(this.options.onOpenEnd) === 'function') {
            this.options.onOpenEnd.call(this, this.el);
          }
        }
      };

      if (this.$el.hasClass('responsive-img')) {
        animOptions.maxWidth = this.newWidth;
        animOptions.width = [this.originalWidth, animOptions.width];
      } else {
        animOptions.left = [animOptions.left, 0];
        animOptions.top = [animOptions.top, 0];
      }

      anim(animOptions);
    }

    /**
     * Animate image out
     */
    _animateImageOut() {
      let animOptions = {
        targets: this.el,
        width: this.originalWidth,
        height: this.originalHeight,
        left: 0,
        top: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
        complete: () => {
          this.placeholder.css({
            height: '',
            width: '',
            position: '',
            top: '',
            left: ''
          });

          this.$el.removeAttr('style');
          this.$el.attr('style', this.originInlineStyles);

          // Remove class
          this.$el.removeClass('active');
          this.doneAnimating = true;

          // Remove overflow overrides on ancestors
          if (this.ancestorsChanged.length) {
            this.ancestorsChanged.css('overflow', '');
          }

          // onCloseEnd callback
          if (typeof(this.options.onCloseEnd) === 'function') {
            this.options.onCloseEnd.call(this, this.el);
          }
        }
      };

      anim(animOptions);
    }

    /**
     * Update open and close vars
     */
    _updateVars() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.caption = this.el.getAttribute('data-caption') || "";
    }

    /**
     * Open Materialbox
     */
    open() {
      this._updateVars();
      this.originalWidth = this.el.getBoundingClientRect().width;
      this.originalHeight = this.el.getBoundingClientRect().height;

      // Set states
      this.doneAnimating = false;
      this.$el.addClass('active');
      this.overlayActive = true;

      // onOpenStart callback
      if (typeof(this.options.onOpenStart) === 'function') {
        this.options.onOpenStart.call(this, this.el);
      }

      // Set positioning for placeholder
      this.placeholder.css({
        width: this.placeholder[0].getBoundingClientRect().width + 'px',
        height: this.placeholder[0].getBoundingClientRect().height + 'px',
        position: 'relative',
        top: 0,
        left: 0
      });

      this._makeAncestorsOverflowVisible();

      // Set css on origin
      this.$el.css({
        position: 'absolute',
        'z-index': 1000,
        'will-change': 'left, top, width, height'
      });

      // Add overlay
      this.$overlay = $('<div id="materialbox-overlay"></div>')
        .css({
          opacity: 0
        })
        .one('click', () => {
          if (this.doneAnimating) {
            this.close();
          }
        });

      // Put before in origin image to preserve z-index layering.
      this.$el.before(this.$overlay);

      // Set dimensions if needed
      let overlayOffset = this.$overlay[0].getBoundingClientRect();
      this.$overlay.css({
        width: this.windowWidth + 'px',
        height: this.windowHeight + 'px',
        left: -1 * overlayOffset.left + 'px',
        top: -1 * overlayOffset.top + 'px'
      });

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);

      if (this.caption !== "") {
        anim.remove(this.$photoCaption[0]);
      }

      // Animate Overlay
      anim({
        targets: this.$overlay[0],
        opacity: 1,
        duration: this.options.inDuration,
        easing: 'easeOutQuad'
      });

      // Add and animate caption if it exists
      if (this.caption !== "") {
        this.$photoCaption = $('<div class="materialbox-caption"></div>');
        this.$photoCaption.text(this.caption);
        $('body').append(this.$photoCaption);
        this.$photoCaption.css({ "display": "inline" });

        anim({
          targets: this.$photoCaption[0],
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });
      }

      // Resize Image
      let ratio = 0;
      let widthPercent = this.originalWidth / this.windowWidth;
      let heightPercent = this.originalHeight / this.windowHeight;
      this.newWidth = 0;
      this.newHeight = 0;

      if (widthPercent > heightPercent) {
        ratio = this.originalHeight / this.originalWidth;
        this.newWidth = this.windowWidth * 0.9;
        this.newHeight = this.windowWidth * 0.9 * ratio;
      }
      else {
        ratio = this.originalWidth / this.originalHeight;
        this.newWidth = this.windowHeight * 0.9 * ratio;
        this.newHeight = this.windowHeight * 0.9;
      }

      this._animateImageIn();

      // Handle Exit triggers
      this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
      this._handleWindowResizeBound = this._handleWindowResize.bind(this);
      this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);

      window.addEventListener('scroll', this._handleWindowScrollBound);
      window.addEventListener('resize', this._handleWindowResizeBound);
      window.addEventListener('keyup', this._handleWindowEscapeBound);
    }

    /**
     * Close Materialbox
     */
    close() {
      this._updateVars();
      this.doneAnimating = false;

      // onCloseStart callback
      if (typeof(this.options.onCloseStart) === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);

      if (this.caption !== "") {
        anim.remove(this.$photoCaption[0]);
      }

      // disable exit handlers
      window.removeEventListener('scroll', this._handleWindowScrollBound);
      window.removeEventListener('resize', this._handleWindowResizeBound);
      window.removeEventListener('keyup', this._handleWindowEscapeBound);

      anim({
        targets: this.$overlay[0],
        opacity: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
        complete: () => {
          this.overlayActive = false;
          this.$overlay.remove();
        }
      });

      this._animateImageOut();

      // Remove Caption + reset css settings on image
      if (this.caption !== "") {
        anim({
          targets: this.$photoCaption[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: () => {
            this.$photoCaption.remove();
          }
        });
      }
    }
  }

  M.Materialbox = Materialbox;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, 'materialbox', 'M_Materialbox');
  }

}(cash, M.anime));

(function($) {
  'use strict';

  let _defaults = {
    responsiveThreshold: 0, // breakpoint for swipeable
  };

  class Parallax extends Component {

    constructor(el, options) {
      super(Parallax, el, options);

      this.el.M_Parallax = this;

      /**
       * Options for the Parallax
       * @member Parallax#options
       * @prop {Number} responsiveThreshold
       */
      this.options = $.extend({}, Parallax.defaults, options);

      this.$img = this.$el.find('img').first();
      this._enabled = window.innerWidth > this.options.responsiveThreshold;
      this._updateParallax();
      this._setupEventHandlers();
      this._setupStyles();

      Parallax._parallaxes.push(this);
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Parallax;
    }

    /**
     * Teardown component
     */
    destroy() {
      Parallax._parallaxes.splice(Parallax._parallaxes.indexOf(this), 1);
      this.$img[0].style.transform = '';
      this._removeEventHandlers();

      this.$el[0].M_Parallax = undefined;
    }

    static _handleScroll() {
      for (let i = 0; i < Parallax._parallaxes.length; i++) {
        let parallaxInstance = Parallax._parallaxes[i];
        parallaxInstance._updateParallax.call(parallaxInstance);
      }
    }

    static _handleWindowResize() {
      for (let i = 0; i < Parallax._parallaxes.length; i++) {
        let parallaxInstance = Parallax._parallaxes[i];
        parallaxInstance._enabled = window.innerWidth > parallaxInstance.options.responsiveThreshold;
      }
    }

    _setupEventHandlers() {
      this._handleImageLoadBound = this._handleImageLoad.bind(this);
      this.$img[0].addEventListener('load', this._handleImageLoadBound);

      if (Parallax._parallaxes.length === 0) {
        Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
        window.addEventListener('scroll', Parallax._handleScrollThrottled);

        Parallax._handleWindowResizeThrottled = M.throttle(Parallax._handleWindowResize, 5);
        window.addEventListener('resize', Parallax._handleWindowResizeThrottled);
      }
    }

    _removeEventHandlers() {
      this.$img[0].removeEventListener('load', this._handleImageLoadBound);

      if (Parallax._parallaxes.length === 0) {
        window.removeEventListener('scroll', Parallax._handleScrollThrottled);
        window.removeEventListener('resize', Parallax._handleWindowResizeThrottled);
      }
    }

    _setupStyles() {
      this.$img[0].style.opacity = 1;
    }

    _handleImageLoad() {
      this._updateParallax();
      this.$img.each(function() {
        let el = this;
        if (el.complete) $(el).trigger("load");
      });
    }

    _updateParallax() {
      let containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
      let imgHeight = this.$img[0].offsetHeight;
      let parallaxDist = imgHeight - containerHeight;
      let bottom = this.$el.offset().top + containerHeight;
      let top = this.$el.offset().top;
      let scrollTop = M.getDocumentScrollTop();
      let windowHeight = window.innerHeight;
      let windowBottom = scrollTop + windowHeight;
      let percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
      let parallax = parallaxDist * percentScrolled;

      if (!this._enabled) {
        this.$img[0].style.transform = '';

      } else if (bottom > scrollTop && top < scrollTop + windowHeight) {
        this.$img[0].style.transform = `translate3D(-50%, ${parallax}px, 0)`;
      }
    }
  }

  /**
   * @static
   * @memberof Parallax
   */
  Parallax._parallaxes = [];

  M.Parallax = Parallax;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, 'parallax', 'M_Parallax');
  }

})(cash);

(function ($, anim) {
  'use strict';

  let _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity, // breakpoint for swipeable
  };

  /**
   * @class
   *
   */
  class Tabs extends Component {
    /**
     * Construct Tabs instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Tabs, el, options);

      this.el.M_Tabs = this;

      /**
       * Options for the Tabs
       * @member Tabs#options
       * @prop {Number} duration
       * @prop {Function} onShow
       * @prop {Boolean} swipeable
       * @prop {Number} responsiveThreshold
       */
      this.options = $.extend({}, Tabs.defaults, options);

      // Setup
      this.$tabLinks = this.$el.children('li.tab').children('a');
      this.index = 0;
      this._setTabsAndTabWidth();
      this._setupActiveTabLink();
      this._createIndicator();

      if (this.options.swipeable) {
        this._setupSwipeableTabs();

      } else {
        this._setupNormalTabs();
      }


      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Tabs;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this._indicator.parentNode.removeChild(this._indicator);

      if (this.options.swipeable) {
        this._teardownSwipeableTabs();
      } else {
        this._teardownNormalTabs();
      }

      this.$el[0].M_Tabs = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleWindowResizeBound = this._handleWindowResize.bind(this);
      window.addEventListener('resize', this._handleWindowResizeBound);

      this._handleTabClickBound = this._handleTabClick.bind(this);
      this.el.addEventListener('click', this._handleTabClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      window.removeEventListener('resize', this._handleWindowResizeBound);
      this.el.removeEventListener('click', this._handleTabClickBound);
    }

    /**
     * Handle window Resize
     */
    _handleWindowResize() {
      this._setTabsAndTabWidth();

      if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
        this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
        this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
      }
    }

    /**
     * Handle tab click
     * @param {Event} e
     */
    _handleTabClick(e) {
      let tab = $(e.target).closest('li.tab');
      let tabLink = $(e.target).closest('a');

      // Handle click on tab link only
      if (!tabLink.length || !tabLink.parent().hasClass('tab')) {
        return;
      }

      if (tab.hasClass('disabled')) {
        e.preventDefault();
        return;
      }

      // Act as regular link if target attribute is specified.
      if (!!tabLink.attr("target")) {
        return;
      }

      this._setTabsAndTabWidth();

      // Make the old tab inactive.
      this.$activeTabLink.removeClass('active');
      let $oldContent = this.$content;

      // Update the variables with the new link and content
      this.$activeTabLink = tabLink;
      this.$content = $(M.escapeHash(tabLink[0].hash));
      this.$tabLinks = this.$el.children('li.tab').children('a');

      // Make the tab active.
      this.$activeTabLink.addClass('active');
      let prevIndex = this.index;
      this.index = Math.max(this.$tabLinks.index(tabLink), 0);

      // Swap content
      if (this.options.swipeable) {
        if (this._tabsCarousel) {
          this._tabsCarousel.set(this.index, () => {
            if (typeof(this.options.onShow) === "function") {
              this.options.onShow.call(this, this.$content[0]);
            }
          });
        }
      } else {
        if (this.$content.length) {
          this.$content[0].style.display = 'block';
          this.$content.addClass('active');
          if (typeof(this.options.onShow) === 'function') {
            this.options.onShow.call(this, this.$content[0]);
          }

          if ($oldContent.length &&
              !$oldContent.is(this.$content)) {
            $oldContent[0].style.display = 'none';
            $oldContent.removeClass('active');
          }
        }
      }

      // Update indicator
      this._animateIndicator(prevIndex);

      // Prevent the anchor's default click action
      e.preventDefault();
    }


    /**
     * Generate elements for tab indicator.
     */
    _createIndicator() {
      let indicator = document.createElement('li');
      indicator.classList.add('indicator');

      this.el.appendChild(indicator);
      this._indicator = indicator;

      setTimeout(() => {
        this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
        this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
      }, 0);
    }

    /**
     * Setup first active tab link.
     */
    _setupActiveTabLink() {
      // If the location.hash matches one of the links, use that as the active tab.
      this.$activeTabLink = $(this.$tabLinks.filter('[href="'+location.hash+'"]'));

      // If no match is found, use the first link or any with class 'active' as the initial active tab.
      if (this.$activeTabLink.length === 0) {
        this.$activeTabLink = this.$el.children('li.tab').children('a.active').first();
      }
      if (this.$activeTabLink.length === 0) {
        this.$activeTabLink = this.$el.children('li.tab').children('a').first();
      }

      this.$tabLinks.removeClass('active');
      this.$activeTabLink[0].classList.add('active');

      this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);

      if (this.$activeTabLink.length) {
        this.$content = $(M.escapeHash(this.$activeTabLink[0].hash));
        this.$content.addClass('active');
      }
    }

    /**
     * Setup swipeable tabs
     */
    _setupSwipeableTabs() {
      // Change swipeable according to responsive threshold
      if (window.innerWidth > this.options.responsiveThreshold) {
        this.options.swipeable = false;
      }

      let $tabsContent = $();
      this.$tabLinks.each((link) => {
        let $currContent = $(M.escapeHash(link.hash));
        $currContent.addClass('carousel-item');
        $tabsContent = $tabsContent.add($currContent);
      });

      let $tabsWrapper = $('<div class="tabs-content carousel carousel-slider"></div>');
      $tabsContent.first().before($tabsWrapper);
      $tabsWrapper.append($tabsContent);
      $tabsContent[0].style.display = '';

      this._tabsCarousel = M.Carousel.init($tabsWrapper[0], {
        fullWidth: true,
        noWrap: true,
        onCycleTo: (item) => {
          let prevIndex = this.index;
          this.index = $(item).index();
          this.$activeTabLink.removeClass('active');
          this.$activeTabLink = this.$tabLinks.eq(this.index);
          this.$activeTabLink.addClass('active');
          this._animateIndicator(prevIndex);
          if (typeof(this.options.onShow) === "function") {
            this.options.onShow.call(this, this.$content[0]);
          }
        },
      });
    }

    /**
     * Teardown normal tabs.
     */
    _teardownSwipeableTabs() {
      let $tabsWrapper = this._tabsCarousel.$el;
      this._tabsCarousel.destroy();

      // Unwrap
      $tabsWrapper.after($tabsWrapper.children());
      $tabsWrapper.remove();
    }

    /**
     * Setup normal tabs.
     */
    _setupNormalTabs() {
      // Hide Tabs Content
      this.$tabLinks.not(this.$activeTabLink).each((link) => {
        if (!!link.hash) {
          let $currContent = $(M.escapeHash(link.hash));
          if ($currContent.length) {
            $currContent[0].style.display = 'none';
          }
        }
      });
    }

    /**
     * Teardown normal tabs.
     */
    _teardownNormalTabs() {
      // show Tabs Content
      this.$tabLinks.each((link) => {
        if (!!link.hash) {
          let $currContent = $(M.escapeHash(link.hash));
          if ($currContent.length) {
            $currContent[0].style.display = '';
          }
        }
      });
    }

    /**
     * set tabs and tab width
     */
    _setTabsAndTabWidth() {
      this.tabsWidth = this.$el.width();
      this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
    }

    /**
     * Finds right attribute for indicator based on active tab.
     * @param {cash} el
     */
    _calcRightPos(el) {
      return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
    }

    /**
     * Finds left attribute for indicator based on active tab.
     * @param {cash} el
     */
    _calcLeftPos(el) {
      return Math.floor(el.position().left);
    }

    updateTabIndicator() {
      this._animateIndicator(this.index);
    }

    /**
     * Animates Indicator to active tab.
     * @param {Number} prevIndex
     */
    _animateIndicator(prevIndex) {
      let leftDelay = 0,
          rightDelay = 0;

      if ((this.index - prevIndex) >= 0) {
        leftDelay = 90;

      } else {
        rightDelay = 90;
      }

      // Animate
      let animOptions = {
        targets: this._indicator,
        left: {
          value: this._calcLeftPos(this.$activeTabLink),
          delay: leftDelay
        },
        right: {
          value: this._calcRightPos(this.$activeTabLink),
          delay: rightDelay
        },
        duration: this.options.duration,
        easing: 'easeOutQuad'
      };
      anim.remove(this._indicator);
      anim(animOptions);
    }

    /**
     * Select tab.
     * @param {String} tabId
     */
    select(tabId) {
      let tab = this.$tabLinks.filter('[href="#' + tabId + '"]');
      if (tab.length) {
        tab.trigger('click');
      }
    }
  }


  window.M.Tabs = Tabs;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tabs, 'tabs', 'M_Tabs');
  }

})(cash, M.anime);

(function ($, anim) {
  'use strict';

  let _defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: 'bottom',
    transitionMovement: 10
  };


  /**
   * @class
   *
   */
  class Tooltip extends Component {
    /**
     * Construct Tooltip instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Tooltip, el, options);

      this.el.M_Tooltip = this;
      this.options = $.extend({}, Tooltip.defaults, options);

      this.isOpen = false;
      this.isHovered = false;
      this._appendTooltipEl();
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Tooltip;
    }

    /**
     * Teardown component
     */
    destroy() {
      $(this.tooltipEl).remove();
      this._removeEventHandlers();
      this.$el[0].M_Tooltip = undefined;
    }

    _appendTooltipEl() {
      let tooltipEl = document.createElement('div');
      tooltipEl.classList.add('material-tooltip');
      this.tooltipEl = tooltipEl;

      let tooltipContentEl = document.createElement('div');
      tooltipContentEl.classList.add('tooltip-content');
      tooltipContentEl.innerHTML = this.options.html;
      tooltipEl.appendChild(tooltipContentEl);
      document.body.appendChild(tooltipEl);
    }

    _updateTooltipContent() {
      this.tooltipEl.querySelector('.tooltip-content').innerHTML = this.options.html;
    }

    _setupEventHandlers() {
      this.handleMouseEnterBound = this._handleMouseEnter.bind(this);
      this.handleMouseLeaveBound = this._handleMouseLeave.bind(this);
      this.$el[0].addEventListener('mouseenter', this.handleMouseEnterBound);
      this.$el[0].addEventListener('mouseleave', this.handleMouseLeaveBound);
    }

    _removeEventHandlers() {
      this.$el[0].removeEventListener('mouseenter', this.handleMouseEnterBound);
      this.$el[0].removeEventListener('mouseleave', this.handleMouseLeaveBound);
    }

    open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      // Update tooltip content with HTML attribute options
      this.options = $.extend({}, this.options, this._getAttributeOptions());
      this._updateTooltipContent();
      this._setEnterDelayTimeout();
    }

    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this._setExitDelayTimeout();
    }

    /**
     * Create timeout which delays when the tooltip closes
     */
    _setExitDelayTimeout() {
      clearTimeout(this._exitDelayTimeout);

      this._exitDelayTimeout = setTimeout(() => {
        if (this.isHovered) {
          return;
        }

        this._animateOut();
      }, this.options.exitDelay);
    }

    /**
     * Create timeout which delays when the toast closes
     */
    _setEnterDelayTimeout() {
      clearTimeout(this._enterDelayTimeout);

      this._enterDelayTimeout = setTimeout(() => {
        if (!this.isHovered) {
          return;
        }

        this._animateIn();
      }, this.options.enterDelay);
    }

    _positionTooltip() {
      let origin = this.$el[0],
        tooltip = this.tooltipEl,
        originHeight = origin.offsetHeight,
        originWidth = origin.offsetWidth,
        tooltipHeight = tooltip.offsetHeight,
        tooltipWidth = tooltip.offsetWidth,
        newCoordinates,
        margin = this.options.margin,
        targetTop,
        targetLeft;

      this.xMovement = 0,
        this.yMovement = 0;

      targetTop = origin.getBoundingClientRect().top + M.getDocumentScrollTop();
      targetLeft = origin.getBoundingClientRect().left + M.getDocumentScrollLeft();

      if (this.options.position === 'top') {
        targetTop += -(tooltipHeight) - margin;
        targetLeft += originWidth / 2 - tooltipWidth / 2;
        this.yMovement = -(this.options.transitionMovement);

      } else if (this.options.position === 'right') {
        targetTop += originHeight / 2 - tooltipHeight / 2;
        targetLeft += originWidth + margin;
        this.xMovement = this.options.transitionMovement;

      } else if (this.options.position === 'left') {
        targetTop += originHeight / 2 - tooltipHeight / 2;
        targetLeft += -(tooltipWidth) - margin;
        this.xMovement = -(this.options.transitionMovement);

      } else {
        targetTop += originHeight + margin;
        targetLeft += originWidth / 2 - tooltipWidth / 2;
        this.yMovement = this.options.transitionMovement;
      }

      newCoordinates = this._repositionWithinScreen(
        targetLeft, targetTop, tooltipWidth, tooltipHeight);
      $(tooltip).css({
        top: newCoordinates.y + 'px',
        left: newCoordinates.x + 'px'
      });
    }

    _repositionWithinScreen(x, y, width, height) {
      let scrollLeft = M.getDocumentScrollLeft();
      let scrollTop = M.getDocumentScrollTop();
      let newX = x - scrollLeft;
      let newY = y - scrollTop;

      let bounding = {
        left: newX,
        top: newY,
        width: width,
        height: height
      };

      let offset = this.options.margin + this.options.transitionMovement;
      let edges = M.checkWithinContainer(document.body, bounding, offset);

      if (edges.left) {
        newX = offset;
      } else if (edges.right) {
        newX -= newX + width - window.innerWidth;
      }

      if (edges.top) {
        newY = offset;
      } else if (edges.bottom) {
        newY -= newY + height - window.innerHeight;
      }

      return {
        x: newX + scrollLeft,
        y: newY + scrollTop
      };
    }

    _animateIn() {
      this._positionTooltip();
      this.tooltipEl.style.visibility = 'visible';
      anim.remove(this.tooltipEl);
      anim({
        targets: this.tooltipEl,
        opacity: 1,
        translateX: this.xMovement,
        translateY: this.yMovement,
        duration: this.options.inDuration,
        easing: 'easeOutCubic'
      });
    }

    _animateOut() {
      anim.remove(this.tooltipEl);
      anim({
        targets: this.tooltipEl,
        opacity: 0,
        translateX: 0,
        translateY: 0,
        duration: this.options.outDuration,
        easing: 'easeOutCubic'
      });
    }

    _handleMouseEnter() {
      this.isHovered = true;
      this.open();
    }

    _handleMouseLeave() {
      this.isHovered = false;
      this.close();
    }

    _getAttributeOptions() {
      let attributeOptions = {};
      let tooltipTextOption = this.$el[0].getAttribute('data-tooltip');
      let positionOption = this.$el[0].getAttribute('data-position');

      if (tooltipTextOption) {
        attributeOptions.html = tooltipTextOption;
      }

      if (positionOption) {
        attributeOptions.position = positionOption;
      }
      return attributeOptions;
    }
  }

  M.Tooltip = Tooltip;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tooltip, 'tooltip', 'M_Tooltip');
  }

})(cash, M.anime);

/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration: 750,

        show: function(e, element) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

            // Support for touch devices
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.4;

            // Get first ripple
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };


    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentNode !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                element = target;
                break;
            }
            target = target.parentNode;
        }
        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
            element.addEventListener('dragend', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.waves-effect'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Waves.attach = function(element) {
        //FUTURE: automatically add waves classes and allow users
        // to specify them with an options param? Eg. light/classic/button
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentNode;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);

(function($, anim) {
  'use strict';

  let _defaults = {
    html: '',
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: '',
    completeCallback: null,
    activationPercent: 0.8
  };

  class Toast {
    constructor(options) {

      /**
       * Options for the toast
       * @member Toast#options
       */
      this.options = $.extend({}, Toast.defaults, options);
      this.message = this.options.html;

      /**
       * Describes current pan state toast
       * @type {Boolean}
       */
      this.panning = false;

      /**
       * Time remaining until toast is removed
       */
      this.timeRemaining = this.options.displayLength;

      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }

      // Create new toast
      Toast._toasts.push(this);
      let toastElement = this._createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this._animateIn();
      this._setTimer();
    }

    static get defaults() {
      return _defaults;
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Toast;
    }

    /**
     * Append toast container and add event handlers
     */
    static _createContainer() {
      let container = document.createElement('div');
      container.setAttribute('id', 'toast-container');

      // Add event handler
      container.addEventListener('touchstart', Toast._onDragStart);
      container.addEventListener('touchmove', Toast._onDragMove);
      container.addEventListener('touchend', Toast._onDragEnd);

      container.addEventListener('mousedown', Toast._onDragStart);
      document.addEventListener('mousemove', Toast._onDragMove);
      document.addEventListener('mouseup', Toast._onDragEnd);

      document.body.appendChild(container);
      Toast._container = container;
    }

    /**
     * Remove toast container and event handlers
     */
    static _removeContainer() {
      // Add event handler
      document.removeEventListener('mousemove', Toast._onDragMove);
      document.removeEventListener('mouseup', Toast._onDragEnd);

      Toast._container.parentNode.removeChild(Toast._container);
      Toast._container = null;
    }

    /**
     * Begin drag handler
     * @param {Event} e
     */
    static _onDragStart(e) {
      if (e.target && $(e.target).closest('.toast').length) {
        let $toast = $(e.target).closest('.toast');
        let toast = $toast[0].M_Toast;
        toast.panning = true;
        Toast._draggedToast = toast;
        toast.el.classList.add('panning');
        toast.el.style.transition = '';
        toast.startingXPos = Toast._xPos(e);
        toast.time = Date.now();
        toast.xPos = Toast._xPos(e);
      }
    }

    /**
     * Drag move handler
     * @param {Event} e
     */
    static _onDragMove(e) {
      if (!!Toast._draggedToast) {
        e.preventDefault();
        let toast = Toast._draggedToast;
        toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
        toast.xPos = Toast._xPos(e);
        toast.velocityX = toast.deltaX / (Date.now() - toast.time);
        toast.time = Date.now();

        let totalDeltaX = toast.xPos - toast.startingXPos;
        let activationDistance =
            toast.el.offsetWidth * toast.options.activationPercent;
        toast.el.style.transform = `translateX(${totalDeltaX}px)`;
        toast.el.style.opacity = 1-Math.abs(totalDeltaX / activationDistance);
      }
    }

    /**
     * End drag handler
     */
    static _onDragEnd() {
      if (!!Toast._draggedToast) {
        let toast = Toast._draggedToast;
        toast.panning = false;
        toast.el.classList.remove('panning');

        let totalDeltaX = toast.xPos - toast.startingXPos;
        let activationDistance =
            toast.el.offsetWidth * toast.options.activationPercent;
        let shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance ||
            toast.velocityX > 1;

        // Remove toast
        if (shouldBeDismissed) {
          toast.wasSwiped = true;
          toast.dismiss();

        // Animate toast back to original position
        } else {
          toast.el.style.transition = 'transform .2s, opacity .2s';
          toast.el.style.transform = '';
          toast.el.style.opacity = '';
        }
        Toast._draggedToast = null;
      }
    }

    /**
     * Get x position of mouse or touch event
     * @param {Event} e
     */
    static _xPos(e) {
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientX;
      }
      // mouse event
      return e.clientX;
    }

    /**
     * Remove all toasts
     */
    static dismissAll() {
      for(let toastIndex in Toast._toasts) {
        Toast._toasts[toastIndex].dismiss();
      }
    }


    /**
     * Create toast and append it to toast container
     */
    _createToast() {
      let toast = document.createElement('div');
      toast.classList.add('toast');

      // Add custom classes onto toast
      if (!!this.options.classes.length) {
        $(toast).addClass(this.options.classes);
      }

      // Set content
      if ( typeof HTMLElement === 'object' ?
           this.message instanceof HTMLElement :
           this.message && typeof this.message === 'object' &&
           this.message !== null && this.message.nodeType === 1 &&
           typeof this.message.nodeName==='string'
         ) {
        toast.appendChild(this.message);

      // Check if it is jQuery object
      } else if (!!this.message.jquery) {
        $(toast).append(this.message[0]);

      // Insert as html;
      } else {
        toast.innerHTML = this.message;
      }

      // Append toasft
      Toast._container.appendChild(toast);
      return toast;
    }

    /**
     * Animate in toast
     */
    _animateIn() {
      // Animate toast in
      anim({
        targets: this.el,
        top: 0,
        opacity: 1,
        duration: 300,
        easing: 'easeOutCubic'
      });
    }


    /**
     * Create setInterval which automatically removes toast when timeRemaining >= 0
     * has been reached
     */
    _setTimer() {
      if (this.timeRemaining !== Infinity)  {
        this.counterInterval = setInterval(() => {
          // If toast is not being dragged, decrease its time remaining
          if (!this.panning) {
            this.timeRemaining -= 20;
          }

          // Animate toast out
          if (this.timeRemaining <= 0) {
            this.dismiss();
          }
        }, 20);
      }
    }


    /**
     * Dismiss toast with animation
     */
    dismiss() {
      window.clearInterval(this.counterInterval);
      let activationDistance =
          this.el.offsetWidth * this.options.activationPercent;

      if(this.wasSwiped) {
        this.el.style.transition = 'transform .05s, opacity .05s';
        this.el.style.transform = `translateX(${activationDistance}px)`;
        this.el.style.opacity = 0;
      }


      anim({
        targets: this.el,
        opacity: 0,
        marginTop: -40,
        duration: this.options.outDuration,
        easing: 'easeOutExpo',
        complete: () => {
          // Call the optional callback
          if(typeof(this.options.completeCallback) === 'function') {
            this.options.completeCallback();
          }
          // Remove toast from DOM
          this.el.parentNode.removeChild(this.el);
          Toast._toasts.splice(Toast._toasts.indexOf(this), 1);
          if (Toast._toasts.length === 0) {
            Toast._removeContainer();
          }
        }
      });
    }
  }

  /**
   * @static
   * @memberof Toast
   * @type {Array.<Toast>}
   */
  Toast._toasts = [];

  /**
   * @static
   * @memberof Toast
   */
  Toast._container = null;

  /**
   * @static
   * @memberof Toast
   * @type {Toast}
   */
  Toast._draggedToast = null;

  M.Toast = Toast;
  M.toast = function(options) {
    return new Toast(options);
  };
})(cash, M.anime);

(function($, anim) {
  'use strict';

  let _defaults = {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
  };


  /**
   * @class
   */
  class Sidenav extends Component {
    /**
     * Construct Sidenav instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor (el, options) {
      super(Sidenav, el, options);

      this.el.M_Sidenav = this;
      this.id = this.$el.attr('id');

      /**
       * Options for the Sidenav
       * @member Sidenav#options
       * @prop {String} [edge='left'] - Side of screen on which Sidenav appears
       * @prop {Boolean} [draggable=true] - Allow swipe gestures to open/close Sidenav
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      this.options = $.extend({}, Sidenav.defaults, options);

      /**
       * Describes open/close state of Sidenav
       * @type {Boolean}
       */
      this.isOpen = false;

      /**
       * Describes if Sidenav is fixed
       * @type {Boolean}
       */
      this.isFixed = this.el.classList.contains('sidenav-fixed');

      /**
       * Describes if Sidenav is being draggeed
       * @type {Boolean}
       */
      this.isDragged = false;

      this._createOverlay();
      this._createDragTarget();
      this._setupEventHandlers();
      this._setupClasses();
      this._setupFixed();

      Sidenav._sidenavs.push(this);
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Sidenav;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this._overlay.parentNode.removeChild(this._overlay);
      this.dragTarget.parentNode.removeChild(this.dragTarget);
      this.el.M_Sidenav = undefined;

      let index = Sidenav._sidenavs.indexOf(this);
      if (index >= 0) {
        Sidenav._sidenavs.splice(index, 1);
      }
    }

    _createOverlay() {
      let overlay = document.createElement('div');
      this._closeBound = this.close.bind(this);
      overlay.classList.add('sidenav-overlay');

      overlay.addEventListener('click', this._closeBound);

      document.body.appendChild(overlay);
      this._overlay = overlay;
    }

    _setupEventHandlers() {
      if (Sidenav._sidenavs.length === 0) {
        document.body.addEventListener('click', this._handleTriggerClick);
      }

      this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
      this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
      this._handleCloseDragBound = this._handleCloseDrag.bind(this);
      this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
      this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);

      this.dragTarget.addEventListener('touchmove', this._handleDragTargetDragBound);
      this.dragTarget.addEventListener('touchend', this._handleDragTargetReleaseBound);
      this._overlay.addEventListener('touchmove', this._handleCloseDragBound);
      this._overlay.addEventListener('touchend', this._handleCloseReleaseBound);
      this.el.addEventListener('touchmove', this._handleCloseDragBound);
      this.el.addEventListener('touchend', this._handleCloseReleaseBound);
      this.el.addEventListener('click', this._handleCloseTriggerClickBound);


      // Add resize for side nav fixed
      if (this.isFixed) {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._handleWindowResizeBound);
      }
    }

    _removeEventHandlers() {
      if (Sidenav._sidenavs.length === 1) {
        document.body.removeEventListener('click', this._handleTriggerClick);
      }

      this.dragTarget.removeEventListener('touchmove', this._handleDragTargetDragBound);
      this.dragTarget.removeEventListener('touchend', this._handleDragTargetReleaseBound);
      this._overlay.removeEventListener('touchmove', this._handleCloseDragBound);
      this._overlay.removeEventListener('touchend', this._handleCloseReleaseBound);
      this.el.removeEventListener('touchmove', this._handleCloseDragBound);
      this.el.removeEventListener('touchend', this._handleCloseReleaseBound);
      this.el.removeEventListener('click', this._handleCloseTriggerClickBound);

      // Remove resize for side nav fixed
      if (this.isFixed) {
        window.removeEventListener('resize', this._handleWindowResizeBound);
      }
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    _handleTriggerClick(e) {
      let $trigger =  $(e.target).closest('.sidenav-trigger');
      if (e.target && $trigger.length) {
        let sidenavId = M.getIdFromTrigger($trigger[0]);

        let sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
        if (sidenavInstance) {
          sidenavInstance.open($trigger);
        }
        e.preventDefault();
      }
    }


    /**
     * Set variables needed at the beggining of drag
     * and stop any current transition.
     * @param {Event} e
     */
    _startDrag(e) {
      let clientX = e.targetTouches[0].clientX;
      this.isDragged = true;
      this._startingXpos = clientX;
      this._xPos = this._startingXpos;
      this._time = Date.now();
      this._width = this.el.getBoundingClientRect().width;
      this._overlay.style.display = 'block';
      anim.remove(this.el);
      anim.remove(this._overlay);
    }


    /**
     * Set variables needed at each drag move update tick
     * @param {Event} e
     */
    _dragMoveUpdate(e) {
      let clientX = e.targetTouches[0].clientX;
      this.deltaX = Math.abs(this._xPos - clientX);
      this._xPos = clientX;
      this.velocityX = this.deltaX / (Date.now() - this._time);
      this._time = Date.now();
    }


    /**
     * Handles Dragging of Sidenav
     * @param {Event} e
     */
    _handleDragTargetDrag(e) {
      // If not being dragged, set initial drag start variables
      if (!this.isDragged) {
        this._startDrag(e);
      }

      // Run touchmove updates
      this._dragMoveUpdate(e);

      // Calculate raw deltaX
      let totalDeltaX = this._xPos - this._startingXpos;

      // dragDirection is the attempted user drag direction
      let dragDirection = totalDeltaX > 0 ? 'right' : 'left';

      // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
      totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
      if (this.options.edge === dragDirection) {
        totalDeltaX = 0;
      }


      /**
       * transformX is the drag displacement
       * transformPrefix is the initial transform placement
       * Invert values if Sidenav is right edge
       */
      let transformX = totalDeltaX;
      let transformPrefix = 'translateX(-100%)';
      if (this.options.edge === 'right') {
        transformPrefix = 'translateX(100%)';
        transformX = -transformX;
      }

      // Calculate open/close percentage of sidenav, with open = 1 and close = 0
      this.percentOpen = Math.min(1, totalDeltaX / this._width);

      // Set transform and opacity styles
      this.el.style.transform = `${transformPrefix} translateX(${transformX}px)`;
      this._overlay.style.opacity = this.percentOpen;
    }

    /**
     * Handle Drag Target Release
     */
    _handleDragTargetRelease() {
      if (this.isDragged) {
        if (this.percentOpen > .5) {
          this.open();
        } else {
          this._animateOut();
        }

        this.isDragged = false;
      }
    }

    /**
     * Handle Close Drag
     * @param {Event} e
     */
    _handleCloseDrag(e) {
      if (this.isOpen) {

        // If not being dragged, set initial drag start variables
        if (!this.isDragged) {
          this._startDrag(e);
        }

        // Run touchmove updates
        this._dragMoveUpdate(e);

        // Calculate raw deltaX
        let totalDeltaX = this._xPos - this._startingXpos;

        // dragDirection is the attempted user drag direction
        let dragDirection = totalDeltaX > 0 ? 'right' : 'left';

        // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge !== dragDirection) {
          totalDeltaX = 0;
        }

        let transformX = -totalDeltaX;
        if (this.options.edge === 'right') {
          transformX = -transformX;
        }

        // Calculate open/close percentage of sidenav, with open = 1 and close = 0
        this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);

        // Set transform and opacity styles
        this.el.style.transform = `translateX(${transformX}px)`;
        this._overlay.style.opacity = this.percentOpen;
      }
    }

    /**
     * Handle Close Release
     */
    _handleCloseRelease() {
      if (this.isOpen && this.isDragged) {
        if (this.percentOpen > .5) {
          this._animateIn();
        } else {
          this.close();
        }

        this.isDragged = false;
      }
    }


    /**
     * Handles closing of Sidenav when element with class .sidenav-close
     */
    _handleCloseTriggerClick(e) {
      let $closeTrigger = $(e.target).closest('.sidenav-close');
      if ($closeTrigger.length) {
        this.close();
      }
    }

    /**
     * Handle Window Resize
     */
    _handleWindowResize() {
      if (window.innerWidth > 992) {
        this.open();
      }
      else {
        this.close();
      }
    }

    _setupClasses() {
      if (this.options.edge === 'right') {
        this.el.classList.add('right-aligned');
        this.dragTarget.classList.add('right-aligned');
      }
    }

    _removeClasses() {
      this.el.classList.remove('right-aligned');
      this.dragTarget.classList.remove('right-aligned');
    }

    _setupFixed() {
      if (this.isFixed && window.innerWidth > 992) {
        this.open();
      }
    }

    _createDragTarget() {
      let dragTarget = document.createElement('div');
      dragTarget.classList.add('drag-target');
      document.body.appendChild(dragTarget);
      this.dragTarget = dragTarget;
    }

    _preventBodyScrolling() {
      let body = document.body;
      body.style.overflow = 'hidden';
    }

    _enableBodyScrolling() {
      let body = document.body;
      body.style.overflow = '';
    }

    open() {
      if (this.isOpen === true) {
        return;
      }

      this.isOpen = true;

      // Run onOpenStart callback
      if (typeof(this.options.onOpenStart) === 'function') {
        this.options.onOpenStart.call(this, this.el);
      }

      // Handle fixed Sidenav
      if (this.isFixed && window.innerWidth > 992) {
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: 0,
          duration: 0,
          easing: 'easeOutQuad'
        });
        this._enableBodyScrolling();
        this._overlay.style.display = 'none';

      // Handle non-fixed Sidenav
      } else {
        this._preventBodyScrolling();

        if (!this.isDragged || this.percentOpen != 1) {
          this._animateIn();
        }
      }
    }

    close() {
      if (this.isOpen === false) {
        return;
      }

      this.isOpen = false;

      // Run onCloseStart callback
      if (typeof(this.options.onCloseStart) === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      // Handle fixed Sidenav
      if (this.isFixed && window.innerWidth > 992) {
        let transformX = this.options.edge === 'left' ? '-105%' : '105%';
        this.el.style.transform = `translateX(${transformX})`;

      // Handle non-fixed Sidenav
      } else {
        this._enableBodyScrolling();

        if (!this.isDragged || this.percentOpen != 0) {
          this._animateOut();
        } else {
          this._overlay.style.display = 'none';
        }
      }
    }

    _animateIn() {
      this._animateSidenavIn();
      this._animateOverlayIn();
    }

    _animateSidenavIn() {
      let slideOutPercent = this.options.edge === 'left' ? -1 : 1;
      if (this.isDragged) {
        slideOutPercent = this.options.edge === 'left' ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
      }

      anim.remove(this.el);
      anim({
        targets: this.el,
        translateX:  [`${slideOutPercent * 100}%`, 0],
        duration: this.options.inDuration,
        easing: 'easeOutQuad',
        complete: () => {
          // Run onOpenEnd callback
          if (typeof(this.options.onOpenEnd) === 'function') {
            this.options.onOpenEnd.call(this, this.el);
          }
        }
      });
    }

    _animateOverlayIn() {
      let start = 0;
      if (this.isDragged) {
        start = this.percentOpen;
      } else {
        $(this._overlay).css({
          display: 'block'
        });
      }

      anim.remove(this._overlay);
      anim({
        targets: this._overlay,
        opacity: [start, 1],
        duration: this.options.inDuration,
        easing: 'easeOutQuad'
      });
    }

    _animateOut() {
      this._animateSidenavOut();
      this._animateOverlayOut();
    }

    _animateSidenavOut() {
      let endPercent = this.options.edge === 'left' ? -1 : 1;
      let slideOutPercent = 0;
      if (this.isDragged) {
        slideOutPercent = this.options.edge === 'left' ? endPercent + this.percentOpen : endPercent - this.percentOpen;
      }

      anim.remove(this.el);
      anim({
        targets: this.el,
        translateX: [`${slideOutPercent * 100}%`, `${endPercent * 105}%`],
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
        complete: () => {
          // Run onOpenEnd callback
          if (typeof(this.options.onCloseEnd) === 'function') {
            this.options.onCloseEnd.call(this, this.el);
          }
        }
      });
    }

    _animateOverlayOut() {
      anim.remove(this._overlay);
      anim({
        targets: this._overlay,
        opacity: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
        complete: () => {
          $(this._overlay).css('display', 'none');
        }
      });
    }
  }

  /**
   * @static
   * @memberof Sidenav
   * @type {Array.<Sidenav>}
   */
  Sidenav._sidenavs = [];

  window.M.Sidenav = Sidenav;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, 'sidenav', 'M_Sidenav');
  }

})(cash, M.anime);

(function ($, anim) {
  'use strict';

  let _defaults = {
    throttle: 100,
    scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
    activeClass: 'active',
    getActiveElement: function (id) {
      return 'a[href="#' + id + '"]';
    }
  };

  /**
   * @class
   *
   */
  class ScrollSpy extends Component {
    /**
     * Construct ScrollSpy instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(ScrollSpy, el, options);

      this.el.M_ScrollSpy = this;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [throttle=100] - Throttle of scroll handler
       * @prop {Number} [scrollOffset=200] - Offset for centering element when scrolled to
       * @prop {String} [activeClass='active'] - Class applied to active elements
       * @prop {Function} [getActiveElement] - Used to find active element
       */
      this.options = $.extend({}, ScrollSpy.defaults, options);

      // setup
      ScrollSpy._elements.push(this);
      ScrollSpy._count++;
      ScrollSpy._increment++;
      this.tickId = -1;
      this.id = ScrollSpy._increment;
      this._setupEventHandlers();
      this._handleWindowScroll();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_ScrollSpy;
    }

    /**
     * Teardown component
     */
    destroy() {
      ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);
      ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);
      ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);
      ScrollSpy._count--;
      this._removeEventHandlers();
      $(this.options.getActiveElement(this.$el.attr('id'))).removeClass(this.options.activeClass);
      this.el.M_ScrollSpy = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      let throttledResize = M.throttle(this._handleWindowScroll, 200);
      this._handleThrottledResizeBound = throttledResize.bind(this);
      this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
      if (ScrollSpy._count === 1) {
        window.addEventListener('scroll', this._handleWindowScrollBound);
        window.addEventListener('resize', this._handleThrottledResizeBound);
        document.body.addEventListener('click', this._handleTriggerClick);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (ScrollSpy._count === 0) {
        window.removeEventListener('scroll', this._handleWindowScrollBound);
        window.removeEventListener('resize', this._handleThrottledResizeBound);
        document.body.removeEventListener('click', this._handleTriggerClick);
      }
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    _handleTriggerClick(e) {
      let $trigger = $(e.target);
      for (let i = ScrollSpy._elements.length - 1; i >= 0; i--) {
        let scrollspy = ScrollSpy._elements[i];
        if ($trigger.is('a[href="#' + scrollspy.$el.attr('id') + '"]')) {
          e.preventDefault();
          let offset = scrollspy.$el.offset().top + 1;

          anim({
            targets: [document.documentElement, document.body],
            scrollTop: offset - scrollspy.options.scrollOffset,
            duration: 400,
            easing: 'easeOutCubic'
          });
          break;
        }
      }
    }

    /**
     * Handle Window Scroll
     */
    _handleWindowScroll() {
      // unique tick id
      ScrollSpy._ticks++;

      // viewport rectangle
      let top = M.getDocumentScrollTop(),
        left = M.getDocumentScrollLeft(),
        right = left + window.innerWidth,
        bottom = top + window.innerHeight;

      // determine which elements are in view
      let intersections = ScrollSpy._findElements(top, right, bottom, left);
      for (let i = 0; i < intersections.length; i++) {
        let scrollspy = intersections[i];
        let lastTick = scrollspy.tickId;
        if (lastTick < 0) {
          // entered into view
          scrollspy._enter();
        }

        // update tick id
        scrollspy.tickId = ScrollSpy._ticks;
      }

      for (let i = 0; i < ScrollSpy._elementsInView.length; i++) {
        let scrollspy = ScrollSpy._elementsInView[i];
        let lastTick = scrollspy.tickId;
        if (lastTick >= 0 && lastTick !== ScrollSpy._ticks) {
          // exited from view
          scrollspy._exit();
          scrollspy.tickId = -1;
        }
      }

      // remember elements in view for next tick
      ScrollSpy._elementsInView = intersections;
    }

    /**
     * Find elements that are within the boundary
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     * @param {number} left
     * @return {Array.<ScrollSpy>}   A collection of elements
     */
    static _findElements(top, right, bottom, left) {
      let hits = [];
      for (let i = 0; i < ScrollSpy._elements.length; i++) {
        let scrollspy = ScrollSpy._elements[i];
        let currTop = top + scrollspy.options.scrollOffset || 200;

        if (scrollspy.$el.height() > 0) {
          let elTop = scrollspy.$el.offset().top,
            elLeft = scrollspy.$el.offset().left,
            elRight = elLeft + scrollspy.$el.width(),
            elBottom = elTop + scrollspy.$el.height();

          let isIntersect = !(elLeft > right ||
            elRight < left ||
            elTop > bottom ||
            elBottom < currTop);

          if (isIntersect) {
            hits.push(scrollspy);
          }
        }
      }
      return hits;
    }

    _enter() {
      ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
        return value.height() != 0;
      });

      if (ScrollSpy._visibleElements[0]) {
        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
        if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
          ScrollSpy._visibleElements.unshift(this.$el);
        } else {
          ScrollSpy._visibleElements.push(this.$el);
        }
      } else {
        ScrollSpy._visibleElements.push(this.$el);
      }

      $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
    }

    _exit() {
      ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
        return value.height() != 0;
      });

      if (ScrollSpy._visibleElements[0]) {
        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);

        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter((el) => {
          return el.attr('id') != this.$el.attr('id');
        });
        if (ScrollSpy._visibleElements[0]) { // Check if empty
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
        }
      }
    }
  }

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */
  ScrollSpy._elements = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */
  ScrollSpy._elementsInView = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<cash>}
   */
  ScrollSpy._visibleElements = [];

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._count = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._increment = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._ticks = 0;


  M.ScrollSpy = ScrollSpy;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, 'scrollSpy', 'M_ScrollSpy');
  }

})(cash, M.anime);

(function ($) {
  // Function to update labels of text fields
  M.updateTextFields = function() {
    let input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
    $(input_selector).each(function(element, index) {
      let $this = $(this);
      if (element.value.length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== null) {
        $this.siblings('label').addClass('active');
      } else if (element.validity) {
        $this.siblings('label').toggleClass('active', element.validity.badInput === true);
      } else {
        $this.siblings('label').removeClass('active');
      }
    });
  };

  M.validate_field = function(object) {
    let hasLength = object.attr('data-length') !== null;
    let lenAttr = parseInt(object.attr('data-length'));
    let len = object[0].value.length;

    if (len === 0 && object[0].validity.badInput === false && !object.is(':required')) {
      if (object.hasClass('validate')) {
        object.removeClass('valid');
        object.removeClass('invalid');
      }

    } else {
      if (object.hasClass('validate')) {
        // Check for character counter attributes
        if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
          object.removeClass('invalid');
          object.addClass('valid');
        }
        else {
          object.removeClass('valid');
          object.addClass('invalid');
        }
      }
    }
  };


  M.textareaAutoResize = function($textarea) {
    // Wrap if native element
    if ($textarea instanceof Element) {
      $textarea = $($textarea);
    }

    // Textarea Auto Resize
    let hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }

    // Set font properties of hiddenDiv
    let fontFamily = $textarea.css('font-family');
    let fontSize = $textarea.css('font-size');
    let lineHeight = $textarea.css('line-height');

    // Firefox can't handle padding shorthand.
    let paddingTop = $textarea.css('padding-top');
    let paddingRight = $textarea.css('padding-right');
    let paddingBottom = $textarea.css('padding-bottom');
    let paddingLeft = $textarea.css('padding-left');

    if (fontSize) { hiddenDiv.css('font-size', fontSize); }
    if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }
    if (lineHeight) { hiddenDiv.css('line-height', lineHeight); }
    if (paddingTop) { hiddenDiv.css('padding-top', paddingTop); }
    if (paddingRight) { hiddenDiv.css('padding-right', paddingRight); }
    if (paddingBottom) { hiddenDiv.css('padding-bottom', paddingBottom); }
    if (paddingLeft) { hiddenDiv.css('padding-left', paddingLeft); }

    // Set original-height, if none
    if (!$textarea.data('original-height')) {
      $textarea.data('original-height', $textarea.height());
    }

    if ($textarea.attr('wrap') === 'off') {
      hiddenDiv.css('overflow-wrap', 'normal')
        .css('white-space', 'pre');
    }

    hiddenDiv.text($textarea[0].value + '\n');
    let content = hiddenDiv.html().replace(/\n/g, '<br>');
    hiddenDiv.html(content);


    // When textarea is hidden, width goes crazy.
    // Approximate with half of window size

    if ($textarea.css('display') !== 'hidden') {
      hiddenDiv.css('width', $textarea.width() + 'px');
    }
    else {
      hiddenDiv.css('width', ($(window).width()/2) + 'px');
    }


    /**
     * Resize if the new height is greater than the
     * original height of the textarea
     */
    if ($textarea.data('original-height') <= hiddenDiv.innerHeight()) {
      $textarea.css('height', hiddenDiv.innerHeight() + 'px');
    } else if ($textarea[0].value.length < $textarea.data('previous-length')) {
      /**
       * In case the new height is less than original height, it
       * means the textarea has less text than before
       * So we set the height to the original one
       */
      $textarea.css('height', $textarea.data('original-height') + 'px');
    }
    $textarea.data('previous-length', $textarea[0].value.length);
  };


  $(document).ready(function() {
    // Text based inputs
    let input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if(this.value.length !== 0 || $(this).attr('placeholder') !== null) {
        $(this).siblings('label').addClass('active');
      }
      M.validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function() {
      M.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function(e) {
      let formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function (e) {
          if (this.value.length) {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select (after native reset)
        setTimeout(function() {
          formReset.find('select').each(function () {
            // check if initialized
            if (this.M_Select) {
              let reset_text = $(this).find('option[selected]').text();
              $(this).siblings('input.select-dropdown')[0].value = reset_text;
            }
          });
        }, 0);
      }
    });

    /**
     * Add active when element has focus
     * @param {Event} e
     */
    document.addEventListener('focus', function(e) {
      if ($(e.target).is(input_selector)) {
        $(e.target).siblings('label, .prefix').addClass('active');
      }
    }, true);

    /**
     * Remove active when element is blurred
     * @param {Event} e
     */
    document.addEventListener('blur', function(e) {
      let $inputElement = $(e.target);
      if ($inputElement.is(input_selector)) {
        let selector = ".prefix";

        if ($inputElement[0].value.length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === null) {
          selector += ", label";
        }
        $inputElement.siblings(selector).removeClass('active');
        M.validate_field($inputElement);
      }
    }, true);

    // Radio and Checkbox focus class
    let radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup', radio_checkbox, function(e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === M.keys.TAB) {
        $(this).addClass('tabbed');
        let $this = $(this);
        $this.one('blur', function(e) {
          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    let text_area_selector = '.materialize-textarea';
    $(text_area_selector).each(function () {
      let $textarea = $(this);
      /**
       * Resize textarea on document load after storing
       * the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', this.value.length);
      M.textareaAutoResize($textarea);
    });

    $(document).on('keyup', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on('keydown', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      let file_field = $(this).closest('.file-field');
      let path_input = file_field.find('input.file-path');
      let files      = $(this)[0].files;
      let file_names = [];
      for (let i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input[0].value = file_names.join(", ");
      path_input.trigger('change');
    });

  }); // End of $(document).ready
}( cash ));

(function ($, anim) {
  'use strict';

  let _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };


  /**
   * @class
   *
   */
  class Slider extends Component {
    /**
     * Construct Slider instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Slider, el, options);

      this.el.M_Slider = this;

      /**
       * Options for the modal
       * @member Slider#options
       * @prop {Boolean} [indicators=true] - Show indicators
       * @prop {Number} [height=400] - height of slider
       * @prop {Number} [duration=500] - Length in ms of slide transition
       * @prop {Number} [interval=6000] - Length in ms of slide interval
       */
      this.options = $.extend({}, Slider.defaults, options);

      // setup
      this.$slider = this.$el.find('.slides');
      this.$slides = this.$slider.children('li');
      this.activeIndex = this.$slider.find('.active').index();
      if (this.activeIndex != -1) {
        this.$active = this.$slides.eq(this.activeIndex);
      }

      this._setSliderHeight();

      // Set initial positions of captions
      this.$slides.find('.caption').each((el) => {
        this._animateCaptionIn(el, 0);
      });

      // Move img src into background-image
      this.$slides.find('img').each((el) => {
        let placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        if ($(el).attr('src') !== placeholderBase64) {
          $(el).css('background-image', 'url("' + $(el).attr('src') + '")');
          $(el).attr('src', placeholderBase64);
        }
      });

      this._setupIndicators();

      // Show active slide
      if (this.$active) {
        this.$active.css('display', 'block');
      } else {
        this.$slides.first().addClass('active');
        anim({
          targets: this.$slides.first()[0],
          opacity: 1,
          duration: this.options.duration,
          easing: 'easeOutQuad'
        });

        this.activeIndex = 0;
        this.$active = this.$slides.eq(this.activeIndex);

        // Update indicators
        if (this.options.indicators) {
          this.$indicators.eq(this.activeIndex).addClass('active');
        }
      }

      // Adjust height to current slide
      this.$active.find('img').each((el) => {
        anim({
          targets: this.$active.find('.caption')[0],
          opacity: 1,
          translateX: 0,
          translateY: 0,
          duration: this.options.duration,
          easing: 'easeOutQuad'
        });
      });

      this._setupEventHandlers();

      // auto scroll
      this.start();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Slider;
    }

    /**
     * Teardown component
     */
    destroy() {
      this.pause();
      this._removeIndicators();
      this._removeEventHandlers();
      this.el.M_Slider = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleIntervalBound = this._handleInterval.bind(this);
      this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);

      if (this.options.indicators) {
        this.$indicators.each((el) => {
          el.addEventListener('click', this._handleIndicatorClickBound);
        });
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (this.options.indicators) {
        this.$indicators.each((el) => {
          el.removeEventListener('click', this._handleIndicatorClickBound);
        });
      }
    }

    /**
     * Handle indicator click
     * @param {Event} e
     */
    _handleIndicatorClick(e) {
      let currIndex = $(e.target).index();
      this.set(currIndex);
    }

    /**
     * Handle Interval
     */
    _handleInterval() {
      let newActiveIndex = this.$slider.find('.active').index();
      if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0; // loop to start
      else newActiveIndex += 1;

      this.set(newActiveIndex);
    }

    /**
     * Animate in caption
     * @param {Element} caption
     * @param {Number} duration
     */
    _animateCaptionIn(caption, duration) {
      let animOptions = {
        targets: caption,
        opacity: 0,
        duration: duration,
        easing: 'easeOutQuad'
      };

      if ($(caption).hasClass('center-align')) {
        animOptions.translateY = -100;

      } else if ($(caption).hasClass('right-align')) {
        animOptions.translateX = 100;

      } else if ($(caption).hasClass('left-align')) {
        animOptions.translateX = -100;
      }

      anim(animOptions);
    }

    /**
     * Set height of slider
     */
    _setSliderHeight() {
      // If fullscreen, do nothing
      if (!this.$el.hasClass('fullscreen')) {
        if (this.options.indicators) {
          // Add height if indicators are present
          this.$el.css('height', (this.options.height + 40) + 'px');
        } else {
          this.$el.css('height', this.options.height + 'px');
        }
        this.$slider.css('height', this.options.height + 'px');
      }
    }

    /**
     * Setup indicators
     */
    _setupIndicators() {
      if (this.options.indicators) {
        this.$indicators = $('<ul class="indicators"></ul>');
        this.$slides.each((el, index) => {
          let $indicator = $('<li class="indicator-item"></li>');
          this.$indicators.append($indicator[0]);
        });
        this.$el.append(this.$indicators[0]);
        this.$indicators = this.$indicators.children('li.indicator-item');
      }
    }

    /**
     * Remove indicators
     */
    _removeIndicators() {
      this.$el.find('ul.indicators').remove();
    }

    /**
     * Cycle to nth item
     * @param {Number} index
     */
    set(index) {
      // Wrap around indices.
      if (index >= this.$slides.length) index = 0;
      else if (index < 0) index = this.$slides.length - 1;

      // Only do if index changes
      if (this.activeIndex != index) {
        this.$active = this.$slides.eq(this.activeIndex);
        let $caption = this.$active.find('.caption');
        this.$active.removeClass('active');

        anim({
          targets: this.$active[0],
          opacity: 0,
          duration: this.options.duration,
          easing: 'easeOutQuad',
          complete: () => {
            this.$slides.not('.active').each((el) => {
              anim({
                targets: el,
                opacity: 0,
                translateX: 0,
                translateY: 0,
                duration: 0,
                easing: 'easeOutQuad'
              });
            });
          }
        });

        this._animateCaptionIn($caption[0], this.options.duration);

        // Update indicators
        if (this.options.indicators) {
          this.$indicators.eq(this.activeIndex).removeClass('active');
          this.$indicators.eq(index).addClass('active');
        }

        anim({
          targets: this.$slides.eq(index)[0],
          opacity: 1,
          duration: this.options.duration,
          easing: 'easeOutQuad'
        });

        anim({
          targets: this.$slides.eq(index).find('.caption')[0],
          opacity: 1,
          translateX: 0,
          translateY: 0,
          duration: this.options.duration,
          delay: this.options.duration,
          easing: 'easeOutQuad'
        });

        this.$slides.eq(index).addClass('active');
        this.activeIndex = index;

        // Reset interval
        this.start();
      }
    }

    /**
     * Pause slider interval
     */
    pause() {
      clearInterval(this.interval);
    }

    /**
     * Start slider interval
     */
    start() {
      clearInterval(this.interval);
      this.interval = setInterval(
        this._handleIntervalBound, this.options.duration + this.options.interval
      );
    }

    /**
     * Move to next slide
     */
    next() {
      let newIndex = this.activeIndex + 1;

      // Wrap around indices.
      if (newIndex >= this.$slides.length) newIndex = 0;
      else if (newIndex < 0) newIndex = this.$slides.length - 1;

      this.set(newIndex);
    }

    /**
     * Move to previous slide
     */
    prev() {
      let newIndex = this.activeIndex - 1;

      // Wrap around indices.
      if (newIndex >= this.$slides.length) newIndex = 0;
      else if (newIndex < 0) newIndex = this.$slides.length - 1;

      this.set(newIndex);
    }
  }

  M.Slider = Slider;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, 'slider', 'M_Slider');
  }

}(cash, M.anime));

(function ($, anim) {
  $(document).on('click', '.card', function (e) {
    if ($(this).children('.card-reveal').length) {
      var $card = $(e.target).closest('.card');
      if ($card.data('initialOverflow') === undefined) {
        $card.data(
          'initialOverflow',
          $card.css('overflow') === undefined ? '' : $card.css('overflow')
        );
      }
      let $cardReveal = $(this).find('.card-reveal');
      if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        anim({
          targets: $cardReveal[0],
          translateY: 0,
          duration: 225,
          easing: 'easeInOutQuad',
          complete: function(anim) {
            let el = anim.animatables[0].target;
            $(el).css({ display: 'none'});
            $card.css('overflow', $card.data('initialOverflow'));
          }
        });
      }
      else if ($(e.target).is($('.card .activator')) ||
               $(e.target).is($('.card .activator i')) ) {
        $card.css('overflow', 'hidden');
        $cardReveal.css({ display: 'block'});
        anim({
          targets: $cardReveal[0],
          translateY: '-100%',
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
    }
  });
}( cash, M.anime));

(function ($) {
  'use strict';

  let _defaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
    limit: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };


  /**
   * @typedef {Object} chip
   * @property {String} tag  chip tag string
   * @property {String} [image]  chip avatar image string
   */

  /**
   * @class
   *
   */
  class Chips extends Component {
    /**
     * Construct Chips instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Chips, el, options);

      this.el.M_Chips = this;

      /**
       * Options for the modal
       * @member Chips#options
       * @prop {Array} data
       * @prop {String} placeholder
       * @prop {String} secondaryPlaceholder
       * @prop {Object} autocompleteOptions
       */
      this.options = $.extend({}, Chips.defaults, options);

      this.$el.addClass('chips input-field');
      this.chipsData = [];
      this.$chips = $();
      this._setupInput();
      this.hasAutocomplete = Object.keys(this.options.autocompleteOptions).length > 0;

      // Set input id
      if (!this.$input.attr('id')) {
        this.$input.attr('id', M.guid());
      }

      // Render initial chips
      if (this.options.data.length) {
        this.chipsData = this.options.data;
        this._renderChips(this.chipsData);
      }

      // Setup autocomplete if needed
      if (this.hasAutocomplete) {
        this._setupAutocomplete();
      }

      this._setPlaceholder();
      this._setupLabel();
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Chips;
    }

    /**
     * Get Chips Data
     */
    getData() {
      return this.chipsData;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.$chips.remove();
      this.el.M_Chips = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleChipClickBound = this._handleChipClick.bind(this);
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
      this._handleInputFocusBound = this._handleInputFocus.bind(this);
      this._handleInputBlurBound = this._handleInputBlur.bind(this);

      this.el.addEventListener('click', this._handleChipClickBound);
      document.addEventListener('keydown', Chips._handleChipsKeydown);
      document.addEventListener('keyup', Chips._handleChipsKeyup);
      this.el.addEventListener('blur', Chips._handleChipsBlur, true);
      this.$input[0].addEventListener('focus', this._handleInputFocusBound);
      this.$input[0].addEventListener('blur', this._handleInputBlurBound);
      this.$input[0].addEventListener('keydown', this._handleInputKeydownBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleChipClickBound);
      document.removeEventListener('keydown', Chips._handleChipsKeydown);
      document.removeEventListener('keyup', Chips._handleChipsKeyup);
      this.el.removeEventListener('blur', Chips._handleChipsBlur, true);
      this.$input[0].removeEventListener('focus', this._handleInputFocusBound);
      this.$input[0].removeEventListener('blur', this._handleInputBlurBound);
      this.$input[0].removeEventListener('keydown', this._handleInputKeydownBound);
    }

    /**
     * Handle Chip Click
     * @param {Event} e
     */
    _handleChipClick(e) {
      let $chip = $(e.target).closest('.chip');
      let clickedClose = $(e.target).is('.close');
      if ($chip.length) {
        let index = $chip.index();
        if (clickedClose) {
          // delete chip
          this.deleteChip(index);
          this.$input[0].focus();

        } else {
          // select chip
          this.selectChip(index);
        }

        // Default handle click to focus on input
      } else {
        this.$input[0].focus();
      }
    }

    /**
     * Handle Chips Keydown
     * @param {Event} e
     */
    static _handleChipsKeydown(e) {
      Chips._keydown = true;

      let $chips = $(e.target).closest('.chips');
      let chipsKeydown = e.target && $chips.length;

      // Don't handle keydown inputs on input and textarea
      if ($(e.target).is('input, textarea') || !chipsKeydown) {
        return;
      }

      let currChips = $chips[0].M_Chips;

      // backspace and delete
      if (e.keyCode === 8 || e.keyCode === 46) {
        e.preventDefault();

        let selectIndex = currChips.chipsData.length;
        if (currChips._selectedChip) {
          let index = currChips._selectedChip.index();
          currChips.deleteChip(index);
          currChips._selectedChip = null;
          selectIndex = index - 1;
        }

        if (currChips.chipsData.length) {
          currChips.selectChip(selectIndex);
        }

        // left arrow key
      } else if (e.keyCode === 37) {
        if (currChips._selectedChip) {
          let selectIndex = currChips._selectedChip.index() - 1;
          if (selectIndex < 0) {
            return;
          }
          currChips.selectChip(selectIndex);
        }

        // right arrow key
      } else if (e.keyCode === 39) {
        if (currChips._selectedChip) {
          let selectIndex = currChips._selectedChip.index() + 1;

          if (selectIndex >= currChips.chipsData.length) {
            currChips.$input[0].focus();
          } else {
            currChips.selectChip(selectIndex);
          }
        }
      }
    }

    /**
     * Handle Chips Keyup
     * @param {Event} e
     */
    static _handleChipsKeyup(e) {
      Chips._keydown = false;
    }

    /**
     * Handle Chips Blur
     * @param {Event} e
     */
    static _handleChipsBlur(e) {
      if (!Chips._keydown) {
        let $chips = $(e.target).closest('.chips');
        let currChips = $chips[0].M_Chips;

        currChips._selectedChip = null;
      }
    }

    /**
     * Handle Input Focus
     */
    _handleInputFocus() {
      this.$el.addClass('focus');
    }

    /**
     * Handle Input Blur
     */
    _handleInputBlur() {
      this.$el.removeClass('focus');
    }

    /**
     * Handle Input Keydown
     * @param {Event} e
     */
    _handleInputKeydown(e) {
      Chips._keydown = true;

      // enter
      if (e.keyCode === 13) {
        // Override enter if autocompleting.
        if (this.hasAutocomplete &&
          this.autocomplete &&
          this.autocomplete.isOpen) {
          return;
        }

        e.preventDefault();
        this.addChip({
          tag: this.$input[0].value
        });
        this.$input[0].value = '';

        // delete or left
      } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === '' && this.chipsData.length) {
        e.preventDefault();
        this.selectChip(this.chipsData.length - 1);
      }
    }

    /**
     * Render Chip
     * @param {chip} chip
     * @return {Element}
     */
    _renderChip(chip) {
      if (!chip.tag) {
        return;
      }

      let renderedChip = document.createElement('div');
      let closeIcon = document.createElement('i');
      renderedChip.classList.add('chip');
      renderedChip.textContent = chip.tag;
      renderedChip.setAttribute('tabindex', 0);
      $(closeIcon).addClass('material-icons close');
      closeIcon.textContent = 'close';

      // attach image if needed
      if (chip.image) {
        let img = document.createElement('img');
        img.setAttribute('src', chip.image);
        renderedChip.insertBefore(img, renderedChip.firstChild);
      }

      renderedChip.appendChild(closeIcon);
      return renderedChip;
    }

    /**
     * Render Chips
     */
    _renderChips() {
      this.$chips.remove();
      for (let i = 0; i < this.chipsData.length; i++) {
        let chipEl = this._renderChip(this.chipsData[i]);
        this.$el.append(chipEl);
        this.$chips.add(chipEl);
      }

      // move input to end
      this.$el.append(this.$input[0]);
    }

    /**
     * Setup Autocomplete
     */
    _setupAutocomplete() {
      this.options.autocompleteOptions.onAutocomplete = (val) => {
        this.addChip({
          tag: val
        });
        this.$input[0].value = '';
        this.$input[0].focus();
      };

      this.autocomplete = M.Autocomplete.init(this.$input, this.options.autocompleteOptions)[0];
    }

    /**
     * Setup Input
     */
    _setupInput() {
      this.$input = this.$el.find('input');
      if (!this.$input.length) {
        this.$input = $('<input></input>');
        this.$el.append(this.$input);
      }

      this.$input.addClass('input');
    }

    /**
     * Setup Label
     */
    _setupLabel() {
      this.$label = this.$el.find('label');
      if (this.$label.length) {
        this.$label.setAttribute('for', this.$input.attr('id'));
      }
    }

    /**
     * Set placeholder
     */
    _setPlaceholder() {
      if ((this.chipsData !== undefined && !this.chipsData.length) && this.options.placeholder) {
        $(this.$input).prop('placeholder', this.options.placeholder);

      } else if ((this.chipsData === undefined || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
        $(this.$input).prop('placeholder', this.options.secondaryPlaceholder);
      }
    }

    /**
     * Check if chip is valid
     * @param {chip} chip
     */
    _isValid(chip) {
      if (chip.hasOwnProperty('tag') && chip.tag !== '') {
        let exists = false;
        for (let i = 0; i < this.chipsData.length; i++) {
          if (this.chipsData[i].tag === chip.tag) {
            exists = true;
            break;
          }
        }
        return !exists;

      }

      return false;
    }

    /**
     * Add chip
     * @param {chip} chip
     */
    addChip(chip) {
      if (!this._isValid(chip) ||
        this.chipsData.length >= this.options.limit) {
        return;
      }

      let renderedChip = this._renderChip(chip);
      this.$chips.add(renderedChip);
      this.chipsData.push(chip);
      $(this.$input).before(renderedChip);
      this._setPlaceholder();

      // fire chipAdd callback
      if (typeof (this.options.onChipAdd) === 'function') {
        this.options.onChipAdd.call(this, this.$el, renderedChip);
      }
    }

    /**
     * Delete chip
     * @param {Number} chip
     */
    deleteChip(chipIndex) {
      let $chip = this.$chips.eq(chipIndex);
      this.$chips.eq(chipIndex).remove();
      this.$chips = this.$chips.filter(function (el) {
        return $(el).index() >= 0;
      });
      this.chipsData.splice(chipIndex, 1);
      this._setPlaceholder();

      // fire chipDelete callback
      if (typeof (this.options.onChipDelete) === 'function') {
        this.options.onChipDelete.call(this, this.$el, $chip[0]);
      }
    }

    /**
     * Select chip
     * @param {Number} chip
     */
    selectChip(chipIndex) {
      let $chip = this.$chips.eq(chipIndex);
      this._selectedChip = $chip;
      $chip[0].focus();

      // fire chipSelect callback
      if (typeof (this.options.onChipSelect) === 'function') {
        this.options.onChipSelect.call(this, this.$el, $chip[0]);
      }
    }
  }

  /**
   * @static
   * @memberof Chips
   */
  Chips._keydown = false;

  M.Chips = Chips;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Chips, 'chips', 'M_Chips');
  }

  $(document).ready(function () {
    // Handle removal of static chips.
    $(document.body).on('click', '.chip .close', function () {
      let $chips = $(this).closest('.chips');
      if ($chips.length && $chips[0].M_Chips) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });
}(cash));

(function ($) {
  'use strict';

  let _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };


  /**
   * @class
   *
   */
  class Pushpin extends Component {
    /**
     * Construct Pushpin instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Pushpin, el, options);

      this.el.M_Pushpin = this;

      /**
       * Options for the modal
       * @member Pushpin#options
       */
      this.options = $.extend({}, Pushpin.defaults, options);

      this.originalOffset = this.el.offsetTop;
      Pushpin._pushpins.push(this);
      this._setupEventHandlers();
      this._updatePosition();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Pushpin;
    }

    /**
     * Teardown component
     */
    destroy() {
      this.el.style.top = null;
      this._removePinClasses();
      this._removeEventHandlers();

      // Remove pushpin Inst
      let index = Pushpin._pushpins.indexOf(this);
      Pushpin._pushpins.splice(index, 1);
    }

    static _updateElements() {
      for (let elIndex in Pushpin._pushpins) {
        let pInstance = Pushpin._pushpins[elIndex];
        pInstance._updatePosition();
      }
    }

    _setupEventHandlers() {
      document.addEventListener('scroll', Pushpin._updateElements);
    }

    _removeEventHandlers() {
      document.removeEventListener('scroll', Pushpin._updateElements);
    }

    _updatePosition() {
      let scrolled = M.getDocumentScrollTop() + this.options.offset;

      if (this.options.top <= scrolled && this.options.bottom >= scrolled &&
        !this.el.classList.contains('pinned')) {
        this._removePinClasses();

        this.el.style.top = `${this.options.offset}px`;
        this.el.classList.add('pinned');

        // onPositionChange callback
        if (typeof(this.options.onPositionChange) === 'function') {
          this.options.onPositionChange.call(this, 'pinned');
        }
      }

      // Add pin-top (when scrolled position is above top)
      if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
        this._removePinClasses();
        this.el.style.top = 0;
        this.el.classList.add('pin-top');

        // onPositionChange callback
        if (typeof(this.options.onPositionChange) === 'function') {
          this.options.onPositionChange.call(this, 'pin-top');
        }
      }

      // Add pin-bottom (when scrolled position is below bottom)
      if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
        this._removePinClasses();
        this.el.classList.add('pin-bottom');
        this.el.style.top = `${this.options.bottom - this.originalOffset}px`;

        // onPositionChange callback
        if (typeof(this.options.onPositionChange) === 'function') {
          this.options.onPositionChange.call(this, 'pin-bottom');
        }
      }
    }

    _removePinClasses() {
      this.el.classList.remove('pin-top', 'pinned', 'pin-bottom');
    }
  }

  /**
   * @static
   * @memberof Pushpin
   */
  Pushpin._pushpins = [];

  M.Pushpin = Pushpin;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, 'pushpin', 'M_Pushpin');
  }

})(cash);

(function ($, anim) {
  'use strict';

  let _defaults = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };

  $.fn.reverse = [].reverse;

  /**
   * @class
   *
   */
  class FloatingActionButton extends Component {
    /**
     * Construct FloatingActionButton instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(FloatingActionButton, el, options);

      this.el.M_FloatingActionButton = this;

      /**
       * Options for the fab
       * @member FloatingActionButton#options
       * @prop {Boolean} [direction] - Direction fab menu opens
       * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
       * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
       */
      this.options = $.extend({}, FloatingActionButton.defaults, options);

      this.isOpen = false;
      this.$anchor = this.$el.children('a').first();
      this.$menu = this.$el.children('ul').first();
      this.$floatingBtns = this.$el.find('ul .btn-floating');
      this.$floatingBtnsReverse = this.$el.find('ul .btn-floating').reverse();
      this.offsetY = 0;
      this.offsetX = 0;
      if (this.options.direction === 'top') {
        this.$el.addClass('direction-top');
        this.offsetY = 40;
      } else if (this.options.direction === 'right') {
        this.$el.addClass('direction-right');
        this.offsetX = -40;
      } else if (this.options.direction === 'bottom') {
        this.$el.addClass('direction-bottom');
        this.offsetY = -40;
      } else {
        this.$el.addClass('direction-left');
        this.offsetX = 40;
      }
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_FloatingActionButton;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.M_FloatingActionButton = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleFABClickBound = this._handleFABClick.bind(this);
      this._handleOpenBound = this.open.bind(this);
      this._handleCloseBound = this.close.bind(this);

      if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
        this.el.addEventListener('mouseenter', this._handleOpenBound);
        this.el.addEventListener('mouseleave', this._handleCloseBound);

      } else {
        this.el.addEventListener('click', this._handleFABClickBound);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
        this.el.removeEventListener('mouseenter', this._handleOpenBound);
        this.el.removeEventListener('mouseleave', this._handleCloseBound);

      } else {
        this.el.removeEventListener('click', this._handleFABClickBound);
      }
    }

    /**
     * Handle FAB Click
     */
    _handleFABClick() {
      if (this.isOpen) {
        this.close();

      } else {
        this.open();
      }
    }

    /**
     * Handle Document Click
     * @param {Event} e
     */
    _handleDocumentClick(e) {
      if (!$(e.target).closest(this.$menu).length) {
        this.close();
      }
    }

    /**
     * Open FAB
     */
    open() {
      if (this.isOpen) {
        return;
      }

      if (this.options.toolbarEnabled) {
        this._animateInToolbar();
      } else {
        this._animateInFAB();
      }
      this.isOpen = true;
    }

    /**
     * Close FAB
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      if (this.options.toolbarEnabled) {
        window.removeEventListener('scroll', this._handleCloseBound, true);
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        this._animateOutToolbar();
      } else {
        this._animateOutFAB();
      }
      this.isOpen = false;
    }

    /**
     * Classic FAB Menu open
     */
    _animateInFAB() {
      this.$el.addClass('active');

      let time = 0;
      this.$floatingBtnsReverse.each((el) => {
        anim({
          targets: el,
          opacity: 1,
          scale: [.4, 1],
          translateY: [this.offsetY, 0],
          translateX: [this.offsetX, 0],
          duration: 275,
          delay: time,
          easing: 'easeInOutQuad'
        });
        time += 40;
      });
    }

    /**
     * Classic FAB Menu close
     */
    _animateOutFAB() {
      this.$floatingBtnsReverse.each((el) => {
        anim.remove(el);
        anim({
          targets: el,
          opacity: 0,
          scale: .4,
          translateY: this.offsetY,
          translateX: this.offsetX,
          duration: 175,
          easing: 'easeOutQuad',
          complete: () => {
            this.$el.removeClass('active');
          }
        });
      });
    }

    /**
     * Toolbar transition Menu open
     */
    _animateInToolbar() {
      let scaleFactor;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let btnRect = this.el.getBoundingClientRect();
      let backdrop = $('<div class="fab-backdrop"></div>');
      let fabColor = this.$anchor.css('background-color');
      this.$anchor.append(backdrop);

      this.offsetX = btnRect.left - (windowWidth / 2) + (btnRect.width / 2);
      this.offsetY = windowHeight - btnRect.bottom;
      scaleFactor = windowWidth / backdrop[0].clientWidth;
      this.btnBottom = btnRect.bottom;
      this.btnLeft = btnRect.left;
      this.btnWidth = btnRect.width;

      // Set initial state
      this.$el.addClass('active');
      this.$el.css({
        'text-align': 'center',
        width: '100%',
        bottom: 0,
        left: 0,
        transform: 'translateX(' + this.offsetX + 'px)',
        transition: 'none'
      });
      this.$anchor.css({
        transform: 'translateY(' + -this.offsetY + 'px)',
        transition: 'none'
      });
      backdrop.css({
        'background-color': fabColor
      });


      setTimeout(() => {
        this.$el.css({
          transform: '',
          transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
        });
        this.$anchor.css({
          overflow: 'visible',
          transform: '',
          transition: 'transform .2s'
        });

        setTimeout(() => {
          this.$el.css({
            overflow: 'hidden',
            'background-color': fabColor
          });
          backdrop.css({
            transform: 'scale(' + scaleFactor + ')',
            transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
          });
          this.$menu.children('li').children('a').css({
            opacity: 1
          });

          // Scroll to close.
          this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
          window.addEventListener('scroll', this._handleCloseBound, true);
          document.body.addEventListener('click', this._handleDocumentClickBound, true);
        }, 100);
      }, 0);
    }

    /**
     * Toolbar transition Menu close
     */
    _animateOutToolbar() {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let backdrop = this.$el.find('.fab-backdrop');
      let fabColor = anchor.css('background-color');

      this.offsetX = this.btnLeft - (windowWidth / 2) + (this.btnWidth / 2);
      this.offsetY = windowHeight - this.btnBottom;

      // Hide backdrop
      this.$el.removeClass('active');
      this.$el.css({
        'background-color': 'transparent',
        transition: 'none'
      });
      this.$anchor.css({
        transition: 'none'
      });
      backdrop.css({
        transform: 'scale(0)',
        'background-color': fabColor
      });
      this.$menu.children('li').children('a').css({
        opacity: ''
      });

      setTimeout(() => {
        backdrop.remove();

        // Set initial state.
        this.$el.css({
          'text-align': '',
          width: '',
          bottom: '',
          left: '',
          overflow: '',
          'background-color': '',
          transform: 'translate3d(' + -this.offsetX + 'px,0,0)'
        });
        this.$anchor.css({
          overflow: '',
          transform: 'translate3d(0,' + this.offsetY + 'px,0)'
        });

        setTimeout(() => {
          this.$el.css({
            transform: 'translate3d(0,0,0)',
            transition: 'transform .2s'
          });
          this.$anchor.css({
            transform: 'translate3d(0,0,0)',
            transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
          });
        }, 20);
      }, 200);
    }
  }

  M.FloatingActionButton = FloatingActionButton;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, 'floatingActionButton', 'M_FloatingActionButton');
  }

}(cash, M.anime));

(function ($) {
  'use strict';

  let _defaults = {
    duration: 200, // ms
    dist: -100, // zoom scale TODO: make this more intuitive as an option
    shift: 0, // spacing for center image
    padding: 0, // Padding between non center items
    fullWidth: false, // Change to full width styles
    indicators: false, // Toggle indicators
    noWrap: false, // Don't wrap around and cycle through items.
    onCycleTo: null // Callback for when a new slide is cycled to.
  };


  /**
   * @class
   *
   */
  class Carousel extends Component {
    /**
     * Construct Carousel instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Carousel, el, options);

      this.el.M_Carousel = this;

      /**
       * Options for the carousel
       * @member Carousel#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      this.options = $.extend({}, Carousel.defaults, options);

      // Setup
      this.hasMultipleSlides = this.$el.find('.carousel-item').length > 1;
      this.showIndicators = this.options.indicators && this.hasMultipleSlides;
      this.noWrap = this.options.noWrap || !this.hasMultipleSlides;
      this.pressed = false;
      this.dragged = false;
      this.offset = this.target = 0;
      this.images = [];
      this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
      this.itemHeight = this.$el.find('.carousel-item').first().innerHeight();
      this.dim = this.itemWidth * 2 + this.options.padding || 1; // Make sure dim is non zero for divisions.
      this._autoScrollBound = this._autoScroll.bind(this);
      this._trackBound = this._track.bind(this);

      // Full Width carousel setup
      if (this.options.fullWidth) {
        this.options.dist = 0;
        this._setCarouselHeight();

        // Offset fixed items when indicators.
        if (this.showIndicators) {
          this.$el.find('.carousel-fixed-item').addClass('with-indicators');
        }
      }

      // Iterate through slides
      this.$indicators = $('<ul class="indicators"></ul>');
      this.$el.find('.carousel-item').each((el, i) => {
        this.images.push(el);
        if (this.showIndicators) {
          let $indicator = $('<li class="indicator-item"></li>');

          // Add active to first by default.
          if (i === 0) {
            $indicator[0].classList.add('active');
          }

          this.$indicators.append($indicator);
        }
      });
      if (this.showIndicators) {
        this.$el.append(this.$indicators);
      }
      this.count = this.images.length;

      // Setup cross browser string
      this.xform = 'transform';
      ['webkit', 'Moz', 'O', 'ms'].every((prefix) => {
        var e = prefix + 'Transform';
        if (typeof document.body.style[e] !== 'undefined') {
          this.xform = e;
          return false;
        }
        return true;
      });

      this._setupEventHandlers();
      this._scroll(this.offset);
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Carousel;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.M_Carousel = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
      this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
      this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
      this._handleCarouselClickBound = this._handleCarouselClick.bind(this);

      if (typeof window.ontouchstart !== 'undefined') {
        this.el.addEventListener('touchstart', this._handleCarouselTapBound);
        this.el.addEventListener('touchmove', this._handleCarouselDragBound);
        this.el.addEventListener('touchend', this._handleCarouselReleaseBound);
      }

      this.el.addEventListener('mousedown', this._handleCarouselTapBound);
      this.el.addEventListener('mousemove', this._handleCarouselDragBound);
      this.el.addEventListener('mouseup', this._handleCarouselReleaseBound);
      this.el.addEventListener('mouseleave', this._handleCarouselReleaseBound);
      this.el.addEventListener('click', this._handleCarouselClickBound);

      if (this.showIndicators && this.$indicators) {
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
        this.$indicators.find('.indicator-item').each((el, i) => {
          el.addEventListener('click', this._handleIndicatorClickBound);
        });
      }

      // Resize
      let throttledResize = M.throttle(this._handleResize, 200);
      this._handleThrottledResizeBound = throttledResize.bind(this);

      window.addEventListener('resize', this._handleThrottledResizeBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (typeof window.ontouchstart !== 'undefined') {
        this.el.removeEventListener('touchstart', this._handleCarouselTapBound);
        this.el.removeEventListener('touchmove', this._handleCarouselDragBound);
        this.el.removeEventListener('touchend', this._handleCarouselReleaseBound);
      }
      this.el.removeEventListener('mousedown', this._handleCarouselTapBound);
      this.el.removeEventListener('mousemove', this._handleCarouselDragBound);
      this.el.removeEventListener('mouseup', this._handleCarouselReleaseBound);
      this.el.removeEventListener('mouseleave', this._handleCarouselReleaseBound);
      this.el.removeEventListener('click', this._handleCarouselClickBound);

      if (this.showIndicators && this.$indicators) {
        this.$indicators.find('.indicator-item').each((el, i) => {
          el.removeEventListener('click', this._handleIndicatorClickBound);
        });
      }

      window.removeEventListener('resize', this._handleThrottledResizeBound);
    }

    /**
     * Handle Carousel Tap
     * @param {Event} e
     */
    _handleCarouselTap(e) {
      // Fixes firefox draggable image bug
      if (e.type === 'mousedown' && $(e.target).is('img')) {
        e.preventDefault();
      }
      this.pressed = true;
      this.dragged = false;
      this.verticalDragged = false;
      this.reference = this._xpos(e);
      this.referenceY = this._ypos(e);

      this.velocity = this.amplitude = 0;
      this.frame = this.offset;
      this.timestamp = Date.now();
      clearInterval(this.ticker);
      this.ticker = setInterval(this._trackBound, 100);
    }

    /**
     * Handle Carousel Drag
     * @param {Event} e
     */
    _handleCarouselDrag(e) {
      let x, y, delta, deltaY;
      if (this.pressed) {
        x = this._xpos(e);
        y = this._ypos(e);
        delta = this.reference - x;
        deltaY = Math.abs(this.referenceY - y);
        if (deltaY < 30 && !this.verticalDragged) {
          // If vertical scrolling don't allow dragging.
          if (delta > 2 || delta < -2) {
            this.dragged = true;
            this.reference = x;
            this._scroll(this.offset + delta);
          }

        } else if (this.dragged) {
          // If dragging don't allow vertical scroll.
          e.preventDefault();
          e.stopPropagation();
          return false;

        } else {
          // Vertical scrolling.
          this.verticalDragged = true;
        }
      }

      if (this.dragged) {
        // If dragging don't allow vertical scroll.
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    /**
     * Handle Carousel Release
     * @param {Event} e
     */
    _handleCarouselRelease(e) {
      if (this.pressed) {
        this.pressed = false;
      } else {
        return;
      }

      clearInterval(this.ticker);
      this.target = this.offset;
      if (this.velocity > 10 || this.velocity < -10) {
        this.amplitude = 0.9 * this.velocity;
        this.target = this.offset + this.amplitude;
      }
      this.target = Math.round(this.target / this.dim) * this.dim;

      // No wrap of items.
      if (this.noWrap) {
        if (this.target >= this.dim * (this.count - 1)) {
          this.target = this.dim * (this.count - 1);
        } else if (this.target < 0) {
          this.target = 0;
        }
      }
      this.amplitude = this.target - this.offset;
      this.timestamp = Date.now();
      requestAnimationFrame(this._autoScrollBound);

      if (this.dragged) {
        e.preventDefault();
        e.stopPropagation();
      }
      return false;
    }

    /**
     * Handle Carousel CLick
     * @param {Event} e
     */
    _handleCarouselClick(e) {
      // Disable clicks if carousel was dragged.
      if (this.dragged) {
        e.preventDefault();
        e.stopPropagation();
        return false;

      } else if (!this.options.fullWidth) {
        let clickedIndex = $(e.target).closest('.carousel-item').index();
        let diff = this._wrap(this.center) - clickedIndex;

        // Disable clicks if carousel was shifted by click
        if (diff !== 0) {
          e.preventDefault();
          e.stopPropagation();
        }
        this._cycleTo(clickedIndex);
      }
    }

    /**
     * Handle Indicator CLick
     * @param {Event} e
     */
    _handleIndicatorClick(e) {
      e.stopPropagation();

      let indicator = $(e.target).closest('.indicator-item');
      if (indicator.length) {
        this._cycleTo(indicator.index());
      }
    }

    /**
     * Handle Throttle Resize
     * @param {Event} e
     */
    _handleResize(e) {
      if (this.options.fullWidth) {
        this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
        this.imageHeight = this.$el.find('.carousel-item.active').height();
        this.dim = this.itemWidth * 2 + this.options.padding;
        this.offset = this.center * 2 * this.itemWidth;
        this.target = this.offset;
        this._setCarouselHeight(true);
      } else {
        this._scroll();
      }
    }


    /**
     * Set carousel height based on first slide
     * @param {Booleam} imageOnly - true for image slides
     */
    _setCarouselHeight(imageOnly) {
      let firstSlide = this.$el.find('.carousel-item.active').length ? this.$el.find('.carousel-item.active').first() : this.$el.find('.carousel-item').first();
      let firstImage = firstSlide.find('img').first();
      if (firstImage.length) {
        if (firstImage[0].complete) {
          // If image won't trigger the load event
          let imageHeight = firstImage.height();
          if (imageHeight > 0) {
            this.$el.css('height', imageHeight + 'px');
          } else {
            // If image still has no height, use the natural dimensions to calculate
            let naturalWidth = firstImage[0].naturalWidth;
            let naturalHeight = firstImage[0].naturalHeight;
            let adjustedHeight = (this.$el.width() / naturalWidth) * naturalHeight;
            this.$el.css('height', adjustedHeight + 'px');
          }
        } else {
          // Get height when image is loaded normally
          firstImage.one('load', (el, i) => {
            this.$el.css('height', el.offsetHeight + 'px');
          });
        }
      } else if (!imageOnly) {
        let slideHeight = firstSlide.height();
        this.$el.css('height', slideHeight + 'px');
      }
    }

    /**
     * Get x position from event
     * @param {Event} e
     */
    _xpos(e) {
      // touch event
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientX;
      }

      // mouse event
      return e.clientX;
    }

    /**
     * Get y position from event
     * @param {Event} e
     */
    _ypos(e) {
      // touch event
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientY;
      }

      // mouse event
      return e.clientY;
    }

    /**
     * Wrap index
     * @param {Number} x
     */
    _wrap(x) {
      return (x >= this.count) ? (x % this.count) : (x < 0) ? this._wrap(this.count + (x % this.count)) : x;
    }

    /**
     * Tracks scrolling information
     */
    _track() {
      let now, elapsed, delta, v;

      now = Date.now();
      elapsed = now - this.timestamp;
      this.timestamp = now;
      delta = this.offset - this.frame;
      this.frame = this.offset;

      v = 1000 * delta / (1 + elapsed);
      this.velocity = 0.8 * v + 0.2 * this.velocity;
    }

    /**
     * Auto scrolls to nearest carousel item.
     */
    _autoScroll() {
      let elapsed, delta;

      if (this.amplitude) {
        elapsed = Date.now() - this.timestamp;
        delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
        if (delta > 2 || delta < -2) {
          this._scroll(this.target - delta);
          requestAnimationFrame(this._autoScrollBound);
        } else {
          this._scroll(this.target);
        }
      }
    }

    /**
     * Scroll to target
     * @param {Number} x
     */
    _scroll(x) {
      // Track scrolling state
      if (!this.$el.hasClass('scrolling')) {
        this.el.classList.add('scrolling');
      }
      if (this.scrollingTimeout != null) {
        window.clearTimeout(this.scrollingTimeout);
      }
      this.scrollingTimeout = window.setTimeout(() => {
        this.$el.removeClass('scrolling');
      }, this.options.duration);

      // Start actual scroll
      let i, half, delta, dir, tween, el, alignment, zTranslation, tweenedOpacity;
      let lastCenter = this.center;

      this.offset = (typeof x === 'number') ? x : this.offset;
      this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
      delta = this.offset - this.center * this.dim;
      dir = (delta < 0) ? 1 : -1;
      tween = -dir * delta * 2 / this.dim;
      half = this.count >> 1;

      if (!this.options.fullWidth) {
        alignment = 'translateX(' + (this.el.clientWidth - this.itemWidth) / 2 + 'px) ';
        alignment += 'translateY(' + (this.el.clientHeight - this.itemHeight) / 2 + 'px)';
      } else {
        alignment = 'translateX(0)';
      }

      // Set indicator active
      if (this.showIndicators) {
        let diff = (this.center % this.count);
        let activeIndicator = this.$indicators.find('.indicator-item.active');
        if (activeIndicator.index() !== diff) {
          activeIndicator.removeClass('active');
          this.$indicators.find('.indicator-item').eq(diff)[0].classList.add('active');
        }
      }

      // center
      // Don't show wrapped items.
      if (!this.noWrap || (this.center >= 0 && this.center < this.count)) {
        el = this.images[this._wrap(this.center)];

        // Add active class to center item.
        if (!$(el).hasClass('active')) {
          this.$el.find('.carousel-item').removeClass('active');
          el.classList.add('active');
        }
        el.style[this.xform] = alignment +
          ' translateX(' + (-delta / 2) + 'px)' +
          ' translateX(' + (dir * this.options.shift * tween * i) + 'px)' +
          ' translateZ(' + (this.options.dist * tween) + 'px)';
        el.style.zIndex = 0;
        if (this.options.fullWidth) {
          tweenedOpacity = 1;
        } else {
          tweenedOpacity = 1 - 0.2 * tween;
        }
        el.style.opacity = tweenedOpacity;
        el.style.visibility = 'visible';
      }

      for (i = 1; i <= half; ++i) {
        // right side
        if (this.options.fullWidth) {
          zTranslation = this.options.dist;
          tweenedOpacity = (i === half && delta < 0) ? 1 - tween : 1;
        } else {
          zTranslation = this.options.dist * (i * 2 + tween * dir);
          tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
        }
        // Don't show wrapped items.
        if (!this.noWrap || this.center + i < this.count) {
          el = this.images[this._wrap(this.center + i)];
          el.style[this.xform] = alignment +
            ' translateX(' + (this.options.shift + (this.dim * i - delta) / 2) + 'px)' +
            ' translateZ(' + zTranslation + 'px)';
          el.style.zIndex = -i;
          el.style.opacity = tweenedOpacity;
          el.style.visibility = 'visible';
        }


        // left side
        if (this.options.fullWidth) {
          zTranslation = this.options.dist;
          tweenedOpacity = (i === half && delta > 0) ? 1 - tween : 1;
        } else {
          zTranslation = this.options.dist * (i * 2 - tween * dir);
          tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
        }
        // Don't show wrapped items.
        if (!this.noWrap || this.center - i >= 0) {
          el = this.images[this._wrap(this.center - i)];
          el.style[this.xform] = alignment +
            ' translateX(' + (-this.options.shift + (-this.dim * i - delta) / 2) + 'px)' +
            ' translateZ(' + zTranslation + 'px)';
          el.style.zIndex = -i;
          el.style.opacity = tweenedOpacity;
          el.style.visibility = 'visible';
        }
      }

      // center
      // Don't show wrapped items.
      if (!this.noWrap || (this.center >= 0 && this.center < this.count)) {
        el = this.images[this._wrap(this.center)];
        el.style[this.xform] = alignment +
          ' translateX(' + (-delta / 2) + 'px)' +
          ' translateX(' + (dir * this.options.shift * tween) + 'px)' +
          ' translateZ(' + (this.options.dist * tween) + 'px)';
        el.style.zIndex = 0;
        if (this.options.fullWidth) {
          tweenedOpacity = 1;
        } else {
          tweenedOpacity = 1 - 0.2 * tween;
        }
        el.style.opacity = tweenedOpacity;
        el.style.visibility = 'visible';
      }

      // onCycleTo callback
      let $currItem = this.$el.find('.carousel-item').eq(this._wrap(this.center));
      if (lastCenter !== this.center &&
        typeof (this.options.onCycleTo) === "function") {
        this.options.onCycleTo.call(this, $currItem[0], this.dragged);
      }

      // One time callback
      if (typeof (this.oneTimeCallback) === "function") {
        this.oneTimeCallback.call(this, $currItem[0], this.dragged);
        this.oneTimeCallback = null;
      }
    }

    /**
     * Cycle to target
     * @param {Number} n
     * @param {Function} callback
     */
    _cycleTo(n, callback) {
      let diff = (this.center % this.count) - n;

      // Account for wraparound.
      if (!this.noWrap) {
        if (diff < 0) {
          if (Math.abs(diff + this.count) < Math.abs(diff)) {
            diff += this.count;
          }

        } else if (diff > 0) {
          if (Math.abs(diff - this.count) < diff) {
            diff -= this.count;
          }
        }
      }

      this.target = (this.dim * Math.round(this.offset / this.dim));
      // Next
      if (diff < 0) {
        this.target += (this.dim * Math.abs(diff));

        // Prev
      } else if (diff > 0) {
        this.target -= (this.dim * diff);
      }

      // Set one time callback
      if (typeof (callback) === "function") {
        this.oneTimeCallback = callback;
      }

      // Scroll
      if (this.offset !== this.target) {
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);
      }
    }


    /**
     * Cycle to next item
     * @param {Number} [n]
     */
    next(n) {
      if (n === undefined || isNaN(n)) {
        n = 1;
      }

      let index = this.center + n;
      if (index > this.count || index < 0) {
        if (this.noWrap) {
          return;
        }

        index = this._wrap(index);
      }
      this._cycleTo(index);
    }

    /**
     * Cycle to previous item
     * @param {Number} [n]
     */
    prev(n) {
      if (n === undefined || isNaN(n)) {
        n = 1;
      }

      let index = this.center - n;
      if (index > this.count || index < 0) {
        if (this.noWrap) {
          return;
        }

        index = this._wrap(index);
      }

      this._cycleTo(index);
    }

    /**
     * Cycle to nth item
     * @param {Number} [n]
     * @param {Function} callback
     */
    set(n, callback) {
      if (n === undefined || isNaN(n)) {
        n = 0;
      }

      if (n > this.count || n < 0) {
        if (this.noWrap) {
          return;
        }

        n = this._wrap(n);
      }

      this._cycleTo(n, callback);
    }
  }

  M.Carousel = Carousel;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Carousel, 'carousel', 'M_Carousel');
  }

}(cash));

(function ($) {
  'use strict';

  let _defaults = {
    onOpen: undefined,
    onClose: undefined,
  };


  /**
   * @class
   *
   */
  class FeatureDiscovery extends Component {
    /**
     * Construct FeatureDiscovery instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(FeatureDiscovery, el, options);

      this.el.M_FeatureDiscovery = this;

      /**
       * Options for the select
       * @member FeatureDiscovery#options
       * @prop {Function} onOpen - Callback function called when feature discovery is opened
       * @prop {Function} onClose - Callback function called when feature discovery is closed
       */
      this.options = $.extend({}, FeatureDiscovery.defaults, options);

      this.isOpen = false;

      // setup
      this.$origin = $('#' + this.$el.attr('data-target'));
      this._setup();

      this._calculatePositioning();
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_FeatureDiscovery;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.FeatureDiscovery = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
      this._handleTargetClickBound = this._handleTargetClick.bind(this);
      this._handleOriginClickBound = this._handleOriginClick.bind(this);

      this.el.addEventListener('click', this._handleTargetClickBound);
      this.originEl.addEventListener('click', this._handleOriginClickBound);

      // Resize
      let throttledResize = M.throttle(this._handleResize, 200);
      this._handleThrottledResizeBound = throttledResize.bind(this);

      window.addEventListener('resize', this._handleThrottledResizeBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleTargetClickBound);
      this.originEl.removeEventListener('click', this._handleOriginClickBound);
      window.removeEventListener('resize', this._handleThrottledResizeBound);
    }

    /**
     * Handle Target Click
     * @param {Event} e
     */
    _handleTargetClick(e) {
      this.open();
    }

    /**
     * Handle Origin Click
     * @param {Event} e
     */
    _handleOriginClick(e) {
      this.close();
    }

    /**
     * Handle Resize
     * @param {Event} e
     */
    _handleResize(e) {
      this._calculatePositioning();
    }

    /**
     * Handle Resize
     * @param {Event} e
     */
    _handleDocumentClick(e) {
      if (!$(e.target).closest('.tap-target-wrapper').length) {
        this.close();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    /**
     * Setup feature discovery
     */
    _setup() {
      // Creating tap target
      this.wrapper = this.$el.parent()[0];
      this.waveEl = $(this.wrapper).find('.tap-target-wave')[0];
      this.originEl = $(this.wrapper).find('.tap-target-origin')[0];
      this.contentEl = this.$el.find('.tap-target-content')[0];

      // Creating wrapper
      if (!$(this.wrapper).hasClass('.tap-target-wrapper')) {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('tap-target-wrapper');
        this.$el.before($(this.wrapper));
        this.wrapper.append(this.el);
      }

      // Creating content
      if (!this.contentEl) {
        this.contentEl = document.createElement('div');
        this.contentEl.classList.add('tap-target-content');
        this.$el.append(this.contentEl);
      }

      // Creating foreground wave
      if (!this.waveEl) {
        this.waveEl = document.createElement('div');
        this.waveEl.classList.add('tap-target-wave');

        // Creating origin
        if (!this.originEl) {
          this.originEl = this.$origin.clone(true, true);
          this.originEl.addClass('tap-target-origin');
          this.originEl.removeAttr('id');
          this.originEl.removeAttr('style');
          this.originEl = this.originEl[0];
          this.waveEl.append(this.originEl);
        }

        this.wrapper.append(this.waveEl);
      }
    }

    /**
     * Calculate positioning
     */
    _calculatePositioning() {
      // Element or parent is fixed position?
      let isFixed = this.$origin.css('position') === 'fixed';
      if (!isFixed) {
        let parents = this.$origin.parents();
        for (let i = 0; i < parents.length; i++) {
          isFixed = $(parents[i]).css('position') == 'fixed';
          if (isFixed) {
            break;
          }
        }
      }

      // Calculating origin
      let originWidth = this.$origin.outerWidth();
      let originHeight = this.$origin.outerHeight();
      let originTop = isFixed ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top;
      let originLeft = isFixed ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left;

      // Calculating screen
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let centerX = windowWidth / 2;
      let centerY = windowHeight / 2;
      let isLeft = originLeft <= centerX;
      let isRight = originLeft > centerX;
      let isTop = originTop <= centerY;
      let isBottom = originTop > centerY;
      let isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;

      // Calculating tap target
      let tapTargetWidth = this.$el.outerWidth();
      let tapTargetHeight = this.$el.outerHeight();
      let tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
      let tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
      let tapTargetPosition = isFixed ? 'fixed' : 'absolute';

      // Calculating content
      let tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
      let tapTargetTextHeight = tapTargetHeight / 2;
      let tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
      let tapTargetTextBottom = 0;
      let tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
      let tapTargetTextRight = 0;
      let tapTargetTextPadding = originWidth;
      let tapTargetTextAlign = isBottom ? 'bottom' : 'top';

      // Calculating wave
      let tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
      let tapTargetWaveHeight = tapTargetWaveWidth;
      let tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
      let tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;

      // Setting tap target
      let tapTargetWrapperCssObj = {};
      tapTargetWrapperCssObj.top = isTop ? tapTargetTop + 'px' : '';
      tapTargetWrapperCssObj.right = isRight ? (windowWidth - tapTargetLeft - tapTargetWidth) + 'px' : '';
      tapTargetWrapperCssObj.bottom = isBottom ? (windowHeight - tapTargetTop - tapTargetHeight) + 'px' : '';
      tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft + 'px' : '';
      tapTargetWrapperCssObj.position = tapTargetPosition;
      $(this.wrapper).css(tapTargetWrapperCssObj);

      // Setting content
      $(this.contentEl).css({
        width: tapTargetTextWidth + 'px',
        height: tapTargetTextHeight + 'px',
        top: tapTargetTextTop + 'px',
        right: tapTargetTextRight + 'px',
        bottom: tapTargetTextBottom + 'px',
        left: tapTargetTextLeft + 'px',
        padding: tapTargetTextPadding + 'px',
        verticalAlign: tapTargetTextAlign
      });

      // Setting wave
      $(this.waveEl).css({
        top: tapTargetWaveTop + 'px',
        left: tapTargetWaveLeft + 'px',
        width: tapTargetWaveWidth + 'px',
        height: tapTargetWaveHeight + 'px'
      });
    }

    /**
     * Open Feature Discovery
     */
    open() {
      if (this.isOpen) {
        return;
      }

      // onOpen callback
      if (typeof (this.options.onOpen) === 'function') {
        this.options.onOpen.call(this, this.$origin[0]);
      }

      this.isOpen = true;
      this.wrapper.classList.add('open');

      document.body.addEventListener('click', this._handleDocumentClickBound, true);
      document.body.addEventListener('touchend', this._handleDocumentClickBound);
    }

    /**
     * Close Feature Discovery
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      // onClose callback
      if (typeof (this.options.onClose) === 'function') {
        this.options.onClose.call(this, this.$origin[0]);
      }

      this.isOpen = false;
      this.wrapper.classList.remove('open');

      document.body.removeEventListener('click', this._handleDocumentClickBound, true);
      document.body.removeEventListener('touchend', this._handleDocumentClickBound);
    }
  }

  M.FeatureDiscovery = FeatureDiscovery;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FeatureDiscovery, 'featureDiscovery', 'M_FeatureDiscovery');
  }

}(cash));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFJlcXVpcmVkIGZvciBNZXRlb3IgcGFja2FnZSwgdGhlIHVzZSBvZiB3aW5kb3cgcHJldmVudHMgZXhwb3J0IGJ5IE1ldGVvclxyXG4oZnVuY3Rpb24od2luZG93KXtcclxuICBpZih3aW5kb3cuUGFja2FnZSl7XHJcbiAgICBNID0ge307XHJcbiAgfSBlbHNlIHtcclxuICAgIHdpbmRvdy5NID0ge307XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBmb3IgalF1ZXJ5XHJcbiAgTS5qUXVlcnlMb2FkZWQgPSAhIXdpbmRvdy5qUXVlcnk7XHJcbn0pKHdpbmRvdyk7XHJcblxyXG5cclxuLy8gQU1EXHJcbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XHJcblx0ZGVmaW5lKCBcIk1cIiwgW10sIGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIE07XHJcblx0fSApO1xyXG5cclxuLy8gQ29tbW9uIEpTXHJcbn0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmICFleHBvcnRzLm5vZGVUeXBlKSB7XHJcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IE07XHJcbiAgfVxyXG4gIGV4cG9ydHMuZGVmYXVsdCA9IE07XHJcbn1cclxuXHJcbk0ua2V5cyA9IHtcclxuICBUQUI6IDksXHJcbiAgRU5URVI6IDEzLFxyXG4gIEVTQzogMjcsXHJcbiAgQVJST1dfVVA6IDM4LFxyXG4gIEFSUk9XX0RPV046IDQwXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFRhYlByZXNzIEtleWRvd24gaGFuZGxlclxyXG4gKi9cclxuTS50YWJQcmVzc2VkID0gZmFsc2U7XHJcbmxldCBkb2NIYW5kbGVLZXlkb3duID0gZnVuY3Rpb24oZSkge1xyXG4gIGlmIChlLndoaWNoID09PSBNLmtleXMuVEFCKSB7XHJcbiAgICBNLnRhYlByZXNzZWQgPSB0cnVlO1xyXG4gIH1cclxufTtcclxubGV0IGRvY0hhbmRsZUtleXVwID0gZnVuY3Rpb24oZSkge1xyXG4gIGlmIChlLndoaWNoID09PSBNLmtleXMuVEFCKSB7XHJcbiAgICBNLnRhYlByZXNzZWQgPSBmYWxzZTtcclxuICB9XHJcbn07XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb2NIYW5kbGVLZXlkb3duKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBkb2NIYW5kbGVLZXl1cCk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgalF1ZXJ5IHdyYXBwZXIgZm9yIHBsdWdpblxyXG4gKiBAcGFyYW0ge0NsYXNzfSBwbHVnaW4gIGphdmFzY3JpcHQgY2xhc3NcclxuICogQHBhcmFtIHtzdHJpbmd9IHBsdWdpbk5hbWUgIGpRdWVyeSBwbHVnaW4gbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NSZWYgIENsYXNzIHJlZmVyZW5jZSBuYW1lXHJcbiAqL1xyXG5NLmluaXRpYWxpemVKcXVlcnlXcmFwcGVyID0gZnVuY3Rpb24ocGx1Z2luLCBwbHVnaW5OYW1lLCBjbGFzc1JlZikge1xyXG4gIGpRdWVyeS5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uKG1ldGhvZE9yT3B0aW9ucykge1xyXG4gICAgLy8gQ2FsbCBwbHVnaW4gbWV0aG9kIGlmIHZhbGlkIG1ldGhvZCBuYW1lIGlzIHBhc3NlZCBpblxyXG4gICAgaWYgKHBsdWdpbi5wcm90b3R5cGVbbWV0aG9kT3JPcHRpb25zXSkge1xyXG4gICAgICBsZXQgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMSApO1xyXG5cclxuICAgICAgLy8gR2V0dGVyIG1ldGhvZHNcclxuICAgICAgaWYgKG1ldGhvZE9yT3B0aW9ucy5zbGljZSgwLDMpID09PSAnZ2V0Jykge1xyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuZmlyc3QoKVswXVtjbGFzc1JlZl07XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlW21ldGhvZE9yT3B0aW9uc10uYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFZvaWQgbWV0aG9kc1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXNbY2xhc3NSZWZdO1xyXG4gICAgICAgIGluc3RhbmNlW21ldGhvZE9yT3B0aW9uc10uYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgcGx1Z2luIGlmIG9wdGlvbnMgb3Igbm8gYXJndW1lbnQgaXMgcGFzc2VkIGluXHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kT3JPcHRpb25zID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZE9yT3B0aW9ucyApIHtcclxuICAgICAgcGx1Z2luLmluaXQodGhpcywgYXJndW1lbnRzWzBdKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiBlcnJvciBpZiBhbiB1bnJlY29nbml6ZWQgIG1ldGhvZCBuYW1lIGlzIHBhc3NlZCBpblxyXG4gICAgalF1ZXJ5LmVycm9yKGBNZXRob2QgJHttZXRob2RPck9wdGlvbnN9IGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS4ke3BsdWdpbk5hbWV9YCk7XHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhcHByb3hpbWF0ZWQgc2VsZWN0b3Igc3RyaW5nIGZvciBhIGpRdWVyeSBvYmplY3RcclxuICogQHBhcmFtIHtqUXVlcnl9IG9iaiAgalF1ZXJ5IG9iamVjdCB0byBiZSBwYXJzZWRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbk0ub2JqZWN0U2VsZWN0b3JTdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcclxuICBsZXQgdGFnU3RyID0gb2JqLnByb3AoJ3RhZ05hbWUnKSB8fCAnJztcclxuICBsZXQgaWRTdHIgPSBvYmouYXR0cignaWQnKSB8fCAnJztcclxuICBsZXQgY2xhc3NTdHIgPSBvYmouYXR0cignY2xhc3MnKSB8fCAnJztcclxuICByZXR1cm4gKHRhZ1N0ciArIGlkU3RyICsgY2xhc3NTdHIpLnJlcGxhY2UoL1xccy9nLCcnKTtcclxufTtcclxuXHJcblxyXG4vLyBVbmlxdWUgUmFuZG9tIElEXHJcbk0uZ3VpZCA9IChmdW5jdGlvbigpIHtcclxuICBmdW5jdGlvbiBzNCgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgfVxyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcclxuICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG4gIH07XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogRXNjYXBlcyBoYXNoIGZyb20gc3BlY2lhbCBjaGFyYWN0ZXJzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoICBTdHJpbmcgcmV0dXJuZWQgZnJvbSB0aGlzLmhhc2hcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbk0uZXNjYXBlSGFzaCA9IGZ1bmN0aW9uKGhhc2gpIHtcclxuICByZXR1cm4gaGFzaC5yZXBsYWNlKCAvKDp8XFwufFxcW3xcXF18LHw9KS9nLCBcIlxcXFwkMVwiICk7XHJcbn07XHJcblxyXG5NLmVsZW1lbnRPclBhcmVudElzRml4ZWQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgbGV0ICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuICBsZXQgJGNoZWNrRWxlbWVudHMgPSAkZWxlbWVudC5hZGQoJGVsZW1lbnQucGFyZW50cygpKTtcclxuICBsZXQgaXNGaXhlZCA9IGZhbHNlO1xyXG4gICRjaGVja0VsZW1lbnRzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGlmICgkKHRoaXMpLmNzcyhcInBvc2l0aW9uXCIpID09PSBcImZpeGVkXCIpIHtcclxuICAgICAgaXNGaXhlZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gaXNGaXhlZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBFZGdlc1xyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHRvcCAgSWYgdGhlIHRvcCBlZGdlIHdhcyBleGNlZWRlZFxyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHJpZ2h0ICBJZiB0aGUgcmlnaHQgZWRnZSB3YXMgZXhjZWVkZWRcclxuICogQHByb3BlcnR5IHtCb29sZWFufSBib3R0b20gIElmIHRoZSBib3R0b20gZWRnZSB3YXMgZXhjZWVkZWRcclxuICogQHByb3BlcnR5IHtCb29sZWFufSBsZWZ0ICBJZiB0aGUgbGVmdCBlZGdlIHdhcyBleGNlZWRlZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBCb3VuZGluZ1xyXG4gKiBAcHJvcGVydHkge051bWJlcn0gbGVmdCAgbGVmdCBvZmZzZXQgY29vcmRpbmF0ZVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gdG9wICB0b3Agb2Zmc2V0IGNvb3JkaW5hdGVcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcclxuICovXHJcblxyXG4vKipcclxuICogRXNjYXBlcyBoYXNoIGZyb20gc3BlY2lhbCBjaGFyYWN0ZXJzXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyICBDb250YWluZXIgZWxlbWVudCB0aGF0IGFjdHMgYXMgdGhlIGJvdW5kYXJ5XHJcbiAqIEBwYXJhbSB7Qm91bmRpbmd9IGJvdW5kaW5nICBlbGVtZW50IGJvdW5kaW5nIHRoYXQgaXMgYmVpbmcgY2hlY2tlZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0ICBvZmZzZXQgZnJvbSBlZGdlIHRoYXQgY291bnRzIGFzIGV4Y2VlZGluZ1xyXG4gKiBAcmV0dXJucyB7RWRnZXN9XHJcbiAqL1xyXG5NLmNoZWNrV2l0aGluQ29udGFpbmVyID0gZnVuY3Rpb24oY29udGFpbmVyLCBib3VuZGluZywgb2Zmc2V0KSB7XHJcbiAgbGV0IGVkZ2VzID0ge1xyXG4gICAgdG9wOiBmYWxzZSxcclxuICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgIGJvdHRvbTogZmFsc2UsXHJcbiAgICBsZWZ0OiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIGxldCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICBsZXQgc2Nyb2xsTGVmdCA9IGNvbnRhaW5lci5zY3JvbGxMZWZ0O1xyXG4gIGxldCBzY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsVG9wO1xyXG5cclxuICBsZXQgc2Nyb2xsZWRYID0gYm91bmRpbmcubGVmdCAtIHNjcm9sbExlZnQ7XHJcbiAgbGV0IHNjcm9sbGVkWSA9IGJvdW5kaW5nLnRvcCAtIHNjcm9sbFRvcDtcclxuXHJcbiAgLy8gQ2hlY2sgZm9yIGNvbnRhaW5lciBhbmQgdmlld3BvcnQgZm9yIGVhY2ggZWRnZVxyXG4gIGlmIChzY3JvbGxlZFggPCBjb250YWluZXJSZWN0LmxlZnQgKyBvZmZzZXQgfHxcclxuICAgICAgc2Nyb2xsZWRYIDwgb2Zmc2V0KSB7XHJcbiAgICBlZGdlcy5sZWZ0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlmIChzY3JvbGxlZFggKyBib3VuZGluZy53aWR0aCA+IGNvbnRhaW5lclJlY3QucmlnaHQgLSBvZmZzZXQgfHxcclxuICAgICAgc2Nyb2xsZWRYICsgYm91bmRpbmcud2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCAtIG9mZnNldCkge1xyXG4gICAgZWRnZXMucmlnaHQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNjcm9sbGVkWSA8IGNvbnRhaW5lclJlY3QudG9wICsgb2Zmc2V0IHx8XHJcbiAgICAgIHNjcm9sbGVkWSA8IG9mZnNldCkge1xyXG4gICAgZWRnZXMudG9wID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlmIChzY3JvbGxlZFkgKyBib3VuZGluZy5oZWlnaHQgPiBjb250YWluZXJSZWN0LmJvdHRvbSAtIG9mZnNldCB8fFxyXG4gICAgICBzY3JvbGxlZFkgKyBib3VuZGluZy5oZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSBvZmZzZXQpIHtcclxuICAgIGVkZ2VzLmJvdHRvbSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWRnZXM7XHJcbn07XHJcblxyXG5cclxuTS5jaGVja1Bvc3NpYmxlQWxpZ25tZW50cyA9IGZ1bmN0aW9uKGVsLCBjb250YWluZXIsIGJvdW5kaW5nLCBvZmZzZXQpIHtcclxuICBsZXQgY2FuQWxpZ24gPSB7XHJcbiAgICB0b3A6IHRydWUsXHJcbiAgICByaWdodDogdHJ1ZSxcclxuICAgIGJvdHRvbTogdHJ1ZSxcclxuICAgIGxlZnQ6IHRydWUsXHJcbiAgICBzcGFjZU9uVG9wOiBudWxsLFxyXG4gICAgc3BhY2VPblJpZ2h0OiBudWxsLFxyXG4gICAgc3BhY2VPbkJvdHRvbTogbnVsbCxcclxuICAgIHNwYWNlT25MZWZ0OiBudWxsXHJcbiAgfTtcclxuXHJcbiAgbGV0IGNvbnRhaW5lckFsbG93c092ZXJmbG93ID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLm92ZXJmbG93ID09PSAndmlzaWJsZSc7XHJcbiAgbGV0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgbGV0IGVsT2Zmc2V0UmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICBsZXQgc2Nyb2xsTGVmdCA9IGNvbnRhaW5lci5zY3JvbGxMZWZ0O1xyXG4gIGxldCBzY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsVG9wO1xyXG5cclxuICBsZXQgc2Nyb2xsZWRYID0gYm91bmRpbmcubGVmdCAtIHNjcm9sbExlZnQ7XHJcbiAgbGV0IHNjcm9sbGVkWSA9IGJvdW5kaW5nLnRvcCAtIHNjcm9sbFRvcDtcclxuXHJcbiAgLy8gQ2hlY2sgZm9yIGNvbnRhaW5lciBhbmQgdmlld3BvcnQgZm9yIGxlZnRcclxuICBjYW5BbGlnbi5zcGFjZU9uUmlnaHQgPSAhY29udGFpbmVyQWxsb3dzT3ZlcmZsb3cgPyBjb250YWluZXIub2Zmc2V0V2lkdGggLSAoc2Nyb2xsZWRYICsgYm91bmRpbmcud2lkdGgpIDpcclxuICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gKGVsT2Zmc2V0UmVjdC5sZWZ0ICsgYm91bmRpbmcud2lkdGgpO1xyXG4gIGlmICgoIWNvbnRhaW5lckFsbG93c092ZXJmbG93ICYmIHNjcm9sbGVkWCArIGJvdW5kaW5nLndpZHRoID4gY29udGFpbmVyLm9mZnNldFdpZHRoKSB8fFxyXG4gICAgICBjb250YWluZXJBbGxvd3NPdmVyZmxvdyAmJiAoZWxPZmZzZXRSZWN0LmxlZnQgKyBib3VuZGluZy53aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSkge1xyXG4gICAgY2FuQWxpZ24ubGVmdCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgZm9yIGNvbnRhaW5lciBhbmQgdmlld3BvcnQgZm9yIFJpZ2h0XHJcbiAgY2FuQWxpZ24uc3BhY2VPbkxlZnQgPSAhY29udGFpbmVyQWxsb3dzT3ZlcmZsb3cgPyBzY3JvbGxlZFggLSBib3VuZGluZy53aWR0aCArIGVsT2Zmc2V0UmVjdC53aWR0aCA6XHJcbiAgICBlbE9mZnNldFJlY3QucmlnaHQgLSBib3VuZGluZy53aWR0aDtcclxuICBpZiAoKCFjb250YWluZXJBbGxvd3NPdmVyZmxvdyAmJiBzY3JvbGxlZFggLSBib3VuZGluZy53aWR0aCArIGVsT2Zmc2V0UmVjdC53aWR0aCA8IDApIHx8XHJcbiAgICAgIGNvbnRhaW5lckFsbG93c092ZXJmbG93ICYmIChlbE9mZnNldFJlY3QucmlnaHQgLSBib3VuZGluZy53aWR0aCA8IDApKSB7XHJcbiAgICBjYW5BbGlnbi5yaWdodCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgZm9yIGNvbnRhaW5lciBhbmQgdmlld3BvcnQgZm9yIFRvcFxyXG4gIGNhbkFsaWduLnNwYWNlT25Cb3R0b20gPSAhY29udGFpbmVyQWxsb3dzT3ZlcmZsb3cgPyBjb250YWluZXJSZWN0LmhlaWdodCAtIChzY3JvbGxlZFkgKyBib3VuZGluZy5oZWlnaHQgKyBvZmZzZXQpIDpcclxuICAgIHdpbmRvdy5pbm5lckhlaWdodCAtIChlbE9mZnNldFJlY3QudG9wICsgYm91bmRpbmcuaGVpZ2h0ICsgb2Zmc2V0KTtcclxuICBpZiAoKCFjb250YWluZXJBbGxvd3NPdmVyZmxvdyAmJiBzY3JvbGxlZFkgKyBib3VuZGluZy5oZWlnaHQgKyBvZmZzZXQgPiBjb250YWluZXJSZWN0LmhlaWdodCkgfHxcclxuICAgICAgY29udGFpbmVyQWxsb3dzT3ZlcmZsb3cgJiYgKGVsT2Zmc2V0UmVjdC50b3AgKyBib3VuZGluZy5oZWlnaHQgKyBvZmZzZXQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpKSB7XHJcbiAgICBjYW5BbGlnbi50b3AgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGZvciBjb250YWluZXIgYW5kIHZpZXdwb3J0IGZvciBCb3R0b21cclxuICBjYW5BbGlnbi5zcGFjZU9uVG9wID0gIWNvbnRhaW5lckFsbG93c092ZXJmbG93ID8gc2Nyb2xsZWRZIC0gKGJvdW5kaW5nLmhlaWdodCArIG9mZnNldCkgOlxyXG4gICAgZWxPZmZzZXRSZWN0LmJvdHRvbSAtIChib3VuZGluZy5oZWlnaHQgKyBvZmZzZXQpO1xyXG4gIGlmICgoIWNvbnRhaW5lckFsbG93c092ZXJmbG93ICYmIHNjcm9sbGVkWSAtIGJvdW5kaW5nLmhlaWdodCAtIG9mZnNldCA8IDApIHx8XHJcbiAgICAgIGNvbnRhaW5lckFsbG93c092ZXJmbG93ICYmIChlbE9mZnNldFJlY3QuYm90dG9tIC0gYm91bmRpbmcuaGVpZ2h0IC0gb2Zmc2V0IDwgMCkpIHtcclxuICAgIGNhbkFsaWduLmJvdHRvbSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbkFsaWduO1xyXG59O1xyXG5cclxuXHJcbk0uZ2V0T3ZlcmZsb3dQYXJlbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAoZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSB8fCBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLm92ZXJmbG93ICE9PSAndmlzaWJsZScpIHtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE0uZ2V0T3ZlcmZsb3dQYXJlbnQoZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogR2V0cyBpZCBvZiBjb21wb25lbnQgZnJvbSBhIHRyaWdnZXJcclxuICogQHBhcmFtIHtFbGVtZW50fSB0cmlnZ2VyICB0cmlnZ2VyXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5NLmdldElkRnJvbVRyaWdnZXIgPSBmdW5jdGlvbih0cmlnZ2VyKSB7XHJcbiAgbGV0IGlkID0gdHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgaWYgKCFpZCkge1xyXG4gICAgaWQgPSB0cmlnZ2VyLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgaWYgKGlkKSB7XHJcbiAgICAgIGlkID0gaWQuc2xpY2UoMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBpZDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogTXVsdGkgYnJvd3NlciBzdXBwb3J0IGZvciBkb2N1bWVudCBzY3JvbGwgdG9wXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAqL1xyXG5NLmdldERvY3VtZW50U2Nyb2xsVG9wID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogTXVsdGkgYnJvd3NlciBzdXBwb3J0IGZvciBkb2N1bWVudCBzY3JvbGwgbGVmdFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gKi9cclxuTS5nZXREb2N1bWVudFNjcm9sbExlZnQgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBFZGdlc1xyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHRvcCAgSWYgdGhlIHRvcCBlZGdlIHdhcyBleGNlZWRlZFxyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHJpZ2h0ICBJZiB0aGUgcmlnaHQgZWRnZSB3YXMgZXhjZWVkZWRcclxuICogQHByb3BlcnR5IHtCb29sZWFufSBib3R0b20gIElmIHRoZSBib3R0b20gZWRnZSB3YXMgZXhjZWVkZWRcclxuICogQHByb3BlcnR5IHtCb29sZWFufSBsZWZ0ICBJZiB0aGUgbGVmdCBlZGdlIHdhcyBleGNlZWRlZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBCb3VuZGluZ1xyXG4gKiBAcHJvcGVydHkge051bWJlcn0gbGVmdCAgbGVmdCBvZmZzZXQgY29vcmRpbmF0ZVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gdG9wICB0b3Agb2Zmc2V0IGNvb3JkaW5hdGVcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIEdldCB0aW1lIGluIG1zXHJcbiAqIEBsaWNlbnNlIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvbWFzdGVyL0xJQ0VOU0VcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAqL1xyXG5sZXQgZ2V0VGltZSA9IChEYXRlLm5vdyB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG59KTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXHJcbiAqIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxyXG4gKiBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XHJcbiAqIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXHJcbiAqIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxyXG4gKiBAbGljZW5zZSBodHRwczovL3Jhdy5naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL21hc3Rlci9MSUNFTlNFXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcclxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXRcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbk0udGhyb3R0bGUgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBvcHRpb25zKSB7XHJcbiAgbGV0IGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcclxuICBsZXQgdGltZW91dCA9IG51bGw7XHJcbiAgbGV0IHByZXZpb3VzID0gMDtcclxuICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xyXG4gIGxldCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBnZXRUaW1lKCk7XHJcbiAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgfTtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG5vdyA9IGdldFRpbWUoKTtcclxuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBub3c7XHJcbiAgICBsZXQgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XHJcbiAgICBjb250ZXh0ID0gdGhpcztcclxuICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgcHJldmlvdXMgPSBub3c7XHJcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcclxuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn07XHJcblxuKGZ1bmN0aW9uICgkLCBhbmltKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBsZXQgX2RlZmF1bHRzID0ge1xyXG4gICAgYWNjb3JkaW9uOiB0cnVlLFxyXG4gICAgb25PcGVuU3RhcnQ6IHVuZGVmaW5lZCxcclxuICAgIG9uT3BlbkVuZDogdW5kZWZpbmVkLFxyXG4gICAgb25DbG9zZVN0YXJ0OiB1bmRlZmluZWQsXHJcbiAgICBvbkNsb3NlRW5kOiB1bmRlZmluZWQsXHJcbiAgICBpbkR1cmF0aW9uOiAzMDAsXHJcbiAgICBvdXREdXJhdGlvbjogMzAwXHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEBjbGFzc1xyXG4gICAqXHJcbiAgICovXHJcbiAgY2xhc3MgQ29sbGFwc2libGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3QgQ29sbGFwc2libGUgaW5zdGFuY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgc3VwZXIoQ29sbGFwc2libGUsIGVsLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMuZWwuTV9Db2xsYXBzaWJsZSA9IHRoaXM7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogT3B0aW9ucyBmb3IgdGhlIGNvbGxhcHNpYmxlXHJcbiAgICAgICAqIEBtZW1iZXIgQ29sbGFwc2libGUjb3B0aW9uc1xyXG4gICAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gW2FjY29yZGlvbj1mYWxzZV0gLSBUeXBlIG9mIHRoZSBjb2xsYXBzaWJsZVxyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uT3BlblN0YXJ0IC0gQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGJlZm9yZSBjb2xsYXBzaWJsZSBpcyBvcGVuZWRcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbk9wZW5FbmQgLSBDYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgY29sbGFwc2libGUgaXMgb3BlbmVkXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gb25DbG9zZVN0YXJ0IC0gQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGJlZm9yZSBjb2xsYXBzaWJsZSBpcyBjbG9zZWRcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbkNsb3NlRW5kIC0gQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGFmdGVyIGNvbGxhcHNpYmxlIGlzIGNsb3NlZFxyXG4gICAgICAgKiBAcHJvcCB7TnVtYmVyfSBpbkR1cmF0aW9uIC0gVHJhbnNpdGlvbiBpbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IG91dER1cmF0aW9uIC0gVHJhbnNpdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICAgICAqL1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2libGUuZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy5fc2V0dXBFdmVudEhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAvLyBPcGVuIGZpcnN0IGFjdGl2ZVxyXG4gICAgICBsZXQgJGFjdGl2ZUJvZGllcyA9IHRoaXMuJGVsLmNoaWxkcmVuKCdsaS5hY3RpdmUnKS5jaGlsZHJlbignLmNvbGxhcHNpYmxlLWJvZHknKTtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hY2NvcmRpb24pIHsgLy8gSGFuZGxlIEFjY29yZGlvblxyXG4gICAgICAgICRhY3RpdmVCb2RpZXMuZmlyc3QoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7IC8vIEhhbmRsZSBFeHBhbmRhYmxlc1xyXG4gICAgICAgICRhY3RpdmVCb2RpZXMuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xyXG4gICAgICByZXR1cm4gX2RlZmF1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbml0KGVscywgb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuaW5pdCh0aGlzLCBlbHMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZShlbCkge1xyXG4gICAgICBsZXQgZG9tRWxlbSA9ICEhZWwuanF1ZXJ5ID8gZWxbMF0gOiBlbDtcclxuICAgICAgcmV0dXJuIGRvbUVsZW0uTV9Db2xsYXBzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlYXJkb3duIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICB0aGlzLl9yZW1vdmVFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgIHRoaXMuZWwuTV9Db2xsYXBzaWJsZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNvbGxhcHNpYmxlQ2xpY2tCb3VuZCA9IHRoaXMuX2hhbmRsZUNvbGxhcHNpYmxlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNvbGxhcHNpYmxlQ2xpY2tCb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgRXZlbnQgSGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgX3JlbW92ZUV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVDb2xsYXBzaWJsZUNsaWNrQm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIENvbGxhcHNpYmxlIENsaWNrXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVDb2xsYXBzaWJsZUNsaWNrKGUpIHtcclxuICAgICAgbGV0ICRoZWFkZXIgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuY29sbGFwc2libGUtaGVhZGVyJyk7XHJcbiAgICAgIGlmIChlLnRhcmdldCAmJiAkaGVhZGVyLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCAkY29sbGFwc2libGUgPSAkaGVhZGVyLmNsb3Nlc3QoJy5jb2xsYXBzaWJsZScpO1xyXG4gICAgICAgIGlmICgkY29sbGFwc2libGVbMF0gPT09IHRoaXMuZWwpIHtcclxuICAgICAgICAgIGxldCAkY29sbGFwc2libGVMaSA9ICRoZWFkZXIuY2xvc2VzdCgnbGknKTtcclxuICAgICAgICAgIGxldCAkY29sbGFwc2libGVMaXMgPSAkY29sbGFwc2libGUuY2hpbGRyZW4oJ2xpJyk7XHJcbiAgICAgICAgICBsZXQgaXNBY3RpdmUgPSAkY29sbGFwc2libGVMaVswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gJGNvbGxhcHNpYmxlTGlzLmluZGV4KCRjb2xsYXBzaWJsZUxpKTtcclxuXHJcbiAgICAgICAgICBpZiAoaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4oaW5kZXgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW5pbWF0ZSBpbiBjb2xsYXBzaWJsZSBzbGlkZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gMHRoIGluZGV4IG9mIHNsaWRlXHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlSW4oaW5kZXgpIHtcclxuICAgICAgbGV0ICRjb2xsYXBzaWJsZUxpID0gdGhpcy4kZWwuY2hpbGRyZW4oJ2xpJykuZXEoaW5kZXgpO1xyXG4gICAgICBpZiAoJGNvbGxhcHNpYmxlTGkubGVuZ3RoKSB7XHJcbiAgICAgICAgbGV0ICRib2R5ID0gJGNvbGxhcHNpYmxlTGkuY2hpbGRyZW4oJy5jb2xsYXBzaWJsZS1ib2R5Jyk7XHJcblxyXG4gICAgICAgIGFuaW0ucmVtb3ZlKCRib2R5WzBdKTtcclxuICAgICAgICAkYm9keS5jc3Moe1xyXG4gICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgIHBhZGRpbmdUb3A6ICcnLFxyXG4gICAgICAgICAgcGFkZGluZ0JvdHRvbTogJydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHBUb3AgPSAkYm9keS5jc3MoJ3BhZGRpbmctdG9wJyk7XHJcbiAgICAgICAgbGV0IHBCb3R0b20gPSAkYm9keS5jc3MoJ3BhZGRpbmctYm90dG9tJyk7XHJcbiAgICAgICAgbGV0IGZpbmFsSGVpZ2h0ID0gJGJvZHlbMF0uc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgICRib2R5LmNzcyh7XHJcbiAgICAgICAgICBwYWRkaW5nVG9wOiAwLFxyXG4gICAgICAgICAgcGFkZGluZ0JvdHRvbTogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhbmltKHtcclxuICAgICAgICAgIHRhcmdldHM6ICRib2R5WzBdLFxyXG4gICAgICAgICAgaGVpZ2h0OiBmaW5hbEhlaWdodCxcclxuICAgICAgICAgIHBhZGRpbmdUb3A6IHBUb3AsXHJcbiAgICAgICAgICBwYWRkaW5nQm90dG9tOiBwQm90dG9tLFxyXG4gICAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy5pbkR1cmF0aW9uLFxyXG4gICAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0Q3ViaWMnLFxyXG4gICAgICAgICAgY29tcGxldGU6IChhbmltKSA9PiB7XHJcbiAgICAgICAgICAgICRib2R5LmNzcyh7XHJcbiAgICAgICAgICAgICAgb3ZlcmZsb3c6ICcnLFxyXG4gICAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcnLFxyXG4gICAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcnLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogJydcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBvbk9wZW5FbmQgY2FsbGJhY2tcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5vcHRpb25zLm9uT3BlbkVuZCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub25PcGVuRW5kLmNhbGwodGhpcywgJGNvbGxhcHNpYmxlTGlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hdGUgb3V0IGNvbGxhcHNpYmxlIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggLSAwdGggaW5kZXggb2Ygc2xpZGUgdG8gb3BlblxyXG4gICAgICovXHJcbiAgICBfYW5pbWF0ZU91dChpbmRleCkge1xyXG4gICAgICBsZXQgJGNvbGxhcHNpYmxlTGkgPSB0aGlzLiRlbC5jaGlsZHJlbignbGknKS5lcShpbmRleCk7XHJcbiAgICAgIGlmICgkY29sbGFwc2libGVMaS5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgJGJvZHkgPSAkY29sbGFwc2libGVMaS5jaGlsZHJlbignLmNvbGxhcHNpYmxlLWJvZHknKTtcclxuICAgICAgICBhbmltLnJlbW92ZSgkYm9keVswXSk7XHJcbiAgICAgICAgJGJvZHkuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICBhbmltKHtcclxuICAgICAgICAgIHRhcmdldHM6ICRib2R5WzBdLFxyXG4gICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgcGFkZGluZ1RvcDogMCxcclxuICAgICAgICAgIHBhZGRpbmdCb3R0b206IDAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLm91dER1cmF0aW9uLFxyXG4gICAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0Q3ViaWMnLFxyXG4gICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgJGJvZHkuY3NzKHtcclxuICAgICAgICAgICAgICBoZWlnaHQ6ICcnLFxyXG4gICAgICAgICAgICAgIG92ZXJmbG93OiAnJyxcclxuICAgICAgICAgICAgICBwYWRkaW5nOiAnJyxcclxuICAgICAgICAgICAgICBkaXNwbGF5OiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9uQ2xvc2VFbmQgY2FsbGJhY2tcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5vcHRpb25zLm9uQ2xvc2VFbmQpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2xvc2VFbmQuY2FsbCh0aGlzLCAkY29sbGFwc2libGVMaVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBDb2xsYXBzaWJsZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gMHRoIGluZGV4IG9mIHNsaWRlXHJcbiAgICAgKi9cclxuICAgIG9wZW4oaW5kZXgpIHtcclxuICAgICAgbGV0ICRjb2xsYXBzaWJsZUxpID0gdGhpcy4kZWwuY2hpbGRyZW4oJ2xpJykuZXEoaW5kZXgpO1xyXG4gICAgICBpZiAoJGNvbGxhcHNpYmxlTGkubGVuZ3RoICYmICEkY29sbGFwc2libGVMaVswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgIC8vIG9uT3BlblN0YXJ0IGNhbGxiYWNrXHJcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5vcHRpb25zLm9uT3BlblN0YXJ0KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLm9uT3BlblN0YXJ0LmNhbGwodGhpcywgJGNvbGxhcHNpYmxlTGlbMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGFjY29yZGlvbiBiZWhhdmlvclxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uKSB7XHJcbiAgICAgICAgICBsZXQgJGNvbGxhcHNpYmxlTGlzID0gdGhpcy4kZWwuY2hpbGRyZW4oJ2xpJyk7XHJcbiAgICAgICAgICBsZXQgJGFjdGl2ZUxpcyA9IHRoaXMuJGVsLmNoaWxkcmVuKCdsaS5hY3RpdmUnKTtcclxuICAgICAgICAgICRhY3RpdmVMaXMuZWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gJGNvbGxhcHNpYmxlTGlzLmluZGV4KCQoZWwpKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGUgaW5cclxuICAgICAgICAkY29sbGFwc2libGVMaVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB0aGlzLl9hbmltYXRlSW4oaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZSBDb2xsYXBzaWJsZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gMHRoIGluZGV4IG9mIHNsaWRlXHJcbiAgICAgKi9cclxuICAgIGNsb3NlKGluZGV4KSB7XHJcbiAgICAgIGxldCAkY29sbGFwc2libGVMaSA9IHRoaXMuJGVsLmNoaWxkcmVuKCdsaScpLmVxKGluZGV4KTtcclxuICAgICAgaWYgKCRjb2xsYXBzaWJsZUxpLmxlbmd0aCAmJiAkY29sbGFwc2libGVMaVswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgIC8vIG9uQ2xvc2VTdGFydCBjYWxsYmFja1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMub3B0aW9ucy5vbkNsb3NlU3RhcnQpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnMub25DbG9zZVN0YXJ0LmNhbGwodGhpcywgJGNvbGxhcHNpYmxlTGlbMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQW5pbWF0ZSBvdXRcclxuICAgICAgICAkY29sbGFwc2libGVMaVswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB0aGlzLl9hbmltYXRlT3V0KGluZGV4KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgTS5Db2xsYXBzaWJsZSA9IENvbGxhcHNpYmxlO1xyXG5cclxuICBpZiAoTS5qUXVlcnlMb2FkZWQpIHtcclxuICAgIE0uaW5pdGlhbGl6ZUpxdWVyeVdyYXBwZXIoQ29sbGFwc2libGUsICdjb2xsYXBzaWJsZScsICdNX0NvbGxhcHNpYmxlJyk7XHJcbiAgfVxyXG5cclxufShjYXNoLCBNLmFuaW1lKSk7XHJcblxuKGZ1bmN0aW9uKCQsIGFuaW0pIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGxldCBfZGVmYXVsdHMgPSB7XHJcbiAgICBhbGlnbm1lbnQ6ICdsZWZ0JyxcclxuICAgIGNvbnN0cmFpbldpZHRoOiB0cnVlLFxyXG4gICAgY292ZXJUcmlnZ2VyOiB0cnVlLFxyXG4gICAgY2xvc2VPbkNsaWNrOiB0cnVlLFxyXG4gICAgaG92ZXI6IGZhbHNlLFxyXG4gICAgaW5EdXJhdGlvbjogMTUwLFxyXG4gICAgb3V0RHVyYXRpb246IDI1MCxcclxuICAgIG9uT3BlblN0YXJ0OiBudWxsLFxyXG4gICAgb25PcGVuRW5kOiBudWxsLFxyXG4gICAgb25DbG9zZVN0YXJ0OiBudWxsLFxyXG4gICAgb25DbG9zZUVuZDogbnVsbFxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAY2xhc3NcclxuICAgKi9cclxuICBjbGFzcyBEcm9wZG93biBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucykge1xyXG4gICAgICBzdXBlcihEcm9wZG93biwgZWwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy5lbC5NX0Ryb3Bkb3duID0gdGhpcztcclxuICAgICAgRHJvcGRvd24uX2Ryb3Bkb3ducy5wdXNoKHRoaXMpO1xyXG5cclxuICAgICAgdGhpcy5pZCA9IE0uZ2V0SWRGcm9tVHJpZ2dlcihlbCk7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xyXG4gICAgICB0aGlzLiRkcm9wZG93bkVsID0gJCh0aGlzLmRyb3Bkb3duRWwpO1xyXG5cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBPcHRpb25zIGZvciB0aGUgZHJvcGRvd25cclxuICAgICAgICogQG1lbWJlciBEcm9wZG93biNvcHRpb25zXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gb25PcGVuU3RhcnQgLSBGdW5jdGlvbiBjYWxsZWQgd2hlbiBzaWRlbmF2IHN0YXJ0cyBlbnRlcmluZ1xyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uT3BlbkVuZCAtIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHNpZGVuYXYgZmluaXNoZXMgZW50ZXJpbmdcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbkNsb3NlU3RhcnQgLSBGdW5jdGlvbiBjYWxsZWQgd2hlbiBzaWRlbmF2IHN0YXJ0cyBleGl0aW5nXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gb25DbG9zZUVuZCAtIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHNpZGVuYXYgZmluaXNoZXMgZXhpdGluZ1xyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIERyb3Bkb3duLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBEZXNjcmliZXMgb3Blbi9jbG9zZSBzdGF0ZSBvZiBkcm9wZG93blxyXG4gICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGlzLmZvY3VzZWRJbmRleCA9IC0xO1xyXG4gICAgICB0aGlzLmZpbHRlclF1ZXJ5ID0gW107XHJcblxyXG4gICAgICAvLyBNb3ZlIGRyb3Bkb3duLWNvbnRlbnQgYWZ0ZXIgZHJvcGRvd24tdHJpZ2dlclxyXG4gICAgICB0aGlzLiRlbC5hZnRlcih0aGlzLmRyb3Bkb3duRWwpO1xyXG5cclxuICAgICAgdGhpcy5fbWFrZURyb3Bkb3duRm9jdXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuX3Jlc2V0RmlsdGVyUXVlcnlCb3VuZCA9IHRoaXMuX3Jlc2V0RmlsdGVyUXVlcnkuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5faGFuZGxlRG9jdW1lbnRDbGlja0JvdW5kID0gdGhpcy5faGFuZGxlRG9jdW1lbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVEcm9wZG93bktleWRvd25Cb3VuZCA9IHRoaXMuX2hhbmRsZURyb3Bkb3duS2V5ZG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVUcmlnZ2VyS2V5ZG93bkJvdW5kID0gdGhpcy5faGFuZGxlVHJpZ2dlcktleWRvd24uYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5fc2V0dXBFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fRHJvcGRvd247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWFyZG93biBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgdGhpcy5fcmVzZXREcm9wZG93blN0eWxlcygpO1xyXG4gICAgICB0aGlzLl9yZW1vdmVFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgIERyb3Bkb3duLl9kcm9wZG93bnMuc3BsaWNlKERyb3Bkb3duLl9kcm9wZG93bnMuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgIHRoaXMuZWwuTV9Ecm9wZG93biA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIC8vIFRyaWdnZXIga2V5ZG93biBoYW5kbGVyXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZVRyaWdnZXJLZXlkb3duQm91bmQpO1xyXG5cclxuICAgICAgLy8gSG92ZXIgZXZlbnQgaGFuZGxlcnNcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ob3Zlcikge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdXNlRW50ZXJCb3VuZCA9IHRoaXMuX2hhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9oYW5kbGVNb3VzZUVudGVyQm91bmQpO1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdXNlTGVhdmVCb3VuZCA9IHRoaXMuX2hhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oYW5kbGVNb3VzZUxlYXZlQm91bmQpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25FbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGFuZGxlTW91c2VMZWF2ZUJvdW5kKTtcclxuXHJcbiAgICAgIC8vIENsaWNrIGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlQ2xpY2tCb3VuZCA9IHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsaWNrQm91bmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgRXZlbnQgSGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgX3JlbW92ZUV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIC8vIFRyaWdnZXIga2V5ZG93biBoYW5kbGVyXHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZVRyaWdnZXJLZXlkb3duQm91bmQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ob3Zlcikge1xyXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRIYW5kbGVycygnbW91c2VlbnRlcicsIHRoaXMuX2hhbmRsZU1vdXNlRW50ZXJCb3VuZCk7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudEhhbmRsZXJzKCdtb3VzZWxlYXZlJywgdGhpcy5faGFuZGxlTW91c2VMZWF2ZUJvdW5kKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duRWwucmVtb3ZlRXZlbnRIYW5kbGVycygnbW91c2VsZWF2ZScsIHRoaXMuX2hhbmRsZU1vdXNlTGVhdmVCb3VuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsaWNrQm91bmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NldHVwVGVtcG9yYXJ5RXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgLy8gVXNlIGNhcHR1cmUgcGhhc2UgZXZlbnQgaGFuZGxlciB0byBwcmV2ZW50IGNsaWNrXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrQm91bmQsIHRydWUpO1xyXG4gICAgICB0aGlzLmRyb3Bkb3duRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZURyb3Bkb3duS2V5ZG93bkJvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlVGVtcG9yYXJ5RXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgLy8gVXNlIGNhcHR1cmUgcGhhc2UgZXZlbnQgaGFuZGxlciB0byBwcmV2ZW50IGNsaWNrXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrQm91bmQsIHRydWUpO1xyXG4gICAgICB0aGlzLmRyb3Bkb3duRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZURyb3Bkb3duS2V5ZG93bkJvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlQ2xpY2soZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVNb3VzZUVudGVyKCkge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlTW91c2VMZWF2ZShlKSB7XHJcbiAgICAgIGxldCB0b0VsID0gZS50b0VsZW1lbnQgfHwgZS5yZWxhdGVkVGFyZ2V0O1xyXG4gICAgICBsZXQgbGVhdmVUb0Ryb3Bkb3duQ29udGVudCA9ICEhJCh0b0VsKS5jbG9zZXN0KCcuZHJvcGRvd24tY29udGVudCcpLmxlbmd0aDtcclxuICAgICAgbGV0IGxlYXZlVG9BY3RpdmVEcm9wZG93blRyaWdnZXIgPSBmYWxzZTtcclxuXHJcbiAgICAgIGxldCAkY2xvc2VzdFRyaWdnZXIgPSAkKHRvRWwpLmNsb3Nlc3QoJy5kcm9wZG93bi10cmlnZ2VyJyk7XHJcbiAgICAgIGlmICgkY2xvc2VzdFRyaWdnZXIubGVuZ3RoICYmICEhJGNsb3Nlc3RUcmlnZ2VyWzBdLk1fRHJvcGRvd24gJiZcclxuICAgICAgICAgICRjbG9zZXN0VHJpZ2dlclswXS5NX0Ryb3Bkb3duLmlzT3Blbikge1xyXG4gICAgICAgIGxlYXZlVG9BY3RpdmVEcm9wZG93blRyaWdnZXIgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDbG9zZSBob3ZlciBkcm9wZG93biBpZiBtb3VzZSBkaWQgbm90IGxlYXZlIHRvIGVpdGhlciBhY3RpdmUgZHJvcGRvd24tdHJpZ2dlciBvciBkcm9wZG93bi1jb250ZW50XHJcbiAgICAgIGlmICghbGVhdmVUb0FjdGl2ZURyb3Bkb3duVHJpZ2dlciAmJiAhbGVhdmVUb0Ryb3Bkb3duQ29udGVudCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVEb2N1bWVudENsaWNrKGUpIHtcclxuICAgICAgbGV0ICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgJiYgJHRhcmdldC5jbG9zZXN0KCcuZHJvcGRvd24tY29udGVudCcpLmxlbmd0aCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuY2xvc2VzdCgnLmRyb3Bkb3duLXRyaWdnZXInKS5sZW5ndGgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgfSBlbHNlIGlmICghJHRhcmdldC5jbG9zZXN0KCcuZHJvcGRvd24tY29udGVudCcpLmxlbmd0aCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZVRyaWdnZXJLZXlkb3duKGUpIHtcclxuICAgICAgLy8gQVJST1cgRE9XTiBPUiBFTlRFUiBXSEVOIFNFTEVDVCBJUyBDTE9TRUQgLSBvcGVuIERyb3Bkb3duXHJcbiAgICAgIGlmICgoZS53aGljaCA9PT0gTS5rZXlzLkFSUk9XX0RPV04gfHxcclxuICAgICAgICAgICBlLndoaWNoID09PSBNLmtleXMuRU5URVIpICYmICF0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIERyb3Bkb3duIEtleWRvd25cclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZURyb3Bkb3duS2V5ZG93bihlKSB7XHJcbiAgICAgIGlmIChlLndoaWNoID09PSBNLmtleXMuVEFCKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgLy8gTmF2aWdhdGUgZG93biBkcm9wZG93biBsaXN0XHJcbiAgICAgIH0gZWxzZSBpZiAoKGUud2hpY2ggPT09IE0ua2V5cy5BUlJPV19ET1dOIHx8XHJcbiAgICAgICAgICAgICAgICAgIGUud2hpY2ggPT09IE0ua2V5cy5BUlJPV19VUCkgJiYgdGhpcy5pc09wZW4pIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGUud2hpY2ggPT09IE0ua2V5cy5BUlJPV19ET1dOID8gMSA6IC0xO1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZEluZGV4ID1cclxuICAgICAgICAgIE1hdGgubWF4KE1hdGgubWluKHRoaXMuZm9jdXNlZEluZGV4ICsgZGlyZWN0aW9uLCB0aGlzLmRyb3Bkb3duRWwuY2hpbGRyZW4ubGVuZ3RoIC0gMSksIDApO1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzRm9jdXNlZEl0ZW0oKTtcclxuXHJcbiAgICAgICAgLy8gRU5URVIgc2VsZWN0cyBjaG9pY2Ugb24gZm9jdXNlZCBpdGVtXHJcbiAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gTS5rZXlzLkVOVEVSICYmIHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgLy8gU2VhcmNoIGZvciA8YT4gYW5kIDxidXR0b24+XHJcbiAgICAgICAgbGV0IGZvY3VzZWRFbGVtZW50ID0gdGhpcy5kcm9wZG93bkVsLmNoaWxkcmVuW3RoaXMuZm9jdXNlZEluZGV4XTtcclxuICAgICAgICBsZXQgJGFjdGl2YXRhYmxlRWxlbWVudCA9ICQoZm9jdXNlZEVsZW1lbnQpLmZpbmQoJ2EsIGJ1dHRvbicpLmZpcnN0KCk7XHJcblxyXG4gICAgICAgIC8vIENsaWNrIGEgb3IgYnV0dG9uIHRhZyBpZiBleGlzdHMsIG90aGVyd2lzZSBjbGljayBsaSB0YWdcclxuICAgICAgICAhISRhY3RpdmF0YWJsZUVsZW1lbnQubGVuZ3RoID8gJGFjdGl2YXRhYmxlRWxlbWVudFswXS5jbGljaygpIDogZm9jdXNlZEVsZW1lbnQuY2xpY2soKTtcclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgZHJvcGRvd24gb24gRVNDXHJcbiAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gTS5rZXlzLkVTQyAmJiB0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENBU0UgV0hFTiBVU0VSIFRZUEUgTEVUVEVSU1xyXG4gICAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgbm9uTGV0dGVycyA9IFs5LDEzLDI3LDM4LDQwXTtcclxuICAgICAgaWYgKGxldHRlciAmJiAobm9uTGV0dGVycy5pbmRleE9mKGUud2hpY2gpID09PSAtMSkpIHtcclxuICAgICAgICB0aGlzLmZpbHRlclF1ZXJ5LnB1c2gobGV0dGVyKTtcclxuXHJcbiAgICAgICAgbGV0IHN0cmluZyA9IHRoaXMuZmlsdGVyUXVlcnkuam9pbignJyksXHJcbiAgICAgICAgICAgIG5ld09wdGlvbkVsID0gJCh0aGlzLmRyb3Bkb3duRWwpLmZpbmQoJ2xpJykuZmlsdGVyKChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiAkKGVsKS50ZXh0KCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHN0cmluZykgPT09IDA7XHJcbiAgICAgICAgICAgIH0pWzBdO1xyXG5cclxuICAgICAgICBpZiAobmV3T3B0aW9uRWwpIHtcclxuICAgICAgICAgIHRoaXMuZm9jdXNlZEluZGV4ID0gJChuZXdPcHRpb25FbCkuaW5kZXgoKTtcclxuICAgICAgICAgIHRoaXMuX2ZvY3VzRm9jdXNlZEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlsdGVyVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fcmVzZXRGaWx0ZXJRdWVyeUJvdW5kLCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIGRyb3Bkb3duXHJcbiAgICAgKi9cclxuICAgIF9yZXNldEZpbHRlclF1ZXJ5KCkge1xyXG4gICAgICB0aGlzLmZpbHRlclF1ZXJ5ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0RHJvcGRvd25TdHlsZXMoKSB7XHJcbiAgICAgIHRoaXMuJGRyb3Bkb3duRWwuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiAnJyxcclxuICAgICAgICB3aWR0aDogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAnJyxcclxuICAgICAgICBsZWZ0OiAnJyxcclxuICAgICAgICB0b3A6ICcnLFxyXG4gICAgICAgICd0cmFuc2Zvcm0tb3JpZ2luJzogJycsXHJcbiAgICAgICAgdHJhbnNmb3JtOiAnJyxcclxuICAgICAgICBvcGFjaXR5OiAnJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfbWFrZURyb3Bkb3duRm9jdXNhYmxlKCkge1xyXG4gICAgICBpZiAodGhpcy5kcm9wZG93bkVsLnRhYkluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25FbC50YWJJbmRleCA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQodGhpcy5kcm9wZG93bkVsKS5jaGlsZHJlbigpLmF0dHIoJ3RhYmluZGV4JywgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2ZvY3VzRm9jdXNlZEl0ZW0oKSB7XHJcbiAgICAgIGlmICh0aGlzLmZvY3VzZWRJbmRleCA+PSAwICYmIHRoaXMuZm9jdXNlZEluZGV4IDwgdGhpcy5kcm9wZG93bkVsLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25FbC5jaGlsZHJlblt0aGlzLmZvY3VzZWRJbmRleF0uZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXREcm9wZG93blBvc2l0aW9uKCkge1xyXG4gICAgICBsZXQgb2Zmc2V0UGFyZW50QlJlY3QgPSB0aGlzLmVsLm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgbGV0IHRyaWdnZXJPZmZzZXQgPSB7bGVmdDogdGhpcy5lbC5vZmZzZXRMZWZ0LCB0b3A6IHRoaXMuZWwub2Zmc2V0VG9wLCB3aWR0aDogdGhpcy5lbC5vZmZzZXRXaWR0aCwgaGVpZ2h0OiB0aGlzLmVsLm9mZnNldEhlaWdodH07XHJcbiAgICAgIGxldCBkcm9wZG93bk9mZnNldCA9IHtsZWZ0OiB0aGlzLmRyb3Bkb3duRWwub2Zmc2V0TGVmdCwgdG9wOiB0aGlzLmRyb3Bkb3duRWwub2Zmc2V0VG9wLCB3aWR0aDogdGhpcy5kcm9wZG93bkVsLm9mZnNldFdpZHRoLCBoZWlnaHQ6IHRoaXMuZHJvcGRvd25FbC5vZmZzZXRIZWlnaHR9O1xyXG4gICAgICBsZXQgdHJpZ2dlckJSZWN0ID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgbGV0IGRyb3Bkb3duQlJlY3QgPSB0aGlzLmRyb3Bkb3duRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICBsZXQgaWRlYWxIZWlnaHQgPSBkcm9wZG93bkJSZWN0LmhlaWdodDtcclxuICAgICAgbGV0IGlkZWFsV2lkdGggPSBkcm9wZG93bkJSZWN0LndpZHRoO1xyXG4gICAgICBsZXQgaWRlYWxYUG9zID0gIHRyaWdnZXJPZmZzZXQubGVmdDtcclxuICAgICAgbGV0IGlkZWFsWVBvcyA9IHRyaWdnZXJPZmZzZXQudG9wO1xyXG5cclxuICAgICAgbGV0IGRyb3Bkb3duQm91bmRzID0ge1xyXG4gICAgICAgIGxlZnQ6IGlkZWFsWFBvcyxcclxuICAgICAgICB0b3A6IGlkZWFsWVBvcyxcclxuICAgICAgICBoZWlnaHQ6IGlkZWFsSGVpZ2h0LFxyXG4gICAgICAgIHdpZHRoOiBpZGVhbFdpZHRoXHJcbiAgICAgIH07XHJcblxyXG5cclxuICAgICAgLy8gQ291bnRhaW5lciBoZXJlIHdpbGwgYmUgY2xvc2VzdCBhbmNlc3RvciB3aXRoIG92ZXJmbG93OiBoaWRkZW5cclxuICAgICAgbGV0IGNsb3Nlc3RPdmVyZmxvd1BhcmVudCA9IHRoaXMuZHJvcGRvd25FbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgIGxldCBhbGlnbm1lbnRzID0gTS5jaGVja1Bvc3NpYmxlQWxpZ25tZW50cyh0aGlzLmVsLCBjbG9zZXN0T3ZlcmZsb3dQYXJlbnQsIGRyb3Bkb3duQm91bmRzLCB0aGlzLm9wdGlvbnMuY292ZXJUcmlnZ2VyID8gMCA6IHRyaWdnZXJCUmVjdC5oZWlnaHQpO1xyXG5cclxuICAgICAgbGV0IHZlcnRpY2FsQWxpZ25tZW50ID0gJ3RvcCc7XHJcbiAgICAgIGxldCBob3Jpem9udGFsQWxpZ25tZW50ID0gdGhpcy5vcHRpb25zLmFsaWdubWVudDtcclxuICAgICAgaWRlYWxZUG9zICs9ICh0aGlzLm9wdGlvbnMuY292ZXJUcmlnZ2VyID8gMCA6IHRyaWdnZXJCUmVjdC5oZWlnaHQpO1xyXG4gICAgICBpZiAoIWFsaWdubWVudHMudG9wKSB7XHJcbiAgICAgICAgaWYgKGFsaWdubWVudHMuYm90dG9tKSB7XHJcbiAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudCA9ICdib3R0b20nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2lkZSBoYXMgbW9zdCBzcGFjZSBhbmQgY3V0b2ZmIGF0IGNvcnJlY3QgaGVpZ2h0XHJcbiAgICAgICAgICBpZiAoYWxpZ25tZW50cy5zcGFjZU9uVG9wID4gYWxpZ25tZW50cy5zcGFjZU9uQm90dG9tKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50ID0gJ2JvdHRvbSc7XHJcbiAgICAgICAgICAgIGlkZWFsSGVpZ2h0ICs9IGFsaWdubWVudHMuc3BhY2VPblRvcDtcclxuICAgICAgICAgICAgaWRlYWxZUG9zIC09IGFsaWdubWVudHMuc3BhY2VPblRvcDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlkZWFsSGVpZ2h0ICs9IGFsaWdubWVudHMuc3BhY2VPbkJvdHRvbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHByZWZlcnJlZCBob3Jpem9udGFsIGFsaWdubWVudCBpcyBwb3NzaWJsZVxyXG4gICAgICBpZiAoIWFsaWdubWVudHNbaG9yaXpvbnRhbEFsaWdubWVudF0pIHtcclxuICAgICAgICBsZXQgb3Bwb3NpdGVBbGlnbm1lbnQgPSBob3Jpem9udGFsQWxpZ25tZW50ID09PSAnbGVmdCcgPyAncmlnaHQnIDogJ2xlZnQnO1xyXG4gICAgICAgIGlmIChhbGlnbm1lbnRzW29wcG9zaXRlQWxpZ25tZW50XSkge1xyXG4gICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudCA9IG9wcG9zaXRlQWxpZ25tZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2lkZSBoYXMgbW9zdCBzcGFjZSBhbmQgY3V0b2ZmIGF0IGNvcnJlY3QgaGVpZ2h0XHJcbiAgICAgICAgICBpZiAoYWxpZ25tZW50cy5zcGFjZU9uTGVmdCA+IGFsaWdubWVudHMuc3BhY2VPblJpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQgPSAncmlnaHQnO1xyXG4gICAgICAgICAgICBpZGVhbFdpZHRoICs9IGFsaWdubWVudHMuc3BhY2VPbkxlZnQ7XHJcbiAgICAgICAgICAgIGlkZWFsWFBvcyAtPSBhbGlnbm1lbnRzLnNwYWNlT25MZWZ0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudCA9ICdsZWZ0JztcclxuICAgICAgICAgICAgaWRlYWxXaWR0aCArPSBhbGlnbm1lbnRzLnNwYWNlT25SaWdodDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh2ZXJ0aWNhbEFsaWdubWVudCA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICBpZGVhbFlQb3MgPSBpZGVhbFlQb3MgLSBkcm9wZG93bkJSZWN0LmhlaWdodCArXHJcbiAgICAgICAgICAodGhpcy5vcHRpb25zLmNvdmVyVHJpZ2dlciA/IHRyaWdnZXJCUmVjdC5oZWlnaHQgOiAwKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaG9yaXpvbnRhbEFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgIGlkZWFsWFBvcyA9IGlkZWFsWFBvcyAtIGRyb3Bkb3duQlJlY3Qud2lkdGggKyB0cmlnZ2VyQlJlY3Qud2lkdGg7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHt4OiBpZGVhbFhQb3MsXHJcbiAgICAgICAgICAgICAgeTogaWRlYWxZUG9zLFxyXG4gICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiB2ZXJ0aWNhbEFsaWdubWVudCxcclxuICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBob3Jpem9udGFsQWxpZ25tZW50LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogaWRlYWxIZWlnaHQsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IGlkZWFsV2lkdGh9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hdGUgaW4gZHJvcGRvd25cclxuICAgICAqL1xyXG4gICAgX2FuaW1hdGVJbihwb3NpdGlvbkluZm8pIHtcclxuICAgICAgLy8gUGxhY2UgZHJvcGRvd25cclxuICAgICAgdGhpcy5kcm9wZG93bkVsLnN0eWxlLmxlZnQgPSBwb3NpdGlvbkluZm8ueCArICdweCc7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25FbC5zdHlsZS50b3AgPSBwb3NpdGlvbkluZm8ueSArICdweCc7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25FbC5zdHlsZS5oZWlnaHQgPSBwb3NpdGlvbkluZm8uaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgdGhpcy5kcm9wZG93bkVsLnN0eWxlLndpZHRoID0gcG9zaXRpb25JbmZvLndpZHRoICsgJ3B4JztcclxuICAgICAgdGhpcy5kcm9wZG93bkVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9XHJcbiAgICAgICAgYCR7cG9zaXRpb25JbmZvLmhvcml6b250YWxBbGlnbm1lbnQgPT09ICdsZWZ0JyA/ICcwJyA6ICcxMDAlJ30gJHtwb3NpdGlvbkluZm8udmVydGljYWxBbGlnbm1lbnQgPT09ICd0b3AnID8gJzAnIDogJzEwMCUnfWA7XHJcblxyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLmRyb3Bkb3duRWwpO1xyXG4gICAgICBhbmltKHtcclxuICAgICAgICB0YXJnZXRzOiB0aGlzLmRyb3Bkb3duRWwsXHJcbiAgICAgICAgb3BhY2l0eToge1xyXG4gICAgICAgICAgdmFsdWU6IFswLCAxXSxcclxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NhbGVYOiBbLjMsIDFdLFxyXG4gICAgICAgIHNjYWxlWTogWy4zLCAxXSxcclxuICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLmluRHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1aW50JyxcclxuICAgICAgICBjb21wbGV0ZTogKGFuaW0pID0+IHtcclxuICAgICAgICAgIHRoaXMuZHJvcGRvd25FbC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgIC8vIG9uT3BlbkVuZCBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25PcGVuRW5kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBsZXQgZWxlbSA9IGFuaW0uYW5pbWF0YWJsZXNbMF0udGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25PcGVuRW5kLmNhbGwoZWxlbSwgdGhpcy5lbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hdGUgb3V0IGRyb3Bkb3duXHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlT3V0KCkge1xyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLmRyb3Bkb3duRWwpO1xyXG4gICAgICBhbmltKHtcclxuICAgICAgICB0YXJnZXRzOiB0aGlzLmRyb3Bkb3duRWwsXHJcbiAgICAgICAgb3BhY2l0eToge1xyXG4gICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVpbnQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY2FsZVg6IC4zLFxyXG4gICAgICAgIHNjYWxlWTogLjMsXHJcbiAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy5vdXREdXJhdGlvbixcclxuICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVpbnQnLFxyXG4gICAgICAgIGNvbXBsZXRlOiAoYW5pbSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fcmVzZXREcm9wZG93blN0eWxlcygpO1xyXG5cclxuICAgICAgICAgIC8vIG9uQ2xvc2VFbmQgY2FsbGJhY2tcclxuICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5vcHRpb25zLm9uQ2xvc2VFbmQpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtID0gYW5pbS5hbmltYXRhYmxlc1swXS50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkNsb3NlRW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVuIERyb3Bkb3duXHJcbiAgICAgKi9cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAvLyBvbk9wZW5TdGFydCBjYWxsYmFja1xyXG4gICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vbk9wZW5TdGFydCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMub25PcGVuU3RhcnQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVzZXQgc3R5bGVzXHJcbiAgICAgIHRoaXMuX3Jlc2V0RHJvcGRvd25TdHlsZXMoKTtcclxuICAgICAgdGhpcy5kcm9wZG93bkVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgLy8gU2V0IHdpZHRoIGJlZm9yZSBjYWxjdWxhdGluZyBwb3NpdGlvbkluZm9cclxuICAgICAgbGV0IGlkZWFsV2lkdGggPSB0aGlzLm9wdGlvbnMuY29uc3RyYWluV2lkdGggP1xyXG4gICAgICAgICAgdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCA6IHRoaXMuZHJvcGRvd25FbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgICAgdGhpcy5kcm9wZG93bkVsLnN0eWxlLndpZHRoID0gaWRlYWxXaWR0aCArICdweCc7XHJcblxyXG4gICAgICBsZXQgcG9zaXRpb25JbmZvID0gdGhpcy5fZ2V0RHJvcGRvd25Qb3NpdGlvbigpO1xyXG4gICAgICB0aGlzLl9hbmltYXRlSW4ocG9zaXRpb25JbmZvKTtcclxuICAgICAgdGhpcy5fc2V0dXBUZW1wb3JhcnlFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZSBEcm9wZG93blxyXG4gICAgICovXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmZvY3VzZWRJbmRleCA9IC0xO1xyXG5cclxuICAgICAgLy8gb25DbG9zZVN0YXJ0IGNhbGxiYWNrXHJcbiAgICAgIGlmICh0eXBlb2YodGhpcy5vcHRpb25zLm9uQ2xvc2VTdGFydCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMub25DbG9zZVN0YXJ0LmNhbGwodGhpcywgdGhpcy5lbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2FuaW1hdGVPdXQoKTtcclxuICAgICAgdGhpcy5fcmVtb3ZlVGVtcG9yYXJ5RXZlbnRIYW5kbGVycygpO1xyXG4gICAgICB0aGlzLmVsLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIERyb3Bkb3duXHJcbiAgICovXHJcbiAgRHJvcGRvd24uX2Ryb3Bkb3ducyA9IFtdO1xyXG5cclxuICB3aW5kb3cuTS5Ecm9wZG93biA9IERyb3Bkb3duO1xyXG5cclxuICBpZiAoTS5qUXVlcnlMb2FkZWQpIHtcclxuICAgIE0uaW5pdGlhbGl6ZUpxdWVyeVdyYXBwZXIoRHJvcGRvd24sICdkcm9wZG93bicsICdNX0Ryb3Bkb3duJyk7XHJcbiAgfVxyXG5cclxufSkoY2FzaCwgTS5hbmltZSk7XHJcblxuKGZ1bmN0aW9uKCQsIGFuaW0pIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGxldCBfZGVmYXVsdHMgPSB7XHJcbiAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICBpbkR1cmF0aW9uOiAyNTAsXHJcbiAgICBvdXREdXJhdGlvbjogMjUwLFxyXG4gICAgb25PcGVuU3RhcnQ6IG51bGwsXHJcbiAgICBvbk9wZW5FbmQ6IG51bGwsXHJcbiAgICBvbkNsb3NlU3RhcnQ6IG51bGwsXHJcbiAgICBvbkNsb3NlRW5kOiBudWxsLFxyXG4gICAgZGlzbWlzc2libGU6IHRydWUsXHJcbiAgICBzdGFydGluZ1RvcDogJzQlJyxcclxuICAgIGVuZGluZ1RvcDogJzEwJSdcclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQGNsYXNzXHJcbiAgICpcclxuICAgKi9cclxuICBjbGFzcyBNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdCBNb2RhbCBpbnN0YW5jZSBhbmQgc2V0IHVwIG92ZXJsYXlcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgc3VwZXIoTW9kYWwsIGVsLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMuZWwuTV9Nb2RhbCA9IHRoaXM7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogT3B0aW9ucyBmb3IgdGhlIG1vZGFsXHJcbiAgICAgICAqIEBtZW1iZXIgTW9kYWwjb3B0aW9uc1xyXG4gICAgICAgKiBAcHJvcCB7TnVtYmVyfSBbb3BhY2l0eT0wLjVdIC0gT3BhY2l0eSBvZiB0aGUgbW9kYWwgb3ZlcmxheVxyXG4gICAgICAgKiBAcHJvcCB7TnVtYmVyfSBbaW5EdXJhdGlvbj0yNTBdIC0gTGVuZ3RoIGluIG1zIG9mIGVudGVyIHRyYW5zaXRpb25cclxuICAgICAgICogQHByb3Age051bWJlcn0gW291dER1cmF0aW9uPTI1MF0gLSBMZW5ndGggaW4gbXMgb2YgZXhpdCB0cmFuc2l0aW9uXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gb25PcGVuU3RhcnQgLSBDYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgYmVmb3JlIG1vZGFsIGlzIG9wZW5lZFxyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uT3BlbkVuZCAtIENhbGxiYWNrIGZ1bmN0aW9uIGNhbGxlZCBhZnRlciBtb2RhbCBpcyBvcGVuZWRcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbkNsb3NlU3RhcnQgLSBDYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgYmVmb3JlIG1vZGFsIGlzIGNsb3NlZFxyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uQ2xvc2VFbmQgLSBDYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgbW9kYWwgaXMgY2xvc2VkXHJcbiAgICAgICAqIEBwcm9wIHtCb29sZWFufSBbZGlzbWlzc2libGU9dHJ1ZV0gLSBBbGxvdyBtb2RhbCB0byBiZSBkaXNtaXNzZWQgYnkga2V5Ym9hcmQgb3Igb3ZlcmxheSBjbGlja1xyXG4gICAgICAgKiBAcHJvcCB7U3RyaW5nfSBbc3RhcnRpbmdUb3A9JzQlJ10gLSBzdGFydGluZ1RvcFxyXG4gICAgICAgKiBAcHJvcCB7U3RyaW5nfSBbZW5kaW5nVG9wPScxMCUnXSAtIGVuZGluZ1RvcFxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIE1vZGFsLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBEZXNjcmliZXMgb3Blbi9jbG9zZSBzdGF0ZSBvZiBtb2RhbFxyXG4gICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGlzLmlkID0gdGhpcy4kZWwuYXR0cignaWQnKTtcclxuICAgICAgdGhpcy5fb3BlbmluZ1RyaWdnZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCc8ZGl2IGNsYXNzPVwibW9kYWwtb3ZlcmxheVwiPjwvZGl2PicpO1xyXG5cclxuICAgICAgTW9kYWwuX2luY3JlbWVudCsrO1xyXG4gICAgICBNb2RhbC5fY291bnQrKztcclxuICAgICAgdGhpcy4kb3ZlcmxheVswXS5zdHlsZS56SW5kZXggPSAxMDAwICsgTW9kYWwuX2luY3JlbWVudCAqIDI7XHJcbiAgICAgIHRoaXMuZWwuc3R5bGUuekluZGV4ID0gMTAwMCArIE1vZGFsLl9pbmNyZW1lbnQgKiAyICsgMTtcclxuICAgICAgdGhpcy5fc2V0dXBFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fTW9kYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWFyZG93biBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgTW9kYWwuX2NvdW50LS07XHJcbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMuZWwuTV9Nb2RhbCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlDbGlja0JvdW5kID0gdGhpcy5faGFuZGxlT3ZlcmxheUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZU1vZGFsQ2xvc2VDbGlja0JvdW5kID0gdGhpcy5faGFuZGxlTW9kYWxDbG9zZUNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICBpZiAoTW9kYWwuX2NvdW50ID09PSAxKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVRyaWdnZXJDbGljayk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kb3ZlcmxheVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbGlja0JvdW5kKTtcclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZU1vZGFsQ2xvc2VDbGlja0JvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBFdmVudCBIYW5kbGVyc1xyXG4gICAgICovXHJcbiAgICBfcmVtb3ZlRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgaWYgKE1vZGFsLl9jb3VudCA9PT0gMCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVUcmlnZ2VyQ2xpY2spO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJG92ZXJsYXlbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xpY2tCb3VuZCk7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVNb2RhbENsb3NlQ2xpY2tCb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgVHJpZ2dlciBDbGlja1xyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlVHJpZ2dlckNsaWNrKGUpIHtcclxuICAgICAgbGV0ICR0cmlnZ2VyID0gICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5tb2RhbC10cmlnZ2VyJyk7XHJcbiAgICAgIGlmICgkdHJpZ2dlci5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgbW9kYWxJZCA9IE0uZ2V0SWRGcm9tVHJpZ2dlcigkdHJpZ2dlclswXSk7XHJcbiAgICAgICAgbGV0IG1vZGFsSW5zdGFuY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKS5NX01vZGFsO1xyXG4gICAgICAgIGlmIChtb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgICBtb2RhbEluc3RhbmNlLm9wZW4oJHRyaWdnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBPdmVybGF5IENsaWNrXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVPdmVybGF5Q2xpY2soKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzbWlzc2libGUpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBNb2RhbCBDbG9zZSBDbGlja1xyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlTW9kYWxDbG9zZUNsaWNrKGUpIHtcclxuICAgICAgbGV0ICRjbG9zZVRyaWdnZXIgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcubW9kYWwtY2xvc2UnKTtcclxuICAgICAgaWYgKCRjbG9zZVRyaWdnZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgS2V5ZG93blxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlS2V5ZG93bihlKSB7XHJcbiAgICAgIC8vIEVTQyBrZXlcclxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcgJiYgdGhpcy5vcHRpb25zLmRpc21pc3NpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRlIGluIG1vZGFsXHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlSW4oKSB7XHJcbiAgICAgIC8vIFNldCBpbml0aWFsIHN0eWxlc1xyXG4gICAgICAkLmV4dGVuZCh0aGlzLmVsLnN0eWxlLCB7XHJcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pO1xyXG4gICAgICAkLmV4dGVuZCh0aGlzLiRvdmVybGF5WzBdLnN0eWxlLCB7XHJcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQW5pbWF0ZSBvdmVybGF5XHJcbiAgICAgIGFuaW0oe1xyXG4gICAgICAgIHRhcmdldHM6IHRoaXMuJG92ZXJsYXlbMF0sXHJcbiAgICAgICAgb3BhY2l0eTogdGhpcy5vcHRpb25zLm9wYWNpdHksXHJcbiAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy5pbkR1cmF0aW9uLFxyXG4gICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIERlZmluZSBtb2RhbCBhbmltYXRpb24gb3B0aW9uc1xyXG4gICAgICBsZXQgZW50ZXJBbmltT3B0aW9ucyA9IHtcclxuICAgICAgICB0YXJnZXRzOiB0aGlzLmVsLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuaW5EdXJhdGlvbixcclxuICAgICAgICBlYXNpbmc6ICdlYXNlT3V0Q3ViaWMnLFxyXG4gICAgICAgIC8vIEhhbmRsZSBtb2RhbCBvbk9wZW5FbmQgY2FsbGJhY2tcclxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25PcGVuRW5kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25PcGVuRW5kLmNhbGwodGhpcywgdGhpcy5lbCwgdGhpcy5fb3BlbmluZ1RyaWdnZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEJvdHRvbSBzaGVldCBhbmltYXRpb25cclxuICAgICAgaWYgKHRoaXMuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdib3R0b20tc2hlZXQnKSkge1xyXG4gICAgICAgICQuZXh0ZW5kKGVudGVyQW5pbU9wdGlvbnMsIHtcclxuICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbmltKGVudGVyQW5pbU9wdGlvbnMpO1xyXG5cclxuICAgICAgLy8gTm9ybWFsIG1vZGFsIGFuaW1hdGlvblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQuZXh0ZW5kKGVudGVyQW5pbU9wdGlvbnMsIHtcclxuICAgICAgICAgIHRvcDogW3RoaXMub3B0aW9ucy5zdGFydGluZ1RvcCwgdGhpcy5vcHRpb25zLmVuZGluZ1RvcF0sXHJcbiAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgc2NhbGVYOiBbLjgsIDFdLFxyXG4gICAgICAgICAgc2NhbGVZOiBbLjgsIDFdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYW5pbShlbnRlckFuaW1PcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW5pbWF0ZSBvdXQgbW9kYWxcclxuICAgICAqL1xyXG4gICAgX2FuaW1hdGVPdXQoKSB7XHJcbiAgICAgIC8vIEFuaW1hdGUgb3ZlcmxheVxyXG4gICAgICBhbmltKHtcclxuICAgICAgICB0YXJnZXRzOiB0aGlzLiRvdmVybGF5WzBdLFxyXG4gICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy5vdXREdXJhdGlvbixcclxuICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhcnQnXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gRGVmaW5lIG1vZGFsIGFuaW1hdGlvbiBvcHRpb25zXHJcbiAgICAgIGxldCBleGl0QW5pbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy5lbCxcclxuICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLm91dER1cmF0aW9uLFxyXG4gICAgICAgIGVhc2luZzogJ2Vhc2VPdXRDdWJpYycsXHJcbiAgICAgICAgLy8gSGFuZGxlIG1vZGFsIHJlYWR5IGNhbGxiYWNrXHJcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgLy8gQ2FsbCBvbkNsb3NlRW5kIGNhbGxiYWNrXHJcbiAgICAgICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vbkNsb3NlRW5kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25DbG9zZUVuZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEJvdHRvbSBzaGVldCBhbmltYXRpb25cclxuICAgICAgaWYgKHRoaXMuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdib3R0b20tc2hlZXQnKSkge1xyXG4gICAgICAgICQuZXh0ZW5kKGV4aXRBbmltT3B0aW9ucywge1xyXG4gICAgICAgICAgYm90dG9tOiAnLTEwMCUnLFxyXG4gICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFuaW0oZXhpdEFuaW1PcHRpb25zKTtcclxuXHJcbiAgICAgIC8vIE5vcm1hbCBtb2RhbCBhbmltYXRpb25cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkLmV4dGVuZChleGl0QW5pbU9wdGlvbnMsIHtcclxuICAgICAgICAgIHRvcDogW3RoaXMub3B0aW9ucy5lbmRpbmdUb3AsIHRoaXMub3B0aW9ucy5zdGFydGluZ1RvcF0sXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgc2NhbGVYOiAwLjgsXHJcbiAgICAgICAgICBzY2FsZVk6IDAuOFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFuaW0oZXhpdEFuaW1PcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gTW9kYWxcclxuICAgICAqIEBwYXJhbSB7Y2FzaH0gWyR0cmlnZ2VyXVxyXG4gICAgICovXHJcbiAgICBvcGVuKCR0cmlnZ2VyKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG5cclxuICAgICAgLy8gb25PcGVuU3RhcnQgY2FsbGJhY2tcclxuICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25PcGVuU3RhcnQpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uT3BlblN0YXJ0LmNhbGwodGhpcywgdGhpcy5lbCwgdGhpcy5fb3BlbmluZ1RyaWdnZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgIHRoaXMuZWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIHRoaXMuJG92ZXJsYXlbMF0pO1xyXG5cclxuICAgICAgLy8gU2V0IG9wZW5pbmcgdHJpZ2dlciwgdW5kZWZpbmVkIGluZGljYXRlcyBtb2RhbCB3YXMgb3BlbmVkIGJ5IGphdmFzY3JpcHRcclxuICAgICAgdGhpcy5fb3BlbmluZ1RyaWdnZXIgPSAhISR0cmlnZ2VyID8gJHRyaWdnZXJbMF0gOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRpc21pc3NpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlS2V5ZG93bkJvdW5kID0gdGhpcy5faGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duQm91bmQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLmVsKTtcclxuICAgICAgYW5pbS5yZW1vdmUodGhpcy4kb3ZlcmxheVswXSk7XHJcbiAgICAgIHRoaXMuX2FuaW1hdGVJbigpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlIE1vZGFsXHJcbiAgICAgKi9cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gQ2FsbCBvbkNsb3NlU3RhcnQgY2FsbGJhY2tcclxuICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25DbG9zZVN0YXJ0KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbkNsb3NlU3RhcnQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzbWlzc2libGUpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5ZG93bkJvdW5kKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYW5pbS5yZW1vdmUodGhpcy5lbCk7XHJcbiAgICAgIGFuaW0ucmVtb3ZlKHRoaXMuJG92ZXJsYXlbMF0pO1xyXG4gICAgICB0aGlzLl9hbmltYXRlT3V0KCk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBNb2RhbFxyXG4gICAqL1xyXG4gIE1vZGFsLl9pbmNyZW1lbnQgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIE1vZGFsXHJcbiAgICovXHJcbiAgTW9kYWwuX2NvdW50ID0gMDtcclxuXHJcbiAgTS5Nb2RhbCA9IE1vZGFsO1xyXG5cclxuICBpZiAoTS5qUXVlcnlMb2FkZWQpIHtcclxuICAgIE0uaW5pdGlhbGl6ZUpxdWVyeVdyYXBwZXIoTW9kYWwsICdtb2RhbCcsICdNX01vZGFsJyk7XHJcbiAgfVxyXG5cclxufSkoY2FzaCwgTS5hbmltZSk7XHJcblxuKGZ1bmN0aW9uICgkLCBhbmltKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBsZXQgX2RlZmF1bHRzID0ge1xyXG4gICAgaW5EdXJhdGlvbjogMjc1LFxyXG4gICAgb3V0RHVyYXRpb246IDIwMCxcclxuICAgIG9uT3BlblN0YXJ0OiBudWxsLFxyXG4gICAgb25PcGVuRW5kOiBudWxsLFxyXG4gICAgb25DbG9zZVN0YXJ0OiBudWxsLFxyXG4gICAgb25DbG9zZUVuZDogbnVsbFxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBjbGFzc1xyXG4gICAqXHJcbiAgICovXHJcbiAgY2xhc3MgTWF0ZXJpYWxib3ggZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3QgTWF0ZXJpYWxib3ggaW5zdGFuY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgIHN1cGVyKE1hdGVyaWFsYm94LCBlbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmVsLk1fTWF0ZXJpYWxib3ggPSB0aGlzO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIE9wdGlvbnMgZm9yIHRoZSBtb2RhbFxyXG4gICAgICAgKiBAbWVtYmVyIE1hdGVyaWFsYm94I29wdGlvbnNcclxuICAgICAgICogQHByb3Age051bWJlcn0gW2luRHVyYXRpb249Mjc1XSAtIExlbmd0aCBpbiBtcyBvZiBlbnRlciB0cmFuc2l0aW9uXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IFtvdXREdXJhdGlvbj0yMDBdIC0gTGVuZ3RoIGluIG1zIG9mIGV4aXQgdHJhbnNpdGlvblxyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uT3BlblN0YXJ0IC0gQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGJlZm9yZSBtYXRlcmlhbGJveCBpcyBvcGVuZWRcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbk9wZW5FbmQgLSBDYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgbWF0ZXJpYWxib3ggaXMgb3BlbmVkXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gb25DbG9zZVN0YXJ0IC0gQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGJlZm9yZSBtYXRlcmlhbGJveCBpcyBjbG9zZWRcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbkNsb3NlRW5kIC0gQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGFmdGVyIG1hdGVyaWFsYm94IGlzIGNsb3NlZFxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIE1hdGVyaWFsYm94LmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMub3ZlcmxheUFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmRvbmVBbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnbWF0ZXJpYWwtcGxhY2Vob2xkZXInKTtcclxuICAgICAgdGhpcy5vcmlnaW5hbFdpZHRoID0gMDtcclxuICAgICAgdGhpcy5vcmlnaW5hbEhlaWdodCA9IDA7XHJcbiAgICAgIHRoaXMub3JpZ2luSW5saW5lU3R5bGVzID0gdGhpcy4kZWwuYXR0cignc3R5bGUnKTtcclxuICAgICAgdGhpcy5jYXB0aW9uID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2FwdGlvbicpIHx8IFwiXCI7XHJcblxyXG4gICAgICAvLyBXcmFwXHJcbiAgICAgIHRoaXMuJGVsLmJlZm9yZSh0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgICAgdGhpcy5wbGFjZWhvbGRlci5hcHBlbmQodGhpcy4kZWwpO1xyXG5cclxuICAgICAgdGhpcy5fc2V0dXBFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fTWF0ZXJpYWxib3g7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWFyZG93biBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICB0aGlzLmVsLk1fTWF0ZXJpYWxib3ggPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCBFdmVudCBIYW5kbGVyc1xyXG4gICAgICovXHJcbiAgICBfc2V0dXBFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICB0aGlzLl9oYW5kbGVNYXRlcmlhbGJveENsaWNrQm91bmQgPSB0aGlzLl9oYW5kbGVNYXRlcmlhbGJveENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVNYXRlcmlhbGJveENsaWNrQm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVNYXRlcmlhbGJveENsaWNrQm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIE1hdGVyaWFsYm94IENsaWNrXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVNYXRlcmlhbGJveENsaWNrKGUpIHtcclxuICAgICAgLy8gSWYgYWxyZWFkeSBtb2RhbCwgcmV0dXJuIHRvIG9yaWdpbmFsXHJcbiAgICAgIGlmICh0aGlzLmRvbmVBbmltYXRpbmcgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgICAodGhpcy5vdmVybGF5QWN0aXZlICYmIHRoaXMuZG9uZUFuaW1hdGluZykpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBXaW5kb3cgU2Nyb2xsXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVXaW5kb3dTY3JvbGwoKSB7XHJcbiAgICAgIGlmICh0aGlzLm92ZXJsYXlBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBXaW5kb3cgUmVzaXplXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVXaW5kb3dSZXNpemUoKSB7XHJcbiAgICAgIGlmICh0aGlzLm92ZXJsYXlBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBXaW5kb3cgUmVzaXplXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVXaW5kb3dFc2NhcGUoZSkge1xyXG4gICAgICAvLyBFU0Mga2V5XHJcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3ICYmXHJcbiAgICAgICAgICB0aGlzLmRvbmVBbmltYXRpbmcgJiZcclxuICAgICAgICAgIHRoaXMub3ZlcmxheUFjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBhbmNlc3RvcnMgd2l0aCBvdmVyZmxvdzogaGlkZGVuOyBhbmQgbWFrZSB2aXNpYmxlXHJcbiAgICAgKi9cclxuICAgIF9tYWtlQW5jZXN0b3JzT3ZlcmZsb3dWaXNpYmxlKCkge1xyXG4gICAgICB0aGlzLmFuY2VzdG9yc0NoYW5nZWQgPSAkKCk7XHJcbiAgICAgIGxldCBhbmNlc3RvciA9IHRoaXMucGxhY2Vob2xkZXJbMF0ucGFyZW50Tm9kZTtcclxuICAgICAgd2hpbGUgKGFuY2VzdG9yICE9PSBudWxsICYmICEkKGFuY2VzdG9yKS5pcyhkb2N1bWVudCkpIHtcclxuICAgICAgICBsZXQgY3VyciA9ICQoYW5jZXN0b3IpO1xyXG4gICAgICAgIGlmIChjdXJyLmNzcygnb3ZlcmZsb3cnKSAhPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICBjdXJyLmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuYW5jZXN0b3JzQ2hhbmdlZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5jZXN0b3JzQ2hhbmdlZCA9IGN1cnI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbmNlc3RvcnNDaGFuZ2VkID0gdGhpcy5hbmNlc3RvcnNDaGFuZ2VkLmFkZChjdXJyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnROb2RlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRlIGltYWdlIGluXHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlSW1hZ2VJbigpIHtcclxuICAgICAgbGV0IGFuaW1PcHRpb25zID0ge1xyXG4gICAgICAgIHRhcmdldHM6IHRoaXMuZWwsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLm5ld0hlaWdodCxcclxuICAgICAgICB3aWR0aDogdGhpcy5uZXdXaWR0aCxcclxuICAgICAgICBsZWZ0OiBNLmdldERvY3VtZW50U2Nyb2xsTGVmdCgpICsgdGhpcy53aW5kb3dXaWR0aC8yIC0gdGhpcy5wbGFjZWhvbGRlci5vZmZzZXQoKS5sZWZ0IC0gdGhpcy5uZXdXaWR0aC8yLFxyXG4gICAgICAgIHRvcDogTS5nZXREb2N1bWVudFNjcm9sbFRvcCgpICsgdGhpcy53aW5kb3dIZWlnaHQvMiAtIHRoaXMucGxhY2Vob2xkZXIub2Zmc2V0KCkudG9wIC0gdGhpcy5uZXdIZWlnaHQvMixcclxuICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLmluRHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRvbmVBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIC8vIG9uT3BlbkVuZCBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25PcGVuRW5kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25PcGVuRW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRoaXMuJGVsLmhhc0NsYXNzKCdyZXNwb25zaXZlLWltZycpKSB7XHJcbiAgICAgICAgYW5pbU9wdGlvbnMubWF4V2lkdGggPSB0aGlzLm5ld1dpZHRoO1xyXG4gICAgICAgIGFuaW1PcHRpb25zLndpZHRoID0gW3RoaXMub3JpZ2luYWxXaWR0aCwgYW5pbU9wdGlvbnMud2lkdGhdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFuaW1PcHRpb25zLmxlZnQgPSBbYW5pbU9wdGlvbnMubGVmdCwgMF07XHJcbiAgICAgICAgYW5pbU9wdGlvbnMudG9wID0gW2FuaW1PcHRpb25zLnRvcCwgMF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFuaW0oYW5pbU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW5pbWF0ZSBpbWFnZSBvdXRcclxuICAgICAqL1xyXG4gICAgX2FuaW1hdGVJbWFnZU91dCgpIHtcclxuICAgICAgbGV0IGFuaW1PcHRpb25zID0ge1xyXG4gICAgICAgIHRhcmdldHM6IHRoaXMuZWwsXHJcbiAgICAgICAgd2lkdGg6IHRoaXMub3JpZ2luYWxXaWR0aCxcclxuICAgICAgICBoZWlnaHQ6IHRoaXMub3JpZ2luYWxIZWlnaHQsXHJcbiAgICAgICAgbGVmdDogMCxcclxuICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy5vdXREdXJhdGlvbixcclxuICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIuY3NzKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAnJyxcclxuICAgICAgICAgICAgd2lkdGg6ICcnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJycsXHJcbiAgICAgICAgICAgIHRvcDogJycsXHJcbiAgICAgICAgICAgIGxlZnQ6ICcnXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgdGhpcy4kZWwuYXR0cignc3R5bGUnLCB0aGlzLm9yaWdpbklubGluZVN0eWxlcyk7XHJcblxyXG4gICAgICAgICAgLy8gUmVtb3ZlIGNsYXNzXHJcbiAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLmRvbmVBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIC8vIFJlbW92ZSBvdmVyZmxvdyBvdmVycmlkZXMgb24gYW5jZXN0b3JzXHJcbiAgICAgICAgICBpZiAodGhpcy5hbmNlc3RvcnNDaGFuZ2VkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuY2VzdG9yc0NoYW5nZWQuY3NzKCdvdmVyZmxvdycsICcnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBvbkNsb3NlRW5kIGNhbGxiYWNrXHJcbiAgICAgICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vbkNsb3NlRW5kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25DbG9zZUVuZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGFuaW0oYW5pbU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIG9wZW4gYW5kIGNsb3NlIHZhcnNcclxuICAgICAqL1xyXG4gICAgX3VwZGF0ZVZhcnMoKSB7XHJcbiAgICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgIHRoaXMuY2FwdGlvbiA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcHRpb24nKSB8fCBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBNYXRlcmlhbGJveFxyXG4gICAgICovXHJcbiAgICBvcGVuKCkge1xyXG4gICAgICB0aGlzLl91cGRhdGVWYXJzKCk7XHJcbiAgICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgICAgIHRoaXMub3JpZ2luYWxIZWlnaHQgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcbiAgICAgIC8vIFNldCBzdGF0ZXNcclxuICAgICAgdGhpcy5kb25lQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgdGhpcy5vdmVybGF5QWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIG9uT3BlblN0YXJ0IGNhbGxiYWNrXHJcbiAgICAgIGlmICh0eXBlb2YodGhpcy5vcHRpb25zLm9uT3BlblN0YXJ0KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbk9wZW5TdGFydC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgcG9zaXRpb25pbmcgZm9yIHBsYWNlaG9sZGVyXHJcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIuY3NzKHtcclxuICAgICAgICB3aWR0aDogdGhpcy5wbGFjZWhvbGRlclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCArICdweCcsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnBsYWNlaG9sZGVyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArICdweCcsXHJcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIGxlZnQ6IDBcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLl9tYWtlQW5jZXN0b3JzT3ZlcmZsb3dWaXNpYmxlKCk7XHJcblxyXG4gICAgICAvLyBTZXQgY3NzIG9uIG9yaWdpblxyXG4gICAgICB0aGlzLiRlbC5jc3Moe1xyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICd6LWluZGV4JzogMTAwMCxcclxuICAgICAgICAnd2lsbC1jaGFuZ2UnOiAnbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0J1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEFkZCBvdmVybGF5XHJcbiAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCc8ZGl2IGlkPVwibWF0ZXJpYWxib3gtb3ZlcmxheVwiPjwvZGl2PicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub25lKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmRvbmVBbmltYXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gUHV0IGJlZm9yZSBpbiBvcmlnaW4gaW1hZ2UgdG8gcHJlc2VydmUgei1pbmRleCBsYXllcmluZy5cclxuICAgICAgdGhpcy4kZWwuYmVmb3JlKHRoaXMuJG92ZXJsYXkpO1xyXG5cclxuICAgICAgLy8gU2V0IGRpbWVuc2lvbnMgaWYgbmVlZGVkXHJcbiAgICAgIGxldCBvdmVybGF5T2Zmc2V0ID0gdGhpcy4kb3ZlcmxheVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moe1xyXG4gICAgICAgIHdpZHRoOiB0aGlzLndpbmRvd1dpZHRoICsgJ3B4JyxcclxuICAgICAgICBoZWlnaHQ6IHRoaXMud2luZG93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICBsZWZ0OiAtMSAqIG92ZXJsYXlPZmZzZXQubGVmdCArICdweCcsXHJcbiAgICAgICAgdG9wOiAtMSAqIG92ZXJsYXlPZmZzZXQudG9wICsgJ3B4J1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFuaW0ucmVtb3ZlKHRoaXMuZWwpO1xyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLiRvdmVybGF5WzBdKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmNhcHRpb24gIT09IFwiXCIpIHtcclxuICAgICAgICBhbmltLnJlbW92ZSh0aGlzLiRwaG90b0NhcHRpb25bMF0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBbmltYXRlIE92ZXJsYXlcclxuICAgICAgYW5pbSh7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy4kb3ZlcmxheVswXSxcclxuICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuaW5EdXJhdGlvbixcclxuICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBBZGQgYW5kIGFuaW1hdGUgY2FwdGlvbiBpZiBpdCBleGlzdHNcclxuICAgICAgaWYgKHRoaXMuY2FwdGlvbiAhPT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuJHBob3RvQ2FwdGlvbiA9ICQoJzxkaXYgY2xhc3M9XCJtYXRlcmlhbGJveC1jYXB0aW9uXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgdGhpcy4kcGhvdG9DYXB0aW9uLnRleHQodGhpcy5jYXB0aW9uKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKHRoaXMuJHBob3RvQ2FwdGlvbik7XHJcbiAgICAgICAgdGhpcy4kcGhvdG9DYXB0aW9uLmNzcyh7IFwiZGlzcGxheVwiOiBcImlubGluZVwiIH0pO1xyXG5cclxuICAgICAgICBhbmltKHtcclxuICAgICAgICAgIHRhcmdldHM6IHRoaXMuJHBob3RvQ2FwdGlvblswXSxcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLmluRHVyYXRpb24sXHJcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVzaXplIEltYWdlXHJcbiAgICAgIGxldCByYXRpbyA9IDA7XHJcbiAgICAgIGxldCB3aWR0aFBlcmNlbnQgPSB0aGlzLm9yaWdpbmFsV2lkdGggLyB0aGlzLndpbmRvd1dpZHRoO1xyXG4gICAgICBsZXQgaGVpZ2h0UGVyY2VudCA9IHRoaXMub3JpZ2luYWxIZWlnaHQgLyB0aGlzLndpbmRvd0hlaWdodDtcclxuICAgICAgdGhpcy5uZXdXaWR0aCA9IDA7XHJcbiAgICAgIHRoaXMubmV3SGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgIGlmICh3aWR0aFBlcmNlbnQgPiBoZWlnaHRQZXJjZW50KSB7XHJcbiAgICAgICAgcmF0aW8gPSB0aGlzLm9yaWdpbmFsSGVpZ2h0IC8gdGhpcy5vcmlnaW5hbFdpZHRoO1xyXG4gICAgICAgIHRoaXMubmV3V2lkdGggPSB0aGlzLndpbmRvd1dpZHRoICogMC45O1xyXG4gICAgICAgIHRoaXMubmV3SGVpZ2h0ID0gdGhpcy53aW5kb3dXaWR0aCAqIDAuOSAqIHJhdGlvO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJhdGlvID0gdGhpcy5vcmlnaW5hbFdpZHRoIC8gdGhpcy5vcmlnaW5hbEhlaWdodDtcclxuICAgICAgICB0aGlzLm5ld1dpZHRoID0gdGhpcy53aW5kb3dIZWlnaHQgKiAwLjkgKiByYXRpbztcclxuICAgICAgICB0aGlzLm5ld0hlaWdodCA9IHRoaXMud2luZG93SGVpZ2h0ICogMC45O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9hbmltYXRlSW1hZ2VJbigpO1xyXG5cclxuICAgICAgLy8gSGFuZGxlIEV4aXQgdHJpZ2dlcnNcclxuICAgICAgdGhpcy5faGFuZGxlV2luZG93U2Nyb2xsQm91bmQgPSB0aGlzLl9oYW5kbGVXaW5kb3dTY3JvbGwuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5faGFuZGxlV2luZG93UmVzaXplQm91bmQgPSB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5faGFuZGxlV2luZG93RXNjYXBlQm91bmQgPSB0aGlzLl9oYW5kbGVXaW5kb3dFc2NhcGUuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVXaW5kb3dTY3JvbGxCb3VuZCk7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemVCb3VuZCk7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2hhbmRsZVdpbmRvd0VzY2FwZUJvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlIE1hdGVyaWFsYm94XHJcbiAgICAgKi9cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICB0aGlzLl91cGRhdGVWYXJzKCk7XHJcbiAgICAgIHRoaXMuZG9uZUFuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gb25DbG9zZVN0YXJ0IGNhbGxiYWNrXHJcbiAgICAgIGlmICh0eXBlb2YodGhpcy5vcHRpb25zLm9uQ2xvc2VTdGFydCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMub25DbG9zZVN0YXJ0LmNhbGwodGhpcywgdGhpcy5lbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFuaW0ucmVtb3ZlKHRoaXMuZWwpO1xyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLiRvdmVybGF5WzBdKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmNhcHRpb24gIT09IFwiXCIpIHtcclxuICAgICAgICBhbmltLnJlbW92ZSh0aGlzLiRwaG90b0NhcHRpb25bMF0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkaXNhYmxlIGV4aXQgaGFuZGxlcnNcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVdpbmRvd1Njcm9sbEJvdW5kKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVdpbmRvd1Jlc2l6ZUJvdW5kKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5faGFuZGxlV2luZG93RXNjYXBlQm91bmQpO1xyXG5cclxuICAgICAgYW5pbSh7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy4kb3ZlcmxheVswXSxcclxuICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMub3V0RHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm92ZXJsYXlBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuX2FuaW1hdGVJbWFnZU91dCgpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIENhcHRpb24gKyByZXNldCBjc3Mgc2V0dGluZ3Mgb24gaW1hZ2VcclxuICAgICAgaWYgKHRoaXMuY2FwdGlvbiAhPT0gXCJcIikge1xyXG4gICAgICAgIGFuaW0oe1xyXG4gICAgICAgICAgdGFyZ2V0czogdGhpcy4kcGhvdG9DYXB0aW9uWzBdLFxyXG4gICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMub3V0RHVyYXRpb24sXHJcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwaG90b0NhcHRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIE0uTWF0ZXJpYWxib3ggPSBNYXRlcmlhbGJveDtcclxuXHJcbiAgaWYgKE0ualF1ZXJ5TG9hZGVkKSB7XHJcbiAgICBNLmluaXRpYWxpemVKcXVlcnlXcmFwcGVyKE1hdGVyaWFsYm94LCAnbWF0ZXJpYWxib3gnLCAnTV9NYXRlcmlhbGJveCcpO1xyXG4gIH1cclxuXHJcbn0oY2FzaCwgTS5hbmltZSkpO1xyXG5cbihmdW5jdGlvbigkKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBsZXQgX2RlZmF1bHRzID0ge1xyXG4gICAgcmVzcG9uc2l2ZVRocmVzaG9sZDogMCwgLy8gYnJlYWtwb2ludCBmb3Igc3dpcGVhYmxlXHJcbiAgfTtcclxuXHJcbiAgY2xhc3MgUGFyYWxsYXggZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKSB7XHJcbiAgICAgIHN1cGVyKFBhcmFsbGF4LCBlbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmVsLk1fUGFyYWxsYXggPSB0aGlzO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIE9wdGlvbnMgZm9yIHRoZSBQYXJhbGxheFxyXG4gICAgICAgKiBAbWVtYmVyIFBhcmFsbGF4I29wdGlvbnNcclxuICAgICAgICogQHByb3Age051bWJlcn0gcmVzcG9uc2l2ZVRocmVzaG9sZFxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFBhcmFsbGF4LmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMuJGltZyA9IHRoaXMuJGVsLmZpbmQoJ2ltZycpLmZpcnN0KCk7XHJcbiAgICAgIHRoaXMuX2VuYWJsZWQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IHRoaXMub3B0aW9ucy5yZXNwb25zaXZlVGhyZXNob2xkO1xyXG4gICAgICB0aGlzLl91cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICB0aGlzLl9zZXR1cEV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgdGhpcy5fc2V0dXBTdHlsZXMoKTtcclxuXHJcbiAgICAgIFBhcmFsbGF4Ll9wYXJhbGxheGVzLnB1c2godGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fUGFyYWxsYXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWFyZG93biBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgUGFyYWxsYXguX3BhcmFsbGF4ZXMuc3BsaWNlKFBhcmFsbGF4Ll9wYXJhbGxheGVzLmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgICB0aGlzLiRpbWdbMF0uc3R5bGUudHJhbnNmb3JtID0gJyc7XHJcbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50SGFuZGxlcnMoKTtcclxuXHJcbiAgICAgIHRoaXMuJGVsWzBdLk1fUGFyYWxsYXggPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIF9oYW5kbGVTY3JvbGwoKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUGFyYWxsYXguX3BhcmFsbGF4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcGFyYWxsYXhJbnN0YW5jZSA9IFBhcmFsbGF4Ll9wYXJhbGxheGVzW2ldO1xyXG4gICAgICAgIHBhcmFsbGF4SW5zdGFuY2UuX3VwZGF0ZVBhcmFsbGF4LmNhbGwocGFyYWxsYXhJbnN0YW5jZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgX2hhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBQYXJhbGxheC5fcGFyYWxsYXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBwYXJhbGxheEluc3RhbmNlID0gUGFyYWxsYXguX3BhcmFsbGF4ZXNbaV07XHJcbiAgICAgICAgcGFyYWxsYXhJbnN0YW5jZS5fZW5hYmxlZCA9IHdpbmRvdy5pbm5lcldpZHRoID4gcGFyYWxsYXhJbnN0YW5jZS5vcHRpb25zLnJlc3BvbnNpdmVUaHJlc2hvbGQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2V0dXBFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUxvYWRCb3VuZCA9IHRoaXMuX2hhbmRsZUltYWdlTG9hZC5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLiRpbWdbMF0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMuX2hhbmRsZUltYWdlTG9hZEJvdW5kKTtcclxuXHJcbiAgICAgIGlmIChQYXJhbGxheC5fcGFyYWxsYXhlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBQYXJhbGxheC5faGFuZGxlU2Nyb2xsVGhyb3R0bGVkID0gTS50aHJvdHRsZShQYXJhbGxheC5faGFuZGxlU2Nyb2xsLCA1KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgUGFyYWxsYXguX2hhbmRsZVNjcm9sbFRocm90dGxlZCk7XHJcblxyXG4gICAgICAgIFBhcmFsbGF4Ll9oYW5kbGVXaW5kb3dSZXNpemVUaHJvdHRsZWQgPSBNLnRocm90dGxlKFBhcmFsbGF4Ll9oYW5kbGVXaW5kb3dSZXNpemUsIDUpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBQYXJhbGxheC5faGFuZGxlV2luZG93UmVzaXplVGhyb3R0bGVkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZW1vdmVFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICB0aGlzLiRpbWdbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMuX2hhbmRsZUltYWdlTG9hZEJvdW5kKTtcclxuXHJcbiAgICAgIGlmIChQYXJhbGxheC5fcGFyYWxsYXhlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgUGFyYWxsYXguX2hhbmRsZVNjcm9sbFRocm90dGxlZCk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIFBhcmFsbGF4Ll9oYW5kbGVXaW5kb3dSZXNpemVUaHJvdHRsZWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NldHVwU3R5bGVzKCkge1xyXG4gICAgICB0aGlzLiRpbWdbMF0uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUltYWdlTG9hZCgpIHtcclxuICAgICAgdGhpcy5fdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgdGhpcy4kaW1nLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGVsID0gdGhpcztcclxuICAgICAgICBpZiAoZWwuY29tcGxldGUpICQoZWwpLnRyaWdnZXIoXCJsb2FkXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0aGlzLiRlbC5oZWlnaHQoKSA+IDAgPyB0aGlzLmVsLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0IDogNTAwO1xyXG4gICAgICBsZXQgaW1nSGVpZ2h0ID0gdGhpcy4kaW1nWzBdLm9mZnNldEhlaWdodDtcclxuICAgICAgbGV0IHBhcmFsbGF4RGlzdCA9IGltZ0hlaWdodCAtIGNvbnRhaW5lckhlaWdodDtcclxuICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuJGVsLm9mZnNldCgpLnRvcCArIGNvbnRhaW5lckhlaWdodDtcclxuICAgICAgbGV0IHRvcCA9IHRoaXMuJGVsLm9mZnNldCgpLnRvcDtcclxuICAgICAgbGV0IHNjcm9sbFRvcCA9IE0uZ2V0RG9jdW1lbnRTY3JvbGxUb3AoKTtcclxuICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgbGV0IHdpbmRvd0JvdHRvbSA9IHNjcm9sbFRvcCArIHdpbmRvd0hlaWdodDtcclxuICAgICAgbGV0IHBlcmNlbnRTY3JvbGxlZCA9ICh3aW5kb3dCb3R0b20gLSB0b3ApIC8gKGNvbnRhaW5lckhlaWdodCArIHdpbmRvd0hlaWdodCk7XHJcbiAgICAgIGxldCBwYXJhbGxheCA9IHBhcmFsbGF4RGlzdCAqIHBlcmNlbnRTY3JvbGxlZDtcclxuXHJcbiAgICAgIGlmICghdGhpcy5fZW5hYmxlZCkge1xyXG4gICAgICAgIHRoaXMuJGltZ1swXS5zdHlsZS50cmFuc2Zvcm0gPSAnJztcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tID4gc2Nyb2xsVG9wICYmIHRvcCA8IHNjcm9sbFRvcCArIHdpbmRvd0hlaWdodCkge1xyXG4gICAgICAgIHRoaXMuJGltZ1swXS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM0QoLTUwJSwgJHtwYXJhbGxheH1weCwgMClgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIFBhcmFsbGF4XHJcbiAgICovXHJcbiAgUGFyYWxsYXguX3BhcmFsbGF4ZXMgPSBbXTtcclxuXHJcbiAgTS5QYXJhbGxheCA9IFBhcmFsbGF4O1xyXG5cclxuICBpZiAoTS5qUXVlcnlMb2FkZWQpIHtcclxuICAgIE0uaW5pdGlhbGl6ZUpxdWVyeVdyYXBwZXIoUGFyYWxsYXgsICdwYXJhbGxheCcsICdNX1BhcmFsbGF4Jyk7XHJcbiAgfVxyXG5cclxufSkoY2FzaCk7XHJcblxuKGZ1bmN0aW9uICgkLCBhbmltKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBsZXQgX2RlZmF1bHRzID0ge1xyXG4gICAgZHVyYXRpb246IDMwMCxcclxuICAgIG9uU2hvdzogbnVsbCxcclxuICAgIHN3aXBlYWJsZTogZmFsc2UsXHJcbiAgICByZXNwb25zaXZlVGhyZXNob2xkOiBJbmZpbml0eSwgLy8gYnJlYWtwb2ludCBmb3Igc3dpcGVhYmxlXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGNsYXNzXHJcbiAgICpcclxuICAgKi9cclxuICBjbGFzcyBUYWJzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IFRhYnMgaW5zdGFuY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgc3VwZXIoVGFicywgZWwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy5lbC5NX1RhYnMgPSB0aGlzO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIE9wdGlvbnMgZm9yIHRoZSBUYWJzXHJcbiAgICAgICAqIEBtZW1iZXIgVGFicyNvcHRpb25zXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gb25TaG93XHJcbiAgICAgICAqIEBwcm9wIHtCb29sZWFufSBzd2lwZWFibGVcclxuICAgICAgICogQHByb3Age051bWJlcn0gcmVzcG9uc2l2ZVRocmVzaG9sZFxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFRhYnMuZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgLy8gU2V0dXBcclxuICAgICAgdGhpcy4kdGFiTGlua3MgPSB0aGlzLiRlbC5jaGlsZHJlbignbGkudGFiJykuY2hpbGRyZW4oJ2EnKTtcclxuICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgIHRoaXMuX3NldFRhYnNBbmRUYWJXaWR0aCgpO1xyXG4gICAgICB0aGlzLl9zZXR1cEFjdGl2ZVRhYkxpbmsoKTtcclxuICAgICAgdGhpcy5fY3JlYXRlSW5kaWNhdG9yKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnN3aXBlYWJsZSkge1xyXG4gICAgICAgIHRoaXMuX3NldHVwU3dpcGVhYmxlVGFicygpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9zZXR1cE5vcm1hbFRhYnMoKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHRoaXMuX3NldHVwRXZlbnRIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XHJcbiAgICAgIHJldHVybiBfZGVmYXVsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluaXQoZWxzLCBvcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5pbml0KHRoaXMsIGVscywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgSW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKGVsKSB7XHJcbiAgICAgIGxldCBkb21FbGVtID0gISFlbC5qcXVlcnkgPyBlbFswXSA6IGVsO1xyXG4gICAgICByZXR1cm4gZG9tRWxlbS5NX1RhYnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWFyZG93biBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICB0aGlzLl9pbmRpY2F0b3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9pbmRpY2F0b3IpO1xyXG5cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zd2lwZWFibGUpIHtcclxuICAgICAgICB0aGlzLl90ZWFyZG93blN3aXBlYWJsZVRhYnMoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl90ZWFyZG93bk5vcm1hbFRhYnMoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kZWxbMF0uTV9UYWJzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgRXZlbnQgSGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgX3NldHVwRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgdGhpcy5faGFuZGxlV2luZG93UmVzaXplQm91bmQgPSB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVdpbmRvd1Jlc2l6ZUJvdW5kKTtcclxuXHJcbiAgICAgIHRoaXMuX2hhbmRsZVRhYkNsaWNrQm91bmQgPSB0aGlzLl9oYW5kbGVUYWJDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlVGFiQ2xpY2tCb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgRXZlbnQgSGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgX3JlbW92ZUV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemVCb3VuZCk7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVUYWJDbGlja0JvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSB3aW5kb3cgUmVzaXplXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVXaW5kb3dSZXNpemUoKSB7XHJcbiAgICAgIHRoaXMuX3NldFRhYnNBbmRUYWJXaWR0aCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMudGFiV2lkdGggIT09IDAgJiYgdGhpcy50YWJzV2lkdGggIT09IDApIHtcclxuICAgICAgICB0aGlzLl9pbmRpY2F0b3Iuc3R5bGUubGVmdCA9IHRoaXMuX2NhbGNMZWZ0UG9zKHRoaXMuJGFjdGl2ZVRhYkxpbmspICsgJ3B4JztcclxuICAgICAgICB0aGlzLl9pbmRpY2F0b3Iuc3R5bGUucmlnaHQgPSB0aGlzLl9jYWxjUmlnaHRQb3ModGhpcy4kYWN0aXZlVGFiTGluaykgKyAncHgnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgdGFiIGNsaWNrXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVUYWJDbGljayhlKSB7XHJcbiAgICAgIGxldCB0YWIgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCdsaS50YWInKTtcclxuICAgICAgbGV0IHRhYkxpbmsgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCdhJyk7XHJcblxyXG4gICAgICAvLyBIYW5kbGUgY2xpY2sgb24gdGFiIGxpbmsgb25seVxyXG4gICAgICBpZiAoIXRhYkxpbmsubGVuZ3RoIHx8ICF0YWJMaW5rLnBhcmVudCgpLmhhc0NsYXNzKCd0YWInKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRhYi5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFjdCBhcyByZWd1bGFyIGxpbmsgaWYgdGFyZ2V0IGF0dHJpYnV0ZSBpcyBzcGVjaWZpZWQuXHJcbiAgICAgIGlmICghIXRhYkxpbmsuYXR0cihcInRhcmdldFwiKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fc2V0VGFic0FuZFRhYldpZHRoKCk7XHJcblxyXG4gICAgICAvLyBNYWtlIHRoZSBvbGQgdGFiIGluYWN0aXZlLlxyXG4gICAgICB0aGlzLiRhY3RpdmVUYWJMaW5rLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgbGV0ICRvbGRDb250ZW50ID0gdGhpcy4kY29udGVudDtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSB0aGUgdmFyaWFibGVzIHdpdGggdGhlIG5ldyBsaW5rIGFuZCBjb250ZW50XHJcbiAgICAgIHRoaXMuJGFjdGl2ZVRhYkxpbmsgPSB0YWJMaW5rO1xyXG4gICAgICB0aGlzLiRjb250ZW50ID0gJChNLmVzY2FwZUhhc2godGFiTGlua1swXS5oYXNoKSk7XHJcbiAgICAgIHRoaXMuJHRhYkxpbmtzID0gdGhpcy4kZWwuY2hpbGRyZW4oJ2xpLnRhYicpLmNoaWxkcmVuKCdhJyk7XHJcblxyXG4gICAgICAvLyBNYWtlIHRoZSB0YWIgYWN0aXZlLlxyXG4gICAgICB0aGlzLiRhY3RpdmVUYWJMaW5rLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgbGV0IHByZXZJbmRleCA9IHRoaXMuaW5kZXg7XHJcbiAgICAgIHRoaXMuaW5kZXggPSBNYXRoLm1heCh0aGlzLiR0YWJMaW5rcy5pbmRleCh0YWJMaW5rKSwgMCk7XHJcblxyXG4gICAgICAvLyBTd2FwIGNvbnRlbnRcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zd2lwZWFibGUpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGFic0Nhcm91c2VsKSB7XHJcbiAgICAgICAgICB0aGlzLl90YWJzQ2Fyb3VzZWwuc2V0KHRoaXMuaW5kZXgsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25TaG93KSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uU2hvdy5jYWxsKHRoaXMsIHRoaXMuJGNvbnRlbnRbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuJGNvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLiRjb250ZW50WzBdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vblNob3cpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vblNob3cuY2FsbCh0aGlzLCB0aGlzLiRjb250ZW50WzBdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoJG9sZENvbnRlbnQubGVuZ3RoICYmXHJcbiAgICAgICAgICAgICAgISRvbGRDb250ZW50LmlzKHRoaXMuJGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICRvbGRDb250ZW50WzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICRvbGRDb250ZW50LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFVwZGF0ZSBpbmRpY2F0b3JcclxuICAgICAgdGhpcy5fYW5pbWF0ZUluZGljYXRvcihwcmV2SW5kZXgpO1xyXG5cclxuICAgICAgLy8gUHJldmVudCB0aGUgYW5jaG9yJ3MgZGVmYXVsdCBjbGljayBhY3Rpb25cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGVsZW1lbnRzIGZvciB0YWIgaW5kaWNhdG9yLlxyXG4gICAgICovXHJcbiAgICBfY3JlYXRlSW5kaWNhdG9yKCkge1xyXG4gICAgICBsZXQgaW5kaWNhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgaW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoJ2luZGljYXRvcicpO1xyXG5cclxuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChpbmRpY2F0b3IpO1xyXG4gICAgICB0aGlzLl9pbmRpY2F0b3IgPSBpbmRpY2F0b3I7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLl9pbmRpY2F0b3Iuc3R5bGUubGVmdCA9IHRoaXMuX2NhbGNMZWZ0UG9zKHRoaXMuJGFjdGl2ZVRhYkxpbmspICsgJ3B4JztcclxuICAgICAgICB0aGlzLl9pbmRpY2F0b3Iuc3R5bGUucmlnaHQgPSB0aGlzLl9jYWxjUmlnaHRQb3ModGhpcy4kYWN0aXZlVGFiTGluaykgKyAncHgnO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIGZpcnN0IGFjdGl2ZSB0YWIgbGluay5cclxuICAgICAqL1xyXG4gICAgX3NldHVwQWN0aXZlVGFiTGluaygpIHtcclxuICAgICAgLy8gSWYgdGhlIGxvY2F0aW9uLmhhc2ggbWF0Y2hlcyBvbmUgb2YgdGhlIGxpbmtzLCB1c2UgdGhhdCBhcyB0aGUgYWN0aXZlIHRhYi5cclxuICAgICAgdGhpcy4kYWN0aXZlVGFiTGluayA9ICQodGhpcy4kdGFiTGlua3MuZmlsdGVyKCdbaHJlZj1cIicrbG9jYXRpb24uaGFzaCsnXCJdJykpO1xyXG5cclxuICAgICAgLy8gSWYgbm8gbWF0Y2ggaXMgZm91bmQsIHVzZSB0aGUgZmlyc3QgbGluayBvciBhbnkgd2l0aCBjbGFzcyAnYWN0aXZlJyBhcyB0aGUgaW5pdGlhbCBhY3RpdmUgdGFiLlxyXG4gICAgICBpZiAodGhpcy4kYWN0aXZlVGFiTGluay5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLiRhY3RpdmVUYWJMaW5rID0gdGhpcy4kZWwuY2hpbGRyZW4oJ2xpLnRhYicpLmNoaWxkcmVuKCdhLmFjdGl2ZScpLmZpcnN0KCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuJGFjdGl2ZVRhYkxpbmsubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlVGFiTGluayA9IHRoaXMuJGVsLmNoaWxkcmVuKCdsaS50YWInKS5jaGlsZHJlbignYScpLmZpcnN0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuJHRhYkxpbmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgdGhpcy4kYWN0aXZlVGFiTGlua1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgIHRoaXMuaW5kZXggPSBNYXRoLm1heCh0aGlzLiR0YWJMaW5rcy5pbmRleCh0aGlzLiRhY3RpdmVUYWJMaW5rKSwgMCk7XHJcblxyXG4gICAgICBpZiAodGhpcy4kYWN0aXZlVGFiTGluay5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLiRjb250ZW50ID0gJChNLmVzY2FwZUhhc2godGhpcy4kYWN0aXZlVGFiTGlua1swXS5oYXNoKSk7XHJcbiAgICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHN3aXBlYWJsZSB0YWJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cFN3aXBlYWJsZVRhYnMoKSB7XHJcbiAgICAgIC8vIENoYW5nZSBzd2lwZWFibGUgYWNjb3JkaW5nIHRvIHJlc3BvbnNpdmUgdGhyZXNob2xkXHJcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IHRoaXMub3B0aW9ucy5yZXNwb25zaXZlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnN3aXBlYWJsZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgJHRhYnNDb250ZW50ID0gJCgpO1xyXG4gICAgICB0aGlzLiR0YWJMaW5rcy5lYWNoKChsaW5rKSA9PiB7XHJcbiAgICAgICAgbGV0ICRjdXJyQ29udGVudCA9ICQoTS5lc2NhcGVIYXNoKGxpbmsuaGFzaCkpO1xyXG4gICAgICAgICRjdXJyQ29udGVudC5hZGRDbGFzcygnY2Fyb3VzZWwtaXRlbScpO1xyXG4gICAgICAgICR0YWJzQ29udGVudCA9ICR0YWJzQ29udGVudC5hZGQoJGN1cnJDb250ZW50KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsZXQgJHRhYnNXcmFwcGVyID0gJCgnPGRpdiBjbGFzcz1cInRhYnMtY29udGVudCBjYXJvdXNlbCBjYXJvdXNlbC1zbGlkZXJcIj48L2Rpdj4nKTtcclxuICAgICAgJHRhYnNDb250ZW50LmZpcnN0KCkuYmVmb3JlKCR0YWJzV3JhcHBlcik7XHJcbiAgICAgICR0YWJzV3JhcHBlci5hcHBlbmQoJHRhYnNDb250ZW50KTtcclxuICAgICAgJHRhYnNDb250ZW50WzBdLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHJcbiAgICAgIHRoaXMuX3RhYnNDYXJvdXNlbCA9IE0uQ2Fyb3VzZWwuaW5pdCgkdGFic1dyYXBwZXJbMF0sIHtcclxuICAgICAgICBmdWxsV2lkdGg6IHRydWUsXHJcbiAgICAgICAgbm9XcmFwOiB0cnVlLFxyXG4gICAgICAgIG9uQ3ljbGVUbzogKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGxldCBwcmV2SW5kZXggPSB0aGlzLmluZGV4O1xyXG4gICAgICAgICAgdGhpcy5pbmRleCA9ICQoaXRlbSkuaW5kZXgoKTtcclxuICAgICAgICAgIHRoaXMuJGFjdGl2ZVRhYkxpbmsucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy4kYWN0aXZlVGFiTGluayA9IHRoaXMuJHRhYkxpbmtzLmVxKHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgdGhpcy4kYWN0aXZlVGFiTGluay5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLl9hbmltYXRlSW5kaWNhdG9yKHByZXZJbmRleCk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vblNob3cpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uU2hvdy5jYWxsKHRoaXMsIHRoaXMuJGNvbnRlbnRbMF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVhcmRvd24gbm9ybWFsIHRhYnMuXHJcbiAgICAgKi9cclxuICAgIF90ZWFyZG93blN3aXBlYWJsZVRhYnMoKSB7XHJcbiAgICAgIGxldCAkdGFic1dyYXBwZXIgPSB0aGlzLl90YWJzQ2Fyb3VzZWwuJGVsO1xyXG4gICAgICB0aGlzLl90YWJzQ2Fyb3VzZWwuZGVzdHJveSgpO1xyXG5cclxuICAgICAgLy8gVW53cmFwXHJcbiAgICAgICR0YWJzV3JhcHBlci5hZnRlcigkdGFic1dyYXBwZXIuY2hpbGRyZW4oKSk7XHJcbiAgICAgICR0YWJzV3JhcHBlci5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIG5vcm1hbCB0YWJzLlxyXG4gICAgICovXHJcbiAgICBfc2V0dXBOb3JtYWxUYWJzKCkge1xyXG4gICAgICAvLyBIaWRlIFRhYnMgQ29udGVudFxyXG4gICAgICB0aGlzLiR0YWJMaW5rcy5ub3QodGhpcy4kYWN0aXZlVGFiTGluaykuZWFjaCgobGluaykgPT4ge1xyXG4gICAgICAgIGlmICghIWxpbmsuaGFzaCkge1xyXG4gICAgICAgICAgbGV0ICRjdXJyQ29udGVudCA9ICQoTS5lc2NhcGVIYXNoKGxpbmsuaGFzaCkpO1xyXG4gICAgICAgICAgaWYgKCRjdXJyQ29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJGN1cnJDb250ZW50WzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlYXJkb3duIG5vcm1hbCB0YWJzLlxyXG4gICAgICovXHJcbiAgICBfdGVhcmRvd25Ob3JtYWxUYWJzKCkge1xyXG4gICAgICAvLyBzaG93IFRhYnMgQ29udGVudFxyXG4gICAgICB0aGlzLiR0YWJMaW5rcy5lYWNoKChsaW5rKSA9PiB7XHJcbiAgICAgICAgaWYgKCEhbGluay5oYXNoKSB7XHJcbiAgICAgICAgICBsZXQgJGN1cnJDb250ZW50ID0gJChNLmVzY2FwZUhhc2gobGluay5oYXNoKSk7XHJcbiAgICAgICAgICBpZiAoJGN1cnJDb250ZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkY3VyckNvbnRlbnRbMF0uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGFicyBhbmQgdGFiIHdpZHRoXHJcbiAgICAgKi9cclxuICAgIF9zZXRUYWJzQW5kVGFiV2lkdGgoKSB7XHJcbiAgICAgIHRoaXMudGFic1dpZHRoID0gdGhpcy4kZWwud2lkdGgoKTtcclxuICAgICAgdGhpcy50YWJXaWR0aCA9IE1hdGgubWF4KHRoaXMudGFic1dpZHRoLCB0aGlzLmVsLnNjcm9sbFdpZHRoKSAvIHRoaXMuJHRhYkxpbmtzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHJpZ2h0IGF0dHJpYnV0ZSBmb3IgaW5kaWNhdG9yIGJhc2VkIG9uIGFjdGl2ZSB0YWIuXHJcbiAgICAgKiBAcGFyYW0ge2Nhc2h9IGVsXHJcbiAgICAgKi9cclxuICAgIF9jYWxjUmlnaHRQb3MoZWwpIHtcclxuICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRhYnNXaWR0aCAtIGVsLnBvc2l0aW9uKCkubGVmdCAtIGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGxlZnQgYXR0cmlidXRlIGZvciBpbmRpY2F0b3IgYmFzZWQgb24gYWN0aXZlIHRhYi5cclxuICAgICAqIEBwYXJhbSB7Y2FzaH0gZWxcclxuICAgICAqL1xyXG4gICAgX2NhbGNMZWZ0UG9zKGVsKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGVsLnBvc2l0aW9uKCkubGVmdCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGFiSW5kaWNhdG9yKCkge1xyXG4gICAgICB0aGlzLl9hbmltYXRlSW5kaWNhdG9yKHRoaXMuaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW5pbWF0ZXMgSW5kaWNhdG9yIHRvIGFjdGl2ZSB0YWIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcHJldkluZGV4XHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlSW5kaWNhdG9yKHByZXZJbmRleCkge1xyXG4gICAgICBsZXQgbGVmdERlbGF5ID0gMCxcclxuICAgICAgICAgIHJpZ2h0RGVsYXkgPSAwO1xyXG5cclxuICAgICAgaWYgKCh0aGlzLmluZGV4IC0gcHJldkluZGV4KSA+PSAwKSB7XHJcbiAgICAgICAgbGVmdERlbGF5ID0gOTA7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJpZ2h0RGVsYXkgPSA5MDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQW5pbWF0ZVxyXG4gICAgICBsZXQgYW5pbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy5faW5kaWNhdG9yLFxyXG4gICAgICAgIGxlZnQ6IHtcclxuICAgICAgICAgIHZhbHVlOiB0aGlzLl9jYWxjTGVmdFBvcyh0aGlzLiRhY3RpdmVUYWJMaW5rKSxcclxuICAgICAgICAgIGRlbGF5OiBsZWZ0RGVsYXlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJpZ2h0OiB7XHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy5fY2FsY1JpZ2h0UG9zKHRoaXMuJGFjdGl2ZVRhYkxpbmspLFxyXG4gICAgICAgICAgZGVsYXk6IHJpZ2h0RGVsYXlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnXHJcbiAgICAgIH07XHJcbiAgICAgIGFuaW0ucmVtb3ZlKHRoaXMuX2luZGljYXRvcik7XHJcbiAgICAgIGFuaW0oYW5pbU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRhYi5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0YWJJZFxyXG4gICAgICovXHJcbiAgICBzZWxlY3QodGFiSWQpIHtcclxuICAgICAgbGV0IHRhYiA9IHRoaXMuJHRhYkxpbmtzLmZpbHRlcignW2hyZWY9XCIjJyArIHRhYklkICsgJ1wiXScpO1xyXG4gICAgICBpZiAodGFiLmxlbmd0aCkge1xyXG4gICAgICAgIHRhYi50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgd2luZG93Lk0uVGFicyA9IFRhYnM7XHJcblxyXG4gIGlmIChNLmpRdWVyeUxvYWRlZCkge1xyXG4gICAgTS5pbml0aWFsaXplSnF1ZXJ5V3JhcHBlcihUYWJzLCAndGFicycsICdNX1RhYnMnKTtcclxuICB9XHJcblxyXG59KShjYXNoLCBNLmFuaW1lKTtcclxuXG4oZnVuY3Rpb24gKCQsIGFuaW0pIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGxldCBfZGVmYXVsdHMgPSB7XHJcbiAgICBleGl0RGVsYXk6IDIwMCxcclxuICAgIGVudGVyRGVsYXk6IDAsXHJcbiAgICBodG1sOiBudWxsLFxyXG4gICAgbWFyZ2luOiA1LFxyXG4gICAgaW5EdXJhdGlvbjogMjUwLFxyXG4gICAgb3V0RHVyYXRpb246IDIwMCxcclxuICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcclxuICAgIHRyYW5zaXRpb25Nb3ZlbWVudDogMTBcclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQGNsYXNzXHJcbiAgICpcclxuICAgKi9cclxuICBjbGFzcyBUb29sdGlwIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IFRvb2x0aXAgaW5zdGFuY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgc3VwZXIoVG9vbHRpcCwgZWwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy5lbC5NX1Rvb2x0aXAgPSB0aGlzO1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgVG9vbHRpcC5kZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmlzSG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9hcHBlbmRUb29sdGlwRWwoKTtcclxuICAgICAgdGhpcy5fc2V0dXBFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fVG9vbHRpcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlYXJkb3duIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAkKHRoaXMudG9vbHRpcEVsKS5yZW1vdmUoKTtcclxuICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICB0aGlzLiRlbFswXS5NX1Rvb2x0aXAgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX2FwcGVuZFRvb2x0aXBFbCgpIHtcclxuICAgICAgbGV0IHRvb2x0aXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtdG9vbHRpcCcpO1xyXG4gICAgICB0aGlzLnRvb2x0aXBFbCA9IHRvb2x0aXBFbDtcclxuXHJcbiAgICAgIGxldCB0b29sdGlwQ29udGVudEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRvb2x0aXBDb250ZW50RWwuY2xhc3NMaXN0LmFkZCgndG9vbHRpcC1jb250ZW50Jyk7XHJcbiAgICAgIHRvb2x0aXBDb250ZW50RWwuaW5uZXJIVE1MID0gdGhpcy5vcHRpb25zLmh0bWw7XHJcbiAgICAgIHRvb2x0aXBFbC5hcHBlbmRDaGlsZCh0b29sdGlwQ29udGVudEVsKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwRWwpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVUb29sdGlwQ29udGVudCgpIHtcclxuICAgICAgdGhpcy50b29sdGlwRWwucXVlcnlTZWxlY3RvcignLnRvb2x0aXAtY29udGVudCcpLmlubmVySFRNTCA9IHRoaXMub3B0aW9ucy5odG1sO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuaGFuZGxlTW91c2VFbnRlckJvdW5kID0gdGhpcy5faGFuZGxlTW91c2VFbnRlci5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLmhhbmRsZU1vdXNlTGVhdmVCb3VuZCA9IHRoaXMuX2hhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy4kZWxbMF0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuaGFuZGxlTW91c2VFbnRlckJvdW5kKTtcclxuICAgICAgdGhpcy4kZWxbMF0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZUJvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgdGhpcy4kZWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuaGFuZGxlTW91c2VFbnRlckJvdW5kKTtcclxuICAgICAgdGhpcy4kZWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZUJvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKCkge1xyXG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgLy8gVXBkYXRlIHRvb2x0aXAgY29udGVudCB3aXRoIEhUTUwgYXR0cmlidXRlIG9wdGlvbnNcclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgdGhpcy5fZ2V0QXR0cmlidXRlT3B0aW9ucygpKTtcclxuICAgICAgdGhpcy5fdXBkYXRlVG9vbHRpcENvbnRlbnQoKTtcclxuICAgICAgdGhpcy5fc2V0RW50ZXJEZWxheVRpbWVvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5fc2V0RXhpdERlbGF5VGltZW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRpbWVvdXQgd2hpY2ggZGVsYXlzIHdoZW4gdGhlIHRvb2x0aXAgY2xvc2VzXHJcbiAgICAgKi9cclxuICAgIF9zZXRFeGl0RGVsYXlUaW1lb3V0KCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZXhpdERlbGF5VGltZW91dCk7XHJcblxyXG4gICAgICB0aGlzLl9leGl0RGVsYXlUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIb3ZlcmVkKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hbmltYXRlT3V0KCk7XHJcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5leGl0RGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRpbWVvdXQgd2hpY2ggZGVsYXlzIHdoZW4gdGhlIHRvYXN0IGNsb3Nlc1xyXG4gICAgICovXHJcbiAgICBfc2V0RW50ZXJEZWxheVRpbWVvdXQoKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9lbnRlckRlbGF5VGltZW91dCk7XHJcblxyXG4gICAgICB0aGlzLl9lbnRlckRlbGF5VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hvdmVyZWQpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FuaW1hdGVJbigpO1xyXG4gICAgICB9LCB0aGlzLm9wdGlvbnMuZW50ZXJEZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Bvc2l0aW9uVG9vbHRpcCgpIHtcclxuICAgICAgbGV0IG9yaWdpbiA9IHRoaXMuJGVsWzBdLFxyXG4gICAgICAgIHRvb2x0aXAgPSB0aGlzLnRvb2x0aXBFbCxcclxuICAgICAgICBvcmlnaW5IZWlnaHQgPSBvcmlnaW4ub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAgIG9yaWdpbldpZHRoID0gb3JpZ2luLm9mZnNldFdpZHRoLFxyXG4gICAgICAgIHRvb2x0aXBIZWlnaHQgPSB0b29sdGlwLm9mZnNldEhlaWdodCxcclxuICAgICAgICB0b29sdGlwV2lkdGggPSB0b29sdGlwLm9mZnNldFdpZHRoLFxyXG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzLFxyXG4gICAgICAgIG1hcmdpbiA9IHRoaXMub3B0aW9ucy5tYXJnaW4sXHJcbiAgICAgICAgdGFyZ2V0VG9wLFxyXG4gICAgICAgIHRhcmdldExlZnQ7XHJcblxyXG4gICAgICB0aGlzLnhNb3ZlbWVudCA9IDAsXHJcbiAgICAgICAgdGhpcy55TW92ZW1lbnQgPSAwO1xyXG5cclxuICAgICAgdGFyZ2V0VG9wID0gb3JpZ2luLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIE0uZ2V0RG9jdW1lbnRTY3JvbGxUb3AoKTtcclxuICAgICAgdGFyZ2V0TGVmdCA9IG9yaWdpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgTS5nZXREb2N1bWVudFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucG9zaXRpb24gPT09ICd0b3AnKSB7XHJcbiAgICAgICAgdGFyZ2V0VG9wICs9IC0odG9vbHRpcEhlaWdodCkgLSBtYXJnaW47XHJcbiAgICAgICAgdGFyZ2V0TGVmdCArPSBvcmlnaW5XaWR0aCAvIDIgLSB0b29sdGlwV2lkdGggLyAyO1xyXG4gICAgICAgIHRoaXMueU1vdmVtZW50ID0gLSh0aGlzLm9wdGlvbnMudHJhbnNpdGlvbk1vdmVtZW50KTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnBvc2l0aW9uID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgdGFyZ2V0VG9wICs9IG9yaWdpbkhlaWdodCAvIDIgLSB0b29sdGlwSGVpZ2h0IC8gMjtcclxuICAgICAgICB0YXJnZXRMZWZ0ICs9IG9yaWdpbldpZHRoICsgbWFyZ2luO1xyXG4gICAgICAgIHRoaXMueE1vdmVtZW50ID0gdGhpcy5vcHRpb25zLnRyYW5zaXRpb25Nb3ZlbWVudDtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnBvc2l0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICB0YXJnZXRUb3AgKz0gb3JpZ2luSGVpZ2h0IC8gMiAtIHRvb2x0aXBIZWlnaHQgLyAyO1xyXG4gICAgICAgIHRhcmdldExlZnQgKz0gLSh0b29sdGlwV2lkdGgpIC0gbWFyZ2luO1xyXG4gICAgICAgIHRoaXMueE1vdmVtZW50ID0gLSh0aGlzLm9wdGlvbnMudHJhbnNpdGlvbk1vdmVtZW50KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFyZ2V0VG9wICs9IG9yaWdpbkhlaWdodCArIG1hcmdpbjtcclxuICAgICAgICB0YXJnZXRMZWZ0ICs9IG9yaWdpbldpZHRoIC8gMiAtIHRvb2x0aXBXaWR0aCAvIDI7XHJcbiAgICAgICAgdGhpcy55TW92ZW1lbnQgPSB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbk1vdmVtZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBuZXdDb29yZGluYXRlcyA9IHRoaXMuX3JlcG9zaXRpb25XaXRoaW5TY3JlZW4oXHJcbiAgICAgICAgdGFyZ2V0TGVmdCwgdGFyZ2V0VG9wLCB0b29sdGlwV2lkdGgsIHRvb2x0aXBIZWlnaHQpO1xyXG4gICAgICAkKHRvb2x0aXApLmNzcyh7XHJcbiAgICAgICAgdG9wOiBuZXdDb29yZGluYXRlcy55ICsgJ3B4JyxcclxuICAgICAgICBsZWZ0OiBuZXdDb29yZGluYXRlcy54ICsgJ3B4J1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVwb3NpdGlvbldpdGhpblNjcmVlbih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIGxldCBzY3JvbGxMZWZ0ID0gTS5nZXREb2N1bWVudFNjcm9sbExlZnQoKTtcclxuICAgICAgbGV0IHNjcm9sbFRvcCA9IE0uZ2V0RG9jdW1lbnRTY3JvbGxUb3AoKTtcclxuICAgICAgbGV0IG5ld1ggPSB4IC0gc2Nyb2xsTGVmdDtcclxuICAgICAgbGV0IG5ld1kgPSB5IC0gc2Nyb2xsVG9wO1xyXG5cclxuICAgICAgbGV0IGJvdW5kaW5nID0ge1xyXG4gICAgICAgIGxlZnQ6IG5ld1gsXHJcbiAgICAgICAgdG9wOiBuZXdZLFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IG9mZnNldCA9IHRoaXMub3B0aW9ucy5tYXJnaW4gKyB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbk1vdmVtZW50O1xyXG4gICAgICBsZXQgZWRnZXMgPSBNLmNoZWNrV2l0aGluQ29udGFpbmVyKGRvY3VtZW50LmJvZHksIGJvdW5kaW5nLCBvZmZzZXQpO1xyXG5cclxuICAgICAgaWYgKGVkZ2VzLmxlZnQpIHtcclxuICAgICAgICBuZXdYID0gb2Zmc2V0O1xyXG4gICAgICB9IGVsc2UgaWYgKGVkZ2VzLnJpZ2h0KSB7XHJcbiAgICAgICAgbmV3WCAtPSBuZXdYICsgd2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVkZ2VzLnRvcCkge1xyXG4gICAgICAgIG5ld1kgPSBvZmZzZXQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoZWRnZXMuYm90dG9tKSB7XHJcbiAgICAgICAgbmV3WSAtPSBuZXdZICsgaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IG5ld1ggKyBzY3JvbGxMZWZ0LFxyXG4gICAgICAgIHk6IG5ld1kgKyBzY3JvbGxUb3BcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBfYW5pbWF0ZUluKCkge1xyXG4gICAgICB0aGlzLl9wb3NpdGlvblRvb2x0aXAoKTtcclxuICAgICAgdGhpcy50b29sdGlwRWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgYW5pbS5yZW1vdmUodGhpcy50b29sdGlwRWwpO1xyXG4gICAgICBhbmltKHtcclxuICAgICAgICB0YXJnZXRzOiB0aGlzLnRvb2x0aXBFbCxcclxuICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IHRoaXMueE1vdmVtZW50LFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IHRoaXMueU1vdmVtZW50LFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuaW5EdXJhdGlvbixcclxuICAgICAgICBlYXNpbmc6ICdlYXNlT3V0Q3ViaWMnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9hbmltYXRlT3V0KCkge1xyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLnRvb2x0aXBFbCk7XHJcbiAgICAgIGFuaW0oe1xyXG4gICAgICAgIHRhcmdldHM6IHRoaXMudG9vbHRpcEVsLFxyXG4gICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgdHJhbnNsYXRlWDogMCxcclxuICAgICAgICB0cmFuc2xhdGVZOiAwLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMub3V0RHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dEN1YmljJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlTW91c2VFbnRlcigpIHtcclxuICAgICAgdGhpcy5pc0hvdmVyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlTW91c2VMZWF2ZSgpIHtcclxuICAgICAgdGhpcy5pc0hvdmVyZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRBdHRyaWJ1dGVPcHRpb25zKCkge1xyXG4gICAgICBsZXQgYXR0cmlidXRlT3B0aW9ucyA9IHt9O1xyXG4gICAgICBsZXQgdG9vbHRpcFRleHRPcHRpb24gPSB0aGlzLiRlbFswXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICBsZXQgcG9zaXRpb25PcHRpb24gPSB0aGlzLiRlbFswXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zaXRpb24nKTtcclxuXHJcbiAgICAgIGlmICh0b29sdGlwVGV4dE9wdGlvbikge1xyXG4gICAgICAgIGF0dHJpYnV0ZU9wdGlvbnMuaHRtbCA9IHRvb2x0aXBUZXh0T3B0aW9uO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocG9zaXRpb25PcHRpb24pIHtcclxuICAgICAgICBhdHRyaWJ1dGVPcHRpb25zLnBvc2l0aW9uID0gcG9zaXRpb25PcHRpb247XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGF0dHJpYnV0ZU9wdGlvbnM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBNLlRvb2x0aXAgPSBUb29sdGlwO1xyXG5cclxuICBpZiAoTS5qUXVlcnlMb2FkZWQpIHtcclxuICAgIE0uaW5pdGlhbGl6ZUpxdWVyeVdyYXBwZXIoVG9vbHRpcCwgJ3Rvb2x0aXAnLCAnTV9Ub29sdGlwJyk7XHJcbiAgfVxyXG5cclxufSkoY2FzaCwgTS5hbmltZSk7XHJcblxuLyohXHJcbiAqIFdhdmVzIHYwLjYuNFxyXG4gKiBodHRwOi8vZmlhbi5teS5pZC9XYXZlc1xyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxNCBBbGZpYW5hIEUuIFNpYnVlYSBhbmQgb3RoZXIgY29udHJpYnV0b3JzXHJcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmlhbnMvV2F2ZXMvYmxvYi9tYXN0ZXIvTElDRU5TRVxyXG4gKi9cclxuXHJcbjsoZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIFdhdmVzID0gV2F2ZXMgfHwge307XHJcbiAgICB2YXIgJCQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpO1xyXG5cclxuICAgIC8vIEZpbmQgZXhhY3QgcG9zaXRpb24gb2YgZWxlbWVudFxyXG4gICAgZnVuY3Rpb24gaXNXaW5kb3cob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0V2luZG93KGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gaXNXaW5kb3coZWxlbSkgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9mZnNldChlbGVtKSB7XHJcbiAgICAgICAgdmFyIGRvY0VsZW0sIHdpbixcclxuICAgICAgICAgICAgYm94ID0ge3RvcDogMCwgbGVmdDogMH0sXHJcbiAgICAgICAgICAgIGRvYyA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xyXG5cclxuICAgICAgICBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAhPT0gdHlwZW9mIHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW4gPSBnZXRXaW5kb3coZG9jKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IGJveC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbGVtLmNsaWVudFRvcCxcclxuICAgICAgICAgICAgbGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnZlcnRTdHlsZShvYmopIHtcclxuICAgICAgICB2YXIgc3R5bGUgPSAnJztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgYSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhKSkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgKz0gKGEgKyAnOicgKyBvYmpbYV0gKyAnOycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIEVmZmVjdCA9IHtcclxuXHJcbiAgICAgICAgLy8gRWZmZWN0IGRlbGF5XHJcbiAgICAgICAgZHVyYXRpb246IDc1MCxcclxuXHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oZSwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWJsZSByaWdodCBjbGlja1xyXG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGVsID0gZWxlbWVudCB8fCB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHJpcHBsZVxyXG4gICAgICAgICAgICB2YXIgcmlwcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHJpcHBsZS5jbGFzc05hbWUgPSAnd2F2ZXMtcmlwcGxlJztcclxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQocmlwcGxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBjbGljayBjb29yZGluYXRlIGFuZCBlbGVtZW50IHdpdGRoXHJcbiAgICAgICAgICAgIHZhciBwb3MgICAgICAgICA9IG9mZnNldChlbCk7XHJcbiAgICAgICAgICAgIHZhciByZWxhdGl2ZVkgICA9IChlLnBhZ2VZIC0gcG9zLnRvcCk7XHJcbiAgICAgICAgICAgIHZhciByZWxhdGl2ZVggICA9IChlLnBhZ2VYIC0gcG9zLmxlZnQpO1xyXG4gICAgICAgICAgICB2YXIgc2NhbGUgICAgICAgPSAnc2NhbGUoJysoKGVsLmNsaWVudFdpZHRoIC8gMTAwKSAqIDEwKSsnKSc7XHJcblxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0IGZvciB0b3VjaCBkZXZpY2VzXHJcbiAgICAgICAgICAgIGlmICgndG91Y2hlcycgaW4gZSkge1xyXG4gICAgICAgICAgICAgIHJlbGF0aXZlWSAgID0gKGUudG91Y2hlc1swXS5wYWdlWSAtIHBvcy50b3ApO1xyXG4gICAgICAgICAgICAgIHJlbGF0aXZlWCAgID0gKGUudG91Y2hlc1swXS5wYWdlWCAtIHBvcy5sZWZ0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIGRhdGEgdG8gZWxlbWVudFxyXG4gICAgICAgICAgICByaXBwbGUuc2V0QXR0cmlidXRlKCdkYXRhLWhvbGQnLCBEYXRlLm5vdygpKTtcclxuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnZGF0YS1zY2FsZScsIHNjYWxlKTtcclxuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgcmVsYXRpdmVYKTtcclxuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgcmVsYXRpdmVZKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCByaXBwbGUgcG9zaXRpb25cclxuICAgICAgICAgICAgdmFyIHJpcHBsZVN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IHJlbGF0aXZlWSsncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2xlZnQnOiByZWxhdGl2ZVgrJ3B4J1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmlwcGxlLmNsYXNzTmFtZSA9IHJpcHBsZS5jbGFzc05hbWUgKyAnIHdhdmVzLW5vdHJhbnNpdGlvbic7XHJcbiAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgY29udmVydFN0eWxlKHJpcHBsZVN0eWxlKSk7XHJcbiAgICAgICAgICAgIHJpcHBsZS5jbGFzc05hbWUgPSByaXBwbGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3dhdmVzLW5vdHJhbnNpdGlvbicsICcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNjYWxlIHRoZSByaXBwbGVcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtJ10gPSBzY2FsZTtcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy1tb3otdHJhbnNmb3JtJ10gPSBzY2FsZTtcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy1tcy10cmFuc2Zvcm0nXSA9IHNjYWxlO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW8tdHJhbnNmb3JtJ10gPSBzY2FsZTtcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGUudHJhbnNmb3JtID0gc2NhbGU7XHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlLm9wYWNpdHkgICA9ICcxJztcclxuXHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyctd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb24nXSA9IEVmZmVjdC5kdXJhdGlvbiArICdtcyc7XHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyctbW96LXRyYW5zaXRpb24tZHVyYXRpb24nXSAgICA9IEVmZmVjdC5kdXJhdGlvbiArICdtcyc7XHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyctby10cmFuc2l0aW9uLWR1cmF0aW9uJ10gICAgICA9IEVmZmVjdC5kdXJhdGlvbiArICdtcyc7XHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyd0cmFuc2l0aW9uLWR1cmF0aW9uJ10gICAgICAgICA9IEVmZmVjdC5kdXJhdGlvbiArICdtcyc7XHJcblxyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbiddID0gJ2N1YmljLWJlemllcigwLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MCknO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW1vei10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbiddICAgID0gJ2N1YmljLWJlemllcigwLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MCknO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW8tdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nXSAgICAgID0gJ2N1YmljLWJlemllcigwLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MCknO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nXSAgICAgICAgID0gJ2N1YmljLWJlemllcigwLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MCknO1xyXG5cclxuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBjb252ZXJ0U3R5bGUocmlwcGxlU3R5bGUpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoaWRlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIFRvdWNoSGFuZGxlci50b3VjaHVwKGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVsID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gZWwuY2xpZW50V2lkdGggKiAxLjQ7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgZmlyc3QgcmlwcGxlXHJcbiAgICAgICAgICAgIHZhciByaXBwbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlwcGxlcyA9IGVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dhdmVzLXJpcHBsZScpO1xyXG4gICAgICAgICAgICBpZiAocmlwcGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByaXBwbGUgPSByaXBwbGVzW3JpcHBsZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciByZWxhdGl2ZVggICA9IHJpcHBsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpO1xyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmVZICAgPSByaXBwbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcclxuICAgICAgICAgICAgdmFyIHNjYWxlICAgICAgID0gcmlwcGxlLmdldEF0dHJpYnV0ZSgnZGF0YS1zY2FsZScpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGRlbGF5IGJlZXR3ZWVuIG1vdXNlZG93biBhbmQgbW91c2UgbGVhdmVcclxuICAgICAgICAgICAgdmFyIGRpZmYgPSBEYXRlLm5vdygpIC0gTnVtYmVyKHJpcHBsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG9sZCcpKTtcclxuICAgICAgICAgICAgdmFyIGRlbGF5ID0gMzUwIC0gZGlmZjtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWxheSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGF5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmFkZSBvdXQgcmlwcGxlIGFmdGVyIGRlbGF5XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IHJlbGF0aXZlWSsncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogcmVsYXRpdmVYKydweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIER1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbic6IEVmZmVjdC5kdXJhdGlvbiArICdtcycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy1tb3otdHJhbnNpdGlvbi1kdXJhdGlvbic6IEVmZmVjdC5kdXJhdGlvbiArICdtcycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy1vLXRyYW5zaXRpb24tZHVyYXRpb24nOiBFZmZlY3QuZHVyYXRpb24gKyAnbXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogRWZmZWN0LmR1cmF0aW9uICsgJ21zJyxcclxuICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiBzY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiBzY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IHNjYWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICctby10cmFuc2Zvcm0nOiBzY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogc2NhbGUsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgY29udmVydFN0eWxlKHN0eWxlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDaGlsZChyaXBwbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgRWZmZWN0LmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIExpdHRsZSBoYWNrIHRvIG1ha2UgPGlucHV0PiBjYW4gcGVyZm9ybSB3YXZlcyBlZmZlY3RcclxuICAgICAgICB3cmFwSW5wdXQ6IGZ1bmN0aW9uKGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgZWxlbWVudHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbCA9IGVsZW1lbnRzW2FdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaW5wdXQgYWxyZWFkeSBoYXZlIHBhcmVudCBqdXN0IHBhc3MgdGhyb3VnaFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaScgJiYgcGFyZW50LmNsYXNzTmFtZS5pbmRleE9mKCd3YXZlcy1lZmZlY3QnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQdXQgZWxlbWVudCBjbGFzcyBhbmQgc3R5bGUgdG8gdGhlIHNwZWNpZmllZCBwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZSArICcgd2F2ZXMtaW5wdXQtd3JhcHBlcic7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50U3R5bGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZWxlbWVudFN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRTdHlsZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgZWxlbWVudFN0eWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gJ3dhdmVzLWJ1dHRvbi1pbnB1dCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQdXQgZWxlbWVudCBhcyBjaGlsZFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQod3JhcHBlciwgZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIG1vdXNlZG93biBldmVudCBmb3IgNTAwbXMgZHVyaW5nIGFuZCBhZnRlciB0b3VjaFxyXG4gICAgICovXHJcbiAgICB2YXIgVG91Y2hIYW5kbGVyID0ge1xyXG4gICAgICAgIC8qIHVzZXMgYW4gaW50ZWdlciByYXRoZXIgdGhhbiBib29sIHNvIHRoZXJlJ3Mgbm8gaXNzdWVzIHdpdGhcclxuICAgICAgICAgKiBuZWVkaW5nIHRvIGNsZWFyIHRpbWVvdXRzIGlmIGFub3RoZXIgdG91Y2ggZXZlbnQgb2NjdXJyZWRcclxuICAgICAgICAgKiB3aXRoaW4gdGhlIDUwMG1zLiBDYW5ub3QgbW91c2V1cCBiZXR3ZWVuIHRvdWNoc3RhcnQgYW5kXHJcbiAgICAgICAgICogdG91Y2hlbmQsIG5vciBpbiB0aGUgNTAwbXMgYWZ0ZXIgdG91Y2hlbmQuICovXHJcbiAgICAgICAgdG91Y2hlczogMCxcclxuICAgICAgICBhbGxvd0V2ZW50OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGxvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZS50eXBlID09PSAndG91Y2hzdGFydCcpIHtcclxuICAgICAgICAgICAgICAgIFRvdWNoSGFuZGxlci50b3VjaGVzICs9IDE7IC8vcHVzaFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3RvdWNoZW5kJyB8fCBlLnR5cGUgPT09ICd0b3VjaGNhbmNlbCcpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFRvdWNoSGFuZGxlci50b3VjaGVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3VjaEhhbmRsZXIudG91Y2hlcyAtPSAxOyAvL3BvcCBhZnRlciA1MDBtc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAnbW91c2Vkb3duJyAmJiBUb3VjaEhhbmRsZXIudG91Y2hlcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGFsbG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxvdztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvdWNodXA6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgVG91Y2hIYW5kbGVyLmFsbG93RXZlbnQoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZWQgY2xpY2sgaGFuZGxlciBmb3IgLndhdmVzLWVmZmVjdCBlbGVtZW50LlxyXG4gICAgICogcmV0dXJucyBudWxsIHdoZW4gLndhdmVzLWVmZmVjdCBlbGVtZW50IG5vdCBpbiBcImNsaWNrIHRyZWVcIlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRXYXZlc0VmZmVjdEVsZW1lbnQoZSkge1xyXG4gICAgICAgIGlmIChUb3VjaEhhbmRsZXIuYWxsb3dFdmVudChlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRhcmdldC5wYXJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpICYmIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignd2F2ZXMtZWZmZWN0JykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnViYmxlIHRoZSBjbGljayBhbmQgc2hvdyBlZmZlY3QgaWYgLndhdmVzLWVmZmVjdCBlbGVtIHdhcyBmb3VuZFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzaG93RWZmZWN0KGUpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGdldFdhdmVzRWZmZWN0RWxlbWVudChlKTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgRWZmZWN0LnNob3coZSwgZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgRWZmZWN0LmhpZGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBFZmZlY3QuaGlkZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBFZmZlY3QuaGlkZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBFZmZlY3QuaGlkZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBFZmZlY3QuaGlkZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBXYXZlcy5kaXNwbGF5RWZmZWN0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICBpZiAoJ2R1cmF0aW9uJyBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIEVmZmVjdC5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1dyYXAgaW5wdXQgaW5zaWRlIDxpPiB0YWdcclxuICAgICAgICBFZmZlY3Qud3JhcElucHV0KCQkKCcud2F2ZXMtZWZmZWN0JykpO1xyXG5cclxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNob3dFZmZlY3QsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc2hvd0VmZmVjdCwgZmFsc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBXYXZlcyB0byBhbiBpbnB1dCBlbGVtZW50IChvciBhbnkgZWxlbWVudCB3aGljaCBkb2Vzbid0XHJcbiAgICAgKiBidWJibGUgbW91c2V1cC9tb3VzZWRvd24gZXZlbnRzKS5cclxuICAgICAqICAgSW50ZW5kZWQgdG8gYmUgdXNlZCB3aXRoIGR5bmFtaWNhbGx5IGxvYWRlZCBmb3Jtcy9pbnB1dHMsIG9yXHJcbiAgICAgKiB3aGVyZSB0aGUgdXNlciBkb2Vzbid0IHdhbnQgYSBkZWxlZ2F0ZWQgY2xpY2sgaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgV2F2ZXMuYXR0YWNoID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIC8vRlVUVVJFOiBhdXRvbWF0aWNhbGx5IGFkZCB3YXZlcyBjbGFzc2VzIGFuZCBhbGxvdyB1c2Vyc1xyXG4gICAgICAgIC8vIHRvIHNwZWNpZnkgdGhlbSB3aXRoIGFuIG9wdGlvbnMgcGFyYW0/IEVnLiBsaWdodC9jbGFzc2ljL2J1dHRvblxyXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xyXG4gICAgICAgICAgICBFZmZlY3Qud3JhcElucHV0KFtlbGVtZW50XSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNob3dFZmZlY3QsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc2hvd0VmZmVjdCwgZmFsc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuV2F2ZXMgPSBXYXZlcztcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgV2F2ZXMuZGlzcGxheUVmZmVjdCgpO1xyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxufSkod2luZG93KTtcclxuXG4oZnVuY3Rpb24oJCwgYW5pbSkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgbGV0IF9kZWZhdWx0cyA9IHtcclxuICAgIGh0bWw6ICcnLFxyXG4gICAgZGlzcGxheUxlbmd0aDogNDAwMCxcclxuICAgIGluRHVyYXRpb246IDMwMCxcclxuICAgIG91dER1cmF0aW9uOiAzNzUsXHJcbiAgICBjbGFzc2VzOiAnJyxcclxuICAgIGNvbXBsZXRlQ2FsbGJhY2s6IG51bGwsXHJcbiAgICBhY3RpdmF0aW9uUGVyY2VudDogMC44XHJcbiAgfTtcclxuXHJcbiAgY2xhc3MgVG9hc3Qge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIE9wdGlvbnMgZm9yIHRoZSB0b2FzdFxyXG4gICAgICAgKiBAbWVtYmVyIFRvYXN0I29wdGlvbnNcclxuICAgICAgICovXHJcbiAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBUb2FzdC5kZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMub3B0aW9ucy5odG1sO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIERlc2NyaWJlcyBjdXJyZW50IHBhbiBzdGF0ZSB0b2FzdFxyXG4gICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMucGFubmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRpbWUgcmVtYWluaW5nIHVudGlsIHRvYXN0IGlzIHJlbW92ZWRcclxuICAgICAgICovXHJcbiAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IHRoaXMub3B0aW9ucy5kaXNwbGF5TGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKFRvYXN0Ll90b2FzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgVG9hc3QuX2NyZWF0ZUNvbnRhaW5lcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDcmVhdGUgbmV3IHRvYXN0XHJcbiAgICAgIFRvYXN0Ll90b2FzdHMucHVzaCh0aGlzKTtcclxuICAgICAgbGV0IHRvYXN0RWxlbWVudCA9IHRoaXMuX2NyZWF0ZVRvYXN0KCk7XHJcbiAgICAgIHRvYXN0RWxlbWVudC5NX1RvYXN0ID0gdGhpcztcclxuICAgICAgdGhpcy5lbCA9IHRvYXN0RWxlbWVudDtcclxuICAgICAgdGhpcy5fYW5pbWF0ZUluKCk7XHJcbiAgICAgIHRoaXMuX3NldFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fVG9hc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmQgdG9hc3QgY29udGFpbmVyIGFuZCBhZGQgZXZlbnQgaGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9jcmVhdGVDb250YWluZXIoKSB7XHJcbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3QtY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAvLyBBZGQgZXZlbnQgaGFuZGxlclxyXG4gICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIFRvYXN0Ll9vbkRyYWdTdGFydCk7XHJcbiAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBUb2FzdC5fb25EcmFnTW92ZSk7XHJcbiAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIFRvYXN0Ll9vbkRyYWdFbmQpO1xyXG5cclxuICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIFRvYXN0Ll9vbkRyYWdTdGFydCk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIFRvYXN0Ll9vbkRyYWdNb3ZlKTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIFRvYXN0Ll9vbkRyYWdFbmQpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgICBUb2FzdC5fY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRvYXN0IGNvbnRhaW5lciBhbmQgZXZlbnQgaGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9yZW1vdmVDb250YWluZXIoKSB7XHJcbiAgICAgIC8vIEFkZCBldmVudCBoYW5kbGVyXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIFRvYXN0Ll9vbkRyYWdNb3ZlKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIFRvYXN0Ll9vbkRyYWdFbmQpO1xyXG5cclxuICAgICAgVG9hc3QuX2NvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFRvYXN0Ll9jb250YWluZXIpO1xyXG4gICAgICBUb2FzdC5fY29udGFpbmVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJlZ2luIGRyYWcgaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX29uRHJhZ1N0YXJ0KGUpIHtcclxuICAgICAgaWYgKGUudGFyZ2V0ICYmICQoZS50YXJnZXQpLmNsb3Nlc3QoJy50b2FzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCAkdG9hc3QgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcudG9hc3QnKTtcclxuICAgICAgICBsZXQgdG9hc3QgPSAkdG9hc3RbMF0uTV9Ub2FzdDtcclxuICAgICAgICB0b2FzdC5wYW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICBUb2FzdC5fZHJhZ2dlZFRvYXN0ID0gdG9hc3Q7XHJcbiAgICAgICAgdG9hc3QuZWwuY2xhc3NMaXN0LmFkZCgncGFubmluZycpO1xyXG4gICAgICAgIHRvYXN0LmVsLnN0eWxlLnRyYW5zaXRpb24gPSAnJztcclxuICAgICAgICB0b2FzdC5zdGFydGluZ1hQb3MgPSBUb2FzdC5feFBvcyhlKTtcclxuICAgICAgICB0b2FzdC50aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0b2FzdC54UG9zID0gVG9hc3QuX3hQb3MoZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYWcgbW92ZSBoYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfb25EcmFnTW92ZShlKSB7XHJcbiAgICAgIGlmICghIVRvYXN0Ll9kcmFnZ2VkVG9hc3QpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QuX2RyYWdnZWRUb2FzdDtcclxuICAgICAgICB0b2FzdC5kZWx0YVggPSBNYXRoLmFicyh0b2FzdC54UG9zIC0gVG9hc3QuX3hQb3MoZSkpO1xyXG4gICAgICAgIHRvYXN0LnhQb3MgPSBUb2FzdC5feFBvcyhlKTtcclxuICAgICAgICB0b2FzdC52ZWxvY2l0eVggPSB0b2FzdC5kZWx0YVggLyAoRGF0ZS5ub3coKSAtIHRvYXN0LnRpbWUpO1xyXG4gICAgICAgIHRvYXN0LnRpbWUgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxEZWx0YVggPSB0b2FzdC54UG9zIC0gdG9hc3Quc3RhcnRpbmdYUG9zO1xyXG4gICAgICAgIGxldCBhY3RpdmF0aW9uRGlzdGFuY2UgPVxyXG4gICAgICAgICAgICB0b2FzdC5lbC5vZmZzZXRXaWR0aCAqIHRvYXN0Lm9wdGlvbnMuYWN0aXZhdGlvblBlcmNlbnQ7XHJcbiAgICAgICAgdG9hc3QuZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0b3RhbERlbHRhWH1weClgO1xyXG4gICAgICAgIHRvYXN0LmVsLnN0eWxlLm9wYWNpdHkgPSAxLU1hdGguYWJzKHRvdGFsRGVsdGFYIC8gYWN0aXZhdGlvbkRpc3RhbmNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kIGRyYWcgaGFuZGxlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX29uRHJhZ0VuZCgpIHtcclxuICAgICAgaWYgKCEhVG9hc3QuX2RyYWdnZWRUb2FzdCkge1xyXG4gICAgICAgIGxldCB0b2FzdCA9IFRvYXN0Ll9kcmFnZ2VkVG9hc3Q7XHJcbiAgICAgICAgdG9hc3QucGFubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRvYXN0LmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Bhbm5pbmcnKTtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsRGVsdGFYID0gdG9hc3QueFBvcyAtIHRvYXN0LnN0YXJ0aW5nWFBvcztcclxuICAgICAgICBsZXQgYWN0aXZhdGlvbkRpc3RhbmNlID1cclxuICAgICAgICAgICAgdG9hc3QuZWwub2Zmc2V0V2lkdGggKiB0b2FzdC5vcHRpb25zLmFjdGl2YXRpb25QZXJjZW50O1xyXG4gICAgICAgIGxldCBzaG91bGRCZURpc21pc3NlZCA9IE1hdGguYWJzKHRvdGFsRGVsdGFYKSA+IGFjdGl2YXRpb25EaXN0YW5jZSB8fFxyXG4gICAgICAgICAgICB0b2FzdC52ZWxvY2l0eVggPiAxO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgdG9hc3RcclxuICAgICAgICBpZiAoc2hvdWxkQmVEaXNtaXNzZWQpIHtcclxuICAgICAgICAgIHRvYXN0Lndhc1N3aXBlZCA9IHRydWU7XHJcbiAgICAgICAgICB0b2FzdC5kaXNtaXNzKCk7XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGUgdG9hc3QgYmFjayB0byBvcmlnaW5hbCBwb3NpdGlvblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b2FzdC5lbC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAuMnMsIG9wYWNpdHkgLjJzJztcclxuICAgICAgICAgIHRvYXN0LmVsLnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xyXG4gICAgICAgICAgdG9hc3QuZWwuc3R5bGUub3BhY2l0eSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb2FzdC5fZHJhZ2dlZFRvYXN0ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHggcG9zaXRpb24gb2YgbW91c2Ugb3IgdG91Y2ggZXZlbnRcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF94UG9zKGUpIHtcclxuICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA+PSAxKSkge1xyXG4gICAgICAgIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgfVxyXG4gICAgICAvLyBtb3VzZSBldmVudFxyXG4gICAgICByZXR1cm4gZS5jbGllbnRYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGFsbCB0b2FzdHNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRpc21pc3NBbGwoKSB7XHJcbiAgICAgIGZvcihsZXQgdG9hc3RJbmRleCBpbiBUb2FzdC5fdG9hc3RzKSB7XHJcbiAgICAgICAgVG9hc3QuX3RvYXN0c1t0b2FzdEluZGV4XS5kaXNtaXNzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdG9hc3QgYW5kIGFwcGVuZCBpdCB0byB0b2FzdCBjb250YWluZXJcclxuICAgICAqL1xyXG4gICAgX2NyZWF0ZVRvYXN0KCkge1xyXG4gICAgICBsZXQgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdG9hc3QuY2xhc3NMaXN0LmFkZCgndG9hc3QnKTtcclxuXHJcbiAgICAgIC8vIEFkZCBjdXN0b20gY2xhc3NlcyBvbnRvIHRvYXN0XHJcbiAgICAgIGlmICghIXRoaXMub3B0aW9ucy5jbGFzc2VzLmxlbmd0aCkge1xyXG4gICAgICAgICQodG9hc3QpLmFkZENsYXNzKHRoaXMub3B0aW9ucy5jbGFzc2VzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2V0IGNvbnRlbnRcclxuICAgICAgaWYgKCB0eXBlb2YgSFRNTEVsZW1lbnQgPT09ICdvYmplY3QnID9cclxuICAgICAgICAgICB0aGlzLm1lc3NhZ2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA6XHJcbiAgICAgICAgICAgdGhpcy5tZXNzYWdlICYmIHR5cGVvZiB0aGlzLm1lc3NhZ2UgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgdGhpcy5tZXNzYWdlICE9PSBudWxsICYmIHRoaXMubWVzc2FnZS5ub2RlVHlwZSA9PT0gMSAmJlxyXG4gICAgICAgICAgIHR5cGVvZiB0aGlzLm1lc3NhZ2Uubm9kZU5hbWU9PT0nc3RyaW5nJ1xyXG4gICAgICAgICApIHtcclxuICAgICAgICB0b2FzdC5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgalF1ZXJ5IG9iamVjdFxyXG4gICAgICB9IGVsc2UgaWYgKCEhdGhpcy5tZXNzYWdlLmpxdWVyeSkge1xyXG4gICAgICAgICQodG9hc3QpLmFwcGVuZCh0aGlzLm1lc3NhZ2VbMF0pO1xyXG5cclxuICAgICAgLy8gSW5zZXJ0IGFzIGh0bWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9hc3QuaW5uZXJIVE1MID0gdGhpcy5tZXNzYWdlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBcHBlbmQgdG9hc2Z0XHJcbiAgICAgIFRvYXN0Ll9jb250YWluZXIuYXBwZW5kQ2hpbGQodG9hc3QpO1xyXG4gICAgICByZXR1cm4gdG9hc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRlIGluIHRvYXN0XHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlSW4oKSB7XHJcbiAgICAgIC8vIEFuaW1hdGUgdG9hc3QgaW5cclxuICAgICAgYW5pbSh7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy5lbCxcclxuICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgICAgIGVhc2luZzogJ2Vhc2VPdXRDdWJpYydcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHNldEludGVydmFsIHdoaWNoIGF1dG9tYXRpY2FsbHkgcmVtb3ZlcyB0b2FzdCB3aGVuIHRpbWVSZW1haW5pbmcgPj0gMFxyXG4gICAgICogaGFzIGJlZW4gcmVhY2hlZFxyXG4gICAgICovXHJcbiAgICBfc2V0VGltZXIoKSB7XHJcbiAgICAgIGlmICh0aGlzLnRpbWVSZW1haW5pbmcgIT09IEluZmluaXR5KSAge1xyXG4gICAgICAgIHRoaXMuY291bnRlckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgLy8gSWYgdG9hc3QgaXMgbm90IGJlaW5nIGRyYWdnZWQsIGRlY3JlYXNlIGl0cyB0aW1lIHJlbWFpbmluZ1xyXG4gICAgICAgICAgaWYgKCF0aGlzLnBhbm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lUmVtYWluaW5nIC09IDIwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEFuaW1hdGUgdG9hc3Qgb3V0XHJcbiAgICAgICAgICBpZiAodGhpcy50aW1lUmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNtaXNzKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzbWlzcyB0b2FzdCB3aXRoIGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICBkaXNtaXNzKCkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmNvdW50ZXJJbnRlcnZhbCk7XHJcbiAgICAgIGxldCBhY3RpdmF0aW9uRGlzdGFuY2UgPVxyXG4gICAgICAgICAgdGhpcy5lbC5vZmZzZXRXaWR0aCAqIHRoaXMub3B0aW9ucy5hY3RpdmF0aW9uUGVyY2VudDtcclxuXHJcbiAgICAgIGlmKHRoaXMud2FzU3dpcGVkKSB7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAuMDVzLCBvcGFjaXR5IC4wNXMnO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHthY3RpdmF0aW9uRGlzdGFuY2V9cHgpYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgYW5pbSh7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy5lbCxcclxuICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgIG1hcmdpblRvcDogLTQwLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMub3V0RHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dEV4cG8nLFxyXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAvLyBDYWxsIHRoZSBvcHRpb25hbCBjYWxsYmFja1xyXG4gICAgICAgICAgaWYodHlwZW9mKHRoaXMub3B0aW9ucy5jb21wbGV0ZUNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuY29tcGxldGVDYWxsYmFjaygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gUmVtb3ZlIHRvYXN0IGZyb20gRE9NXHJcbiAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XHJcbiAgICAgICAgICBUb2FzdC5fdG9hc3RzLnNwbGljZShUb2FzdC5fdG9hc3RzLmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgICAgICAgaWYgKFRvYXN0Ll90b2FzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIFRvYXN0Ll9yZW1vdmVDb250YWluZXIoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBUb2FzdFxyXG4gICAqIEB0eXBlIHtBcnJheS48VG9hc3Q+fVxyXG4gICAqL1xyXG4gIFRvYXN0Ll90b2FzdHMgPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBUb2FzdFxyXG4gICAqL1xyXG4gIFRvYXN0Ll9jb250YWluZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIFRvYXN0XHJcbiAgICogQHR5cGUge1RvYXN0fVxyXG4gICAqL1xyXG4gIFRvYXN0Ll9kcmFnZ2VkVG9hc3QgPSBudWxsO1xyXG5cclxuICBNLlRvYXN0ID0gVG9hc3Q7XHJcbiAgTS50b2FzdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgVG9hc3Qob3B0aW9ucyk7XHJcbiAgfTtcclxufSkoY2FzaCwgTS5hbmltZSk7XHJcblxuKGZ1bmN0aW9uKCQsIGFuaW0pIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGxldCBfZGVmYXVsdHMgPSB7XHJcbiAgICBlZGdlOiAnbGVmdCcsXHJcbiAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICBpbkR1cmF0aW9uOiAyNTAsXHJcbiAgICBvdXREdXJhdGlvbjogMjAwLFxyXG4gICAgb25PcGVuU3RhcnQ6IG51bGwsXHJcbiAgICBvbk9wZW5FbmQ6IG51bGwsXHJcbiAgICBvbkNsb3NlU3RhcnQ6IG51bGwsXHJcbiAgICBvbkNsb3NlRW5kOiBudWxsLFxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAY2xhc3NcclxuICAgKi9cclxuICBjbGFzcyBTaWRlbmF2IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IFNpZGVuYXYgaW5zdGFuY2UgYW5kIHNldCB1cCBvdmVybGF5XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yIChlbCwgb3B0aW9ucykge1xyXG4gICAgICBzdXBlcihTaWRlbmF2LCBlbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmVsLk1fU2lkZW5hdiA9IHRoaXM7XHJcbiAgICAgIHRoaXMuaWQgPSB0aGlzLiRlbC5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIE9wdGlvbnMgZm9yIHRoZSBTaWRlbmF2XHJcbiAgICAgICAqIEBtZW1iZXIgU2lkZW5hdiNvcHRpb25zXHJcbiAgICAgICAqIEBwcm9wIHtTdHJpbmd9IFtlZGdlPSdsZWZ0J10gLSBTaWRlIG9mIHNjcmVlbiBvbiB3aGljaCBTaWRlbmF2IGFwcGVhcnNcclxuICAgICAgICogQHByb3Age0Jvb2xlYW59IFtkcmFnZ2FibGU9dHJ1ZV0gLSBBbGxvdyBzd2lwZSBnZXN0dXJlcyB0byBvcGVuL2Nsb3NlIFNpZGVuYXZcclxuICAgICAgICogQHByb3Age051bWJlcn0gW2luRHVyYXRpb249MjUwXSAtIExlbmd0aCBpbiBtcyBvZiBlbnRlciB0cmFuc2l0aW9uXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IFtvdXREdXJhdGlvbj0yMDBdIC0gTGVuZ3RoIGluIG1zIG9mIGV4aXQgdHJhbnNpdGlvblxyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uT3BlblN0YXJ0IC0gRnVuY3Rpb24gY2FsbGVkIHdoZW4gc2lkZW5hdiBzdGFydHMgZW50ZXJpbmdcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbk9wZW5FbmQgLSBGdW5jdGlvbiBjYWxsZWQgd2hlbiBzaWRlbmF2IGZpbmlzaGVzIGVudGVyaW5nXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gb25DbG9zZVN0YXJ0IC0gRnVuY3Rpb24gY2FsbGVkIHdoZW4gc2lkZW5hdiBzdGFydHMgZXhpdGluZ1xyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uQ2xvc2VFbmQgLSBGdW5jdGlvbiBjYWxsZWQgd2hlbiBzaWRlbmF2IGZpbmlzaGVzIGV4aXRpbmdcclxuICAgICAgICovXHJcbiAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBTaWRlbmF2LmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBEZXNjcmliZXMgb3Blbi9jbG9zZSBzdGF0ZSBvZiBTaWRlbmF2XHJcbiAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBEZXNjcmliZXMgaWYgU2lkZW5hdiBpcyBmaXhlZFxyXG4gICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMuaXNGaXhlZCA9IHRoaXMuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlbmF2LWZpeGVkJyk7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogRGVzY3JpYmVzIGlmIFNpZGVuYXYgaXMgYmVpbmcgZHJhZ2dlZWRcclxuICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAqL1xyXG4gICAgICB0aGlzLmlzRHJhZ2dlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xyXG4gICAgICB0aGlzLl9jcmVhdGVEcmFnVGFyZ2V0KCk7XHJcbiAgICAgIHRoaXMuX3NldHVwRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICB0aGlzLl9zZXR1cENsYXNzZXMoKTtcclxuICAgICAgdGhpcy5fc2V0dXBGaXhlZCgpO1xyXG5cclxuICAgICAgU2lkZW5hdi5fc2lkZW5hdnMucHVzaCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xyXG4gICAgICByZXR1cm4gX2RlZmF1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbml0KGVscywgb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuaW5pdCh0aGlzLCBlbHMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZShlbCkge1xyXG4gICAgICBsZXQgZG9tRWxlbSA9ICEhZWwuanF1ZXJ5ID8gZWxbMF0gOiBlbDtcclxuICAgICAgcmV0dXJuIGRvbUVsZW0uTV9TaWRlbmF2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVhcmRvd24gY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgdGhpcy5fb3ZlcmxheS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX292ZXJsYXkpO1xyXG4gICAgICB0aGlzLmRyYWdUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdUYXJnZXQpO1xyXG4gICAgICB0aGlzLmVsLk1fU2lkZW5hdiA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgIGxldCBpbmRleCA9IFNpZGVuYXYuX3NpZGVuYXZzLmluZGV4T2YodGhpcyk7XHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgU2lkZW5hdi5fc2lkZW5hdnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVPdmVybGF5KCkge1xyXG4gICAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLl9jbG9zZUJvdW5kID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3NpZGVuYXYtb3ZlcmxheScpO1xyXG5cclxuICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2Nsb3NlQm91bmQpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgICAgdGhpcy5fb3ZlcmxheSA9IG92ZXJsYXk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldHVwRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgaWYgKFNpZGVuYXYuX3NpZGVuYXZzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVUcmlnZ2VyQ2xpY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9oYW5kbGVEcmFnVGFyZ2V0RHJhZ0JvdW5kID0gdGhpcy5faGFuZGxlRHJhZ1RhcmdldERyYWcuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5faGFuZGxlRHJhZ1RhcmdldFJlbGVhc2VCb3VuZCA9IHRoaXMuX2hhbmRsZURyYWdUYXJnZXRSZWxlYXNlLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNsb3NlRHJhZ0JvdW5kID0gdGhpcy5faGFuZGxlQ2xvc2VEcmFnLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNsb3NlUmVsZWFzZUJvdW5kID0gdGhpcy5faGFuZGxlQ2xvc2VSZWxlYXNlLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNsb3NlVHJpZ2dlckNsaWNrQm91bmQgPSB0aGlzLl9oYW5kbGVDbG9zZVRyaWdnZXJDbGljay5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgdGhpcy5kcmFnVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZURyYWdUYXJnZXREcmFnQm91bmQpO1xyXG4gICAgICB0aGlzLmRyYWdUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9oYW5kbGVEcmFnVGFyZ2V0UmVsZWFzZUJvdW5kKTtcclxuICAgICAgdGhpcy5fb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9oYW5kbGVDbG9zZURyYWdCb3VuZCk7XHJcbiAgICAgIHRoaXMuX292ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9oYW5kbGVDbG9zZVJlbGVhc2VCb3VuZCk7XHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlQ2xvc2VEcmFnQm91bmQpO1xyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlQ2xvc2VSZWxlYXNlQm91bmQpO1xyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQ2xvc2VUcmlnZ2VyQ2xpY2tCb3VuZCk7XHJcblxyXG5cclxuICAgICAgLy8gQWRkIHJlc2l6ZSBmb3Igc2lkZSBuYXYgZml4ZWRcclxuICAgICAgaWYgKHRoaXMuaXNGaXhlZCkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZVdpbmRvd1Jlc2l6ZUJvdW5kID0gdGhpcy5faGFuZGxlV2luZG93UmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVdpbmRvd1Jlc2l6ZUJvdW5kKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZW1vdmVFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICBpZiAoU2lkZW5hdi5fc2lkZW5hdnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVRyaWdnZXJDbGljayk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZHJhZ1RhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9oYW5kbGVEcmFnVGFyZ2V0RHJhZ0JvdW5kKTtcclxuICAgICAgdGhpcy5kcmFnVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlRHJhZ1RhcmdldFJlbGVhc2VCb3VuZCk7XHJcbiAgICAgIHRoaXMuX292ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlQ2xvc2VEcmFnQm91bmQpO1xyXG4gICAgICB0aGlzLl9vdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlQ2xvc2VSZWxlYXNlQm91bmQpO1xyXG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZUNsb3NlRHJhZ0JvdW5kKTtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX2hhbmRsZUNsb3NlUmVsZWFzZUJvdW5kKTtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsb3NlVHJpZ2dlckNsaWNrQm91bmQpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIHJlc2l6ZSBmb3Igc2lkZSBuYXYgZml4ZWRcclxuICAgICAgaWYgKHRoaXMuaXNGaXhlZCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemVCb3VuZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBUcmlnZ2VyIENsaWNrXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVUcmlnZ2VyQ2xpY2soZSkge1xyXG4gICAgICBsZXQgJHRyaWdnZXIgPSAgJChlLnRhcmdldCkuY2xvc2VzdCgnLnNpZGVuYXYtdHJpZ2dlcicpO1xyXG4gICAgICBpZiAoZS50YXJnZXQgJiYgJHRyaWdnZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgbGV0IHNpZGVuYXZJZCA9IE0uZ2V0SWRGcm9tVHJpZ2dlcigkdHJpZ2dlclswXSk7XHJcblxyXG4gICAgICAgIGxldCBzaWRlbmF2SW5zdGFuY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlbmF2SWQpLk1fU2lkZW5hdjtcclxuICAgICAgICBpZiAoc2lkZW5hdkluc3RhbmNlKSB7XHJcbiAgICAgICAgICBzaWRlbmF2SW5zdGFuY2Uub3BlbigkdHJpZ2dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB2YXJpYWJsZXMgbmVlZGVkIGF0IHRoZSBiZWdnaW5pbmcgb2YgZHJhZ1xyXG4gICAgICogYW5kIHN0b3AgYW55IGN1cnJlbnQgdHJhbnNpdGlvbi5cclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgX3N0YXJ0RHJhZyhlKSB7XHJcbiAgICAgIGxldCBjbGllbnRYID0gZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgIHRoaXMuaXNEcmFnZ2VkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fc3RhcnRpbmdYcG9zID0gY2xpZW50WDtcclxuICAgICAgdGhpcy5feFBvcyA9IHRoaXMuX3N0YXJ0aW5nWHBvcztcclxuICAgICAgdGhpcy5fdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIHRoaXMuX3dpZHRoID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgICAgdGhpcy5fb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgYW5pbS5yZW1vdmUodGhpcy5lbCk7XHJcbiAgICAgIGFuaW0ucmVtb3ZlKHRoaXMuX292ZXJsYXkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB2YXJpYWJsZXMgbmVlZGVkIGF0IGVhY2ggZHJhZyBtb3ZlIHVwZGF0ZSB0aWNrXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9kcmFnTW92ZVVwZGF0ZShlKSB7XHJcbiAgICAgIGxldCBjbGllbnRYID0gZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgIHRoaXMuZGVsdGFYID0gTWF0aC5hYnModGhpcy5feFBvcyAtIGNsaWVudFgpO1xyXG4gICAgICB0aGlzLl94UG9zID0gY2xpZW50WDtcclxuICAgICAgdGhpcy52ZWxvY2l0eVggPSB0aGlzLmRlbHRhWCAvIChEYXRlLm5vdygpIC0gdGhpcy5fdGltZSk7XHJcbiAgICAgIHRoaXMuX3RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgRHJhZ2dpbmcgb2YgU2lkZW5hdlxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlRHJhZ1RhcmdldERyYWcoZSkge1xyXG4gICAgICAvLyBJZiBub3QgYmVpbmcgZHJhZ2dlZCwgc2V0IGluaXRpYWwgZHJhZyBzdGFydCB2YXJpYWJsZXNcclxuICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dlZCkge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0RHJhZyhlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUnVuIHRvdWNobW92ZSB1cGRhdGVzXHJcbiAgICAgIHRoaXMuX2RyYWdNb3ZlVXBkYXRlKGUpO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHJhdyBkZWx0YVhcclxuICAgICAgbGV0IHRvdGFsRGVsdGFYID0gdGhpcy5feFBvcyAtIHRoaXMuX3N0YXJ0aW5nWHBvcztcclxuXHJcbiAgICAgIC8vIGRyYWdEaXJlY3Rpb24gaXMgdGhlIGF0dGVtcHRlZCB1c2VyIGRyYWcgZGlyZWN0aW9uXHJcbiAgICAgIGxldCBkcmFnRGlyZWN0aW9uID0gdG90YWxEZWx0YVggPiAwID8gJ3JpZ2h0JyA6ICdsZWZ0JztcclxuXHJcbiAgICAgIC8vIERvbid0IGFsbG93IHRvdGFsRGVsdGFYIHRvIGV4Y2VlZCBTaWRlbmF2IHdpZHRoIG9yIGJlIGRyYWdnZWQgaW4gdGhlIG9wcG9zaXRlIGRpcmVjdGlvblxyXG4gICAgICB0b3RhbERlbHRhWCA9IE1hdGgubWluKHRoaXMuX3dpZHRoLCBNYXRoLmFicyh0b3RhbERlbHRhWCkpO1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmVkZ2UgPT09IGRyYWdEaXJlY3Rpb24pIHtcclxuICAgICAgICB0b3RhbERlbHRhWCA9IDA7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogdHJhbnNmb3JtWCBpcyB0aGUgZHJhZyBkaXNwbGFjZW1lbnRcclxuICAgICAgICogdHJhbnNmb3JtUHJlZml4IGlzIHRoZSBpbml0aWFsIHRyYW5zZm9ybSBwbGFjZW1lbnRcclxuICAgICAgICogSW52ZXJ0IHZhbHVlcyBpZiBTaWRlbmF2IGlzIHJpZ2h0IGVkZ2VcclxuICAgICAgICovXHJcbiAgICAgIGxldCB0cmFuc2Zvcm1YID0gdG90YWxEZWx0YVg7XHJcbiAgICAgIGxldCB0cmFuc2Zvcm1QcmVmaXggPSAndHJhbnNsYXRlWCgtMTAwJSknO1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmVkZ2UgPT09ICdyaWdodCcpIHtcclxuICAgICAgICB0cmFuc2Zvcm1QcmVmaXggPSAndHJhbnNsYXRlWCgxMDAlKSc7XHJcbiAgICAgICAgdHJhbnNmb3JtWCA9IC10cmFuc2Zvcm1YO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgb3Blbi9jbG9zZSBwZXJjZW50YWdlIG9mIHNpZGVuYXYsIHdpdGggb3BlbiA9IDEgYW5kIGNsb3NlID0gMFxyXG4gICAgICB0aGlzLnBlcmNlbnRPcGVuID0gTWF0aC5taW4oMSwgdG90YWxEZWx0YVggLyB0aGlzLl93aWR0aCk7XHJcblxyXG4gICAgICAvLyBTZXQgdHJhbnNmb3JtIGFuZCBvcGFjaXR5IHN0eWxlc1xyXG4gICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGAke3RyYW5zZm9ybVByZWZpeH0gdHJhbnNsYXRlWCgke3RyYW5zZm9ybVh9cHgpYDtcclxuICAgICAgdGhpcy5fb3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gdGhpcy5wZXJjZW50T3BlbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBEcmFnIFRhcmdldCBSZWxlYXNlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVEcmFnVGFyZ2V0UmVsZWFzZSgpIHtcclxuICAgICAgaWYgKHRoaXMuaXNEcmFnZ2VkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGVyY2VudE9wZW4gPiAuNSkge1xyXG4gICAgICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX2FuaW1hdGVPdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNEcmFnZ2VkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBDbG9zZSBEcmFnXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVDbG9zZURyYWcoZSkge1xyXG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuXHJcbiAgICAgICAgLy8gSWYgbm90IGJlaW5nIGRyYWdnZWQsIHNldCBpbml0aWFsIGRyYWcgc3RhcnQgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dlZCkge1xyXG4gICAgICAgICAgdGhpcy5fc3RhcnREcmFnKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUnVuIHRvdWNobW92ZSB1cGRhdGVzXHJcbiAgICAgICAgdGhpcy5fZHJhZ01vdmVVcGRhdGUoZSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSByYXcgZGVsdGFYXHJcbiAgICAgICAgbGV0IHRvdGFsRGVsdGFYID0gdGhpcy5feFBvcyAtIHRoaXMuX3N0YXJ0aW5nWHBvcztcclxuXHJcbiAgICAgICAgLy8gZHJhZ0RpcmVjdGlvbiBpcyB0aGUgYXR0ZW1wdGVkIHVzZXIgZHJhZyBkaXJlY3Rpb25cclxuICAgICAgICBsZXQgZHJhZ0RpcmVjdGlvbiA9IHRvdGFsRGVsdGFYID4gMCA/ICdyaWdodCcgOiAnbGVmdCc7XHJcblxyXG4gICAgICAgIC8vIERvbid0IGFsbG93IHRvdGFsRGVsdGFYIHRvIGV4Y2VlZCBTaWRlbmF2IHdpZHRoIG9yIGJlIGRyYWdnZWQgaW4gdGhlIG9wcG9zaXRlIGRpcmVjdGlvblxyXG4gICAgICAgIHRvdGFsRGVsdGFYID0gTWF0aC5taW4odGhpcy5fd2lkdGgsIE1hdGguYWJzKHRvdGFsRGVsdGFYKSk7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lZGdlICE9PSBkcmFnRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICB0b3RhbERlbHRhWCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHJhbnNmb3JtWCA9IC10b3RhbERlbHRhWDtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVkZ2UgPT09ICdyaWdodCcpIHtcclxuICAgICAgICAgIHRyYW5zZm9ybVggPSAtdHJhbnNmb3JtWDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSBvcGVuL2Nsb3NlIHBlcmNlbnRhZ2Ugb2Ygc2lkZW5hdiwgd2l0aCBvcGVuID0gMSBhbmQgY2xvc2UgPSAwXHJcbiAgICAgICAgdGhpcy5wZXJjZW50T3BlbiA9IE1hdGgubWluKDEsIDEgLSB0b3RhbERlbHRhWCAvIHRoaXMuX3dpZHRoKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRyYW5zZm9ybSBhbmQgb3BhY2l0eSBzdHlsZXNcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dHJhbnNmb3JtWH1weClgO1xyXG4gICAgICAgIHRoaXMuX292ZXJsYXkuc3R5bGUub3BhY2l0eSA9IHRoaXMucGVyY2VudE9wZW47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBDbG9zZSBSZWxlYXNlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVDbG9zZVJlbGVhc2UoKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiB0aGlzLmlzRHJhZ2dlZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBlcmNlbnRPcGVuID4gLjUpIHtcclxuICAgICAgICAgIHRoaXMuX2FuaW1hdGVJbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzRHJhZ2dlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBjbG9zaW5nIG9mIFNpZGVuYXYgd2hlbiBlbGVtZW50IHdpdGggY2xhc3MgLnNpZGVuYXYtY2xvc2VcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUNsb3NlVHJpZ2dlckNsaWNrKGUpIHtcclxuICAgICAgbGV0ICRjbG9zZVRyaWdnZXIgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuc2lkZW5hdi1jbG9zZScpO1xyXG4gICAgICBpZiAoJGNsb3NlVHJpZ2dlci5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBXaW5kb3cgUmVzaXplXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVXaW5kb3dSZXNpemUoKSB7XHJcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDk5Mikge1xyXG4gICAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zZXR1cENsYXNzZXMoKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZWRnZSA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncmlnaHQtYWxpZ25lZCcpO1xyXG4gICAgICAgIHRoaXMuZHJhZ1RhcmdldC5jbGFzc0xpc3QuYWRkKCdyaWdodC1hbGlnbmVkJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlQ2xhc3NlcygpIHtcclxuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdyaWdodC1hbGlnbmVkJyk7XHJcbiAgICAgIHRoaXMuZHJhZ1RhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdyaWdodC1hbGlnbmVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldHVwRml4ZWQoKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzRml4ZWQgJiYgd2luZG93LmlubmVyV2lkdGggPiA5OTIpIHtcclxuICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVEcmFnVGFyZ2V0KCkge1xyXG4gICAgICBsZXQgZHJhZ1RhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBkcmFnVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctdGFyZ2V0Jyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZHJhZ1RhcmdldCk7XHJcbiAgICAgIHRoaXMuZHJhZ1RhcmdldCA9IGRyYWdUYXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZXZlbnRCb2R5U2Nyb2xsaW5nKCkge1xyXG4gICAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIH1cclxuXHJcbiAgICBfZW5hYmxlQm9keVNjcm9sbGluZygpIHtcclxuICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbigpIHtcclxuICAgICAgaWYgKHRoaXMuaXNPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAvLyBSdW4gb25PcGVuU3RhcnQgY2FsbGJhY2tcclxuICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25PcGVuU3RhcnQpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uT3BlblN0YXJ0LmNhbGwodGhpcywgdGhpcy5lbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhhbmRsZSBmaXhlZCBTaWRlbmF2XHJcbiAgICAgIGlmICh0aGlzLmlzRml4ZWQgJiYgd2luZG93LmlubmVyV2lkdGggPiA5OTIpIHtcclxuICAgICAgICBhbmltLnJlbW92ZSh0aGlzLmVsKTtcclxuICAgICAgICBhbmltKHtcclxuICAgICAgICAgIHRhcmdldHM6IHRoaXMuZWwsXHJcbiAgICAgICAgICB0cmFuc2xhdGVYOiAwLFxyXG4gICAgICAgICAgZHVyYXRpb246IDAsXHJcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCdcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9lbmFibGVCb2R5U2Nyb2xsaW5nKCk7XHJcbiAgICAgICAgdGhpcy5fb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgLy8gSGFuZGxlIG5vbi1maXhlZCBTaWRlbmF2XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fcHJldmVudEJvZHlTY3JvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dlZCB8fCB0aGlzLnBlcmNlbnRPcGVuICE9IDEpIHtcclxuICAgICAgICAgIHRoaXMuX2FuaW1hdGVJbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICBpZiAodGhpcy5pc09wZW4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gUnVuIG9uQ2xvc2VTdGFydCBjYWxsYmFja1xyXG4gICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vbkNsb3NlU3RhcnQpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2xvc2VTdGFydC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBIYW5kbGUgZml4ZWQgU2lkZW5hdlxyXG4gICAgICBpZiAodGhpcy5pc0ZpeGVkICYmIHdpbmRvdy5pbm5lcldpZHRoID4gOTkyKSB7XHJcbiAgICAgICAgbGV0IHRyYW5zZm9ybVggPSB0aGlzLm9wdGlvbnMuZWRnZSA9PT0gJ2xlZnQnID8gJy0xMDUlJyA6ICcxMDUlJztcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dHJhbnNmb3JtWH0pYDtcclxuXHJcbiAgICAgIC8vIEhhbmRsZSBub24tZml4ZWQgU2lkZW5hdlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZUJvZHlTY3JvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dlZCB8fCB0aGlzLnBlcmNlbnRPcGVuICE9IDApIHtcclxuICAgICAgICAgIHRoaXMuX2FuaW1hdGVPdXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9hbmltYXRlSW4oKSB7XHJcbiAgICAgIHRoaXMuX2FuaW1hdGVTaWRlbmF2SW4oKTtcclxuICAgICAgdGhpcy5fYW5pbWF0ZU92ZXJsYXlJbigpO1xyXG4gICAgfVxyXG5cclxuICAgIF9hbmltYXRlU2lkZW5hdkluKCkge1xyXG4gICAgICBsZXQgc2xpZGVPdXRQZXJjZW50ID0gdGhpcy5vcHRpb25zLmVkZ2UgPT09ICdsZWZ0JyA/IC0xIDogMTtcclxuICAgICAgaWYgKHRoaXMuaXNEcmFnZ2VkKSB7XHJcbiAgICAgICAgc2xpZGVPdXRQZXJjZW50ID0gdGhpcy5vcHRpb25zLmVkZ2UgPT09ICdsZWZ0JyA/IHNsaWRlT3V0UGVyY2VudCArIHRoaXMucGVyY2VudE9wZW4gOiBzbGlkZU91dFBlcmNlbnQgLSB0aGlzLnBlcmNlbnRPcGVuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLmVsKTtcclxuICAgICAgYW5pbSh7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy5lbCxcclxuICAgICAgICB0cmFuc2xhdGVYOiAgW2Ake3NsaWRlT3V0UGVyY2VudCAqIDEwMH0lYCwgMF0sXHJcbiAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy5pbkR1cmF0aW9uLFxyXG4gICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJyxcclxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgLy8gUnVuIG9uT3BlbkVuZCBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25PcGVuRW5kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25PcGVuRW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfYW5pbWF0ZU92ZXJsYXlJbigpIHtcclxuICAgICAgbGV0IHN0YXJ0ID0gMDtcclxuICAgICAgaWYgKHRoaXMuaXNEcmFnZ2VkKSB7XHJcbiAgICAgICAgc3RhcnQgPSB0aGlzLnBlcmNlbnRPcGVuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQodGhpcy5fb3ZlcmxheSkuY3NzKHtcclxuICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYW5pbS5yZW1vdmUodGhpcy5fb3ZlcmxheSk7XHJcbiAgICAgIGFuaW0oe1xyXG4gICAgICAgIHRhcmdldHM6IHRoaXMuX292ZXJsYXksXHJcbiAgICAgICAgb3BhY2l0eTogW3N0YXJ0LCAxXSxcclxuICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLmluRHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9hbmltYXRlT3V0KCkge1xyXG4gICAgICB0aGlzLl9hbmltYXRlU2lkZW5hdk91dCgpO1xyXG4gICAgICB0aGlzLl9hbmltYXRlT3ZlcmxheU91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9hbmltYXRlU2lkZW5hdk91dCgpIHtcclxuICAgICAgbGV0IGVuZFBlcmNlbnQgPSB0aGlzLm9wdGlvbnMuZWRnZSA9PT0gJ2xlZnQnID8gLTEgOiAxO1xyXG4gICAgICBsZXQgc2xpZGVPdXRQZXJjZW50ID0gMDtcclxuICAgICAgaWYgKHRoaXMuaXNEcmFnZ2VkKSB7XHJcbiAgICAgICAgc2xpZGVPdXRQZXJjZW50ID0gdGhpcy5vcHRpb25zLmVkZ2UgPT09ICdsZWZ0JyA/IGVuZFBlcmNlbnQgKyB0aGlzLnBlcmNlbnRPcGVuIDogZW5kUGVyY2VudCAtIHRoaXMucGVyY2VudE9wZW47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFuaW0ucmVtb3ZlKHRoaXMuZWwpO1xyXG4gICAgICBhbmltKHtcclxuICAgICAgICB0YXJnZXRzOiB0aGlzLmVsLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IFtgJHtzbGlkZU91dFBlcmNlbnQgKiAxMDB9JWAsIGAke2VuZFBlcmNlbnQgKiAxMDV9JWBdLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMub3V0RHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAvLyBSdW4gb25PcGVuRW5kIGNhbGxiYWNrXHJcbiAgICAgICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vbkNsb3NlRW5kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25DbG9zZUVuZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FuaW1hdGVPdmVybGF5T3V0KCkge1xyXG4gICAgICBhbmltLnJlbW92ZSh0aGlzLl9vdmVybGF5KTtcclxuICAgICAgYW5pbSh7XHJcbiAgICAgICAgdGFyZ2V0czogdGhpcy5fb3ZlcmxheSxcclxuICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMub3V0RHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAkKHRoaXMuX292ZXJsYXkpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAbWVtYmVyb2YgU2lkZW5hdlxyXG4gICAqIEB0eXBlIHtBcnJheS48U2lkZW5hdj59XHJcbiAgICovXHJcbiAgU2lkZW5hdi5fc2lkZW5hdnMgPSBbXTtcclxuXHJcbiAgd2luZG93Lk0uU2lkZW5hdiA9IFNpZGVuYXY7XHJcblxyXG4gIGlmIChNLmpRdWVyeUxvYWRlZCkge1xyXG4gICAgTS5pbml0aWFsaXplSnF1ZXJ5V3JhcHBlcihTaWRlbmF2LCAnc2lkZW5hdicsICdNX1NpZGVuYXYnKTtcclxuICB9XHJcblxyXG59KShjYXNoLCBNLmFuaW1lKTtcclxuXG4oZnVuY3Rpb24gKCQsIGFuaW0pIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGxldCBfZGVmYXVsdHMgPSB7XHJcbiAgICB0aHJvdHRsZTogMTAwLFxyXG4gICAgc2Nyb2xsT2Zmc2V0OiAyMDAsIC8vIG9mZnNldCAtIDIwMCBhbGxvd3MgZWxlbWVudHMgbmVhciBib3R0b20gb2YgcGFnZSB0byBzY3JvbGxcclxuICAgIGFjdGl2ZUNsYXNzOiAnYWN0aXZlJyxcclxuICAgIGdldEFjdGl2ZUVsZW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICByZXR1cm4gJ2FbaHJlZj1cIiMnICsgaWQgKyAnXCJdJztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAY2xhc3NcclxuICAgKlxyXG4gICAqL1xyXG4gIGNsYXNzIFNjcm9sbFNweSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdCBTY3JvbGxTcHkgaW5zdGFuY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgc3VwZXIoU2Nyb2xsU3B5LCBlbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmVsLk1fU2Nyb2xsU3B5ID0gdGhpcztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBPcHRpb25zIGZvciB0aGUgbW9kYWxcclxuICAgICAgICogQG1lbWJlciBNb2RhbCNvcHRpb25zXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IFt0aHJvdHRsZT0xMDBdIC0gVGhyb3R0bGUgb2Ygc2Nyb2xsIGhhbmRsZXJcclxuICAgICAgICogQHByb3Age051bWJlcn0gW3Njcm9sbE9mZnNldD0yMDBdIC0gT2Zmc2V0IGZvciBjZW50ZXJpbmcgZWxlbWVudCB3aGVuIHNjcm9sbGVkIHRvXHJcbiAgICAgICAqIEBwcm9wIHtTdHJpbmd9IFthY3RpdmVDbGFzcz0nYWN0aXZlJ10gLSBDbGFzcyBhcHBsaWVkIHRvIGFjdGl2ZSBlbGVtZW50c1xyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IFtnZXRBY3RpdmVFbGVtZW50XSAtIFVzZWQgdG8gZmluZCBhY3RpdmUgZWxlbWVudFxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFNjcm9sbFNweS5kZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAvLyBzZXR1cFxyXG4gICAgICBTY3JvbGxTcHkuX2VsZW1lbnRzLnB1c2godGhpcyk7XHJcbiAgICAgIFNjcm9sbFNweS5fY291bnQrKztcclxuICAgICAgU2Nyb2xsU3B5Ll9pbmNyZW1lbnQrKztcclxuICAgICAgdGhpcy50aWNrSWQgPSAtMTtcclxuICAgICAgdGhpcy5pZCA9IFNjcm9sbFNweS5faW5jcmVtZW50O1xyXG4gICAgICB0aGlzLl9zZXR1cEV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgdGhpcy5faGFuZGxlV2luZG93U2Nyb2xsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fU2Nyb2xsU3B5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVhcmRvd24gY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgIFNjcm9sbFNweS5fZWxlbWVudHMuc3BsaWNlKFNjcm9sbFNweS5fZWxlbWVudHMuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgIFNjcm9sbFNweS5fZWxlbWVudHNJblZpZXcuc3BsaWNlKFNjcm9sbFNweS5fZWxlbWVudHNJblZpZXcuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgIFNjcm9sbFNweS5fdmlzaWJsZUVsZW1lbnRzLnNwbGljZShTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50cy5pbmRleE9mKHRoaXMuJGVsKSwgMSk7XHJcbiAgICAgIFNjcm9sbFNweS5fY291bnQtLTtcclxuICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAkKHRoaXMub3B0aW9ucy5nZXRBY3RpdmVFbGVtZW50KHRoaXMuJGVsLmF0dHIoJ2lkJykpKS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xyXG4gICAgICB0aGlzLmVsLk1fU2Nyb2xsU3B5ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgRXZlbnQgSGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgX3NldHVwRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgbGV0IHRocm90dGxlZFJlc2l6ZSA9IE0udGhyb3R0bGUodGhpcy5faGFuZGxlV2luZG93U2Nyb2xsLCAyMDApO1xyXG4gICAgICB0aGlzLl9oYW5kbGVUaHJvdHRsZWRSZXNpemVCb3VuZCA9IHRocm90dGxlZFJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVXaW5kb3dTY3JvbGxCb3VuZCA9IHRoaXMuX2hhbmRsZVdpbmRvd1Njcm9sbC5iaW5kKHRoaXMpO1xyXG4gICAgICBpZiAoU2Nyb2xsU3B5Ll9jb3VudCA9PT0gMSkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVXaW5kb3dTY3JvbGxCb3VuZCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVRocm90dGxlZFJlc2l6ZUJvdW5kKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlVHJpZ2dlckNsaWNrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9yZW1vdmVFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICBpZiAoU2Nyb2xsU3B5Ll9jb3VudCA9PT0gMCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVXaW5kb3dTY3JvbGxCb3VuZCk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVRocm90dGxlZFJlc2l6ZUJvdW5kKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlVHJpZ2dlckNsaWNrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIFRyaWdnZXIgQ2xpY2tcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZVRyaWdnZXJDbGljayhlKSB7XHJcbiAgICAgIGxldCAkdHJpZ2dlciA9ICQoZS50YXJnZXQpO1xyXG4gICAgICBmb3IgKGxldCBpID0gU2Nyb2xsU3B5Ll9lbGVtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIGxldCBzY3JvbGxzcHkgPSBTY3JvbGxTcHkuX2VsZW1lbnRzW2ldO1xyXG4gICAgICAgIGlmICgkdHJpZ2dlci5pcygnYVtocmVmPVwiIycgKyBzY3JvbGxzcHkuJGVsLmF0dHIoJ2lkJykgKyAnXCJdJykpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIGxldCBvZmZzZXQgPSBzY3JvbGxzcHkuJGVsLm9mZnNldCgpLnRvcCArIDE7XHJcblxyXG4gICAgICAgICAgYW5pbSh7XHJcbiAgICAgICAgICAgIHRhcmdldHM6IFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLFxyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IG9mZnNldCAtIHNjcm9sbHNweS5vcHRpb25zLnNjcm9sbE9mZnNldCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQwMCxcclxuICAgICAgICAgICAgZWFzaW5nOiAnZWFzZU91dEN1YmljJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBXaW5kb3cgU2Nyb2xsXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVXaW5kb3dTY3JvbGwoKSB7XHJcbiAgICAgIC8vIHVuaXF1ZSB0aWNrIGlkXHJcbiAgICAgIFNjcm9sbFNweS5fdGlja3MrKztcclxuXHJcbiAgICAgIC8vIHZpZXdwb3J0IHJlY3RhbmdsZVxyXG4gICAgICBsZXQgdG9wID0gTS5nZXREb2N1bWVudFNjcm9sbFRvcCgpLFxyXG4gICAgICAgIGxlZnQgPSBNLmdldERvY3VtZW50U2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgIHJpZ2h0ID0gbGVmdCArIHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgIGJvdHRvbSA9IHRvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBlbGVtZW50cyBhcmUgaW4gdmlld1xyXG4gICAgICBsZXQgaW50ZXJzZWN0aW9ucyA9IFNjcm9sbFNweS5fZmluZEVsZW1lbnRzKHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW50ZXJzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzY3JvbGxzcHkgPSBpbnRlcnNlY3Rpb25zW2ldO1xyXG4gICAgICAgIGxldCBsYXN0VGljayA9IHNjcm9sbHNweS50aWNrSWQ7XHJcbiAgICAgICAgaWYgKGxhc3RUaWNrIDwgMCkge1xyXG4gICAgICAgICAgLy8gZW50ZXJlZCBpbnRvIHZpZXdcclxuICAgICAgICAgIHNjcm9sbHNweS5fZW50ZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aWNrIGlkXHJcbiAgICAgICAgc2Nyb2xsc3B5LnRpY2tJZCA9IFNjcm9sbFNweS5fdGlja3M7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU2Nyb2xsU3B5Ll9lbGVtZW50c0luVmlldy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzY3JvbGxzcHkgPSBTY3JvbGxTcHkuX2VsZW1lbnRzSW5WaWV3W2ldO1xyXG4gICAgICAgIGxldCBsYXN0VGljayA9IHNjcm9sbHNweS50aWNrSWQ7XHJcbiAgICAgICAgaWYgKGxhc3RUaWNrID49IDAgJiYgbGFzdFRpY2sgIT09IFNjcm9sbFNweS5fdGlja3MpIHtcclxuICAgICAgICAgIC8vIGV4aXRlZCBmcm9tIHZpZXdcclxuICAgICAgICAgIHNjcm9sbHNweS5fZXhpdCgpO1xyXG4gICAgICAgICAgc2Nyb2xsc3B5LnRpY2tJZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVtZW1iZXIgZWxlbWVudHMgaW4gdmlldyBmb3IgbmV4dCB0aWNrXHJcbiAgICAgIFNjcm9sbFNweS5fZWxlbWVudHNJblZpZXcgPSBpbnRlcnNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBlbGVtZW50cyB0aGF0IGFyZSB3aXRoaW4gdGhlIGJvdW5kYXJ5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG9wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmlnaHRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b21cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0XHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48U2Nyb2xsU3B5Pn0gICBBIGNvbGxlY3Rpb24gb2YgZWxlbWVudHNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9maW5kRWxlbWVudHModG9wLCByaWdodCwgYm90dG9tLCBsZWZ0KSB7XHJcbiAgICAgIGxldCBoaXRzID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU2Nyb2xsU3B5Ll9lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzY3JvbGxzcHkgPSBTY3JvbGxTcHkuX2VsZW1lbnRzW2ldO1xyXG4gICAgICAgIGxldCBjdXJyVG9wID0gdG9wICsgc2Nyb2xsc3B5Lm9wdGlvbnMuc2Nyb2xsT2Zmc2V0IHx8IDIwMDtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbHNweS4kZWwuaGVpZ2h0KCkgPiAwKSB7XHJcbiAgICAgICAgICBsZXQgZWxUb3AgPSBzY3JvbGxzcHkuJGVsLm9mZnNldCgpLnRvcCxcclxuICAgICAgICAgICAgZWxMZWZ0ID0gc2Nyb2xsc3B5LiRlbC5vZmZzZXQoKS5sZWZ0LFxyXG4gICAgICAgICAgICBlbFJpZ2h0ID0gZWxMZWZ0ICsgc2Nyb2xsc3B5LiRlbC53aWR0aCgpLFxyXG4gICAgICAgICAgICBlbEJvdHRvbSA9IGVsVG9wICsgc2Nyb2xsc3B5LiRlbC5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICBsZXQgaXNJbnRlcnNlY3QgPSAhKGVsTGVmdCA+IHJpZ2h0IHx8XHJcbiAgICAgICAgICAgIGVsUmlnaHQgPCBsZWZ0IHx8XHJcbiAgICAgICAgICAgIGVsVG9wID4gYm90dG9tIHx8XHJcbiAgICAgICAgICAgIGVsQm90dG9tIDwgY3VyclRvcCk7XHJcblxyXG4gICAgICAgICAgaWYgKGlzSW50ZXJzZWN0KSB7XHJcbiAgICAgICAgICAgIGhpdHMucHVzaChzY3JvbGxzcHkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaGl0cztcclxuICAgIH1cclxuXHJcbiAgICBfZW50ZXIoKSB7XHJcbiAgICAgIFNjcm9sbFNweS5fdmlzaWJsZUVsZW1lbnRzID0gU2Nyb2xsU3B5Ll92aXNpYmxlRWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5oZWlnaHQoKSAhPSAwO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50c1swXSkge1xyXG4gICAgICAgICQodGhpcy5vcHRpb25zLmdldEFjdGl2ZUVsZW1lbnQoU2Nyb2xsU3B5Ll92aXNpYmxlRWxlbWVudHNbMF0uYXR0cignaWQnKSkpLnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5hY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgaWYgKFNjcm9sbFNweS5fdmlzaWJsZUVsZW1lbnRzWzBdWzBdLk1fU2Nyb2xsU3B5ICYmIHRoaXMuaWQgPCBTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50c1swXVswXS5NX1Njcm9sbFNweS5pZCkge1xyXG4gICAgICAgICAgU2Nyb2xsU3B5Ll92aXNpYmxlRWxlbWVudHMudW5zaGlmdCh0aGlzLiRlbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIFNjcm9sbFNweS5fdmlzaWJsZUVsZW1lbnRzLnB1c2godGhpcy4kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50cy5wdXNoKHRoaXMuJGVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJCh0aGlzLm9wdGlvbnMuZ2V0QWN0aXZlRWxlbWVudChTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50c1swXS5hdHRyKCdpZCcpKSkuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBfZXhpdCgpIHtcclxuICAgICAgU2Nyb2xsU3B5Ll92aXNpYmxlRWxlbWVudHMgPSBTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmhlaWdodCgpICE9IDA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKFNjcm9sbFNweS5fdmlzaWJsZUVsZW1lbnRzWzBdKSB7XHJcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZ2V0QWN0aXZlRWxlbWVudChTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50c1swXS5hdHRyKCdpZCcpKSkucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgU2Nyb2xsU3B5Ll92aXNpYmxlRWxlbWVudHMgPSBTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50cy5maWx0ZXIoKGVsKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZWwuYXR0cignaWQnKSAhPSB0aGlzLiRlbC5hdHRyKCdpZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50c1swXSkgeyAvLyBDaGVjayBpZiBlbXB0eVxyXG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMuZ2V0QWN0aXZlRWxlbWVudChTY3JvbGxTcHkuX3Zpc2libGVFbGVtZW50c1swXS5hdHRyKCdpZCcpKSkuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAbWVtYmVyb2YgU2Nyb2xsU3B5XHJcbiAgICogQHR5cGUge0FycmF5LjxTY3JvbGxTcHk+fVxyXG4gICAqL1xyXG4gIFNjcm9sbFNweS5fZWxlbWVudHMgPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxTcHlcclxuICAgKiBAdHlwZSB7QXJyYXkuPFNjcm9sbFNweT59XHJcbiAgICovXHJcbiAgU2Nyb2xsU3B5Ll9lbGVtZW50c0luVmlldyA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIFNjcm9sbFNweVxyXG4gICAqIEB0eXBlIHtBcnJheS48Y2FzaD59XHJcbiAgICovXHJcbiAgU2Nyb2xsU3B5Ll92aXNpYmxlRWxlbWVudHMgPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxTcHlcclxuICAgKi9cclxuICBTY3JvbGxTcHkuX2NvdW50ID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxTcHlcclxuICAgKi9cclxuICBTY3JvbGxTcHkuX2luY3JlbWVudCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAbWVtYmVyb2YgU2Nyb2xsU3B5XHJcbiAgICovXHJcbiAgU2Nyb2xsU3B5Ll90aWNrcyA9IDA7XHJcblxyXG5cclxuICBNLlNjcm9sbFNweSA9IFNjcm9sbFNweTtcclxuXHJcbiAgaWYgKE0ualF1ZXJ5TG9hZGVkKSB7XHJcbiAgICBNLmluaXRpYWxpemVKcXVlcnlXcmFwcGVyKFNjcm9sbFNweSwgJ3Njcm9sbFNweScsICdNX1Njcm9sbFNweScpO1xyXG4gIH1cclxuXHJcbn0pKGNhc2gsIE0uYW5pbWUpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG4gIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSBsYWJlbHMgb2YgdGV4dCBmaWVsZHNcclxuICBNLnVwZGF0ZVRleHRGaWVsZHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBpbnB1dF9zZWxlY3RvciA9ICdpbnB1dFt0eXBlPXRleHRdLCBpbnB1dFt0eXBlPXBhc3N3b3JkXSwgaW5wdXRbdHlwZT1lbWFpbF0sIGlucHV0W3R5cGU9dXJsXSwgaW5wdXRbdHlwZT10ZWxdLCBpbnB1dFt0eXBlPW51bWJlcl0sIGlucHV0W3R5cGU9c2VhcmNoXSwgdGV4dGFyZWEnO1xyXG4gICAgJChpbnB1dF9zZWxlY3RvcikuZWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICBpZiAoZWxlbWVudC52YWx1ZS5sZW5ndGggPiAwIHx8ICQoZWxlbWVudCkuaXMoJzpmb2N1cycpIHx8IGVsZW1lbnQuYXV0b2ZvY3VzIHx8ICR0aGlzLmF0dHIoJ3BsYWNlaG9sZGVyJykgIT09IG51bGwpIHtcclxuICAgICAgICAkdGhpcy5zaWJsaW5ncygnbGFiZWwnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC52YWxpZGl0eSkge1xyXG4gICAgICAgICR0aGlzLnNpYmxpbmdzKCdsYWJlbCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCBlbGVtZW50LnZhbGlkaXR5LmJhZElucHV0ID09PSB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkdGhpcy5zaWJsaW5ncygnbGFiZWwnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIE0udmFsaWRhdGVfZmllbGQgPSBmdW5jdGlvbihvYmplY3QpIHtcclxuICAgIGxldCBoYXNMZW5ndGggPSBvYmplY3QuYXR0cignZGF0YS1sZW5ndGgnKSAhPT0gbnVsbDtcclxuICAgIGxldCBsZW5BdHRyID0gcGFyc2VJbnQob2JqZWN0LmF0dHIoJ2RhdGEtbGVuZ3RoJykpO1xyXG4gICAgbGV0IGxlbiA9IG9iamVjdFswXS52YWx1ZS5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGxlbiA9PT0gMCAmJiBvYmplY3RbMF0udmFsaWRpdHkuYmFkSW5wdXQgPT09IGZhbHNlICYmICFvYmplY3QuaXMoJzpyZXF1aXJlZCcpKSB7XHJcbiAgICAgIGlmIChvYmplY3QuaGFzQ2xhc3MoJ3ZhbGlkYXRlJykpIHtcclxuICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XHJcbiAgICAgICAgb2JqZWN0LnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAob2JqZWN0Lmhhc0NsYXNzKCd2YWxpZGF0ZScpKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGNoYXJhY3RlciBjb3VudGVyIGF0dHJpYnV0ZXNcclxuICAgICAgICBpZiAoKG9iamVjdC5pcygnOnZhbGlkJykgJiYgaGFzTGVuZ3RoICYmIChsZW4gPD0gbGVuQXR0cikpIHx8IChvYmplY3QuaXMoJzp2YWxpZCcpICYmICFoYXNMZW5ndGgpKSB7XHJcbiAgICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcclxuICAgICAgICAgIG9iamVjdC5hZGRDbGFzcygndmFsaWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICBvYmplY3QuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgTS50ZXh0YXJlYUF1dG9SZXNpemUgPSBmdW5jdGlvbigkdGV4dGFyZWEpIHtcclxuICAgIC8vIFdyYXAgaWYgbmF0aXZlIGVsZW1lbnRcclxuICAgIGlmICgkdGV4dGFyZWEgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgICR0ZXh0YXJlYSA9ICQoJHRleHRhcmVhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUZXh0YXJlYSBBdXRvIFJlc2l6ZVxyXG4gICAgbGV0IGhpZGRlbkRpdiA9ICQoJy5oaWRkZW5kaXYnKS5maXJzdCgpO1xyXG4gICAgaWYgKCFoaWRkZW5EaXYubGVuZ3RoKSB7XHJcbiAgICAgIGhpZGRlbkRpdiA9ICQoJzxkaXYgY2xhc3M9XCJoaWRkZW5kaXYgY29tbW9uXCI+PC9kaXY+Jyk7XHJcbiAgICAgICQoJ2JvZHknKS5hcHBlbmQoaGlkZGVuRGl2KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgZm9udCBwcm9wZXJ0aWVzIG9mIGhpZGRlbkRpdlxyXG4gICAgbGV0IGZvbnRGYW1pbHkgPSAkdGV4dGFyZWEuY3NzKCdmb250LWZhbWlseScpO1xyXG4gICAgbGV0IGZvbnRTaXplID0gJHRleHRhcmVhLmNzcygnZm9udC1zaXplJyk7XHJcbiAgICBsZXQgbGluZUhlaWdodCA9ICR0ZXh0YXJlYS5jc3MoJ2xpbmUtaGVpZ2h0Jyk7XHJcblxyXG4gICAgLy8gRmlyZWZveCBjYW4ndCBoYW5kbGUgcGFkZGluZyBzaG9ydGhhbmQuXHJcbiAgICBsZXQgcGFkZGluZ1RvcCA9ICR0ZXh0YXJlYS5jc3MoJ3BhZGRpbmctdG9wJyk7XHJcbiAgICBsZXQgcGFkZGluZ1JpZ2h0ID0gJHRleHRhcmVhLmNzcygncGFkZGluZy1yaWdodCcpO1xyXG4gICAgbGV0IHBhZGRpbmdCb3R0b20gPSAkdGV4dGFyZWEuY3NzKCdwYWRkaW5nLWJvdHRvbScpO1xyXG4gICAgbGV0IHBhZGRpbmdMZWZ0ID0gJHRleHRhcmVhLmNzcygncGFkZGluZy1sZWZ0Jyk7XHJcblxyXG4gICAgaWYgKGZvbnRTaXplKSB7IGhpZGRlbkRpdi5jc3MoJ2ZvbnQtc2l6ZScsIGZvbnRTaXplKTsgfVxyXG4gICAgaWYgKGZvbnRGYW1pbHkpIHsgaGlkZGVuRGl2LmNzcygnZm9udC1mYW1pbHknLCBmb250RmFtaWx5KTsgfVxyXG4gICAgaWYgKGxpbmVIZWlnaHQpIHsgaGlkZGVuRGl2LmNzcygnbGluZS1oZWlnaHQnLCBsaW5lSGVpZ2h0KTsgfVxyXG4gICAgaWYgKHBhZGRpbmdUb3ApIHsgaGlkZGVuRGl2LmNzcygncGFkZGluZy10b3AnLCBwYWRkaW5nVG9wKTsgfVxyXG4gICAgaWYgKHBhZGRpbmdSaWdodCkgeyBoaWRkZW5EaXYuY3NzKCdwYWRkaW5nLXJpZ2h0JywgcGFkZGluZ1JpZ2h0KTsgfVxyXG4gICAgaWYgKHBhZGRpbmdCb3R0b20pIHsgaGlkZGVuRGl2LmNzcygncGFkZGluZy1ib3R0b20nLCBwYWRkaW5nQm90dG9tKTsgfVxyXG4gICAgaWYgKHBhZGRpbmdMZWZ0KSB7IGhpZGRlbkRpdi5jc3MoJ3BhZGRpbmctbGVmdCcsIHBhZGRpbmdMZWZ0KTsgfVxyXG5cclxuICAgIC8vIFNldCBvcmlnaW5hbC1oZWlnaHQsIGlmIG5vbmVcclxuICAgIGlmICghJHRleHRhcmVhLmRhdGEoJ29yaWdpbmFsLWhlaWdodCcpKSB7XHJcbiAgICAgICR0ZXh0YXJlYS5kYXRhKCdvcmlnaW5hbC1oZWlnaHQnLCAkdGV4dGFyZWEuaGVpZ2h0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkdGV4dGFyZWEuYXR0cignd3JhcCcpID09PSAnb2ZmJykge1xyXG4gICAgICBoaWRkZW5EaXYuY3NzKCdvdmVyZmxvdy13cmFwJywgJ25vcm1hbCcpXHJcbiAgICAgICAgLmNzcygnd2hpdGUtc3BhY2UnLCAncHJlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZGVuRGl2LnRleHQoJHRleHRhcmVhWzBdLnZhbHVlICsgJ1xcbicpO1xyXG4gICAgbGV0IGNvbnRlbnQgPSBoaWRkZW5EaXYuaHRtbCgpLnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xyXG4gICAgaGlkZGVuRGl2Lmh0bWwoY29udGVudCk7XHJcblxyXG5cclxuICAgIC8vIFdoZW4gdGV4dGFyZWEgaXMgaGlkZGVuLCB3aWR0aCBnb2VzIGNyYXp5LlxyXG4gICAgLy8gQXBwcm94aW1hdGUgd2l0aCBoYWxmIG9mIHdpbmRvdyBzaXplXHJcblxyXG4gICAgaWYgKCR0ZXh0YXJlYS5jc3MoJ2Rpc3BsYXknKSAhPT0gJ2hpZGRlbicpIHtcclxuICAgICAgaGlkZGVuRGl2LmNzcygnd2lkdGgnLCAkdGV4dGFyZWEud2lkdGgoKSArICdweCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGhpZGRlbkRpdi5jc3MoJ3dpZHRoJywgKCQod2luZG93KS53aWR0aCgpLzIpICsgJ3B4Jyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIGlmIHRoZSBuZXcgaGVpZ2h0IGlzIGdyZWF0ZXIgdGhhbiB0aGVcclxuICAgICAqIG9yaWdpbmFsIGhlaWdodCBvZiB0aGUgdGV4dGFyZWFcclxuICAgICAqL1xyXG4gICAgaWYgKCR0ZXh0YXJlYS5kYXRhKCdvcmlnaW5hbC1oZWlnaHQnKSA8PSBoaWRkZW5EaXYuaW5uZXJIZWlnaHQoKSkge1xyXG4gICAgICAkdGV4dGFyZWEuY3NzKCdoZWlnaHQnLCBoaWRkZW5EaXYuaW5uZXJIZWlnaHQoKSArICdweCcpO1xyXG4gICAgfSBlbHNlIGlmICgkdGV4dGFyZWFbMF0udmFsdWUubGVuZ3RoIDwgJHRleHRhcmVhLmRhdGEoJ3ByZXZpb3VzLWxlbmd0aCcpKSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBJbiBjYXNlIHRoZSBuZXcgaGVpZ2h0IGlzIGxlc3MgdGhhbiBvcmlnaW5hbCBoZWlnaHQsIGl0XHJcbiAgICAgICAqIG1lYW5zIHRoZSB0ZXh0YXJlYSBoYXMgbGVzcyB0ZXh0IHRoYW4gYmVmb3JlXHJcbiAgICAgICAqIFNvIHdlIHNldCB0aGUgaGVpZ2h0IHRvIHRoZSBvcmlnaW5hbCBvbmVcclxuICAgICAgICovXHJcbiAgICAgICR0ZXh0YXJlYS5jc3MoJ2hlaWdodCcsICR0ZXh0YXJlYS5kYXRhKCdvcmlnaW5hbC1oZWlnaHQnKSArICdweCcpO1xyXG4gICAgfVxyXG4gICAgJHRleHRhcmVhLmRhdGEoJ3ByZXZpb3VzLWxlbmd0aCcsICR0ZXh0YXJlYVswXS52YWx1ZS5sZW5ndGgpO1xyXG4gIH07XHJcblxyXG5cclxuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vIFRleHQgYmFzZWQgaW5wdXRzXHJcbiAgICBsZXQgaW5wdXRfc2VsZWN0b3IgPSAnaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPXVybF0sIGlucHV0W3R5cGU9dGVsXSwgaW5wdXRbdHlwZT1udW1iZXJdLCBpbnB1dFt0eXBlPXNlYXJjaF0sIHRleHRhcmVhJztcclxuXHJcbiAgICAvLyBBZGQgYWN0aXZlIGlmIGZvcm0gYXV0byBjb21wbGV0ZVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsIGlucHV0X3NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKHRoaXMudmFsdWUubGVuZ3RoICE9PSAwIHx8ICQodGhpcykuYXR0cigncGxhY2Vob2xkZXInKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICQodGhpcykuc2libGluZ3MoJ2xhYmVsJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICAgIE0udmFsaWRhdGVfZmllbGQoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgYWN0aXZlIGlmIGlucHV0IGVsZW1lbnQgaGFzIGJlZW4gcHJlLXBvcHVsYXRlZCBvbiBkb2N1bWVudCByZWFkeVxyXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgIE0udXBkYXRlVGV4dEZpZWxkcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSFRNTCBET00gRk9STSBSRVNFVCBoYW5kbGluZ1xyXG4gICAgJChkb2N1bWVudCkub24oJ3Jlc2V0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBsZXQgZm9ybVJlc2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgIGlmIChmb3JtUmVzZXQuaXMoJ2Zvcm0nKSkge1xyXG4gICAgICAgIGZvcm1SZXNldC5maW5kKGlucHV0X3NlbGVjdG9yKS5yZW1vdmVDbGFzcygndmFsaWQnKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xyXG4gICAgICAgIGZvcm1SZXNldC5maW5kKGlucHV0X3NlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnbGFiZWwnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHNlbGVjdCAoYWZ0ZXIgbmF0aXZlIHJlc2V0KVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBmb3JtUmVzZXQuZmluZCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluaXRpYWxpemVkXHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1fU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgbGV0IHJlc2V0X3RleHQgPSAkKHRoaXMpLmZpbmQoJ29wdGlvbltzZWxlY3RlZF0nKS50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnaW5wdXQuc2VsZWN0LWRyb3Bkb3duJylbMF0udmFsdWUgPSByZXNldF90ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYWN0aXZlIHdoZW4gZWxlbWVudCBoYXMgZm9jdXNcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyhpbnB1dF9zZWxlY3RvcikpIHtcclxuICAgICAgICAkKGUudGFyZ2V0KS5zaWJsaW5ncygnbGFiZWwsIC5wcmVmaXgnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRydWUpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGFjdGl2ZSB3aGVuIGVsZW1lbnQgaXMgYmx1cnJlZFxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBsZXQgJGlucHV0RWxlbWVudCA9ICQoZS50YXJnZXQpO1xyXG4gICAgICBpZiAoJGlucHV0RWxlbWVudC5pcyhpbnB1dF9zZWxlY3RvcikpIHtcclxuICAgICAgICBsZXQgc2VsZWN0b3IgPSBcIi5wcmVmaXhcIjtcclxuXHJcbiAgICAgICAgaWYgKCRpbnB1dEVsZW1lbnRbMF0udmFsdWUubGVuZ3RoID09PSAwICYmICRpbnB1dEVsZW1lbnRbMF0udmFsaWRpdHkuYmFkSW5wdXQgIT09IHRydWUgJiYgJGlucHV0RWxlbWVudC5hdHRyKCdwbGFjZWhvbGRlcicpID09PSBudWxsKSB7XHJcbiAgICAgICAgICBzZWxlY3RvciArPSBcIiwgbGFiZWxcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGlucHV0RWxlbWVudC5zaWJsaW5ncyhzZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIE0udmFsaWRhdGVfZmllbGQoJGlucHV0RWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRydWUpO1xyXG5cclxuICAgIC8vIFJhZGlvIGFuZCBDaGVja2JveCBmb2N1cyBjbGFzc1xyXG4gICAgbGV0IHJhZGlvX2NoZWNrYm94ID0gJ2lucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XSc7XHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCByYWRpb19jaGVja2JveCwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAvLyBUQUIsIGNoZWNrIGlmIHRhYmJpbmcgdG8gcmFkaW8gb3IgY2hlY2tib3guXHJcbiAgICAgIGlmIChlLndoaWNoID09PSBNLmtleXMuVEFCKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygndGFiYmVkJyk7XHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAkdGhpcy5vbmUoJ2JsdXInLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCd0YWJiZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0ZXh0X2FyZWFfc2VsZWN0b3IgPSAnLm1hdGVyaWFsaXplLXRleHRhcmVhJztcclxuICAgICQodGV4dF9hcmVhX3NlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0ICR0ZXh0YXJlYSA9ICQodGhpcyk7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBSZXNpemUgdGV4dGFyZWEgb24gZG9jdW1lbnQgbG9hZCBhZnRlciBzdG9yaW5nXHJcbiAgICAgICAqIHRoZSBvcmlnaW5hbCBoZWlnaHQgYW5kIHRoZSBvcmlnaW5hbCBsZW5ndGhcclxuICAgICAgICovXHJcbiAgICAgICR0ZXh0YXJlYS5kYXRhKCdvcmlnaW5hbC1oZWlnaHQnLCAkdGV4dGFyZWEuaGVpZ2h0KCkpO1xyXG4gICAgICAkdGV4dGFyZWEuZGF0YSgncHJldmlvdXMtbGVuZ3RoJywgdGhpcy52YWx1ZS5sZW5ndGgpO1xyXG4gICAgICBNLnRleHRhcmVhQXV0b1Jlc2l6ZSgkdGV4dGFyZWEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgdGV4dF9hcmVhX3NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIE0udGV4dGFyZWFBdXRvUmVzaXplKCQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIHRleHRfYXJlYV9zZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBNLnRleHRhcmVhQXV0b1Jlc2l6ZSgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpbGUgSW5wdXQgUGF0aFxyXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcuZmlsZS1maWVsZCBpbnB1dFt0eXBlPVwiZmlsZVwiXScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGZpbGVfZmllbGQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5maWxlLWZpZWxkJyk7XHJcbiAgICAgIGxldCBwYXRoX2lucHV0ID0gZmlsZV9maWVsZC5maW5kKCdpbnB1dC5maWxlLXBhdGgnKTtcclxuICAgICAgbGV0IGZpbGVzICAgICAgPSAkKHRoaXMpWzBdLmZpbGVzO1xyXG4gICAgICBsZXQgZmlsZV9uYW1lcyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZmlsZV9uYW1lcy5wdXNoKGZpbGVzW2ldLm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHBhdGhfaW5wdXRbMF0udmFsdWUgPSBmaWxlX25hbWVzLmpvaW4oXCIsIFwiKTtcclxuICAgICAgcGF0aF9pbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgIH0pO1xyXG5cclxuICB9KTsgLy8gRW5kIG9mICQoZG9jdW1lbnQpLnJlYWR5XHJcbn0oIGNhc2ggKSk7XHJcblxuKGZ1bmN0aW9uICgkLCBhbmltKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBsZXQgX2RlZmF1bHRzID0ge1xyXG4gICAgaW5kaWNhdG9yczogdHJ1ZSxcclxuICAgIGhlaWdodDogNDAwLFxyXG4gICAgZHVyYXRpb246IDUwMCxcclxuICAgIGludGVydmFsOiA2MDAwXHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEBjbGFzc1xyXG4gICAqXHJcbiAgICovXHJcbiAgY2xhc3MgU2xpZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IFNsaWRlciBpbnN0YW5jZSBhbmQgc2V0IHVwIG92ZXJsYXlcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgc3VwZXIoU2xpZGVyLCBlbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmVsLk1fU2xpZGVyID0gdGhpcztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBPcHRpb25zIGZvciB0aGUgbW9kYWxcclxuICAgICAgICogQG1lbWJlciBTbGlkZXIjb3B0aW9uc1xyXG4gICAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gW2luZGljYXRvcnM9dHJ1ZV0gLSBTaG93IGluZGljYXRvcnNcclxuICAgICAgICogQHByb3Age051bWJlcn0gW2hlaWdodD00MDBdIC0gaGVpZ2h0IG9mIHNsaWRlclxyXG4gICAgICAgKiBAcHJvcCB7TnVtYmVyfSBbZHVyYXRpb249NTAwXSAtIExlbmd0aCBpbiBtcyBvZiBzbGlkZSB0cmFuc2l0aW9uXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IFtpbnRlcnZhbD02MDAwXSAtIExlbmd0aCBpbiBtcyBvZiBzbGlkZSBpbnRlcnZhbFxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFNsaWRlci5kZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAvLyBzZXR1cFxyXG4gICAgICB0aGlzLiRzbGlkZXIgPSB0aGlzLiRlbC5maW5kKCcuc2xpZGVzJyk7XHJcbiAgICAgIHRoaXMuJHNsaWRlcyA9IHRoaXMuJHNsaWRlci5jaGlsZHJlbignbGknKTtcclxuICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IHRoaXMuJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT0gLTEpIHtcclxuICAgICAgICB0aGlzLiRhY3RpdmUgPSB0aGlzLiRzbGlkZXMuZXEodGhpcy5hY3RpdmVJbmRleCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3NldFNsaWRlckhlaWdodCgpO1xyXG5cclxuICAgICAgLy8gU2V0IGluaXRpYWwgcG9zaXRpb25zIG9mIGNhcHRpb25zXHJcbiAgICAgIHRoaXMuJHNsaWRlcy5maW5kKCcuY2FwdGlvbicpLmVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZUNhcHRpb25JbihlbCwgMCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gTW92ZSBpbWcgc3JjIGludG8gYmFja2dyb3VuZC1pbWFnZVxyXG4gICAgICB0aGlzLiRzbGlkZXMuZmluZCgnaW1nJykuZWFjaCgoZWwpID0+IHtcclxuICAgICAgICBsZXQgcGxhY2Vob2xkZXJCYXNlNjQgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUJBUC8vL3dBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PSc7XHJcbiAgICAgICAgaWYgKCQoZWwpLmF0dHIoJ3NyYycpICE9PSBwbGFjZWhvbGRlckJhc2U2NCkge1xyXG4gICAgICAgICAgJChlbCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybChcIicgKyAkKGVsKS5hdHRyKCdzcmMnKSArICdcIiknKTtcclxuICAgICAgICAgICQoZWwpLmF0dHIoJ3NyYycsIHBsYWNlaG9sZGVyQmFzZTY0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fc2V0dXBJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAvLyBTaG93IGFjdGl2ZSBzbGlkZVxyXG4gICAgICBpZiAodGhpcy4kYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJHNsaWRlcy5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBhbmltKHtcclxuICAgICAgICAgIHRhcmdldHM6IHRoaXMuJHNsaWRlcy5maXJzdCgpWzBdLFxyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlID0gdGhpcy4kc2xpZGVzLmVxKHRoaXMuYWN0aXZlSW5kZXgpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgaW5kaWNhdG9yc1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW5kaWNhdG9ycykge1xyXG4gICAgICAgICAgdGhpcy4kaW5kaWNhdG9ycy5lcSh0aGlzLmFjdGl2ZUluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBZGp1c3QgaGVpZ2h0IHRvIGN1cnJlbnQgc2xpZGVcclxuICAgICAgdGhpcy4kYWN0aXZlLmZpbmQoJ2ltZycpLmVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgYW5pbSh7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0aGlzLiRhY3RpdmUuZmluZCgnLmNhcHRpb24nKVswXSxcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICB0cmFuc2xhdGVYOiAwLFxyXG4gICAgICAgICAgdHJhbnNsYXRlWTogMCxcclxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCdcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLl9zZXR1cEV2ZW50SGFuZGxlcnMoKTtcclxuXHJcbiAgICAgIC8vIGF1dG8gc2Nyb2xsXHJcbiAgICAgIHRoaXMuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xyXG4gICAgICByZXR1cm4gX2RlZmF1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbml0KGVscywgb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuaW5pdCh0aGlzLCBlbHMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZShlbCkge1xyXG4gICAgICBsZXQgZG9tRWxlbSA9ICEhZWwuanF1ZXJ5ID8gZWxbMF0gOiBlbDtcclxuICAgICAgcmV0dXJuIGRvbUVsZW0uTV9TbGlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWFyZG93biBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICB0aGlzLl9yZW1vdmVJbmRpY2F0b3JzKCk7XHJcbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgdGhpcy5lbC5NX1NsaWRlciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUludGVydmFsQm91bmQgPSB0aGlzLl9oYW5kbGVJbnRlcnZhbC5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVJbmRpY2F0b3JDbGlja0JvdW5kID0gdGhpcy5faGFuZGxlSW5kaWNhdG9yQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW5kaWNhdG9ycykge1xyXG4gICAgICAgIHRoaXMuJGluZGljYXRvcnMuZWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlSW5kaWNhdG9yQ2xpY2tCb3VuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBFdmVudCBIYW5kbGVyc1xyXG4gICAgICovXHJcbiAgICBfcmVtb3ZlRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgdGhpcy4kaW5kaWNhdG9ycy5lYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVJbmRpY2F0b3JDbGlja0JvdW5kKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGluZGljYXRvciBjbGlja1xyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlSW5kaWNhdG9yQ2xpY2soZSkge1xyXG4gICAgICBsZXQgY3VyckluZGV4ID0gJChlLnRhcmdldCkuaW5kZXgoKTtcclxuICAgICAgdGhpcy5zZXQoY3VyckluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBJbnRlcnZhbFxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlSW50ZXJ2YWwoKSB7XHJcbiAgICAgIGxldCBuZXdBY3RpdmVJbmRleCA9IHRoaXMuJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgaWYgKHRoaXMuJHNsaWRlcy5sZW5ndGggPT09IG5ld0FjdGl2ZUluZGV4ICsgMSkgbmV3QWN0aXZlSW5kZXggPSAwOyAvLyBsb29wIHRvIHN0YXJ0XHJcbiAgICAgIGVsc2UgbmV3QWN0aXZlSW5kZXggKz0gMTtcclxuXHJcbiAgICAgIHRoaXMuc2V0KG5ld0FjdGl2ZUluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hdGUgaW4gY2FwdGlvblxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBjYXB0aW9uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgX2FuaW1hdGVDYXB0aW9uSW4oY2FwdGlvbiwgZHVyYXRpb24pIHtcclxuICAgICAgbGV0IGFuaW1PcHRpb25zID0ge1xyXG4gICAgICAgIHRhcmdldHM6IGNhcHRpb24sXHJcbiAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoJChjYXB0aW9uKS5oYXNDbGFzcygnY2VudGVyLWFsaWduJykpIHtcclxuICAgICAgICBhbmltT3B0aW9ucy50cmFuc2xhdGVZID0gLTEwMDtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAoJChjYXB0aW9uKS5oYXNDbGFzcygncmlnaHQtYWxpZ24nKSkge1xyXG4gICAgICAgIGFuaW1PcHRpb25zLnRyYW5zbGF0ZVggPSAxMDA7XHJcblxyXG4gICAgICB9IGVsc2UgaWYgKCQoY2FwdGlvbikuaGFzQ2xhc3MoJ2xlZnQtYWxpZ24nKSkge1xyXG4gICAgICAgIGFuaW1PcHRpb25zLnRyYW5zbGF0ZVggPSAtMTAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbmltKGFuaW1PcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBoZWlnaHQgb2Ygc2xpZGVyXHJcbiAgICAgKi9cclxuICAgIF9zZXRTbGlkZXJIZWlnaHQoKSB7XHJcbiAgICAgIC8vIElmIGZ1bGxzY3JlZW4sIGRvIG5vdGhpbmdcclxuICAgICAgaWYgKCF0aGlzLiRlbC5oYXNDbGFzcygnZnVsbHNjcmVlbicpKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICAvLyBBZGQgaGVpZ2h0IGlmIGluZGljYXRvcnMgYXJlIHByZXNlbnRcclxuICAgICAgICAgIHRoaXMuJGVsLmNzcygnaGVpZ2h0JywgKHRoaXMub3B0aW9ucy5oZWlnaHQgKyA0MCkgKyAncHgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy4kZWwuY3NzKCdoZWlnaHQnLCB0aGlzLm9wdGlvbnMuaGVpZ2h0ICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJHNsaWRlci5jc3MoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQgKyAncHgnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgaW5kaWNhdG9yc1xyXG4gICAgICovXHJcbiAgICBfc2V0dXBJbmRpY2F0b3JzKCkge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmluZGljYXRvcnMpIHtcclxuICAgICAgICB0aGlzLiRpbmRpY2F0b3JzID0gJCgnPHVsIGNsYXNzPVwiaW5kaWNhdG9yc1wiPjwvdWw+Jyk7XHJcbiAgICAgICAgdGhpcy4kc2xpZGVzLmVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgbGV0ICRpbmRpY2F0b3IgPSAkKCc8bGkgY2xhc3M9XCJpbmRpY2F0b3ItaXRlbVwiPjwvbGk+Jyk7XHJcbiAgICAgICAgICB0aGlzLiRpbmRpY2F0b3JzLmFwcGVuZCgkaW5kaWNhdG9yWzBdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy4kaW5kaWNhdG9yc1swXSk7XHJcbiAgICAgICAgdGhpcy4kaW5kaWNhdG9ycyA9IHRoaXMuJGluZGljYXRvcnMuY2hpbGRyZW4oJ2xpLmluZGljYXRvci1pdGVtJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBpbmRpY2F0b3JzXHJcbiAgICAgKi9cclxuICAgIF9yZW1vdmVJbmRpY2F0b3JzKCkge1xyXG4gICAgICB0aGlzLiRlbC5maW5kKCd1bC5pbmRpY2F0b3JzJykucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDeWNsZSB0byBudGggaXRlbVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XHJcbiAgICAgKi9cclxuICAgIHNldChpbmRleCkge1xyXG4gICAgICAvLyBXcmFwIGFyb3VuZCBpbmRpY2VzLlxyXG4gICAgICBpZiAoaW5kZXggPj0gdGhpcy4kc2xpZGVzLmxlbmd0aCkgaW5kZXggPSAwO1xyXG4gICAgICBlbHNlIGlmIChpbmRleCA8IDApIGluZGV4ID0gdGhpcy4kc2xpZGVzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAvLyBPbmx5IGRvIGlmIGluZGV4IGNoYW5nZXNcclxuICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT0gaW5kZXgpIHtcclxuICAgICAgICB0aGlzLiRhY3RpdmUgPSB0aGlzLiRzbGlkZXMuZXEodGhpcy5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgbGV0ICRjYXB0aW9uID0gdGhpcy4kYWN0aXZlLmZpbmQoJy5jYXB0aW9uJyk7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgYW5pbSh7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0aGlzLiRhY3RpdmVbMF0sXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy5kdXJhdGlvbixcclxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJyxcclxuICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNsaWRlcy5ub3QoJy5hY3RpdmUnKS5lYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgIGFuaW0oe1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogZWwsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogMCxcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVk6IDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZUNhcHRpb25JbigkY2FwdGlvblswXSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGluZGljYXRvcnNcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmluZGljYXRvcnMpIHtcclxuICAgICAgICAgIHRoaXMuJGluZGljYXRvcnMuZXEodGhpcy5hY3RpdmVJbmRleCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy4kaW5kaWNhdG9ycy5lcShpbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbSh7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0aGlzLiRzbGlkZXMuZXEoaW5kZXgpWzBdLFxyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuZHVyYXRpb24sXHJcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYW5pbSh7XHJcbiAgICAgICAgICB0YXJnZXRzOiB0aGlzLiRzbGlkZXMuZXEoaW5kZXgpLmZpbmQoJy5jYXB0aW9uJylbMF0sXHJcbiAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgdHJhbnNsYXRlWDogMCxcclxuICAgICAgICAgIHRyYW5zbGF0ZVk6IDAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLmR1cmF0aW9uLFxyXG4gICAgICAgICAgZGVsYXk6IHRoaXMub3B0aW9ucy5kdXJhdGlvbixcclxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRzbGlkZXMuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGludGVydmFsXHJcbiAgICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXVzZSBzbGlkZXIgaW50ZXJ2YWxcclxuICAgICAqL1xyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBzbGlkZXIgaW50ZXJ2YWxcclxuICAgICAqL1xyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICB0aGlzLl9oYW5kbGVJbnRlcnZhbEJvdW5kLCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKyB0aGlzLm9wdGlvbnMuaW50ZXJ2YWxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdG8gbmV4dCBzbGlkZVxyXG4gICAgICovXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICBsZXQgbmV3SW5kZXggPSB0aGlzLmFjdGl2ZUluZGV4ICsgMTtcclxuXHJcbiAgICAgIC8vIFdyYXAgYXJvdW5kIGluZGljZXMuXHJcbiAgICAgIGlmIChuZXdJbmRleCA+PSB0aGlzLiRzbGlkZXMubGVuZ3RoKSBuZXdJbmRleCA9IDA7XHJcbiAgICAgIGVsc2UgaWYgKG5ld0luZGV4IDwgMCkgbmV3SW5kZXggPSB0aGlzLiRzbGlkZXMubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgIHRoaXMuc2V0KG5ld0luZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdG8gcHJldmlvdXMgc2xpZGVcclxuICAgICAqL1xyXG4gICAgcHJldigpIHtcclxuICAgICAgbGV0IG5ld0luZGV4ID0gdGhpcy5hY3RpdmVJbmRleCAtIDE7XHJcblxyXG4gICAgICAvLyBXcmFwIGFyb3VuZCBpbmRpY2VzLlxyXG4gICAgICBpZiAobmV3SW5kZXggPj0gdGhpcy4kc2xpZGVzLmxlbmd0aCkgbmV3SW5kZXggPSAwO1xyXG4gICAgICBlbHNlIGlmIChuZXdJbmRleCA8IDApIG5ld0luZGV4ID0gdGhpcy4kc2xpZGVzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICB0aGlzLnNldChuZXdJbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBNLlNsaWRlciA9IFNsaWRlcjtcclxuXHJcbiAgaWYgKE0ualF1ZXJ5TG9hZGVkKSB7XHJcbiAgICBNLmluaXRpYWxpemVKcXVlcnlXcmFwcGVyKFNsaWRlciwgJ3NsaWRlcicsICdNX1NsaWRlcicpO1xyXG4gIH1cclxuXHJcbn0oY2FzaCwgTS5hbmltZSkpO1xyXG5cbihmdW5jdGlvbiAoJCwgYW5pbSkge1xyXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2FyZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbignLmNhcmQtcmV2ZWFsJykubGVuZ3RoKSB7XHJcbiAgICAgIHZhciAkY2FyZCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5jYXJkJyk7XHJcbiAgICAgIGlmICgkY2FyZC5kYXRhKCdpbml0aWFsT3ZlcmZsb3cnKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgJGNhcmQuZGF0YShcclxuICAgICAgICAgICdpbml0aWFsT3ZlcmZsb3cnLFxyXG4gICAgICAgICAgJGNhcmQuY3NzKCdvdmVyZmxvdycpID09PSB1bmRlZmluZWQgPyAnJyA6ICRjYXJkLmNzcygnb3ZlcmZsb3cnKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0ICRjYXJkUmV2ZWFsID0gJCh0aGlzKS5maW5kKCcuY2FyZC1yZXZlYWwnKTtcclxuICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCQoJy5jYXJkLXJldmVhbCAuY2FyZC10aXRsZScpKSB8fCAkKGUudGFyZ2V0KS5pcygkKCcuY2FyZC1yZXZlYWwgLmNhcmQtdGl0bGUgaScpKSkge1xyXG4gICAgICAgIC8vIE1ha2UgUmV2ZWFsIGFuaW1hdGUgZG93biBhbmQgZGlzcGxheSBub25lXHJcbiAgICAgICAgYW5pbSh7XHJcbiAgICAgICAgICB0YXJnZXRzOiAkY2FyZFJldmVhbFswXSxcclxuICAgICAgICAgIHRyYW5zbGF0ZVk6IDAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjI1LFxyXG4gICAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0UXVhZCcsXHJcbiAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oYW5pbSkge1xyXG4gICAgICAgICAgICBsZXQgZWwgPSBhbmltLmFuaW1hdGFibGVzWzBdLnRhcmdldDtcclxuICAgICAgICAgICAgJChlbCkuY3NzKHsgZGlzcGxheTogJ25vbmUnfSk7XHJcbiAgICAgICAgICAgICRjYXJkLmNzcygnb3ZlcmZsb3cnLCAkY2FyZC5kYXRhKCdpbml0aWFsT3ZlcmZsb3cnKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJChlLnRhcmdldCkuaXMoJCgnLmNhcmQgLmFjdGl2YXRvcicpKSB8fFxyXG4gICAgICAgICAgICAgICAkKGUudGFyZ2V0KS5pcygkKCcuY2FyZCAuYWN0aXZhdG9yIGknKSkgKSB7XHJcbiAgICAgICAgJGNhcmQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAkY2FyZFJldmVhbC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snfSk7XHJcbiAgICAgICAgYW5pbSh7XHJcbiAgICAgICAgICB0YXJnZXRzOiAkY2FyZFJldmVhbFswXSxcclxuICAgICAgICAgIHRyYW5zbGF0ZVk6ICctMTAwJScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0UXVhZCdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59KCBjYXNoLCBNLmFuaW1lKSk7XHJcblxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBsZXQgX2RlZmF1bHRzID0ge1xyXG4gICAgZGF0YTogW10sXHJcbiAgICBwbGFjZWhvbGRlcjogJycsXHJcbiAgICBzZWNvbmRhcnlQbGFjZWhvbGRlcjogJycsXHJcbiAgICBhdXRvY29tcGxldGVPcHRpb25zOiB7fSxcclxuICAgIGxpbWl0OiBJbmZpbml0eSxcclxuICAgIG9uQ2hpcEFkZDogbnVsbCxcclxuICAgIG9uQ2hpcFNlbGVjdDogbnVsbCxcclxuICAgIG9uQ2hpcERlbGV0ZTogbnVsbFxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBjaGlwXHJcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IHRhZyAgY2hpcCB0YWcgc3RyaW5nXHJcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFtpbWFnZV0gIGNoaXAgYXZhdGFyIGltYWdlIHN0cmluZ1xyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBAY2xhc3NcclxuICAgKlxyXG4gICAqL1xyXG4gIGNsYXNzIENoaXBzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IENoaXBzIGluc3RhbmNlIGFuZCBzZXQgdXAgb3ZlcmxheVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucykge1xyXG4gICAgICBzdXBlcihDaGlwcywgZWwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy5lbC5NX0NoaXBzID0gdGhpcztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBPcHRpb25zIGZvciB0aGUgbW9kYWxcclxuICAgICAgICogQG1lbWJlciBDaGlwcyNvcHRpb25zXHJcbiAgICAgICAqIEBwcm9wIHtBcnJheX0gZGF0YVxyXG4gICAgICAgKiBAcHJvcCB7U3RyaW5nfSBwbGFjZWhvbGRlclxyXG4gICAgICAgKiBAcHJvcCB7U3RyaW5nfSBzZWNvbmRhcnlQbGFjZWhvbGRlclxyXG4gICAgICAgKiBAcHJvcCB7T2JqZWN0fSBhdXRvY29tcGxldGVPcHRpb25zXHJcbiAgICAgICAqL1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ2hpcHMuZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2NoaXBzIGlucHV0LWZpZWxkJyk7XHJcbiAgICAgIHRoaXMuY2hpcHNEYXRhID0gW107XHJcbiAgICAgIHRoaXMuJGNoaXBzID0gJCgpO1xyXG4gICAgICB0aGlzLl9zZXR1cElucHV0KCk7XHJcbiAgICAgIHRoaXMuaGFzQXV0b2NvbXBsZXRlID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zLmF1dG9jb21wbGV0ZU9wdGlvbnMpLmxlbmd0aCA+IDA7XHJcblxyXG4gICAgICAvLyBTZXQgaW5wdXQgaWRcclxuICAgICAgaWYgKCF0aGlzLiRpbnB1dC5hdHRyKCdpZCcpKSB7XHJcbiAgICAgICAgdGhpcy4kaW5wdXQuYXR0cignaWQnLCBNLmd1aWQoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbmRlciBpbml0aWFsIGNoaXBzXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmNoaXBzRGF0YSA9IHRoaXMub3B0aW9ucy5kYXRhO1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNoaXBzKHRoaXMuY2hpcHNEYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2V0dXAgYXV0b2NvbXBsZXRlIGlmIG5lZWRlZFxyXG4gICAgICBpZiAodGhpcy5oYXNBdXRvY29tcGxldGUpIHtcclxuICAgICAgICB0aGlzLl9zZXR1cEF1dG9jb21wbGV0ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9zZXRQbGFjZWhvbGRlcigpO1xyXG4gICAgICB0aGlzLl9zZXR1cExhYmVsKCk7XHJcbiAgICAgIHRoaXMuX3NldHVwRXZlbnRIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XHJcbiAgICAgIHJldHVybiBfZGVmYXVsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluaXQoZWxzLCBvcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5pbml0KHRoaXMsIGVscywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgSW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKGVsKSB7XHJcbiAgICAgIGxldCBkb21FbGVtID0gISFlbC5qcXVlcnkgPyBlbFswXSA6IGVsO1xyXG4gICAgICByZXR1cm4gZG9tRWxlbS5NX0NoaXBzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IENoaXBzIERhdGFcclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpcHNEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVhcmRvd24gY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgdGhpcy4kY2hpcHMucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMuZWwuTV9DaGlwcyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNoaXBDbGlja0JvdW5kID0gdGhpcy5faGFuZGxlQ2hpcENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUlucHV0S2V5ZG93bkJvdW5kID0gdGhpcy5faGFuZGxlSW5wdXRLZXlkb3duLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUlucHV0Rm9jdXNCb3VuZCA9IHRoaXMuX2hhbmRsZUlucHV0Rm9jdXMuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5faGFuZGxlSW5wdXRCbHVyQm91bmQgPSB0aGlzLl9oYW5kbGVJbnB1dEJsdXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVDaGlwQ2xpY2tCb3VuZCk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBDaGlwcy5faGFuZGxlQ2hpcHNLZXlkb3duKTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBDaGlwcy5faGFuZGxlQ2hpcHNLZXl1cCk7XHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIENoaXBzLl9oYW5kbGVDaGlwc0JsdXIsIHRydWUpO1xyXG4gICAgICB0aGlzLiRpbnB1dFswXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX2hhbmRsZUlucHV0Rm9jdXNCb3VuZCk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9oYW5kbGVJbnB1dEJsdXJCb3VuZCk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVJbnB1dEtleWRvd25Cb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgRXZlbnQgSGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgX3JlbW92ZUV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVDaGlwQ2xpY2tCb3VuZCk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBDaGlwcy5faGFuZGxlQ2hpcHNLZXlkb3duKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBDaGlwcy5faGFuZGxlQ2hpcHNLZXl1cCk7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIENoaXBzLl9oYW5kbGVDaGlwc0JsdXIsIHRydWUpO1xyXG4gICAgICB0aGlzLiRpbnB1dFswXS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX2hhbmRsZUlucHV0Rm9jdXNCb3VuZCk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9oYW5kbGVJbnB1dEJsdXJCb3VuZCk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVJbnB1dEtleWRvd25Cb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgQ2hpcCBDbGlja1xyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlQ2hpcENsaWNrKGUpIHtcclxuICAgICAgbGV0ICRjaGlwID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmNoaXAnKTtcclxuICAgICAgbGV0IGNsaWNrZWRDbG9zZSA9ICQoZS50YXJnZXQpLmlzKCcuY2xvc2UnKTtcclxuICAgICAgaWYgKCRjaGlwLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9ICRjaGlwLmluZGV4KCk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRDbG9zZSkge1xyXG4gICAgICAgICAgLy8gZGVsZXRlIGNoaXBcclxuICAgICAgICAgIHRoaXMuZGVsZXRlQ2hpcChpbmRleCk7XHJcbiAgICAgICAgICB0aGlzLiRpbnB1dFswXS5mb2N1cygpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gc2VsZWN0IGNoaXBcclxuICAgICAgICAgIHRoaXMuc2VsZWN0Q2hpcChpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IGhhbmRsZSBjbGljayB0byBmb2N1cyBvbiBpbnB1dFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJGlucHV0WzBdLmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBDaGlwcyBLZXlkb3duXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfaGFuZGxlQ2hpcHNLZXlkb3duKGUpIHtcclxuICAgICAgQ2hpcHMuX2tleWRvd24gPSB0cnVlO1xyXG5cclxuICAgICAgbGV0ICRjaGlwcyA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5jaGlwcycpO1xyXG4gICAgICBsZXQgY2hpcHNLZXlkb3duID0gZS50YXJnZXQgJiYgJGNoaXBzLmxlbmd0aDtcclxuXHJcbiAgICAgIC8vIERvbid0IGhhbmRsZSBrZXlkb3duIGlucHV0cyBvbiBpbnB1dCBhbmQgdGV4dGFyZWFcclxuICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCdpbnB1dCwgdGV4dGFyZWEnKSB8fCAhY2hpcHNLZXlkb3duKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgY3VyckNoaXBzID0gJGNoaXBzWzBdLk1fQ2hpcHM7XHJcblxyXG4gICAgICAvLyBiYWNrc3BhY2UgYW5kIGRlbGV0ZVxyXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gNDYpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RJbmRleCA9IGN1cnJDaGlwcy5jaGlwc0RhdGEubGVuZ3RoO1xyXG4gICAgICAgIGlmIChjdXJyQ2hpcHMuX3NlbGVjdGVkQ2hpcCkge1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gY3VyckNoaXBzLl9zZWxlY3RlZENoaXAuaW5kZXgoKTtcclxuICAgICAgICAgIGN1cnJDaGlwcy5kZWxldGVDaGlwKGluZGV4KTtcclxuICAgICAgICAgIGN1cnJDaGlwcy5fc2VsZWN0ZWRDaGlwID0gbnVsbDtcclxuICAgICAgICAgIHNlbGVjdEluZGV4ID0gaW5kZXggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJDaGlwcy5jaGlwc0RhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjdXJyQ2hpcHMuc2VsZWN0Q2hpcChzZWxlY3RJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZWZ0IGFycm93IGtleVxyXG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcclxuICAgICAgICBpZiAoY3VyckNoaXBzLl9zZWxlY3RlZENoaXApIHtcclxuICAgICAgICAgIGxldCBzZWxlY3RJbmRleCA9IGN1cnJDaGlwcy5fc2VsZWN0ZWRDaGlwLmluZGV4KCkgLSAxO1xyXG4gICAgICAgICAgaWYgKHNlbGVjdEluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjdXJyQ2hpcHMuc2VsZWN0Q2hpcChzZWxlY3RJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByaWdodCBhcnJvdyBrZXlcclxuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgaWYgKGN1cnJDaGlwcy5fc2VsZWN0ZWRDaGlwKSB7XHJcbiAgICAgICAgICBsZXQgc2VsZWN0SW5kZXggPSBjdXJyQ2hpcHMuX3NlbGVjdGVkQ2hpcC5pbmRleCgpICsgMTtcclxuXHJcbiAgICAgICAgICBpZiAoc2VsZWN0SW5kZXggPj0gY3VyckNoaXBzLmNoaXBzRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY3VyckNoaXBzLiRpbnB1dFswXS5mb2N1cygpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VyckNoaXBzLnNlbGVjdENoaXAoc2VsZWN0SW5kZXgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIENoaXBzIEtleXVwXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfaGFuZGxlQ2hpcHNLZXl1cChlKSB7XHJcbiAgICAgIENoaXBzLl9rZXlkb3duID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgQ2hpcHMgQmx1clxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX2hhbmRsZUNoaXBzQmx1cihlKSB7XHJcbiAgICAgIGlmICghQ2hpcHMuX2tleWRvd24pIHtcclxuICAgICAgICBsZXQgJGNoaXBzID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmNoaXBzJyk7XHJcbiAgICAgICAgbGV0IGN1cnJDaGlwcyA9ICRjaGlwc1swXS5NX0NoaXBzO1xyXG5cclxuICAgICAgICBjdXJyQ2hpcHMuX3NlbGVjdGVkQ2hpcCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBJbnB1dCBGb2N1c1xyXG4gICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRGb2N1cygpIHtcclxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgSW5wdXQgQmx1clxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRCbHVyKCkge1xyXG4gICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZm9jdXMnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBJbnB1dCBLZXlkb3duXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVJbnB1dEtleWRvd24oZSkge1xyXG4gICAgICBDaGlwcy5fa2V5ZG93biA9IHRydWU7XHJcblxyXG4gICAgICAvLyBlbnRlclxyXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgIC8vIE92ZXJyaWRlIGVudGVyIGlmIGF1dG9jb21wbGV0aW5nLlxyXG4gICAgICAgIGlmICh0aGlzLmhhc0F1dG9jb21wbGV0ZSAmJlxyXG4gICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUgJiZcclxuICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmlzT3Blbikge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpcCh7XHJcbiAgICAgICAgICB0YWc6IHRoaXMuJGlucHV0WzBdLnZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kaW5wdXRbMF0udmFsdWUgPSAnJztcclxuXHJcbiAgICAgICAgLy8gZGVsZXRlIG9yIGxlZnRcclxuICAgICAgfSBlbHNlIGlmICgoZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gMzcpICYmIHRoaXMuJGlucHV0WzBdLnZhbHVlID09PSAnJyAmJiB0aGlzLmNoaXBzRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDaGlwKHRoaXMuY2hpcHNEYXRhLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgQ2hpcFxyXG4gICAgICogQHBhcmFtIHtjaGlwfSBjaGlwXHJcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyQ2hpcChjaGlwKSB7XHJcbiAgICAgIGlmICghY2hpcC50YWcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCByZW5kZXJlZENoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbGV0IGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgcmVuZGVyZWRDaGlwLmNsYXNzTGlzdC5hZGQoJ2NoaXAnKTtcclxuICAgICAgcmVuZGVyZWRDaGlwLnRleHRDb250ZW50ID0gY2hpcC50YWc7XHJcbiAgICAgIHJlbmRlcmVkQ2hpcC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XHJcbiAgICAgICQoY2xvc2VJY29uKS5hZGRDbGFzcygnbWF0ZXJpYWwtaWNvbnMgY2xvc2UnKTtcclxuICAgICAgY2xvc2VJY29uLnRleHRDb250ZW50ID0gJ2Nsb3NlJztcclxuXHJcbiAgICAgIC8vIGF0dGFjaCBpbWFnZSBpZiBuZWVkZWRcclxuICAgICAgaWYgKGNoaXAuaW1hZ2UpIHtcclxuICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgY2hpcC5pbWFnZSk7XHJcbiAgICAgICAgcmVuZGVyZWRDaGlwLmluc2VydEJlZm9yZShpbWcsIHJlbmRlcmVkQ2hpcC5maXJzdENoaWxkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVuZGVyZWRDaGlwLmFwcGVuZENoaWxkKGNsb3NlSWNvbik7XHJcbiAgICAgIHJldHVybiByZW5kZXJlZENoaXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgQ2hpcHNcclxuICAgICAqL1xyXG4gICAgX3JlbmRlckNoaXBzKCkge1xyXG4gICAgICB0aGlzLiRjaGlwcy5yZW1vdmUoKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaXBzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjaGlwRWwgPSB0aGlzLl9yZW5kZXJDaGlwKHRoaXMuY2hpcHNEYXRhW2ldKTtcclxuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoY2hpcEVsKTtcclxuICAgICAgICB0aGlzLiRjaGlwcy5hZGQoY2hpcEVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbW92ZSBpbnB1dCB0byBlbmRcclxuICAgICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuJGlucHV0WzBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEF1dG9jb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBfc2V0dXBBdXRvY29tcGxldGUoKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5hdXRvY29tcGxldGVPcHRpb25zLm9uQXV0b2NvbXBsZXRlID0gKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpcCh7XHJcbiAgICAgICAgICB0YWc6IHZhbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGlucHV0WzBdLnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy4kaW5wdXRbMF0uZm9jdXMoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlID0gTS5BdXRvY29tcGxldGUuaW5pdCh0aGlzLiRpbnB1dCwgdGhpcy5vcHRpb25zLmF1dG9jb21wbGV0ZU9wdGlvbnMpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgSW5wdXRcclxuICAgICAqL1xyXG4gICAgX3NldHVwSW5wdXQoKSB7XHJcbiAgICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZWwuZmluZCgnaW5wdXQnKTtcclxuICAgICAgaWYgKCF0aGlzLiRpbnB1dC5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLiRpbnB1dCA9ICQoJzxpbnB1dD48L2lucHV0PicpO1xyXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLiRpbnB1dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuJGlucHV0LmFkZENsYXNzKCdpbnB1dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgTGFiZWxcclxuICAgICAqL1xyXG4gICAgX3NldHVwTGFiZWwoKSB7XHJcbiAgICAgIHRoaXMuJGxhYmVsID0gdGhpcy4kZWwuZmluZCgnbGFiZWwnKTtcclxuICAgICAgaWYgKHRoaXMuJGxhYmVsLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuJGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgdGhpcy4kaW5wdXQuYXR0cignaWQnKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBwbGFjZWhvbGRlclxyXG4gICAgICovXHJcbiAgICBfc2V0UGxhY2Vob2xkZXIoKSB7XHJcbiAgICAgIGlmICgodGhpcy5jaGlwc0RhdGEgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5jaGlwc0RhdGEubGVuZ3RoKSAmJiB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIpIHtcclxuICAgICAgICAkKHRoaXMuJGlucHV0KS5wcm9wKCdwbGFjZWhvbGRlcicsIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcik7XHJcblxyXG4gICAgICB9IGVsc2UgaWYgKCh0aGlzLmNoaXBzRGF0YSA9PT0gdW5kZWZpbmVkIHx8ICEhdGhpcy5jaGlwc0RhdGEubGVuZ3RoKSAmJiB0aGlzLm9wdGlvbnMuc2Vjb25kYXJ5UGxhY2Vob2xkZXIpIHtcclxuICAgICAgICAkKHRoaXMuJGlucHV0KS5wcm9wKCdwbGFjZWhvbGRlcicsIHRoaXMub3B0aW9ucy5zZWNvbmRhcnlQbGFjZWhvbGRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGNoaXAgaXMgdmFsaWRcclxuICAgICAqIEBwYXJhbSB7Y2hpcH0gY2hpcFxyXG4gICAgICovXHJcbiAgICBfaXNWYWxpZChjaGlwKSB7XHJcbiAgICAgIGlmIChjaGlwLmhhc093blByb3BlcnR5KCd0YWcnKSAmJiBjaGlwLnRhZyAhPT0gJycpIHtcclxuICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaXBzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY2hpcHNEYXRhW2ldLnRhZyA9PT0gY2hpcC50YWcpIHtcclxuICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAhZXhpc3RzO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGNoaXBcclxuICAgICAqIEBwYXJhbSB7Y2hpcH0gY2hpcFxyXG4gICAgICovXHJcbiAgICBhZGRDaGlwKGNoaXApIHtcclxuICAgICAgaWYgKCF0aGlzLl9pc1ZhbGlkKGNoaXApIHx8XHJcbiAgICAgICAgdGhpcy5jaGlwc0RhdGEubGVuZ3RoID49IHRoaXMub3B0aW9ucy5saW1pdCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHJlbmRlcmVkQ2hpcCA9IHRoaXMuX3JlbmRlckNoaXAoY2hpcCk7XHJcbiAgICAgIHRoaXMuJGNoaXBzLmFkZChyZW5kZXJlZENoaXApO1xyXG4gICAgICB0aGlzLmNoaXBzRGF0YS5wdXNoKGNoaXApO1xyXG4gICAgICAkKHRoaXMuJGlucHV0KS5iZWZvcmUocmVuZGVyZWRDaGlwKTtcclxuICAgICAgdGhpcy5fc2V0UGxhY2Vob2xkZXIoKTtcclxuXHJcbiAgICAgIC8vIGZpcmUgY2hpcEFkZCBjYWxsYmFja1xyXG4gICAgICBpZiAodHlwZW9mICh0aGlzLm9wdGlvbnMub25DaGlwQWRkKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbkNoaXBBZGQuY2FsbCh0aGlzLCB0aGlzLiRlbCwgcmVuZGVyZWRDaGlwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIGNoaXBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjaGlwXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUNoaXAoY2hpcEluZGV4KSB7XHJcbiAgICAgIGxldCAkY2hpcCA9IHRoaXMuJGNoaXBzLmVxKGNoaXBJbmRleCk7XHJcbiAgICAgIHRoaXMuJGNoaXBzLmVxKGNoaXBJbmRleCkucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMuJGNoaXBzID0gdGhpcy4kY2hpcHMuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIHJldHVybiAkKGVsKS5pbmRleCgpID49IDA7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNoaXBzRGF0YS5zcGxpY2UoY2hpcEluZGV4LCAxKTtcclxuICAgICAgdGhpcy5fc2V0UGxhY2Vob2xkZXIoKTtcclxuXHJcbiAgICAgIC8vIGZpcmUgY2hpcERlbGV0ZSBjYWxsYmFja1xyXG4gICAgICBpZiAodHlwZW9mICh0aGlzLm9wdGlvbnMub25DaGlwRGVsZXRlKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbkNoaXBEZWxldGUuY2FsbCh0aGlzLCB0aGlzLiRlbCwgJGNoaXBbMF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgY2hpcFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGNoaXBcclxuICAgICAqL1xyXG4gICAgc2VsZWN0Q2hpcChjaGlwSW5kZXgpIHtcclxuICAgICAgbGV0ICRjaGlwID0gdGhpcy4kY2hpcHMuZXEoY2hpcEluZGV4KTtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWRDaGlwID0gJGNoaXA7XHJcbiAgICAgICRjaGlwWzBdLmZvY3VzKCk7XHJcblxyXG4gICAgICAvLyBmaXJlIGNoaXBTZWxlY3QgY2FsbGJhY2tcclxuICAgICAgaWYgKHR5cGVvZiAodGhpcy5vcHRpb25zLm9uQ2hpcFNlbGVjdCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMub25DaGlwU2VsZWN0LmNhbGwodGhpcywgdGhpcy4kZWwsICRjaGlwWzBdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBDaGlwc1xyXG4gICAqL1xyXG4gIENoaXBzLl9rZXlkb3duID0gZmFsc2U7XHJcblxyXG4gIE0uQ2hpcHMgPSBDaGlwcztcclxuXHJcbiAgaWYgKE0ualF1ZXJ5TG9hZGVkKSB7XHJcbiAgICBNLmluaXRpYWxpemVKcXVlcnlXcmFwcGVyKENoaXBzLCAnY2hpcHMnLCAnTV9DaGlwcycpO1xyXG4gIH1cclxuXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gSGFuZGxlIHJlbW92YWwgb2Ygc3RhdGljIGNoaXBzLlxyXG4gICAgJChkb2N1bWVudC5ib2R5KS5vbignY2xpY2snLCAnLmNoaXAgLmNsb3NlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgJGNoaXBzID0gJCh0aGlzKS5jbG9zZXN0KCcuY2hpcHMnKTtcclxuICAgICAgaWYgKCRjaGlwcy5sZW5ndGggJiYgJGNoaXBzWzBdLk1fQ2hpcHMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuY2hpcCcpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0oY2FzaCkpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgbGV0IF9kZWZhdWx0cyA9IHtcclxuICAgIHRvcDogMCxcclxuICAgIGJvdHRvbTogSW5maW5pdHksXHJcbiAgICBvZmZzZXQ6IDAsXHJcbiAgICBvblBvc2l0aW9uQ2hhbmdlOiBudWxsXHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEBjbGFzc1xyXG4gICAqXHJcbiAgICovXHJcbiAgY2xhc3MgUHVzaHBpbiBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdCBQdXNocGluIGluc3RhbmNlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKSB7XHJcbiAgICAgIHN1cGVyKFB1c2hwaW4sIGVsLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMuZWwuTV9QdXNocGluID0gdGhpcztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBPcHRpb25zIGZvciB0aGUgbW9kYWxcclxuICAgICAgICogQG1lbWJlciBQdXNocGluI29wdGlvbnNcclxuICAgICAgICovXHJcbiAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBQdXNocGluLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMub3JpZ2luYWxPZmZzZXQgPSB0aGlzLmVsLm9mZnNldFRvcDtcclxuICAgICAgUHVzaHBpbi5fcHVzaHBpbnMucHVzaCh0aGlzKTtcclxuICAgICAgdGhpcy5fc2V0dXBFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fUHVzaHBpbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlYXJkb3duIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgIHRoaXMuX3JlbW92ZVBpbkNsYXNzZXMoKTtcclxuICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRIYW5kbGVycygpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIHB1c2hwaW4gSW5zdFxyXG4gICAgICBsZXQgaW5kZXggPSBQdXNocGluLl9wdXNocGlucy5pbmRleE9mKHRoaXMpO1xyXG4gICAgICBQdXNocGluLl9wdXNocGlucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBfdXBkYXRlRWxlbWVudHMoKSB7XHJcbiAgICAgIGZvciAobGV0IGVsSW5kZXggaW4gUHVzaHBpbi5fcHVzaHBpbnMpIHtcclxuICAgICAgICBsZXQgcEluc3RhbmNlID0gUHVzaHBpbi5fcHVzaHBpbnNbZWxJbmRleF07XHJcbiAgICAgICAgcEluc3RhbmNlLl91cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NldHVwRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgUHVzaHBpbi5fdXBkYXRlRWxlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZW1vdmVFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBQdXNocGluLl91cGRhdGVFbGVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgICBsZXQgc2Nyb2xsZWQgPSBNLmdldERvY3VtZW50U2Nyb2xsVG9wKCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0O1xyXG5cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50b3AgPD0gc2Nyb2xsZWQgJiYgdGhpcy5vcHRpb25zLmJvdHRvbSA+PSBzY3JvbGxlZCAmJlxyXG4gICAgICAgICF0aGlzLmVsLmNsYXNzTGlzdC5jb250YWlucygncGlubmVkJykpIHtcclxuICAgICAgICB0aGlzLl9yZW1vdmVQaW5DbGFzc2VzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7dGhpcy5vcHRpb25zLm9mZnNldH1weGA7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdwaW5uZWQnKTtcclxuXHJcbiAgICAgICAgLy8gb25Qb3NpdGlvbkNoYW5nZSBjYWxsYmFja1xyXG4gICAgICAgIGlmICh0eXBlb2YodGhpcy5vcHRpb25zLm9uUG9zaXRpb25DaGFuZ2UpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnMub25Qb3NpdGlvbkNoYW5nZS5jYWxsKHRoaXMsICdwaW5uZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFkZCBwaW4tdG9wICh3aGVuIHNjcm9sbGVkIHBvc2l0aW9uIGlzIGFib3ZlIHRvcClcclxuICAgICAgaWYgKHNjcm9sbGVkIDwgdGhpcy5vcHRpb25zLnRvcCAmJiAhdGhpcy5lbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Bpbi10b3AnKSkge1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZVBpbkNsYXNzZXMoKTtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdwaW4tdG9wJyk7XHJcblxyXG4gICAgICAgIC8vIG9uUG9zaXRpb25DaGFuZ2UgY2FsbGJhY2tcclxuICAgICAgICBpZiAodHlwZW9mKHRoaXMub3B0aW9ucy5vblBvc2l0aW9uQ2hhbmdlKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLm9uUG9zaXRpb25DaGFuZ2UuY2FsbCh0aGlzLCAncGluLXRvcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWRkIHBpbi1ib3R0b20gKHdoZW4gc2Nyb2xsZWQgcG9zaXRpb24gaXMgYmVsb3cgYm90dG9tKVxyXG4gICAgICBpZiAoc2Nyb2xsZWQgPiB0aGlzLm9wdGlvbnMuYm90dG9tICYmICF0aGlzLmVsLmNsYXNzTGlzdC5jb250YWlucygncGluLWJvdHRvbScpKSB7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlUGluQ2xhc3NlcygpO1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGluLWJvdHRvbScpO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7dGhpcy5vcHRpb25zLmJvdHRvbSAtIHRoaXMub3JpZ2luYWxPZmZzZXR9cHhgO1xyXG5cclxuICAgICAgICAvLyBvblBvc2l0aW9uQ2hhbmdlIGNhbGxiYWNrXHJcbiAgICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMub25Qb3NpdGlvbkNoYW5nZSkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5vblBvc2l0aW9uQ2hhbmdlLmNhbGwodGhpcywgJ3Bpbi1ib3R0b20nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlUGluQ2xhc3NlcygpIHtcclxuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwaW4tdG9wJywgJ3Bpbm5lZCcsICdwaW4tYm90dG9tJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIFB1c2hwaW5cclxuICAgKi9cclxuICBQdXNocGluLl9wdXNocGlucyA9IFtdO1xyXG5cclxuICBNLlB1c2hwaW4gPSBQdXNocGluO1xyXG5cclxuICBpZiAoTS5qUXVlcnlMb2FkZWQpIHtcclxuICAgIE0uaW5pdGlhbGl6ZUpxdWVyeVdyYXBwZXIoUHVzaHBpbiwgJ3B1c2hwaW4nLCAnTV9QdXNocGluJyk7XHJcbiAgfVxyXG5cclxufSkoY2FzaCk7XHJcblxuKGZ1bmN0aW9uICgkLCBhbmltKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBsZXQgX2RlZmF1bHRzID0ge1xyXG4gICAgZGlyZWN0aW9uOiAndG9wJyxcclxuICAgIGhvdmVyRW5hYmxlZDogdHJ1ZSxcclxuICAgIHRvb2xiYXJFbmFibGVkOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gICQuZm4ucmV2ZXJzZSA9IFtdLnJldmVyc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBjbGFzc1xyXG4gICAqXHJcbiAgICovXHJcbiAgY2xhc3MgRmxvYXRpbmdBY3Rpb25CdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3QgRmxvYXRpbmdBY3Rpb25CdXR0b24gaW5zdGFuY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgc3VwZXIoRmxvYXRpbmdBY3Rpb25CdXR0b24sIGVsLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMuZWwuTV9GbG9hdGluZ0FjdGlvbkJ1dHRvbiA9IHRoaXM7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogT3B0aW9ucyBmb3IgdGhlIGZhYlxyXG4gICAgICAgKiBAbWVtYmVyIEZsb2F0aW5nQWN0aW9uQnV0dG9uI29wdGlvbnNcclxuICAgICAgICogQHByb3Age0Jvb2xlYW59IFtkaXJlY3Rpb25dIC0gRGlyZWN0aW9uIGZhYiBtZW51IG9wZW5zXHJcbiAgICAgICAqIEBwcm9wIHtCb29sZWFufSBbaG92ZXJFbmFibGVkPXRydWVdIC0gRW5hYmxlIGhvdmVyIHZzIGNsaWNrXHJcbiAgICAgICAqIEBwcm9wIHtCb29sZWFufSBbdG9vbGJhckVuYWJsZWQ9ZmFsc2VdIC0gRW5hYmxlIHRvb2xiYXIgdHJhbnNpdGlvblxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuJGFuY2hvciA9IHRoaXMuJGVsLmNoaWxkcmVuKCdhJykuZmlyc3QoKTtcclxuICAgICAgdGhpcy4kbWVudSA9IHRoaXMuJGVsLmNoaWxkcmVuKCd1bCcpLmZpcnN0KCk7XHJcbiAgICAgIHRoaXMuJGZsb2F0aW5nQnRucyA9IHRoaXMuJGVsLmZpbmQoJ3VsIC5idG4tZmxvYXRpbmcnKTtcclxuICAgICAgdGhpcy4kZmxvYXRpbmdCdG5zUmV2ZXJzZSA9IHRoaXMuJGVsLmZpbmQoJ3VsIC5idG4tZmxvYXRpbmcnKS5yZXZlcnNlKCk7XHJcbiAgICAgIHRoaXMub2Zmc2V0WSA9IDA7XHJcbiAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSAndG9wJykge1xyXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdkaXJlY3Rpb24tdG9wJyk7XHJcbiAgICAgICAgdGhpcy5vZmZzZXRZID0gNDA7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdkaXJlY3Rpb24tcmlnaHQnKTtcclxuICAgICAgICB0aGlzLm9mZnNldFggPSAtNDA7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcygnZGlyZWN0aW9uLWJvdHRvbScpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0WSA9IC00MDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcygnZGlyZWN0aW9uLWxlZnQnKTtcclxuICAgICAgICB0aGlzLm9mZnNldFggPSA0MDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9zZXR1cEV2ZW50SGFuZGxlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xyXG4gICAgICByZXR1cm4gX2RlZmF1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbml0KGVscywgb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuaW5pdCh0aGlzLCBlbHMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZShlbCkge1xyXG4gICAgICBsZXQgZG9tRWxlbSA9ICEhZWwuanF1ZXJ5ID8gZWxbMF0gOiBlbDtcclxuICAgICAgcmV0dXJuIGRvbUVsZW0uTV9GbG9hdGluZ0FjdGlvbkJ1dHRvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlYXJkb3duIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICB0aGlzLl9yZW1vdmVFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgIHRoaXMuZWwuTV9GbG9hdGluZ0FjdGlvbkJ1dHRvbiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUZBQkNsaWNrQm91bmQgPSB0aGlzLl9oYW5kbGVGQUJDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVPcGVuQm91bmQgPSB0aGlzLm9wZW4uYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5faGFuZGxlQ2xvc2VCb3VuZCA9IHRoaXMuY2xvc2UuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaG92ZXJFbmFibGVkICYmICF0aGlzLm9wdGlvbnMudG9vbGJhckVuYWJsZWQpIHtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9oYW5kbGVPcGVuQm91bmQpO1xyXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2hhbmRsZUNsb3NlQm91bmQpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRkFCQ2xpY2tCb3VuZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBFdmVudCBIYW5kbGVyc1xyXG4gICAgICovXHJcbiAgICBfcmVtb3ZlRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ob3ZlckVuYWJsZWQgJiYgIXRoaXMub3B0aW9ucy50b29sYmFyRW5hYmxlZCkge1xyXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2hhbmRsZU9wZW5Cb3VuZCk7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGFuZGxlQ2xvc2VCb3VuZCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVGQUJDbGlja0JvdW5kKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIEZBQiBDbGlja1xyXG4gICAgICovXHJcbiAgICBfaGFuZGxlRkFCQ2xpY2soKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBEb2N1bWVudCBDbGlja1xyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlRG9jdW1lbnRDbGljayhlKSB7XHJcbiAgICAgIGlmICghJChlLnRhcmdldCkuY2xvc2VzdCh0aGlzLiRtZW51KS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gRkFCXHJcbiAgICAgKi9cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50b29sYmFyRW5hYmxlZCkge1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGVJblRvb2xiYXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9hbmltYXRlSW5GQUIoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZSBGQUJcclxuICAgICAqL1xyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9vbGJhckVuYWJsZWQpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlQ2xvc2VCb3VuZCwgdHJ1ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2tCb3VuZCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZU91dFRvb2xiYXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9hbmltYXRlT3V0RkFCKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsYXNzaWMgRkFCIE1lbnUgb3BlblxyXG4gICAgICovXHJcbiAgICBfYW5pbWF0ZUluRkFCKCkge1xyXG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICBsZXQgdGltZSA9IDA7XHJcbiAgICAgIHRoaXMuJGZsb2F0aW5nQnRuc1JldmVyc2UuZWFjaCgoZWwpID0+IHtcclxuICAgICAgICBhbmltKHtcclxuICAgICAgICAgIHRhcmdldHM6IGVsLFxyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIHNjYWxlOiBbLjQsIDFdLFxyXG4gICAgICAgICAgdHJhbnNsYXRlWTogW3RoaXMub2Zmc2V0WSwgMF0sXHJcbiAgICAgICAgICB0cmFuc2xhdGVYOiBbdGhpcy5vZmZzZXRYLCAwXSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyNzUsXHJcbiAgICAgICAgICBkZWxheTogdGltZSxcclxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YWQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGltZSArPSA0MDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGFzc2ljIEZBQiBNZW51IGNsb3NlXHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlT3V0RkFCKCkge1xyXG4gICAgICB0aGlzLiRmbG9hdGluZ0J0bnNSZXZlcnNlLmVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgYW5pbS5yZW1vdmUoZWwpO1xyXG4gICAgICAgIGFuaW0oe1xyXG4gICAgICAgICAgdGFyZ2V0czogZWwsXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgc2NhbGU6IC40LFxyXG4gICAgICAgICAgdHJhbnNsYXRlWTogdGhpcy5vZmZzZXRZLFxyXG4gICAgICAgICAgdHJhbnNsYXRlWDogdGhpcy5vZmZzZXRYLFxyXG4gICAgICAgICAgZHVyYXRpb246IDE3NSxcclxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFkJyxcclxuICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb29sYmFyIHRyYW5zaXRpb24gTWVudSBvcGVuXHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlSW5Ub29sYmFyKCkge1xyXG4gICAgICBsZXQgc2NhbGVGYWN0b3I7XHJcbiAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICBsZXQgYnRuUmVjdCA9IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGxldCBiYWNrZHJvcCA9ICQoJzxkaXYgY2xhc3M9XCJmYWItYmFja2Ryb3BcIj48L2Rpdj4nKTtcclxuICAgICAgbGV0IGZhYkNvbG9yID0gdGhpcy4kYW5jaG9yLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gICAgICB0aGlzLiRhbmNob3IuYXBwZW5kKGJhY2tkcm9wKTtcclxuXHJcbiAgICAgIHRoaXMub2Zmc2V0WCA9IGJ0blJlY3QubGVmdCAtICh3aW5kb3dXaWR0aCAvIDIpICsgKGJ0blJlY3Qud2lkdGggLyAyKTtcclxuICAgICAgdGhpcy5vZmZzZXRZID0gd2luZG93SGVpZ2h0IC0gYnRuUmVjdC5ib3R0b207XHJcbiAgICAgIHNjYWxlRmFjdG9yID0gd2luZG93V2lkdGggLyBiYWNrZHJvcFswXS5jbGllbnRXaWR0aDtcclxuICAgICAgdGhpcy5idG5Cb3R0b20gPSBidG5SZWN0LmJvdHRvbTtcclxuICAgICAgdGhpcy5idG5MZWZ0ID0gYnRuUmVjdC5sZWZ0O1xyXG4gICAgICB0aGlzLmJ0bldpZHRoID0gYnRuUmVjdC53aWR0aDtcclxuXHJcbiAgICAgIC8vIFNldCBpbml0aWFsIHN0YXRlXHJcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgdGhpcy4kZWwuY3NzKHtcclxuICAgICAgICAndGV4dC1hbGlnbic6ICdjZW50ZXInLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgnICsgdGhpcy5vZmZzZXRYICsgJ3B4KScsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ25vbmUnXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLiRhbmNob3IuY3NzKHtcclxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAtdGhpcy5vZmZzZXRZICsgJ3B4KScsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ25vbmUnXHJcbiAgICAgIH0pO1xyXG4gICAgICBiYWNrZHJvcC5jc3Moe1xyXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogZmFiQ29sb3JcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZWwuY3NzKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJycsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIC4ycyBjdWJpYy1iZXppZXIoMC41NTAsIDAuMDg1LCAwLjY4MCwgMC41MzApLCBiYWNrZ3JvdW5kLWNvbG9yIDBzIGxpbmVhciAuMnMnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kYW5jaG9yLmNzcyh7XHJcbiAgICAgICAgICBvdmVyZmxvdzogJ3Zpc2libGUnLFxyXG4gICAgICAgICAgdHJhbnNmb3JtOiAnJyxcclxuICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gLjJzJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuJGVsLmNzcyh7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBmYWJDb2xvclxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBiYWNrZHJvcC5jc3Moe1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgnICsgc2NhbGVGYWN0b3IgKyAnKScsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gLjJzIGN1YmljLWJlemllcigwLjU1MCwgMC4wNTUsIDAuNjc1LCAwLjE5MCknXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuJG1lbnUuY2hpbGRyZW4oJ2xpJykuY2hpbGRyZW4oJ2EnKS5jc3Moe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBTY3JvbGwgdG8gY2xvc2UuXHJcbiAgICAgICAgICB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrQm91bmQgPSB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlQ2xvc2VCb3VuZCwgdHJ1ZSk7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRG9jdW1lbnRDbGlja0JvdW5kLCB0cnVlKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvb2xiYXIgdHJhbnNpdGlvbiBNZW51IGNsb3NlXHJcbiAgICAgKi9cclxuICAgIF9hbmltYXRlT3V0VG9vbGJhcigpIHtcclxuICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgIGxldCBiYWNrZHJvcCA9IHRoaXMuJGVsLmZpbmQoJy5mYWItYmFja2Ryb3AnKTtcclxuICAgICAgbGV0IGZhYkNvbG9yID0gYW5jaG9yLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG5cclxuICAgICAgdGhpcy5vZmZzZXRYID0gdGhpcy5idG5MZWZ0IC0gKHdpbmRvd1dpZHRoIC8gMikgKyAodGhpcy5idG5XaWR0aCAvIDIpO1xyXG4gICAgICB0aGlzLm9mZnNldFkgPSB3aW5kb3dIZWlnaHQgLSB0aGlzLmJ0bkJvdHRvbTtcclxuXHJcbiAgICAgIC8vIEhpZGUgYmFja2Ryb3BcclxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB0aGlzLiRlbC5jc3Moe1xyXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICB0cmFuc2l0aW9uOiAnbm9uZSdcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJGFuY2hvci5jc3Moe1xyXG4gICAgICAgIHRyYW5zaXRpb246ICdub25lJ1xyXG4gICAgICB9KTtcclxuICAgICAgYmFja2Ryb3AuY3NzKHtcclxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwKScsXHJcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBmYWJDb2xvclxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy4kbWVudS5jaGlsZHJlbignbGknKS5jaGlsZHJlbignYScpLmNzcyh7XHJcbiAgICAgICAgb3BhY2l0eTogJydcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBiYWNrZHJvcC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGluaXRpYWwgc3RhdGUuXHJcbiAgICAgICAgdGhpcy4kZWwuY3NzKHtcclxuICAgICAgICAgICd0ZXh0LWFsaWduJzogJycsXHJcbiAgICAgICAgICB3aWR0aDogJycsXHJcbiAgICAgICAgICBib3R0b206ICcnLFxyXG4gICAgICAgICAgbGVmdDogJycsXHJcbiAgICAgICAgICBvdmVyZmxvdzogJycsXHJcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcnLFxyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoJyArIC10aGlzLm9mZnNldFggKyAncHgsMCwwKSdcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRhbmNob3IuY3NzKHtcclxuICAgICAgICAgIG92ZXJmbG93OiAnJyxcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsJyArIHRoaXMub2Zmc2V0WSArICdweCwwKSdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRlbC5jc3Moe1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLDAsMCknLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIC4ycydcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy4kYW5jaG9yLmNzcyh7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsMCwwKScsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gLjJzIGN1YmljLWJlemllcigwLjU1MCwgMC4wNTUsIDAuNjc1LCAwLjE5MCknXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAyMCk7XHJcbiAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBNLkZsb2F0aW5nQWN0aW9uQnV0dG9uID0gRmxvYXRpbmdBY3Rpb25CdXR0b247XHJcblxyXG4gIGlmIChNLmpRdWVyeUxvYWRlZCkge1xyXG4gICAgTS5pbml0aWFsaXplSnF1ZXJ5V3JhcHBlcihGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgJ2Zsb2F0aW5nQWN0aW9uQnV0dG9uJywgJ01fRmxvYXRpbmdBY3Rpb25CdXR0b24nKTtcclxuICB9XHJcblxyXG59KGNhc2gsIE0uYW5pbWUpKTtcclxuXG4oZnVuY3Rpb24gKCQpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGxldCBfZGVmYXVsdHMgPSB7XHJcbiAgICBkdXJhdGlvbjogMjAwLCAvLyBtc1xyXG4gICAgZGlzdDogLTEwMCwgLy8gem9vbSBzY2FsZSBUT0RPOiBtYWtlIHRoaXMgbW9yZSBpbnR1aXRpdmUgYXMgYW4gb3B0aW9uXHJcbiAgICBzaGlmdDogMCwgLy8gc3BhY2luZyBmb3IgY2VudGVyIGltYWdlXHJcbiAgICBwYWRkaW5nOiAwLCAvLyBQYWRkaW5nIGJldHdlZW4gbm9uIGNlbnRlciBpdGVtc1xyXG4gICAgZnVsbFdpZHRoOiBmYWxzZSwgLy8gQ2hhbmdlIHRvIGZ1bGwgd2lkdGggc3R5bGVzXHJcbiAgICBpbmRpY2F0b3JzOiBmYWxzZSwgLy8gVG9nZ2xlIGluZGljYXRvcnNcclxuICAgIG5vV3JhcDogZmFsc2UsIC8vIERvbid0IHdyYXAgYXJvdW5kIGFuZCBjeWNsZSB0aHJvdWdoIGl0ZW1zLlxyXG4gICAgb25DeWNsZVRvOiBudWxsIC8vIENhbGxiYWNrIGZvciB3aGVuIGEgbmV3IHNsaWRlIGlzIGN5Y2xlZCB0by5cclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQGNsYXNzXHJcbiAgICpcclxuICAgKi9cclxuICBjbGFzcyBDYXJvdXNlbCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdCBDYXJvdXNlbCBpbnN0YW5jZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucykge1xyXG4gICAgICBzdXBlcihDYXJvdXNlbCwgZWwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy5lbC5NX0Nhcm91c2VsID0gdGhpcztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBPcHRpb25zIGZvciB0aGUgY2Fyb3VzZWxcclxuICAgICAgICogQG1lbWJlciBDYXJvdXNlbCNvcHRpb25zXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IGRpc3RcclxuICAgICAgICogQHByb3Age251bWJlcn0gc2hpZnRcclxuICAgICAgICogQHByb3Age251bWJlcn0gcGFkZGluZ1xyXG4gICAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZnVsbFdpZHRoXHJcbiAgICAgICAqIEBwcm9wIHtCb29sZWFufSBpbmRpY2F0b3JzXHJcbiAgICAgICAqIEBwcm9wIHtCb29sZWFufSBub1dyYXBcclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSBvbkN5Y2xlVG9cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBDYXJvdXNlbC5kZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAvLyBTZXR1cFxyXG4gICAgICB0aGlzLmhhc011bHRpcGxlU2xpZGVzID0gdGhpcy4kZWwuZmluZCgnLmNhcm91c2VsLWl0ZW0nKS5sZW5ndGggPiAxO1xyXG4gICAgICB0aGlzLnNob3dJbmRpY2F0b3JzID0gdGhpcy5vcHRpb25zLmluZGljYXRvcnMgJiYgdGhpcy5oYXNNdWx0aXBsZVNsaWRlcztcclxuICAgICAgdGhpcy5ub1dyYXAgPSB0aGlzLm9wdGlvbnMubm9XcmFwIHx8ICF0aGlzLmhhc011bHRpcGxlU2xpZGVzO1xyXG4gICAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5kcmFnZ2VkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy50YXJnZXQgPSAwO1xyXG4gICAgICB0aGlzLmltYWdlcyA9IFtdO1xyXG4gICAgICB0aGlzLml0ZW1XaWR0aCA9IHRoaXMuJGVsLmZpbmQoJy5jYXJvdXNlbC1pdGVtJykuZmlyc3QoKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgIHRoaXMuaXRlbUhlaWdodCA9IHRoaXMuJGVsLmZpbmQoJy5jYXJvdXNlbC1pdGVtJykuZmlyc3QoKS5pbm5lckhlaWdodCgpO1xyXG4gICAgICB0aGlzLmRpbSA9IHRoaXMuaXRlbVdpZHRoICogMiArIHRoaXMub3B0aW9ucy5wYWRkaW5nIHx8IDE7IC8vIE1ha2Ugc3VyZSBkaW0gaXMgbm9uIHplcm8gZm9yIGRpdmlzaW9ucy5cclxuICAgICAgdGhpcy5fYXV0b1Njcm9sbEJvdW5kID0gdGhpcy5fYXV0b1Njcm9sbC5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLl90cmFja0JvdW5kID0gdGhpcy5fdHJhY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICAgIC8vIEZ1bGwgV2lkdGggY2Fyb3VzZWwgc2V0dXBcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsV2lkdGgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZGlzdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fc2V0Q2Fyb3VzZWxIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgLy8gT2Zmc2V0IGZpeGVkIGl0ZW1zIHdoZW4gaW5kaWNhdG9ycy5cclxuICAgICAgICBpZiAodGhpcy5zaG93SW5kaWNhdG9ycykge1xyXG4gICAgICAgICAgdGhpcy4kZWwuZmluZCgnLmNhcm91c2VsLWZpeGVkLWl0ZW0nKS5hZGRDbGFzcygnd2l0aC1pbmRpY2F0b3JzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJdGVyYXRlIHRocm91Z2ggc2xpZGVzXHJcbiAgICAgIHRoaXMuJGluZGljYXRvcnMgPSAkKCc8dWwgY2xhc3M9XCJpbmRpY2F0b3JzXCI+PC91bD4nKTtcclxuICAgICAgdGhpcy4kZWwuZmluZCgnLmNhcm91c2VsLWl0ZW0nKS5lYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goZWwpO1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dJbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICBsZXQgJGluZGljYXRvciA9ICQoJzxsaSBjbGFzcz1cImluZGljYXRvci1pdGVtXCI+PC9saT4nKTtcclxuXHJcbiAgICAgICAgICAvLyBBZGQgYWN0aXZlIHRvIGZpcnN0IGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAkaW5kaWNhdG9yWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuJGluZGljYXRvcnMuYXBwZW5kKCRpbmRpY2F0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmICh0aGlzLnNob3dJbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuJGluZGljYXRvcnMpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY291bnQgPSB0aGlzLmltYWdlcy5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBTZXR1cCBjcm9zcyBicm93c2VyIHN0cmluZ1xyXG4gICAgICB0aGlzLnhmb3JtID0gJ3RyYW5zZm9ybSc7XHJcbiAgICAgIFsnd2Via2l0JywgJ01veicsICdPJywgJ21zJ10uZXZlcnkoKHByZWZpeCkgPT4ge1xyXG4gICAgICAgIHZhciBlID0gcHJlZml4ICsgJ1RyYW5zZm9ybSc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudC5ib2R5LnN0eWxlW2VdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpcy54Zm9ybSA9IGU7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuX3NldHVwRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICB0aGlzLl9zY3JvbGwodGhpcy5vZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XHJcbiAgICAgIHJldHVybiBfZGVmYXVsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluaXQoZWxzLCBvcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5pbml0KHRoaXMsIGVscywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgSW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKGVsKSB7XHJcbiAgICAgIGxldCBkb21FbGVtID0gISFlbC5qcXVlcnkgPyBlbFswXSA6IGVsO1xyXG4gICAgICByZXR1cm4gZG9tRWxlbS5NX0Nhcm91c2VsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVhcmRvd24gY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50SGFuZGxlcnMoKTtcclxuICAgICAgdGhpcy5lbC5NX0Nhcm91c2VsID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgRXZlbnQgSGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgX3NldHVwRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgdGhpcy5faGFuZGxlQ2Fyb3VzZWxUYXBCb3VuZCA9IHRoaXMuX2hhbmRsZUNhcm91c2VsVGFwLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNhcm91c2VsRHJhZ0JvdW5kID0gdGhpcy5faGFuZGxlQ2Fyb3VzZWxEcmFnLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNhcm91c2VsUmVsZWFzZUJvdW5kID0gdGhpcy5faGFuZGxlQ2Fyb3VzZWxSZWxlYXNlLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNhcm91c2VsQ2xpY2tCb3VuZCA9IHRoaXMuX2hhbmRsZUNhcm91c2VsQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVDYXJvdXNlbFRhcEJvdW5kKTtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZUNhcm91c2VsRHJhZ0JvdW5kKTtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlQ2Fyb3VzZWxSZWxlYXNlQm91bmQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZUNhcm91c2VsVGFwQm91bmQpO1xyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZUNhcm91c2VsRHJhZ0JvdW5kKTtcclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlQ2Fyb3VzZWxSZWxlYXNlQm91bmQpO1xyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oYW5kbGVDYXJvdXNlbFJlbGVhc2VCb3VuZCk7XHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVDYXJvdXNlbENsaWNrQm91bmQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuc2hvd0luZGljYXRvcnMgJiYgdGhpcy4kaW5kaWNhdG9ycykge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZUluZGljYXRvckNsaWNrQm91bmQgPSB0aGlzLl9oYW5kbGVJbmRpY2F0b3JDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuJGluZGljYXRvcnMuZmluZCgnLmluZGljYXRvci1pdGVtJykuZWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlSW5kaWNhdG9yQ2xpY2tCb3VuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlc2l6ZVxyXG4gICAgICBsZXQgdGhyb3R0bGVkUmVzaXplID0gTS50aHJvdHRsZSh0aGlzLl9oYW5kbGVSZXNpemUsIDIwMCk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZVRocm90dGxlZFJlc2l6ZUJvdW5kID0gdGhyb3R0bGVkUmVzaXplLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlVGhyb3R0bGVkUmVzaXplQm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9yZW1vdmVFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5vbnRvdWNoc3RhcnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5faGFuZGxlQ2Fyb3VzZWxUYXBCb3VuZCk7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9oYW5kbGVDYXJvdXNlbERyYWdCb3VuZCk7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX2hhbmRsZUNhcm91c2VsUmVsZWFzZUJvdW5kKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZUNhcm91c2VsVGFwQm91bmQpO1xyXG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZUNhcm91c2VsRHJhZ0JvdW5kKTtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlQ2Fyb3VzZWxSZWxlYXNlQm91bmQpO1xyXG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oYW5kbGVDYXJvdXNlbFJlbGVhc2VCb3VuZCk7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVDYXJvdXNlbENsaWNrQm91bmQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuc2hvd0luZGljYXRvcnMgJiYgdGhpcy4kaW5kaWNhdG9ycykge1xyXG4gICAgICAgIHRoaXMuJGluZGljYXRvcnMuZmluZCgnLmluZGljYXRvci1pdGVtJykuZWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlSW5kaWNhdG9yQ2xpY2tCb3VuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVUaHJvdHRsZWRSZXNpemVCb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgQ2Fyb3VzZWwgVGFwXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVDYXJvdXNlbFRhcChlKSB7XHJcbiAgICAgIC8vIEZpeGVzIGZpcmVmb3ggZHJhZ2dhYmxlIGltYWdlIGJ1Z1xyXG4gICAgICBpZiAoZS50eXBlID09PSAnbW91c2Vkb3duJyAmJiAkKGUudGFyZ2V0KS5pcygnaW1nJykpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5kcmFnZ2VkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudmVydGljYWxEcmFnZ2VkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucmVmZXJlbmNlID0gdGhpcy5feHBvcyhlKTtcclxuICAgICAgdGhpcy5yZWZlcmVuY2VZID0gdGhpcy5feXBvcyhlKTtcclxuXHJcbiAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLmFtcGxpdHVkZSA9IDA7XHJcbiAgICAgIHRoaXMuZnJhbWUgPSB0aGlzLm9mZnNldDtcclxuICAgICAgdGhpcy50aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGlja2VyKTtcclxuICAgICAgdGhpcy50aWNrZXIgPSBzZXRJbnRlcnZhbCh0aGlzLl90cmFja0JvdW5kLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIENhcm91c2VsIERyYWdcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUNhcm91c2VsRHJhZyhlKSB7XHJcbiAgICAgIGxldCB4LCB5LCBkZWx0YSwgZGVsdGFZO1xyXG4gICAgICBpZiAodGhpcy5wcmVzc2VkKSB7XHJcbiAgICAgICAgeCA9IHRoaXMuX3hwb3MoZSk7XHJcbiAgICAgICAgeSA9IHRoaXMuX3lwb3MoZSk7XHJcbiAgICAgICAgZGVsdGEgPSB0aGlzLnJlZmVyZW5jZSAtIHg7XHJcbiAgICAgICAgZGVsdGFZID0gTWF0aC5hYnModGhpcy5yZWZlcmVuY2VZIC0geSk7XHJcbiAgICAgICAgaWYgKGRlbHRhWSA8IDMwICYmICF0aGlzLnZlcnRpY2FsRHJhZ2dlZCkge1xyXG4gICAgICAgICAgLy8gSWYgdmVydGljYWwgc2Nyb2xsaW5nIGRvbid0IGFsbG93IGRyYWdnaW5nLlxyXG4gICAgICAgICAgaWYgKGRlbHRhID4gMiB8fCBkZWx0YSA8IC0yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlID0geDtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsKHRoaXMub2Zmc2V0ICsgZGVsdGEpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dlZCkge1xyXG4gICAgICAgICAgLy8gSWYgZHJhZ2dpbmcgZG9uJ3QgYWxsb3cgdmVydGljYWwgc2Nyb2xsLlxyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFZlcnRpY2FsIHNjcm9sbGluZy5cclxuICAgICAgICAgIHRoaXMudmVydGljYWxEcmFnZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmRyYWdnZWQpIHtcclxuICAgICAgICAvLyBJZiBkcmFnZ2luZyBkb24ndCBhbGxvdyB2ZXJ0aWNhbCBzY3JvbGwuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgQ2Fyb3VzZWwgUmVsZWFzZVxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlQ2Fyb3VzZWxSZWxlYXNlKGUpIHtcclxuICAgICAgaWYgKHRoaXMucHJlc3NlZCkge1xyXG4gICAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpY2tlcik7XHJcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgIGlmICh0aGlzLnZlbG9jaXR5ID4gMTAgfHwgdGhpcy52ZWxvY2l0eSA8IC0xMCkge1xyXG4gICAgICAgIHRoaXMuYW1wbGl0dWRlID0gMC45ICogdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMub2Zmc2V0ICsgdGhpcy5hbXBsaXR1ZGU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy50YXJnZXQgPSBNYXRoLnJvdW5kKHRoaXMudGFyZ2V0IC8gdGhpcy5kaW0pICogdGhpcy5kaW07XHJcblxyXG4gICAgICAvLyBObyB3cmFwIG9mIGl0ZW1zLlxyXG4gICAgICBpZiAodGhpcy5ub1dyYXApIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQgPj0gdGhpcy5kaW0gKiAodGhpcy5jb3VudCAtIDEpKSB7XHJcbiAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuZGltICogKHRoaXMuY291bnQgLSAxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0IDwgMCkge1xyXG4gICAgICAgICAgdGhpcy50YXJnZXQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmFtcGxpdHVkZSA9IHRoaXMudGFyZ2V0IC0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgIHRoaXMudGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2F1dG9TY3JvbGxCb3VuZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5kcmFnZ2VkKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIENhcm91c2VsIENMaWNrXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVDYXJvdXNlbENsaWNrKGUpIHtcclxuICAgICAgLy8gRGlzYWJsZSBjbGlja3MgaWYgY2Fyb3VzZWwgd2FzIGRyYWdnZWQuXHJcbiAgICAgIGlmICh0aGlzLmRyYWdnZWQpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuZnVsbFdpZHRoKSB7XHJcbiAgICAgICAgbGV0IGNsaWNrZWRJbmRleCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5jYXJvdXNlbC1pdGVtJykuaW5kZXgoKTtcclxuICAgICAgICBsZXQgZGlmZiA9IHRoaXMuX3dyYXAodGhpcy5jZW50ZXIpIC0gY2xpY2tlZEluZGV4O1xyXG5cclxuICAgICAgICAvLyBEaXNhYmxlIGNsaWNrcyBpZiBjYXJvdXNlbCB3YXMgc2hpZnRlZCBieSBjbGlja1xyXG4gICAgICAgIGlmIChkaWZmICE9PSAwKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jeWNsZVRvKGNsaWNrZWRJbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBJbmRpY2F0b3IgQ0xpY2tcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUluZGljYXRvckNsaWNrKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIGxldCBpbmRpY2F0b3IgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuaW5kaWNhdG9yLWl0ZW0nKTtcclxuICAgICAgaWYgKGluZGljYXRvci5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLl9jeWNsZVRvKGluZGljYXRvci5pbmRleCgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIFRocm90dGxlIFJlc2l6ZVxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlUmVzaXplKGUpIHtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsV2lkdGgpIHtcclxuICAgICAgICB0aGlzLml0ZW1XaWR0aCA9IHRoaXMuJGVsLmZpbmQoJy5jYXJvdXNlbC1pdGVtJykuZmlyc3QoKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZUhlaWdodCA9IHRoaXMuJGVsLmZpbmQoJy5jYXJvdXNlbC1pdGVtLmFjdGl2ZScpLmhlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuZGltID0gdGhpcy5pdGVtV2lkdGggKiAyICsgdGhpcy5vcHRpb25zLnBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmNlbnRlciAqIDIgKiB0aGlzLml0ZW1XaWR0aDtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIHRoaXMuX3NldENhcm91c2VsSGVpZ2h0KHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGNhcm91c2VsIGhlaWdodCBiYXNlZCBvbiBmaXJzdCBzbGlkZVxyXG4gICAgICogQHBhcmFtIHtCb29sZWFtfSBpbWFnZU9ubHkgLSB0cnVlIGZvciBpbWFnZSBzbGlkZXNcclxuICAgICAqL1xyXG4gICAgX3NldENhcm91c2VsSGVpZ2h0KGltYWdlT25seSkge1xyXG4gICAgICBsZXQgZmlyc3RTbGlkZSA9IHRoaXMuJGVsLmZpbmQoJy5jYXJvdXNlbC1pdGVtLmFjdGl2ZScpLmxlbmd0aCA/IHRoaXMuJGVsLmZpbmQoJy5jYXJvdXNlbC1pdGVtLmFjdGl2ZScpLmZpcnN0KCkgOiB0aGlzLiRlbC5maW5kKCcuY2Fyb3VzZWwtaXRlbScpLmZpcnN0KCk7XHJcbiAgICAgIGxldCBmaXJzdEltYWdlID0gZmlyc3RTbGlkZS5maW5kKCdpbWcnKS5maXJzdCgpO1xyXG4gICAgICBpZiAoZmlyc3RJbWFnZS5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoZmlyc3RJbWFnZVswXS5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgLy8gSWYgaW1hZ2Ugd29uJ3QgdHJpZ2dlciB0aGUgbG9hZCBldmVudFxyXG4gICAgICAgICAgbGV0IGltYWdlSGVpZ2h0ID0gZmlyc3RJbWFnZS5oZWlnaHQoKTtcclxuICAgICAgICAgIGlmIChpbWFnZUhlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy4kZWwuY3NzKCdoZWlnaHQnLCBpbWFnZUhlaWdodCArICdweCcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSWYgaW1hZ2Ugc3RpbGwgaGFzIG5vIGhlaWdodCwgdXNlIHRoZSBuYXR1cmFsIGRpbWVuc2lvbnMgdG8gY2FsY3VsYXRlXHJcbiAgICAgICAgICAgIGxldCBuYXR1cmFsV2lkdGggPSBmaXJzdEltYWdlWzBdLm5hdHVyYWxXaWR0aDtcclxuICAgICAgICAgICAgbGV0IG5hdHVyYWxIZWlnaHQgPSBmaXJzdEltYWdlWzBdLm5hdHVyYWxIZWlnaHQ7XHJcbiAgICAgICAgICAgIGxldCBhZGp1c3RlZEhlaWdodCA9ICh0aGlzLiRlbC53aWR0aCgpIC8gbmF0dXJhbFdpZHRoKSAqIG5hdHVyYWxIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsLmNzcygnaGVpZ2h0JywgYWRqdXN0ZWRIZWlnaHQgKyAncHgnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gR2V0IGhlaWdodCB3aGVuIGltYWdlIGlzIGxvYWRlZCBub3JtYWxseVxyXG4gICAgICAgICAgZmlyc3RJbWFnZS5vbmUoJ2xvYWQnLCAoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kZWwuY3NzKCdoZWlnaHQnLCBlbC5vZmZzZXRIZWlnaHQgKyAncHgnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICghaW1hZ2VPbmx5KSB7XHJcbiAgICAgICAgbGV0IHNsaWRlSGVpZ2h0ID0gZmlyc3RTbGlkZS5oZWlnaHQoKTtcclxuICAgICAgICB0aGlzLiRlbC5jc3MoJ2hlaWdodCcsIHNsaWRlSGVpZ2h0ICsgJ3B4Jyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB4IHBvc2l0aW9uIGZyb20gZXZlbnRcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgX3hwb3MoZSkge1xyXG4gICAgICAvLyB0b3VjaCBldmVudFxyXG4gICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoID49IDEpKSB7XHJcbiAgICAgICAgcmV0dXJuIGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBtb3VzZSBldmVudFxyXG4gICAgICByZXR1cm4gZS5jbGllbnRYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHkgcG9zaXRpb24gZnJvbSBldmVudFxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfeXBvcyhlKSB7XHJcbiAgICAgIC8vIHRvdWNoIGV2ZW50XHJcbiAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPj0gMSkpIHtcclxuICAgICAgICByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG1vdXNlIGV2ZW50XHJcbiAgICAgIHJldHVybiBlLmNsaWVudFk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwIGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geFxyXG4gICAgICovXHJcbiAgICBfd3JhcCh4KSB7XHJcbiAgICAgIHJldHVybiAoeCA+PSB0aGlzLmNvdW50KSA/ICh4ICUgdGhpcy5jb3VudCkgOiAoeCA8IDApID8gdGhpcy5fd3JhcCh0aGlzLmNvdW50ICsgKHggJSB0aGlzLmNvdW50KSkgOiB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhY2tzIHNjcm9sbGluZyBpbmZvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBfdHJhY2soKSB7XHJcbiAgICAgIGxldCBub3csIGVsYXBzZWQsIGRlbHRhLCB2O1xyXG5cclxuICAgICAgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGltZXN0YW1wO1xyXG4gICAgICB0aGlzLnRpbWVzdGFtcCA9IG5vdztcclxuICAgICAgZGVsdGEgPSB0aGlzLm9mZnNldCAtIHRoaXMuZnJhbWU7XHJcbiAgICAgIHRoaXMuZnJhbWUgPSB0aGlzLm9mZnNldDtcclxuXHJcbiAgICAgIHYgPSAxMDAwICogZGVsdGEgLyAoMSArIGVsYXBzZWQpO1xyXG4gICAgICB0aGlzLnZlbG9jaXR5ID0gMC44ICogdiArIDAuMiAqIHRoaXMudmVsb2NpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRvIHNjcm9sbHMgdG8gbmVhcmVzdCBjYXJvdXNlbCBpdGVtLlxyXG4gICAgICovXHJcbiAgICBfYXV0b1Njcm9sbCgpIHtcclxuICAgICAgbGV0IGVsYXBzZWQsIGRlbHRhO1xyXG5cclxuICAgICAgaWYgKHRoaXMuYW1wbGl0dWRlKSB7XHJcbiAgICAgICAgZWxhcHNlZCA9IERhdGUubm93KCkgLSB0aGlzLnRpbWVzdGFtcDtcclxuICAgICAgICBkZWx0YSA9IHRoaXMuYW1wbGl0dWRlICogTWF0aC5leHAoLWVsYXBzZWQgLyB0aGlzLm9wdGlvbnMuZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChkZWx0YSA+IDIgfHwgZGVsdGEgPCAtMikge1xyXG4gICAgICAgICAgdGhpcy5fc2Nyb2xsKHRoaXMudGFyZ2V0IC0gZGVsdGEpO1xyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2F1dG9TY3JvbGxCb3VuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX3Njcm9sbCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY3JvbGwgdG8gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geFxyXG4gICAgICovXHJcbiAgICBfc2Nyb2xsKHgpIHtcclxuICAgICAgLy8gVHJhY2sgc2Nyb2xsaW5nIHN0YXRlXHJcbiAgICAgIGlmICghdGhpcy4kZWwuaGFzQ2xhc3MoJ3Njcm9sbGluZycpKSB7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdzY3JvbGxpbmcnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zY3JvbGxpbmdUaW1lb3V0ICE9IG51bGwpIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsaW5nVGltZW91dCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zY3JvbGxpbmdUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdzY3JvbGxpbmcnKTtcclxuICAgICAgfSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uKTtcclxuXHJcbiAgICAgIC8vIFN0YXJ0IGFjdHVhbCBzY3JvbGxcclxuICAgICAgbGV0IGksIGhhbGYsIGRlbHRhLCBkaXIsIHR3ZWVuLCBlbCwgYWxpZ25tZW50LCB6VHJhbnNsYXRpb24sIHR3ZWVuZWRPcGFjaXR5O1xyXG4gICAgICBsZXQgbGFzdENlbnRlciA9IHRoaXMuY2VudGVyO1xyXG5cclxuICAgICAgdGhpcy5vZmZzZXQgPSAodHlwZW9mIHggPT09ICdudW1iZXInKSA/IHggOiB0aGlzLm9mZnNldDtcclxuICAgICAgdGhpcy5jZW50ZXIgPSBNYXRoLmZsb29yKCh0aGlzLm9mZnNldCArIHRoaXMuZGltIC8gMikgLyB0aGlzLmRpbSk7XHJcbiAgICAgIGRlbHRhID0gdGhpcy5vZmZzZXQgLSB0aGlzLmNlbnRlciAqIHRoaXMuZGltO1xyXG4gICAgICBkaXIgPSAoZGVsdGEgPCAwKSA/IDEgOiAtMTtcclxuICAgICAgdHdlZW4gPSAtZGlyICogZGVsdGEgKiAyIC8gdGhpcy5kaW07XHJcbiAgICAgIGhhbGYgPSB0aGlzLmNvdW50ID4+IDE7XHJcblxyXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5mdWxsV2lkdGgpIHtcclxuICAgICAgICBhbGlnbm1lbnQgPSAndHJhbnNsYXRlWCgnICsgKHRoaXMuZWwuY2xpZW50V2lkdGggLSB0aGlzLml0ZW1XaWR0aCkgLyAyICsgJ3B4KSAnO1xyXG4gICAgICAgIGFsaWdubWVudCArPSAndHJhbnNsYXRlWSgnICsgKHRoaXMuZWwuY2xpZW50SGVpZ2h0IC0gdGhpcy5pdGVtSGVpZ2h0KSAvIDIgKyAncHgpJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGlnbm1lbnQgPSAndHJhbnNsYXRlWCgwKSc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNldCBpbmRpY2F0b3IgYWN0aXZlXHJcbiAgICAgIGlmICh0aGlzLnNob3dJbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgbGV0IGRpZmYgPSAodGhpcy5jZW50ZXIgJSB0aGlzLmNvdW50KTtcclxuICAgICAgICBsZXQgYWN0aXZlSW5kaWNhdG9yID0gdGhpcy4kaW5kaWNhdG9ycy5maW5kKCcuaW5kaWNhdG9yLWl0ZW0uYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKGFjdGl2ZUluZGljYXRvci5pbmRleCgpICE9PSBkaWZmKSB7XHJcbiAgICAgICAgICBhY3RpdmVJbmRpY2F0b3IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy4kaW5kaWNhdG9ycy5maW5kKCcuaW5kaWNhdG9yLWl0ZW0nKS5lcShkaWZmKVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNlbnRlclxyXG4gICAgICAvLyBEb24ndCBzaG93IHdyYXBwZWQgaXRlbXMuXHJcbiAgICAgIGlmICghdGhpcy5ub1dyYXAgfHwgKHRoaXMuY2VudGVyID49IDAgJiYgdGhpcy5jZW50ZXIgPCB0aGlzLmNvdW50KSkge1xyXG4gICAgICAgIGVsID0gdGhpcy5pbWFnZXNbdGhpcy5fd3JhcCh0aGlzLmNlbnRlcildO1xyXG5cclxuICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGNlbnRlciBpdGVtLlxyXG4gICAgICAgIGlmICghJChlbCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICB0aGlzLiRlbC5maW5kKCcuY2Fyb3VzZWwtaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbC5zdHlsZVt0aGlzLnhmb3JtXSA9IGFsaWdubWVudCArXHJcbiAgICAgICAgICAnIHRyYW5zbGF0ZVgoJyArICgtZGVsdGEgLyAyKSArICdweCknICtcclxuICAgICAgICAgICcgdHJhbnNsYXRlWCgnICsgKGRpciAqIHRoaXMub3B0aW9ucy5zaGlmdCAqIHR3ZWVuICogaSkgKyAncHgpJyArXHJcbiAgICAgICAgICAnIHRyYW5zbGF0ZVooJyArICh0aGlzLm9wdGlvbnMuZGlzdCAqIHR3ZWVuKSArICdweCknO1xyXG4gICAgICAgIGVsLnN0eWxlLnpJbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsV2lkdGgpIHtcclxuICAgICAgICAgIHR3ZWVuZWRPcGFjaXR5ID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdHdlZW5lZE9wYWNpdHkgPSAxIC0gMC4yICogdHdlZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSB0d2VlbmVkT3BhY2l0eTtcclxuICAgICAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGkgPSAxOyBpIDw9IGhhbGY7ICsraSkge1xyXG4gICAgICAgIC8vIHJpZ2h0IHNpZGVcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZ1bGxXaWR0aCkge1xyXG4gICAgICAgICAgelRyYW5zbGF0aW9uID0gdGhpcy5vcHRpb25zLmRpc3Q7XHJcbiAgICAgICAgICB0d2VlbmVkT3BhY2l0eSA9IChpID09PSBoYWxmICYmIGRlbHRhIDwgMCkgPyAxIC0gdHdlZW4gOiAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB6VHJhbnNsYXRpb24gPSB0aGlzLm9wdGlvbnMuZGlzdCAqIChpICogMiArIHR3ZWVuICogZGlyKTtcclxuICAgICAgICAgIHR3ZWVuZWRPcGFjaXR5ID0gMSAtIDAuMiAqIChpICogMiArIHR3ZWVuICogZGlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG9uJ3Qgc2hvdyB3cmFwcGVkIGl0ZW1zLlxyXG4gICAgICAgIGlmICghdGhpcy5ub1dyYXAgfHwgdGhpcy5jZW50ZXIgKyBpIDwgdGhpcy5jb3VudCkge1xyXG4gICAgICAgICAgZWwgPSB0aGlzLmltYWdlc1t0aGlzLl93cmFwKHRoaXMuY2VudGVyICsgaSldO1xyXG4gICAgICAgICAgZWwuc3R5bGVbdGhpcy54Zm9ybV0gPSBhbGlnbm1lbnQgK1xyXG4gICAgICAgICAgICAnIHRyYW5zbGF0ZVgoJyArICh0aGlzLm9wdGlvbnMuc2hpZnQgKyAodGhpcy5kaW0gKiBpIC0gZGVsdGEpIC8gMikgKyAncHgpJyArXHJcbiAgICAgICAgICAgICcgdHJhbnNsYXRlWignICsgelRyYW5zbGF0aW9uICsgJ3B4KSc7XHJcbiAgICAgICAgICBlbC5zdHlsZS56SW5kZXggPSAtaTtcclxuICAgICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSB0d2VlbmVkT3BhY2l0eTtcclxuICAgICAgICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gbGVmdCBzaWRlXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsV2lkdGgpIHtcclxuICAgICAgICAgIHpUcmFuc2xhdGlvbiA9IHRoaXMub3B0aW9ucy5kaXN0O1xyXG4gICAgICAgICAgdHdlZW5lZE9wYWNpdHkgPSAoaSA9PT0gaGFsZiAmJiBkZWx0YSA+IDApID8gMSAtIHR3ZWVuIDogMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgelRyYW5zbGF0aW9uID0gdGhpcy5vcHRpb25zLmRpc3QgKiAoaSAqIDIgLSB0d2VlbiAqIGRpcik7XHJcbiAgICAgICAgICB0d2VlbmVkT3BhY2l0eSA9IDEgLSAwLjIgKiAoaSAqIDIgLSB0d2VlbiAqIGRpcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvbid0IHNob3cgd3JhcHBlZCBpdGVtcy5cclxuICAgICAgICBpZiAoIXRoaXMubm9XcmFwIHx8IHRoaXMuY2VudGVyIC0gaSA+PSAwKSB7XHJcbiAgICAgICAgICBlbCA9IHRoaXMuaW1hZ2VzW3RoaXMuX3dyYXAodGhpcy5jZW50ZXIgLSBpKV07XHJcbiAgICAgICAgICBlbC5zdHlsZVt0aGlzLnhmb3JtXSA9IGFsaWdubWVudCArXHJcbiAgICAgICAgICAgICcgdHJhbnNsYXRlWCgnICsgKC10aGlzLm9wdGlvbnMuc2hpZnQgKyAoLXRoaXMuZGltICogaSAtIGRlbHRhKSAvIDIpICsgJ3B4KScgK1xyXG4gICAgICAgICAgICAnIHRyYW5zbGF0ZVooJyArIHpUcmFuc2xhdGlvbiArICdweCknO1xyXG4gICAgICAgICAgZWwuc3R5bGUuekluZGV4ID0gLWk7XHJcbiAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gdHdlZW5lZE9wYWNpdHk7XHJcbiAgICAgICAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2VudGVyXHJcbiAgICAgIC8vIERvbid0IHNob3cgd3JhcHBlZCBpdGVtcy5cclxuICAgICAgaWYgKCF0aGlzLm5vV3JhcCB8fCAodGhpcy5jZW50ZXIgPj0gMCAmJiB0aGlzLmNlbnRlciA8IHRoaXMuY291bnQpKSB7XHJcbiAgICAgICAgZWwgPSB0aGlzLmltYWdlc1t0aGlzLl93cmFwKHRoaXMuY2VudGVyKV07XHJcbiAgICAgICAgZWwuc3R5bGVbdGhpcy54Zm9ybV0gPSBhbGlnbm1lbnQgK1xyXG4gICAgICAgICAgJyB0cmFuc2xhdGVYKCcgKyAoLWRlbHRhIC8gMikgKyAncHgpJyArXHJcbiAgICAgICAgICAnIHRyYW5zbGF0ZVgoJyArIChkaXIgKiB0aGlzLm9wdGlvbnMuc2hpZnQgKiB0d2VlbikgKyAncHgpJyArXHJcbiAgICAgICAgICAnIHRyYW5zbGF0ZVooJyArICh0aGlzLm9wdGlvbnMuZGlzdCAqIHR3ZWVuKSArICdweCknO1xyXG4gICAgICAgIGVsLnN0eWxlLnpJbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsV2lkdGgpIHtcclxuICAgICAgICAgIHR3ZWVuZWRPcGFjaXR5ID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdHdlZW5lZE9wYWNpdHkgPSAxIC0gMC4yICogdHdlZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSB0d2VlbmVkT3BhY2l0eTtcclxuICAgICAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBvbkN5Y2xlVG8gY2FsbGJhY2tcclxuICAgICAgbGV0ICRjdXJySXRlbSA9IHRoaXMuJGVsLmZpbmQoJy5jYXJvdXNlbC1pdGVtJykuZXEodGhpcy5fd3JhcCh0aGlzLmNlbnRlcikpO1xyXG4gICAgICBpZiAobGFzdENlbnRlciAhPT0gdGhpcy5jZW50ZXIgJiZcclxuICAgICAgICB0eXBlb2YgKHRoaXMub3B0aW9ucy5vbkN5Y2xlVG8pID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMub25DeWNsZVRvLmNhbGwodGhpcywgJGN1cnJJdGVtWzBdLCB0aGlzLmRyYWdnZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBPbmUgdGltZSBjYWxsYmFja1xyXG4gICAgICBpZiAodHlwZW9mICh0aGlzLm9uZVRpbWVDYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHRoaXMub25lVGltZUNhbGxiYWNrLmNhbGwodGhpcywgJGN1cnJJdGVtWzBdLCB0aGlzLmRyYWdnZWQpO1xyXG4gICAgICAgIHRoaXMub25lVGltZUNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3ljbGUgdG8gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAqL1xyXG4gICAgX2N5Y2xlVG8obiwgY2FsbGJhY2spIHtcclxuICAgICAgbGV0IGRpZmYgPSAodGhpcy5jZW50ZXIgJSB0aGlzLmNvdW50KSAtIG47XHJcblxyXG4gICAgICAvLyBBY2NvdW50IGZvciB3cmFwYXJvdW5kLlxyXG4gICAgICBpZiAoIXRoaXMubm9XcmFwKSB7XHJcbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XHJcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZiArIHRoaXMuY291bnQpIDwgTWF0aC5hYnMoZGlmZikpIHtcclxuICAgICAgICAgICAgZGlmZiArPSB0aGlzLmNvdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XHJcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZiAtIHRoaXMuY291bnQpIDwgZGlmZikge1xyXG4gICAgICAgICAgICBkaWZmIC09IHRoaXMuY291bnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRhcmdldCA9ICh0aGlzLmRpbSAqIE1hdGgucm91bmQodGhpcy5vZmZzZXQgLyB0aGlzLmRpbSkpO1xyXG4gICAgICAvLyBOZXh0XHJcbiAgICAgIGlmIChkaWZmIDwgMCkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ICs9ICh0aGlzLmRpbSAqIE1hdGguYWJzKGRpZmYpKTtcclxuXHJcbiAgICAgICAgLy8gUHJldlxyXG4gICAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgLT0gKHRoaXMuZGltICogZGlmZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNldCBvbmUgdGltZSBjYWxsYmFja1xyXG4gICAgICBpZiAodHlwZW9mIChjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHRoaXMub25lVGltZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNjcm9sbFxyXG4gICAgICBpZiAodGhpcy5vZmZzZXQgIT09IHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5hbXBsaXR1ZGUgPSB0aGlzLnRhcmdldCAtIHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYXV0b1Njcm9sbEJvdW5kKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEN5Y2xlIHRvIG5leHQgaXRlbVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtuXVxyXG4gICAgICovXHJcbiAgICBuZXh0KG4pIHtcclxuICAgICAgaWYgKG4gPT09IHVuZGVmaW5lZCB8fCBpc05hTihuKSkge1xyXG4gICAgICAgIG4gPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgaW5kZXggPSB0aGlzLmNlbnRlciArIG47XHJcbiAgICAgIGlmIChpbmRleCA+IHRoaXMuY291bnQgfHwgaW5kZXggPCAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9XcmFwKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbmRleCA9IHRoaXMuX3dyYXAoaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2N5Y2xlVG8oaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3ljbGUgdG8gcHJldmlvdXMgaXRlbVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtuXVxyXG4gICAgICovXHJcbiAgICBwcmV2KG4pIHtcclxuICAgICAgaWYgKG4gPT09IHVuZGVmaW5lZCB8fCBpc05hTihuKSkge1xyXG4gICAgICAgIG4gPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgaW5kZXggPSB0aGlzLmNlbnRlciAtIG47XHJcbiAgICAgIGlmIChpbmRleCA+IHRoaXMuY291bnQgfHwgaW5kZXggPCAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9XcmFwKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbmRleCA9IHRoaXMuX3dyYXAoaW5kZXgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9jeWNsZVRvKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEN5Y2xlIHRvIG50aCBpdGVtXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW25dXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBzZXQobiwgY2FsbGJhY2spIHtcclxuICAgICAgaWYgKG4gPT09IHVuZGVmaW5lZCB8fCBpc05hTihuKSkge1xyXG4gICAgICAgIG4gPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobiA+IHRoaXMuY291bnQgfHwgbiA8IDApIHtcclxuICAgICAgICBpZiAodGhpcy5ub1dyYXApIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG4gPSB0aGlzLl93cmFwKG4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9jeWNsZVRvKG4sIGNhbGxiYWNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIE0uQ2Fyb3VzZWwgPSBDYXJvdXNlbDtcclxuXHJcbiAgaWYgKE0ualF1ZXJ5TG9hZGVkKSB7XHJcbiAgICBNLmluaXRpYWxpemVKcXVlcnlXcmFwcGVyKENhcm91c2VsLCAnY2Fyb3VzZWwnLCAnTV9DYXJvdXNlbCcpO1xyXG4gIH1cclxuXHJcbn0oY2FzaCkpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgbGV0IF9kZWZhdWx0cyA9IHtcclxuICAgIG9uT3BlbjogdW5kZWZpbmVkLFxyXG4gICAgb25DbG9zZTogdW5kZWZpbmVkLFxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAY2xhc3NcclxuICAgKlxyXG4gICAqL1xyXG4gIGNsYXNzIEZlYXR1cmVEaXNjb3ZlcnkgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3QgRmVhdHVyZURpc2NvdmVyeSBpbnN0YW5jZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucykge1xyXG4gICAgICBzdXBlcihGZWF0dXJlRGlzY292ZXJ5LCBlbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmVsLk1fRmVhdHVyZURpc2NvdmVyeSA9IHRoaXM7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogT3B0aW9ucyBmb3IgdGhlIHNlbGVjdFxyXG4gICAgICAgKiBAbWVtYmVyIEZlYXR1cmVEaXNjb3Zlcnkjb3B0aW9uc1xyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uT3BlbiAtIENhbGxiYWNrIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGZlYXR1cmUgZGlzY292ZXJ5IGlzIG9wZW5lZFxyXG4gICAgICAgKiBAcHJvcCB7RnVuY3Rpb259IG9uQ2xvc2UgLSBDYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgd2hlbiBmZWF0dXJlIGRpc2NvdmVyeSBpcyBjbG9zZWRcclxuICAgICAgICovXHJcbiAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBGZWF0dXJlRGlzY292ZXJ5LmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBzZXR1cFxyXG4gICAgICB0aGlzLiRvcmlnaW4gPSAkKCcjJyArIHRoaXMuJGVsLmF0dHIoJ2RhdGEtdGFyZ2V0JykpO1xyXG4gICAgICB0aGlzLl9zZXR1cCgpO1xyXG5cclxuICAgICAgdGhpcy5fY2FsY3VsYXRlUG9zaXRpb25pbmcoKTtcclxuICAgICAgdGhpcy5fc2V0dXBFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcclxuICAgICAgcmV0dXJuIF9kZWZhdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLmluaXQodGhpcywgZWxzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWwpIHtcclxuICAgICAgbGV0IGRvbUVsZW0gPSAhIWVsLmpxdWVyeSA/IGVsWzBdIDogZWw7XHJcbiAgICAgIHJldHVybiBkb21FbGVtLk1fRmVhdHVyZURpc2NvdmVyeTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlYXJkb3duIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICB0aGlzLl9yZW1vdmVFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgIHRoaXMuZWwuRmVhdHVyZURpc2NvdmVyeSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIEV2ZW50IEhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIF9zZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2tCb3VuZCA9IHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5faGFuZGxlVGFyZ2V0Q2xpY2tCb3VuZCA9IHRoaXMuX2hhbmRsZVRhcmdldENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZU9yaWdpbkNsaWNrQm91bmQgPSB0aGlzLl9oYW5kbGVPcmlnaW5DbGljay5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVRhcmdldENsaWNrQm91bmQpO1xyXG4gICAgICB0aGlzLm9yaWdpbkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlT3JpZ2luQ2xpY2tCb3VuZCk7XHJcblxyXG4gICAgICAvLyBSZXNpemVcclxuICAgICAgbGV0IHRocm90dGxlZFJlc2l6ZSA9IE0udGhyb3R0bGUodGhpcy5faGFuZGxlUmVzaXplLCAyMDApO1xyXG4gICAgICB0aGlzLl9oYW5kbGVUaHJvdHRsZWRSZXNpemVCb3VuZCA9IHRocm90dGxlZFJlc2l6ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVRocm90dGxlZFJlc2l6ZUJvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBFdmVudCBIYW5kbGVyc1xyXG4gICAgICovXHJcbiAgICBfcmVtb3ZlRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVRhcmdldENsaWNrQm91bmQpO1xyXG4gICAgICB0aGlzLm9yaWdpbkVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlT3JpZ2luQ2xpY2tCb3VuZCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVUaHJvdHRsZWRSZXNpemVCb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgVGFyZ2V0IENsaWNrXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVUYXJnZXRDbGljayhlKSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIE9yaWdpbiBDbGlja1xyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlT3JpZ2luQ2xpY2soZSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgUmVzaXplXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVSZXNpemUoZSkge1xyXG4gICAgICB0aGlzLl9jYWxjdWxhdGVQb3NpdGlvbmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIFJlc2l6ZVxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlRG9jdW1lbnRDbGljayhlKSB7XHJcbiAgICAgIGlmICghJChlLnRhcmdldCkuY2xvc2VzdCgnLnRhcC10YXJnZXQtd3JhcHBlcicpLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgZmVhdHVyZSBkaXNjb3ZlcnlcclxuICAgICAqL1xyXG4gICAgX3NldHVwKCkge1xyXG4gICAgICAvLyBDcmVhdGluZyB0YXAgdGFyZ2V0XHJcbiAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuJGVsLnBhcmVudCgpWzBdO1xyXG4gICAgICB0aGlzLndhdmVFbCA9ICQodGhpcy53cmFwcGVyKS5maW5kKCcudGFwLXRhcmdldC13YXZlJylbMF07XHJcbiAgICAgIHRoaXMub3JpZ2luRWwgPSAkKHRoaXMud3JhcHBlcikuZmluZCgnLnRhcC10YXJnZXQtb3JpZ2luJylbMF07XHJcbiAgICAgIHRoaXMuY29udGVudEVsID0gdGhpcy4kZWwuZmluZCgnLnRhcC10YXJnZXQtY29udGVudCcpWzBdO1xyXG5cclxuICAgICAgLy8gQ3JlYXRpbmcgd3JhcHBlclxyXG4gICAgICBpZiAoISQodGhpcy53cmFwcGVyKS5oYXNDbGFzcygnLnRhcC10YXJnZXQtd3JhcHBlcicpKSB7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3RhcC10YXJnZXQtd3JhcHBlcicpO1xyXG4gICAgICAgIHRoaXMuJGVsLmJlZm9yZSgkKHRoaXMud3JhcHBlcikpO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5hcHBlbmQodGhpcy5lbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENyZWF0aW5nIGNvbnRlbnRcclxuICAgICAgaWYgKCF0aGlzLmNvbnRlbnRFbCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuY2xhc3NMaXN0LmFkZCgndGFwLXRhcmdldC1jb250ZW50Jyk7XHJcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuY29udGVudEVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ3JlYXRpbmcgZm9yZWdyb3VuZCB3YXZlXHJcbiAgICAgIGlmICghdGhpcy53YXZlRWwpIHtcclxuICAgICAgICB0aGlzLndhdmVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMud2F2ZUVsLmNsYXNzTGlzdC5hZGQoJ3RhcC10YXJnZXQtd2F2ZScpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGluZyBvcmlnaW5cclxuICAgICAgICBpZiAoIXRoaXMub3JpZ2luRWwpIHtcclxuICAgICAgICAgIHRoaXMub3JpZ2luRWwgPSB0aGlzLiRvcmlnaW4uY2xvbmUodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLm9yaWdpbkVsLmFkZENsYXNzKCd0YXAtdGFyZ2V0LW9yaWdpbicpO1xyXG4gICAgICAgICAgdGhpcy5vcmlnaW5FbC5yZW1vdmVBdHRyKCdpZCcpO1xyXG4gICAgICAgICAgdGhpcy5vcmlnaW5FbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgdGhpcy5vcmlnaW5FbCA9IHRoaXMub3JpZ2luRWxbMF07XHJcbiAgICAgICAgICB0aGlzLndhdmVFbC5hcHBlbmQodGhpcy5vcmlnaW5FbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kKHRoaXMud2F2ZUVsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHBvc2l0aW9uaW5nXHJcbiAgICAgKi9cclxuICAgIF9jYWxjdWxhdGVQb3NpdGlvbmluZygpIHtcclxuICAgICAgLy8gRWxlbWVudCBvciBwYXJlbnQgaXMgZml4ZWQgcG9zaXRpb24/XHJcbiAgICAgIGxldCBpc0ZpeGVkID0gdGhpcy4kb3JpZ2luLmNzcygncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJztcclxuICAgICAgaWYgKCFpc0ZpeGVkKSB7XHJcbiAgICAgICAgbGV0IHBhcmVudHMgPSB0aGlzLiRvcmlnaW4ucGFyZW50cygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaXNGaXhlZCA9ICQocGFyZW50c1tpXSkuY3NzKCdwb3NpdGlvbicpID09ICdmaXhlZCc7XHJcbiAgICAgICAgICBpZiAoaXNGaXhlZCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENhbGN1bGF0aW5nIG9yaWdpblxyXG4gICAgICBsZXQgb3JpZ2luV2lkdGggPSB0aGlzLiRvcmlnaW4ub3V0ZXJXaWR0aCgpO1xyXG4gICAgICBsZXQgb3JpZ2luSGVpZ2h0ID0gdGhpcy4kb3JpZ2luLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgIGxldCBvcmlnaW5Ub3AgPSBpc0ZpeGVkID8gdGhpcy4kb3JpZ2luLm9mZnNldCgpLnRvcCAtIE0uZ2V0RG9jdW1lbnRTY3JvbGxUb3AoKSA6IHRoaXMuJG9yaWdpbi5vZmZzZXQoKS50b3A7XHJcbiAgICAgIGxldCBvcmlnaW5MZWZ0ID0gaXNGaXhlZCA/IHRoaXMuJG9yaWdpbi5vZmZzZXQoKS5sZWZ0IC0gTS5nZXREb2N1bWVudFNjcm9sbExlZnQoKSA6IHRoaXMuJG9yaWdpbi5vZmZzZXQoKS5sZWZ0O1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRpbmcgc2NyZWVuXHJcbiAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICBsZXQgY2VudGVyWCA9IHdpbmRvd1dpZHRoIC8gMjtcclxuICAgICAgbGV0IGNlbnRlclkgPSB3aW5kb3dIZWlnaHQgLyAyO1xyXG4gICAgICBsZXQgaXNMZWZ0ID0gb3JpZ2luTGVmdCA8PSBjZW50ZXJYO1xyXG4gICAgICBsZXQgaXNSaWdodCA9IG9yaWdpbkxlZnQgPiBjZW50ZXJYO1xyXG4gICAgICBsZXQgaXNUb3AgPSBvcmlnaW5Ub3AgPD0gY2VudGVyWTtcclxuICAgICAgbGV0IGlzQm90dG9tID0gb3JpZ2luVG9wID4gY2VudGVyWTtcclxuICAgICAgbGV0IGlzQ2VudGVyWCA9IG9yaWdpbkxlZnQgPj0gd2luZG93V2lkdGggKiAwLjI1ICYmIG9yaWdpbkxlZnQgPD0gd2luZG93V2lkdGggKiAwLjc1O1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRpbmcgdGFwIHRhcmdldFxyXG4gICAgICBsZXQgdGFwVGFyZ2V0V2lkdGggPSB0aGlzLiRlbC5vdXRlcldpZHRoKCk7XHJcbiAgICAgIGxldCB0YXBUYXJnZXRIZWlnaHQgPSB0aGlzLiRlbC5vdXRlckhlaWdodCgpO1xyXG4gICAgICBsZXQgdGFwVGFyZ2V0VG9wID0gb3JpZ2luVG9wICsgb3JpZ2luSGVpZ2h0IC8gMiAtIHRhcFRhcmdldEhlaWdodCAvIDI7XHJcbiAgICAgIGxldCB0YXBUYXJnZXRMZWZ0ID0gb3JpZ2luTGVmdCArIG9yaWdpbldpZHRoIC8gMiAtIHRhcFRhcmdldFdpZHRoIC8gMjtcclxuICAgICAgbGV0IHRhcFRhcmdldFBvc2l0aW9uID0gaXNGaXhlZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRpbmcgY29udGVudFxyXG4gICAgICBsZXQgdGFwVGFyZ2V0VGV4dFdpZHRoID0gaXNDZW50ZXJYID8gdGFwVGFyZ2V0V2lkdGggOiB0YXBUYXJnZXRXaWR0aCAvIDIgKyBvcmlnaW5XaWR0aDtcclxuICAgICAgbGV0IHRhcFRhcmdldFRleHRIZWlnaHQgPSB0YXBUYXJnZXRIZWlnaHQgLyAyO1xyXG4gICAgICBsZXQgdGFwVGFyZ2V0VGV4dFRvcCA9IGlzVG9wID8gdGFwVGFyZ2V0SGVpZ2h0IC8gMiA6IDA7XHJcbiAgICAgIGxldCB0YXBUYXJnZXRUZXh0Qm90dG9tID0gMDtcclxuICAgICAgbGV0IHRhcFRhcmdldFRleHRMZWZ0ID0gaXNMZWZ0ICYmICFpc0NlbnRlclggPyB0YXBUYXJnZXRXaWR0aCAvIDIgLSBvcmlnaW5XaWR0aCA6IDA7XHJcbiAgICAgIGxldCB0YXBUYXJnZXRUZXh0UmlnaHQgPSAwO1xyXG4gICAgICBsZXQgdGFwVGFyZ2V0VGV4dFBhZGRpbmcgPSBvcmlnaW5XaWR0aDtcclxuICAgICAgbGV0IHRhcFRhcmdldFRleHRBbGlnbiA9IGlzQm90dG9tID8gJ2JvdHRvbScgOiAndG9wJztcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0aW5nIHdhdmVcclxuICAgICAgbGV0IHRhcFRhcmdldFdhdmVXaWR0aCA9IG9yaWdpbldpZHRoID4gb3JpZ2luSGVpZ2h0ID8gb3JpZ2luV2lkdGggKiAyIDogb3JpZ2luV2lkdGggKiAyO1xyXG4gICAgICBsZXQgdGFwVGFyZ2V0V2F2ZUhlaWdodCA9IHRhcFRhcmdldFdhdmVXaWR0aDtcclxuICAgICAgbGV0IHRhcFRhcmdldFdhdmVUb3AgPSB0YXBUYXJnZXRIZWlnaHQgLyAyIC0gdGFwVGFyZ2V0V2F2ZUhlaWdodCAvIDI7XHJcbiAgICAgIGxldCB0YXBUYXJnZXRXYXZlTGVmdCA9IHRhcFRhcmdldFdpZHRoIC8gMiAtIHRhcFRhcmdldFdhdmVXaWR0aCAvIDI7XHJcblxyXG4gICAgICAvLyBTZXR0aW5nIHRhcCB0YXJnZXRcclxuICAgICAgbGV0IHRhcFRhcmdldFdyYXBwZXJDc3NPYmogPSB7fTtcclxuICAgICAgdGFwVGFyZ2V0V3JhcHBlckNzc09iai50b3AgPSBpc1RvcCA/IHRhcFRhcmdldFRvcCArICdweCcgOiAnJztcclxuICAgICAgdGFwVGFyZ2V0V3JhcHBlckNzc09iai5yaWdodCA9IGlzUmlnaHQgPyAod2luZG93V2lkdGggLSB0YXBUYXJnZXRMZWZ0IC0gdGFwVGFyZ2V0V2lkdGgpICsgJ3B4JyA6ICcnO1xyXG4gICAgICB0YXBUYXJnZXRXcmFwcGVyQ3NzT2JqLmJvdHRvbSA9IGlzQm90dG9tID8gKHdpbmRvd0hlaWdodCAtIHRhcFRhcmdldFRvcCAtIHRhcFRhcmdldEhlaWdodCkgKyAncHgnIDogJyc7XHJcbiAgICAgIHRhcFRhcmdldFdyYXBwZXJDc3NPYmoubGVmdCA9IGlzTGVmdCA/IHRhcFRhcmdldExlZnQgKyAncHgnIDogJyc7XHJcbiAgICAgIHRhcFRhcmdldFdyYXBwZXJDc3NPYmoucG9zaXRpb24gPSB0YXBUYXJnZXRQb3NpdGlvbjtcclxuICAgICAgJCh0aGlzLndyYXBwZXIpLmNzcyh0YXBUYXJnZXRXcmFwcGVyQ3NzT2JqKTtcclxuXHJcbiAgICAgIC8vIFNldHRpbmcgY29udGVudFxyXG4gICAgICAkKHRoaXMuY29udGVudEVsKS5jc3Moe1xyXG4gICAgICAgIHdpZHRoOiB0YXBUYXJnZXRUZXh0V2lkdGggKyAncHgnLFxyXG4gICAgICAgIGhlaWdodDogdGFwVGFyZ2V0VGV4dEhlaWdodCArICdweCcsXHJcbiAgICAgICAgdG9wOiB0YXBUYXJnZXRUZXh0VG9wICsgJ3B4JyxcclxuICAgICAgICByaWdodDogdGFwVGFyZ2V0VGV4dFJpZ2h0ICsgJ3B4JyxcclxuICAgICAgICBib3R0b206IHRhcFRhcmdldFRleHRCb3R0b20gKyAncHgnLFxyXG4gICAgICAgIGxlZnQ6IHRhcFRhcmdldFRleHRMZWZ0ICsgJ3B4JyxcclxuICAgICAgICBwYWRkaW5nOiB0YXBUYXJnZXRUZXh0UGFkZGluZyArICdweCcsXHJcbiAgICAgICAgdmVydGljYWxBbGlnbjogdGFwVGFyZ2V0VGV4dEFsaWduXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gU2V0dGluZyB3YXZlXHJcbiAgICAgICQodGhpcy53YXZlRWwpLmNzcyh7XHJcbiAgICAgICAgdG9wOiB0YXBUYXJnZXRXYXZlVG9wICsgJ3B4JyxcclxuICAgICAgICBsZWZ0OiB0YXBUYXJnZXRXYXZlTGVmdCArICdweCcsXHJcbiAgICAgICAgd2lkdGg6IHRhcFRhcmdldFdhdmVXaWR0aCArICdweCcsXHJcbiAgICAgICAgaGVpZ2h0OiB0YXBUYXJnZXRXYXZlSGVpZ2h0ICsgJ3B4J1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gRmVhdHVyZSBEaXNjb3ZlcnlcclxuICAgICAqL1xyXG4gICAgb3BlbigpIHtcclxuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBvbk9wZW4gY2FsbGJhY2tcclxuICAgICAgaWYgKHR5cGVvZiAodGhpcy5vcHRpb25zLm9uT3BlbikgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMub25PcGVuLmNhbGwodGhpcywgdGhpcy4kb3JpZ2luWzBdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICB0aGlzLndyYXBwZXIuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2tCb3VuZCwgdHJ1ZSk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrQm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2UgRmVhdHVyZSBEaXNjb3ZlcnlcclxuICAgICAqL1xyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG9uQ2xvc2UgY2FsbGJhY2tcclxuICAgICAgaWYgKHR5cGVvZiAodGhpcy5vcHRpb25zLm9uQ2xvc2UpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2xvc2UuY2FsbCh0aGlzLCB0aGlzLiRvcmlnaW5bMF0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLndyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2tCb3VuZCwgdHJ1ZSk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrQm91bmQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgTS5GZWF0dXJlRGlzY292ZXJ5ID0gRmVhdHVyZURpc2NvdmVyeTtcclxuXHJcbiAgaWYgKE0ualF1ZXJ5TG9hZGVkKSB7XHJcbiAgICBNLmluaXRpYWxpemVKcXVlcnlXcmFwcGVyKEZlYXR1cmVEaXNjb3ZlcnksICdmZWF0dXJlRGlzY292ZXJ5JywgJ01fRmVhdHVyZURpc2NvdmVyeScpO1xyXG4gIH1cclxuXHJcbn0oY2FzaCkpO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
