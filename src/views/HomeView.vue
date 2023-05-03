<script setup>
import axios from 'axios'
import { message } from 'ant-design-vue'
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons-vue'

let steveData = reactive([])
let podcastList = reactive([])
let podcastData = reactive({})

let search_text = ref('')
const spinning = ref(true)
let isListened = ref(false)

const pagination = reactive({
  pageSize: 20,
  responsive: true,
  showSizeChanger: false,
  size: 'small',
  onChange: (page) => {
    document.querySelector('#app')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})

const onSearch = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    _getData()
  } else {
    _getData(value)
  }
}

const _getData = (search = '') => {
  spinning.value = true
  axios
    .get('static/data.json')
    .then((res) => {
      steveData = res.data['items']
      podcastData = {}
      steveData.forEach((e) => {
        let id = e.id
        let title = e.title
        let url = e.url
        let date = e.date_published.slice(0, 10)
        podcastData = {
          id: id,
          title: title,
          url: url,
          date: date,
          isListened: isListened
        }

        podcastList.push(podcastData)
      })

      if (search !== '') {
        podcastList = []
        search = search.trim()
        let searchList = []
        podcastList.forEach((e) => {
          if (e.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            searchList.push(e)
          }
        })

        steveData.forEach((e) => {
          if (e['title'].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            searchList = searchList.concat(e)
          }
          console.log(e)
        })

        podcastList = Array.from(new Set(searchList))
      }
      spinning.value = false
    })
    .catch(() => {
      message.error('获取数据失败！')
    })
}

onMounted(() => {
  _getData()
})

const setListened = () => {
  isListened.value = true
}
const resetListened = () => {
  isListened.value = false
}
</script>
<template>
  <main>
    <div class="search">
      <a-input-search
        v-model="search_text"
        placeholder="输入某条播客名称"
        enter-button="搜索..."
        @search="onSearch"
        allow-clear
      />
    </div>

    <div class="content">
      <a-spin :spinning="spinning">
        <a-list item-layout="horizontal" :pagination="pagination" :data-source="podcastList">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #title>
                  <div class="list-title">
                    <a target="_blank" :href="item.url">{{ item.title }}</a>
                    <span class="right-side"
                      >{{ item.date }}
                      <!-- <div class="icons">
                        <check-square-outlined
                          class="icon"
                          @click="resetListened"
                          v-if="item.isListened === true"
                        />
                        <close-square-outlined class="icon" @click="setListened" v-else />
                      </div> -->
                    </span>
                  </div>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-spin>
    </div>
  </main>
</template>

<style lang="scss" scoped>
$min-width: 1000px;

.list-title {
  font-size: 16px;
  font-weight: bolder;

  span {
    display: block;
  }
}

.search {
  margin: 0 auto;
  text-align: center;
  padding: 20px 10px;

  @media (min-width: $min-width) {
    width: 600px;
  }
}

.content {
  width: 100%;
  padding: 0px 80px 20px 80px;

  @media (max-width: $min-width) {
    padding: 0 20px 20px 20px;
  }

  .list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-side {
    display: flex;
    align-items: center;
  }

  .icons {
    font-size: 20px;
    cursor: pointer;
    margin: 0 0 4px 2px;
  }
}
</style>
