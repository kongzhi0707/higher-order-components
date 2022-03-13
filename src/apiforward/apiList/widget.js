
module.exports = (app) => {
  app.get('/widget', async(req, res) => {
  	try {
  	  const result = await app.request({
  	  	url: 'widget?id=LocalNews&ajax=json',
        method: 'get',
  	  	data: {
  	  	  ...req.query
  	  	}
  	  });
  	  res.send(result.data);
  	} catch (err) {
  	  res.send({
  	  	code: 500,
  	  	msg: err.message
  	  })
  	}
  })
}