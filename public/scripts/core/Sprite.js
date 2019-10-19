export default class Sprite {
    constructor(image, cellWidth, cellHeight, row, column, delay) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.row = row;
        this.column = column;
        this.image = image;
        this.delay = delay;
        this.frameMap = {
            "stand": [0, 1]
        };
        this.curentFrame = [];
        this.lastTime = 0;
        this.frameIterator = 0;
        this.pos = {
            x: 0,
            y: 0
        };

        this.curentFrameName = "stand";

    }
    update() {
        this.curentFrame = this.frameMap[this.curentFrameName];
    }
    draw(context) {
        this.update();

        let currentTime = new Date().getTime();
        if (this.image && (currentTime - this.lastTime) >= this.delay) {
            this.frameIterator = (this.frameIterator + 1) % this.curentFrame.length;
            this.lastTime = currentTime;
        }
        if (this.image && !isNaN(this.frameIterator) && this.frameIterator != undefined) {
            context.drawImage(this.image, this.cellWidth * this.curentFrame[this.frameIterator], 0,
                this.cellWidth, this.cellHeight, this.pos.x, this.pos.y, this.cellWidth, this.cellHeight);
        }

    }
}