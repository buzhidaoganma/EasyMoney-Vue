import createId from '@/lib/crateId'
const localStorageKeyName = 'tagList'

const tagStore = {
  tagList: [] as Tag[],

  fetchTags() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || '[]',
    )
    return this.tagList
  },

  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0]
  },

  saveTags() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.tagList),
    )
  },

  createTag(name: string) {
    const names = this.tagList.map((item) => item.name)
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了')
      return 'duplicated'
    } else {
      const id = createId().toString()
      this.tagList.push({ id, name: name })
      this.saveTags()
      window.alert('添加成功')
      return 'success'
    }
  },

  removeTag(id: string) {
    let index = -1
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i
        break
      }
    }
    this.tagList.splice(index, 1)
    this.saveTags()
    return true
  },

  updateTag(id: string, name: string) {
    const idList = this.tagList.map((item) => item.id)
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        return 'duplicated'
      } else {
        const tag = this.tagList.filter((item) => item.id === id)[0]
        tag.name = name
        this.saveTags()
        return 'success'
      }
    } else {
      return 'not found'
    }
  },
}

tagStore.fetchTags()

export default tagStore

// export default {
//   //tag store
//   tagList: tagListModel.fetch(),
//   // findTag: (id: string) => {
//   //   return window.tagList.filter((t) => t.id === id)[0]
//   // }, 箭头函数的this默认是window
//   findTag(id: string) {
//     return this.tagList.filter((t) => t.id === id)[0]
//   },
//   createTag: (name: string) => {
//     const message = tagListModel.create(name) //写的时候要知道是用这个，封装一下
//     if (message === 'duplicated') {
//       alert('标签重复')
//     } else if (message === 'success') {
//       alert('添加成功')
//     }
//   },
//   removeTag: (id: string) => {
//     return tagListModel.remove(id)
//   },
//   updateTag: (id: string, name: string) => {
//     //Exclude表达除了id的tag属性
//     return tagListModel.update(id, name)
//   },
// }
