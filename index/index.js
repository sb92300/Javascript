const daysOfWeek = ["Mon", "The", "Wed", "Thu", "Fri", "Sat", "Sun"];
const myInfo = {
    name : "Kim Seung Bin", 
    age : '28', city : 'Seoul', 
    contury : 'Korea',
    favorite : ['basketball', 'listening music', 'watching movie', 'coding']
    };
const game = [
    {
        openworld : 'RDR2'
    },
    {
        fps : 'COD WW2'
    },
    {
        aos : 'LOL'
    },
    {
        rpg : 'elencia'
    }
]

    myInfo.contury = 'USA';
console.log(daysOfWeek);
console.log(myInfo);
console.log(myInfo.favorite[2]);
console.log(game);
console.log(game[2])


function hello() {
    const value = document.getElementById('test').value;
    document.getElementById('test2').innerText = value;
}
