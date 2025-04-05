export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    } 

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo');

        this.ship = this.add.sprite(640, 360, 'kraft');
        this.ship.scale = 5;
        
        this.ship.anims.create({
            key: 'walk down',
            frames: this.anims.generateFrameNumbers('kraft', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.ship.anims.create({
            key:'walk up',
            frames: this.anims.generateFrameNumbers('kraft', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.ship.anims.create({
            key:'walk right',
            frames: this.anims.generateFrameNumbers('kraft', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
        this.ship.anims.create({
            key:'walk left',
            frames: this.anims.generateFrameNumbers('kraft', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });

        this.ship.play('walk down');

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
        const key = this.ship.anims.getName();
            if (this.ship.acceleration.y < 0 && Math.abs(this.ship.acceleration.y) > Math.abs(this.ship.acceleration.x)){
                if (key !== 'walk up') this.ship.play('walk up');
                this.ship.flipX = false;
            }
            else if (this.ship.acceleration.x > 0){
                if (key !== 'walk right') this.ship.play('walk right');
                this.ship.flipX = false;
            }
            else if (this.ship.acceleration.x < 0){
                if (key !== 'walk right') this.ship.play('walk right');
                this.ship.flipX = true;
            }
            else if (key !== 'walk down'){
                this.ship.play('walk down');
                this.ship.flipX = false;
            }
        this.ship.x += this.ship.acceleration.x * delta;
        this.ship.y += this.ship.acceleration.y * delta;
        this.background.tilePositionX += 0.6 * delta;
    }
}
