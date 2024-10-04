// Stel de standaard easing-functie in op "power3" voor soepelere animaties
gsap.defaults({ease: "power3"});

// Stel de beginpositie van ".card.box" elementen in op 200px onder hun oorspronkelijke positie
gsap.set(".card", {y: 200});

// Gebruik ScrollTrigger om ".card.box" elementen in batches te verwerken
ScrollTrigger.batch(".card", {
  // Definieer acties voor wanneer elementen in het viewport komen
  onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, duration: 1, stagger: {each: 1, grid: [1, 3]}, overwrite: true}),
  // Definieer acties voor wanneer elementen het viewport verlaten
  onLeave: batch => gsap.to(batch, {opacity: 0, y: -200, duration: 1, overwrite: true}),
  // Definieer acties voor wanneer elementen opnieuw in het viewport komen tijdens het omhoog scrollen
  onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, duration: 1, stagger: 1, overwrite: true}),
  // Definieer acties voor wanneer elementen het viewport verlaten tijdens het omhoog scrollen
  onLeaveBack: batch => gsap.to(batch, {opacity: 0, y: 200, duration: 1, overwrite: true})
});

// Luister naar het "refreshInit" evenement dat door ScrollTrigger wordt geactiveerd en reset de positie van ".card" elementen naar hun oorspronkelijke positie
ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".card", {y: 0}));


