import { Scene } from 'phaser';

/**
 * Preloader Scene loads in all game assets.
 */
export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    /**
     * Display the Preloading screen.
     */
    init(): void {
        this.add.image(400, 300, 'logo');
    }

    /**
     * Load game assets.
     */
    preload(): void {
        this.load.setPath('assets');
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude',
            'dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    /**
     * Construct globally useful assets.
     */
    create(): void {
        this.scene.start('Game');
    }
}
