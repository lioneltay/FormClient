const { map, values } = require("ramda")

Array.inspect = function() {
  return this.map(inspect)
}

const USERS = {
  1: { id: 1, name: "bob", hobby: "basketball" },
  2: { id: 2, name: "jim" },
  3: { id: 3, name: "nick" },
}

const inspect = x => (x.inspect ? x.inspect() : x)

const head = ([first]) => (first ? Maybe(first) : Nothing)

const Maybe = x => ({
  map: f => Maybe(f(x)),
  bind: f => f(x),
  inspect: () => `Maybe(${inspect(x)})`,
})

Maybe.of = x => Maybe(x)

const Nothing = {
  map: f => Nothing,
  bind: f => Nothing,
  inspect: () => `Nothing`,
}

const fetchUser = id =>
  Promise.resolve(USERS[id] ? Maybe.of(USERS[id]) : Nothing)

const fetchUsers = () => Promise.resolve(values(USERS))

const prop = propName => obj =>
  obj[propName] ? Maybe.of(obj[propName]) : Nothing

const getUserHobby = prop("hobby")

const fetchUserHobby = id => fetchUser(id).then()

fetchUsers()
  .then(head)
  .then(firstUser => firstUser.bind(getUserHobby))
  .then(console.log)
  .catch(console.log)
