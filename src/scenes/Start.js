export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    } 

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo');

        this.ship = this.add.sprite(640, 360, 'ship');
        
        this.ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        this.ship.play('fly');

        this.tweens.add({
            targets: logo,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyObjects = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D"
        });

        this.ship.acceleration = {x:0, y:0};

        this.keyObjects.down.on("down",() => {
            this.ship.acceleration.y += 0.1;
        });
        
        this.keyObjects.up.on("down",() => {
            this.ship.acceleration.y -= 0.1;
        });
        
        this.keyObjects.left.on("down",() => {
            this.ship.acceleration.x -= 0.1;
        });
        
        this.keyObjects.right.on("down",() => {
            this.ship.acceleration.x += 0.1;
        });
    }

    update(time, delta) {
        this.ship.x += this.ship.acceleration.x * delta;
        this.ship.y += this.ship.acceleration.y * delta;
        this.background.tilePositionX += 0.6 * delta;
    }
    
}
