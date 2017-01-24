<template>
    <div>
        <v-header :seller="seller"></v-header>
        <div class="tab">
            <div class="tab-item">
                <router-link :to="{path:'/goods'}">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link :to="{path:'/ratings'}">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link :to="{path:'/sellers'}">商家</router-link>
            </div>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
import header from './components/header/header.vue'
const ERR_OK = 0
export default{
    created() {
        this.$http.get('/api/sellers').then((response) => {
            response = response.body
            if (response.errno === ERR_OK) {
                this.seller = response.data
            }
        })
    },
    data() {
        return {
            seller: {}
        }
    },
    components: {
        'v-header': header
    }
}
</script>

<style lang="sass">
    @import "assets/scss/mixin"
    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50
        margin-top: 60px

    .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        @include border-1px(rgba(7,17,27,0.1))
        .tab-item
            flex: 1
            text-align: center

            a
                display: block
                font-size: 14px
                color: rgb(77, 85, 93)

            a.active
                color: rgb(240, 20, 20)
</style>
