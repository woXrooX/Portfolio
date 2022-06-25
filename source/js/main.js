'use strict';

//////// nav
function navSetActive(){
  let validHash = false;

  // Every a in nav
  document.querySelectorAll("body > nav > a").forEach((a) => {
    // Default Expected Condition
    if(a.getAttribute("href") == window.location.hash){
      a.setAttribute("active", "");
      setTimeout(()=>{
        document.querySelector(`body > section${a.getAttribute("href")}`).removeAttribute("style");
      }, 250);


      validHash = true;
    }

    // Removing "active" Attribute From nav > a
    else{
      a.removeAttribute("active");
      setTimeout(()=>{
        document.querySelector(`body > section${a.getAttribute("href")}`).style.display = "none";
      }, 250);
    }

  });

  // If Hash Is Invalid Set It To Home
  if(validHash == false){
    window.location.hash = "home";
    document.querySelector("body > nav > a:nth-child(1)").setAttribute("active", "");

    validHash = true;

  }

  // Updating Document Title
  document.title = "woXrooX | "+window.location.hash.replace('#', '').toUpperCase();
}

// Could add few more ifs to catch readyState
document.addEventListener('readystatechange', navSetActive);
window.addEventListener('hashchange', navSetActive);

//////// observer
const targets = document.querySelectorAll(".observerTarget");
let delay = 0;
const observer = new IntersectionObserver(elements =>{
  elements.forEach((element)=>{
    delay += 20;
    setTimeout(()=>{
      element.target.classList.toggle("fadeIn", element.isIntersecting);
    }, delay);
  });
  delay = 0;
}, {
  threshhold: 0
});

targets.forEach((target)=>{
  observer.observe(target);
});
