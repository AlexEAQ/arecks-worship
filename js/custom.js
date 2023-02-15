/* navigation menu animation with way points */

$(".nav-animate").waypoint(
  function (direction) {
    $(".secondary-menu").toggleClass("hide", direction === "down");
    $(".navbar").toggleClass("comeup", direction === "down");
  },
  {
    offset: "10%",
  }
);

// Block scrolling

$(".nav li a").bind("click", function (e) {
  var anchor = $(this);
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $(anchor.attr("href")).offset().top,
      },
      1200
    );
  if ($(window).width() < 768) {
    var $navMain = $(".navbar-collapse");
    $navMain.collapse("hide");
  }
  e.preventDefault();
});

/* play list music button */
$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "../HTML/audio/audio.mp3";
  obj.volume = 1;
  obj.autoPlay = true;
  obj.preLoad = true;

  $("#playNowBtn").click(function (e) {
    var $playNowButton = $(this); /* button variable */
    var $playlist = $playNowButton
      .parent()
      .parent(); /* play list section class */
    var $disk = $playlist.children().children(".disk"); /* disk image */

    if ($disk.hasClass("rotating")) {
      $disk.removeClass("rotating");
      $playNowButton.children("i").removeClass("fa-pause").addClass("fa-play");
      obj.pause();
    } else {
      $disk.addClass("rotating");
      $playNowButton.children("i").removeClass("fa-play").addClass("fa-pause");
      obj.play();
    }
    e.preventDefault();
  });
});

/* *************************************** */
// One page navigation
/* *************************************** */

$(".nav").onePageNav({
  currentClass: "active",
  changeHash: true,
  scrollSpeed: 1000,
  scrollThreshold: 0.1,
});

// Block scrolling

$(".nav a").bind("click", function (e) {
  if ($(window).width() < 768) {
    var $navMain = $(".navbar-collapse");
    $navMain.collapse("hide");
  }
  e.preventDefault();
});

/* Owl-Carousel Client Slider */

$(document).ready(function () {
  $("#portfolioOwl").owlCarousel({
    autoPlay: 3000,
    slideSpeed: 1200,
    paginationSpeed: 500,
    stopOnHover: true,
    items: 4,
    itemsDesktop: [1199, 4],
    itemsDesktopSmall: [991, 3],
    itemsTabletSmall: [767, 2],
  });
});

/* tool-tip initialize */

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

/* Scroll to Top */

$(".totop").hide();
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".totop").fadeIn();
    } else {
      $(".totop").fadeOut();
    }
  });

  $(".totop a").click(function (e) {
    e.preventDefault();
    $("body,html").animate({ scrollTop: 0 }, 1200);
  });
});

// CODOGO REPRO

let playlist = [
	
	{
		id: "6",
		title: "6 Caminito - Por gracia",
		audio: "audio/caminito1.mp3",
	  },
	 
	  {
		id: "2",
		title: "2 Los hijos de Sion - Por gracia",
		audio: "audio/tealabare.mp3",
	  },

	  {
		id: "3",
		title: "3 Te alabare Señor - Por gracia",
		audio: "audio/tealabare.mp3",
	  },
	  
	{
		id: "4",
		title: "4 Clama a mi dice el señor - Por gracia",
		audio: "audio/clama.mp3",
	  },
	
	  {
		id: "5",
		title: "5 La semilla - Por gracia",
		audio: "audio/lasemilla.mp3",
	  },

	 
	
	  {
		id: "1",
		title: "1 El Gozo que tengo yo",
		audio: "audio/elgozo.mp3",
	  },
	
  
 
];
var listam= playlist;
console.log(listam)

i = 0;
n = playlist.length;

let player = document.getElementById("player");
let dur = document.getElementById("dur");

playlist.forEach(function (i) {

  console.log(i.audio);
  player.src = i.audio;
  $(".title").html(i.title);
});

function calculateTotalValue(length) {
  let minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ":" + seconds;
  return time;
}

function calculateCurrentValue(currentTime) {
  let current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time =
      (current_minute < 10 ? "0" + current_minute : current_minute) +
      ":" +
      (current_seconds < 10 ? "0" + current_seconds : current_seconds);
  return current_time;
}

