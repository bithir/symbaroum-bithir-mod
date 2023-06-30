export class BithirApi
{
    constructor() {
    }

    localize(key) {
        return game.i18n.localize(`${game.bithirmod.config.i18nPath}${key}`);
    }
    
    /**
     * Async regex replace at the cost of double search.  This is needed because foundry table interaction is async and I am to lazy to write my own.
     * 
     * @param {*} string  Original string
     * @param {*} regex The regex to replace
     * @param {*} replacerFunction The async function to call for each match
     * @returns The string with replaced elements
     */
    async replaceAsync(string, regex, replacerFunction) {
        const promises = [];
        string.replace(regex, (match, ...args) => {
            const promise = replacerFunction(match, ...args);
            promises.push(promise);
        });
        const data = await Promise.all(promises);
        return string.replace(regex, () => data.shift());
    }


    /**
     * Generates a shadow based on the type and optional actor.
     * 
     * @param {*} type One of "corrupt", "civilized" & "natural" - see game.bithirmod.config.shadowTypes
     * @param {*} actor The actor involved in generating this - optional
     */
    async generateShadow(type, actor) {
        if( !game.bithirmod.config.shadowTypes.includes(type) ) {
            console.log(`Trying to generate a shadow for a type (corrupt, civilised, natural) that does not exist - type[${type}]`);
            return;
        }
        // Lets go with making actor optional - if it is undefined, select "random" attributes
        let attributes = {
            primaryattribute : game.bithirmod.config.randomElement(game.symbaroum.config.attributes),
            secondaryattribute : game.bithirmod.config.randomElement(game.symbaroum.config.attributes)
        };

        if(actor) {
            let attribs = duplicate(game.symbaroum.config.attributes);
            attribs.sort( (a, b) => {
                return actor.system.attributes[a].total - actor.system.attributes[b].total;
            })
            console.log('attribs-sorted',attribs);
            attributes.primaryattribute = attribs.pop();
            if(Math.floor(Math.random() * 2) == 0)
            {
                // select second strongest attribute instead of first
                attribs.pop();
            }
            attributes.secondaryattribute = attribs.pop();
            console.log('attributes',attributes);
        }        
        return await this.parseSimpleElement(type, attributes,`{#${type}-base}`);
    }

    /**
     * Simple async parser - replaces text recursively until it is unchanging.
     * Text attributes are a map between bracket-dollar ( {$...} ) match in the text.
     *  * {$match} = looks in attributes for table partial table name prefixed by the type
     *  * {#match} = looks in tables directly.
     * 
     * @param {*} type The type of tables we are looking for (prefix = `${type}-`) from the attribute object
     * @param {*} attributes A hashtable of attributes keyed to table names. This can influence the table selection via finding the table matching regex `${type}-.*${attribute[stral]}`
     * @param {*} str Starting string
     * @returns the parsed string
     */
    async parseSimpleElement(type, attributes, str) {
        // console.log(`parseSimpleElement things ${type}, ${str}`);
        let newStr = await this.replaceAsync(str, /\{[#$][^\}]+\}/g, async function(all) {            
            all = all.replace(/[\{\}]/g,'');
            let table = null;
            if( all.charAt(0) == '$') {
                table = game.tables.find( f => f.name.match(`${type}.*-${attributes[all.slice(1)]}`));
            }
            if(all.charAt(0) == '#') {
                // table
                table = game.tables.getName(all.slice(1));

            }
            if(!table) {
                console.error(`Found no matching table ${all} for str ${str}`);
                return "";
            }
            return (await table.roll()).results[0].text;
        });
        if(newStr == str) { return newStr; } else { return await this.parseSimpleElement(type,attributes,newStr)}; 
    }
}
