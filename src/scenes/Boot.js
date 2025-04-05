export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create ()
    {
        const startTime = Date.now();
        const targetFPS = 60;
        this.scene.start('Start');
    }
}
