export default class Navigation{
  // Variables. No Static Const Support Yet :(
  static #background = document.querySelector("body > background");
  static #backgroundImage = Navigation.#background.querySelector("img");
  static #transitionVelocity = parseInt(getComputedStyle(document.body).getPropertyValue('--transition-velocity'));
  static #menuButton = document.querySelector("body > button");
  static #menu = document.querySelector("body > menu");
  static #anchors = document.querySelectorAll("body > menu > a");

  static #hashes = [];
  static #isMoreShown = false;
  static #pageTransitionDelay = 500;


  static {
    Navigation.#collectHashes();
    Navigation.#onLoad();
    Navigation.#onHashchange();

    Navigation.#onWheel();
    Navigation.#onTouchmove();

    Navigation.#menuShow();
    Navigation.#menuHide();

    Navigation.#onClickShowMoreButton();
    Navigation.#onClickShowLessButton();

  }

  /////// Inits
  static #collectHashes(){
    Navigation.#anchors.forEach((a)=>{
      Navigation.#hashes.push(a.hash);

      a.addEventListener("click", Navigation.#showLess);

    });
  }

  // On Load
  static #onLoad(){
    document.addEventListener('readystatechange', ()=>{
      // Execute "navigate" On First Load
      Navigation.#navigate();
    });
  }

  // On Hash Change
  static #onHashchange(){
    window.addEventListener('hashchange', ()=>{
      event.preventDefault();

      Navigation.#navigate();
    });
  }


  /////// Navigation Using  Wheel / Scroll / Key Press
  static #onWheel(){
    let previousTime = Date.now();
    let currentTime;
    let differenceTime;
    window.addEventListener('wheel', ()=>{
      // Check If Any More Is Shown If So Let User Scroll
      if(Navigation.#isMoreShown) return;

      // Detect Last Wheel Detection.
      // If Last Wheel Detection Was < "pageTransitionDelay" Then Do Nothing
      currentTime = Date.now();
      differenceTime = currentTime - previousTime;
      if(differenceTime < Navigation.#pageTransitionDelay) return;
      previousTime = currentTime;

      let currentHashId = Navigation.#hashes.indexOf(window.location.hash) || 0;
      let idPlusMinus = null;

      if(event.deltaY > 0 && Navigation.#hashes[currentHashId+1] != undefined) idPlusMinus = 1;
      else if(event.deltaY < 0 && Navigation.#hashes[currentHashId-1] != undefined) idPlusMinus = -1;

      // Update The Hash And "hashchange" Event Also Will Be Invoked Automatically
      window.location.href = Navigation.#hashes[currentHashId+idPlusMinus];

    });

  }

  static #onTouchmove(){
    let touches = [];
    let firstTouchPageY = null;

    let lastActionTime = Date.now();
    let currentTime;
    let differenceTime;

    document.addEventListener("touchstart", ()=>{
      // Check If Any More Is Shown If So Let User Scroll
      if(Navigation.#isMoreShown) return;

      firstTouchPageY = event.touches[0].pageY;

    });

    document.addEventListener("touchmove", ()=>{
      // Check If Any More Is Shown If So Let User Scroll
      if(Navigation.#isMoreShown) return;

      // Detect Last "touchmove"
      currentTime = Date.now();
      differenceTime = currentTime - lastActionTime;
      if(differenceTime < Navigation.#pageTransitionDelay) return;
      lastActionTime = currentTime;

      let currentHashId = Navigation.#hashes.indexOf(window.location.hash) || 0;
      let idPlusMinus = null;

      if((firstTouchPageY - event.touches[0].pageY) > 0 && Navigation.#hashes[currentHashId+1] != undefined) idPlusMinus = 1;
      else if((firstTouchPageY - event.touches[0].pageY) < 0 && Navigation.#hashes[currentHashId-1] != undefined) idPlusMinus = -1;

      window.location.href = Navigation.#hashes[currentHashId+idPlusMinus];

    });

  }


  /////// Menu
  // Menu Show On Button Click
  static #menuShow(){
    Navigation.#menuButton.addEventListener("click", ()=>{
      Navigation.#menu.classList.add("show");

    });
  }

  // Menu Hide On Click The Cover. "menu = cover"
  static #menuHide(){
    Navigation.#menu.addEventListener("click", ()=>{
      Navigation.#menu.classList.remove("show");

    });
  }


  /////// Hash
  // Sets Active Menu And Checks If Hash Is Valid And Updates Title
  static #navigate(){
    let validHash = false;

    // Every a in Menu
    Navigation.#anchors.forEach((a) => {
      // Default Expected Condition
      if(a.getAttribute("href") == window.location.hash){
        a.setAttribute("active", "");

        validHash = true;

      }

      // Removing "active" Attribute From menu > a
      else a.removeAttribute("active");

    });

    // If Hash Is Invalid Set Hash To Home And Activate "a" of Home In "menu"
    if(validHash == false){
      window.location.hash = "home";
      Navigation.#anchors[0].setAttribute("active", "");

      validHash = true;

    }

    // Updating Document Title
    document.title = "woXrooX | "+window.location.hash.replace('#', '').toUpperCase();

  }


  /////// Show More/Less
  // Listen To Click On "Show More" Button
  static #onClickShowMoreButton(){
    document.querySelectorAll("body > section > footer > button").forEach((element) => {
      element.addEventListener("click", ()=>{
        if(Navigation.#isMoreShown) Navigation.#showLess();
        else Navigation.#showMore();

      });
    });

  }

  // Listen To Click On "Show Less" Button
  static #onClickShowLessButton(){
    document.querySelectorAll("body > section > more > footer > button").forEach((element) => {
      element.addEventListener("click", ()=>{
        if(Navigation.#isMoreShown) Navigation.#showLess();

      });
    });

  }

  // Update Button Text
  static #updateShowMoreButtonText(id){
    // Button
    let button = document.querySelector(`body > section#${id} > footer > button`);

    // Update Button Text To "value" Attribute If Not Exist Then To "Continue Reading"
    // If isMoreShown == true
    if(!Navigation.#isMoreShown) button.innerText = button.getAttribute("value") || "Continue Reading";

    // Update Button Text To "Back To Navigation"
    else button.innerText = "Back To Navigation";

  }

  // Show More
  static #showMore(){
    // Check If Alread Shown More
    if(Navigation.#isMoreShown == true) return;

    // Update "isMoreShown" To "true"
    Navigation.#isMoreShown = true;

    // Current Section + .scrollable
    let section = document.getElementById(window.location.hash.replace('#', ''));
    section.classList.add("scrollable");

    // Update Button Text
    Navigation.#updateShowMoreButtonText(section.id);

    // <more/> + .show
    section.querySelector("more").classList.add("show");

    // Background Image
    Navigation.#backgroundImage.classList.add("moreShown");
    Navigation.#background.classList.add("moreShown");

    // Scroll 100 To Bottom After "--transition-velocity"
    setTimeout(()=>{
      section.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth'
      });
    }, Navigation.#transitionVelocity / 4);

  }

  // Show Less
  static #showLess(){
    // Check If Alread Shown Less
    if(Navigation.#isMoreShown == false) return;

    // Update "isMoreShown" To "false"
    Navigation.#isMoreShown = false;

    // Current Section
    let section = document.getElementById(window.location.hash.replace('#', ''));

    // Update Button Text
    Navigation.#updateShowMoreButtonText(section.id);

    // Wait "--transition-velocity"ms To Prevent Unsmooth Jump
    setTimeout(()=>{
      // section - .scrollable
      section.classList.remove("scrollable");

      // <more/> - .show
      section.querySelector("more").classList.remove("show");
    }, Navigation.#transitionVelocity);



    // Background Image
    Navigation.#backgroundImage.classList.remove("moreShown");
    Navigation.#background.classList.remove("moreShown");

    // Scroll Back To Top
    section.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }


}
