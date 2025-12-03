import characterGenerator from './characterGenerator.js'
import missionGen from './missionGen.js'

const character = characterGenerator();
console.log(character)
const missions = []
missions.push(missionGen('medium','Escort Missions'));
console.log(missions[0])

// console.log(getMission('easy','Combat Missions'))
// console.log(getMission('medium','Escort Missions'))
// console.log(getMission('hard','Arcane Missions'))