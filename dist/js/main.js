(function ($) {

  var methods = {

    init : function(options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
      };
      options = $.extend(defaults, options);

      return this.each(function() {

        // For each slider, we want to keep track of
        // which slide is active and its associated content
        var $this = $(this);
        var $slider = $this.find('ul.slides').first();
        var $slides = $slider.find('> li');
        var $active_index = $slider.find('.active').index();
        var $active, $indicators, $interval;
        if ($active_index != -1) { $active = $slides.eq($active_index); }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass("center-align")) {
            caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("right-align")) {
            caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("left-align")) {
            caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          // Wrap around indices.
          if (index >= $slides.length) index = 0;
          else if (index < 0) index = $slides.length -1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
                              complete: function() {
                                $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
                              } });
            captionTransition($caption, options.transition);


            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).addClass('active');


            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height + 40);
          }
          else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }


        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          if ($(this).attr('src') !== placeholderBase64) {
            $(this).css('background-image', 'url("' + $(this).attr('src') + '")' );
            $(this).attr('src', placeholderBase64);
          }
        });

        // dynamically add indicators
        if (options.indicators) {
          $indicators = $('<ul class="indicators"></ul>');
          $slides.each(function( index ) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              var $parent = $slider.parent();
              var curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(
                function(){
                  $active_index = $slider.find('.active').index();
                  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                  else $active_index += 1;

                  moveToSlide($active_index);

                }, options.transition + options.interval
              );
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        }
        else {
          $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(function() {
          $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
        });

        // auto scroll
        $interval = setInterval(
          function(){
            $active_index = $slider.find('.active').index();
            moveToSlide($active_index + 1);

          }, options.transition + options.interval
        );


        // HammerJS, Swipe navigation

        // Touch Event
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;

        $this.hammer({
            prevent_default: false
        }).on('pan', function(e) {
          if (e.gesture.pointerType === "touch") {

            // reset interval
            clearInterval($interval);

            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;
            var velocityY = e.gesture.velocityY;

            $curr_slide = $slider.find('.active');
            if (Math.abs(velocityX) > Math.abs(velocityY)) {
              $curr_slide.velocity({ translateX: x
                  }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            }

            // Swipe Left
            if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
              swipeRight = true;
            }
            // Swipe Right
            else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
              swipeLeft = true;
            }

            // Make Slide Behind active slide visible
            var next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }


          }

        }).on('panend', function(e) {
          if (e.gesture.pointerType === "touch") {

            $curr_slide = $slider.find('.active');
            panning = false;
            curr_index = $slider.find('.active').index();

            if (!swipeRight && !swipeLeft || $slides.length <=1) {
              // Return to original spot
              $curr_slide.velocity({ translateX: 0
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            swipeLeft = false;
            swipeRight = false;

            // Restart interval
            clearInterval($interval);
            $interval = setInterval(
              function(){
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;

                moveToSlide($active_index);

              }, options.transition + options.interval
            );
          }
        });

        $this.on('sliderPause', function() {
          clearInterval($interval);
        });

        $this.on('sliderStart', function() {
          clearInterval($interval);
          $interval = setInterval(
            function(){
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);

            }, options.transition + options.interval
          );
        });

        $this.on('sliderNext', function() {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        });

        $this.on('sliderPrev', function() {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index - 1);
        });

      });



    },
    pause : function() {
      $(this).trigger('sliderPause');
    },
    start : function() {
      $(this).trigger('sliderStart');
    },
    next : function() {
      $(this).trigger('sliderNext');
    },
    prev : function() {
      $(this).trigger('sliderPrev');
    }
  };


  $.fn.slider = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
    }
  }; // Plugin end
}( jQuery ));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gIHZhciBtZXRob2RzID0ge1xyXG5cclxuICAgIGluaXQgOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBpbmRpY2F0b3JzOiB0cnVlLFxyXG4gICAgICAgIGhlaWdodDogNDAwLFxyXG4gICAgICAgIHRyYW5zaXRpb246IDUwMCxcclxuICAgICAgICBpbnRlcnZhbDogNjAwMFxyXG4gICAgICB9O1xyXG4gICAgICBvcHRpb25zID0gJC5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gRm9yIGVhY2ggc2xpZGVyLCB3ZSB3YW50IHRvIGtlZXAgdHJhY2sgb2ZcclxuICAgICAgICAvLyB3aGljaCBzbGlkZSBpcyBhY3RpdmUgYW5kIGl0cyBhc3NvY2lhdGVkIGNvbnRlbnRcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciAkc2xpZGVyID0gJHRoaXMuZmluZCgndWwuc2xpZGVzJykuZmlyc3QoKTtcclxuICAgICAgICB2YXIgJHNsaWRlcyA9ICRzbGlkZXIuZmluZCgnPiBsaScpO1xyXG4gICAgICAgIHZhciAkYWN0aXZlX2luZGV4ID0gJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgICB2YXIgJGFjdGl2ZSwgJGluZGljYXRvcnMsICRpbnRlcnZhbDtcclxuICAgICAgICBpZiAoJGFjdGl2ZV9pbmRleCAhPSAtMSkgeyAkYWN0aXZlID0gJHNsaWRlcy5lcSgkYWN0aXZlX2luZGV4KTsgfVxyXG5cclxuICAgICAgICAvLyBUcmFuc2l0aW9ucyB0aGUgY2FwdGlvbiBkZXBlbmRpbmcgb24gYWxpZ25tZW50XHJcbiAgICAgICAgZnVuY3Rpb24gY2FwdGlvblRyYW5zaXRpb24oY2FwdGlvbiwgZHVyYXRpb24pIHtcclxuICAgICAgICAgIGlmIChjYXB0aW9uLmhhc0NsYXNzKFwiY2VudGVyLWFsaWduXCIpKSB7XHJcbiAgICAgICAgICAgIGNhcHRpb24udmVsb2NpdHkoe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVk6IC0xMDB9LCB7ZHVyYXRpb246IGR1cmF0aW9uLCBxdWV1ZTogZmFsc2V9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKGNhcHRpb24uaGFzQ2xhc3MoXCJyaWdodC1hbGlnblwiKSkge1xyXG4gICAgICAgICAgICBjYXB0aW9uLnZlbG9jaXR5KHtvcGFjaXR5OiAwLCB0cmFuc2xhdGVYOiAxMDB9LCB7ZHVyYXRpb246IGR1cmF0aW9uLCBxdWV1ZTogZmFsc2V9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKGNhcHRpb24uaGFzQ2xhc3MoXCJsZWZ0LWFsaWduXCIpKSB7XHJcbiAgICAgICAgICAgIGNhcHRpb24udmVsb2NpdHkoe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IC0xMDB9LCB7ZHVyYXRpb246IGR1cmF0aW9uLCBxdWV1ZTogZmFsc2V9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCB0cmFuc2l0aW9uIHRoZSBzbGlkZSB0byBhbnkgaW5kZXggb2YgdGhlIG5leHQgc2xpZGVcclxuICAgICAgICBmdW5jdGlvbiBtb3ZlVG9TbGlkZShpbmRleCkge1xyXG4gICAgICAgICAgLy8gV3JhcCBhcm91bmQgaW5kaWNlcy5cclxuICAgICAgICAgIGlmIChpbmRleCA+PSAkc2xpZGVzLmxlbmd0aCkgaW5kZXggPSAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoaW5kZXggPCAwKSBpbmRleCA9ICRzbGlkZXMubGVuZ3RoIC0xO1xyXG5cclxuICAgICAgICAgICRhY3RpdmVfaW5kZXggPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKS5pbmRleCgpO1xyXG5cclxuICAgICAgICAgIC8vIE9ubHkgZG8gaWYgaW5kZXggY2hhbmdlc1xyXG4gICAgICAgICAgaWYgKCRhY3RpdmVfaW5kZXggIT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgJGFjdGl2ZSA9ICRzbGlkZXMuZXEoJGFjdGl2ZV9pbmRleCk7XHJcbiAgICAgICAgICAgICRjYXB0aW9uID0gJGFjdGl2ZS5maW5kKCcuY2FwdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRhY3RpdmUudmVsb2NpdHkoe29wYWNpdHk6IDB9LCB7ZHVyYXRpb246IG9wdGlvbnMudHJhbnNpdGlvbiwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLmFjdGl2ZScpLnZlbG9jaXR5KHtvcGFjaXR5OiAwLCB0cmFuc2xhdGVYOiAwLCB0cmFuc2xhdGVZOiAwfSwge2R1cmF0aW9uOiAwLCBxdWV1ZTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KTtcclxuICAgICAgICAgICAgY2FwdGlvblRyYW5zaXRpb24oJGNhcHRpb24sIG9wdGlvbnMudHJhbnNpdGlvbik7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIGluZGljYXRvcnNcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW5kaWNhdG9ycykge1xyXG4gICAgICAgICAgICAgICRpbmRpY2F0b3JzLmVxKCRhY3RpdmVfaW5kZXgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHNsaWRlcy5lcShpbmRleCkudmVsb2NpdHkoe29wYWNpdHk6IDF9LCB7ZHVyYXRpb246IG9wdGlvbnMudHJhbnNpdGlvbiwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCd9KTtcclxuICAgICAgICAgICAgJHNsaWRlcy5lcShpbmRleCkuZmluZCgnLmNhcHRpb24nKS52ZWxvY2l0eSh7b3BhY2l0eTogMSwgdHJhbnNsYXRlWDogMCwgdHJhbnNsYXRlWTogMH0sIHtkdXJhdGlvbjogb3B0aW9ucy50cmFuc2l0aW9uLCBkZWxheTogb3B0aW9ucy50cmFuc2l0aW9uLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICAkc2xpZGVzLmVxKGluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIGluZGljYXRvcnNcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW5kaWNhdG9ycykge1xyXG4gICAgICAgICAgICAgICRpbmRpY2F0b3JzLmVxKGluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCBoZWlnaHQgb2Ygc2xpZGVyXHJcbiAgICAgICAgLy8gSWYgZnVsbHNjcmVlbiwgZG8gbm90aGluZ1xyXG4gICAgICAgIGlmICghJHRoaXMuaGFzQ2xhc3MoJ2Z1bGxzY3JlZW4nKSkge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMuaW5kaWNhdG9ycykge1xyXG4gICAgICAgICAgICAvLyBBZGQgaGVpZ2h0IGlmIGluZGljYXRvcnMgYXJlIHByZXNlbnRcclxuICAgICAgICAgICAgJHRoaXMuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0ICsgNDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICR0aGlzLmhlaWdodChvcHRpb25zLmhlaWdodCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkc2xpZGVyLmhlaWdodChvcHRpb25zLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gU2V0IGluaXRpYWwgcG9zaXRpb25zIG9mIGNhcHRpb25zXHJcbiAgICAgICAgJHNsaWRlcy5maW5kKCcuY2FwdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgY2FwdGlvblRyYW5zaXRpb24oJCh0aGlzKSwgMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1vdmUgaW1nIHNyYyBpbnRvIGJhY2tncm91bmQtaW1hZ2VcclxuICAgICAgICAkc2xpZGVzLmZpbmQoJ2ltZycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHBsYWNlaG9sZGVyQmFzZTY0ID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFCQVAvLy93QUFBQ0g1QkFFS0FBRUFMQUFBQUFBQkFBRUFBQUlDVEFFQU93PT0nO1xyXG4gICAgICAgICAgaWYgKCQodGhpcykuYXR0cignc3JjJykgIT09IHBsYWNlaG9sZGVyQmFzZTY0KSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybChcIicgKyAkKHRoaXMpLmF0dHIoJ3NyYycpICsgJ1wiKScgKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdzcmMnLCBwbGFjZWhvbGRlckJhc2U2NCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGR5bmFtaWNhbGx5IGFkZCBpbmRpY2F0b3JzXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaW5kaWNhdG9ycykge1xyXG4gICAgICAgICAgJGluZGljYXRvcnMgPSAkKCc8dWwgY2xhc3M9XCJpbmRpY2F0b3JzXCI+PC91bD4nKTtcclxuICAgICAgICAgICRzbGlkZXMuZWFjaChmdW5jdGlvbiggaW5kZXggKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW5kaWNhdG9yID0gJCgnPGxpIGNsYXNzPVwiaW5kaWNhdG9yLWl0ZW1cIj48L2xpPicpO1xyXG5cclxuICAgICAgICAgICAgLy8gSGFuZGxlIGNsaWNrcyBvbiBpbmRpY2F0b3JzXHJcbiAgICAgICAgICAgICRpbmRpY2F0b3IuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHZhciAkcGFyZW50ID0gJHNsaWRlci5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICB2YXIgY3Vycl9pbmRleCA9ICRwYXJlbnQuZmluZCgkKHRoaXMpKS5pbmRleCgpO1xyXG4gICAgICAgICAgICAgIG1vdmVUb1NsaWRlKGN1cnJfaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAvLyByZXNldCBpbnRlcnZhbFxyXG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoJGludGVydmFsKTtcclxuICAgICAgICAgICAgICAkaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICRhY3RpdmVfaW5kZXggPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKS5pbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlcy5sZW5ndGggPT0gJGFjdGl2ZV9pbmRleCArIDEpICRhY3RpdmVfaW5kZXggPSAwOyAvLyBsb29wIHRvIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICAgIGVsc2UgJGFjdGl2ZV9pbmRleCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgbW92ZVRvU2xpZGUoJGFjdGl2ZV9pbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgb3B0aW9ucy50cmFuc2l0aW9uICsgb3B0aW9ucy5pbnRlcnZhbFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaW5kaWNhdG9ycy5hcHBlbmQoJGluZGljYXRvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICR0aGlzLmFwcGVuZCgkaW5kaWNhdG9ycyk7XHJcbiAgICAgICAgICAkaW5kaWNhdG9ycyA9ICR0aGlzLmZpbmQoJ3VsLmluZGljYXRvcnMnKS5maW5kKCdsaS5pbmRpY2F0b3ItaXRlbScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRhY3RpdmUpIHtcclxuICAgICAgICAgICRhY3RpdmUuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICRzbGlkZXMuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJykudmVsb2NpdHkoe29wYWNpdHk6IDF9LCB7ZHVyYXRpb246IG9wdGlvbnMudHJhbnNpdGlvbiwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCd9KTtcclxuXHJcbiAgICAgICAgICAkYWN0aXZlX2luZGV4ID0gMDtcclxuICAgICAgICAgICRhY3RpdmUgPSAkc2xpZGVzLmVxKCRhY3RpdmVfaW5kZXgpO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSBpbmRpY2F0b3JzXHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5pbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICAgICRpbmRpY2F0b3JzLmVxKCRhY3RpdmVfaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkanVzdCBoZWlnaHQgdG8gY3VycmVudCBzbGlkZVxyXG4gICAgICAgICRhY3RpdmUuZmluZCgnaW1nJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRhY3RpdmUuZmluZCgnLmNhcHRpb24nKS52ZWxvY2l0eSh7b3BhY2l0eTogMSwgdHJhbnNsYXRlWDogMCwgdHJhbnNsYXRlWTogMH0sIHtkdXJhdGlvbjogb3B0aW9ucy50cmFuc2l0aW9uLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhdXRvIHNjcm9sbFxyXG4gICAgICAgICRpbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgICAgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJGFjdGl2ZV9pbmRleCA9ICRzbGlkZXIuZmluZCgnLmFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgICAgIG1vdmVUb1NsaWRlKCRhY3RpdmVfaW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgICB9LCBvcHRpb25zLnRyYW5zaXRpb24gKyBvcHRpb25zLmludGVydmFsXHJcbiAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgIC8vIEhhbW1lckpTLCBTd2lwZSBuYXZpZ2F0aW9uXHJcblxyXG4gICAgICAgIC8vIFRvdWNoIEV2ZW50XHJcbiAgICAgICAgdmFyIHBhbm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3dpcGVMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHN3aXBlUmlnaHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgJHRoaXMuaGFtbWVyKHtcclxuICAgICAgICAgICAgcHJldmVudF9kZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH0pLm9uKCdwYW4nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBpZiAoZS5nZXN0dXJlLnBvaW50ZXJUeXBlID09PSBcInRvdWNoXCIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2V0IGludGVydmFsXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoJGludGVydmFsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBlLmdlc3R1cmUuZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICB2YXIgeCA9IGUuZ2VzdHVyZS5kZWx0YVg7XHJcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eVggPSBlLmdlc3R1cmUudmVsb2NpdHlYO1xyXG4gICAgICAgICAgICB2YXIgdmVsb2NpdHlZID0gZS5nZXN0dXJlLnZlbG9jaXR5WTtcclxuXHJcbiAgICAgICAgICAgICRjdXJyX3NsaWRlID0gJHNsaWRlci5maW5kKCcuYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh2ZWxvY2l0eVgpID4gTWF0aC5hYnModmVsb2NpdHlZKSkge1xyXG4gICAgICAgICAgICAgICRjdXJyX3NsaWRlLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogeFxyXG4gICAgICAgICAgICAgICAgICB9LCB7ZHVyYXRpb246IDUwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTd2lwZSBMZWZ0XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDQgJiYgKHggPiAoJHRoaXMuaW5uZXJXaWR0aCgpIC8gMikgfHwgdmVsb2NpdHlYIDwgLTAuNjUpKSB7XHJcbiAgICAgICAgICAgICAgc3dpcGVSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU3dpcGUgUmlnaHRcclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAyICYmICh4IDwgKC0xICogJHRoaXMuaW5uZXJXaWR0aCgpIC8gMikgfHwgdmVsb2NpdHlYID4gMC42NSkpIHtcclxuICAgICAgICAgICAgICBzd2lwZUxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIFNsaWRlIEJlaGluZCBhY3RpdmUgc2xpZGUgdmlzaWJsZVxyXG4gICAgICAgICAgICB2YXIgbmV4dF9zbGlkZTtcclxuICAgICAgICAgICAgaWYgKHN3aXBlTGVmdCkge1xyXG4gICAgICAgICAgICAgIG5leHRfc2xpZGUgPSAkY3Vycl9zbGlkZS5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRfc2xpZGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0X3NsaWRlID0gJHNsaWRlcy5maXJzdCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBuZXh0X3NsaWRlLnZlbG9jaXR5KHsgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICAgICAgICB9LCB7ZHVyYXRpb246IDMwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVSaWdodCkge1xyXG4gICAgICAgICAgICAgIG5leHRfc2xpZGUgPSAkY3Vycl9zbGlkZS5wcmV2KCk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRfc2xpZGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0X3NsaWRlID0gJHNsaWRlcy5sYXN0KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIG5leHRfc2xpZGUudmVsb2NpdHkoeyBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgIH0sIHtkdXJhdGlvbjogMzAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGlmIChlLmdlc3R1cmUucG9pbnRlclR5cGUgPT09IFwidG91Y2hcIikge1xyXG5cclxuICAgICAgICAgICAgJGN1cnJfc2xpZGUgPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKTtcclxuICAgICAgICAgICAgcGFubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjdXJyX2luZGV4ID0gJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc3dpcGVSaWdodCAmJiAhc3dpcGVMZWZ0IHx8ICRzbGlkZXMubGVuZ3RoIDw9MSkge1xyXG4gICAgICAgICAgICAgIC8vIFJldHVybiB0byBvcmlnaW5hbCBzcG90XHJcbiAgICAgICAgICAgICAgJGN1cnJfc2xpZGUudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiAwXHJcbiAgICAgICAgICAgICAgICAgIH0sIHtkdXJhdGlvbjogMzAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHN3aXBlTGVmdCkge1xyXG4gICAgICAgICAgICAgIG1vdmVUb1NsaWRlKGN1cnJfaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAkY3Vycl9zbGlkZS52ZWxvY2l0eSh7dHJhbnNsYXRlWDogLTEgKiAkdGhpcy5pbm5lcldpZHRoKCkgfSwge2R1cmF0aW9uOiAzMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGN1cnJfc2xpZGUudmVsb2NpdHkoe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IDB9LCB7ZHVyYXRpb246IDAsIHF1ZXVlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHN3aXBlUmlnaHQpIHtcclxuICAgICAgICAgICAgICBtb3ZlVG9TbGlkZShjdXJyX2luZGV4IC0gMSk7XHJcbiAgICAgICAgICAgICAgJGN1cnJfc2xpZGUudmVsb2NpdHkoe3RyYW5zbGF0ZVg6ICR0aGlzLmlubmVyV2lkdGgoKSB9LCB7ZHVyYXRpb246IDMwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY3Vycl9zbGlkZS52ZWxvY2l0eSh7b3BhY2l0eTogMCwgdHJhbnNsYXRlWDogMH0sIHtkdXJhdGlvbjogMCwgcXVldWU6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpcGVMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXBlUmlnaHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc3RhcnQgaW50ZXJ2YWxcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCgkaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAkaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICAgICAgICBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJGFjdGl2ZV9pbmRleCA9ICRzbGlkZXIuZmluZCgnLmFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlcy5sZW5ndGggPT0gJGFjdGl2ZV9pbmRleCArIDEpICRhY3RpdmVfaW5kZXggPSAwOyAvLyBsb29wIHRvIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICBlbHNlICRhY3RpdmVfaW5kZXggKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb3ZlVG9TbGlkZSgkYWN0aXZlX2luZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgfSwgb3B0aW9ucy50cmFuc2l0aW9uICsgb3B0aW9ucy5pbnRlcnZhbFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkdGhpcy5vbignc2xpZGVyUGF1c2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoJGludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHRoaXMub24oJ3NsaWRlclN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKCRpbnRlcnZhbCk7XHJcbiAgICAgICAgICAkaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICAgICAgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAkYWN0aXZlX2luZGV4ID0gJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgICAgICAgICBpZiAoJHNsaWRlcy5sZW5ndGggPT0gJGFjdGl2ZV9pbmRleCArIDEpICRhY3RpdmVfaW5kZXggPSAwOyAvLyBsb29wIHRvIHN0YXJ0XHJcbiAgICAgICAgICAgICAgZWxzZSAkYWN0aXZlX2luZGV4ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgIG1vdmVUb1NsaWRlKCRhY3RpdmVfaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgfSwgb3B0aW9ucy50cmFuc2l0aW9uICsgb3B0aW9ucy5pbnRlcnZhbFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHRoaXMub24oJ3NsaWRlck5leHQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRhY3RpdmVfaW5kZXggPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKS5pbmRleCgpO1xyXG4gICAgICAgICAgbW92ZVRvU2xpZGUoJGFjdGl2ZV9pbmRleCArIDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkdGhpcy5vbignc2xpZGVyUHJldicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJGFjdGl2ZV9pbmRleCA9ICRzbGlkZXIuZmluZCgnLmFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgICBtb3ZlVG9TbGlkZSgkYWN0aXZlX2luZGV4IC0gMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBwYXVzZSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ3NsaWRlclBhdXNlJyk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS50cmlnZ2VyKCdzbGlkZXJTdGFydCcpO1xyXG4gICAgfSxcclxuICAgIG5leHQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS50cmlnZ2VyKCdzbGlkZXJOZXh0Jyk7XHJcbiAgICB9LFxyXG4gICAgcHJldiA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ3NsaWRlclByZXYnKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgJC5mbi5zbGlkZXIgPSBmdW5jdGlvbihtZXRob2RPck9wdGlvbnMpIHtcclxuICAgIGlmICggbWV0aG9kc1ttZXRob2RPck9wdGlvbnNdICkge1xyXG4gICAgICByZXR1cm4gbWV0aG9kc1sgbWV0aG9kT3JPcHRpb25zIF0uYXBwbHkoIHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSk7XHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kT3JPcHRpb25zID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZE9yT3B0aW9ucyApIHtcclxuICAgICAgLy8gRGVmYXVsdCB0byBcImluaXRcIlxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgJyArICBtZXRob2RPck9wdGlvbnMgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS50b29sdGlwJyApO1xyXG4gICAgfVxyXG4gIH07IC8vIFBsdWdpbiBlbmRcclxufSggalF1ZXJ5ICkpO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
