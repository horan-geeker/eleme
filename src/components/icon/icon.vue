<template>
    <span class="icon" :class="[size,iconType]"></span>
</template>
<style scoped lang="sass">
    @import "../../assets/scss/mixin"
    .small-icon
        &.decrease
            @include bg-image('decrease_1')

        &.discount
            @include bg-image('discount_1')

        &.guarantee
            @include bg-image('guarantee_1')

        &.invoice
            @include bg-image('invoice_1')

        &.special
            @include bg-image('special_1')

    .large-icon
        &.decrease
            @include bg-image('decrease_2')

        &.discount
            @include bg-image('discount_2')

        &.guarantee
            @include bg-image('guarantee_2')

        &.invoice
            @include bg-image('invoice_2')

        &.special
            @include bg-image('special_2')

    .small-fullcolor-icon
        &.decrease
            @include bg-image('decrease_3')

        &.discount
            @include bg-image('discount_3')

        &.guarantee
            @include bg-image('guarantee_3')

        &.invoice
            @include bg-image('invoice_3')

        &.special
            @include bg-image('special_3')

    .large-fullcolor-icon
        &.decrease
            @include bg-image('decrease_4')

        &.discount
            @include bg-image('discount_4')

        &.guarantee
            @include bg-image('guarantee_4')

        &.invoice
            @include bg-image('invoice_4')

        &.special
            @include bg-image('special_4')

</style>

<script>
export default{
    computed: {
        iconType () {
            let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            return classMap[this.type]
        }
    },
    props: {
        type: {
            type: Number
        },
        size: {
            type: String
        }
    }
}
</script>