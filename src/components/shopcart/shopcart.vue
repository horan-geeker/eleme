<template>
    <div>
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="toggleList">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':count>0}">
                            <i class="icon-shopping_cart"></i>
                        </div>
                        <div class="num" v-show="count>0">{{count}}</div>
                    </div>
                    <div class="price" :class="{'highlight':count>0}">￥{{totalPrice}}</div>
                    <div class="description">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" :class="{'enough':totalPrice>=minPrice}">
                    {{payDesc}}
                </div>
            </div>
            <div class="ball-container">
                <transition v-for="ball in balls" name="drop" @before-enter="beforeEnter" @enter="enter"
                            @after-enter="afterEnter">
                    <div v-show="ball.show" class="ball">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
            <transition name="fold">
                <div v-show="listShow" class="shopcart-list">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cart-control-wrapper">
                                    <cart-control :food="food"></cart-control>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>

        </div>
        <transition name="fade">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>
<style lang="sass">
    @import "../../assets/scss/mixin"
    .shopcart
        position: fixed
        left: 0
        bottom: 0
        z-index: 50
        height: 48px
        width: 100%
        .content
            color: rgba(255, 255, 255, 0.4)
            display: flex
            background-color: #141d27
            .content-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    vertical-align: top
                    top: -10px
                    border-radius: 50%
                    background-color: #141d27
                    height: 56px
                    width: 56px
                    margin: 0 12px
                    padding: 6px
                    box-sizing: border-box
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        background-color: #2b343c
                        text-align: center
                        font-size: 24px
                        line-height: 48px
                        color: #80858a
                        &.highlight
                            background: rgb(0, 160, 220)
                            color: #ffffff
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-size: 9px
                        font-weight: 700
                        color: #ffffff
                        background: rgb(240, 20, 20)
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display: inline-block
                    vertical-align: top
                    margin-top: 12px
                    line-height: 24px
                    padding-right: 12px
                    box-sizing: border-box
                    border-right: 1px solid rgba(255, 255, 255, 0.1)
                    font-size: 16px
                    font-weight: 700
                    &.highlight
                        color: #ffffff
                .description
                    display: inline-block
                    vertical-align: top
                    margin: 12px 0 0 12px
                    line-height: 24px
                    font-size: 10px
                    color: #80858a
            .content-right
                flex: 0 0 105px
                text-align: center
                height: 48px
                line-height: 48px
                font-size: 12px
                font-weight: 700
                width: 105px
                background-color: #2b333b
                &.enough
                    background: #00b43c
                    color: #ffffff
        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: rgb(0, 160, 220)
                    transition: all 0.4s linear
        .shopcart-list
            position: absolute
            left: 0
            top: 0
            z-index: -1
            width: 100%
            transform: translate3d(0, -100%, 0)
            .list-header
                height: 40px
                line-height: 40px
                padding: 0 18px
                background: #f3f5f7
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                .title
                    float: left
                    font-size: 14px
                    color: rgb(7,17,27)
                .empty
                    float: right
                    font-size: 12px
                    color: rgb(0, 160, 220)
            .list-content
                max-height: 217px
                padding: 0 18px
                overflow: hidden
                background: #ffffff
                .food
                    position: relative
                    padding: 12px 0
                    box-sizing: border-box
                    @include border-1px(rgba(7,17,27,0.1))
                    .name
                        line-height: 24px
                        font-size: 14px
                    .price
                        position: absolute
                        right: 90px
                        bottom: 12px
                        line-height: 24px
                        font-size: 14px
                        font-weight: 700
                        color: rgb(240,20,20)
                    .cart-control-wrapper
                        position: absolute
                        right: 0
                        bottom: 6px

            &.fold-enter-active, &.fold-leave-active
                transition: all 0.5s
            &.fold-enter, &.fold-leave-active
                transform: translate3d(0, 0, 0)

    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 40
        backdrop-filter: blur(10px)
        opacity: 1
        background: rgba(7, 17, 27, 0.6)
        &.fade-enter-active, &.fade-leave-active
            transition: all 0.5s
        &.fade-enter, &.fade-leave-active
            opacity: 0
            background: rgba(7, 17, 27, 0)

</style>
<script>
    import cartControl from 'components/cart-control/cart-control.vue'
    import BetterScroll from 'better-scroll'
    export default{
        data() {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropBalls: [],
                fold: true
            }
        },
        computed: {
            totalPrice() {
                let totalPrice = 0
                this.selectFoods.forEach((food) => {
                    totalPrice += food.price * food.count
                })
                return totalPrice
            },
            count() {
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += food.count
                })
                return total
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return '￥' + this.minPrice + '元起送'
                } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
                    return '还差￥' + (this.minPrice - this.totalPrice) + '元起送'
                } else {
                    return '去结算'
                }
            },
            listShow() {
                if (!this.count) {
                    this.fold = true
                    return false
                }
                let show = !this.fold
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BetterScroll(this.$refs.listContent, {
                                click: true
                            })
                        } else {
                            this.scroll.refresh()
                        }
                    })
                }

                return show
            }
        },
        props: {
            selectFoods: {
                type: Array,
                default: function() {
                    return []
                }
            },
            deliveryPrice: {},
            minPrice: {}
        },
        methods: {
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i]
                    if (!ball.show) {
                        ball.show = true
                        ball.el = el
                        this.dropBalls.push(ball)
                        console.log(this.dropBalls)
                        return
                    }
                }
            },
            beforeEnter(el) {
                let count = this.balls.length
                while (count--) {
                    let ball = this.balls[count]
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect()
                        let x = rect.left - 32
                        let y = -(window.innerHeight - rect.top - 22)
                        console.log(rect, x, y)
                        el.style.display = ''
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`
                        el.style.transform = `translate3d(0,${y}px,0)`
                        let inner = el.getElementsByClassName('inner-hook')[0]
                        console.log(inner)
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                        inner.style.transform = `translate3d(${x}px,0,0)`
                    }
                }
            },
            enter(el) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)'
                    el.style.transform = 'translate3d(0,0,0)'
                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = 'translate3d(0,0,0)'
                    inner.style.transform = 'translate3d(0,0,0)'
                })
            },
            afterEnter(el) {
                let ball = this.dropBalls.shift()
                if (ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
            },
            toggleList() {
                if (!this.count) {
                    return
                }
                this.fold = !this.fold
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0
                })
            },
            hideList() {
                this.fold = true
            }
        },
        components: {
            cartControl
        }
    }
</script>
