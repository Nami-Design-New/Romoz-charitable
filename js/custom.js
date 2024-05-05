$(document).ready(function () {
  // favicon based on color scheme
  function setFavicon() {
    const darkFavicon = $("#browser-dark-theme-favicon");
    const lightFavicon = $("#browser-light-theme-favicon");
    if (darkFavicon.length > 0 && lightFavicon.length > 0) {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        lightFavicon.removeAttr("href");
        // lightFavicon.attr("disabled", "disabled");
      } else {
        darkFavicon.removeAttr("href");
        // darkFavicon.attr("disabled", "disabled");
      }
    }
  }
  setFavicon();
  // listen for changes in the color scheme and update the favicon
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      setFavicon();
    });
  $(".navbar-toggler").on("click", function () {
    // Toggle the "show" class on the navbar-nav element
    $(".navbar-nav").toggleClass("show");
  });
  // Add a click event listener to the document
  $(document).on("click", function (event) {
    // Check if the clicked element is not part of the navbar
    if (!$(event.target).closest(".navbar").length) {
      // Remove the "show" class from the navbar-nav element
      $(".navbar-nav").removeClass("show");
    }
  });
  //navbar ainmation
  $(window).scroll(function () {
    var appScroll = $(document).scrollTop();
    if (appScroll >= 1) {
      $("header").addClass("headerAnimate");
    } else {
      $("header").removeClass("headerAnimate");
    }
  });
  //mainSlider
  function calculateAutoplayDelay(video, minimumDelay) {
    if (video) {
      const videoDuration = video.duration * 1000;
      return Math.max(videoDuration, minimumDelay);
    }
    return minimumDelay;
    x;
  }
  // Initialize mainSlider
  const mainSlider = new Swiper(".mainSlider", {
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    speed: 500,
    effect: "fade",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".mainSliderPagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".mainSliderNext",
      prevEl: ".mainSliderPrev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    on: {
      init: function () {
        setAutoplayDelay(this);
      },
      slideChange: function () {
        pauseAllVideos();
        const activeSlide = this.slides[this.activeIndex];
        const activeVideo = activeSlide.querySelector(".mainSlider video");
        if (activeVideo) {
          activeVideo.play();
          setAutoplayDelay(this);
        }
      },
    },
  });
  function setAutoplayDelay(slider) {
    const activeSlide = slider.slides[slider.activeIndex];
    const activeVideo = activeSlide.querySelector(".mainSlider video");
    const autoplayDelay = calculateAutoplayDelay(activeVideo, 8000);
    slider.params.autoplay.delay = autoplayDelay;
    slider.autoplay.start();
    console.log("Swiper Autoplay Delay:", autoplayDelay);
  }
  // Function to pause all videos
  function pauseAllVideos() {
    const allVideos = document.querySelectorAll(".mainSlider video");
    allVideos.forEach(function (video) {
      video.pause();
    });
  }

  $(".project .projectInfo .description").each(function () {
    var text = $(this).text();
    if (text.length > 90) {
      var truncatedText =
        $.trim(text).substring(0, 90).split(" ").slice(0, -1).join(" ") +
        "...";
      $(this).text(truncatedText);
    }
  });
});
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
$(document).ready(function () {
  //spinner
  $(".preloader").delay(1000).fadeOut(300);
  //aos Delay
  $("section").each(function () {
    const sectionDivs = $(this).find("[data-aos]");
    sectionDivs.each(function (index) {
      // Check if data-aos-delay is not already set
      if (!$(this).attr("data-aos-delay")) {
        $(this).attr("data-aos-delay", (index + 1) * 100);
      }
    });
  });
  // aos
  AOS.init({
    offset: 20,
    delay: 50,
    duration: 750,
    once: true,
  });
  // lozad
  const observer = lozad(".lazy", {
    loaded: function (el) {
      el.parentNode.classList.add("loaded");
    },
  });
  observer.observe();
  // parallax
  var parallaxImage = document.getElementsByClassName("parallax");
  new simpleParallax(parallaxImage, {
    delay: 1,
    transition: "cubic-bezier(0,0,0,1)",
  });
  // tooltip
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  // counter up
  const counterUp = window.counterUp.default;
  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 3000,
          delay: 16,
        });
        el.classList.add("is-visible");
      }
    });
  };
  const IO = new IntersectionObserver(callback, { threshold: 1 });
  const elements = document.querySelectorAll(".counterUp");
  elements.forEach((el) => IO.observe(el));
});
// filepond
$(".filepond-multiple").filepond({
  allowMultiple: true,
});
////////////////////////////// ///////////////////////
// Text Animation
////////////////////////////// ///////////////////////
// lines
const animate_lines = document.querySelectorAll(".animate_lines");
animate_lines.forEach((areveal) => {
  var duration_value = 1;
  var onscroll_value = 1;
  var stagger_value = 0.08;
  var data_delay = 0.5;
  if (areveal.getAttribute("data-duration")) {
    duration_value = areveal.getAttribute("data-duration");
  }
  if (areveal.getAttribute("data-on-scroll")) {
    onscroll_value = areveal.getAttribute("data-on-scroll");
  }
  if (areveal.getAttribute("data-stagger")) {
    stagger_value = areveal.getAttribute("data-stagger");
  }
  if (areveal.getAttribute("data-delay")) {
    data_delay = areveal.getAttribute("data-delay");
  }
  areveal.split = new SplitText(areveal, {
    // type: "lines,words,chars",
    type: "lines,words",
    linesClass: "anim-reveal-line",
  });
  if (onscroll_value == 1) {
    areveal.anim = gsap.from(areveal.split.lines, {
      scrollTrigger: {
        trigger: areveal,
        start: "top 90%",
      },
      duration: duration_value,
      delay: data_delay,
      ease: "circ.out",
      y: 80,
      stagger: stagger_value,
      opacity: 0,
    });
  } else {
    areveal.anim = gsap.from(areveal.split.lines, {
      duration: duration_value,
      delay: data_delay,
      ease: "circ.out",
      y: 80,
      stagger: stagger_value,
      opacity: 0,
    });
  }
});
// words
const animate_words = document.querySelectorAll(".animate_words");
animate_words.forEach((areveal) => {
  var duration_value = 1;
  var onscroll_value = 1;
  var stagger_value = 0.01;
  var data_delay = 0.5;
  if (areveal.getAttribute("data-duration")) {
    duration_value = areveal.getAttribute("data-duration");
  }
  if (areveal.getAttribute("data-on-scroll")) {
    onscroll_value = areveal.getAttribute("data-on-scroll");
  }
  if (areveal.getAttribute("data-stagger")) {
    stagger_value = areveal.getAttribute("data-stagger");
  }
  if (areveal.getAttribute("data-delay")) {
    data_delay = areveal.getAttribute("data-delay");
  }
  areveal.split = new SplitText(areveal, {
    // type: "lines,words,chars",
    type: "lines,words",
    linesClass: "anim-reveal-line",
  });
  if (onscroll_value == 1) {
    areveal.anim = gsap.from(areveal.split.words, {
      scrollTrigger: {
        trigger: areveal,
        start: "top 90%",
      },
      duration: duration_value,
      delay: data_delay,
      ease: "circ.out",
      y: 80,
      stagger: stagger_value,
      opacity: 0,
    });
  } else {
    areveal.anim = gsap.from(areveal.split.words, {
      duration: duration_value,
      delay: data_delay,
      ease: "circ.out",
      y: 80,
      stagger: stagger_value,
      opacity: 0,
    });
  }
});
// chars
const animate_chars = document.querySelectorAll(".animate_chars");
animate_chars.forEach((areveal) => {
  var duration_value = 1;
  var onscroll_value = 1;
  var stagger_value = 0.003;
  var data_delay = 0.5;
  if (areveal.getAttribute("data-duration")) {
    duration_value = areveal.getAttribute("data-duration");
  }
  if (areveal.getAttribute("data-on-scroll")) {
    onscroll_value = areveal.getAttribute("data-on-scroll");
  }
  if (areveal.getAttribute("data-stagger")) {
    stagger_value = areveal.getAttribute("data-stagger");
  }
  if (areveal.getAttribute("data-delay")) {
    data_delay = areveal.getAttribute("data-delay");
  }
  areveal.split = new SplitText(areveal, {
    type: "lines,words,chars",
    linesClass: "anim-reveal-line",
  });
  if (onscroll_value == 1) {
    areveal.anim = gsap.from(areveal.split.chars, {
      scrollTrigger: {
        trigger: areveal,
        start: "top 90%",
      },
      duration: duration_value,
      delay: data_delay,
      ease: "circ.out",
      y: 80,
      stagger: stagger_value,
      opacity: 0,
    });
  } else {
    areveal.anim = gsap.from(areveal.split.chars, {
      duration: duration_value,
      delay: data_delay,
      ease: "circ.out",
      y: 80,
      stagger: stagger_value,
      opacity: 0,
    });
  }
});
