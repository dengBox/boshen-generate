<template>
  <div style="padding: 10px" id="demo-app" class="code-wrap">
    <g-form-model
      :model="g_form"
      ref="testForm"
      :rules="g_form_model_rules_1"
      :label-col="{span: 4}"
      :wrapper-col="{span:14}"
    >
   <span slot="tags" slot-scope="tags"><g-tag v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">{{ tag.toUpperCase() }}</g-tag></span>
      <g-form-model-item label="Activity name">
        <g-input v-model="g_form.name" placeholder="please enter your name">
        </g-input>
      </g-form-model-item>
      <g-form-model-item label="Activity zone">
        <g-select
          v-model="g_form.region"
          placeholder="please select your zone"
          @change="g_selectChange"
        >
          <g-select-option v-for="g_item in g_selectOptions" :key="g_item.key">
            {{ g_item.label }}
          </g-select-option>
        </g-select>
      </g-form-model-item>
      <g-form-model-item label="Activity zone">
        <g-checkbox-group v-model="g_form.type">
          <g-checkbox value="1" name="type"> Online </g-checkbox>
          <g-checkbox value="2" name="type"> Promotion </g-checkbox>
          <g-checkbox value="3" name="type"> Offline </g-checkbox>
        </g-checkbox-group>
      </g-form-model-item>
      <g-form-model-item label="Resources">
        <g-radio-group v-model="g_form.resource">
          <g-radio value="1"> Sponsor </g-radio>
          <g-radio value="2"> Venue </g-radio>
        </g-radio-group>
      </g-form-model-item>
      <g-form-model-item label="Activity form">
        <g-input v-model="g_form.desc" type="textarea"> </g-input>
      </g-form-model-item>
      <g-form-model-item :wrapper-col="{span: 14, offset: 4}">
        <g-button type="primary" @click="g_onSubmit"> Create </g-button>
        <g-button style="margin-left: 10px" type="primary" @click="g_onCancle">
          Cancel
        </g-button>
      </g-form-model-item>
    </g-form-model>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      'g_form': {
        'name': '张三',
        'region': 'options1',
        'date1': '2021-6-23',
        'delivery': '2021-6-23',
        'type': [],
        'resource': '',
        'desc': ''
      },
      'g_selectOptions': [
        {
          'label': '选项一',
          'key': 'options1'
        },
        {
          'label': '选项二',
          'key': 'options2'
        },
        {
          'label': '选项三',
          'key': 'options3'
        }
      ],
      g_form_model_rules_1:
      {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
      }
      // {
      //   'name': [{ 'required': true, 'message': 'Please input Activity name', 'trigger': 'blur' }]
      // }
    }
  },
  methods: {
    g_selectChange: function (value, option) { console.log('value', value) },
    g_onSubmit: function () { console.log('submit!', this.g_form) },
    g_onCancle: function () { this.$refs.testForm.resetFields() }
  },
  created: function () { console.log('page-created') },
  mounted: function () { console.log('page-mounted') },
  destroyed: function () { console.log('page-destroyed') }
}
</script>

      <style scoped lang="less">
</style>
