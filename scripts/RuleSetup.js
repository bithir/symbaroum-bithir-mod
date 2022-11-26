export class RuleSetup  extends FormApplication {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = "rule-library";
        options.template = "modules/symbaroum-bithir-mod/templates/rule-library.hbs";
        options.width = 900;
        return options;
    }

    get title() {
        return "dummy";
    }
    
    async getData(options){
        let data={};
        // Structure
        /*
        {
            reference: [{
                default: {}
                novice: {}
                ...
                master: {
                    requirements: [
                        armorTypes: [],
                        weaponTypes: []
                        actorRequirements: []                        
                    ],
                    change: [
                        type: type,
                        value: "0",
                    ]
                }
            }]
        }
        */
    }

    async _updateObject(event, formData) {
        console.log('event, formData', event, formData)
    }

}