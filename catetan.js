// RAW QUERY
// const result = await sequelize.query('INSERT INTO events (id,promoter_id,name,start_date,end_date,description,location,image,start_sales,end_sales,categories_id,created_at,updated_at) VALUES (DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?);', {
//     replacements: [
//         req.body.promoter_id,
//         req.body.name,
//         req.body.start_date,
//         req.body.end_date,
//         req.body.description,
//         req.body.location,
//         req.body.image,
//         req.body.start_sales,
//         req.body.end_sales,
//         req.body.categories_id,
//         req.body.created_at,
//         req.body.updated_at
//     ],
//     type: QueryTypes.INSERT
// });
// console.log("RESULT", result);


// memvalidasi token untuk mengecek token promoter atau bukan...
// bikin api login sederhana dan authorization

// terus id event dimasukin mana? id nya event diambil dari frontend