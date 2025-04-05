export class Battle extends Phaser.Scene {

    constructor() {
        super('Battle');
    }

    create() {
        const reaper = this.add.sprite(240, 70, 'reaper');
        const conjured = this.add.sprite(160, 80, 'conjured');
        this.kraft = this.add.sprite(100, 140, 'kraftBattle');
        this.kraft.scale = 2;
        this.cameras.main.zoom = 4;
        this.cameras.main.setBounds(0, 0, 320, 180, true);

        this.enemies = [];
        this.enemies.push(conjured, reaper);
    }
    
    update() {
        this.enemies[0].x += 1;
    }
}