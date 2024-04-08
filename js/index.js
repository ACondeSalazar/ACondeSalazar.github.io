function InitializePage(){

    new TypeIt("#central_text",{strings : ["Bienvenue sur mon site !"], speed : 50, startDelay:100}).go();

    new TypeIt("#up_arrow",{strings : ['<i class="fa fa-arrow-up" aria-hidden="true"></i>'], speed : 50, startDelay:3000, cursor:false}).go();
}


window.onload = InitializePage