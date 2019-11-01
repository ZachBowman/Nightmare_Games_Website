function Splash (new_name, new_info, new_game_link, new_screenshot_link)
  {
  this.name = new_name;
  this.game_link = new_game_link;
  this.info = new_info;
  this.screenshot_link = new_screenshot_link;
  }

var splash = [];
var current_splash = 0;
var splash_interval;
var splash_width;
var splash_slide_speed = 40;
var goto_splash = current_splash;
var previous_window_width = 0;

$(document).ready (function ()
  {
  init_slider();
  resize_splash();

  function init_slider()
    {
    splash.push (new Splash
      (
      "Ultraguy",
      "The only thing stronger than his punch is his massive ego.  Watch out for knives, bombs, and old-timey quips on your way to a high score in this arcade-style platformer.",
      "browsergames/ultraguy/index.html",
      "images/splash/ultraguy_splash.png"
      ));

    splash.push (new Splash
      (
      "Wobbly Piss",
      "Completely disrespect your buddy's, girlfriend's, or in-laws' facilities by trying to whiz in the bowl and failing spectacularly.  Always starts easy, always ends in complete desecration.",
      "browsergames/wobbly_piss/index.html",
      "images/splash/wobbly_piss_splash2.png"
      ));

    splash.push (new Splash
      (
      "dotFALL",
      "Guide the freefall of a single dot through a neon, digital, cyberpunk world, collecting data nodes and avoiding objects along the way.",
      "http://gamejolt.com/games/arcade/dotfall/23723/",
      "images/splash/dotfall_splash2.png"
      ));

    // splash.push (new Splash
    //   (
    //   "Nick Or Gary?",
    //   "Can you tell the difference between Nick Nolte and Gary Busey?  We can't.  Challenge everything you know about reality and bad haircuts in this fast-paced brain-bender.",
    //   "http://gamejolt.com/games/nick-or-gary/22436",
    //   "images/splash/nickorgary_splash.png"
    //   ));

    // splash.push (new Splash
    //   (
    //   "Blockhead",
    //   "Drop blockheads on the pile and match colors to collapse the stack.  Mix colors together for fascinating consequences.",
    //   "games/blockhead/index.html",
    //   "images/splash/blockhead_splash.png"
    //   ));

    for (var s = 0; s < splash.length; s += 1)
      {
      if (s == 0) $("#splash_slider1").html ("<a href = '" + splash[s].game_link + "'><img class = 'splash' id = 'splash" + s + "' src = '" + splash[s].screenshot_link + "'></a>")
      if (s == 1) $("#splash_slider2").html ("<a href = '" + splash[s].game_link + "'><img class = 'splash' id = 'splash" + s + "' src = '" + splash[s].screenshot_link + "'></a>")
      }

    generate_dots ();

    splash_width = document.getElementById ("splash_slider1").offsetWidth;
    $("#splash_slider2").css ("left", splash_width);

    change_splash (current_splash);
    resize_splash ();

    splash_interval = setInterval (function ()
      {
      goto_splash = current_splash + 1;
      if (goto_splash >= splash.length) goto_splash = 0;
      next_splash();
      }, 20000);
    }

  //////////////////////////////////////////////////

  function generate_dots ()
    {
    $(".splash_dots").html ("");

    for (var s = 0; s < splash.length; s += 1)
      {
      $(".splash_dots").append ("<div class = 'dot' id = 'dot" + s + "'><img src = 'images/dot2.png' class = 'dot_image'></div>");

      (function (s)
        {
        var id = 'dot' + s;
        document.getElementById (id).addEventListener ("click", function () {dot_clicked (s)});
        } (s));
      }
    }

  //////////////////////////////////////////////////

  function dot_clicked (clicked)
    {
    clearInterval (splash_interval);

    goto_splash = clicked;
    direction_decision ();
    }

  //////////////////////////////////////////////////

  function direction_decision ()
    {
    if (goto_splash < current_splash) previous_splash();
    else if (goto_splash > current_splash) next_splash();
    }

  //////////////////////////////////////////////////

  // slide left
  function previous_splash ()
    {
    var previous_splash = current_splash - 1;
    if (previous_splash < 0) previous_splash = splash.length - 1;
    $("#splash_slider2").html ("<a href = '" + splash[previous_splash].game_link + "'><img class = 'splash' id = 'splash" + previous_splash + "' src = '" + splash[previous_splash].screenshot_link + "'></a>");
    $("#splash_slider2").css ("left", splash_width * -1);

    // 25 ms = 40 fps
    var left = setInterval (function ()
      {
      var x = parseInt ($("#splash_slider1").css ("left"));
      x += splash_slide_speed;
      $("#splash_slider1").css ("left", x);

      x = parseInt ($("#splash_slider2").css ("left"));
      x += splash_slide_speed;

      if (x >= 0)
        {
        x = 0;
        clearInterval (left);  // stop the sliding

        current_splash -= 1;
        if (current_splash < 0) current_splash = splash.length - 1;

        $("#splash_slider1").html ($("#splash_slider2").html());
        $("#splash_slider1").css ("left", 0);

        change_splash (current_splash);
        direction_decision ();
        }
      else $("#splash_slider2").css ("left", x);

      }, 25);
    }

  //////////////////////////////////////////////////

  // slide right
  function next_splash ()
    {
    var next_splash = current_splash + 1;
    if (next_splash >= splash.length) next_splash = 0;
    $("#splash_slider2").html ("<a href = '" + splash[next_splash].game_link + "'><img class = 'splash' id = 'splash" + next_splash + "' src = '" + splash[next_splash].screenshot_link + "'></a>");
    $("#splash_slider2").css ("left", splash_width);

    // 25 ms = 40 fps
    var right = setInterval (function ()
      {
      var x = parseInt ($("#splash_slider1").css ("left"));
      x -= splash_slide_speed;
      $("#splash_slider1").css ("left", x);

      x = parseInt ($("#splash_slider2").css ("left"));
      x -= splash_slide_speed;

      if (x <= 0)
        {
        x = 0;
        clearInterval (right);  // stop the sliding

        current_splash += 1;
        if (current_splash >= splash.length) current_splash = 0;

        $("#splash_slider1").html ($("#splash_slider2").html());
        $("#splash_slider1").css ("left", 0);

        change_splash (current_splash);
        direction_decision ();
        }
      else $("#splash_slider2").css ("left", x);

      }, 25);
    }

  //////////////////////////////////////////////////

  // change all the text info and links
  function change_splash (clicked)
    {
    $(".splash_title").html (splash[clicked].name);
    $(".splash_description").html (splash[clicked].info);
    $("#splash_game_link").attr ("href", splash[clicked].game_link);

    for (var s = 0; s < splash.length; s += 1)
      {
      var id = "#dot" + s;
      if (s === clicked) $(id).html ("<img src = 'images/dot.png'>")
      else $(id).html ("<img src = 'images/dot2.png'>")
      }
    }

  //////////////////////////////////////////////////

  $("#games_link").click (function ()
    {
    $("#games_menu").slideToggle("fast", "linear");
    $("#about_us").slideUp("fast", "linear");
    });

  //////////////////////////////////////////////////

  $("#about_us_link").click (function ()
    {
    $("#about_us").slideToggle("fast", "linear");
    $("#games_menu").slideUp("fast", "linear");
    });

  //////////////////////////////////////////////////

  $("#arrow_left").click (function ()
    {
    clearInterval (splash_interval);
    goto_splash = current_splash - 1;
    if (goto_splash < 0) goto_splash = splash.length - 1;
    direction_decision();
    });

  //////////////////////////////////////////////////

  $("#arrow_right").click (function ()
    {
    clearInterval (splash_interval);
    goto_splash = current_splash + 1;
    if (goto_splash >= splash.length) goto_splash = 0;
    direction_decision();
    });

  //////////////////////////////////////////////////

  // triggered whenever browser window is resized
  $(window).resize (function ()
    {
    resize_splash ();
    });

  //////////////////////////////////////////////////

  // dynamically resize the splash_section's height to match the window width
  function resize_splash ()
    {
    var space_below_splash = 150;
    var splash_width = $("#splash_section").width();
    var splash_height = splash_width / 2.5;
    var window_width = $(window).width();
    var window_height = $(window).height();

    // make sure the splash doesn't take up the entire view vertically
    if (splash_height > space_below_splash && splash_height > window_height - space_below_splash)
      splash_height = window_height - space_below_splash;

    $("#splash_section").height (splash_height);

    // keep the arrows vertically centered
    var arrow_y = (splash_height / 2) - ($("#arrow_left").height() / 2);
    $("#arrow_left").css ("top", arrow_y.toString() + "px");
    $("#arrow_right").css ("top", arrow_y.toString() + "px");
    }

  //////////////////////////////////////////////////

  });
