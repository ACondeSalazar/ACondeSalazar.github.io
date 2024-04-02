let cursor_visible = false;
let is_writing = false;


function WriteTo(text, element, min_delay = 20, max_delay=80, initial_delay = 0) {
    let index = 0;
    function TypeLetter() {
        if (index < text.length) {
            element.append(text[index++]);
            let next_delay = Math.floor(Math.random() * (max_delay - min_delay + 1)) + min_delay;
            setTimeout(TypeLetter, next_delay);
        }else{
            console.log("end");
        }
    }
    setTimeout(TypeLetter, initial_delay);
}
//"■" 

function InitializePage(){

    new TypeIt("#central_text",{strings : ["Bienvenue, ce site est toujours en construction"], speed : 50, startDelay:100}).go();

    new TypeIt("#up_arrow",{strings : ['<i class="fa fa-arrow-up" aria-hidden="true"></i>'], speed : 50, startDelay:2000, cursor:false}).go();

    /* WriteTo("Bienvenue sur le site de Arthur Conde Salazar !", $("#central_text"));
    
    WriteTo('Retrouvez moi aussi sur ', $("#footer_text"), 10, 30, 2100);
    //$("#footer").html('<p>Portfolio of <a href="https://github.com/ACondeSalazar" class="text-white">Arthur Conde Salazar</a>.</p>');
    WriteTo(' Github ', $("#github_link"), 10, 30, 2700);


    setTimeout(function() {
        $("#github_link").append('<i class="fab fa-github py-1" aria-hidden="true"></i>') ;
      }, 3000);*/

      /* setTimeout(function() {
        $("#central_div").prepend('<i id="up_arrow" class="fa fa-arrow-up" aria-hidden="true"></i>') ;
      }, 3500);  */
}

function SwitchToMyProjects(){
    console.log('yeah');
    ClearCenter();
}

function SwitchToContactMe(){}

function SwitchToAboutMe(){}

function ClearCenter(){
    $("#central_container").empty();
}

window.onload = InitializePage