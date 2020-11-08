const dir_drive = 'C:\\Users\\Dave\\Desktop\\sde\\fsd\\universe\\eve';

var fs = require('fs');
const yaml = require('js-yaml');
var regions = fs.readdirSync(dir_drive);

var regionsData = {};

let stargatesList = [];

regions.forEach(region => {
  const regionDir = `${dir_drive}\\${region}`
  const constellations = fs.readdirSync(regionDir);
  let regionData = {constellations: {}};
  constellations.forEach(constellation => {
    const constellationData = {systems: {}};
    if (constellation.includes('region')){
      return;
    }
    const constellationDir = `${regionDir}\\${constellation}`;
    const systems = fs.readdirSync(constellationDir);

    systems.forEach(system => {
      if (system.includes('constellation')){
        return;
      }
      const systemDir = `${constellationDir}\\${system}\\solarsystem.staticdata`
      try {
        let fileContents = fs.readFileSync(systemDir);
        let data = yaml.safeLoad(fileContents);
        let systemData = {
          center: data.center,
          id: data.solarSystemID,
          nameID: data.solarSystemNameId,
          security: data.security,
          stargates: {}
        }
        Object.keys(data.stargates).forEach(stargateId => {
          const stargate = data.stargates[stargateId];
          const stargateData = {
            id: stargateId,
            destination: stargate.destination,
            typeID: stargate.typeId
          }
          systemData.stargates[stargateId] = stargateData
          stargatesList.push({...stargateData, ...{system, constellation, region}});
        })
        constellationData.systems[system] = systemData;
      } catch(e) {
        console.log(e);
      }
    })
    regionData.constellations[constellation] = constellationData;
  })
  regionsData[region] = regionData;
})

fs.writeFileSync('preMapData.json', JSON.stringify(regionsData));

stargatesList.forEach(stargate => {
  const id = stargate.id;
  Object.keys(regionsData).forEach(regionName => {
    const region = regionsData[regionName];
    Object.keys(region.constellations).forEach(constellationName => {
      const constellation = region.constellations[constellationName];
      Object.keys(constellation.systems).forEach(systemName => {
        const system = constellation.systems[systemName];
        Object.keys(system.stargates).forEach(stargateId => {
          const systemStargate = system.stargates[stargateId];
          if (String(systemStargate.destination) === id){
            regionsData[regionName]
              .constellations[constellationName]
              .systems[systemName]
              .stargates[stargateId].destination = stargate.system;
          }
        })
      })
    })
  })
})


fs.writeFileSync('mapData.json', JSON.stringify({regions: regionsData}));





