let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0 //_代表这是我私有的id不要共用
//两个保底｜｜第一个表示至少有0这个字符串，第二个保底至少有一个数字0

function createId() {
  id++
  return id
}
export default createId
