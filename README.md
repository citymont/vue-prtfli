vue-prtfli
==========

Small dynamic website configurated with one JSON & Vue.js

## Installation

```
$ npm install
$ npm run dev
$ grunt connect
```

## Dependencies
1. Browserify
2. Watchfiy
3. Grunt
4. Vue.js
5. Superagent
6. Bonzo
7. Bean

## Nginx config

Add this into yout vhost file
````
server {

  location / {
		try_files $uri /index.html;
	}
	
}
```

## Licence

MIT
