<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <icon :type="seller.supports[0].type" size="large-icon"></icon>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="detailShow = !detailShow">
                <span class="count">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="detailShow = !detailShow">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img width="100%" height="100%" :src="seller.avatar">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <line-title-line title="优惠信息"></line-title-line>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="item in seller.supports">
                                <icon :type="item.type" size="large-icon"></icon>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <line-title-line title="商家公告"></line-title-line>
                        <div class="bulletin">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="detail-close" @click="detailShow = !detailShow"><i class="icon-close"></i></div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">
    @import "../../assets/scss/mixin";

    .header {
        position: relative;
        overflow: hidden;
        color: #fff;
        background: rgba(7, 17, 27, 0.5);

        .content-wrapper {
            position: relative;
            padding: 24px 12px 18px 24px;
            .avatar {
                display: inline-block;
                vertical-align: top;
                img {
                    border-radius: 2px;
                }
            }
            .content {
                display: inline-block;
                margin-left: 16px;

                .title {
                    margin: 2px 0 8px 0;

                    .brand {
                        display: inline-block;
                        vertical-align: top;
                        width: 30px;
                        height: 18px;
                        @include bg-image('brand');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name {
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                    }
                }

                .description {
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }

                .support {
                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                    }
                    .text {
                        vertical-align: top;
                        font-size: 10px;
                        line-height: 12px;
                    }
                }
            }
            .support-count {
                position: absolute;
                right: 12px;
                bottom: 14px;
                height: 24px;
                line-height: 24px;
                border-radius: 14px;
                padding: 0 8px;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.2);
                .count {
                    vertical-align: top;
                    font-size: 12px;
                }
                .icon-keyboard_arrow_right {
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 12px;
                }
            }
        }

        .bulletin-wrapper {
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(7, 17, 27, 0.2);
            .bulletin-title {
                display: inline-block;
                vertical-align: top;
                margin-top: 8px;
                width: 22px;
                height: 12px;
                @include bg-image('bulletin');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bulletin-text {
                vertical-align: top;
                margin: 0 4px;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                position: absolute;
                font-size: 10px;
                right: 12px;
                top: 8px;
            }
        }

        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(10px);
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity 1s;
            background: rgba(7, 17, 27, 0.8);
        }
        .fade-enter, .fade-leave-active {
            opacity: 0
        }

        .detail {
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(7, 17, 27, 0.8);

            .detail-wrapper {
                width: 100%;
                min-height: 100%;

                .detail-main {
                    margin-top: 64px;
                    padding-bottom: 64px;

                    .name {
                        line-height: 16px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 700;
                    }

                    .star-wrapper {
                        margin-top: 18px;
                        padding: 2px 0;
                        text-align: center;
                    }

                    .supports {
                        width: 80%;
                        margin: 0 auto;
                        .support-item {
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .icon {
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                vertical-align: top;
                                margin-right: 6px;
                                background-size: 16px 16px;
                            }
                            .text {
                                line-height: 12px;
                                font-size: 12px;
                            }
                        }
                    }

                    .bulletin {
                        width: 80%;
                        margin: 0 auto;
                        padding: 0 12px;
                        font-size: 12px;
                        line-height: 24px;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                    }

                }
            }

            .detail-close {
                position: relative;
                width: 32px;
                height: 32px;
                line-height: 32px;
                margin: -64px auto 0 auto;
                clear: both;
                font-size: 32px;
            }
        }

    }
</style>

<script>
import star from 'components/star/star.vue'
import icon from 'components/icon/icon.vue'
import lineTitleLine from './line-title-line'

export default{
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            detailShow: false
        }
    },
    created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
        showDetail () {
            this.detailShow = true
        },
        closeDetail () {
            this.detailShow = false
        }
    },
    components: {
        star, lineTitleLine, icon
    }
}
</script>