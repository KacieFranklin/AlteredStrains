export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload() {
        this.load.image('grass', 'assets/Tiles/grass.png');
        this.load.image('background', 'assets/UI/backgroundOutside.png');
        this.load.image('reaper', 'assets/Sprites/Reaper.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('kraft', 'assets/Sprites/kraftWalk.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('kraftBattle', 'assets/Sprites/kraftBackSprite.png');
        this.load.image('conjured', 'assets/Sprites/conjured.png');
        this.load.image('battleBox', 'assets/UI/BattleBox.png');
        this.load.image('healthbarBase', 'assets/UI/healthbarSprite.png');
    }

    create ()
    {
        const startTime = Date.now();
        const targetFPS = 60;
        this.scene.start('Start');
    }
}
