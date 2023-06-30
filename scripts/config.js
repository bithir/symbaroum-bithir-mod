// Namespace Configuration Values
export const BITHIRMODCONF = {};

BITHIRMODCONF.moduleId = 'symbaroum-bithir-mod';
BITHIRMODCONF.basePath = `modules/${BITHIRMODCONF.moduleId}`
BITHIRMODCONF.assetPath = `${BITHIRMODCONF.basePath}/assets`;
BITHIRMODCONF.templatePath = `${BITHIRMODCONF.basePath}/templates`;
BITHIRMODCONF.i18nPath = `BITHIRMOD.`;


BITHIRMODCONF.expCost = function(level) { return level * (level +1 )/2 * 10; };
BITHIRMODCONF.randomElement = function(list) {
    return Array.isArray(list) ? list[Math.floor(Math.random()*list.length)] : null;
};

BITHIRMODCONF.shadowTypes = [
    "corrupt",
    "civilised",
    "natural"
];

BITHIRMODCONF.resistanceLevels = [
    {"name":"Weak", "experience": 0, "abilities": "1"},
    {"name":"Ordinary", "experience": 50, "abilities": "1d3"},
    {"name":"Challenging", "experience": 150, "abilities": "1d3"},
    {"name":"Strong", "experience": 300, "abilities": "1d3"},
    {"name":"Mighty", "experience": 600, "abilities": "1d3"},
    {"name":"Legendary", "experience": 1200, "abilities": "1d3"}
];