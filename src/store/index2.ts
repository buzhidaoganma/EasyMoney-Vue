import recordListModel from '@/models/recordListMode'
import tagListModel from '@/models/tagListModel'

const store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    recordListModel.create(record)
  },

  //tag store
  tagList: tagListModel.fetch(),
  // findTag: (id: string) => {
  //   return window.tagList.filter((t) => t.id === id)[0]
  // }, 箭头函数的this默认是window
  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0]
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name) //写的时候要知道是用这个，封装一下
    if (message === 'duplicated') {
      alert('标签重复')
    } else if (message === 'success') {
      alert('添加成功')
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id)
  },
  updateTag: (id: string, name: string) => {
    //Exclude表达除了id的tag属性
    return tagListModel.update(id, name)
  },
}

export default store
