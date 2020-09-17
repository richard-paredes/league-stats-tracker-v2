import {ToastProvider} from "react-toast-notifications";
import "../styles/index.css";

interface IAppProps {
	Component: React.FC;
	pageProps: object;
}
const App: React.FC<IAppProps> = ({Component, pageProps}) => {
	return (
		<ToastProvider>
			<Component {...pageProps} />
		</ToastProvider>
	);
};

export default App;
