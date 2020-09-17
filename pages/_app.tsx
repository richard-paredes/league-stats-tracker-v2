import "../styles/index.css";

interface IAppProps {
	Component: React.FC;
	pageProps: object;
}
const App: React.FC<IAppProps> = ({Component, pageProps}) => {
	return <Component {...pageProps} />;
};

export default App;
