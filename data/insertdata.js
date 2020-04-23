// make 20000 records
var faker = require('faker');
// myscript.js
// This example uses Node 8's async/await syntax.
var mysql      = require('mysql');
//const oracledb = require('oracledb');
//const jsStringEscape = require('js-string-escape')
//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

/*const mypw = 'LBSPWD'  // set mypw to the hr schema password

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"
            });
            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }
            for (var i = 0; i < 20000; i++) {
                var name = faker.commerce.productName();            

                var country = faker.address.country();
                var director = faker.name.firstName() + ' ' + faker.name.lastName();
                var genre = faker.random.word();
                var year = Math.floor(getRandomArbitrary(1900, 2021));
                var rating = Math.floor(getRandomArbitrary(1, 11));
                //var company = faker.company.companyName();
                //var color = faker.commerce.color();
                var reg = new RegExp('\'', "g");
                name = name.replace(reg, ' ');
                country = country.replace(reg, ' ');
                director = director.replace(reg, ' ');
                genre = genre.replace(reg, ' ');

                //console.log(name + '/' + price + '/' + country + '/' + material + '/' + company + '/' + color);
                await connection.execute(
                    `begin insert into movie (name, country, director, genre, year, rating) values ('${name}','${country}', '${director}', '${genre}', '${year}', '${rating}');commit;end;`
                    //            // bind value for :id
                );
            }


       //     const result = await connection.execute(
       //         `SELECT manager_id, department_id, department_name
       //FROM departments
       //WHERE manager_id = :id`,
       //         [103],  // bind value for :id
       //     );
       //     console.log(result.rows);

        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

run();*/



var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1',
    database : 'localtest'
});

connection.connect();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
for (var i = 0; i < 20000; i++) {
    var name = faker.commerce.productName();

    var country = faker.address.country();
    var director = faker.name.firstName() + ' ' + faker.name.lastName();
    var genre = faker.random.word();
    var year = Math.floor(getRandomArbitrary(1900, 2021));
    var rating = Math.floor(getRandomArbitrary(1, 11));
    //var company = faker.company.companyName();
    //var color = faker.commerce.color();
    var reg = new RegExp('\'', "g");
    name = name.replace(reg, ' ');
    country = country.replace(reg, ' ');
    director = director.replace(reg, ' ');
    genre = genre.replace(reg, ' ');

    connection.query(`insert into movies (name, country, director, genre, year, rating) values ('${name}','${country}', '${director}', '${genre}', '${year}', '${rating}');`
, function (error, results, fields) {
        if (error) throw error;
        console.log('w');
    });

}



connection.end();
