class Enemy {
    constructor(width, height) {
        this.init(width, height);
    }

    init(width, height) {
        this.facing = {
            x : 0,
            y : 0
        };
        
        this.headPos = {
            x : 0,
            y : 0
        };

        this.endPos = {
            x : 0,
            y : 0
        };

        this.length = 1 + Math.floor(Math.random() * 5);

        var r = Math.floor((Math.random() * 2)) * 2 - 1;

        if (Math.floor(Math.random() * 2) == 0) {
            this.facing.x = -r;
            this.fill = RED;

            this.headPos.x = r > 0 ? width : r;
            this.headPos.y = Math.floor(Math.random() * height); 

            this.endPos.x = (r > 0 ? r : width) + this.length * -r;
            this.endPos.y = this.headPos.y;
        } else {
            this.facing.y = -r;
            this.fill = BLACK;

            this.headPos.y = r > 0 ? height : r;
            this.headPos.x = Math.floor(Math.random() * width); 

            this.endPos.y = (r > 0 ? r : height) + this.length * -r;
            this.endPos.x = this.headPos.x;
        }
    }

    move() {
        this.headPos.x += this.facing.x;
        this.headPos.y += this.facing.y;
    }

    reached() {
        return this.headPos.x == this.endPos.x && this.headPos.y == this.endPos.y;
    }

    render(drawAt, context) {
        for (var i = 0; i < this.length; ++i) {
            drawAt(this.headPos.x - this.facing.x * i, 
                   this.headPos.y - this.facing.y * i, 
                   this.fill, context);
        }
    }

    intersect(point) {
        for (var i = 0; i < this.length; ++i) {
            if (point.x == this.headPos.x - this.facing.x * i &&
                point.y == this.headPos.y - this.facing.y * i) {
                return true;
            }
        }
        return false;
    }
}