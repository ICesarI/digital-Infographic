import { select, scaleLinear } from 'https://cdn.skypack.dev/d3@7'

const topRockAlbums = [
  { artist: 'Queen', title: 'Greatest Hits', eq_albums: 929000 },
  { artist: 'Elton John', title: 'Diamonds', eq_albums: 743000 },
  { artist: 'Fleetwood Mac', title: 'Rumours', eq_albums: 721000 },
  { artist: 'CCR', title: 'The 20 Greatest Hits', eq_albums: 630000 },
  { artist: 'Journey', title: `Journey's Greatest Hits`, eq_albums: 561000 },
]

const topAlbumsSection = select('#top-albums')

topAlbumsSection
  .append('h3')
  .text('Top Rock Albums')

const barChartWidth = 500
const barChartHeight = 130
const barChart = topAlbumsSection
  .append('svg')
  .attr('viewbox', [0, 0, barChartWidth, barChartHeight])
  .attr('width', barChartWidth)
  .attr('height', barChartHeight)

const marginLeft = 200
barChart
  .append('line')
  .attr('x1', marginLeft)
  .attr('y1', 0)
  .attr('x2', marginLeft)
  .attr('y2', barChartHeight)
  .attr('stroke', '#333')
  .attr('stroke-width', 2)

const barLengthScale = scaleLinear()
  .domain([0, 1000000])
  .range([0, barChartWidth - marginLeft - 100])

const barHeight = 20
const barSpacing = 5
barChart
  .selectAll('rect')
  .data(topRockAlbums)
  .join('rect')
  .attr('x', marginLeft + 1)
  .attr('y', (d, i) => barSpacing + (barHeight + barSpacing) * i)
  .attr('width', (d) => barLengthScale(d.eq_albums))
  .attr('height', barHeight)
  .attr('fill', '#a6d854')

barChart
  .selectAll('.label-value')
  .data(topRockAlbums)
  .join('text')
  .attr('class', 'label label-value')
  .attr('x', (d) => marginLeft + barLengthScale(d.eq_albums) + 10)
  .attr('y', (d, i) => barSpacing + (barHeight + barSpacing) * i + 14)
  .text((d) => d.eq_albums / 1000000 + 'M')

barChart
  .selectAll('.label-title')
  .data(topRockAlbums)
  .join('text')
  .attr('class', 'label label-title')
  .attr('text-anchor', 'end')
  .attr('x', marginLeft - 5)
  .attr('y', (d, i) => barSpacing + (barHeight + barSpacing) * i + 14)
  .text((d) => `${d.artist}, ${d.title}`)
