const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'oynacanvasmc.aternos.me',     // Sunucunuzun IP adresi ayarlandı
        port: 25565,                         // Standart Aternos portu
        username: 'afk_bot',                 // Botun ismi ayarlandı
        version: '1.20.1'                    // Sunucunuzun tam sürümünü buraya yazın (Örn: '1.20.4')
    });

    bot.on('spawn', () => {
        console.log('afk_bot başarıyla oynacanvasmc.aternos.me adresine bağlandı!');
        bot.physics.enabled = true; 

        // 1. TAKTİK: RASTGELE YÜRÜME DÖNGÜSÜ (Her 4 saniyede bir rastgele yöne yürür)
        setInterval(() => {
            if (!bot) return;
            const yonler = ['forward', 'back', 'left', 'right'];
            const rastgeleYon = yonler[Math.floor(Math.random() * yonler.length)];

            bot.setControlState(rastgeleYon, true);
            setTimeout(() => {
                bot.clearControlStates();
            }, 1000); // 1 saniye yürüdükten sonra durur
        }, 4000);

        // 2. TAKTİK: /AFK KODUNU BOZMA VE ZIPLAMA (Her 2 dakikada bir zıplayarak AFK modunu engeller)
        setInterval(() => {
            if (!bot) return;
            console.log('Bot /afk moduna girmemek için zıplıyor...');
            bot.setControlState('jump', true);
            setTimeout(() => {
                bot.setControlState('jump', false);
            }, 500);
        }, 120000); // 120000 milisaniye = 2 dakika
    });

    // Bağlantı kesilirse otomatik yeniden bağlanma koruması
    bot.on('end', () => {
        console.log('Bot sunucudan düştü, 10 saniye sonra tekrar bağlanmayı deniyor...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Hata oluştu: ', err));
}

createBot();
