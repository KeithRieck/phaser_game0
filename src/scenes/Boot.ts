import { Scene } from 'phaser';

/**
 * Boot minimal assets to support the Preloader Scene.
 * The Boot Scene is typically used to load in any assets you require for your 
 * Preloader, such as a game logo or background.
 * The smaller the file size of the assets, the better, as the Boot Scene 
 * itself has no preloader.
 * 
 */
export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload(): void {
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
    }

    create(): void {
        this.scene.start('Preloader');
    }
}
