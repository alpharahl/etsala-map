const regions = require('./mapData.json').regions;

const systems = Object.values(regions).flatMap(region => {
  return Object.values(region.constellations).flatMap(constellation => {
    return Object.keys(constellation.systems).map(name => {
      return {...constellation.systems[name], ...{name}}
    })
  })
})

const trigSystems = require('./trigSystems.json');

let trigInfluence = {}

Object.keys(trigSystems).forEach(systemName => {
  const system = trigSystems[systemName];
  if (system.length  ===  0){
    return;
  }

  let targets = [];
  system.forEach(name => {
    let systemData;
    systemData = systems.find(element => element.name === name)
    targets.push(name)
    console.log(name);
    Object.keys(systemData.stargates).forEach(stargateID => {
      const stargate = systemData.stargates[stargateID];
      targets.push(stargate.destination)
      const innerSystem = systems.find(element => element.name === stargate.destination);
      Object.values(innerSystem.stargates).forEach(innerGate => {
        targets.push(innerGate.destination)
      })
    })
  })
  targets = [...new Set(targets)]
  trigInfluence[systemName] = targets;
})

const fs = require('fs');
fs.writeFileSync('trigInfluence.json', JSON.stringify(trigInfluence));
