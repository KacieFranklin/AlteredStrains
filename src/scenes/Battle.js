export class Battle extends Phaser.Scene {

    constructor() {
        super('Battle');
    }

    create() {
        this.cameras.main.zoom = 4;
        this.cameras.main.setBounds(0, 0, 320, 180, true);

        this.party = [];
        this.enemies = [];

        this.addToBattle('reaper');
        this.addToBattle('conjured');
        this.addToBattle('reaper');

        this.addToParty('kraftBattle');
        this.addToParty('kraftBattle');
        this.addToParty('kraftBattle');

        this.removeFromBattle(2);
        this.removeFromParty(2);
        this.textbox = this.add.image(160, 150, 'text-box');
    }
    
    update() {
    }

    addToParty(key) {
        const p = this.add.sprite(60, 100, key);
        p.x = 60 + (this.party.length * 40);
        this.party.push(p);
    }

    removeFromParty(index) {
        this.party[index].destroy();
        this.party.splice(index, 1);
    }

    /** adds to battle 
     * @param key{string} 
     */
    addToBattle(key) {
        const e = this.add.sprite(180, 80, key);
        e.x = 180 + (this.enemies.length * 50);
        this.enemies.push(e);
    }

    /** removes from battle
     * @param index{Number}
     */
    removeFromBattle(index) {
        this.enemies[index].destroy();
        this.enemies.splice(index, 1);
    }
}