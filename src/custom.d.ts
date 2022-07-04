type RootState = {
  recordList: RecordItem[]
  tagList: Tag[]
  currentTag?: Tag
}

type RecordItem = {
  tags: Tag[]
  notes: string
  type: string
  amount: number //数据类型
  createdAt?: string //Date由于JSON转化数据类型的不存在Date,所以在转化Date时候只能转出成string｜｜undefined显示在TS里面
  //Object的分类就叫类/构造函数,?表示createdAt不存在
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
  // store: {
  //   //给window定义
  //   tagList: Tag[]
  //   createTag: (name: string) => void //返回值就是没有
  //   findTag: (id: string) => Tag | undefined
  //   removeTag: (id: string) => boolean
  //   updateTag: TagListModel['update'] //意思是我的类型跟上面的TagListModel一样
  //   recordList: RecordItem[]
  //   createRecord: (record: RecordItem) => void
  // }
}
