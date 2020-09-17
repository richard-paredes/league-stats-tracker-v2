import * as React from "react";

export const Layout: React.FC = ({children}) => {
	return (
		<React.Fragment>
			<main className="min-h-screen">{children}</main>
		</React.Fragment>
	);
};
