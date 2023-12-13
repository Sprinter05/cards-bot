module.exports = {
    name: 'missingcards',
    description: "This command is to see what cards you are missing, only for **Golden Pass**",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown){
        let obj = await db.get(message.author.id)
        let cards_available = ["Huey", "Goomba", "Koopa", "Shy guy", "Mario", "Luigi", "Vivian", "Tippi", "Peach", "O'Chunks", "Mimi", "Bowser", "Rawk Hawk", "Kersti", "Goombario", "Goombella", "Bobbery", "Gonzales", "Parakarry", "Doopliss", "Flurrie", "Francis", "Kammy Koopa", "Grubba", "Bobby", "Olivia", "Eldstar", "X-Naut", "Watt", "Kamek", "Pennington", "Sir Grodus", "Count Bleck", "Shadow Queen", "King Olly", "Dimentio", "Flavio", "Bombette", "Ninji", "Merlon", "Nastasia", "Mr. L", "Whacka", "Origami Spike", "Origami Koopa", "Origami Pokey", "Origami Goomba", "Origami Hammer Bro", "Origami Shy Guy", "12 Colored Pencils", "Captain T.Ode", "No face Toad", "Professor Toad", "Folded Bowser", "Origami Peach", "King Goomba", "Fracktail", "Bowser Jr.", "Cheep Cheep", "Lady Bow"]
        let missing = []

        //if(message.member.roles.cache.has("744496118192406579") || message.member.roles.cache.has("744496118192406579")){
            
            if (obj != null){

                for([key, value] of Object.entries(obj)) {
                    missing.push(key)
                }
                let result = []
                for(var i = 0;i<=cards_available.length-1;i++){
                    if (!missing.includes(cards_available[i])){
                        result.push(cards_available[i])
                    }
                }

                var embed = new Discord.MessageEmbed()
                .setTitle(`You are missing ${result.length} cards:`)
                .setColor("#18E6E6")
                .setDescription(result.join(', '))

                message.channel.send(embed)
                
            }
            else {
                var embed = new Discord.MessageEmbed()
                .setDescription("❌ You have no cards!")
                .setColor("#f11313")
            
                message.channel.send(embed)
            }
            
        //}
        //else{
            //var embed = new Discord.MessageEmbed()
            //.setDescription("❌ You need **Golden Pass** to use this command.")
            //.setColor("#f11313")
            
            //message.channel.send(embed)
        //}
    }
}