// Namespace Configuration Values
export const BITHIRMODCONF = {};

BITHIRMODCONF.resistanceLevels = [
    {name:"Weak", experience: 0, abilities: "1"},
    {name:"Ordinary", experience: 50, abilities: "1d3"},
    {name:"Challenging", experience: 150, abilities: "1d3"},
    {name:"Strong", experience: 300, abilities: "1d3"},
    {name:"Mighty", experience: 600, abilities: "1d3"},
    {name:"Legendary", experience: 1200, abilities: "1d3"}
];

BITHIRMODCONF.abominationStatBlocks = [ { 
        name: "Test block",
        attributes: {
            "accurate":10,
            "cunning":10,
            "discreet":10,
            "persuasive":10,
            "quick":10,
            "resolute":10,
            "strong":10,
            "vigilant":10
        },
        excludedAbilities: [],
        includedAbilities: [],
    },
    { 
        name: "BlightBorn Aboar type",
        attributes: {
            "accurate":7,
            "cunning":10,
            "discreet":7,
            "persuasive":5,
            "quick":13,
            "resolute":11,
            "strong":15,
            "vigilant":9
        },
        excludedAbilities: [],
        includedAbilities: [ 
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "robust", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        ]
    },
    { 
        name: "Primal beast type",
        attributes: {
            "accurate":13,
            "cunning":9,
            "discreet":5,
            "persuasive":7,
            "quick":11,
            "resolute":10,
            "strong":15,
            "vigilant":10
        },
        excludedAbilities: [],
        includedAbilities: [ 
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "robust", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "naturalwarrior", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "berserker", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "regeneration", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        ]
    },
    { 
        name: "Warrior type",
        attributes: {
            "accurate":15,
            "cunning":10,
            "discreet":13,
            "persuasive":5,
            "quick":11,
            "resolute":7,
            "strong":9,
            "vigilant":10
        },
        excludedAbilities: [
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
        ],
        includedAbilities: [ 
            { reference: "backstab", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "naturalwarrior", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        ]
    },
    { 
        name: "Mystical type",
        attributes: {
            "accurate":10,
            "cunning":5,
            "discreet":11,
            "persuasive":7,
            "quick":13,
            "resolute":15,
            "strong":10,
            "vigilant":9
        },
        excludedAbilities: [
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
        ],
        includedAbilities: [ 
            { reference: "swift", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "mysticalresistance", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "corruptionsensitive", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "acrobatics", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "corruptionhoarder", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "enthrall", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "backstab", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "naturalwarrior", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        ]
    },
    { 
        name: "Huge insect type",
        attributes: {
            "accurate":11,
            "cunning":10,
            "discreet":15,
            "persuasive":5,
            "quick":9,
            "resolute":13,
            "strong":10,
            "vigilant":7
        },
        excludedAbilities: [
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
        ],
        includedAbilities: [ 
            { reference: "armored", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "piercingattack", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "poisonous", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "carapace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
        ]
    },
    { 
        name: "Swarming Insect type",
        attributes: {
            "accurate":11,
            "cunning":10,
            "discreet":10,
            "persuasive":7,
            "quick":13,
            "resolute":15,
            "strong":9,
            "vigilant":5
        },
        excludedAbilities: [
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
        ],
        includedAbilities: [ 
            { reference: "corruptingattack", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "swarm", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "poisonous", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "armored", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "carapace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
        ]
    },    
    { 
        name: "Insect type",
        attributes: {
            "accurate":11,
            "cunning":10,
            "discreet":10,
            "persuasive":7,
            "quick":13,
            "resolute":15,
            "strong":9,
            "vigilant":5
        },
        excludedAbilities: [
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
        ],
        includedAbilities: [ 
            { reference: "corruptingattack", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "swarm", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "poisonous", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "armored", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "carapace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
        ]
    }, 
    { 
        name: "Snake and worm type",
        attributes: {
            "accurate":15,
            "cunning":10,
            "discreet":9,
            "persuasive":5,
            "quick":11,
            "resolute":10,
            "strong":13,
            "vigilant":7
        },
        excludedAbilities: [

        ],
        includedAbilities: [ 
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
            { reference: "exceptionalattribute", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "naturalweapon", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "poisonous", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "crushingembrace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
        ]
    },
    { 
        name: "Greater hiding abomination type",
        attributes: {
            "accurate":7,
            "cunning":9,
            "discreet":15,
            "persuasive":5,
            "quick":10,
            "resolute":11,
            "strong":13,
            "vigilant":10
        },
        excludedAbilities: [

        ],
        includedAbilities: [ 
            { reference: "invisibility", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
            { reference: "feint", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
            { reference: "backstab", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
            { reference: "terrify", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},            
            { reference: "exceptionalattribute", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "naturalweapon", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "poisonous", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "crushingembrace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
        ]
    },         

];

BITHIRMODCONF.abominationAbilities = {
    core: {
        weight: 0,
        abilityRef: [
            { reference: "armored", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "robust", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "naturalweapon", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
        ]
    },
    rare: {
        weight: 1,
        abilityRef: [
            { reference: "colossal", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "companions", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "corruptionhoarder", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},        
            { reference: "deadlybreath", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "deathstruggle", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "devour", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "infestation", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "infectious", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "invisible", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "metamorphosis", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "mysticalresistance", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "rampage", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "summoner", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "tunneler", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "wrecker", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
        ]
    },
    unusual: {
        weight: 10,
        abilityRef: [
        { reference: "carapace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "crushingembrace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "harmfulaura", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},        
        { reference: "manyheaded", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "prehensileclaws", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "sturdy", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},

    ]},
    common: {
        weight: 100,
        abilityRef: [
        { reference: "acidblood", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "acidattack", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "berserk", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "bloodlust", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "corruptingattack", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "regeneration", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}        
    ]}
};

BITHIRMODCONF.abominationDescriptions = {
    adjective : [
    "bloodcurdling","gory","macabre","phantasm","unsettling","ominous","otherworldly",
    "supernatural","eerie","chilling","mysterious","loathesome","repugnant","fearsome",
    "unusual","uncanny","unearthly","bizarre","creepy","sickening","haunting","alarming",
    "sinister","wicked","petrifying","haunted","menacing","ghastly","twisted","looming",
    "abhorrent", "nauseous", "revolting", "accursed", "atrocious", "blooded", "brutal",
    "grisly", "gruesome", "hideous", "nightmarish", "vicious", "wretched"
    ],
    color: [
        "black", "pitch black", "oily black", "sickly yellowish gray", "purple-black", 
        "deepest black", "ashen gray", "flcikering black", "raging black", "glittering blue-green", 
        "glossy black", "pulsating purple", "deep blue", "smouldering charcoal",
        "fractured obsidian"
    ]
};

BITHIRMODCONF.abominationShadows = [
"a {color} mass that bleeds {color} tears of the deepest corruption",
"the {color} light-consuming stain on the midnight sky",
"{color} with {color} flakes",
"{color} like dead skin & flesh, with dark spots that grow",
"swirling flakes of flickering {color}", 
"a downpour {color} drops in {color} darkness",
"{adjective} swarming {color}",
"pulsating, glittering {color}",
"soaked charcoal with spiderlike {adjective} {color} veins",
"fractured {color}, like a cracked backplate",
"{color} with blackened capillaries",
"like a {color} shadow against a deep {color} backdrop",
"{color} sharp gleaming highlights laced with spiderweb of cracks",
"{color} with a sickly iridescence",
"dusty and sooty, cracked {color} chitin with embers glowing beneath",
"{color} charred flesh, split and oozing"
];

BITHIRMODCONF.midjourneyNonPaidDir = "modules/symbaroum-bithir-mod/assets/midjourney/non-paid";

BITHIRMODCONF.abominationShadow = {};
BITHIRMODCONF.expCost = function(level) { return level * (level +1 )/2 * 10; };
BITHIRMODCONF.randomElement = function(list) {
    return Array.isArray(list) ? list[Math.floor(Math.random()*list.length)] : null;
};
