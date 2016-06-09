var london_bbox = [[-0.489,51.28],[0.236,51.686]];//place users within London

function randomizeCoords(){
  var x = (Math.random() * Math.abs(london_bbox[1][1]-london_bbox[0][1])) + london_bbox[0][1];
  var y = (Math.random() * Math.abs(london_bbox[0][0]-london_bbox[1][0])) + london_bbox[0][0];
  return [y,x]
}


module.exports = {
  randomizeCoords: randomizeCoords
}
