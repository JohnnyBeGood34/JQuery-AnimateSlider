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
            //Json config for container
            $container[0].faderConfig = {};
            
            var slideSelector = '.slide', //Slide Select
                    slideTimer, 
                    activeSlide, //Index of active slide
                    newSlide, //Index of next slide
                    $slides = $container.find(slideSelector), 
                    totalSlides = $slides.length, 
                    config = $container[0].faderConfig; 

            
            config = {
                slideDur: slideDur
            };
            
            $slides.eq(0).css('opacity', 1);
            
            activeSlide = 0;
            
            slideTimer = setTimeout(function() {
                changeSlides('next');
            }, config.slideDur);
            /**
             * Change slide
             * @param {type} target "next" or "prev"
             */
            function changeSlides(target) {
                //If we want to go forward
                if (target == 'next') {
                    //LIndex of next slide
                    newSlide = activeSlide + 1;
                    
                    if (newSlide > totalSlides - 1) {
                       
                        newSlide = 0;
                    }
                  
                } else if (target == 'prev') {
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
             * Animate each slides
             * @param {type} indexOfActiveSlide
             * @param {type} indexOfnewSlide
             */
            function animateSlides(indexOfActiveSlide, indexOfnewSlide) {

                $slides.eq(indexOfActiveSlide).css('z-index', 3);

                var childsOfSlide = $slides.eq(indexOfActiveSlide).children();
                $(childsOfSlide).each(function(index, element) {
                    if (typeof $(element).data("effect-in") !== "undefined" && typeof $(element).data("effect-out") !== "undefined")
                    {
                        $(element).removeClass($(element).data("effect-in") + " animated");
                        $(element).addClass($(element).data("effect-out") + " animated");
                    }
                    else
                    {
                        $(element).children().each(function(index, child) {
                            if (typeof $(child).data("effect-in") !== "undefined" && typeof $(child).data("effect-out") !== "undefined")
                            {
                                $(child).removeClass($(child).data("effect-in") + " animated");
                                $(child).addClass($(child).data("effect-out") + " animated");
                            }
                        });
                    }
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
           
            function waitForNext() {
                slideTimer = setTimeout(function() {
                    changeSlides('next');
                }, config.slideDur);
            }
          
            $container.find('.nav-arrows .arrow').bind('click', function() {
                var target = $(this).data('target');
                clearTimeout(slideTimer);
                changeSlides(target);
            });
            /**
             * Show elmenets according to effects
             * @param {type} $element
             */
            function showSlide($element)
            {
                $element.children().each(function(index, element) {
                
                    $(element).delay(200).queue(function(next) {
                        
                        if (typeof $(this).data("effect-out") !== "undefined")
                        {
                            $(this).removeClass($(this).data("effect-out") + " animated");
                        }
                        else
                        {
                            $(this).children().each(function(index, child) {
                                $(child).removeClass($(child).data("effect-out") + " animated");
                            });
                        }

                        $element.css({
                            'z-index': 2,
                            'opacity': 1
                        });

                        if (typeof $(this).data("effect-in") !== "undefined")
                        {
                            $(this).addClass($(this).data("effect-in") + " animated");
                        }
                        else
                        {
                            $(this).children().each(function(i, child) {
                                $(child).addClass($(child).data("effect-in") + " animated");
                            });
                        }
                        next();
                    });
                });
            }

        });
    };
})(jQuery);