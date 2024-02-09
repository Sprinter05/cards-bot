const { Events } = require('discord.js');
var { cardEmbed, cardsMaxPage, cardRow } = require('../utils/cardCreator.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, db) {
        if (!interaction.isButton()) return;
	    else if (interaction.isButton()) {
            if(interaction.customId === 'cardNext' || interaction.customId === 'cardPrev'){
                currEmbed = interaction.message.embeds[0].data
                uID = interaction.user.id

                offset = 0;
                if(interaction.customId === 'cardNext'){offset = 1}
                else if(interaction.customId === 'cardPrev'){offset = -1}

                page = parseInt(currEmbed.footer.text.replace('Page ',''))+offset
                maxPage = await cardsMaxPage(db, uID)
                
                newEmbed = await cardEmbed(db, uID, page)
                newRow = await cardRow(page, maxPage)

                // MariaDB moment
                checkPage = parseInt(newEmbed.data.footer.text.replace('Page ', ''))
                maxPage = await cardsMaxPage(db, uID)
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
