/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-20 11:10
*/
export default class AnimalName extends Laya.Script {

    constructor() {
        super();
    }


    /**
     * 根据type和species确定动物的英文名称
     * @param {*} type 
     * @param {*} species 
     * @returns 
     */

    static getAnimalName(type, species) {
        if (type in animalMap && species in animalMap[type]) {
            return animalMap[type][species];
        } else {
            return "unknown"; // 或者返回其他默认值
        }
    }
    /**
     * 根据type和species确定动物的中文名称
     * @param {*} type 
     * @param {*} species 
     * @returns 
     */
    static getAnimalName_CN(type, species) {
        if (type in animalMap_CN && species in animalMap_CN[type]) {
            return animalMap_CN[type][species];
        } else {
            return "未知"; // 或者返回其他默认值
        }
    }
}

var animalMap = {
    0: {
        0: "RedWhiskeredBulbul",
        1: "AbbottBooby",
        2: "AbyssinianRoller",
        3: "AleutianTern",
        4: "AndeanCondor",
        5: "ArchersBuzzard",
        6: "ArtilleanCrestedHummingBird",
        7: "Babbler",
        8: "BarbaryFalcon",
        9: "BlackHeadedWeaver",
        10: "BlackStork",
        11: "BlueCrane",
        12: "BlueJay",
        13: "CaliforniaCondor",
        14: "Cicadabird",
        15: "Cisticola",
        16: "CollaredFalconet",
        17: "CommonRail",
        18: "CommonScimitarbil",
        19: "Crimsonwing",
        20: "CurlCrestedJay",
        21: "Drongo",
        22: "EuropeanStarling",
        23: "EveningGrosbeak",
        24: "GrayCrownedCrane",
        25: "GrayFlycatcher",
        26: "GreatTit",
        27: "GreenKingfisher",
        28: "GreyTit",
        29: "Gyrfalcon",
        30: "HarpyEagle",
        31: "LavenderWaxbill",
        32: "MaghrebLark",
        33: "NorthernWheatear",
        34: "PhillipineDwarfKingfisher",
        35: "PinkRobin",
        36: "PrairieFalcon",
        37: "RedShoulderedHawk",
        38: "YellowThroatedLongclaw",
        39: "SacredKingfisher",
        40: "SarusCrane",
        41: "SlatyLeggedCrake",
        42: "Starling",
        43: "Swift",
        44: "Thrush",
        45: "TibetanSnowfinch",
        46: "Towhee",
        47: "Warbler",
        48: "Weka",
        49: "WhiteBelliedSeaEagle",
        50: "WhiteCheekedBarbet",
        51: "WhiteStork",
        52: "WhiteThroatedMagpieJay",
        53: "YellowBilledStork",
        54: "Sparrow",
        55: "Penguin",
        56: "SnowOwl",
        57: "Chick",
        58: "Duck",
        59: "Hen",
        60: "Rooster",
        61: "Crow",
        62: "Eagle",
        63: "Hornbill",
        64: "Owl",
        65: "Dove",
        66: "Parrot",
        67: "Pigeon",
        68: "Flamingo",
        69: "Ostrich",
        70: "GoldenEagle",
        71: "Emu",
        72: "Kookaburra",
        73: "Kingfisher",
        74: "Swan",
        75: "Pelican",
        76: "Puffin",
        77: "Goose",
        78: "Mallard",
        79: "Turkey",
        80: "Cardinal",
        81: "Toucan",
        82: "Vulture",
        83: "Woodpecker",
        84: "Kakapo",
        85: "Kiwi",
        86: "Quail",
        87: "Macaw",
        88: "Shoebill",
        89: "Seagull",

    },
    1: {
        0: "鸸鹋",
        1: "黄鼬",
        2: "石龙子",
        3: "猫"
    },
    1: {
        0: "杜鹃",
        1: "老鼠",
        2: "鳄鱼",
        3: "壁虎"
    }
};


var animalMap_CN = {
    0: {
        0: "红耳鹎",
        1: "粉嘴鲣鸟",
        2: "蓝头佛法僧",
        3: "白腰燕鸥",
        4: "安第斯神鹫",
        5: "索马里鵟",
        6: "凤头蜂鸟",
        7: "弯嘴鹛",
        8: "游隼",
        9: "黑头黄背织雀",
        10: "黑鹳",
        11: "蓝蓑羽鹤",
        12: "冠蓝鸦",
        13: "加州神鹫",
        14: "鹃鵙",
        15: "扇尾莺",
        16: "红腿小隼",
        17: "普通秧鸡",
        18: "弯嘴林戴胜",
        19: "红脸朱翅雀",
        20: "卷冠蓝鸦",
        21: "发冠卷尾",
        22: "紫翅椋鸟",
        23: "黄昏锡嘴雀",
        24: "灰冕鹤",
        25: "灰纹霸鹟",
        26: "大山雀",
        27: "绿鱼狗",
        28: "灰山雀",
        29: "矛隼",
        30: "角雕",
        31: "淡蓝梅花雀",
        32: "马格里布凤头百灵",
        33: "穗䳭",
        34: "菲律宾三趾翠鸟",
        35: "粉红鸲鹟",
        36: "草原隼",
        37: "赤肩鵟",
        38: "黄喉长爪鹡鸰",
        39: "白眉翡翠",
        40: "赤颈鹤",
        41: "白喉斑秧鸡",
        42: "椋鸟(亚成)",
        43: "雨燕",
        44: "宝兴歌鸫",
        45: "藏雪雀",
        46: "棕胁唧鹀",
        47: "林柳莺",
        48: "新西兰秧鸡",
        49: "白腹海雕",
        50: "小绿拟啄木鸟",
        51: "白鹳",
        52: "白喉鹊鸦",
        53: "黄嘴鹮鹳",
        54: "麻雀",
        55: "企鹅",
        56: "雪鸮",
        57: "小鸡",
        58: "鸭",
        59: "母鸡",
        60: "公鸡",
        61: "乌鸦",
        62: "白头海雕",
        63: "马来犀鸟",
        64: "猫头鹰",
        65: "灰斑鸠",
        66: "鹦鹉",
        67: "岩鸽",
        68: "火烈鸟",
        69: "非洲鸵鸟",
        70: "金雕",
        71: "鸸鹋",
        72: "笑翠鸟",
        73: "翠鸟",
        74: "天鹅",
        75: "鹈鹕",
        76: "北极海鹦",
        77: "鹅",
        78: "绿头鸭",
        79: "火鸡",
        80: "主红雀",
        81: "巨嘴鸟",
        82: "兀鹫",
        83: "啄木鸟",
        84: "鸮面鹦鹉",
        85: "几维鸟",
        86: "翎鹑",
        87: "蓝黄金刚鹦鹉",
        88: "鲸头鹳",
        89: "海鸥",

    },
    1: {
        0: "鸸鹋",
        1: "黄鼬",
        2: "石龙子",
        3: "猫"
    },
    1: {
        0: "杜鹃",
        1: "老鼠",
        2: "鳄鱼",
        3: "壁虎"
    }
};