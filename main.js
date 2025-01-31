const subscriptions = document.querySelectorAll('.subscription')
const continueButton = document.querySelector('.continue')

// click on subscribe
subscriptions.forEach(subscription => {
	subscription.addEventListener('click', () => {
		subscriptions.forEach(sub => sub.classList.remove('active'))
		subscription.classList.add('active')
	})
})

//select and pay subscribe
continueButton.addEventListener('click', () => {
	const activeSubscription = document.querySelector('.subscription.active')

	if (activeSubscription) {
		let url = activeSubscription.querySelector('.yearly') ? 'https://apple.com/' : 'https://google.com/'

		window.open(url, '_blank')
	}
})
