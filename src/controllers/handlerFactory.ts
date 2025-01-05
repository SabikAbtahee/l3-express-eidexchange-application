const catchAsync = require("./../utils/catchAsync");

exports.createOne = (Model: { create: (arg0: any) => any }) =>
	catchAsync(
		async (
			req: { body: any },
			res: {
				status: (arg0: number) => {
					(): any;
					new (): any;
					json: {
						(arg0: { status: string; data: { data: any } }): void;
						new (): any;
					};
				};
			},
			next: any
		) => {
			const doc = await Model.create(req.body);

			res.status(201).json({
				status: "success",
				data: {
					...doc
				}
			});
		}
	);
