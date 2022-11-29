import {directorFilter,titleFilter, producerFilter,idFilter,nameOrder} from './data.js';
import data from './data/ghibli/ghibli.js';


// eslint-disable-next-line no-console

const filmsData= data.films;
// eslint-disable-next-line no-console

//DOM
// DARLE FUNCIONALIDAD AL LOGO
const aboutStudio=document.getElementById("firstbutton");
aboutStudio.addEventListener("click",aboutStudioPage);

function aboutStudioPage(){
  offPage("homepage");
  onPage("studiopage");
}

const imagen1=document.getElementById("imagen1");
imagen1.addEventListener("click",aboutHomePage);

function aboutHomePage(){
  location.reload();
}

function onPage(id){
  document.getElementById(id).style.display="block";
}
function offPage(id){
  document.getElementById(id).style.display="none";
}

//INGRESAR A LA PAGINA DE LOS FILMS
const films=document.getElementById("secondbutton");
films.addEventListener("click",filmspage);

function filmspage(){
  offPage("homepage");
  onPage("filmspage");
  deleteImageTag();
  createImageTag(filmsData);
  selectImage();
}

//FUNCION PARA GENERAR TODAS LAS IMAGENES
function createImageTag(dataAdd){
  for(let i=0;i<dataAdd.length;i++){
    const frameImg = document.createElement('img');
    const elementoPadre = document.getElementById("filmPosterImages");
    frameImg.setAttribute("src", dataAdd[i].poster);
    frameImg.setAttribute("class","filmImages");
    frameImg.setAttribute("id",dataAdd[i].id);
    elementoPadre.appendChild(frameImg);
  }
}




//CAPTURAMOS LOS NOMBRES DE LOS PRODUCTORES Y DIRECTORES SIN REPETERIR)

let nameDirector=dataWithoutRepeating("director");//LOS 6 NOMBRES DE LOS DIRECTORES
let nameProducer=dataWithoutRepeating("producer");//LOS 5 NOMBRES DE LOS PRODUCTORES

//console.log(nameProducer);
//console.log(nameDirector);

function dataWithoutRepeating(parameter){
  let arrayParameter= [];

  if(parameter=="director"){
    for(let i = 0; i<filmsData.length;i++){
      arrayParameter.push(filmsData[i].director);
    }
  }
  else if(parameter =="producer"){
    for(let i = 0; i<filmsData.length;i++){
      arrayParameter.push(filmsData[i].producer);
    }
  }
  
  let arrayParameterFilter = arrayParameter.filter((element,i)=>{
      return   arrayParameter.indexOf(element)==i;
  });
  
      return arrayParameterFilter;
  }



let listDirect = document.querySelectorAll(".listDirect");


 listDirect.forEach(item=>{
    item.addEventListener("click",()=>{
          const directFilter = directorFilter(filmsData,nameDirector[item.value]);
          deleteImageTag(); 
          createImageTag(directFilter);
          selectImage();
    });
  })
  

  function deleteImageTag(){
           
    const filmImages = document.getElementsByClassName("filmImages");
     
     let lengthFilmImages = filmImages.length;
     for(let i=0;i<lengthFilmImages;i++){
        filmImages[0].remove();
     }
          
  }  

let listProducer = document.querySelectorAll(".listProduc");
 listProducer.forEach(item =>{
  item.addEventListener("click",() =>{
          const produceFilter = producerFilter(filmsData, nameProducer[item.value]);
         deleteImageTag();                              
         createImageTag(produceFilter);
         selectImage();
  })
 })

 const viweAllImage= document.getElementById("btn-viewall");
 viweAllImage.addEventListener("click",()=>{
    deleteImageTag();
    createImageTag(filmsData);
    selectImage();
 })
 
const buscador = document.getElementById("buscador");
buscador.addEventListener("input",()=>{
  let valueSearchLowerCase=buscador.value.toLowerCase();
  const arraySearchName=titleFilter(filmsData,valueSearchLowerCase);
  deleteImageTag();
  createImageTag(arraySearchName);
  selectImage();
})

//SELECCIONAR IMAGEN Y MOSTRAR LA DESCRIPCIOND DE LA PELICULA, PERSONAJES Y LUGARES
function selectImage(){
  const listFilmImages = document.querySelectorAll(".filmImages");

  listFilmImages.forEach((item,index)=>{
    item.addEventListener("click",()=>{
       offPage("filmspage");
       onPage("infoFilmsPage");
       let filterMovie=idFilter(filmsData,listFilmImages[index].id);
       
       document.getElementById("infoTitle").innerHTML=filterMovie[0].title;
       document.getElementById("imgFilm").setAttribute("src",filterMovie[0].poster);
       document.getElementById("infoDescription").innerHTML=filterMovie[0].description;
       document.getElementById("infoDirector").innerHTML=filterMovie[0].director;
       document.getElementById("infoProducer").innerHTML=filterMovie[0].producer;
       document.getElementById("infoReleaseDate").innerHTML=filterMovie[0].release_date;
       document.getElementById("infoRtScorte").innerHTML=filterMovie[0].rt_score;
       createImageCharacter(filterMovie[0].people);
       createImageLocation(filterMovie[0].locations);
       selectCharacter(filterMovie[0].people);
       selectLocation(filterMovie[0].locations);
    });
  })
}

