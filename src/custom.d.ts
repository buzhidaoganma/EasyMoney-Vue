type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number //数据类型
  createdAt?: Date //Object的分类就叫类/构造函数,?表示createdAt不存在
}

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

interface Window {
  //给window定义
  tagList: Tag[]
}
