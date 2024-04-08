function InitializePage(){

    new TypeIt("#my_name",{strings : ["<h1>Arthur Conde Salazar</h1>"], speed : 50, startDelay:100, cursor:false}).go();

    new TypeIt("#my_age",{strings : ["<h2>21 ans</h2>"], speed : 100, startDelay:1250, cursor:false}).go();

    new TypeIt("#my_studies",{strings : ["<h5> Étudiant en 3ème année de license informatique à l'université de Montpellier.</h5>"], speed : 10, startDelay:0, cursor:false}).go();

    /* let text = `Je suis passioné par les jeux vidéos et tout ce qui concerne l'informatique graphique,
    <br>
    j'ai pour objectif d'en faire mon métier !
    <br>
    Si vous voulez consulter mon avancement dans ce domaine vous pouvez consulter mes projets <a class="fw-bold" href="myProjects.html">ici</a>`

    new TypeIt("#my_speech",{strings : [text], speed : 10, startDelay:0, cursor:false}).go(); */

}


window.onload = InitializePage