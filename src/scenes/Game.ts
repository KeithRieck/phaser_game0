import { Scene, Physics, Types, GameObjects } from 'phaser';

/**
 * Main Game Scene.
 */
export class Game extends Scene {

    player: Types.Physics.Arcade.SpriteWithDynamicBody;
    platforms: Physics.Arcade.StaticGroup;
    stars: Physics.Arcade.Group;
    bombs: Physics.Arcade.Group;
    score: number = 0;
    scoreText: GameObjects.Text;
    gameOver: boolean = false;

    constructor() {
        super('Game');
    }

    create(): void {
        // Create the background
        this.add.image(400, 300, 'sky');

        // Create the platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // Create the player
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // Create the stars
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.stars.children.iterate((child: any) =>
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        );
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

        // Create the bombs
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', stroke: '#000' });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Set up the player animations
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(): void {
        let cursors: any = this.input.keyboard?.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    private collectStar(player: any, star: any) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child: any) =>
                child.enableBody(true, child.x, 0, true, true)
            );
        } else {
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    };

    private hitBomb(player: any, bomb: any) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;
    };
}
