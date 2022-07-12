export default class Skills{
  static #all = [
    {name: "C++", percentage: "35%"},
    {name: "PHP", percentage: "45%"},
    {name: "Python", percentage: "50%"},
    {name: "JavaScript", percentage: "48%"},
    {name: "HTML", percentage: "87%"},
    {name: "CSS", percentage: "70%"},
    {name: "SQL", percentage: "55%"},
    {name: "Linux", percentage: "30%"},
    {name: "Adobe Photoshop", percentage: "45%"},
    {name: "Adobe Premiere Pro", percentage: "38%"}
  ];

  static{
    Skills.#createElements();
    Skills.#wordCloud();
    Skills.#observe();

  }

  static #createElements(){
    let html = "";

    Skills.#all.forEach((skill)=>{
      html += `
<span class="observerTarget">${skill.name} &#8226;</span>
<span class="observerTarget">${skill.percentage}</span>
<div class="observerTarget">
  <div percentage="${skill.percentage}"></div>
</div>
      `;
    });

    document.querySelector("body > section#skills > more > main").innerHTML = html;

  }

  static #wordCloud(){
    let html = "";
    let languages = ["C", "C++", "Python", "SQL", "NoSQL", "PHP", "JSON", "YAML", "Java", "JavaScript", "HTML", "CSS", "Rust", "Assembly", "Perl", "Ruby", "C#"];

    // Shuffle Skills
    for(let i = languages.length - 1; i > 0; i--){
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = languages[i];
      languages[i] = languages[randomIndex];
      languages[randomIndex] = temp;

    }

    languages.forEach((skill)=>{
      // Font Size
      let fontSize = Math.floor(Math.random() * (12 - 3) + 3);

      // Color
      let h = Math.floor(Math.random() * (10 - 0) + 0);
      let s = Math.floor(Math.random() * (100 - 0) + 0);
      let l = Math.floor(Math.random() * (95 - 5) + 5);

      html += `<span style="font-size:${fontSize}vw; color: hsl(${194+h}, ${23+s}%, ${l}%);">${skill}</span>`;

    });

    document.querySelector("body > section#skills > main > cloud").innerHTML = html;

  }

  static #observe(){
    const observer = new IntersectionObserver(elements =>{
      elements.forEach((element)=>{
        if(element.isIntersecting) element.target.style.width = element.target.getAttribute("percentage");
        else element.target.style.width = "0px";

      });
    }, {
      threshhold: 0
      // rootMargin: "-50px"
    });

    document.querySelectorAll("body > section#skills > more > main > div > div").forEach((element)=>{observer.observe(element);});

  }

}
