//Singleton
class User {
  constructor(userData) {
    if (User.exists) {
      return User.instance
    }

    this._userData = userData

    User.exists = true
    User.instance = this

    return this
  }

  getUserData() {
    return this._userData
  }

  setUserData(userData) {
    this._userData = userData
  }
}

const admin = new User('admin');
console.log(admin.getUserData());

const normalUser = new User('normalUser');
console.log(normalUser.getUserData());



//Budowniczy 
class Pizza {
  constructor(builder) {
    this.size = builder.size
    this.tomatoSauce = builder.tomatoSauce || false
    this.pepperoni = builder.pepperoni || false
    this.mozzarella = builder.mozzarella || false
  }
}

class PizzaBuilder {

  constructor(size) {
    this.size = size
  }

  addTomatoSauce() {
    this.tomatoSauce = true
    return this
  }

  addPepperoni() {
    this.pepperoni = true
    return this
  }

  addMozzarella() {
    this.mozzarella = true
    return this
  }

  build() {
    return new Pizza(this)
  }

}
const pizza = (new PizzaBuilder('medium'))
  .addTomatoSauce()
  .addPepperoni()
  .addMozzarella()
  .build()

console.log(pizza)



//Fabryka
class Factory {
  constructor() {
    this.build = (type) => {

      let vehicle

      if (type === 'car') {
        vehicle = new Car()
      }

      else if (type === 'bike') {
        vehicle = new Bike()
      }

      vehicle.new = function() {
        return `That's your new ${this._type}`
      }

      return vehicle
    }
  }
}

class Car {
  constructor() {
    this._type = 'car'
    this.ride = () => {
      return 'You ride a car'
    }
  }
}

class Bike {
  constructor() {
    this._type = 'bike'
    this.jump = () => {
      return 'You jumped on a bike.'
    }
  }
}

const factory = new Factory()

const myCar = factory.build('car')

const myBike = factory.build('bike')

console.log(myCar.new())
console.log(myCar.ride())
console.log(myBike.new())
console.log(myBike.jump())



//Prototyp 
const person = {
  name: 'Jan',
  surname: 'Kowlski',
  age: 23
};

const moreInfo = Object.create(person, { address: { street: 'Jana Pawla 2' } });

console.log(person);
console.log(moreInfo.__proto__);
console.log(moreInfo.__proto__ === person);



//Fasada
class Numbers {

  one() {
    console.log('1')
  }

  two() {
    console.log('2')
  }

  tree() {
    console.log('3')
  }

  four() {
    console.log('4')
  }
}

class NumbersFacade {
  constructor(numbers) {
    this.numbers = numbers
  }

  display() {
    this.numbers.one()
    this.numbers.two()
    this.numbers.tree()
    this.numbers.four()
  }
}

const numbers = new NumbersFacade(new Numbers())
numbers.display()



//Pyłek
class Pizza {
  constructor(type, price) {
    this.type = type
    this.price = price
  }
}

class PizzaFactory {
  constructor() {
    this._pizzas = []
  }

  makePizza(type, price) {
    let pizza = this.getPizza(type)
    if (pizza) {
      return pizza
    }
    else {
      const newPizza = new Pizza(type, price)
      this._pizzas.push(newPizza)

      return newPizza
    }
  }

  getPizza(type) {
    return this._pizzas.find(pizza => pizza.type === type)
  }
}

const pizzeria = new PizzaFactory()

const margherita = pizzeria.makePizza('tomato sauce and mozzarella', 17)
const dibolo = pizzeria.makePizza('tomato sauce, mozzarella, chill pepers, tabasco', 24)

console.log(pizzeria._pizzas)
console.log(margherita === dibolo)



//Pełnomocnik 
function getData(data) {
  return (data + ' not from cookies')
}

const cookies = [];
const getDataProxy = new Proxy(getData, {
  apply(target, thisArg, args) {
    const data = args[0]

    if (cookies.includes(data)) {
      return (data + ' from cookies')
    } 
    else {
      cookies.push(data)

      return Reflect.apply(target, thisArg, args)
    }
  }
})

console.log(getDataProxy('some data'))
console.log(getDataProxy('some data'))



//Dekorator
class Post {
  constructor(author, content) {
    this._author = author
    this._content = content
  }

   getPost() {
    return (this._author + ' - ' + this._content)
  }
}

const likePost = (post) => {
  post.isLiked = true
  post.unLike = () => {
    return('Unliked ' + post.getPost())
  }
  return post
}

const firstPost = likePost(new Post('Jan Kowalski', 'Uwielbiam wzorce projektowe'))

console.log(firstPost.isLiked)
console.log(firstPost.unLike())



//Łańcuch zobowiązań
class MultipleMultiplications {
  constructor(firstValue = 1) {
    this.sumOfMultiply = firstValue;
  }

  multiply(value) {
    this.sumOfMultiply = this.sumOfMultiply * value;
    return this;
  }
}

const sum = new MultipleMultiplications();
console.log(sum.multiply(4).multiply(3).multiply(2).sumOfMultiply);



//Strategia
class Breakfast {
  breakfast(eggType) {
    return eggType.prepTime();
  }
}

class Eggs {
  prepTime() {
    return this._timeToPrepare;
  }
}

class BoiledEggs extends Eggs {
  constructor() {
    super();
    this._timeToPrepare = 7;
  }
}

class ScrambledEggs extends Eggs {
  constructor() {
    super();
    this._timeToPrepare = 5;
  }
}

const food = new Breakfast();

console.log('You need '+ food.breakfast(new BoiledEggs()) + ' minutes to prepare boiled eggs')
console.log('You need '+ food.breakfast(new ScrambledEggs()) + ' minutes to prepare scrambled eggs')



//Konstruktor
class Item {
  constructor(name, color) {

    this._name = name
    this._color = color

    this.getDetails = () => {
      return (this._color + ' ' + this._name)
    }
  }
}
const ItemDescription = new Item('PC', 'Black')

console.log(ItemDescription.getDetails())