var data;

fetch("https://api.jikan.moe/v4/anime ")
.then(response => response.json())
.then((j_son)=>{
    
data=j_son.data; ///niz data, u njemu mi se nalaze svi anime-i i informacije o njima


function br_izaslih_2004(){
    let brojac=0;
    
    for(elem of data){
        let datum = new Date(elem.aired.from);

        if(datum.getFullYear()==2004){
            brojac++;
        }
    }

    return brojac;
}

function duze_od_sat_vremena(){

    for(elem of data){
        if(elem.duration.includes("hr")){
            console.log(elem.title);
        }
    }
}
  
function film_tip(){

    for(elem of data){
        if(elem.type=="Movie"){
            console.log("English Title : " + elem.title_english + " | " + "Japanese Title : " + elem.title_japanese);
        }
    }
}

function najkrace_prikazivan(){

    let min_trajanje=Infinity;
    let min_name;

    for(elem of data){
        if(elem.type=="TV"){

            if(elem.aired.to=="null"){
                continue;
            }

            let datum_pocetka=new Date(elem.aired.from);
            let datum_kraja=new Date(elem.aired.to);
            
            let trajanje=datum_kraja-datum_pocetka;
            trajanje=Math.abs(trajanje);
            
            if(trajanje<min_trajanje){
                min_trajanje=trajanje;
                min_name=elem.title;
            }

        }
    }

    return min_name;
}


function top_5(){
    let niz_animea;
    
    for(elem of data){

    }
}

    ///---testiranje funkcija---///

//console.log(br_izaslih_2004());
//duze_od_sat_vremena();
//film_tip();
//console.log(najkrace_prikazivan());

})

