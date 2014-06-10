/*
 Plugin: jQuery AnimateSlider
 Version 1.0.0
 Author: John John
 */
(function($)
{
    $.fn.animateSlider = function(slideDur)
    {
        this.each(function()
        {
            var $container = $(this);
            //Json object for config
            $container[0].faderConfig = {};
            //Privates variables
            var slideSelector = '.slide', //Select
                    slideTimer, //Timeout
                    activeSlide, //Index of active slide
                    newSlide, //Index of next slide
                    $slides = $container.find(slideSelector), //All slides
                    totalSlides = $slides.length, //Nb of slides
                    config = $container[0].faderConfig;

            config = {
                slideDur: slideDur
            };

            $slides.eq(0).css('opacity', 1);
            //Index of active slide
            activeSlide = 0;

            slideTimer = setTimeout(function() {
                changeSlides('next');
            }, config.slideDur);
            /**
             * Change slides
             * @param {type} target can be 'next' or 'prev'
             */
            function changeSlides(target) {

                if (target === 'next') {

                    newSlide = activeSlide + 1;

                    if (newSlide > totalSlides - 1) {

                        newSlide = 0;
                    }

                } else if (target === 'prev') {
                    newSlide = activeSlide - 1;
                    if (newSlide < 0) {
                        newSlide = totalSlides - 1;
                    }
                } else {
                    newSlide = target;
                }
                animateSlides(activeSlide, newSlide);
            }
            /**
             * Animate slides
             * @param {type} indexOfActiveSlide
             * @param {type} indexOfnewSlide
             */
            function animateSlides(indexOfActiveSlide, indexOfnewSlide) {

                $slides.eq(indexOfActiveSlide).css('z-index', 3);

                var childsOfSlide = $slides.eq(indexOfActiveSlide).children();
                $(childsOfSlide).each(function(index, element) {
                    $(element).removeClass($(element).data("effect-in") + " animated");
                    $(element).addClass($(element).data("effect-out") + " animated");
                });

                $slides.eq(indexOfActiveSlide).delay(700).queue(function(next) {
                    $(this).css('opacity', 0);
                    activeSlide = indexOfnewSlide;
                    $slides.eq(indexOfActiveSlide).removeAttr('style');
                    showSlide($slides.eq(indexOfnewSlide));
                    waitForNext();
                    next();
                });
            }
            //Whait for show next slide
            function waitForNext() {
                slideTimer = setTimeout(function() {
                    changeSlides('next');
                }, config.slideDur);
            }
            //Listener for next and prev buttons
            $container.find('.nav-arrows .arrow').bind('click', function() {
                var target = $(this).data('target');
                clearTimeout(slideTimer);
                changeSlides(target);
            });
            /**
             * Show slides according to data-effects in and out
             * @param {type} $element
             */
            function showSlide($element)
            {
                $element.children().each(function(index, element) {
                    
                    $(element).delay(200).queue(function(next) {
                        $(this).removeClass($(element).data("effect-out") + " animated");
                        if (typeof $element !== "undefined")
                        {
                            $element.css({
                                'z-index': 2,
                                'opacity': 1
                            });
                        }
                        $(this).addClass($(element).data("effect-in") + " animated");
                        next();
                    });
                    $(element).delay(200).queue(function(next) {
                        $(this).removeClass($(element).data("effect-out") + " animated");
                        $(this).addClass($(element).data("effect-in") + " animated");
                        next();
                    });
                });
            }

        });
    };
})(jQuery);
