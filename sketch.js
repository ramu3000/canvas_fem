const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

random.setSeed(random.getRandomSeed())

const settings = {
  suffix: random.getSeed(),
  dimensions: [2048, 2048],
};

const sketch = () => {
  const palette = random.shuffle(random.pick(palettes)).slice(0, 6);

  const createGrid = () => {
    const points = [];
    const count = 60;
    for(let x = 0; x < count; x++){
      for(let y = 0; y < count; y++){
        const u = count <= 1 ? 0.5 : x / (count -1);
        const v = count <= 1 ? 0.5 : y / (count -1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.1;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v) * 0.5,
          position: [u, v]
        });
      }
    }
    return points
  }

  
  const points = createGrid().filter(() => random.value() > 0.3);
  const margin = 200;

  console.log(points)
  return ({ context, width, height }) => {
   context.fillStyle = 'white';
   context.fillRect(0, 0, width, height)

   points.forEach( ({ color, rotation, radius, position: [u, v]}) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false )
      // context.fillStyle = color;
      // context.lineWidth = 40;
      // context.fill();
      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x,y)
      context.rotate(rotation)
      context.fillText('=', x, y)
      context.restore();
   })
  };
};

canvasSketch(sketch, settings);
