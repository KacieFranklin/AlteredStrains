export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/Sprites/Reaper.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('kraft', 'assets/Sprites/kraftWalk.png', { frameWidth: 32, frameHeight: 32 });
    }

    create ()
    {
        const startTime = Date.now();
        const targetFPS = 60;
        this.scene.start('Start');
    }
}
