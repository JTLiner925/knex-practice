require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

console.log("knex and driver installed correctly");

// const searchTerm = 'holo'

// knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where('name', 'ILIKE', `%${searchTerm}%`)
//   .then(result => {
//     console.log(result)
//   })

  // function searchByProduceName(searchTerm) {
  //   knexInstance
  //     .select('product_id', 'name', 'price', 'category')
  //     .from('amazong_products')
  //     .where('name', 'ILIKE', `%${searchTerm}%`)
  //     .then(result => {
  //       console.log(result)
  //     })
  // }
  
  // searchByProduceName('holo')

  // function searchByGroceryName(searchTerm) {
  //   console.log(searchTerm)
  //   knexInstance
  //     .select('name')
  //     .from('shopping_list')
  //     .where('name', 'ILIKE', `%${searchTerm}%`)
  //     .then(result => {
  //       console.log(result)
  //     })
  // }
  
  // searchByGroceryName('Fish')

  // function paginateGrocery(page) {
  //   const productsPerPage = 10
  //   const offset = productsPerPage * (page - 1)
  //   knexInstance
  //     .select('id', 'name', 'price')
  //     .from('shopping_list')
  //     .limit(productsPerPage)
  //     .offset(offset)
  //     .then(result => {
  //       console.log(result)
  //     })
  // }
  
  // paginateGrocery(2)

  // function paginateProducts(page) {
  //   const productsPerPage = 10
  //   const offset = productsPerPage * (page - 1)
  //   knexInstance
  //     .select('product_id', 'name', 'price', 'category')
  //     .from('amazong_products')
  //     .limit(productsPerPage)
  //     .offset(offset)
  //     .then(result => {
  //       console.log(result)
  //     })
  // }
  
  // paginateProducts(2)

  // paginateProducts(2)

// function getProductsWithImages() {
//   knexInstance
//     .select('product_id', 'name', 'price', 'category', 'image')
//     .from('amazong_products')
//     .whereNotNull('image')
//     .then(result => {
//       console.log(result)
//     })
// }

// getProductsWithImages()
// getProductsWithImages()

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(result => {
      console.log(result)
    })
}

mostPopularVideosForDays(30)

// function mostPopularVideosForDays(daysAgo) {
//   knexInstance
//     .select('*')
//     .where(
//       'date_added',
//       '>',
//       knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
//     )
//     .from('shopping_list')
//     .then(result => {
//       console.log(result)
//     })
// }

// mostPopularVideosForDays(30)

function categoryTotals() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .sum('price as total')
    .groupBy('category')
    .then(result => {
      console.log(result)
    })
}

categoryTotals()