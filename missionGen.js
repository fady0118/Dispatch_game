const missionsData = require("./missons.json");
// mission difficulty have star rating system that will be translated to total_mission_score
// trivial(0.5), easy(1-2), medium(2.5-3.5), hard(4-5), elite(5-10)
const missionDiff = {
  trivial: { min: 0.5, max: 0.5 },
  easy: { min: 1, max: 2 },
  medium: { min: 2.5, max: 3.5 },
  hard: { min: 4, max: 5 },
  elite: { min: 6, max: 10 },
};

function getMission(difficulty, type) {
  // load a mission from the data
  const availableMission = missionsData[difficulty][type].missions;
  let missionData = availableMission[Math.floor(Math.random()*availableMission.length)];
  const missionWeights = Object.entries(missionData.statWeights);
  // add mission starRatings
  missionData.starRating = getStarRating(difficulty);
  missionData.totalMissionScore = 25 + (missionData.starRating * 10);
  // add mission requirements
  const missionRequirement = missionWeights.map(([key, value])=>{
    return {[key]:Math.round(value * missionData.totalMissionScore)}
  })
  missionData.missionRequirement = missionRequirement
  return missionData;
}
console.log(getMission('easy','Combat Missions'))
console.log(getMission('medium','Escort Missions'))
console.log(getMission('hard','Arcane Missions'))

// utility functions
function getStarRating(difficulty) {
  const { min, max } = missionDiff[difficulty];
  const halfSteps = Math.floor(Math.random() * ((max - min) * 2 + 1));
  const stars = min + halfSteps * 0.5;
  return stars;
}
