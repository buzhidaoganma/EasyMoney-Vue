// import recordStore from './recordStore'
// import tagStore from './tagStore'

// const store = {
//   count: 0,
//   addCount() {
//     this.count += 1
//   },

//   ...recordStore, //对象的值拷贝过来，浅拷贝
//   ...tagStore,
//   ////  record store
//   //   recordList: recordListModel.fetch(),
//   //   createRecord: (record: RecordItem) => {
//   //     recordListModel.create(record)
//   //   },

//   //   //tag store
//   //   tagList: tagListModel.fetch(),
//   //   // findTag: (id: string) => {
//   //   //   return window.tagList.filter((t) => t.id === id)[0]
//   //   // }, 箭头函数的this默认是window
//   //   findTag(id: string) {
//   //     return this.tagList.filter((t) => t.id === id)[0]
//   //   },
//   //   createTag: (name: string) => {
//   //     const message = tagListModel.create(name) //写的时候要知道是用这个，封装一下
//   //     if (message === 'duplicated') {
//   //       alert('标签重复')
//   //     } else if (message === 'success') {
//   //       alert('添加成功')
//   //     }
//   //   },
//   //   removeTag: (id: string) => {
//   //     return tagListModel.remove(id)
//   //   },
//   //   updateTag: (id: string, name: string) => {
//   //     //Exclude表达除了id的tag属性
//   //     return tagListModel.update(id, name)
//   //   },
// }

// console.log(store)

// export default store

//全部注释引入VueX
