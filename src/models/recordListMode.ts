// import clone from '@/lib/clone'

// const localStorageKeyName = 'recordList'
// const recordListModel = {
//   data: [] as RecordItem[],
//   create(record: RecordItem) {
//     const record2: RecordItem = clone(record)
//     record2.createdAt = new Date()
//     this.data.push(record2)
//     this.save()
//   },
//   fetch() {
//     this.data = JSON.parse(
//       window.localStorage.getItem(localStorageKeyName) || '[]',
//     ) as RecordItem[] //这里声明好了，后面就可以不用写这个定义类型
//     return this.data
//   },
//   save() {
//     window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
//   },
// }

// export default recordListModel

//这个文件都放到recordStore里面了
