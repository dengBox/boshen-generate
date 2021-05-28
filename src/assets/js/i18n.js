import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('@/locale', true, /[A-Za-z0-9-_,\s]+\.js$/i)
  const uiLocales = require.context('shsc-ui/lib/locale/lang', true, /[A-Za-z0-9-_,\s]+\.js$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const name = matched[1]
      // en: Object.assign(enLocal, en),
      // 因为export default打包后会导出一个default对象
      let locale = locales(key).default
      if (uiLocales(key)) {
        locale = Object.assign(locales(key).default, uiLocales(key).default)
      }
      messages[name] = locale
    }
  })
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
