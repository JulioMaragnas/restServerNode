const jwt = require('jsonwebtoken');

let verifyRole = (req, res, next) => {
	let token = req.get('Authorization');
	jwt.verify(token, process.env.SEED, (err, decoded) => {
		let { user: { role } } = decoded;
		if (err) {
			return res.status(401).json({
				ok: false,
				err
			})
		}
		if (role !== 'ADMIN_ROLE')
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Unauthorized, user is not an administrator'
				}
			})
		next();
	})
}

module.exports = {
	verifyRole
}