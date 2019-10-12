import nodeCache from 'node-cache'
const cache = new nodeCache()

const getCachedThenQuery = async (key, promise) => {
	let result = await cache.get(key)
	if (!result) {
		result = await promise
		cache.set(key, result)
	}
	return result
}

export { getCachedThenQuery }