//SELECCIONAR PERSONAJE Y MOSTRAR SU DESCRIPCION

function selectCharacter(data){
  const listCharacterImages = document.querySelectorAll(".characterImages");
  
  listCharacterImages.forEach((item,index)=>{
    item.addEventListener("click",()=>{
      
      onPage("infoCharacterPage");
      
      const filterCharacter=idFilter(data,listCharacterImages[index].id);
      
      document.getElementById("infoNameCharacter").innerHTML=filterCharacter[0].name;
      document.getElementById("imgCharacter").setAttribute("src",filterCharacter[0].img);
      document.getElementById("infoGenderCharacter").innerHTML=filterCharacter[0].gender;
      document.getElementById("infoAgeCharacter").innerHTML=filterCharacter[0].age;
      document.getElementById("infoEyeColorCharacter").innerHTML=filterCharacter[0].eye_color;
      document.getElementById("infoHairColorCharacter").innerHTML=filterCharacter[0].hair_color;
      document.getElementById("infoSpecieCharacter").innerHTML=filterCharacter[0].specie;
      document.getElementById("infoFilmsPage").style.opacity="0.2";
    });
  })
}

//SELECCIONAR LUGAR Y MOSTRAR SU DESCRIPCION

function selectLocation(data){
  const listLocationImages = document.querySelectorAll(".locationImages");
  
  listLocationImages.forEach((item,index)=>{
    item.addEventListener("click",()=>{
      
      onPage("infoLocationPage");
      const filterLocation=idFilter(data,listLocationImages[index].id);
      
      document.getElementById("infoNameLocation").innerHTML=filterLocation[0].name;
      document.getElementById("imgLocation").setAttribute("src",filterLocation[0].img);
      document.getElementById("infoClimateLocation").innerHTML=filterLocation[0].climate;
      document.getElementById("infoTerrainLocation").innerHTML=filterLocation[0].terrain;
      document.getElementById("infoSurfaceWaterLocation").innerHTML=filterLocation[0].surface_water;
      document.getElementById("infoFilmsPage").style.opacity="0.2";
    });
  })
}


//CERRAR EL POP UP(INFORMACION DEL PERSONAJE)
const closeinfoCharacter=document.getElementById("btn-close-infocharacter");
closeinfoCharacter.addEventListener("click",()=>{
  offPage("infoCharacterPage");
  document.getElementById("infoFilmsPage").style.opacity="1";
  
});

//CERRAR EL POP UP(INFORMACION DEL LUGAR)
const closeinfoLocation=document.getElementById("btn-close-infolocation");
closeinfoLocation.addEventListener("click",()=>{
  offPage("infoLocationPage");
  document.getElementById("infoFilmsPage").style.opacity="1";
  
});


//CERRAR LA PAGINA DEL DETALLE DE CADA PELICULA
const closeInfoFilmsPage=document.getElementById("btn-close-infofilmspage");
closeInfoFilmsPage.addEventListener("click",()=>{

  offPage("infoFilmsPage");
  onPage("filmspage");
  deleteImageCharacter();
  deleteImageLocation();
 
});



//MUESTRE LAS IMAGENES DE LOS PERSONAJES
function createImageCharacter(character){
  for(let i=0;i<character.length;i++){
    const frameImg = document.createElement('img');
    const elementoPadre = document.getElementById("listCharacterImages");
    frameImg.setAttribute("src", character[i].img);
    frameImg.setAttribute("class","characterImages");
    frameImg.setAttribute("id",character[i].id);
    elementoPadre.appendChild(frameImg);
  }
}

//ELIMINE LAS IMAGENES DE LOS PERSONAJES
function deleteImageCharacter(){
  const characterImages = document.getElementsByClassName("characterImages");
     
     let lengthCharacterImages = characterImages.length;
     for(let i=0;i<lengthCharacterImages;i++){
      characterImages[0].remove();
     }
          
}

//MUESTRE LAS IMAGENES DE LOS LUGARES
function createImageLocation(location){
  for(let i=0;i<location.length;i++){
    const frameImg = document.createElement('img');
    const elementoPadre = document.getElementById("listLocationImages");
    frameImg.setAttribute("src", location[i].img);
    frameImg.setAttribute("class","locationImages");
    frameImg.setAttribute("id",location[i].id);
    elementoPadre.appendChild(frameImg);
  }
}

//ELIMINE LAS IMAGENES DE LOS LUGARES
function deleteImageLocation(){
  const locationImages = document.getElementsByClassName("locationImages");
     
     let lengthLocationImages = locationImages.length;
     for(let i=0;i<lengthLocationImages;i++){
      locationImages[0].remove();
     }
          
}

//ORDENAR TITULOS DE PELICULAS ALFABETICAMENTE 


const ordertitle = document.querySelector("#ordertitle");
ordertitle.addEventListener("change",(event)=>{
  deleteImageTag();
  const ordervalue=event.target.value;
  if (ordervalue=="orderAZ"){
    createImageTag(nameOrder(filmsData));
  }
  else if (ordervalue=="orderZA"){
    createImageTag(nameOrder(filmsData).reverse());
  }
  else if (ordervalue=="orderCero"){
    createImageTag(filmsData);
  }
});










  

   
    

  







