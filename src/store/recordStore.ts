import clone from '@/lib/clone'
// import recordListModel from '@/models/recordListMode'

const localStorageKeyName = 'recordList'

// let data: RecordItem[] | undefined = undefined //定义data的类型可以是undefined

// function fetchRecords() {
//   data = JSON.parse(
//     window.localStorage.getItem(localStorageKeyName) || '[]',
//   ) as RecordItem[]
//   return data
// }

// function saveRecords() {
//   window.localStorage.setItem(localStorageKeyName, JSON.stringify(data))
// }

// export default {
const recordStore = {
  recordList: [] as RecordItem[],
  // recordList: data, //这里不能使用recordStore.fetchRecords()
  // //   recordList: recordListModel.fetchRecords(),
  fetchRecords() {
    this.recordList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || '[]',
    ) as RecordItem[]
    return this.recordList
  }, //暴露fetch和save,只使用了一次就写在里面了
  saveRecords() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.recordList),
    )
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record)
    record2.createdAt = new Date()
    this.recordList && this.recordList.push(record2)
    //data存在再push东西因为data可能是undefined
    //可以等价写法为this.recordList?.push(record2)
    //这个语法叫做可选链语法（ES2020）
    recordStore.saveRecords() //这里可以使用是因为闭包
  },
}

recordStore.fetchRecords()

export default recordStore
