const namesArray = ["William","John","Robert","Henry","Thomas","Walter","Alice","Isabella","Emma","Eleanor","Margaret","Ademar","Alaric","Ingram","Beatrice","Isabeau","Lavinia","Christian","Julian","Manfred","Foulques","Bertran","Geoffrey","Godfrey","Elrond","Maximus","Flynn","Melina","Hoel","Berenguer","Tancrède","Thibaut"];
const roles = ['Warrior','Mage','Scout','Marksman','Tank','Healer','Assassin'];

function statGen(role,level,stamina){
    // stamina is between (40,100) at step 20, we need to compensate low stamina characters by giving them more stats
    const stm = (1 - stamina/100)/2; // (stm = 0.2 -> total_stats = old_stats + 0.2 * scaler_value)

    // level should correspond to the total number of stat points (each lvl one point)
    const totalPoints = (1 + stm) * level;

    // roles should matter when distributing stats (ex. mage should have high int)

    const role_weights = {
        Warrior: { combat: 0.40, vigor: 0.30, mobility: 0.15, charisma: 0.10, intelligence: 0.05 },
        Mage: { combat: 0.10, vigor: 0.10, mobility: 0.15, charisma: 0.20, intelligence: 0.45 },
        Scout: { combat: 0.10, vigor: 0.15, mobility: 0.45, charisma: 0.10, intelligence: 0.20 },
        Marksman: { combat: 0.40, vigor: 0.10, mobility: 0.35, charisma: 0.05, intelligence: 0.10 },
        Tank: { combat: 0.20, vigor: 0.50, mobility: 0.10, charisma: 0.15, intelligence: 0.05 },
        Healer: { combat: 0.05, vigor: 0.10, mobility: 0.15, charisma: 0.35, intelligence: 0.35 },
        Assassin: { combat: 0.40, vigor: 0.10, mobility: 0.40, charisma: 0.05, intelligence: 0.05 }
    };

    const stats = {
        combat:role_weights[role].combat,
        vigor:role_weights[role].vigor,
        mobility:role_weights[role].mobility,
        charisma:role_weights[role].charisma,
        intelligence:role_weights[role].intelligence,
    }

    let acc = 0; // for points lost because of math.floor()
    // multiply stats weight by total points
    for (const stat in stats){
        acc += stats[stat]*totalPoints - Math.floor(stats[stat]*totalPoints);
        stats[stat] = Math.floor(stats[stat]*totalPoints);
    }
    // acc probably has value>1 by now, we can add it to random stat 
    const statsNames = ['combat','vigor','mobility','charisma','intelligence'];
    for (let i=Math.floor(acc);i>0;i--){
        stats[statsNames[Math.floor(Math.random()*statsNames.length)]] += 1;
    }
    
    return stats;
}

// character generating function
function generateCharacter() {
    const name = namesArray[Math.floor(Math.random() * namesArray.length)];
    const role = roles[Math.floor(Math.random()*roles.length)];
    const level = Math.floor(Math.random()*7)+8; // min lvl 8 max 15
    const stamina = Math.max(40,Math.min(Math.floor(((Math.random()*level)+1)/3)*20,100)); // higher lvl has hight stamina probability
    const stats = statGen(role,level,stamina);
    const character = {
        name: name,
        role: role,
        level: level,
        stamina: stamina,
        stats:stats,
        id: crypto.randomUUID()
        
    }
	return character
}
console.log(generateCharacter())


