import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 800 }, debug: false }
    },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);
let player, ball, cursors;

function preload() {
    // โหลดรูปภาพ (คุณสามารถเปลี่ยน URL เป็นรูปปิกาจูของคุณเองได้ในภายหลัง)
    this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
}

function create() {
    // สร้างผู้เล่น
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);
    
    // สร้างลูกบอล
    ball = this.physics.add.sprite(400, 300, 'ball');
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setCircle(15); // ปรับให้การชนเป็นวงกลม

    // ระบบควบคุม
    cursors = this.input.keyboard.createCursorKeys();

    // ตรวจสอบการชนระหว่างคนกับบอล
    this.physics.add.collider(player, ball, () => {
        ball.setVelocityY(-400); // เมื่อโหม่งบอล บอลจะเด้งขึ้น
    });
}

function update() {
    if (cursors.left.isDown) player.setVelocityX(-200);
    else if (cursors.right.isDown) player.setVelocityX(200);
    else player.setVelocityX(0);

    if (cursors.up.isDown && player.body.onFloor()) player.setVelocityY(-500);
}