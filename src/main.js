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
const CHARACTER_DATA = {
    volt: {
        name: 'Volt',
        speed: 450,
        jump: -550,
        power: 1.5,
        color: 0x00ffff, // สีฟ้านีออน
        sprite: 'volt_assets'
    },
    nova: {
        name: 'Nova',
        speed: 250,
        jump: -400,
        power: 2.2,
        color: 0xffa500, // สีส้มเพลิง
        sprite: 'nova_assets'
    },
    static: {
        name: 'Static',
        color: 0x9c27b0, // สีม่วง
        speed: 350,
        power: 3.0,
        jump: -450,
        sprite: 'static_assets'
    },
    pulse: {
        name: 'Pulse',
        color: 0x39ff14, // สีเขียวนีออน
        speed: 400,
        power: 3.5,
        jump: -480,
        sprite: 'pulse_assets'
    }// เพิ่มตัวอื่นๆ ตามตารางด้านบน...
};

// ฟังก์ชันเลือกตัวละครและตั้งค่า Physics
function setupPlayer(playerSprite, charKey) {
    const stats = CHARACTER_DATA[charKey];
    playerSprite.setData('stats', stats);
    playerSprite.setTint(stats.color); // เปลี่ยนสีเบื้องต้นตามตัวละคร
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

    // กำหนดค่าเริ่มต้นให้ผู้เล่น (ตัวอย่าง: เลือก Volt)
    setupPlayer(player, 'volt');

    // ตรวจสอบการชนระหว่างคนกับบอล
    this.physics.add.collider(player, ball, () => {
        ball.setVelocityY(-400); // เมื่อโหม่งบอล บอลจะเด้งขึ้น
    });
}

function update() {
    const stats = player.getData('stats');
    // ป้องกัน error กรณี stats ยังไม่ถูก set (เผื่อไว้)
    if (!stats) return;

    if (cursors.left.isDown) {
        player.setVelocityX(-stats.speed);
    } else if (cursors.right.isDown) {
        player.setVelocityX(stats.speed);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.onFloor()) {
        player.setVelocityY(stats.jump);
    }
}