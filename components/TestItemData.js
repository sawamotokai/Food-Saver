const TestItemData = [
    {
        id: 1,
        name: "onion",
        date: "1/1/20"
    },
    {
        id: 2,
        name: "beef",
        date: "1/1/20"
    },
    {
        id: 3,
        name: "spinach",
        date: "1/1/20"
    },
    {
        id: 4,
        name: "orange",
        date: "1/1/20"
    }
]

const ObjectsToCsv = require('objects-to-csv');


// class Test {
//     constructor(id, name, date) {
//     this.id = id;
//     this.name = name;
//     this.date = date;
//     }
// };
 
// // Sample data - two columns, three rows:
// const data = [
//     new Test('020','Apple','01/02/20'),
//     new Test('4','Spinach','01/03/20')
// ];
 
// If you use "await", code must be inside an asynchronous function:
(async () => {
  const csv = new ObjectsToCsv(TestItemData);
 
  // Save to file:
  await csv.toDisk('./test.csv');
  console.log(await csv.toString());
})();

