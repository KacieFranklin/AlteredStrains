export class Battle extends Phaser.Scene {

    constructor() {
        super('Battle');
    }

    create() {
        this.Enemy = Object.freeze({
            SUBJECT:0,
            REAPER:1,
            CONJOINED:2,
            SWEET_TOOTH:3,
            ZERO:4
        })
        this.cameras.main.zoom = 4;
        this.cameras.main.setBounds(0, 0, 320, 180, true);

        this.party = [];
        this.enemies = [];

        const startScene = this.scene.get('Start');
        this.partyList = startScene.getPartyList();
        this.enemyList = startScene.getEnemyList();
        let i = 0;

        for (i; i < this.enemyList.length; i++){
            this.addToBattle(this.enemyList[i]);
        }

        this.addToParty('kraftBattle');
        this.addToParty('kraftBattle');
        this.addToParty('kraftBattle');

        this.textbox = this.add.image(160, 150, 'text-box');

        this.attack = this.add.sprite(55, 150, 'battleBox');
        this.heal = this.add.sprite(125, 150, 'battleBox');
        this.sedate = this.add.sprite(195, 150, 'battleBox');
        this.run = this.add.sprite(265, 150, 'battleBox');

        this.attackText = this.add.text(55, 150, 'ATTACK', { fontSize: '16px', fill: '#FFF', font: 'main-font' });
        this.attackText.setFixedSize(50, 30);
        this.attackText.setAlign('center');
        this.attackText.setOrigin(0.5, 0.25);

        this.healText = this.add.text(125, 150, 'HEAL', { fontSize: '16px', fill: '#FFF', font: 'main-font' });
        this.healText.setFixedSize(50, 30);
        this.healText.setAlign('center');
        this.healText.setOrigin(0.5, 0.25);

        this.sedateText = this.add.text(195, 150, 'SEDATE', { fontSize: '16px', fill: '#FFF', font: 'main-font' });
        this.sedateText.setFixedSize(50, 30);
        this.sedateText.setAlign('center');
        this.sedateText.setOrigin(0.5, 0.25);

        this.runText = this.add.text(265, 150, 'ESCAPE', { fontSize: '16px', fill: '#FFF', font: 'main-font' });
        this.runText.setFixedSize(50, 30);
        this.runText.setAlign('center');
        this.runText.setOrigin(0.5, 0.25);

        //const runHitArea = new Phaser.Geom.Rectangle(240, 135, 50, 30);
        this.run.setInteractive()
        this.run.on("pointerup", this.attemptRun, this);
    }

    attemptRun() {
        this.scene.wake('Start');
        this.scene.stop('Battle');
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
     * @param enemyType{this.Enemy} 
     */
    addToBattle(enemyType) {
        let key = '';
        let stats = {
            attack: 10,
            defense: 10,
            speed: 1,
            hp: 10,
            evade: 0,
            precision: 0,
            catchMod: 150
        };
        switch (enemyType){
                case (this.Enemy.SUBJECT):
                    key = 'subject58';
                    stats = {
                        attack: 20,
                        defense: 20,
                        speed: 30,
                        hp: 20,
                        evade: 10,
                        precision: 25,
                        catchMod: 150
                    };
                    break;
                case(this.Enemy.REAPER):
                    key = 'reaper';
                    stats = {
                        attack: 25,
                        defense: 15,
                        speed: 32,
                        hp: 25,
                        evade: 20,
                        precision: 5,
                        catchMod: 120
                    };
                    break;
                case(this.Enemy.CONJOINED):
                    key = 'conjured';
                    stats = {
                        attack: 22,
                        defense: 25,
                        speed: 16,
                        hp: 35,
                        evade: 22,
                        precision: 10,
                        catchMod: 90
                    };
                    break;
                case(this.Enemy.SWEET_TOOTH):
                    key = 'sweet-tooth';
                    stats = {
                        attack: 28,
                        defense: 30,
                        speed: 4,
                        hp: 38,
                        evade: 5,
                        precision: 30,
                        catchMod: 45
                    };
                    break;
                case(this.Enemy.ZERO):
                    key = 'zeroBattle';
                    stats = {
                        attack: 30,
                        defense: 10,
                        speed: 32,
                        hp: 25,
                        evade: 30,
                        precision: 28,
                        catchMod: -1
                    };
                    break;
                default:
                    return;
            }
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