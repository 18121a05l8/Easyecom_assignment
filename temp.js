const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];
let next=[];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.species.toLowerCase().includes(searchString) ||
            character.gender.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});
const temp='https://rickandmortyapi.com/api/character';
const loadCharacters = async (temp) => {
    try {
        const res = await fetch(temp);
        hpCharacters = await res.json();
        next=hpCharacters.info.next;
        const ans=hpCharacters.results
        hpCharacters=ans;
        displayCharacters(ans);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            console.log(character);
            return `
            <li class="character">
            <img src="${character.image}"</img>
                <h3>Name     :${character.name}</h3>
                <h3>Gender   :${character.gender}</h3>
                <h3>Species  :${character.species}</h3>
                <h3>Status   :${character.status}</h3>
                <h3>Location :${character.location.name}</h3>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};
const displayCharactersbyname = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
            <img src="${character.image}"</img>
                <h2>${character.name}</h2>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};
const displayCharactersbygender = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
            <img src="${character.image}"</img>
                <h2>${character.gender}</h2>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};
const displayCharactersbyspecies = (characters) => {
    const htmlString = characters
        .map((character) => {
            console.log(character.species);
            return `
            <li class="character">
            <img src="${character.image}"</img>
                <h2>${character.species}</h2>
            </li>`;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};
function home(){
loadCharacters(temp);
}
home();
const element = document.getElementById("drop");
element.addEventListener("change", (e) => {
  const value = e.target.value;
  const text = element.options[element.selectedIndex].text;
  if(value=='Name')
    displayCharactersbyname(hpCharacters);
  if(value=='Gender')
    displayCharactersbygender(hpCharacters);
  if(value=='Species')
    displayCharactersbyspecies(hpCharacters);
    if(value=='select')
        displayCharacters(hpCharacters);
});
function loadmore()
{
    loadCharacters(next);

}
