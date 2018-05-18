<template>
    <div>
        <mt-popup v-model="show" position="bottom">
            <div class="toolbar">
                <span class="left btn" @click="pitchOff">取消</span>
                <span :class="['right', 'btn']" @click="confirm">完成</span>
            </div>
            <mt-picker
                    :slots="slots"
                    @change="onValuesChange"
                    :itemHeight="33"
                    value-key="name">
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>

export default {
    props: ['show'],
    data() {
        return {
            slots: [
                {
                    flex: 1,
                    values: [
                        {
                            disable: false,
                            id: 1,
                            name: '男'
                        },
                        {
                            disable: false,
                            id: 2,
                            name: '女'
                        }
                    ]
                }
            ],
            // show: this.popupVisible,
            selected: '',
            doNotChoose: false
        };
    },
    methods: {
        onValuesChange(picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            };
            this.selected = values[0].name;
        },
        pitchOff() {
            this.$emit('hide', false);
        },
        confirm() {
            this.pitchOff();
            this.$emit('selectSex', this.selected);
        }
    }
};
</script>
<style>
    .mint-popup-bottom,
    .picker{
        width: 100%;
    }
</style>
<style lang="less" scoped rel="stylesheet/less">
    .toolbar{
        height: 44px;
        font-size: 17px;
        line-height: 44px;
        color: #3B4144;
        text-align: center;
        background: #f5f5f5;
        .btn{
            width: auto;
            font-size: 16px;
            line-height: 22px;
            padding: 12px 13px;
        }
        .left{
            float: left;
            color: #9b9b9b;
        }
        .right{
            float: right;
            color: #4a4a4a4;
        }
        .notchoose{
            color: #ccc;
        }
    }
</style>
