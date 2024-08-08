const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')


canvas.width = window.screen.width 
canvas.height = 600

class car {
    constructor({ position, velocity, imageSrc }) {
        this.position = position
        this.velocity = velocity
        this.height = 80
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class road {
    constructor({position, velocity, imageSrc}) {
        this.position = position
        this.velocity = velocity
        this.width = 500
        this.height = canvas.height + 20
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        c.drawImage(this.image, window.screen.width / 2 - 250, this.position, this.width, this.height)
    }

    update() {
        this.draw()
        this.position += this.velocity
    }
}

class bar {
    constructor({height, width, position, color, prog}) {
        this.position = position
        this.height = height
        this.color = color
        this.width = width
        this.prog = prog
    }

    draw () {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = '#c4c2bb'
        c.fillRect(this.position.x, this.position.y, this.width, this.prog * this.height / 100)
    }
}

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const player = new car ({
    position: {
        x: window.screen.width / 2 - 25,
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: 'images/page-4/player.png'
})

const car1 = new car ({
    position: {
        x: window.screen.width / 2 + 10,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: 'images/page-4/car1.png'
})

const car2 = new car ({
    position: {
        x: window.screen.width / 2,
        y: 200
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: 'images/page-4/car2.png'
})

const car3 = new car ({
    position: {
        x: window.screen.width / 2,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: 'images/page-4/car3.png'
})

const police = new car ({
    position: {
        x: window.screen.width / 2,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: 'images/page-4/police.png'
})

const police1 = new car ({
    position: {
        x: window.screen.width / 2,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: 'images/page-4/police.png'
})

const bar1 = new bar ({
    height: 200,
    width: 20,
    position: {
        x: window.screen.width / 2 - 250,
        y: 0
    },
    color: 'red',
    prog: 100
})

const bar2 = new bar ({
    height: 200,
    width: 20,
    position: {
        x: window.screen.width / 2 - 230,
        y: 0
    },
    color: 'blue',
    prog: 100
})


let speed = 0
let acceleration = 0
const background1 = new road ({
    position: 0,
    velocity: 0,
    imageSrc: "images/page-4/background.png"
})

const background2 = new road ({
    position: -canvas.height,
    velocity: 0,
    imageSrc: "images/page-4/background.png"
})



const keys = {
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    s: {
        pressed:false
    }
}

const interval = setInterval(change, 2000)
let lastkey
var vylist = [0, 0, 0, 90000, 90000]
var frame 
animate()
function animate() {
    frame = window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    if (background1.position >= canvas.height) {
        background1.position = -canvas.height
    }
    if (background2.position >= canvas.height) {
        background2.position = -canvas.height
    }
    speed += acceleration
    if (speed < 10) {
        acceleration = 0.05
    } else {
        acceleration = 0
    }
    if (keys.s.pressed) {
        acceleration = -0.15
    }
    if (speed < 0) {
        speed = 0
    }
    
    background1.velocity = speed
    background2.velocity = speed
    background1.update()
    background2.update()
    player.velocity.x = 0
    if (keys.d.pressed && lastkey === 'd') {
        player.velocity.x = 1
    } else if (keys.a.pressed && lastkey === 'a') {
        player.velocity.x = -1
    }
    player.update()
    car1.update() 
    car2.update() 
    car3.update() 
    police.update()
    police1.update()
    if (car1.position.x <= window.screen.width / 2 - 150 || car1.position.x >= window.screen.width / 2 + 100) {
        car1.position.x += -Math.sign(car1.velocity.x) * 2
    } else {
        car1.velocity.x = vylist[0]
    }
    if (car2.position.x <= window.screen.width / 2 - 150 || car2.position.x >= window.screen.width / 2 + 100) {
        car2.position.x += -Math.sign(car2.velocity.x) * 2
    } else {
        car2.velocity.x = vylist[1]
    }
    
    if (car3.position.x <= window.screen.width / 2 - 150 || car3.position.x >= window.screen.width / 2 + 100) {
        car3.position.x += -Math.sign(car3.velocity.x) * 2
    } else {
        car3.velocity.x = vylist[2]
    }
    if (police.position.x <= window.screen.width / 2 - 150 || police.position.x >= window.screen.width / 2 + 100) {
        police.position.x += -Math.sign(police.velocity.x) * 2
    } else {
        police.velocity.x = vylist[1]
    }
    if (police1.position.x <= window.screen.width / 2 - 150 || police1.position.x >= window.screen.width / 2 + 100) {
        police1.position.x += -Math.sign(police1.velocity.x) * 2
    } else {
        police1.velocity.x = vylist[2]
    }
    if (player.position.x <= window.screen.width / 2 - 170) {
        player.position.x += 2
        acceleration = -0.15
    }
    if (player.position.x >= window.screen.width / 2 + 120) {
        player.position.x -= 2
        acceleration = -0.15
    }
    car1.velocity.y = speed - 9 
    car2.velocity.y = speed - 9 
    car3.velocity.y = speed - 9 
    police.velocity.y = speed - 8 
    police1.velocity.y = speed - 8
    vylist[3] -= speed
    vylist[4] -= 9
    
    bar1.prog = vylist[3] * 100 / 90000
    bar1.draw()
    
    bar2.prog = vylist[4] * 100 / 90000
    bar2.draw()


    if (vylist[3] <= 0 || vylist[4] <= 0) {
        if (vylist[3] <= 0) {
            stop(0)
        } else {
            stop(1)
        }
    }
    
    if (player.position.x >= car1.position.x && player.position.x <= car1.position.x + car1.width || player.position.x + player.width >= car1.position.x && player.position.x + player.width <= car1.position.x + car1.width) {
        if (player.position.y <= car1.position.y + car1.height && player.position.y + player.height >= car1.position.y) {
            acceleration = -0.6
            if (player.position.x >= car1.position.x && player.position.x <= car1.position.x + car1.width) {
                player.position.x += 2
                car1.position.x -= 1
            } else {
                player.position.x -= 2
                car1.position.x += 1
            }
        }
    }

    if (player.position.x >= car2.position.x && player.position.x <= car2.position.x + car2.width || player.position.x + player.width >= car2.position.x && player.position.x + player.width <= car2.position.x + car2.width) {
        if (player.position.y <= car2.position.y + car2.height && player.position.y + player.height >= car2.position.y) {
            acceleration = -0.6
            if (player.position.x >= car2.position.x && player.position.x <= car2.position.x + car2.width) {
                player.position.x += 2
                car2.position.x -= 1
            } else {
                player.position.x -= 2
                car2.position.x += 1
            }
        }
    }

    if (player.position.x >= car3.position.x && player.position.x <= car3.position.x + car3.width || player.position.x + player.width >= car3.position.x && player.position.x + player.width <= car3.position.x + car3.width) {
        if (player.position.y <= car3.position.y + car3.height && player.position.y + player.height >= car3.position.y) {
            acceleration = -0.6
            if (player.position.x >= car3.position.x && player.position.x <= car3.position.x + car3.width) {
                player.position.x += 2
                car3.position.x -= 1
            } else {
                player.position.x -= 2
                car3.position.x += 1
            }
        }
    }

    if (player.position.x >= police.position.x && player.position.x <= police.position.x + police.width || player.position.x + player.width >= police.position.x && player.position.x + player.width <= police.position.x + police.width) {
        if (player.position.y <= police.position.y + police.height && player.position.y + player.height >= police.position.y) {
            acceleration = -0.6
            if (player.position.x >= police.position.x && player.position.x <= police.position.x + police.width) {
                player.position.x += 2
                police.position.x -= 1
            } else {
                player.position.x -= 2
                police.position.x += 1
            }
        }
    }

    if (player.position.x >= police1.position.x && player.position.x <= police1.position.x + police1.width || player.position.x + player.width >= police1.position.x && player.position.x + player.width <= police1.position.x + police1.width) {
        if (player.position.y <= police1.position.y + police1.height && player.position.y + player.height >= police1.position.y) {
            acceleration = -0.6
            if (player.position.x >= police1.position.x && player.position.x <= police1.position.x + police1.width) {
                player.position.x += 2
                police1.position.x -= 1
            } else {
                player.position.x -= 2
                police1.position.x += 1
            }
        }
    }

    if (car3.position.y > window.screen.height || car1.position.y + car1.width < 0) {
        if (vylist[0] > 0.5 && police.position.y > background1.height) {
            police.position.y = -200
            police1.position.y = -100
        }
    }

    
    
    
}

window.addEventListener('keydown' , (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastkey = "d"
        break
        case 'a':
            keys.a.pressed = true
            lastkey = "a"
        break
        case 's':
            keys.s.pressed = true
        break
    }
})

window.addEventListener('keyup' , (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        case 's':
            keys.s.pressed = false
        break
    }
})

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function change() {
   vylist[0] = getRandomArbitrary(-1,1)
   vylist[1] = getRandomArbitrary(-1,1)
   vylist[2] = getRandomArbitrary(-1,1) 
}

function stop(input) {
    window.cancelAnimationFrame(frame)
    if (input == 0) {
        c.font = '70px Arial'
        c.fillStyle = 'yellow'
        c.fillText('YOU WIN', window.screen.width / 2 - 140, 300)

    } else {
        c.font = '70px Arial'
        c.fillStyle = 'red'
        c.fillText('GAME OVER', window.screen.width / 2 - 200, 300)
    }
}
/*=========================phone mode ====================*/
window.addEventListener("deviceorientation", function(event) {
    let beta = event.beta
    let gamma = event.alpha

    if (gamma > 45) {
        keys.d.pressed = true
    } else if (gamma < -45) {
        keys.a.pressed = true
    } else {
        keys.d.pressed = false
        keys.a.pressed = false
    }

    if (beta < -45) {
        key.s.pressed = true
    } else {
        key.s.pressed = false
    }

)}




