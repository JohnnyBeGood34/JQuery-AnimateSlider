AnimateSlider [![Code Climate](https://codeclimate.com/github/JohnnyBeGood34/JQuery-AnimateSlider.png)](https://codeclimate.com/github/JohnnyBeGood34/JQuery-AnimateSlider)
=============

A Simple JQuery slider plug-in using Animate.css

AnimateSlider is a sliding container which allows you to animate any of its child elements. It uses animate.css for css 3 transitions.

INSTALLATION
=============
Include the script after jQuery library . 
Don't forget to call the animate.css stylesheet before loading this JS plugin.

```html
<script src="path/to/animateSlider.js">
```

USAGE
=============

1. Declare a slider container and put some slidable elements in it. Each slidable must have a class named "slide".
2. To add the entry animation to an element, simply add the attribute data-effect-in="animteCssEffect"
3. To add the release animation to an element, add data-effect-out="animateCssEffect"

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
  
   <div class="slide">
    <div data-effect-in="bounceInLeft" data-effect-out="bounceOutLeft">
      <img src="path/to/img"/>
    </div>
    <div data-effect-in="rotateInDownLeft" data-effect-out="rotateOutDownLeft">
      <h1>My second presentation</h1>
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
