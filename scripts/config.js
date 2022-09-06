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
} ];

BITHIRMODCONF.abominationAbilities = {
    core: [
        { reference: "armored", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "robust", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "ironfist", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "naturalweapon", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
    ],
    common: [
        { reference: "acidblood", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "acidattack", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "berserk", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "bloodlust", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "corruptingattack", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "regeneration", forcedAbilities: [], excludedAbilities: [], includedAbilities: []}
    ],
    unusual: [
        { reference: "carapace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "crushingembrace", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "harmfulaura", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},        
        { reference: "manyheaded", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "prehensileclaws", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},
        { reference: "sturdy", forcedAbilities: [], excludedAbilities: [], includedAbilities: []},

    ],
    rare: [
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
};

BITHIRMODCONF.abominationDescriptions = {};
BITHIRMODCONF.abominationShadow = {};