import Sprite from "./Sprite.js";

export default class ManSprite {
    constructor(imageUrl) {
        this.moveSpeed = 1;
        this.vel = { x: 0, y: 0 };
        this.a = { x: 0, y: .5 };
        this.g = .99;
        this.fr = .9;
        this.height = 120;
        this.width = 200;
        this.loadImage('img/animation.png', (img) => {
            this.sprite = new Sprite(img, 16, 16, 1, 6, 300);
            this.initSprite(this.sprite);
        });
    }

    initSprite(sprite) {
        sprite.frameMap = {
            "stand": [0, 1],
            "jump": [0],
            "moveRight": [2, 3],
            "moveLeft": [4, 5]
        };
        sprite.pos = { x: 50, y: 50 };
        sprite.curentFrameName = "stand";
    }

    draw(context) {
        if (this.sprite) {

            if (this.sprite.pos.y + this.sprite.cellHeight >= this.height) {
                this.vel.y = - this.vel.y;
                this.sprite.pos.y = this.height - this.sprite.cellHeight;
            } else {
                this.vel.y *= this.g * this.fr;
            }
            //this.sprite.pos.x = Math.min(this.width, this.sprite.pos.x - this.sprite.cellWidth);
            //this.sprite.pos.x = Math.max(0, this.sprite.pos.x);
            if (this.sprite.pos.x > this.width - this.sprite.cellWidth) {
                this.sprite.pos.x = this.width - this.sprite.cellWidth;
                this.vel.x = 0;
            }

            if (this.sprite.pos.x < 0) {
                this.sprite.pos.x = 0;
                this.vel.x = 0;
            }

            this.vel.x += this.a.x;
            this.vel.y += this.a.y;
            this.sprite.pos.x += this.vel.x;
            this.sprite.pos.y += this.vel.y;



            if (this.vel.x == 0) {
                this.sprite.curentFrameName = "stand";
            } else if (this.vel.x < 0) {
                this.sprite.curentFrameName = "moveLeft";
            }
            else if (this.vel.x > 0) {
                this.sprite.curentFrameName = "moveRight";
            }
            else if (this.vel.y < this.height) {
                this.sprite.curentFrameName = "jump";
            }

            this.sprite.draw(context);
        }
    }

    handleKeybordUpEvent(e) {

    }
    handleKeybordDownEvent(e) {
        console.log(e.keyCode);
        if (e.keyCode == 37) {
            this.vel.x += -1;
        }
        if (e.keyCode == 39) {
            this.vel.x += 1;
        }
        if (e.keyCode == 38) {
            this.vel.y -= 10;
        }

    }

    loadImage(src, cb) {
        let img = new Image();

        img.onload = () => {
            cb(img);
        }
        img.src = src;
    }
}