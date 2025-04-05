export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');
        const logo = this.add.image(640, 200, 'logo');

        this.debugText = this.add.text(10, 10, "debug:");

        this.kraft = this.add.sprite(640, 360, 'kraft');
        this.kraft.scale = 4;
        logo.scale = 4;

        this.buffer = [];
        
        this.kraft.anims.create({
            key: 'walk down',
            frames: this.anims.generateFrameNumbers('kraft', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.kraft.anims.create({
            key:'walk up',
            frames: this.anims.generateFrameNumbers('kraft', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.kraft.anims.create({
            key:'walk right',
            frames: this.anims.generateFrameNumbers('kraft', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
        this.kraft.anims.create({
            key:'walk left',
            frames: this.anims.generateFrameNumbers('kraft', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });

        this.kraft.play('walk down');

        this.tweens.add({
            targets: logo,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        const keyObjects = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D"
        });

        this.Dir = Object.freeze({
            DOWN:0,
            UP:1,
            RIGHT:2,
            LEFT:3
        });

        this.kraft.velocity = {x:0, y:0};
        this.kraft.facing = this.Dir.DOWN;
        this.currentDir = this.Dir.DOWN;

        keyObjects.down.on("down", () => {this.buffer.push(this.Dir.DOWN)}); // if down is pressed
        keyObjects.down.on("up", () => {this.debuffer(this.Dir.DOWN)}); // if down is released
        keyObjects.up.on("down", () =>{this.buffer.push(this.Dir.UP)}); // if up is pressed
        keyObjects.up.on("up", () =>{this.debuffer(this.Dir.UP)}); // if up is released
        keyObjects.right.on("down", () =>{this.buffer.push(this.Dir.RIGHT)}); // if right is pressed
        keyObjects.right.on("up", () =>{this.debuffer(this.Dir.RIGHT)}); // if right is released
        keyObjects.left.on("down", () =>{this.buffer.push(this.Dir.LEFT)}); // if left is pressed
        keyObjects.left.on("up", () =>{this.debuffer(this.Dir.LEFT)}); // if left is released
    }

    update(time, delta) {
        this.handleAccelDecel();
        this.turnToFaceDirection();

        this.kraft.x += this.kraft.velocity.x * delta;
        this.kraft.y += this.kraft.velocity.y * delta;
        this.background.tilePositionX += 0.6 * delta;
    }

    debuffer(value) {
        const lastIndex = this.buffer.indexOf(value);
        if (lastIndex === -1){
            return;
        }
        this.buffer.splice(lastIndex, 1);
        //this.debugText.text = "[DEBUG] index:" + lastIndex + ", value:" + value + ", bufferState:" + this.buffer;
    }

    turnToFaceDirection() {
        const current = this.kraft.facing;
        if (current === this.currentDir) {
            return;
        }
        switch (current){
            case(this.Dir.DOWN):
                this.kraft.play('move down');
                break;
            case(this.Dir.UP):
            case(this.Dir.RIGHT):
            case(this.Dir.LEFT):
            default:
        }
    }

    handleAccelDecel() {
        const velocity = Object.assign({}, this.kraft.velocity);
        velocity.x *= .95;
        velocity.y *= .95;
        const acc = {x:0, y:0};

        if (this.buffer.includes(this.Dir.DOWN)){
            acc.y += 0.01;
        }
        if (this.buffer.includes(this.Dir.UP)){
            acc.y -= 0.01;
        }
        if (this.buffer.includes(this.Dir.RIGHT)){
            acc.x += 0.01;
        }
        if (this.buffer.includes(this.Dir.LEFT)){
            acc.x -= 0.01;
        }
        if (Math.abs(velocity.x) < 0.001) velocity.x = 0;
        if (Math.abs(velocity.y) < 0.001) velocity.y = 0;

        const absVelocity = Math.hypot(acc.x, acc.y);
        if (absVelocity > 0) {
            acc.x *= 0.01/absVelocity;
            acc.y *= 0.01/absVelocity;
        }

        velocity.x += acc.x;
        velocity.y += acc.y;
        this.kraft.facing = this.buffer[this.buffer.length - 1];
        this.kraft.velocity.y = velocity.y.toFixed(4);
        this.kraft.velocity.x = velocity.x.toFixed(4);

        this.debugText.text = "[DEBUG] A = [" + this.kraft.velocity.x + " " + this.kraft.velocity.y + "] "; 
    }
}
