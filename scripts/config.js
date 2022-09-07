// Namespace Configuration Values
export const BITHIRMODCONF = {};

BITHIRMODCONF.resistanceLevels = [
    {name:"Weak", experience: 0, abilities: "1"},
    {name:"Ordinary", experience: 50, abilities: "1d3"},
    {name:"Challenging", experience: 150, abilities: "1d4+1"},
    {name:"Strong", experience: 300, abilities: "1d4+1"},
    {name:"Mighty", experience: 600, abilities: "1d6+1"},
    {name:"Legendary", experience: 1200, abilities: "1d8+1"}
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
    }    
];

BITHIRMODCONF.abominationAbilities = {
    core: {
        weight: 0,
        abilityRef: [
            { reference: "armored", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "robust", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
            { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
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

BITHIRMODCONF.abominationAdjectives = [
    "Bloodcurdling","Gory","Macabre","Phantasm","Unsettling","Ominous","Otherworldly",
    "Supernatural","Eerie","Chilling","Mysterious","Puzzling","Spectral","Fearsome",
    "Unusual","Uncanny","Unearthly","Bizarre","Creepy","Spookish","Haunting","Alarming",
    "Sinister","Wicked","Petrifying","Haunted","Menacing","Ghastly","Twisted","Looming"
];

BITHIRMODCONF.abominationDescriptions = {};
BITHIRMODCONF.abominationShadow = {};