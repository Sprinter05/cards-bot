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
                chkDbId = (await checkUser(db, uId))['user_id']
                dbId = parseInt(currEmbed.footer.text.split(' ╏ ')[1].replace('ID ',''))
                
                offset = 0;
                if(interaction.customId === 'cardNext'){offset = 1}
                else if(interaction.customId === 'cardPrev'){offset = -1}

                const msgTitle = dbId === chkDbId ? 0 : currEmbed.title.replace('These are ', '').replace(`'s cards:`, '')
                page = parseInt(currEmbed.footer.text.split(' ╏ ')[0].replace('Page ',''))+offset
                maxPage = await cardsMaxPage(db, dbId)
                
                newEmbed = await cardEmbed(db, dbId, msgTitle, page)
                newRow = await cardRow(page, maxPage)

                // MariaDB moment
                if (page <= 1) {newRow.components[0].setDisabled(true)}
                if (page >= maxPage) {newRow.components[1].setDisabled(true)}

                await interaction.update({
                    embeds: [newEmbed],
                    components: [newRow],
                })
            }
        }
    }
};
