const intervalList = Object.freeze([
  { text: '按天', value: 'day' },
  { text: '按周', value: 'week' },
  { text: '按月', value: 'month' },
]) //不能对我的intervalList再赋一个新的数组，但是你能在这里面加东西，那我怎么让它不能变动呢
//使用API Object.freeze，这才叫真正的常量

export default intervalList
