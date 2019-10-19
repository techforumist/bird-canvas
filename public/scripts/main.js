import Sprite from "./core/Sprite.js";
import ManSprite from "./core/BoySprite.js";

class Canvas {
    constructor() {
        this.width = 600;
        this.height = 500;

        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');
        this.context.scale(3, 3);
        this.context.imageSmoothingEnabled = false;

        this.sprite = new ManSprite('img/animation.png');

        document.addEventListener('keydown', (event) => {
            this.sprite.handleKeybordDownEvent(event);
        });
        document.addEventListener('keyup', (event) => {
            this.sprite.handleKeybordUpEvent(event);
        });
    }

    loadImage(src, cb) {
        let img = new Image();

        img.onload = () => {
            cb(img);
        }
        img.src = src;
    }
    sampleAjax() {
        fetch('img/animation.png')
            .then(res => {
                console.log(res);
            }).catch(error => {

            });
    }

    update = (deltaTime) => {
        requestAnimationFrame(this.update);
        this.draw();
    }

    start() {
        this.update(0);
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle="#d0e3ff"
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fill();

        this.context.fillStyle="#e0d5d5"
        this.context.beginPath();
        this.context.moveTo(0, 120);
        this.context.lineTo(200, 120);
        this.context.lineTo(200, 168);
        this.context.lineTo(0, 168);
        this.context.fill();

        if (this.sprite) {
            this.sprite.draw(this.context);
        }
    }

    drawRectagle() {
        this.context.strokeSytle = 'red';
        this.context.rect(100, 100, 100, 100);
        this.context.stroke();
    }

}

window.addEventListener('load', function () {
    const canvas = new Canvas();
    canvas.start();
})