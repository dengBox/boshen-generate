<template>
  <div style="padding=20px" class="code-wrap">
    <FormContainer
      :inline="formContainerInline_1"
      :labelPosition="formContainerLabelPosition_1"
      :labelWidth="formContainerLabelWidth_1"
    >
      <FormItem
        :label="formItemLabel_1"
        :placeholder="formItemPlaceholder_1"
        :disabled="formItemDisabled_1"
      >
        <Input
          :label="formItemLabel_2"
          :placeholder="formItemPlaceholder_2"
          :disabled="formItemDisabled_2"
        >
        </Input>
      </FormItem>
    </FormContainer>
    <true>
      <FormContainer
        :inline="formContainerInline_2"
        :labelPosition="formContainerLabelPosition_2"
        :labelWidth="formContainerLabelWidth_2"
      >
        <FormItem
          :label="formItemLabel_3"
          :placeholder="formItemPlaceholder_3"
          :disabled="formItemDisabled_3"
        >
          <Input
            :label="formItemLabel_4"
            :placeholder="formItemPlaceholder_4"
            :disabled="formItemDisabled_4"
          >
          </Input>
        </FormItem>
      </FormContainer>
    </true>
  </div>
</template>

<script>
export default {
  name: 'exportCode',
  data () {
    return {
      formContainerInline_1: false,
      formContainerLabelPosition_1: 'left',
      formContainerLabelWidth_1: 80,
      formItemLabel_1: '输入框',
      formItemPlaceholder_1: '请输入文字',
      formItemDisabled_1: false,
      formItemLabel_2: '输入框',
      formItemPlaceholder_2: '请输入文字',
      formItemDisabled_2: false,
      formContainerInline_2: false,
      formContainerLabelPosition_2: 'left',
      formContainerLabelWidth_2: 80,
      formItemLabel_3: '输入框',
      formItemPlaceholder_3: '请输入文字',
      formItemDisabled_3: false,
      formItemLabel_4: '输入框',
      formItemPlaceholder_4: '请输入文字',
      formItemDisabled_4: false
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

  <style scoped lang="less">
</style>
