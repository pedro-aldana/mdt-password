import { array } from "zod";

export const generateRandomUsername = (length = 8) => {
    const adjectives = [
        "MightyLion",
        "SilentStorm",
        "BraveEagle",
        "SilverShadow",
        "GoldenPhoenix",
        "CleverFox",
        "SwiftTiger",
        "ElectricFalcon",
        "FrostWolf",
        "IronBear",
        "WildHawk",
        "NightRaven",
        "ThunderFox",
        "CrimsonDragon",
        "ShadowHunter"
    ];

    const nouns = [
        "Warrior",
        "Guardian",
        "Protector",
        "Defender",
        "Champion",
        "Hero",
        "Legend",
        "Savior",
        "Victor",
        "Conqueror",
        "Leader",
        "Commander",
        "General",
        "Generalissimo",
        "Supreme Commander"
        
    ]

    const randomItem = (array: any) => array[Math.floor(Math.random() * array.length)];

    let username = ""
    username +=randomItem(adjectives)
    username +=randomItem(nouns)
    username += Math.floor(Math.random() * 10000)

    if(username.length > length){
        username = username.substring(0, length)
    }

    return username

}