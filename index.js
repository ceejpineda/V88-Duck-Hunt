const audio = new Audio('./gun3.mp3')
audio.preload = 'auto';
audio.load();

const mainScreen = document.querySelector(".mainScreen")

const gameLoop = () =>{
    spawnBirds();
    birdMovements();
    checkScore();
}

const spawnBirds = () =>{

}

const birdMovements = () =>


const gunshot = async ()=>{
    let click = audio.cloneNode();
    click.play();
}

mainScreen.addEventListener('click',async(e)=>{
    e.preventDefault();
    console.log(e)
    console.log(e.clientX);
    gunshot();
    explosionMaker(e);
})

function explosionRemover(){
    const elements = document.querySelectorAll('.explosion');
    if(elements == null) return;
    elements.forEach(element => {
        element.remove();
    });
}

const explosionMaker = async (e)=>{
    const explosion = document.createElement('img');
    explosion.classList.add('explosion');
    explosion.style.position = 'absolute';
    explosion.style.left = e.clientX - 25 + 'px';
    explosion.style.top = e.clientY - 25 + 'px';
    explosion.src = './xpl.gif';
    mainScreen.appendChild(explosion);
    setTimeout(explosionRemover, 1000);
}
