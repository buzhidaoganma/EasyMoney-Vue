import clone from '@/lib/clone'
import createId from '@/lib/crateId'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //把store绑在Vue.prototype上，所以可以用
const localStorageKeyName = 'recordList'

const store2 = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    // //data
    // count: 0,
  },
  mutations: {
    fetchRecords(state) {
      const recordList = JSON.parse(
        window.localStorage.getItem(localStorageKeyName) || '[]',
      ) as RecordItem[]
      state.recordList = recordList //根据Vuex文档写返回值
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record)
      record2.createdAt = new Date()
      state.recordList && state.recordList.push(record2) //state是肯定有的，所以可以省略判断
      store2.commit('saveRecords')
      console.log(state.recordList)
      // recordStore.saveRecords()
    },
    saveRecords(state) {
      window.localStorage.setItem(
        localStorageKeyName,
        JSON.stringify(state.recordList),
      )
    },
    // //methods,在这里面不能用this,所以你要传的时候用两个参数（这里填的东西就是代替this,某某）
    // increment(state, n: number) {
    //   state.count += n
    // }, //调用这个的时候不能直接用.需要用它封装好的API，store.commit('increment')

    fetchTags(state) {
      const tagList = JSON.parse(
        window.localStorage.getItem(localStorageKeyName) || '[]',
      )
      return (state.tagList = tagList)
    },
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了')
        return 'duplicated'
      } else {
        const id = createId().toString()
        state.tagList.push({ id, name: name })
        // state.saveTags()
        store2.commit('saveTags')
        window.alert('添加成功')
        return 'success'
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
  },
})

// console.log(store2.state.count)
// store2.commit('increment', 10)
// console.log(store2.state.count)

export default store2
