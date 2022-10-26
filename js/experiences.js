'use strict';

export default class Experiences{
  static #all = [
    {name: "C++", start: 2018, end: null},
    {name: "PHP", start: 2012, end: 2019},
    {name: "Python", start: 2019, end: null},
    {name: "JavaScript", start: 2013, end: null},
    {name: "HTML / CSS", start: 2012, end: null},
    {name: "SQL", start: 2013, end: null},
    {name: "NoSQL", start: 2019, end: null},
    {name: "Java", start: 2012, end: 2014},
    {name: "Linux", start: 2018, end: null},
    {name: "Microsoft Windows", start: 2012, end: 2020},
    {name: "Adobe Photoshop", start: 2013, end: 2021},
    {name: "Adobe Premiere Pro", start: 2017, end: 2021},
    {name: "DaVinci Resolve", start: 2022, end: null}

  ];

  static #startYear = 2012;
  static #currentYear = new Date().getFullYear();

  static{
    Experiences.#createYears();
    Experiences.#createProgressBars();
    Experiences.#observe();

  }

  static #createYears(){
    let html = '';

    for(let i = Experiences.#startYear; i <= Experiences.#currentYear; i++){
      html += `<span>${i}</span>`;

    }

    document.querySelector("body > section#experiences > more > section.years").innerHTML = html;

  }

  static #createProgressBars(){
    const startYear = 2012;
    const currentYear = new Date().getFullYear();
    const fullYear = currentYear - startYear;

    let html = '';

    Experiences.#all.forEach((skill)=>{
      let absoluteYearsOfExperience = 0;
      let yearsOfExperienceText;

      if(skill.end !== null){
        absoluteYearsOfExperience = skill.end - skill.start;
        yearsOfExperienceText = absoluteYearsOfExperience + ` Year${absoluteYearsOfExperience == 1 ? '':'s'}`;

      }else{
        absoluteYearsOfExperience = currentYear - skill.start;
        yearsOfExperienceText = `Since ${skill.start}`;

      }

      html += `
<span>${skill.name} &#8226;</span>
<span class="lifespan">${yearsOfExperienceText}</span>
<div>
  <div
    space="${(skill.start - startYear) * 100 / fullYear}"
    percentage="${absoluteYearsOfExperience * 100 / fullYear}"
  ></div>
</div>
      `;
    });

    document.querySelector("body > section#experiences > more").innerHTML += html;

  }

  static #observe(){
    const observer = new IntersectionObserver(elements =>{
      elements.forEach((element)=>{
        if(element.isIntersecting){
          element.target.style = `
            width: ${element.target.getAttribute("percentage")}%;
            margin-left: ${element.target.getAttribute("space")}%;

          `;

        }else element.target.style = null;

      });
    }, {
      threshhold: 0
      // rootMargin: "-50px"
    });

    document.querySelectorAll("body > section#experiences > more > div > div").forEach((element)=>{observer.observe(element);});

  }

}
