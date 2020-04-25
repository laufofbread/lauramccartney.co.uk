exports.handler = function(event, context, callback) {

  console.log(event);
  console.log(context);

  if(event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 200,
      body: ''
    });
  }



  fetch('https://app.snipcart.com/api/products',
    {
      method:'GET',
      headers:{
        "Content-Type": "application/json"
      },
      auth:{
        "user": process.env.SNIPCART_PRIVATE_KEY
      }
      body: JSON.stringify(data)
    }).then((data) => {


      return callback(null, {
      	statusCode: 200,
      	headers: {
      		"Content-Type": "application/json"
      	},
      	body: JSON.stringify(data),
      });

    })
}
