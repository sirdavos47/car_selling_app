const Car = require('../models/Car');

// UT: Car model basic tests
async function testCarModel() {
  // Test: create and save a car
  const car = new Car({
    title: 'Test Car',
    price: 10000,
    year: 2020,
    brand: 'TestBrand',
    model: 'TestModel',
    mileage: 50000,
    location: 'TestCity',
    seller: '507f1f77bcf86cd799439011', // dummy ObjectId
  });
  await car.validate();
  console.log('Car model validation passed');
}

if (require.main === module) {
  testCarModel().catch(e => {
    console.error('Car model test failed:', e.message);
    process.exit(1);
  });
}

module.exports = { testCarModel };
