//1

const calculateSquare = (arr) => arr.map((item) => Math.pow(item, 2));

//2

const sumCounters = (arr) =>
	arr.reduce(
		(previousValue, currentValue) => previousValue + currentValue.count,
		0
	);

//3

const actorInMovies = (movies, actor) => {
	return Object.keys(movies).reduce((acc, val) => {
		const movie = movies[val];
		const set = new Set([...movie.actors]);
		set.add(actor);
		return { ...acc, [val]: { ...movies[val], actors: [...set] } };
	}, {});
};

const movies = {
	big: {
		actors: ['Elizabeth Perkins', 'Robert Logi'],
	},
	'forrest gump': {
		actors: ['Tom Hanks', 'Robin Wright', 'Cacona Gonxales', 'Gray Sinisie'],
	},
	'cast away': {
		actors: ['Helen Hunt', 'Elizabeth Perkins', 'Paul Sanchez'],
	},
};

//4
const listActors = (movies) => {
	const set = new Set();
	for (const movie in movies) {
		movies[movie].actors.forEach((element) => {
			set.add(element);
		});
	}
	const body = document.body;
	const ul = document.createElement('ul');

	set.forEach((actor) => {
		ul.innerHTML += `<li>${actor}</li>`;
	});

	console.log(set.values());
	body.appendChild(ul);
};

//5
const fetchData = async () => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/post');
		const data = await res.json();

		const findPost = data.find(
			(post) => post.userId === 7 && post.title[0] === 'e'
		);
		console.log(findPost || undefined);
	} catch (error) {
		console.error(error);
	}
};

// fetchData();

//B
//1
const squares = calculateSquare;

//2
const sum = sumCounters;

//3
const moviesWithActor = actorInMovies;

//4
const treesAreEqual = (a, b) => {
	if (!a && !b) return true;
	if (!a || !b) return false;

	return (
		a.value === b.value &&
		treesAreEqual(a.left, b.left) &&
		treesAreEqual(a.right, b.right)
	);
};

const a = { value: 1, right: { value: 2 } };
const b = { value: 1, right: { value: 2 } };

// a
//           1
// 			/ \
//         2   3

// b
//             1
// 			  / \
//           2   3
//              /
//             4

// treesAreEqual(a,b) =>
// true && treesAreEqual(aL,bL) && treesAreEqual(aR,bR)
//  true &&
// 			true && treesAreEqual(aL,bL) && treesAreEqual(aR,bR)
//                   	 true      && false =>  false

//5
const formatted = (str, n) => {
	const strArr = str.split('').filter((element) => element !== '-');
	const firstGroup = strArr.length % n;

	const newArr = [];

	for (let i = 0; i < strArr.length; i++) {
		if (firstGroup === 0) {
			if (i !== 0 && i % n === 0) {
				newArr.push('-');
			}
		} else {
			if (i !== 0 && (i === firstGroup || i % n === 0)) {
				newArr.push('-');
				n += i;
			}
		}

		newArr.push(strArr[i]);
	}
	return newArr.join('');
};

const testSolutions = () => {
	const assert = (cond) => {
		if (!cond) throw new Error('assertion failure');
	};
	const arrEq = (a, b) => a.every((x, i) => x === b[i]);
	const occurences = (xs, x) =>
		xs.reduce((acc, y) => acc + (x === y ? 1 : 0), 0);
	const moviesAreValid = (movies, actor) => {
		for (const key in movies) {
			if (occurences(movies[key].actors, actor) !== 1) return false;
		}
		return true;
	};
	const deepFreeze = (x) => {
		if (Array.isArray(x)) {
			Object.freeze(x);
			x.forEach(deepFreeze);
		} else if (typeof x === 'object') {
			Object.freeze(x);
			for (const key in x) deepFreeze(x[key]);
		}
	};
	const movies1 = {
		big: {
			actors: ['Elizabeth Perkins', 'Robert Loggia'],
		},
		'forrest gump': {
			actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
		},
		'cast away': {
			actors: ['Helen Hunt', 'Paul Sanchez'],
		},
	};
	const movies2 = {
		'good will hunting': {
			actors: ['Robin Williams', 'Ben Affleck'],
		},
		'the departed': {
			actors: ['Leonardo DiCaprio', 'Matt Damon', 'Jack Nicholson'],
		},
	};

	deepFreeze(movies1);
	deepFreeze(movies2);
	const trees1 = [
		{ value: 1, left: { value: 2 }, right: { value: 3 } },
		{ value: 1, left: { value: 2 }, right: { value: 3 } },
	];
	const trees2 = [
		{ value: 1, left: { value: 2 } },
		{ value: 1, right: { value: 2 } },
	];
	const trees3 = [
		{ value: 1, left: { value: 2 }, right: { value: 3 } },
		{ value: 1, left: { value: 2 }, right: { value: 3, left: { value: 4 } } },
	];
	const trees4 = [
		{ value: 1, left: { value: 2 } },
		{ value: 1, right: { value: 2 } },
	];
	const trees5 = [
		{
			value: 1,
			left: { value: 2 },
			right: { value: 3, right: { value: 4, left: { value: 5 } } },
		},
		{
			value: 1,
			left: { value: 2 },
			right: { value: 3, right: { value: 4, left: { value: 5 } } },
		},
	];
	assert(arrEq(squares([2, 4, 6, 8, 10]), [4, 16, 36, 64, 100]));
	assert(arrEq(squares([17, 9, 186]), [289, 81, 34596]));
	assert(sum([{ count: 1 }, { count: 2 }, { count: 3 }]) === 6);
	assert(
		sum([{ count: 95 }, { count: 8 }, { count: 23 }, { count: 51 }]) === 177
	);
	assert(moviesAreValid(moviesWithActor(movies1, 'Tom Hanks'), 'Tom Hanks'));
	assert(moviesAreValid(moviesWithActor(movies2, 'Matt Damon'), 'Matt Damon'));
	assert(treesAreEqual(trees1[0], trees1[1]) === true);
	assert(treesAreEqual(trees2[0], trees2[1]) === false);
	assert(treesAreEqual(trees3[0], trees3[1]) === false);
	assert(treesAreEqual(trees4[0], trees4[1]) === false);
	assert(treesAreEqual(trees5[0], trees5[1]) === true);
	assert(formatted('3h5n-8v-7-m', 4) === '3h5n-8v7m');
	assert(formatted('4-3t-0-u', 2) === '4-3t-0u');
	assert(formatted('j-45i9ut5-34f-x10', 5) === 'j45i-9ut53-4fx10');
	console.log('passed');
};

testSolutions();
