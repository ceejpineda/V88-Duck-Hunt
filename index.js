const audio = new Audio('./gun3.mp3')
audio.preload = 'auto';

const mainScreen = document.querySelector(".mainScreen")
const body = document.querySelector('body');
const hpContainer = document.getElementById('hp')
let difficulty = 0;
let directionNormal = 'down';
let score = 0;
let hp = 5;
mainScreen.setAttribute('draggable', false)


const gameLoop = () =>{
}

const spawnBasicBirdsL = () =>{
    if(difficulty == 0) return;

    const bird1 = birdFactory('birdL', 'easy');
    bird1.src = './duck1.gif';
    mainScreen.appendChild(bird1);
}

const spawnBasicBirdsR = () =>{
    if(difficulty == 0) return;

    const bird1 = birdFactory('birdR', 'easy');
    bird1.src = './duck1.gif';
    mainScreen.appendChild(bird1);
}

const spawnNormalBirdsL = () =>{
    if(difficulty == 0) return;
    if(difficulty < 2) return;

    const bird1 = birdFactory('birdL', 'normal');
    bird1.src = './duck2.gif';
    mainScreen.appendChild(bird1);


}

const spawnHardBird = () =>{
    if(difficulty == 0) return;
    if(difficulty != 3) return;


    const div = document.createElement('div');
    const duck3 = new Image();
    duck3.src = './duck3.gif';
    duck3.classList.add('duck3');
    div.classList.add('birdL');
    duck3.setAttribute('draggable', false)
    div.setAttribute('draggable', false)
    div.style.top = randomPos(150,400) + 'px';
    div.style.left = '200px';
    duck3.classList.add('bird');

    div.appendChild(duck3);
    div.classList.add('duck3div');

    mainScreen.appendChild(div);
}

const birdFactory = (direction, gameMode) =>{
    const bird1 = new Image();
    bird1.classList.add('bird');
    bird1.classList.add(direction);
    bird1.classList.add(gameMode);

    if(direction == 'birdR'){
        bird1.style.top = randomPos(150,600) + 'px';
        bird1.style.left = '1600px';
    }else if(direction == 'birdL'){
        bird1.style.top = randomPos(150,600) + 'px';
        bird1.style.left = '200px';
    }

    bird1.setAttribute('draggable', false);
    bird1.style.position = 'absolute';
    bird1.style.visibility = 'hidden'

    return bird1;
}

const birdMovementsR = () =>{
    if(difficulty == 0) return;
    const birds = document.querySelectorAll('.birdR');
    birds.forEach(bird => {
        if(bird == null) return;    
        let pos = parseInt(bird.style.left);
        if(pos < 300){
            bird.remove();
            hp--;
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
        let pos = parseInt(bird.style.left); //x pos
        if(pos > 280){
            bird.style.visibility = 'visible';
        }
        if(pos > 1550){
            bird.remove();
            hp--;
        }
        if(bird.classList.contains('normal')){
            let posY = parseInt(bird.style.top); //y pos
            let minY = 150;
            let maxY = 700;

            if(directionNormal == 'down'){
                if (posY <= maxY){
                    posY+=2;
                }else{
                    directionNormal = 'up';
                }
            }else if(directionNormal == 'up'){
                if(posY >= minY){
                    posY--;
                }else{
                    directionNormal = 'down'
                }
            }

            bird.style.top = posY + 'px'; 
            pos+=2;
            bird.style.left = pos + 'px';
        }else{
            pos++;
            bird.style.left = pos + 'px';
        }
        
    });   
};


const gunshot = async ()=>{
    let click = audio.cloneNode();
    click.play();
}

const gameStart = () =>{
    const mainMenu = document.querySelector('.mainMenu');
    const header = document.querySelector('.header');
    const scoreContainer = document.getElementById('score');
    const scoreDiv = document.querySelector('.score')
    const music = document.getElementById('theme');
    scoreContainer.setAttribute('draggable', false)
    header.classList.add('animate');
    scoreDiv.classList.add('animate');
    music.volume = 0.3;
    music.play();

    scoreContainer.innerText = score;

    mainMenu.style.visibility = 'hidden';
    mainScreen.addEventListener('click',async(e)=>{
        e.preventDefault();
        if(e.target.classList.contains('bird')){
            e.target.remove();
            score += 10;
            scoreContainer.innerText = score;
        }
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
    explosion.setAttribute('draggable', false)
    explosion.style.left = e.clientX - 25 + 'px';
    explosion.style.top = e.clientY - 25 + 'px';
    explosion.src = './xpl.gif';
    mainScreen.appendChild(explosion);
}

const winOrLose = () =>{
    hpContainer.innerText = "";
    if(hp == 0){
        alert('You Lose! Please Refresh to Play again');
    }
    if(score == 150){
        alert('You Win! Please Refresh to Play again')
    }
    for(let i=0; i<hp; i++){
        hpContainer.innerText += '❤️';
    }
}


const easyButton = document.getElementById('easy');
const normalButton = document.getElementById('normal');
const hardButton = document.getElementById('hard');


easyButton.addEventListener('click', (e)=>{
    difficulty = 1;
    gameStart();
    const difficultyContainer = document.getElementById('difficulty')
    difficultyContainer.innerText = easyButton.innerHTML;
    difficultyContainer.setAttribute('draggable',false);
})
normalButton.addEventListener('click', (e)=>{
    difficulty = 2;
    gameStart();
    const difficultyContainer = document.getElementById('difficulty')
    difficultyContainer.innerText = normalButton.innerHTML;
    difficultyContainer.setAttribute('draggable',false);
})
hardButton.addEventListener('click', (e)=>{
    difficulty = 3;
    gameStart();
    const difficultyContainer = document.getElementById('difficulty')
    difficultyContainer.innerText = hardButton.innerHTML;
    difficultyContainer.setAttribute('draggable',false);
})

setInterval(spawnBasicBirdsL, 2000);
setInterval(spawnBasicBirdsR, 4000);
setInterval(spawnNormalBirdsL, 3000);
setInterval(spawnHardBird, 3000);
setInterval(birdMovementsL, 5);
setInterval(birdMovementsR, 5);
setInterval(winOrLose, 5);
