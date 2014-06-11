$(function(){
  var screenHeight = $(window).height();
  //Height of slider
  $("#home-slider").css("height",screenHeight);
  //Height of img group
  $("#home-slider .image-right").css("height",$("#home-slider").height());
  
  //Height of navigations buttons
  var heightOfNavButtons = $("#home-slider .nav-arrows").height(),
      marginNavButtons = screenHeight - (heightOfNavButtons * 3.5);
  
  $("#home-slider .nav-arrows").css("margin-top",marginNavButtons);
  
});
