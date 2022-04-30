function onJson1(json){
    console.log('JSON ricevuto');
    console.log(json);
    let film;
    for(let element of elements){
        if(PLAYLISTS_ID[element.dataset.filmId]===json.id){
            film=element;
        }
    }
    const result=json;
    const title=result.name;

    const url=result.external_urls.spotify;
    const playlist = document.createElement('div');
    playlist.classList.add('api-view');
    
    const caption =document.createElement('span');
    caption.textContent= 'Se vuoi ascoltare la colonna sonora:' ;
    const a=document.createElement('a');
    a.href=url;
    a.textContent='Playlist colonna sonora';

  
    playlist.appendChild(caption);
    playlist.appendChild(a);
    
    film.appendChild(playlist);
}


function onJson(json){
    console.log('JSON ricevuto');
    console.log(json);
    let film;
    
    for(let element of elements){
        if(element.dataset.filmId===json.expression){
            film=element;
        }
    }
    const result= json.results[0];
    const image= result.image;
    const img= film.querySelector('.listimg');
    img.src= image;
    

}



function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

function search(){
    
    for(let element of elements){
        
        const film_input=element.dataset.filmId;
        const film_value=encodeURIComponent(film_input);
        console.log('Eseguo ricerca: ' + film_value);
        rest_url='https://imdb-api.com/en/API/SearchAll/'+api_key+'/'+film_value;
        fetch(rest_url,requestOptions).then(onResponse).then(onJson);
        
    }
    
    
    
}




function onTokenJson(json)
{
  console.log(json)

  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

function getValues(){
    for(let element of elements){
        const element_input = element.dataset.filmId;
        const element_value = encodeURIComponent(PLAYLISTS_ID[element_input]);
        console.log('Eseguo ricerca: ' + element_value);
        fetch("https://api.spotify.com/v1/playlists/" + element_value,
          {
            headers:
            {
              'Authorization': 'Bearer ' + token
            }
          }
        ).then(onResponse).then(onJson1);
    }
}


const client_id = 'efa64bc663e74846ad061e4681846f2b';
const client_secret = 'ed7c1870d9564986a039720b7aeb5145';

let token;


function getAccesstoken(){
    fetch("https://accounts.spotify.com/api/token",
    {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
 }
).then(onTokenResponse).then(onTokenJson).then(getValues);
}

const elements =document.querySelectorAll('.listelement');

const api_key='k_5w9vyeoh';
search();
getAccesstoken();