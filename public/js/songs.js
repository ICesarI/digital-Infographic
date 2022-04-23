import { max, scaleSqrt, select } from 'https://cdn.skypack.dev/d3@7'

const topRockSongs = [
  { artist: 'Fleetwod Mac', title: 'Dreams', sales_and_streams: 1882000 },
  { artist: 'AJR', title: 'Bang!', sales_and_streams: 1627000 },
  { artist: 'Imagine Dragons', title: 'Believer', sales_and_streams: 1571000 },
  { artist: 'Journey', title: `Don't Stop Believin'`, sales_and_streams: 1497000 },
  { artist: 'Eagles', title: 'Hotel California', sales_and_streams: 1393000 },
]

const topSongsSection = select('#top-songs')

topSongsSection
  .append('h3')
  .text('Top Rock Songs')

const circlesChartWidth = 550
const circlesChartHeight = 130
const circlesChart = topSongsSection
  .append('svg')
  .attr('viewbox', [0, 0, circlesChartWidth, circlesChartHeight])
  .attr('width', circlesChartWidth)
  .attr('height', circlesChartHeight)

const circlesChartMiddleHeight = circlesChartHeight / 2
circlesChart
  .append('line')
  .attr('x1', 0)
  .attr('y1', circlesChartMiddleHeight)
  .attr('x2', circlesChartWidth)
  .attr('y2', circlesChartMiddleHeight)
  .attr('stroke', '#333')
  .attr('stroke-width', 2)

const circlesChartGroups = circlesChart
  .selectAll('g')
  .data(topRockSongs)
  .join('g')

const circlesScale = scaleSqrt()
  .domain([0, max(topRockSongs, d => d.sales_and_streams)])
  .range([0, 40])

circlesChartGroups
  .append('circle')
  .attr('cx', (d, i) => 55 + i * 110)
  .attr('cy', circlesChartMiddleHeight)
  .attr('r', d => circlesScale(d.sales_and_streams))
  .attr('fill', '#8C9FCA')

circlesChartGroups
  .append('text')
  .attr('x', (d, i) => 55 + i * 110)
  .attr('y', 20)
  .attr('text-anchor', 'middle')
  .attr('class', 'label label-value')
  .text((d) => `${d.sales_and_streams / 1000000}M`)

circlesChartGroups
  .append('text')
  .attr('x', (d, i) => 55 + i * 110)
  .attr('y', circlesChartHeight - 5)
  .attr('text-anchor', 'middle')
  .attr('class', 'label label-value')
  .text((d) => d.title)
