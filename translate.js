const supportedLanguages = ['en', 'fr', 'es', 'de', 'ja', 'pt']
const defaultLanguage = 'en'

function changeBaseFontSize(size) {
	document.documentElement.style.setProperty('--font-size-base', size + 'rem')
}

function changeBaseGap(gap) {
	document.documentElement.style.setProperty('--base-gap', gap + 'rem')
}

function getQueryLanguage() {
	const urlParams = new URLSearchParams(window.location.search)
	return urlParams.get('lang')
}

function getSystemLanguage() {
	return navigator.language.slice(0, 2)
}

function getUserLanguage() {
	const queryLang = getQueryLanguage()
	if (queryLang && supportedLanguages.includes(queryLang)) {
		return queryLang
	}

	const systemLang = getSystemLanguage()
	return supportedLanguages.includes(systemLang) ? systemLang : defaultLanguage
}

async function loadTranslations(lang) {
	try {
		const response = await fetch(`./src/assets/locales/${lang}.json`)
		if (!response.ok) throw new Error('Translation file not found')
		return await response.json()
	} catch (error) {
		console.error('Error loading translations:', error)
		return {}
	}
}

async function applyTranslations() {
	const lang = getUserLanguage()

	if (lang === 'fr' || 'es' || 'de' || 'pt') {
		changeBaseFontSize(0.85)
		changeBaseGap(0.5)
	}
	const translations = await loadTranslations(lang)

	document.querySelectorAll('[data-i18n]').forEach((el, index) => {
		const key = el.dataset.i18n
		if (translations[key]) {
			let text = translations[key]

			if (el.dataset.price) {
				text = text.replace('{{price}}', el.dataset.price)
			}

			el.innerHTML = text
		}
	})
}

document.addEventListener('DOMContentLoaded', applyTranslations)
