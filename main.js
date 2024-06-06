let canvas = document.getElementById('snake');
let ctx = canvas.getContext('2d')

let box = 32

let ground = new Image()
ground.src = 'ground.png'

let pelmeni = new Image()
pelmeni.src = 'pelmeni.png'

let snake = []
snake[0] = {
    x: 9 * box,
    y: 8 * box,
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let score = 0

let die = new Audio()
die.src = 'die.mpeg'

let move = new Audio()
move.src = 'move.mpeg'

let eat = new Audio()
eat.src = 'eat.mp3'

let d

document.addEventListener('keydown',direction)

function direction (event){
    let key = event.keyCode
    if(key == 37 && d != 'RIGHT'){
        move.play()
        d = 'LEFT'
    } else if(key == 39 && d != 'LEFT'){
        move.play()
        d = 'RIGHT'
    } else if(key == 40 && d != 'UP'){
        move.play()
        d = 'DOWN'
    } else if(key == 38 && d != 'DOWN'){
        move.play()
        d = 'UP'
    }
}

function collision (head, body){
   for(let i = 0; i < body.length; i++){
    if(head.x == body[i].x && head.y == body[i].y){
        return true
    } 
   }
   return false
}

function draw() {
   ctx.drawImage(ground,0,0)
   ctx.drawImage(pelmeni,food.x,food.y)

   for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = 'red'
    ctx.fillRect(snake[i].x,snake[i].y,box,box)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(snake[i].x,snake[i].y,box,box)
   }

   ctx.fillStyle = 'white'
   ctx.font = '45px Changa one'
   ctx.fillText(score, 2 * box, 1.5 * box) 

   let snakeX = snake[0].x 
   let snakeY = snake[0].y

   if(d == 'LEFT') snakeX -= box
   if(d == 'RIGHT') snakeX += box
   if(d == 'UP') snakeY -= box
   if(d == 'DOWN') snakeY += box

   if(snakeX == food.x && snakeY == food.y){
    eat.play() 
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }
    score++
   }
   else{
   snake.pop()
   }

   let newHead = {
    x: snakeX, 
    y: snakeY
   } 

   if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
    clearInterval(game)
    die.play()
   }

   snake.unshift(newHead)

}

let game = setInterval(draw,100)

