'use strict';

//////// Menu
Menu: {
  const menu = document.querySelector("body > menu");
  let disableObserving = false;

  // Open On Button Click
  document.querySelector("body > button").addEventListener("click", ()=>{
    menu.classList.add("open");

  });

  // Disable Observing On Click menu > a
  document.querySelectorAll("body > menu > a").forEach((a)=>{
    a.onclick = ()=>{
      disableObserving = true;
    }
  });


  // Close On Click The Cover
  menu.addEventListener("click", ()=>{
    menu.classList.remove("open");

  });

  // Sets Active Menu And Checks If Hash Is Valid And Updates Title
  function update(){
    let validHash = false;

    // Every a in Menu
    document.querySelectorAll("body > menu > a").forEach((a) => {
      // Default Expected Condition
      if(a.getAttribute("href") == window.location.hash){
        a.setAttribute("active", "");

        validHash = true;

      }

      // Removing "active" Attribute From menu > a
      else{
        a.removeAttribute("active");

      }

    });

    // If Hash Is Invalid Set It To Home
    if(validHash == false){
      window.location.hash = "home";
      document.querySelector("body > menu > a:nth-child(1)").setAttribute("active", "");

      validHash = true;

    }

    // Updating Document Title
    document.title = "woXrooX | "+window.location.hash.replace('#', '').toUpperCase();

    // Allowing Again Observing Not Great Way But Works Untill I Find New Solution
    setTimeout(()=>{
      disableObserving = false;
    }, 500);
  }

  // Could Add Few More Ifs To Catch ReadyState
  document.addEventListener('readystatechange', update);
  window.addEventListener('hashchange', update);

  // Update Hash On Scroll
  const observer = new IntersectionObserver(elements =>{
    elements.forEach((element)=>{
      if(element.isIntersecting && disableObserving == false){
        window.location.hash = element.target.id;
      }
    });

  }, {
    threshhold: 0,
    rootMargin: "-50px"
  });

  document.querySelectorAll("body > main > div").forEach((element)=>{observer.observe(element);});
}

//////// Elements Fade In Move Top -> ".observerTarget"
ObserveByClass: {
  const observer = new IntersectionObserver(elements =>{
    elements.forEach((element)=>{
      element.target.classList.toggle("fadeIn", element.isIntersecting);

      // Disabling Second Time Observing
      if(element.isIntersecting) observer.unobserve(element.target);

    });
  }, {
    threshhold: 0
    // rootMargin: "-50px"
  });

  document.querySelectorAll(".observerTarget").forEach((element)=>{observer.observe(element);});

}

//////// Skills
Skills: {
  const observer = new IntersectionObserver(elements =>{
    elements.forEach((element)=>{

      if(element.isIntersecting) {
        element.target.style.width = element.target.getAttribute("percentage");
        element.target.parentNode.previousElementSibling.innerHTML = `( ${element.target.getAttribute("percentage")} )`;
      }else{
        element.target.style.width = "0px";
      }

    });
  }, {
    threshhold: 0
    // rootMargin: "-50px"
  });

  document.querySelectorAll("body > main > div#skills > main > div > div").forEach((element)=>{observer.observe(element);});
}
