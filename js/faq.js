'use strict';

export default class Faq{
  static{
    Faq.#observe();
  }

  static #observe(){
    const observer = new IntersectionObserver(elements =>{
      elements.forEach((element)=>{
        if(element.isIntersecting) element.target.classList.add("observing");
        // else element.target.classList.remove("observing");

      });
    },{
      threshhold: 0
    });

    document.querySelectorAll("body > section#questions > more > p").forEach((element)=>{observer.observe(element);});

  }

}
