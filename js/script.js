window.addEventListener('load', windowLoad)

function windowLoad() {
	// Create counter
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]")
		if (digitsCounters) {
			digitsCounters.forEach(digitsCounter => {
				digitsCountersAnimate(digitsCounter)
			})
		}
	}
	// Create animation
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null
		const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000
		const startValue = parseInt(digitsCounter.innerHTML)
		const startPosition = 0
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp
			const progress = Math.min((timestamp - startTimestamp) / duration, 1)
			digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue))
			if (progress < 1) {
				window.requestAnimationFrame(step)
			}
		}
		window.requestAnimationFrame(step)
	}
	// Run on page load, запуск при завантаженні сторінки
	// digitsCountersInit()

	// Run on scrolling, запуск при скролі
	let optionsDigitsCounter = {
		threshold: 0.3
	}
	let observer = new IntersectionObserver ((entries, observer) =>{
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target
				const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]")
				if (digitsCountersItems.length) {
					digitsCountersInit(digitsCountersItems)
				}
				//  Disable after one trigger, вимкнути після одного спрацювання
				observer.unobserve(targetElement)
			}
		})
	}, optionsDigitsCounter)
	let sections = document.querySelectorAll('.page__section')
	if (sections.length) {
		sections.forEach(section => {
			observer.observe(section)
		})
	}
}