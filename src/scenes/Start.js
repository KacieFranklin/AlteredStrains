export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    create() {
        this.Dir = Object.freeze({
            DOWN:0,
            UP:1,
            RIGHT:2,
            LEFT:3
        });

        this.Enemy = Object.freeze({
            SUBJECT:0,
            REAPER:1,
            CONJOINED:2,
            SWEET_TOOTH:3,
            ZERO:4
        })

        this.grass = this.add.tileSprite(160, 0, 320, 720, 'grass');
        this.initMap();
        this.debugText = this.add.text(10, 10, "debug:");
        this.debugText.setFontStyle('main-font');
        this.kraft = this.physics.add.sprite(160, 90, 'kraft');
        this.cameras.main.setVisible(false);
        this.view = this.cameras.add(0, 0, 1280, 720, true, 'view');
        this.view.setBounds(0, -360, this.grass.width, this.grass.height);

        this.party = [this.kraft];
        this.battle = [this.Enemy.REAPER, -1, -1];
        
        this.view.zoom = 4;
        this.view.startFollow(this.kraft, false, 0.1, 0.1);
        this.view.setDeadzone(8, 4);

        this.buffer = [];

        this.kraft.anims.create({
            key: 'walk down',
            frames: this.anims.generateFrameNumbers('kraft', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.kraft.anims.create({
            key:'walk up',
            frames: this.anims.generateFrameNumbers('kraft', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.kraft.anims.create({
            key:'walk right',
            frames: this.anims.generateFrameNumbers('kraft', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
        this.kraft.anims.create({
            key:'walk left',
            frames: this.anims.generateFrameNumbers('kraft', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });

        this.kraft.play('walk down');

        this.cursors = this.input.keyboard.createCursorKeys();
        const keyObjects = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D",
            battle: "P",
            next: "up",
            previous: "down"
        });

        this.kraft.velocity = {x:0, y:0};
        this.kraft.isMoving = false;
        this.kraft.facing = this.Dir.DOWN;
        this.currentDir = this.Dir.DOWN;

        keyObjects.down.on("down", () => {this.buffer.push(this.Dir.DOWN)}); // if down is pressed
        keyObjects.down.on("up", () => {this.debuffer(this.Dir.DOWN)}); // if down is released
        keyObjects.up.on("down", () =>{this.buffer.push(this.Dir.UP)}); // if up is pressed
        keyObjects.up.on("up", () =>{this.debuffer(this.Dir.UP)}); // if up is released
        keyObjects.right.on("down", () =>{this.buffer.push(this.Dir.RIGHT)}); // if right is pressed
        keyObjects.right.on("up", () =>{this.debuffer(this.Dir.RIGHT)}); // if right is released
        keyObjects.left.on("down", () =>{this.buffer.push(this.Dir.LEFT)}); // if left is pressed
        keyObjects.left.on("up", () =>{this.debuffer(this.Dir.LEFT)}); // if left is released
        keyObjects.battle.on("up",() =>{this.scene.run('Battle'); this.clearMovement(); this.scene.sleep('Start');})
    }

    update(time, delta) {
        this.handleAccelDecel();
        this.turnToFaceDirection();
        if (this.kraft.isMoving == true) this.attemptEncounter();
        //this.centreCamera();
        this.kraft.x += this.kraft.velocity.x * delta;
        this.kraft.y += this.kraft.velocity.y * delta;
    }

    attemptEncounter() {
        const num = Math.floor(Math.random() * 500);
        
        if (num == 300) {
            this.randomiseBattle();
            this.debugText.text = "ding ding!";
            this.scene.run('Battle');
            this.clearMovement();
            this.scene.sleep('Start');
        }
        if (this.physics.overlap(this.kraft, this.grass) && num < 150) {
            //this.scene.add('Battle');
        };
    }

    randomiseBattle() {
        const num = Math.floor(Math.random() * 100);
        if (num < 10) {
            this.battle = [this.Enemy.REAPER, -1, -1];
        }
        else if (num < 20) {
            this.battle = [this.Enemy.REAPER, this.Enemy.REAPER, -1];
        }
        else if (num < 30) {
            this.battle = [this.Enemy.REAPER, this.Enemy.REAPER, this.Enemy.REAPER];
        }
        else if (num < 50) {
            this.battle = [this.Enemy.CONJOINED, -1, -1];
        }
        else if (num < 65) {
            this.battle = [this.Enemy.REAPER, this.Enemy.CONJOINED, -1];
        }
        else if (num < 70) {
            this.battle = [this.Enemy.REAPER, this.Enemy.CONJOINED, this.Enemy.REAPER];
        }
        else if (num < 85) {
            this.battle = [this.Enemy.CONJOINED, this.Enemy.CONJOINED, -1];
        }
        else if (num < 95) {
            this.battle = [this.Enemy.CONJOINED, this.Enemy.REAPER, this.Enemy.CONJOINED];
        }
        else {
            this.battle = [this.Enemy.CONJOINED, this.Enemy.CONJOINED, this.Enemy.CONJOINED];
        }
    }

    getEnemyList() {
        return this.battle;
    }

    initMap() {
        const map_P = this.add.tilemap('main-path_Path', 16, 16);
        const map_M = this.add.tilemap('main-path_Mountain', 16, 16);
        const map_B = this.add.tilemap('main-path_Berry', 16, 16);
        const tiles_P = map_P.addTilesetImage('plains');
        const tiles_M = map_M.addTilesetImage('plains');
        const tiles_B = map_B.addTilesetImage('plains');
        this.pathLayer = map_P.createLayer(0, tiles_P, 0, -360);
        this.mountainLayer = map_M.createLayer(0, tiles_M, 0, -360);
        this.berryLayer = map_B.createLayer(0, tiles_B, 0, -360);
    }

    centreCamera() {
    }

    debuffer(value) {
        let valueInBuffer = true;
        while (valueInBuffer) {
            const lastIndex = this.buffer.indexOf(value);
            if (lastIndex === -1) {
                valueInBuffer = false;
            }
            else {
                this.buffer.splice(lastIndex, 1);
            }
        }
        if (this.buffer.length == 0) {
            this.stopMoveAnim();
        }
        //this.debugText.text = "[DEBUG] index:" + lastIndex + ", value:" + value + ", bufferState:" + this.buffer;
    }

    clearMovement() {
        this.buffer = [];
        this.kraft.velocity = {x:0, y:0};
        this.kraft.anims.setCurrentFrame(this.kraft.anims.get(this.kraft.anims.getName()).getFrameAt(0));
        this.kraft.stop();
        this.kraft.isMoving = false;
    }

    stopMoveAnim() {
        const curAnim = this.kraft.anims.getName();
        const firstFrame = this.kraft.anims.get(curAnim).getFrameAt(0);
        this.kraft.anims.stopOnFrame(firstFrame);
    }

    turnToFaceDirection() {
        const newDir = this.kraft.facing;
        if (newDir === this.currentDir) {
            return;
        }
        switch (newDir){
            case(this.Dir.DOWN):
                this.kraft.play('walk down');
                break;
            case(this.Dir.UP):
                this.kraft.play('walk up');
                break;
            case(this.Dir.RIGHT):
                this.kraft.play('walk right');
                break;
            case(this.Dir.LEFT):
                this.kraft.play('walk left');
                break;
        }
        this.currentDir = newDir;
        this.kraft.isMoving = true;
    }

    handleAccelDecel() {
        const velocity = Object.assign({}, this.kraft.velocity);
        velocity.x *= .9;
        velocity.y *= .9;
        const acc = {x:0, y:0};

        if (this.buffer.includes(this.Dir.DOWN)){
            acc.y += 0.01;
        }
        if (this.buffer.includes(this.Dir.UP)){
            acc.y -= 0.01;
        }
        if (this.buffer.includes(this.Dir.RIGHT)){
            acc.x += 0.01;
        }
        if (this.buffer.includes(this.Dir.LEFT)){
            acc.x -= 0.01;
        }
        if (Math.abs(velocity.x) < 0.001) velocity.x = 0;
        if (Math.abs(velocity.y) < 0.001) velocity.y = 0;

        const absVelocity = Math.hypot(acc.x, acc.y);
        if (absVelocity > 0) {
            acc.x *= 0.01/absVelocity;
            acc.y *= 0.01/absVelocity;
        }
        else { //if absVelocity == 0
            this.stopMoveAnim();
            this.kraft.isMoving = false;
        }

        velocity.x += acc.x;
        velocity.y += acc.y;
        this.kraft.facing = this.buffer[this.buffer.length - 1];
        this.kraft.velocity.y = velocity.y.toFixed(4);
        this.kraft.velocity.x = velocity.x.toFixed(4);

        //this.debugText.text = "[DEBUG] A = [" + this.kraft.velocity.x + " " + this.kraft.velocity.y + "] "; 
    }
}