function initProgressBar() {
  let length = player.duration;
  let current_time = player.currentTime;
  let totalLength = calculateTotalValue(length);
  jQuery(".end-time").html(totalLength);
  let currentTime = calculateCurrentValue(current_time);
  jQuery(".start-time").html(currentTime);
  dur.value = player.currentTime;
  if (player.currentTime == player.duration) {
    $("#play-btn").fadeIn("slow", function () {
      $(this).removeClass("fa-pause");
      $(this).addClass("fa-play");
      dur.value = 0;
    });
  }
}

function mSet() {
  player.currentTime = dur.value;
}

function mDur() {
  let length = player.duration;
  dur.max = length;
}

function initPlayers(num) {
  for (let i = 0; i < num; i++) {
    (function () {
      let playerContainer = document.getElementById("player-container"),
        player = document.getElementById("player"),
        isPlaying = false,
        playBtn = document.getElementById("play-btn");
      if (playBtn != null) {
        playBtn.addEventListener("click", function () {
          togglePlay();
        });
      }

      function togglePlay() {
        if (player.paused === false) {
          player.pause();
          isPlaying = false;
          $("#play-btn").fadeIn("slow", function () {
            $(this).removeClass("fa-pause");
            $(this).addClass("fa-play");
          });
        } else {
          player.play();
          $("#play-btn").fadeIn("slow", function () {
            $(this).removeClass("fa-play");
            $(this).addClass("fa-pause");
          });
          isPlaying = true;
        }
      }
    })();
  }
}
$("#next").data("dir", 1);
$("#prev").data("dir", -1);
$("#next, #prev").on("click", function () {
  i = (i + $(this).data("dir") + n) % n;
  console.log(i);
  player.src = listam[i].audio;

  $(".title").html(listam[i].title);
  $("#play-btn").removeClass("fa-play");
  $("#play-btn").addClass("fa-pause");
  player.play();
});
$(".audio-player")
  .toArray()
  .forEach(function (player) {
    let audio = $(player).find("audio")[0];
    let volumeControl = $(player).find(".volumeControl .wrapper");
    volumeControl.find(".outer").on("click", function (e) {
      let volumePosition = e.pageX - $(this).offset().left;
      let audioVolume = volumePosition / $(this).width();
      if (audioVolume >= 0 && audioVolume <= 1) {
        audio.volume = audioVolume;
        $(this)
          .find(".inner")
          .css("width", audioVolume * 100 + "%");
      }
    });
  });
$(function () {
  // Dropdown toggle
  $(".dropdown-toggle").click(function () {
    $(this).next(".dropdown").slideToggle("fast");
  });
  $(document).click(function (e) {
    var target = e.target;
    if (
      !$(target).is(".dropdown-toggle") &&
      !$(target).parents().is(".dropdown-toggle")
    ) {
      $(".dropdown").hide();
    }
  });
});
$("#darkButton").click(switchDark);
$("#whiteButton").click(switchWhite);
$("#blueButton").click(switchBlue);

function switchDark() {
  $("#skin").attr("class", "dark audio-player");
  $(".inner").css("background", "#fff");
  $(".title").css("color", "#fff");
  $(".time").css("color", "#fff");
  $(".fa-volume-up").css({
    color: "#fff",
  });
  $(".audio-player #play-btn").css({
    color: "#fff",
    "border-color": "#fff",
  });
  $(".ctrl_btn").css({
    color: "#fff",
    "border-color": "#fff",
  });
}

function switchWhite() {
  $("#skin").attr("class", "white audio-player");
  $(".inner").css("background", "#555");
  $(".title").css("color", "#555");
  $(".time").css("color", "#555");
  $(".fa-volume-up").css({
    color: "#555",
  });
  $(".audio-player #play-btn").css({
    color: "#555",
    "border-color": "#555",
  });
  $(".ctrl_btn").css({
    color: "#555",
    "border-color": "#555",
  });
}

function switchBlue() {
  $("#skin").attr("class", "blue audio-player");
  $(".inner").css("background", "#fff");
  $(".title").css("color", "#fff");
  $(".time").css("color", "#fff");
  $(".fa-volume-up").css({
    color: "#fff",
  });
  $(".audio-player #play-btn").css({
    color: "#fff",
    "border-color": "#fff",
  });
  $(".ctrl_btn").css({
    color: "#fff",
    "border-color": "#fff",
  });
}
initPlayers(jQuery("#player-container").length);
