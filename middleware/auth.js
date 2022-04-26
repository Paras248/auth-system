const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const token =
		req.cookies.token ||
		req.body.token ||
		req.header("Authorization").replace("Bearer ", "");

	if (!token) {
		return res.status(403).send("token is missing");
	}

	try {
		const decode = jwt.verify(token, process.env.SECRET_KEY);
		// console.log(decode);
		req.user = decode;
	} catch (err) {
		return res.status(401).send("Invalid token");
	}
	return next();
};

module.exports = auth;
