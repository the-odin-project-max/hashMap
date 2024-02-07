class HashMap {
	constructor(buckets_size = 16, load_factor = 0.75) {
		this.buckets_size = buckets_size;
		this.buckets = new Array(this.buckets_size);
		this.load_factor = load_factor;
	}

	hash(key) {
		let hash = 0;
		const PRIME = 31;
		for (let i = 0; i < key.length; i++) {
			hash += PRIME * hash + key.charCodeAt(i);
			hash = hash % this.buckets_size;
		}
		return hash;
	}

	increaseSize() {
		this.buckets_size *= 2;
		const newBuckets = new Array(this.buckets_size);
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				const [key, value] = this.buckets[i];
				const index = this.hash(key);
				newBuckets[index] = [key, value];
			}
		}
		this.buckets = newBuckets;
	}

	set(key, value) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bound");
		}

		// if the key does not exist, create a new key-value pair
		if (!this.buckets[index]) {
			console.log("Inserting new key-value pair");
			this.buckets[index] = [key, value];
		} else if (this.buckets[index][0] === key) {
			console.log("Updating existing key-value pair");
			this.buckets[index][1] = value;
		}
		else if (this.buckets[index][0] !== key) {
			console.log("Collision, increase size and rehashing...");
			this.increaseSize();
			this.set(key, value);
		}

		if (this.length() / this.buckets_size > this.load_factor) {
			console.log("Load factor exceeded, increase size and rehashing...");
			this.increaseSize();
		}

	}

	get(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bound");
		}
		if (this.buckets[index] === undefined) {
			return null;
		}

		if (this.buckets[index][0] === key) {
			return this.buckets[index][1];
		}

		return null;
	}

	has(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bound");
		}
		return this.buckets[index] !== undefined;
	}

	remove(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bound");
		}
		if (this.buckets[index] === undefined) {
			return false;
		}

		if (this.buckets[index][0] === key) {
			this.buckets.splice(index, 1);
			return true;
		}
		return false;
	}
	
	length() {
		let count = 0;
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				count++;
			}
		}
		return count;
	}

	clear() {
		this.buckets = new Array(this.buckets_size);
	}

	keys() {
		const keys = [];
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				keys.push(this.buckets[i][0]);
			}
		}
		return keys;
	}

	values() {
		const values = [];
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				values.push(this.buckets[i][1]);
			}
		}
		return values;
	}

	entries() {
		const entries = [];
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				entries.push(this.buckets[i]);
			}
		}
		return entries;
	}
}

const hashMap = new HashMap();

console.log("Test Hash function (name) :", hashMap.hash("name"));
console.log("Test Hash function (age) :", hashMap.hash("age"));
console.log("Test Hash function (address) :", hashMap.hash("address"));

console.log(hashMap.entries());

hashMap.set("name", "John Doe");
hashMap.set("name", "Jonas");
hashMap.set("age", 30);

hashMap.set("address", "12 street, NY");

console.log(hashMap.entries());

console.log("Test get (name) :", hashMap.get("name")); // Jonas
console.log("Test get (address) :", hashMap.get("address")); // Jonas

console.log("Test has (name): ", hashMap.has("name")); // true
console.log("Test has (address): ", hashMap.has("address")); // true
console.log("Test has (dob): ", hashMap.has("dob")); // false

console.log("Test keys: ", hashMap.keys());
console.log("Test values: ", hashMap.values());

hashMap.remove("name");
console.log(hashMap.entries());
console.log(hashMap.length());
hashMap.set("name", "Jonas");
console.log(hashMap.length());

hashMap.clear();
console.log(hashMap.entries());