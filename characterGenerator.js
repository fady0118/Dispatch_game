const namesArray = ["William","John","Robert","Henry","Thomas","Walter","Alice","Isabella","Emma","Eleanor","Margaret","Ademar","Alaric","Ingram","Beatrice","Isabeau","Lavinia","Christian","Julian","Manfred","Foulques","Bertran","Geoffrey","Godfrey","Elrond","Maximus","Flynn","Melina","Hoel","Berenguer","Tancrède","Thibaut"];
const roles = ['Warrior','Mage','Rogue','Marksman','Tank','Healer','Assassin'];

function statGen(role,level,stamina){
    // stamina is between (40,100) at step 20, we need to compensate low stamina characters by giving them more stats
    const stm = (1 - stamina/100)/2; // (max stm bonus = 30%)

    // points have base value and scale with level and compensate low stamina
    const totalPoints = (1 + stm) * (25 + level*3.5);

    // roles should matter when distributing stats (ex. mage should have high arcane)
    const role_weights = {
            Warrior: {
                combat: 0.32, vigor: 0.22, mobility: 0.12, fortitude: 0.20,
                intelligence: 0.03, charisma: 0.06, perception: 0.05,
                arcane: 0, restoration: 0
            },
            Mage: {
                combat: 0.02, vigor: 0.05, mobility: 0.10, fortitude: 0.02,
                intelligence: 0.24, charisma: 0.05, perception: 0.05,
                arcane: 0.42, restoration: 0.05
            },
            Healer: {
                combat: 0.01, vigor: 0.07, mobility: 0.03, fortitude: 0.03,
                intelligence: 0.15, charisma: 0.19, perception: 0.10,
                arcane: 0.02, restoration: 0.40
            },
            Tank: {
                combat: 0.13, vigor: 0.27, mobility: 0.05, fortitude: 0.45,
                intelligence: 0.03, charisma: 0.05, perception: 0.02,
                arcane: 0.0, restoration: 0.0
            },
            Marksman: {
                combat: 0.29, vigor: 0.08, mobility: 0.23, fortitude: 0.05,
                intelligence: 0.08, charisma: 0.05, perception: 0.20,
                arcane: 0.01, restoration: 0.01
            },
            Rogue: {
                combat: 0.10, vigor: 0.05, mobility: 0.32, fortitude: 0.03,
                intelligence: 0.15, charisma: 0.05, perception: 0.28,
                arcane: 0.01, restoration: 0.01
            },
            Assassin: {
                combat: 0.24, vigor: 0.08, mobility: 0.28, fortitude: 0.05,
                intelligence: 0.10, charisma: 0.03, perception: 0.20,
                arcane: 0.02, restoration: 0.0
            }
    };

    let stats_weights = {
        combat:role_weights[role].combat,
        vigor:role_weights[role].vigor,
        mobility:role_weights[role].mobility,
        fortitude:role_weights[role].fortitude,

        intelligence:role_weights[role].intelligence,
        charisma:role_weights[role].charisma,
        perception:role_weights[role].perception,

        arcane:role_weights[role].arcane,
        restoration:role_weights[role].restoration,
    }
    
    // ------- MINIMUM SYSTEM -------
    const minValue = 1;
    const statNames = Object.keys(stats_weights);
    const remainingPoints = totalPoints - (minValue * statNames.length);
    let stats = {};
    statNames.forEach(name=>{
        return stats[name] = minValue;
    })
    if (remainingPoints <= 0){ return stats;}

    // ------- Remaining DISTRIBUTION -------
    let acc = 0; // for points lost because of math.floor()
    // multiply stats weight by remaining points
    for (const stat in stats){
        acc += stats_weights[stat]*remainingPoints - Math.floor(stats_weights[stat]*remainingPoints);
        stats[stat] += Math.floor(stats_weights[stat]*remainingPoints);
    }
    acc = Math.round(acc);
    // acc probably has value>1 by now, we can add it to the highest stat (becomes more specialized
        let ordered_list = Object.entries(stats).sort((a,b)=>b[1]-a[1]);
        for(let i=acc;i>0;i--){
            ordered_list[acc-i][1]++;
        }
        stats = ordered_list.reduce((listObject,[key,value])=>{
            listObject[key]=value;
            return listObject;
        },{})
    
    return stats;
}

// character generating function
function generateCharacter() {
    const name = namesArray[Math.floor(Math.random() * namesArray.length)];
    const role = roles[Math.floor(Math.random()*roles.length)];
    const level = Math.floor(Math.random()*4)+2; // min lvl 2 max 5
    const stamina = Math.max(40,Math.min(Math.floor(((Math.random()*level)+1))*20,100)); // higher lvl has hight stamina probability
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


