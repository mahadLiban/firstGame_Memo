const divResultat = document.querySelector("#resultat")

let tabJeu = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

/* let tabResultat =[
    [1,5,6,7],
    [1,2,5,2],
    [3,8,6,7],
    [4,4,8,3]
];
 */
let tabResultat = genereTableauAleatoire();

let oldSelection = [];
let nbAffiche = 0;
let ready = true;

afficherTableau();

function afficherTableau(){
    let txt="Wesh bien?";

    for(let i=0; i<tabJeu.length ; i++){
        txt +="<div>";
        for(let j=0; j<tabJeu[i].length; j++){
            if(tabJeu[i][j] === 0){
               txt+="<button class='btn btn-primary m-2' style='width:100px;height:100px' onClick='verif(\""+i+"-"+j+"\")'>??</button>"; 
            }else{
                txt += "<img src='"+getImage(tabJeu[i][j])+"'style='width:100px;height:100px ; class= 'm-2' >";
            }
            
        }
        txt+="</div>";
    }



    divResultat.innerHTML = txt;
}

function getImage(valeur){
    let imgtxt = "img/" ;
    switch(valeur){
        case 1 : imgtxt += "elephant.png"
        break;
        case 2 : imgtxt +="giraffe.png"
        break;
        case 3 : imgtxt +="hippo.png"
        break;
        case 4 : imgtxt +="monkey.png"
        break;
        case 5 : imgtxt +="panda.png"
        break;
        case 6 : imgtxt +="parrot.png"
        break;
        case 7 : imgtxt +="penguin.png"
        break;
        case 8 : imgtxt +="pig.png"
        break;
        default : console.log("cas non pris en compte");

    }
    return imgtxt;
}

function verif(bouton){
    if (ready){
        nbAffiche++;
    
        let ligne = bouton.substr(0,1)
        let colonne = bouton.substr(2,1)
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne]
        afficherTableau();
    
        if(nbAffiche>1) {
            ready = false;
            setTimeout(() => {
                /* Verification */
            if(tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){
                tabJeu[ligne][colonne] = 0;
                tabJeu[oldSelection[0]][oldSelection[1]] = 0;
            }
            afficherTableau();
            ready = true;
            nbAffiche = 0;
            oldSelection = [ligne,colonne];

            },250)


            
    
        } else{
            oldSelection = [ligne,colonne];
        }
    
        
    }
}


function genereTableauAleatoire(){
    let tab = [];


    let nbImagePosition = [0,0,0,0,0,0,0,0];
    
    for(let i = 0 ; i < 4 ; i++){
        let ligne = [];
        for(let j = 0 ; j < 4; j++ ){
            let fin = false ;
            while(!fin){
                let randomImg =Math.floor(Math.random() * 8);
                if(nbImagePosition[randomImg] < 2){
                    ligne.push(randomImg+1);
                    nbImagePosition[randomImg]++;
                    fin = true ;
    
                } 
            }
        }

        tab.push(ligne)
    }
    

    return tab ;

}