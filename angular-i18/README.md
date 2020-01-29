## Followed following video and blog

https://www.youtube.com/watch?v=88hE8_M53SA and https://alligator.io/angular/internationalization/

## Build and Run

`xi18n` is used to extract out the locales file. Other configuration are in `angular.json` file.

### Via Docker

Build:

```
docker build -t frontend:latest .
```

Run:

```
docker run -p 9999:80 frontend:latest
```

Test: [http://localhost:9999/myapp-en/](http://localhost:9999/myapp-en/) and [http://localhost:9999/myapp-nl/](http://localhost:9999/myapp-nl/)
