const { Events } = require('discord.js');
var { checkUser } = require('../queries')
var { cardEmbed, cardsMaxPage, cardRow } = require('../functionExporter')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, db) {
        if (!interaction.isButton()) return;
	    else if (interaction.isButton()) {
            if (interaction.user.id !== interaction.message.interaction.user.id){
                await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
                return;
            }
            if(interaction.customId === 'cardPrev' || interaction.customId == 'cardNext'){
                currEmbed = interaction.message.embeds[0].data
                uId = interaction.user.id
                dbId = (await checkUser(db, uId))[0]['user_id']

                offset = 0;
                if(interaction.customId === 'cardNext'){offset = 1}
                else if(interaction.customId === 'cardPrev'){offset = -1}

                page = parseInt(currEmbed.footer.text.replace('Page ',''))+offset
                maxPage = await cardsMaxPage(db, dbId)
                
                newEmbed = await cardEmbed(db, dbId, page)
                newRow = await cardRow(page, maxPage)

                // MariaDB moment
                checkPage = parseInt(newEmbed.data.footer.text.replace('Page ', ''))
                maxPage = await cardsMaxPage(db, dbId)
                if (checkPage <= 1) {newRow.components[0].setDisabled(true)}
                if (checkPage >= maxPage) {newRow.components[1].setDisabled(true)}

                await interaction.update({
                    embeds: [newEmbed],
                    components: [newRow],
                })
            }
        }
    }
};
