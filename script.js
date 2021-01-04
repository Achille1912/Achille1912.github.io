$(document).ready(function() {
  $('.curriculum_button').tilt({scale:1.1, speed:1000});
  $(".header_icon").click(function(e) {

    e.preventDefault();
    $(".header_lista").toggleClass('open');

  });
});

$('.curriculum_button').tilt({scale:1.1, speed:1000});
