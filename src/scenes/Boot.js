export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload() {
        this.load.font('main-font', 'assets/Fonts/zileflexip-eye-fs.ttf', 'truetype');
        this.load.image('text-box', 'assets/ui/textbox.png');
        this.load.image('grass', 'assets/Tiles/grass.png');
        this.load.image('background', 'assets/UI/backgroundOutside.png');
        this.load.image('reaper', 'assets/Sprites/Reaper.png');
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
