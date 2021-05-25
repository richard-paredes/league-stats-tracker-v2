import * as React from "react";
import { Rank } from "../types";

interface IRankStatsProps {
	rank?: Rank;
	bgColor: string;
}

export const RankStats: React.FunctionComponent<IRankStatsProps> = ({rank, bgColor}) => {
	return (
		<div className={`bg-${bgColor} p-5 m-2 w-56 rounded text-white shadow relative`}>
			<div className="">
				<span className="font-bold text-gray-300">
					{rank?.tier} {rank?.division}
					{/* <img src={rank?.image} className="block" /> */}
				</span>
				<div className="bg-dark m-2 rounded text-white text-center">
					<span className="font-semibold opacity-1">
						<span className="text-blue-700">
							{rank?.wins}
							<span className="font-light">W</span>
						</span>
						<span className="text-red-700 ml-2">
							{rank?.losses}
							<span className="font-light">L</span>
						</span>
					</span>
					<span className="text-teal-500 block">
						{rank?.leaguePoints}
						<span className="font-light">LP</span>
					</span>
				</div>
				<span className="block mt-2 opacity-75">{rank?.type}</span>
			</div>
		</div>
	);
};

export default RankStats;
