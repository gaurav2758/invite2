// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// Sync GSAP with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --------------------------------------------------------
// SECTION 1: INTRO ANIMATIONS
// --------------------------------------------------------
gsap.set('.intro-part-2', { opacity: 0, scale: 0.5 }); // Set initial state in GSAP

const introTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#intro-sec',
        start: 'top top',
        end: '+=2000', // Pin for a long scroll
        scrub: 1,
        pin: true,
    }
});

introTl.to('.intro-part-1', { opacity: 0, scale: 2, filter: 'blur(10px)', duration: 1 })
    .to('.intro-part-2', { opacity: 1, scale: 1, duration: 1 })
    .to('.intro-part-2', { opacity: 0, scale: 1.5, filter: 'blur(10px)', duration: 1 }, "+=0.5");

// --------------------------------------------------------
// SECTION 2: BRIDE REVEAL
// --------------------------------------------------------
const brideText = new SplitType('.bride-name', { types: 'chars' });

// Initial state for characters
gsap.set(brideText.chars, { opacity: 0, scale: 5, filter: 'blur(20px)', z: 500 });

const brideTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#bride-sec',
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
    }
});

brideTl.to('.bride-sub', { opacity: 1, y: -20, duration: 1 })
    .to(brideText.chars, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        z: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out"
    })
    .to('.bride-desc', { opacity: 1, y: -10, duration: 1 }, "-=1")
    // Hold frame
    .to('.bride-content', { opacity: 1, duration: 1 })
    // Fade out the whole section
    .to('.bride-content', { opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: 1 });


// --------------------------------------------------------
// SECTION 3: GROOM REVEAL
// --------------------------------------------------------
const groomText = new SplitType('.groom-name', { types: 'chars' });
gsap.set(groomText.chars, { opacity: 0, scale: 5, filter: 'blur(20px)', z: 500 });

const groomTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#groom-sec',
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
    }
});

groomTl.to('.groom-sub', { opacity: 1, y: -20, duration: 1 })
    .to(groomText.chars, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        z: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out"
    })
    .to('.groom-desc', { opacity: 1, y: -10, duration: 1 }, "-=1")
    .to('.groom-content', { opacity: 1, duration: 1 })
    .to('.groom-content', { opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: 1 });


// --------------------------------------------------------
// CHAPTER I: DELHI
// --------------------------------------------------------
gsap.from('#delhi-sec', {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '#delhi-sec',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
    }
});

const delhiTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#delhi-sec',
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
    }
});

delhiTl.to('.delhi-card-wrapper', { opacity: 1, y: 0, duration: 1 })
       .to('.delhi-card-wrapper', { opacity: 1, duration: 1 }) // Hold
       .to('.delhi-card-wrapper', { opacity: 0, y: -50, filter: 'blur(10px)', duration: 1 });


// --------------------------------------------------------
// CHAPTER II: MUSSOORIE (HORIZONTAL SCROLL)
// --------------------------------------------------------
const eventsWrapper = document.querySelector('.events-wrapper');

function getScrollAmount() {
    let wrapperWidth = eventsWrapper.scrollWidth;
    return -(wrapperWidth - window.innerWidth);
}

gsap.from('#mussoorie-sec', {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '#mussoorie-sec',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
    }
});

const eventsTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#mussoorie-sec',
        start: 'top top',
        end: () => `+=${eventsWrapper.scrollWidth}`, // Scroll amount matches wrapper length
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
    }
});

eventsTl.to(eventsWrapper, {
    x: getScrollAmount,
    ease: "none"
});

// --------------------------------------------------------
// SECTION 3.5: TOGETHER REVEAL
// --------------------------------------------------------
gsap.set('.together-bride', { x: -200, opacity: 0, filter: 'blur(10px)' });
gsap.set('.together-groom', { x: 200, opacity: 0, filter: 'blur(10px)' });
gsap.set('.together-amp', { scale: 0, opacity: 0, rotationZ: 45 });

const togetherTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#together-sec',
        start: 'top top',
        end: '+=2500',
        scrub: 1,
        pin: true,
    }
});

togetherTl.to('.together-bride', { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1 })
    .to('.together-groom', { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, "<")
    .to('.together-amp', { scale: 1, opacity: 1, rotationZ: 0, duration: 0.5 }, "-=0.5")
    .to('.together-content', { opacity: 1, duration: 1 }) // hold
    .to('.together-content', { opacity: 0, y: -50, filter: 'blur(10px)', duration: 1 });

// --------------------------------------------------------
// BACKGROUND PARTICLES
// --------------------------------------------------------
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#d4af37" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 0.5, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
    "retina_detect": true
});
