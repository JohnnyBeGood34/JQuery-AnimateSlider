AnimateSlider
=============

A Simple JQuery slider plug-in using Animate.css

AnimateSlider allows you to make a slider with animation of each elements contained in it. It uses animate.css for css 3 transitions.

INSTALLATION
=============
Include script after Jquery library and don't forget to include animate.css before.

```html
<script src="path/to/animateSlider.js">
```

USAGE
=============

Declare a slider container for your slides and put them inside. Each slide needs to have a class named "slide".Then add elements inside and add data-effect-in="animteCssEffect" for entry effect and data-effect-out="animateCssEffect" for release effect.

```html
<div id="home-slider">
  <div class="slide">
    <div data-effect-in="fadeIn" data-effect-out="fadeOut">
      <img src="path/to/img"/>
    </div>
    <div data-effect-in="bounceInUp" data-effect-out="bounceOutDown">
      <h1>My presentation</h1>
      <h2>Consectetur adipiscing elit</h2>
      <p>Lorem ipsum dolor sit amet</p>
    </div>
  </div>
</div>
```

```css
#home-slider{
    position: relative;
    overflow: hidden;
} 

#home-slider .slide{
    position: absolute;
    z-index: 1;
    opacity: 0;
}
```

Finally use Jquery to bind the slider

```javascript
  $("#home-slider").animateSlider(4000);
```

Where the parameter is slide duration.

To add next and previous buttons to the slider proceed as follows :

```html
<button data-target="prev"></button>
<button data-target="next"></button>
```

They must have a data-target="target" where target can be "next" or "prev".

REMARK
=============

If you have a container in your "home-slider" div , you must fill it into Jquery selector like

```javascript
  $("#home-slider .myContainer").animateSlider(4000);
```

DEPENDENCIES
=============
https://github.com/daneden/animate.css
