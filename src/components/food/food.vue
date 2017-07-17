<template>
    <transition name="move">
        <div v-show="detail" class="food" ref="food">
            <div class="food-content">
                <div class="img-header">
                    <img :src="food.image">
                    <i class="icon-arrow_lift" @click="changeShow"></i>
                </div>
                <div class="content">
                    <div class="title">{{food.name}}</div>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cart-control-wrapper">
                        <cart-control @add="addFood" :food="food"></cart-control>
                    </div>
                    <transition name="fade">
                        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
                            加入购物车
                        </div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <rating-select @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>

                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="rateShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text"><i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<style lang="sass">
    @import "../../assets/scss/mixin"
    .food
        position: fixed
        top: 0
        left: 0
        width: 100%
        bottom: 48px
        z-index: 30
        background: #ffffff
        &.move-enter-active, &.move-leave-active
            transition: all 0.2s linear
        &.move-enter, &.move-leave-active
            transform: translateX(100%)
        .img-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
            .icon-arrow_lift
                display: block
                position: absolute
                top: 10px
                left: 0
                padding: 10px
                font-size: 20px
                color: #ffffff
        .content
            position: relative
            padding: 18px
            .title
                margin-bottom: 8px
                line-height: 14px
                font-size: 14px
                font-weight: 700
                color: rgb(7, 17, 27)
            .detail
                height: 10px
                margin-bottom: 18px
                line-height: 10px
                font-size: 0
                .sell-count, .rating
                    font-size: 10px
                    color: rgb(147, 153, 159)
                .sell-count
                    margin-right: 16px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(240, 20, 20)
                .old
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .cart-control-wrapper
                position: absolute
                right: 12px
                bottom: 12px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                border-radius: 12px
                font-size: 10px
                color: #fff
                background: rgb(0, 160, 220)
                opacity: 1
                &.fade-enter-active, &.fade-leave-active
                    transition: all 0.2s
                &.fade-enter, &.fade-leave-active
                    opacity: 0
                    z-index: -1
        .info
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 6px
                font-size: 14px
                color: rgb(7, 17, 27)
            .text
                line-height: 24px
                padding: 0 8px
                font-size: 12px
                color: rgb(77, 85, 93)
        .rating
            padding-top: 18px
            .title
                line-height: 14px
                margin-left: 18px
                font-size: 14px
                color: rgb(7, 17, 27)
            .rating-wrapper
                padding: 0 18px
                .rating-item
                    position: relative
                    padding: 16px 0
                    @include border-1px(rgba(7, 17, 27, 0.1))
                    .user
                        position: absolute
                        right: 0
                        top: 16px
                        line-height: 12px
                        font-size: 0
                        .name
                            display: inline-block
                            margin-right: 6px
                            vertical-align: top
                            font-size: 10px
                            color: rgb(147, 153, 159)
                        .avatar
                            border-radius: 50%
                    .time
                        margin-bottom: 6px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .text
                        line-height: 16px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                        .icon-thumb_up, .icon-thumb_down
                            margin-right: 4px
                        .icon-thumb_up
                            color: rgb(0, 160, 220)
                        .icon-thumb_down
                            color: rgb(147, 153, 159)


</style>
<script>
    import Vue from 'vue'
    import {formatDate} from 'assets/js/date.js'
    import BetterScroll from 'better-scroll'
    import cartControl from 'components/cart-control/cart-control'
    import split from 'components/split/split'
    import ratingSelect from 'components/rating-select/rating-select'

    const ALL = 2

    export default{
        props: {
            food: {}
        },
        data() {
            return {
                detail: false,
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        methods: {
            changeShow() {
                this.detail = !this.detail
                if (this.detail) {
                    this.selectType = ALL
                    this.onlyContent = false
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BetterScroll(this.$refs.food, {
                                click: true
                            })
                        } else {
                            this.scroll.refresh()
                        }
                    })
                }
            },
            addFirst(event) {
                if (!event._constructed) {
                    return
                }
                console.log(event.target)
                this.$emit('add', event.target)
                Vue.set(this.food, 'count', 1)
            },
            addFood(target) {
                this.$emit('add', target)
            },
            selectRating(type) {
                this.selectType = type
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            },
            rateShow(type, content) {
                if (this.onlyContent && !content) {
                    return false
                }
                if (this.selectType === ALL) {
                    return true
                } else {
                    return type === this.selectType
                }
            }
        },
        components: {
            cartControl, split, ratingSelect
        },
        filters: {
            formatDate(time) {
                let date = new Date(parseInt(time))
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        }
    }

</script>
