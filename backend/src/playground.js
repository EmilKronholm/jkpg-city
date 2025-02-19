const fs = require('fs');

const data = fs.readFileSync('data.json', 'utf8');
const jsonData = JSON.parse(data);

const uniqueTags = jsonData.reduce((acc, item) => {
    // console.log(item)
    if (!acc.includes(item.district)) {
        acc.push(item.district);
    }
    return acc;
}, []);

console.log(uniqueTags);

/*
[
  'Öster',
  null,
  'Väster',
  'Tändsticksområdet',
  'Atollen',
  'Resecentrum'
]
*/