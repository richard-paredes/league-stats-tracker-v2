export type ErrorApiResponse = {
	status: {
		message: string;
		status_code: number;
	};
};

export const isError = (response: ErrorApiResponse | any): response is ErrorApiResponse => {
	return (response as ErrorApiResponse).status !== undefined;
};
