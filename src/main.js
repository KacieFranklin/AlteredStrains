import { Boot } from './scenes/Boot.js';
import { Start } from './scenes/Start.js';
import { Battle } from './scenes/Battle.js';

const config = {
    type: Phaser.AUTO,
    title: 'Altered Strains',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade'
    },
    scene: [
        Boot,
        Start,
        Battle
    ],
}

new Phaser.Game(config);
            