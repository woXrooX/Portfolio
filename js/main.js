'use strict';

import Navigation from "./navigation.js";

//////// Elements Fade In Move Top -> ".observerTarget"
// ObserveByClass: {
//   const observer = new IntersectionObserver(elements =>{
//     elements.forEach((element)=>{
//       element.target.classList.toggle("fadeIn", element.isIntersecting);
//
//       // Disabling Second Time Observing
//       // if(element.isIntersecting) observer.unobserve(element.target);
//
//     });
//   }, {
//     threshhold: 0
//     // rootMargin: "-50px"
//   });
//
//   document.querySelectorAll(".observerTarget").forEach((element)=>{
//   // document.querySelectorAll(".observerTarget").forEach((element)=>{
//     observer.observe(element);});
//
// }

//////// Skills
// Skills: {
//   const observer = new IntersectionObserver(elements =>{
//     elements.forEach((element)=>{
//
//       if(element.isIntersecting) {
//         element.target.style.width = element.target.getAttribute("percentage");
//         element.target.parentNode.previousElementSibling.innerHTML = `( ${element.target.getAttribute("percentage")} )`;
//       }else{
//         element.target.style.width = "0px";
//       }
//
//     });
//   }, {
//     threshhold: 0
//     // rootMargin: "-50px"
//   });
//
//   document.querySelectorAll("body > section#skills > main > div > div").forEach((element)=>{observer.observe(element);});
// }
