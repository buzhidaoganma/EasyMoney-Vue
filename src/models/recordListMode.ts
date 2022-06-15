const localStorageKeyName = 'recordList'
const recordListModel = {
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data))
  },
  fetch() {
    return JSON.parse(
      window.localStorage.getItem('localStorageKeyName') || '[]',
    ) as RecordItem[] //这里声明好了，后面就可以不用写这个定义类型
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem('localStorageKeyName', JSON.stringify(data))
  },
}

export default recordListModel
