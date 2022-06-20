import createId from '@/lib/crateId'

const localStorageKeyName = 'tagList'
type Tag = {
  id: string
  name: string //我们目前没有生成id的手段，我们只能用name来当，等我们有了数据库就可以把id变成真正的数字或者字符串
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' //string //boolean用boolean值的方式显示报错 防止他们代码写错，
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void //不返回
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem('localStorageKeyName') || '[]',
    )
    return this.data
  },
  create(name: string) {
    //这里的this.data=[{id:'1',name:'1'},{id:'2',name:'2'}]

    const names = this.data.map((item) => item.name) //就是把data里面所有name收集起来产生一个新的数组
    if (names.indexOf(name) >= 0) {
      return 'duplicated'
    }
    const id = createId().toString()
    // if (this.data.indexOf(name) >= 0) {
    //   //不能重复出现标签
    //   throw new Error('duplicated') //标签不能重复告诉用户原因
    // }
    this.data.push({ id, name: name })
    this.save()
    return 'success'
  },
  update(id, name) {
    const idList = this.data.map((item) => item.id)
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        return 'duplicated'
      } else {
        const tag = this.data.filter((item) => item.id === id)[0]
        tag.name = name
        this.save()
        return 'success'
      }
    } else {
      return 'not found'
    }
  },
  save() {
    window.localStorage.setItem(
      'localStorageKeyName',
      JSON.stringify(this.data),
    )
  },
  remove(id: string) {
    let index = -1
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i
        break
      }
    }
    this.data.splice(index, 1)
    this.save() //删除之后保存数据
    return true
  },
}

export default tagListModel
