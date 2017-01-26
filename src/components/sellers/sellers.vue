<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="rating-count">({{seller.ratingCount}})</span>
                    <span>月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span>{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block shop-delivery">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span>{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span>{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite">
                    <i @click="toggleFavorite" class="icon-favorite" :class="{'active':favorite===true}"></i>
                    <div class="content">{{favorite?'已收藏':'收藏'}}</div>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <div class="title">公告与活动</div>
                <div class="content-wrapper">
                    <div class="content">{{seller.bulletin}}</div>
                    <ul class="supports">
                        <li v-for="item in seller.supports" class="support-item">
                            <icon :type="item.type" size="small-fullcolor-icon"></icon>
                            <span class="content">{{item.description}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="pics">
                <div class="title">商家实景</div>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="seller-info">
                <div class="title">商家信息</div>
                <ul class="info-list">
                    <li class="info" v-for="info in seller.infos">
                        {{info}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    @import "../../assets/scss/mixin"
    .seller
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .seller-content
            .overview
                margin: 18px
                position: relative
                .title
                    line-height: 14px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .desc
                    margin-top: 8px
                    font-size: 0
                    .star
                        display: inline-block
                    span
                        display: inline-block
                        font-size: 10px
                        color: rgb(77, 85, 93)
                    .rating-count
                        margin: 0 12px 0 8px
                .favorite
                    position: absolute
                    top: 0
                    right: 0
                    width: 30px
                    text-align: center
                    .icon-favorite
                        line-height: 24px
                        font-size: 24px
                        color: #d4d6d9
                        &.active
                            color: rgb(240, 20, 20)
                    .content
                        margin-top: 4px
                        line-height: 10px
                        font-size: 10px
                        color: rgb(77, 85, 93)
                .remark
                    display: flex
                    margin-top: 18px
                    padding-top: 18px
                    border-top: 1px solid rgba(7, 17, 27, 0.1)
                    .block
                        flex: 1
                        text-align: center
                        &.shop-delivery
                            border-left: 1px solid rgba(7, 17, 27, 0.1)
                            border-right: 1px solid rgba(7, 17, 27, 0.1)
                        h2
                            margin-bottom: 4px
                            line-height: 10px
                            font-size: 10px
                            color: rgb(147, 153, 159)
                        .content
                            line-height: 24px
                            font-size: 10px
                            color: rgb(7, 17, 27)
                            span
                                font-size: 24px
            .bulletin
                padding: 18px 18px 0 18px
            .title
                margin-bottom: 8px
                line-height: 14px
                color: rgb(7, 17, 27)
                font-size: 14px
            .content-wrapper
                padding: 0 12px 0 12px
                .content
                    line-height: 24px
                    font-size: 12px
                    color: rgb(240, 20, 20)
            .supports
                margin-top: 16px
                .support-item
                    padding: 16px 12px
                    border-top: 1px solid rgba(7, 17, 27, 0.1)
                    font-size: 0
                    .icon
                        display: inline-block
                        width: 16px
                        height: 16px
                        vertical-align: top
                        margin-right: 6px
                        background-size: 16px 16px
                        background-repeat: no-repeat
                    .content
                        line-height: 16px
                        font-size: 12px
                        color: rgb(7, 17, 27)
            .pics
                padding: 18px 0 18px 18px
                .title
                    margin-bottom: 14px
                    line-height: 14px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .pic-wrapper
                    width: 100%
                    overflow: hidden
                    white-space: nowrap
                    .pic-list
                        font-size: 0
                        .pic
                            display: inline-block
                            margin-right: 6px
                            &:last-child
                                margin-right: 0
            .seller-info
                padding: 18px
                .title
                    margin-bottom: 14px
                    line-height: 14px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .info-list
                    .info
                        line-height: 16px
                        padding: 16px 12px
                        border-top: 1px solid rgba(7, 17, 27, 0.1)
                        font-size: 12px
</style>
<script>
    import BetterScroll from 'better-scroll'
    import {saveToLocal, loadFromLocal} from 'assets/js/store'
    import star from 'components/star/star'
    import split from 'components/split/split'
    import icon from 'components/icon/icon'

    export default{
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite', false)
                })()
            }
        },
        watch: {
            seller() {
                console.log('watch')
                this.$nextTick(() => {
                    this._initScroll()
                    this._initPics()
                })
            }
        },
        mounted() {
            this.$nextTick(() => {
                this._initScroll()
                this._initPics()
            })
        },
        methods: {
            toggleFavorite(event) {
                if (!event._constructed) {
                    return
                }
                this.favorite = !this.favorite
                saveToLocal(this.seller.id, 'favorite', this.favorite)
            },
            _initScroll() {
                console.log('scroll')
                if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BetterScroll(this.$refs.seller, {
                            click: true
                        })
                    })
                } else {
                    console.log(this.scroll)
                    this.scroll.refresh()
                }
            },
            _initPics() {
                if (this.seller.pics) {
                    let picWidth = 120
                    let margin = 6
                    let width = (picWidth + margin) * this.seller.pics.length - margin
                    this.$refs.picList.style.width = width + 'px'
                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BetterScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            })
                        } else {
                            this.picScroll.refresh()
                        }
                    })
                }
            }
        },
        components: {
            star, split, icon
        }
    }

</script>
