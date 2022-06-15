const localStorageKeyName = 'tagList'
type TagListModel = {
  data: string[]
  fetch: () => string[]
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
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated'
    }
    // if (this.data.indexOf(name) >= 0) {
    //   //不能重复出现标签
    //   throw new Error('duplicated') //标签不能重复告诉用户原因
    // }
    this.data.push(name)
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
