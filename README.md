AnimateSlider
=============

A Simple slide using Animate.css

AnimateSlider allows you to make a slider with animation of each elements contained in it. It uses animate.css for css 3 transitions.

HOW TO USE
=============

Declare a slider container for your slides and put them inside. Each slide needs to have a class named "slide".Then add elements inside and add data-effect-in="animteCssEffect" for entry effect and data-effect-out="animateCssEffect" for release effect.

```html
<div id="home-slider">
  <div class="slide">
    <div data-effect-in="fadeIn" data-effect-out="fadeOut">
      <img src="path/to/img"/>
    </div>
    <div data-effect-in="bounceInUp" data-effect-out="bounceOutDown">
      <img src="path/to/img"/>
    </div>
  </div>
</div>
```
