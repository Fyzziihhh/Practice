const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
gsap.from(".nlink", {
  stagger: 0.2,
  y: 10,
  opacity: 0,
  duration: 1,
  ease: Power3,
});


