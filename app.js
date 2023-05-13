const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const PORT = 3000
const session = require('express-session')
const usePassport = require('./config/passport')

const passport = require('passport')

const db = require('./models')
const Todo = db.Todo
const User = db.User


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)


app.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then(todos => {
      return res.render('index', { todos })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

app.get('/todos/new', (req, res) => {
  console.log(req.user.id)
  res.render('new')
})

app.post('/todos', (req, res) => {
  const UserId = req.user.id
  const { name } = req.body
  Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo =>
      res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
})

app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findByPk(id)
    .then(todo => {
      console.log(todo)
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})