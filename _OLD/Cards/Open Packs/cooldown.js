module.exports = {
    name: 'cooldown',
    description: "Free Pack",
    async execute(fs, message, dbcooldown, cooldowns){
    
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        dbcooldown.set(message.author.id, 8)
        await sleep(3600000)
        dbcooldown.set(message.author.id, 7)
        await sleep(3600000)
        dbcooldown.set(message.author.id, 6)
        await sleep(3600000)
        dbcooldown.set(message.author.id, 5)
        await sleep(3600000)
        dbcooldown.set(message.author.id, 4)
        await sleep(3600000)
        dbcooldown.set(message.author.id, 3)
        await sleep(3600000)
        dbcooldown.set(message.author.id, 2)
        await sleep(3600000)
        dbcooldown.set(message.author.id, 1)
        await sleep(3600000)
        dbcooldown.delete(message.author.id)
    }
}