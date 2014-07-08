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
            //Json Object for container
            $container[0].faderConfig = {};
            //Private vars
            var slideSelector = '.slide', //Slide selector
                    slideTimer, //Timeout
                    activeSlide, //Index of active slide
                    newSlide, //Index of next or prev slide
                    $slides = $container.find(slideSelector), //All slides
                    totalSlides = $slides.length, //Nb of slides
                    config = $container[0].faderConfig; //Configuration

            config = {
                slideDur: slideDur
            };
            //Opacity for first element
            $slides.eq(0).css('opacity', 1);
            
            activeSlide = 0;
            progress(100, $(".slide" + activeSlide));

            slideTimer = setTimeout(function() {
                changeSlides('next');
            }, config.slideDur);

            /**
             * Fonction to change slide
             * @param {type} target, next ou prev 
             * @returns {undefined}
             */
            function changeSlides(target) {
                //If want to forward
                if (target === 'next') {
                    //index of next slide
                    newSlide = activeSlide + 1;
                    
                    if (newSlide > totalSlides - 1) {
                        
                        newSlide = 0;
                        
                        $('.bar .load').stop().css('width', '0px');
                    }
                    
                } else if (target === 'prev') {
                    newSlide = activeSlide - 1;
                    
                    if (newSlide < 0) {
                        newSlide = totalSlides - 1;
                    }
                } else {
                    newSlide = target;
                }
                
                $(".slide" + newSlide).find(".load").width(0);
                $(".slide" + activeSlide).find(".load").stop().width(0);
                
                if (newSlide < totalSlides) {
                    $(".slide" + newSlide).prevAll().each(function(index, element) {
                        $(element).find('.load').stop().css('width', '100%');
                    });
                }
                animateSlides(activeSlide, newSlide);
            }

            var fireEventProgressBar = false;
            //Change slide by clicking on progress bar
            $('body').delegate('.bar', 'click', function() {
                if (!fireEventProgressBar)
                {
                    //To avoid spam clicks
                    fireEventProgressBar = true;
                    setTimeout(function() {
                        fireEventProgressBar = false;
                    }, 1000);

                    $(this).find('.load').stop().css('width', 0);
                    
                    var indexOfSlide = $(this).data('slide-number');
                   
                    if (indexOfSlide > activeSlide) {
                        
                        $(this).prevAll().each(function(index, element) {
                            $(element).find('.load').stop().css('width', '100%');
                        });
                    }
                    else if (indexOfSlide < activeSlide)
                    {
                        
                        $(this).nextAll().each(function(index, element) {
                            $(element).find('.load').stop().css('width', 0);
                        });
                    }
                    
                    newSlide = indexOfSlide;
                    
                    clearTimeout(slideTimer);
                    
                    animateSlides(activeSlide, newSlide);
                }
            });

            
            var fireEventArrow = false;
            $container.find('.nav-arrows .arrow').bind('click', function() {
                
                if (!fireEventArrow)
                {
                    fireEventArrow = true;
                    setTimeout(function() {
                        fireEventArrow = false;
                    }, 1000);
                    
                    var target = $(this).data('target');
                    clearTimeout(slideTimer);
                    changeSlides(target);
                }
            });

            /**
             * Animation of slides
             * @param {type} indexOfActiveSlide
             * @param {type} indexOfnewSlide
             * @returns {undefined}
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
                    showSlide($slides.eq(indexOfnewSlide), indexOfnewSlide);
                    waitForNext();
                    next();
                });
            }

            //Whait for next slide
            function waitForNext() {
                slideTimer = setTimeout(function() {
                    changeSlides('next');
                }, config.slideDur);
            }

            /**
             * Show slides
             * @param {type} $element
             * @returns {undefined}
             */
            function showSlide($element, indexOfNewSlide)
            {
                //Animate progress bar
                progress(100, $(".slide" + indexOfNewSlide));
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
                            $(this).stop(true, true).addClass($(this).data("effect-in") + " animated");
                        }
                        else
                        {
                            $(this).children().each(function(i, child) {
                                $(child).stop(true, true).addClass($(child).data("effect-in") + " animated");
                            });
                        }
                        next();
                    });
                });
            }

            function progress(percent, $element)
            {
                var progressBarPercent = percent * $element.width() / 100;
                $element.find('div').animate({width: progressBarPercent}, slideDur);
            }

            /*Build progress bar for slides*/

            for (var i = 0; i < totalSlides; i++)
            {
                
                var htmlProgressBar = "<button class='bar slide" + i + "' data-slide-number='" + i + "'><div class='load'></div></button>";
           
                $(".progress-slide").append(htmlProgressBar);
            }

        });
    }
})(jQuery);
