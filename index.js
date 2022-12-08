const audio = new Audio('./gun3.mp3')
audio.preload = 'auto';
audio.load();

const mainScreen = document.querySelector(".mainScreen")
const body = document.querySelector('body');

let difficulty = 0;

const gameLoop = () =>{
}

const spawnBasicBirdsL = () =>{
    if(difficulty == 0) return;

    const bird1 = new Image();
    bird1.classList.add('bird');
    bird1.classList.add('birdL');
    bird1.setAttribute('draggable', false);
    bird1.style.position = 'absolute';
    bird1.src = './duck1.gif';
    bird1.style.visibility = 'hidden'
    bird1.style.top = randomPos(130,600) + 'px';

    bird1.style.left = '200px';
    mainScreen.appendChild(bird1);
}

const spawnBasicBirdsR = () =>{
    if(difficulty == 0) return;

    const bird1 = new Image();
    bird1.classList.add('bird');
    bird1.classList.add('birdR');
    bird1.setAttribute('draggable', false);
    bird1.style.position = 'absolute';
    bird1.src = './duck1.gif';
    bird1.style.visibility = 'hidden'
    bird1.style.top = randomPos(130,600) + 'px';

    bird1.style.left = '1600px';
    mainScreen.appendChild(bird1);
}

const birdMovementsR = () =>{
    if(difficulty == 0) return;
    const birds = document.querySelectorAll('.birdR');
    birds.forEach(bird => {
        if(bird == null) return;    
        let pos = parseInt(bird.style.left);
        if(pos < 300){
            bird.remove();
        }
        if(pos < 1550){
            bird.style.visibility = 'visible';
        }
        pos--;
        bird.style.left = pos + 'px';
    });   
};

const birdMovementsL = () =>{
    if(difficulty == 0) return;
    const birds = document.querySelectorAll('.birdL');
    birds.forEach(bird => {
        if(bird == null) return;    
        let pos = parseInt(bird.style.left);
        if(pos > 280){
            bird.style.visibility = 'visible';
        }
        if(pos > 1550){
            bird.remove();
        }
        pos++;
        bird.style.left = pos + 'px';
    });   
};


const gunshot = async ()=>{
    let click = audio.cloneNode();
    click.play();
}

const gameStart = () =>{
    mainScreen.addEventListener('click',async(e)=>{
        e.preventDefault();
        if(e.target.classList.contains('bird')){
            e.target.remove();
        }
        console.log(e)
        console.log(e.clientX,e.clientY);
        gunshot();
        explosionMaker(e);
        setTimeout(explosionRemover, 500);
    })
}

function explosionRemover(){
    const elements = document.querySelectorAll('.explosion');
    if(elements == null) return;
    elements.forEach(element => {
        element.remove();
    });
}

function randomPos(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const explosionMaker = async (e)=>{
    const explosion = document.createElement('img');
    explosion.classList.add('explosion');
    explosion.style.position = 'absolute';
    explosion.style.left = e.clientX - 25 + 'px';
    explosion.style.top = e.clientY - 25 + 'px';
    explosion.src = './xpl.gif';
    mainScreen.appendChild(explosion);
}

const easyButton = document.getElementById('easy');

easyButton.addEventListener('click', ()=>{
    console.log('hello')
    difficulty = 1;
    gameStart();
})

setInterval(spawnBasicBirdsL, 2000);
setInterval(spawnBasicBirdsR, 3000);
setInterval(birdMovementsL, 5);
setInterval(birdMovementsR, 5);