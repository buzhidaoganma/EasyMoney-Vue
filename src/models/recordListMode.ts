const localStorageKeyName = 'recordList'
const recordListModel = {
  data: [] as RecordItem[],
  clone() {
    return JSON.parse(JSON.stringify(this.data))
  },
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem('localStorageKeyName') || '[]',
    ) as RecordItem[] //这里声明好了，后面就可以不用写这个定义类型
    return this.data
  },
  save() {
    window.localStorage.setItem(
      'localStorageKeyName',
      JSON.stringify(this.data),
    )
  },
}

export default recordListModel
