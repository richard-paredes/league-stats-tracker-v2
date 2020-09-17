import React from "react";
import {Layout} from "../components/layout";
import {LeagueIcon} from "../components/icons/league";
import {RightArrowIcon} from "../components/icons/rightArrow";
import {useRouter} from "next/router";
import CircleIcon from "../components/icons/circle";

const Home: React.FC = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = React.useState(false);
	const [summonerName, setSummonerName] = React.useState("");
	const handleSummonerName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSummonerName(e.target.value);
	const handleClick = () => {
		setSubmitting(true);
		router.push(`/profiles/${summonerName}`);
	};
	return (
		<Layout>
			<div className="flex flex-col justify-center items-center h-screen">
				<div className="p-5 bg-dark rounded font-sans text-center">
					<LeagueIcon />
					<h1 className="text-3xl text-white font-bold m-5">Find Your League Stats</h1>
					<form>
						<input
							ref={(input) => input && input.focus()}
							type="text"
							name="summonerName"
							id="summonerName"
							value={summonerName}
							onChange={handleSummonerName}
							autoComplete="off"
							autoFocus
							className="bg-white focus:outline-none bg-white focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal font-sans text-lg font-semibold"
						/>
						<button
							className="bg-red-500 hover:bg-red-600 hover:border-red-600 py-1 px-5 mt-6 mx-5 rounded font-bold font-sans border border-red-500 rounded shadow"
							onClick={handleClick}
							type="submit"
							disabled={!summonerName || submitting}>
							{submitting ? <CircleIcon /> : <RightArrowIcon />}
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
