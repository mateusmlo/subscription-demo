//* BIIIIIIIRL

export const XmlBodyBuilder = (parser) => {
	return (jsonBody) => {
		const result = parser.validate(jsonBody);

		if (!result) return console.log(result.err);

		const j2xParser = new parser.j2xParser();
		return j2xParser.parse(jsonBody);
	};
};
