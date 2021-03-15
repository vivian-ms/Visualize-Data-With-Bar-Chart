const resource='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
const w = 900;
const h = 450;
const xPadding = 100;
const yPadding = 50;


const xhr = new XMLHttpRequest();
xhr.open('GET', resource);
xhr.onload = () => {
  const data = JSON.parse(xhr.responseText).data;  // format: [y-m-d, gdp]
  createCanvas(data);
};
xhr.send();


function createCanvas(data) {
  let svg = d3.select('#svg_container')
                .append('svg')
                .attr('width', w + 2 * xPadding)
                .attr('height', h + 2 * yPadding)
                .append('g')
                .attr('transform', `translate(${xPadding}, ${yPadding / 2})`);
}  // End createCanvas
