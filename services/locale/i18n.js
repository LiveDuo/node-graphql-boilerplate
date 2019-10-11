import i18n from 'i18n'

const configure = () => i18n.configure({
	locales: ['en'],
	directory: __dirname + '../../../locales'
})

const locale = i18n.init

export { configure, locale }