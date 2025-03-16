import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init(): void {
        // TODO: Display preloader screen, probably just the logo
    }

    preload(): void {
        //  Load the assets for the game - Replace with your own assets
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

   

    create(): void 
        {
            //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
            //  For example, you can define global animations here, so we can use them in other scenes.

            //  Move to the next Scene. You could also swap this for a Scene Transition, such as a camera fade.

            this.scene.start('Game');
        }
    }
