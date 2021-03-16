const resource='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
const w = 900;
const h = 450;
const xPadding = 100;
const yPadding = 50;
const bar_color = 'slateblue';


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

  createBars(svg, data);
}  // End createCanvas


function createBars(svg, data) {
  let bar_width = w / data.length;

  let xScale = d3.scaleTime()
                   .domain([d3.min(data, d => new Date(`${d[0]} 00:00`)), d3.max(data, d => new Date(`${d[0]} 00:00`))])
                   .range([0, w]);

  let yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, d => d[1])])
                   .range([h, 0]);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * bar_width)
    .attr('y', d => yScale(d[1]))
    .attr('width', bar_width)
    .attr('height', d => h - yScale(d[1]))
    .attr('fill', bar_color)
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .classed('bar', true);

  createAxes(svg, xScale, yScale);
}  // End createBars


function createAxes(svg, xScale, yScale) {
  let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y'));
  svg.append('g')
     .attr('id', 'x-axis')
     .attr('transform', `translate(0, ${h})`)
     .call(xAxis);
  svg.append('text')
     .attr('text-anchor', 'middle')
     .attr('transform', `translate(${w / 2}, ${h + 45})`)
     .attr('font-size', '1rem')
     .text('Year (1947 Q1 - 2015 Q3)');

  let yAxis = d3.axisLeft(yScale);
  svg.append('g')
     .attr('id', 'y-axis')
     .call(yAxis);
  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(-50, ${h / 2}) rotate(-90)`)
    .attr('font-size', '1rem')
    .text('Gross Domestic Product (in billions of dollars)');
}  // End createAxes
