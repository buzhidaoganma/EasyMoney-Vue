import clone from '@/lib/clone'
import createId from '@/lib/crateId'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //把store绑在Vue.prototype上，所以可以用
const localStorageKeyName = 'recordList'

// type RootState = {
//   recordList: RecordItem[]
//   tagList: Tag[]
//   currentTag?: Tag
// }放到全局的文件d.ts

const store2 = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    createRecordError: null,
    createTagError: null,
    tagList: [] as Tag[],
    currentTag: undefined, //
    // //data
    // count: 0,
  } as RootState,
  mutations: {
    fetchRecords(state) {
      const recordList = JSON.parse(
        window.localStorage.getItem(localStorageKeyName) || '[]',
      ) as RecordItem[]
      state.recordList = recordList //根据Vuex文档写返回值
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record)
      record2.createdAt = new Date().toISOString()
      state.recordList && state.recordList.push(record2) //state是肯定有的，所以可以省略判断
      store2.commit('saveRecords')
      // window.alert('已保存')
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
      // const tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      // return (state.tagList = tagList)
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if (!state.tagList || state.tagList.length === 0) {
        store2.commit('createTag', '衣')
        store2.commit('createTag', '食')
        store2.commit('createTag', '住')
        store2.commit('createTag', '行')
      }
    },
    createTag(state, name) {
      state.createTagError = null
      const names = state.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        // window.alert('标签名重复了')
        // return 'duplicated'
        state.createTagError = new Error('tag name duplicated')
        return
      } else {
        const id = createId().toString()
        state.tagList.push({ id: id, name: name })
        // state.saveTags()
        store2.commit('saveTags')
        // window.alert('添加成功')
        return 'success'
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },

    // findTag(state, id: string) {
    //   return state.tagList.filter((t) => t.id === id)[0]
    // },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0]
    },
    //代替findTag由于因为类型定义的问题，重新做了一次

    //updateTag(state,id: string,name:string) {//这个里面只能接受两个属性多了就报错
    updateTag(state, payload: { id: string; name: string }) {
      // const id = object.id
      // const name = object.name 可以析构成这样
      const { id, name } = payload

      const idList = state.tagList.map((item) => item.id)
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name)
        if (names.indexOf(name) >= 0) {
          // return 'duplicated'
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0]
          tag.name = name
          store2.commit('saveTags')
          // return 'success'在这里面是无法返回的
        }
      } else {
        // return 'not found'
      }
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store2.commit('saveTags')
        router.back() //this.$router.back()不能用this,但是我们之前提过$开头的实例就在Vue的原型上
        //上面那个Vue.prototype的方法不行直接去引用router就好了
      } else {
        window.alert('删除失败')
      }

      // return true
    },
  },
})

// console.log(store2.state.count)
// store2.commit('increment', 10)
// console.log(store2.state.count)

export default store2
