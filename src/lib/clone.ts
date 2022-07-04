function clone<T>(data: T): T {
  //调用这个函数之后的数据是什么类型返回值就是什么类型，原来是any，修改原因是因为Statistics.vue里面的a/b报错
  return JSON.parse(JSON.stringify(data))
}

export default clone
