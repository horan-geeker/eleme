<template>
    <div class="goods">
        <div v-if="goods" class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
                    @click="selectMenu(index,$event)">
                    <span class="text">
                        <icon v-show="item.type > 0" :type="item.type" size="small-fullcolor-icon"></icon>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                            <div class="icon"><img width="57" height="57" :src="food.image"></div>
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
                                <div class="cart-wrapper">
                                    <cart-control @add="addFood" :food="food"></cart-control>
                                </div>
                            </div>
                        </li>

                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice"></shopcart>
        <food @add="addFood" ref="food" :food="selectedFood"></food>
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
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                    .text
                        &:after
                            border-top: none
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
                    line-height: 12px
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
                .cart-wrapper
                    position: absolute
                    right: 0
                    bottom: 12px
</style>

<script>
const ERR_OK = 0
import icon from 'components/icon/icon.vue'
import shopcart from 'components/shopcart/shopcart.vue'
import cartControl from 'components/cart-control/cart-control.vue'
import food from 'components/food/food.vue'
import BetterScroll from 'better-scroll'

export default{

    props: {
        seller: {}
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                var topHeight = this.listHeight[i]
                var bottomHeight = this.listHeight[i + 1]
                if (!bottomHeight || (this.scrollY >= topHeight && this.scrollY < bottomHeight)) {
                    return i
                }
            }
            return 0
        },
        selectFoods() {
            let foods = []
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    created() {
        this.$http.get('/api/goods').then((response) => {
            response = response.body
            if (response.errno === ERR_OK) {
                this.goods = response.data
                this.$nextTick(() => {
                    this._initScroll()
                    this._calculateHeight()
                })
            }
        })
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
    },
    components: {
        icon, shopcart, cartControl, food
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {
                click: true
            })
            this.foodsScroll = new BetterScroll(this.$refs.foodsWrapper, {
                probeType: 3,
                click: true
            })

            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            let height = 0
            this.listHeight.push(height)
            for (var i = 0; i < foodList.length; i++) {
                var item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        selectMenu(index, event) {
            if (!event._constructed) {
                return
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            let el = foodList[index]
            this.foodsScroll.scrollToElement(el, 300)
        },
        selectFood(food, event) {
            if (!event._constructed) {
                return
            }
            this.selectedFood = food
            this.$refs.food.changeShow()
        },
        addFood(target) {
            // 优化性能，异步执行下落动画
            this.$nextTick(() => {
                this.$refs.shopCart.drop(target)
            })
        }
    }
}

</script>
