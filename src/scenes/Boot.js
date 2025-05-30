export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload() {
        //font
        this.load.font('main-font', 'assets/Fonts/zileflexip-eye-fs.ttf', 'truetype');

        //ui
        this.load.image('text-box', 'assets/ui/textbox.png');
        this.load.image('battleBox', 'assets/UI/BattleBox.png');
        this.load.image('healthbarBase', 'assets/UI/healthbarSprite.png');
        this.load.atlas('plains', 'assets/Mystic/sprites/tilesets/plains.png', 'assets/Tiles/data/plains.json');
        this.load.tilemapCSV('main-path_Path', 'assets/Tiles/data/main-path_Path.csv');
        this.load.tilemapCSV('main-path_Mountain', 'assets/Tiles/data/main-path_Mountain.csv');
        this.load.tilemapCSV('main-path_Berry', 'assets/Tiles/data/main-path_Berry.csv');

        //tiles
        this.load.image('grass', 'assets/Mystic/sprites/tilesets/grass.png');
        this.load.image('background', 'assets/UI/backgroundOutside.png');
        
        //player kraft
        this.load.spritesheet('kraft', 'assets/Sprites/kraftWalk.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('kraftBattle', 'assets/Sprites/kraftBackSprite.png');

        //enemy types
        this.load.image('reaper', 'assets/Sprites/Reaper.png');
        this.load.image('conjured', 'assets/Sprites/conjured.png');
        
        
    }

    create ()
    {
        const startTime = Date.now();
        const targetFPS = 60;
        this.scene.start('Start');
    }
}
