(function ($) {
  "use strict";

  /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
  // Check ie and version
  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return myNav.indexOf("msie") != -1
      ? parseInt(myNav.split("msie")[1], 10)
      : false;
  }

  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };
  // Shrink the navbar
  navbarShrink();
  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);
  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }
  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Parallax background
  function bgParallax() {
    if ($(".parallax").length) {
      $(".parallax").each(function () {
        var height = $(this).position().top;
        var resize = height - $(window).scrollTop();
        var parallaxSpeed = $(this).data("speed");
        var doParallax = -(resize / parallaxSpeed);
        var positionValue = doParallax + "px";
        var img = $(this).data("bg-image");

        $(this).css({
          backgroundImage: "url(" + img + ")",
          backgroundPosition: "50%" + positionValue,
          backgroundSize: "cover",
        });

        if (window.innerWidth < 768) {
          $(this).css({
            backgroundPosition: "center center",
          });
        }
      });
    }
  }

  bgParallax();

  // Hero slider background setting
  function sliderBgSetting() {
    if ($(".hero-slider .slide-item").length) {
      $(".hero-slider .slide-item").each(function () {
        var $this = $(this);
        var img = $this.find(".slider-bg").attr("src");

        $this.css({
          backgroundImage: "url(" + img + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        });
      });
    }
  }

  //Setting hero slider
  function heroSlider() {
    if ($(".hero-slider").length) {
      $(".hero-slider").slick({
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        dots: true,
        fade: true,
        cssEase: "linear",
      });
    }
  }

  // set two coloumn height equial
  function setTwoColEqHeight($col1, $col2) {
    var firstCol = $col1,
      secondCol = $col2,
      firstColHeight = $col1.innerHeight(),
      secondColHeight = $col2.innerHeight();

    if (firstColHeight > secondColHeight) {
      secondCol.css({
        height: firstColHeight + 1 + "px",
      });
    } else {
      firstCol.css({
        height: secondColHeight + 1 + "px",
      });
    }
  }

  function popupSaveTheDateCircle() {
    var saveTheDateCircle = $(".save-the-date");
    saveTheDateCircle.addClass("popup-save-the-date");
  }

  /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
  function preloader() {
    if ($(".preloader").length) {
      $(".preloader")
        .delay(100)
        .fadeOut(500, function () {
          //active wow
          wow.init();

          if ($(".save-the-date").length) {
            popupSaveTheDateCircle();
          }

          //Active heor slider
          heroSlider();
        });
    }
  }

  /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });

  /*------------------------------------------
        = ACTIVE POPUP GALLERY
    -------------------------------------------*/
  if ($(".gallery-fancybox").length) {
    $(".fancybox").fancybox({
      openEffect: "elastic",
      closeEffect: "elastic",
      wrapCSS: "project-fancybox-title-style",
    });
  }

  /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
  if ($(".video-play-btn").length) {
    $(".video-play-btn").on("click", function () {
      $.fancybox({
        href: this.href,
        type: $(this).data("type"),
        title: this.title,
        helpers: {
          title: { type: "inside" },
          media: {},
        },

        beforeShow: function () {
          $(".fancybox-wrap").addClass("gallery-fancybox");
        },
      });
      return false;
    });
  }

  /*------------------------------------------
        = POPUP YOUTUBE, VIMEO, GMAPS
    -------------------------------------------*/
  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
  if ($(".popup-gallery").length) {
    $(".popup-gallery").magnificPopup({
      delegate: "a",
      type: "image",

      gallery: {
        enabled: true,
      },

      zoom: {
        enabled: true,

        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  }

  /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
  if ($(".popup-image").length) {
    $(".popup-image").magnificPopup({
      type: "image",
      zoom: {
        enabled: true,

        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  }

  /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
  function sortingGallery() {
    if ($(".sortable-gallery .gallery-filters").length) {
      var $container = $(".gallery-container");
      $container.isotope({
        filter: "*",
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });

      $(".gallery-filters li a").on("click", function () {
        $(".gallery-filters li .current").removeClass("current");
        $(this).addClass("current");
        var selector = $(this).attr("data-filter");
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }
  }

  sortingGallery();

  /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
  function masonryGridSetting() {
    if ($(".masonry-gallery").length) {
      var $grid = $(".masonry-gallery").masonry({
        itemSelector: ".grid",
        columnWidth: ".grid",
        percentPosition: true,
      });

      $grid.imagesLoaded().progress(function () {
        $grid.masonry("layout");
      });
    }
  }

  masonryGridSetting();

  /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

  // Function for clone an element for sticky menu
  function cloneNavForSticyMenu($ele, $newElmClass) {
    $ele
      .addClass("original")
      .clone()
      .insertAfter($ele)
      .addClass($newElmClass)
      .removeClass("original");
  }

  // clone home style 1 navigation for sticky menu
  if ($(".header-style-1 .navigation").length) {
    cloneNavForSticyMenu($(".header-style-1 .navigation"), "sticky");
  }

  // clone home style 1 navigation for sticky menu
  if ($(".header-style-2 .navigation").length) {
    cloneNavForSticyMenu($(".header-style-2 .navigation"), "sticky-2");
  }

  // Function for sticky menu
  function stickIt($stickyClass, $toggleClass, $topOffset) {
    if ($(window).scrollTop() >= $topOffset) {
      var orgElement = $(".original");
      var widthOrgElement = orgElement.css("width");

      $stickyClass.addClass($toggleClass);

      $stickyClass
        .css({
          width: widthOrgElement,
        })
        .show();

      $(".original").css({
        visibility: "hidden",
      });
    } else {
      $(".original").css({
        visibility: "visible",
      });

      $stickyClass.removeClass($toggleClass);
    }
  }

  /*-------------------------------------------------------
        = COUPLE SECTION IMAGE BG SETTING
    -----------------------------------------------------*/
  if ($(".wedding-couple-section .gb").length) {
    var imgHolder = $(".wedding-couple-section .gb .img-holder");

    imgHolder.each(function () {
      var $this = $(this);
      var imgHolderPic = $this.find("img").attr("src");

      $this.css({
        backgroundImage: "url(" + imgHolderPic + ")",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      });
    });
  }

  /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
  if ($("#clock").length) {
    $("#clock").countdown("2025/10/05", function (event) {
      var $this = $(this).html(
        event.strftime(
          "" +
            '<div class="box"><div>%D</div> <span>Days</span> </div>' +
            '<div class="box"><div>%H</div> <span>Hours</span> </div>' +
            '<div class="box"><div>%M</div> <span>Mins</span> </div>' +
            '<div class="box"><div>%S</div> <span>Secs</span> </div>'
        )
      );
    });
  }

  /*------------------------------------------
        = STORY SLIDER
    -------------------------------------------*/
  if ($(".story-slider").length) {
    $(".story-slider").owlCarousel({
      items: 1,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 1000,
      loop: true,
    });
  }

  /*------------------------------------------
        = GIFT REGISTRATION SLIDER
    -------------------------------------------*/
  // if ($(".gif-registration-slider").length) {
  //   $(".gif-registration-slider").owlCarousel({
  //     items: 2,
  //     dots: false,
  //     autoplay: true,
  //     autoplayTimeout: 3000,
  //     smartSpeed: 1000,
  //     loop: false,
  //     margin: 20,
  //     stagePadding: 10,
  //     responsive: {
  //       0: {
  //         items: 1,
  //       },
  //       480: {
  //         items: 2,
  //       },
  //     },
  //   });
  // }

  /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
  if ($("#rsvp-form").length) {
    $("#rsvp-form").validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        email: "required",

        guest: {
          required: true,
        },

        events: {
          required: true,
        },
      },

      messages: {
        name: "Please enter your name",
        email: "Please enter your email",
        guest: "Select your number of guest",
        events: "Select your event list",
      },

      submitHandler: function (form) {
        $("#loader").css("display", "inline-block");
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: $(form).serialize(),
          success: function () {
            $("#loader").hide();
            $("#success").slideDown("slow");
            setTimeout(function () {
              $("#success").slideUp("slow");
            }, 3000);
            form.reset();
          },
          error: function () {
            $("#loader").hide();
            $("#error").slideDown("slow");
            setTimeout(function () {
              $("#error").slideUp("slow");
            }, 3000);
          },
        });
        return false; // required to block normal submit since you used ajax
      },
    });
  }

  /*------------------------------------------
        = TOGGLE MUSUC BIX
    -------------------------------------------*/
  // if ($(".music-box").length) {
  //   var musicBtn = $(".music-box-toggle-btn"),
  //     musicBox = $(".music-holder");

  //   musicBtn.on("click", function () {
  //     musicBox.toggleClass("toggle-music-box");
  //     return false;
  //   });
  // }

  if ($(".music-box").length) {
    var musicBtn = $(".music-box-toggle-btn"),
      musicBox = $(".music-holder"),
      audio = document.getElementById("bg-music");

    // Optional: Unmute on button click
    musicBtn.on("click", function () {
      musicBox.toggleClass("toggle-music-box");

      // Aktifkan suara
      if (audio.muted) {
        audio.muted = false;
        audio.play();
      } else {
        audio.pause();
        audio.muted = true;
      }

      return false;
    });
  }

  /*------------------------------------------
        = BACK TO TOP
    -------------------------------------------*/
  if ($(".back-to-top-btn").length) {
    $(".back-to-top-btn").on("click", function () {
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        2000,
        "easeInOutExpo"
      );
      return false;
    });
  }

  /*------------------------------------------
        = BLOG MEDIA CAROUSEL
    -------------------------------------------*/
  if ($(".media-carousel").length) {
    $(".media-carousel").owlCarousel({
      items: 1,
      smartSpeed: 500,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      dots: false,
    });
  }

  /*------------------------------------------
        = WATER RIPPLE
    -------------------------------------------*/
  if ($(".ripple").length) {
    $(".ripple").ripples({
      resolution: 512,
      dropRadius: 20, //px
      perturbance: 0.04,
    });

    // Automatic drops
    setInterval(function () {
      var $el = $(".ripple");
      var x = Math.random() * $el.outerWidth();
      var y = Math.random() * $el.outerHeight();
      var dropRadius = 20;
      var strength = 0.04 + Math.random() * 0.04;

      $el.ripples("drop", x, y, dropRadius, strength);
    }, 400);
  }

  /*------------------------------------------
        = PARTICLE GROUND
    -------------------------------------------*/
  if ($(".particleground").length) {
    $(".particleground").particleground({
      dotColor: "#78c1b3",
      lineColor: "#5e9a8e",
      lineWidth: 0.7,
      particleRadius: 6,
    });
  }

  /*------------------------------------------
        = VIDEO BACKGROUND
    -------------------------------------------*/
  if ($("#video-background").length) {
    $("#video-background").YTPlayer({
      showControls: false,
      playerVars: {
        modestbranding: 0,
        autoplay: 1,
        controls: 1,
        showinfo: 0,
        wmode: "transparent",
        branding: 0,
        rel: 0,
        autohide: 0,
        origin: window.location.origin,
      },
    });
  }

  /*------------------------------------------
        = SURFACE SHADER
    -------------------------------------------*/
  if ($(".surface-shader").length) {
    //$('.surface-shader')
  }

  /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
  $(window).on("load", function () {
    preloader();

    sliderBgSetting();

    toggleMobileNavigation();

    smallNavFunctionality();

    //set the couple section groom bride two col equal height
    if ($(".wedding-couple-section").length) {
      setTwoColEqHeight(
        $(".wedding-couple-section .gb .img-holder"),
        $(".wedding-couple-section .gb .details")
      );
    }

    smoothScrolling(
      $("#navbar > ul > li > a[href^='#']"),
      $(".header-style-1 .navigation").innerHeight()
    );
  });

  /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
  $(window).on("scroll", function () {
    bgParallax();

    activeMenuItem($(".navigation-holder"));

    if ($(".header-style-1").length) {
      stickIt(
        $(".sticky"),
        "sticky-on",
        $(".header-style-1 .navbar").offset().top
      );
    }

    if ($(".header-style-2").length) {
      stickIt($(".sticky-2"), "sticky-on", 300);
    }
  });
  window.onscroll = function () {
    myFunction();
  };

  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky-header");
    } else {
      header.classList.remove("sticky-header");
    }
  }

  /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
  $(window).on("resize", function () {
    toggleClassForSmallNav();
    //smallNavFunctionality();

    clearTimeout($.data(this, "resizeTimer"));
    $.data(
      this,
      "resizeTimer",
      setTimeout(function () {
        smallNavFunctionality();
      }, 200)
    );
  });
})(window.jQuery);
