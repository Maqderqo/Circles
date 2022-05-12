let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

window.addEventListener('resize', () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.clearRect(0, 0, innerWidth, innerHeight);

    init();
})

let colorArray = [
    "blue",
    "red",
    "grey",
    "green",
    "yellow"
]

let mouse = {
    x: undefined,
    y: undefined
}

document.addEventListener('mouseleave', function () {

    mouse.x = undefined,
        mouse.y = undefined
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    this.uptade = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx
        this.y += this.dy

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 100) {
                this.radius += 16
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw();


    }
};
let circleArray = [];

function init() {

circleArray = []

    for (let i = 0; i < 500; i++) {

        let radius = Math.random() * 9 + 1;
        let x = Math.floor(Math.random() * (innerWidth - radius * 25) + radius);
        let y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;

        circleArray.push(new Circle(x, y, dx, dy, radius));



    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].uptade();


    }

}

init();

animate();