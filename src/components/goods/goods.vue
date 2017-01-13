<template>
    <div class="goods">
        <div v-if="goods" class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text">
                        <icon v-show="item.type > 0" :type="item.type" size="small-fullcolor-icon"></icon>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="icon"><img width="56" height="56" :src="food.image"></div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="description">{{food.description}}</p>
                                <div class="extra">
                                    <span class="month-sell">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span>￥{{food.price}}</span>
                                    <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="sass">
    @import "../../assets/scss/mixin"
    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        overflow: hidden

        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    font-size: 12px
                    line-height: 14px
                    @include border-1px(rgba(7, 17, 27, 0.1))
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat

    .foods-wrapper
        flex: 1
        .title
            padding-left: 14px
            height: 26px
            line-height: 26px
            border-left: 2px solid #d9dde1
            font-size: 12px
            color: rgb(147, 153, 159)
            background: #f3f5f7
        .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            @include border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
                margin-bottom: 0
            .icon
                flex: 0 0 57px
                margin-right: 10px
            .content
                .name
                    font-size: 14px
                    color: rgb(7, 17, 27)
                    line-height: 14px
                    margin: 2px 0 8px 0
                .description, .extra
                    font-size: 10px
                    color: rgb(147, 154, 159)
                    line-height: 10px
                .description
                    margin-bottom: 8px
                .month-sell
                    margin-right: 12px
                .price
                    font-size: 14px
                    color: rgb(240, 20, 20)
                    font-weight: 700
                    line-height: 28px
                    .old-price
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        font-weight: normal
                        text-decoration: line-through

</style>

<script>
const ERR_OK = 0
import icon from 'components/icon/icon.vue'
export default{

    props: {
        seller: {}
    },
    created () {
        this.$http.get('/api/goods').then((response) => {
            response = response.body
            if (response.errno === ERR_OK) {
                this.goods = response.data
            }
        })
    },
    data () {
        return {
            goods: null
        }
    },
    components: {
        icon
    }
}
</script>