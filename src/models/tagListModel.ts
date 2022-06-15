const localStorageKeyName = 'tagList'
type Tag = {
  id: string
  name: string //我们目前没有生成id的手段，我们只能用name来当，等我们有了数据库就可以把id变成真正的数字或者字符串
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' //string //boolean用boolean值的方式显示报错 防止他们代码写错，
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
    // if (this.data.indexOf(name) >= 0) {
    //   //不能重复出现标签
    //   throw new Error('duplicated') //标签不能重复告诉用户原因
    // }
    this.data.push({ id: name, name: name })
    this.save()
    return 'success'
  },
  save() {
    window.localStorage.setItem(
      'localStorageKeyName',
      JSON.stringify(this.data),
    )
  },
}

export default tagListModel
