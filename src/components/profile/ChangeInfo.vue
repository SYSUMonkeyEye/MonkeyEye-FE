<template lang="pug">
  div#change-info
    md-toolbar
      div.md-toolbar-container
        md-button.md-icon-button(@click.native="$router.back()")
          md-icon keyboard_arrow_left
        h2.md-title 修改{{name}}
        md-button.md-icon-button(disabled)
          md-icon
    form.form(v-if="type == 'head'")
      img#head(:src="file.url")
    form.form(v-else, novalidate, @submit.stop.prevent='submit')
      div(v-if="type == 'login' || type == 'pay'")
        md-input-container
          md-icon keyboard
          label 输入旧{{name}}
          md-input(type='password', required, v-model="val.old")
          span.md-error {{err.old}}
        md-input-container
          md-icon keyboard
          label 输入新的{{name}}
          md-input(type='password', required, v-model="val.new")
          span.md-error {{err.new}}
        md-input-container
          md-icon keyboard
          label 重复新的{{name}}
          md-input(type='password', required, v-model="val.repeat")
          span.md-error {{err.repeat}}
      div(v-else)
        md-input-container
          md-icon settings
          label 输入新的{{name}}
          md-input(type='text', required, v-model="val.normal")
          span.md-error {{err.normal}}
    div#file-btn(v-if="type == 'head'")
      md-button.md-raised.md-primary#select(v-show="type == 'head'", @click.native="select") 选择
      md-button.md-raised.md-primary#upload(v-show="type == 'head'", @click.native="upload") 提交
    div(v-else)
      md-button.md-raised.md-primary#change(@click.native="change") {{type != 'head' ? '修改' : '上传' }}
    load(:loading="loading", :done="done")  
    md-dialog-alert(:md-content="resultText", @close="closeDialog", md-ok-text="确定", ref="dialog")
</template>
<script>
import axios from 'axios'
import Form from '../../common/utils/Form'
import load from '../auth/Load.vue'
import md5 from 'MD5'
export default {
  name: 'user-info',
  components: {
    load: load
  },
  data () {
    return {
      file: {
        url: this.$store.state.auth.user.avatar,
        content: ''
      },
      resultText: '!',
      status: '',
      done: false,
      loading: false,
      val: {
        normal: '',
        old: '',
        new: '',
        repeat: ''
      },
      type: this.$route.query.type,
      name: this.$route.query.name,
      err: {
        normal: '',
        old: '',
        new: '',
        repeat: ''
      },
      alert: {
        content: '',
        ok: '确定'
      }
    }
  },
  methods: {
    reset () {
      for (let key in this.err) this.err[key] = ''
    },
    closeDialog () {
      if (this.status === 200) {
        this.$router.push('/main/me')
      }
    },
    select () {
      Form.upload((data) => {
        this.file.url = data.url
        this.file.content = data.file
      })
    },
    upload () {
      this.loading = true
      let d1 = new Date().getTime()
      axios.patch('/api/users/', Form.generateFrom({
        avatar: this.file.content
      })).then((res) => {
        let d2 = new Date().getTime()
        setTimeout(() => {
          this.done = true
          this.$store.commit('UPDATE_USER', ['avatar', this.file.url])
          setTimeout(() => {
            this.$router.push('/main/me')
          }, 500)
        }, d2 - d1 < 1000 ? 1000 : 0)
      })
    },
    change () {
      this.reset()
      let d1 = new Date().getTime()
      if (this.type === 'login' || this.type === 'pay') {
        if (!this.val.old) {
          this.err.old = '旧' + this.name + '不等为空'
        } else if (!this.val.new) {
          this.err.new = '新' + this.name + '不等为空'
        } else if (this.val.new !== this.val.repeat) {
          this.err.repeat = '两次密码不一致'
        } else {
          this.loading = true
          let word = 'password'
          if (this.type === 'pay') word = 'payPassword'
          let url = '/api/password/' + (this.type + 'Password')
          let data = {}
          data['new_' + word] = md5(this.val.new)
          data[word] = md5(this.val.old)

          // 提交请求
          axios.patch(url, Form.generateFrom(data)).then((res) => {
            let d2 = new Date().getTime()
            setTimeout(() => {
              if (res.status !== 200) {
                this.err.old = res.data.message
                this.loading = false
              } else {
                this.done = true
                setTimeout(() => {
                  if (this.type === 'login') {
                    this.$store.dispatch('LOGOUT').then(() => {
                      this.$router.push('/main/me')
                    })
                  } else {
                    this.$router.push('/main/me')
                  }
                }, 500)
              }
            }, d2 - d1 < 1000 ? 1000 : 0)
          })
        }
      } else {
        if (!this.val.normal) {
          this.err.normal = this.name + '不等为空'
          return
        } else {
          this.loading = true
          var data = {}
          data[this.type] = this.val.normal
          axios.patch('/api/users/', Form.generateFrom(data)).then((res) => {
            let d2 = new Date().getTime()
            setTimeout(() => {
              this.done = true
              this.resultText = res.message
              this.status = res.status
              this.$store.commit('UPDATE_USER', [this.type, this.val.normal])
              setTimeout(() => {
                this.$router.push('/main/me')
              }, 500)
            }, d2 - d1 < 1000 ? 1000 : 0)
          })
        }
      }
    }
  }
}
</script>

<style lang="sass">
#change-info
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
    .user-info
  .form
    width: 80%
    margin: 0 auto
  #head
    display: block
    margin: 0.1rem auto
    width: 1.6rem
    height: 1.6rem
    border-radius: 0.8rem
  #file-btn
    padding: 0.1rem
    #select, #upload
      width: 48%
      display: inline-block 
    #select
      margin: 0 0.05rem 0 0
    #upload
      margin: 0 0 0 0.05rem
  #change
    display: block
    width: 90%
    margin: 0.5rem auto 0 auto
  .md-error
    padding-top: 0.1rem
    color: red
    opacity: 1 !important
</style>
