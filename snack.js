var SPEED = {
    up: { x: 0, y: -5 },
    down: { x: 0, y: 5 },
    left: { x: -5, y: 0 },
    right: { x: 5, y: 0 },
}




class Ball {
    constructor(initSpeed, lx, ly, el) {
        this.speed = initSpeed;
        this.lx = lx
        this.ly = ly
        this.point = []
        this.el = el || null
        this.init()
    }
    init() {
        this.el.style.left = this.lx + "px";
        this.el.style.top = this.ly + "px";
    }
    bindDiv(odiv) {
        this.el = odiv
    }
    move() {
        if (this.point.length > 0) {
            if (this.lx == this.point[0].lx && this.ly == this.point[0].ly) {
                this.speed = this.point[0].speed
                this.point.shift()
            }
        }
        this.lx = this.lx + this.speed.x
        this.ly = this.ly + this.speed.y
        this.el.style.left = this.lx + "px"
        this.el.style.top = this.ly + "px"
    }
}


class Snake {
    constructor(liveSpace,foods) {
        this.speed = SPEED.right
        this.initLength = 6;
        this.arrayBall = [];
        this.lx = 100
        this.ly = 0
        this.foods = foods
        this.liveSpace = liveSpace
        this.init()
    }
    init() {
        for (let i = 0; i < this.initLength; i++) {
            let div = document.createElement("div")
            this.liveSpace.appendChild(div)
            div.className = "ball"
            div.innerText = i
            let ball = new Ball(this.speed, this.lx - i * 20, this.ly, div)
            this.arrayBall.push(ball)
            
        }
        document.body.addEventListener("keypress", e => {
            if (e.key == "w") {
                if (this.speed.x + SPEED.up.x != 0 && this.speed.y + SPEED.up.y != 0) {
                    this.speed = SPEED.up;
                    this.turn(SPEED.up)
                }
            }
            if (e.key == "s") {
                if (this.speed.x + SPEED.down.x != 0 && this.speed.y + SPEED.down.y != 0) {
                    this.speed = SPEED.down;
                    this.turn(SPEED.down)
                }
            }
            if (e.key == "a") {
                if (this.speed.x + SPEED.left.x != 0 && this.speed.y + SPEED.left.y != 0) {
                    this.speed = SPEED.left;
                    this.turn(SPEED.left)
                }
            }
            if (e.key == "d") {
                if (this.speed.x + SPEED.right.x != 0 && this.speed.y + SPEED.right.y != 0) {
                    this.speed = SPEED.right;
                    this.turn(SPEED.right)
                }
            }
        })
    }
    move(callback) {
        var timer = setInterval(() => {
            this.lx = this.lx + this.speed.x
            this.ly = this.ly + this.speed.y
            for (let i = 0; i < this.arrayBall.length; i++) {
                this.arrayBall[i].move()
            }
            this.checkEat(function (i) {
                callback(i)
            })
            if (this.borderJudge(this.lx, this.ly)) {

            } else {
                clearInterval(timer)
            }
        }, 50)
    }
    turn(direction) {
        for (let i = 0; i < this.arrayBall.length; i++) {
            this.arrayBall[i].point.push({ lx: this.lx, ly: this.ly, speed: direction })
        }
    }
    checkEat(callback) {
        let centerSnack = { x0: this.arrayBall[0].el.offsetLeft + this.arrayBall[0].el.clientWidth / 2, y0: this.arrayBall[0].el.offsetTop + this.arrayBall[0].el.clientHeight / 2 }
        let count = this.foods.beEat(centerSnack.x0, centerSnack.y0, function (i) {
            callback(i)
        })
        this.grow(count)
    }
    grow(num) {
        for (let i = 0; i < num; i++) {
            let lastBall = this.arrayBall[this.arrayBall.length - 1]
            console.log(lastBall.el.innerText)
            let div = document.createElement("div")
            div.className = "ball"
            div.innerText = +lastBall.el.innerText + 1
            let growBallXY = { lx: parseInt(lastBall.lx), ly: parseInt(lastBall.ly) }
            console.log(lastBall.speed)
            //根据最后的球体运动反方向来得出新球体的生成位置
            if (lastBall.speed.x < 0) {
                growBallXY.lx = parseInt(lastBall.lx) + 20
            } else if (lastBall.speed.x > 0) {
                growBallXY.lx = parseInt(lastBall.lx) - 20
            } else {
                if (lastBall.speed.y < 0) {
                    growBallXY.ly = parseInt(lastBall.ly) + 20
                } else {
                    growBallXY.ly = parseInt(lastBall.ly) - 20
                }
            }

            let ball = new Ball(lastBall.speed, growBallXY.lx, growBallXY.ly, div)
            //克隆拐点
            ball.point = deepClone(lastBall.point)
            this.arrayBall.push(ball)
            this.liveSpace.appendChild(div)
        }
    }
    borderJudge(x, y) {
        if (x >= 0 && x <= 800 - 20 && y >= 0 && y <= 600 - 20) {
            return true
        } else {
            return false
        }
    }
}


