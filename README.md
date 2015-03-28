# Play RESTful CRUD generator 

>YoPlay is [Yeoman](http://yeoman.io) generator creating dev environment for [Play](https://www.playframework.com/) (Scala) + [Slick](http://slick.typesafe.com/) (by default with [H2](http://www.h2database.com/html/main.html) in memory database).

>In a few minutes you'll get:
- Out-of-the-box development environment
- Very basic, asynchronous CRUD for your entities - good for a starter/mocking backend 

## What do you need?
1. [Yeoman](http://yeoman.io) - Yeo is a super cool scraffolding tool, amazingly good in getting things done. If he was a real guy, he'd be my boyfriend. Easiest way to get him is with [npm](https://www.npmjs.com/):
```bash
npm install -g yo
```
2. [Typesafe activator](https://typesafe.com/get-started) - it takes over dirty job when Yeo is done. Just get it installed and add it to your path and later on you'll see how useful it is.

3. YoPlay - meaning this generator
```bash
 npm install -g generator-play-crud
```

## Get it generated!

 - Open a command line
 - Go to the directory where you want to have your project generated
 - Get it done:
```bash
 yo play-crud
```
This will generate ready-to-use Play project with your own package structure.

## Getting your CRUD
- Go to your root folder
- yo play-crud:crud
- Follow Yo instructions to add fields to your entity. Id is auto-generated Int
- Congrats it's done!!! Just remember to [apply evolution](#evolutions) if you have them turned on

You can see paths in conf/routes file, or just trust me, they are as follows:
 - GET        /your-entity    - returns Json with all your entities
 - POST       /your-entity   - expects Json with your entity, returns id
 - PUT       /your-entity    - expects Json with your entity, returns number of affected rows
 - GET        /your-entity/:id - returns your entity with id
 - DELETE     /your-entity/:id  - deletes your entity with id

## Managing your app (for those who are new to Typesafe activator)
- Running app:
```bash
 activator run
```
By default it will start on localhost:9000. If you want to debug just add -jvm-debug <debug-port>, and you'll be able to attach remote debugger from IntelliJ.

- Creating project for you favourite IDE
```bash
 activator idea
```
Obviously if you seriously think that something else suits you better you can replace idea with e.g.. eclipse.
- Btw. activator has also bunch of awesome (but unfortunately not interactive) [templates](https://typesafe.com/activator/templates) which can be a cornerstone for development too. It is just not that cool.

## Database
Communication with Db was configured with slick. By default it is H2 in memory DB (so you don't actually need to do anything to get it running). To change it e.g. to Postgres or something persistent just have a look at conf/application.conf file

```bash
db.default.driver=org.h2.Driver
db.default.url="jdbc:h2:mem:play"
db.default.user=sa
db.default.password=""
```
>You can declare as many datasources as you want. By convention, the default datasource is named `default`.
## Evolutions
Evolutions plugin will generate entire database schema for you. Just remember that after each change to the model you need to apply new evolution - the easiest way to do it is to go to your homepage (localhost:9000) and it will prompt you with super-scary-looking red page with 'APPLY EVOLUTION' button. That'll do the job.
Auto-generated evolutions drop entire database and re-create it, which in most cases of development, but if you want to get rid of it just go to application.conf and uncomment:
```bash
# evolutionplugin=disabled
```
Remember that now you need to take care of updating your database on your own. Conf/evolutions is a good place to put your sql files, numbers in the application order.

## Idiot-proofability
Neither this generator nor generated app is idiot-proof. That means that e.g. if you want to YoGenerate entity which already exists - I will not try to stop you.

## TODO list
- [x] Generating Play + Slick environment
- [x] Generating simple CRUD entity
- [ ] Adding more possible field-types
- [ ] Adding [type-safe ids](https://github.com/VirtusLab/unicorn)??

## License

MIT
