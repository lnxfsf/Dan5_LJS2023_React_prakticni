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
    let niz_animea=[];

    for(elem of data){
        let tren_anime={
            naziv: elem.title,
            skor: elem.score,
            trajanje_epizode: elem.duration,
            slika: elem.images.jpg.image_url,
            trejler: elem.trailer.url,
        };
        niz_animea.push(tren_anime);
    }

    //sortirao sam niz obicnim bubble sortom, jer bi vise posla bilo da pravim prioritetni red
    
    for(let i=0;i<niz_animea.length;i++){
        for(let j=0;j<niz_animea.length-1;j++){
            if(niz_animea[j].skor<niz_animea[j+1].skor){
                let temp=niz_animea[j];
                niz_animea[j]=niz_animea[j+1];
                niz_animea[j+1]=temp;
            }
        }
    }

    let lista=document.getElementById("list");
    for(let i=0;i<5;i++){
        let elem_liste="<li>"+niz_animea[i].naziv + " | " + niz_animea[i].skor + " | " + niz_animea[i].trajanje_epizode + " | "+ niz_animea[i].slika + " | "+ niz_animea[i].trailer+"</li>";
        lista.innerHTML += elem_liste; 
    }
}

    ///---testiranje funkcija---///

//console.log(br_izaslih_2004());
//duze_od_sat_vremena();
//film_tip();
//console.log(najkrace_prikazivan());
top_5();
})

