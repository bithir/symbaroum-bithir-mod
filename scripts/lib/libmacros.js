
export class BithirMacros
{
    async generateAbominationMacro()
    {
        const config = game.bithirmod.config;
        // Capture exp level (from drop down)
        let expLevel = '';
        for(let resistLv of config.resistanceLevels) {
            expLevel += `<option value="${resistLv.name}">${resistLv.name}</option>`;
        }
        let dialog_content = `  
        <div class="form-group">
        <h2>Select abomination resistance level</h2>
        <br />
        <div style="flex-basis: auto;flex-direction: row;display: flex;">
        <div style="width:10em;min-width:10em;"><select id="expLevel" name="expLevel">${expLevel}</select></div>
        </div><br/>
        </div>`;
        const x = new Dialog({
            content : dialog_content,
            buttons : 
            {
            Ok : { label : `Ok`, callback : async (html)=> {
                    const expLevelName = html.find('#expLevel')[0].value;
                    const selectedExpLevel = config.resistanceLevels.filter( resistLv => { 
                        return resistLv.name == expLevelName;
                    });
                    if(selectedExpLevel.length > 0) {
                        await this.generateAbomination(selectedExpLevel[0]);
                    }
                }
            },
            Cancel : {label : `Cancel`}
            }
        });
        
        x.options.width = 200;
        x.position.width = 300;
        
        x.render(true);
    

    }

    async generateAbomination(xpLevel) {        
        const config = game.bithirmod.config;
        game.symbaroum.log(`Making a ${xpLevel.name} abomination`);
        // Create actor
        // Randomise stat block
        const statBlock = config.abominationStatBlocks[Math.floor(Math.random()*config.abominationStatBlocks.length)];
        game.symbaroum.log(`Picked stat block of ${statBlock.name}`,statBlock);

        // Estimate how many starting abilities we get from exp level

        // Duplicate abilities so that we do not change them
        const abilities = duplicate(game.bithirmod.config.abominationAbilities);
        game.symbaroum.log(abilities);
        // Pick core abilities that are not excluded by the stat block & random levels (allow this to exceed )
        // Randomise abilities that are not excluded by the stat block, increase odds for those that are included
        // with that, until xp is exceeded, if same ability is picked, increase it (I -> II -> III)


    }
}