import React from "react";
import {useRouter} from "next/router";
import {Layout} from "../../components/layout";
import {GetServerSideProps} from "next";
import {SummonerApiResponse} from "../../types/apis/summoners";
import {RankedApiResponse} from "../../types/apis/ranks";
import {CalendarIcon} from "../../components/icons/calendar";
import {RankStats} from "../../components/rankStats";
import {ItemKey, MatchApiResponse, MatchListApiResponse, Participant} from "../../types/apis/matches";
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from "recharts";

const RIOT_API_URI = "https://na1.api.riotgames.com";
const RIOT_API_TOKEN = "RGAPI-27926ddd-b1ad-4e74-bb08-0c61b04e181b";
const API_HEADERS = {
	"X-Riot-Token": RIOT_API_TOKEN,
};

interface IProfileProps {
	data: ProfileData | null;
}
const Profile: React.FC<IProfileProps> = ({data}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		if (!data) router.back();
		if (data) {
			setIsLoading(false);
		}
	}, [data]);
	return (
		<Layout>
			<div className="flex justify-center align-center bg-purple-200 m-0 pt-16 px-5 pb-20">
				<div
					className={`my-0 mx-auto flex flex-col justify-center items-center text-center ${
						isLoading && "animate-pulse space-x-4"
					}`}>
					<div className="">
						<img
							src={data?.summonerIconUri}
							className="mb-1 mx-auto shadow-xl w-32 h-32 bg-white rounded-full"
							id="summonerIcon"
						/>
						<h1 className="font-bold text-2xl text-black">{data?.summonerName}</h1>
						<div className="text-gray-900">
							<div className="inline-block flex items-center font-semibold">
								<CalendarIcon />
								Last Played: {data?.lastPlayedDate}
							</div>
						</div>
					</div>
					<div className="flex flex-wrap justify-center mt-3" id="summonerStats">
						<div
							className="flex flex-wrap justify-center md:justify-between mt-3 text-center"
							id="summonerStats">
							<RankStats rank={data?.soloRank} bgColor="dark" />
							<RankStats rank={data?.flexRank} bgColor="dark" />
							<RankStats rank={data?.tftRank} bgColor="dark" />
						</div>
					</div>
				</div>
			</div>
			<div className="w-full m-0 -mt-12">
				<div
					className={`my-0 mx-auto w-full flex flex-col justify-evenly items-center ${
						isLoading && "animate-pulse space-x-4"
					}`}>
					<div className="flex flex-wrap justify-center w-full" id="summonerStats">
						<div
							className="flex flex-wrap justify-center w-3/4 sm:w-auto mb-10 bg-black"
							id="summonerStats">
							<div className="mr-0 bg-dark w-full sm:w-auto inline relative">
								<img
									src={`${data?.matchData?.champion?.imageUri}`}
									className="w-full sm:w-auto sm:h-350"
								/>
								<div className="flex justify-center absolute inset-x-0 bottom-0 z-1">
									<div className="mx-auto ">
										<div className="w-full text-center">
											<img
												src={data?.matchData?.primaryPerk}
												className="w-12 inline-block bg-black rounded-full"
											/>
											<img
												src={data?.matchData?.secondaryPerk}
												className="w-8 inline-block bg-black rounded-full"
											/>
										</div>
										<div>
											{data?.matchData?.items.map(
												(x) =>
													x.imageUri && (
														<React.Fragment>
															<img
																src={x.imageUri}
																key={x.key}
																className="rounded-lg w-10 mx-auto sm:w-8 inline-block"
															/>
														</React.Fragment>
													)
											)}
										</div>
									</div>
								</div>
								{/* <h1 className="text-white font-lg">{data?.matchData?.champion?.name}</h1> */}
							</div>
							<div className="pl-5 py-2 match bg-black flex-1 text-white">
								<div className="w-48 p-2 mx-auto text-center">
									<h1 className="font-bold">{data?.matchData?.gameMode}</h1>
									<h1 className="font-thin">{data?.matchData?.gameDuration}</h1>
									<img src={data?.matchData?.endgameStatus} className="mx-auto w-32" />
								</div>
								<div className="mx-auto sm:flex sm:justify-evenly">
									<div className="sm:w-auto h-auto text-black mr-2 text-center rounded sm:text-right sm:grid sm:grid-cols-1 sm:grid-cols-2">
										<div className="px-2 m-1 text-blue-400">
											<div className="">Kills:</div>
										</div>
										<div>
											<div className="text-white font-semibold">
												{data?.matchData?.kills}
											</div>
										</div>
										<div className="px-2 m-1 text-red-400">Deaths:</div>
										<div>
											<div className="text-white font-semibold">
												{data?.matchData?.deaths}
											</div>
										</div>
										<div className="px-2 m-1 text-green-400">Assists:</div>
										<div>
											<div className="text-white font-semibold font-semibold">
												{data?.matchData?.assists}
											</div>
										</div>
										<div className="px-2 m-1 text-yellow-400">Gold Earned:</div>

										<div>
											<div className="text-white font-semibold">
												{data?.matchData?.goldEarned}
											</div>
										</div>
									</div>

									<div className="w-auto h-auto text-black text-center m-1 grid grid-cols-1 sm:grid-cols-1">
										<div className="text-green-600 mb-3">Damage Dealt:</div>
										<div className="w-full flex justify-center">
											<RadarChart
												width={210}
												height={150}
												data={data?.matchData?.damageDealt}>
												<PolarGrid stroke="#48bb78" />
												<PolarAngleAxis
													dataKey="name"
													fontWeight="lighter"
													fontStyle="italic"
													stroke="#48bb78"
												/>
												<PolarRadiusAxis angle={45} fontSize={10} />
												<Radar
													dataKey="value"
													stroke="white"
													fill="white"
													fillOpacity={0.3}
												/>
											</RadarChart>
										</div>
									</div>
									<div className="w-auto h-auto text-center rounded grid grid-cols-1 m-1 sm:grid-cols-1">
										<div className="text-red-600 mb-3">Damage Taken:</div>
										<div className="w-full flex justify-center">
											<RadarChart
												width={210}
												height={150}
												data={data?.matchData?.damageTaken}>
												<PolarGrid stroke="#f56565" />
												<PolarAngleAxis
													dataKey="name"
													fontWeight="lighter"
													fontStyle="italic"
													stroke="#f56565"
												/>
												<PolarRadiusAxis angle={45} fontSize={10} />
												<Radar
													dataKey="value"
													stroke="white"
													fill="white"
													fillOpacity={0.3}
												/>
											</RadarChart>
										</div>
									</div>
									<div className="w-10 h-10"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export type Rank = {
	type: string;
	tier: string;
	division: string;
	leaguePoints: string;
	wins: string;
	losses: string;
	image: string;
};
export type ChampionData = {
	imageUri: string;
	name: string;
};
export type ItemData = {
	imageUri: string;
	key: number;
};
export type MatchData = {
	gameMode: string;
	kills: string;
	deaths: string;
	assists: string;
	items: ItemData[];
	champion: ChampionData;
	endgameStatus: string;
	goldEarned: string;
	damageDealt: object[];
	damageTaken: object[];
	gameDuration: string;
	gameDate: string;
	primaryPerk: string;
	secondaryPerk: string;
};

type ProfileData = {
	summonerName?: string;
	summonerIconUri?: string;
	soloRank?: Rank;
	flexRank?: Rank;
	tftRank?: Rank;
	lastPlayedDate?: string;
	matchData?: MatchData;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	let profileData: ProfileData | null = {};
	try {
		// Fetch data from external API
		const {summonerName} = context.params!;
		const currentCDNVersion = await getCurrentAssetsCDNVersion();
		const summonerData = await getSummonerApiData(summonerName as string);
		const lolRankedData = await getLOLRankedApiData(summonerData.id); // contains Solo 5x5 and Flex
		const tftRankedData = await getTFTRankedApiData(summonerData.id);
		const matchHistoryData = await getMatchHistoryApiData(summonerData.accountId); // sorted by most recent
		const mostRecentMatch = matchHistoryData.matches[0];
		const matchData = await getMatchApiData(mostRecentMatch.gameId);
		const championData = await getChampionApiData(currentCDNVersion, mostRecentMatch.champion);

		const soloRank = lolRankedData.find((x) => x.queueType === "RANKED_SOLO_5x5");
		const flexRank = lolRankedData.find((x) => x.queueType === "RANKED_FLEX_SR");
		const tftRank = tftRankedData.find((x) => x.queueType === "RANKED_TFT");
		const lastPlayedDate = new Date(matchHistoryData.matches[0]?.timestamp).toLocaleString();

		profileData.summonerName = summonerData.name;
		profileData.lastPlayedDate = lastPlayedDate;
		profileData.soloRank = parseRank(soloRank, "Ranked Solo");
		profileData.flexRank = parseRank(flexRank, "Ranked Flex");
		profileData.tftRank = parseRank(tftRank, "Ranked Team Fight Tactics");
		profileData.summonerIconUri = getSummonerIconUri(currentCDNVersion, summonerData.profileIconId);
		profileData.matchData = parseMatch(summonerData.id, matchData, championData);
		// profileData.championIconUri = getChampionSplashUri(highestMasteredChampionId);
	} catch (err) {
		console.log(err);
		profileData = null;
	}
	return {
		props: {
			data: profileData,
		},
	};
};

const getCurrentAssetsCDNVersion = async () => {
	const data = await (await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)).json();
	return data[0];
};
const getSummonerApiData = async (summonerName: string): Promise<SummonerApiResponse> => {
	return (
		await fetch(`${RIOT_API_URI}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
			headers: API_HEADERS,
		})
	).json();
};
const getMatchHistoryApiData = async (summonerId: string): Promise<MatchListApiResponse> => {
	return (
		await fetch(`${RIOT_API_URI}/lol/match/v4/matchlists/by-account/${summonerId}`, {
			headers: API_HEADERS,
		})
	).json();
};
const getLOLRankedApiData = async (summonerId: string): Promise<RankedApiResponse[]> => {
	return (
		await fetch(`${RIOT_API_URI}/lol/league/v4/entries/by-summoner/${summonerId}`, {
			headers: API_HEADERS,
		})
	).json();
};
const getTFTRankedApiData = async (summonerId: string): Promise<RankedApiResponse[]> => {
	return (
		await fetch(`${RIOT_API_URI}/tft/league/v1/entries/by-summoner/${summonerId}`, {
			headers: API_HEADERS,
		})
	).json();
};

const getSummonerIconUri = (cdnVersion: string, iconId: number) => {
	return `https://ddragon.leagueoflegends.com/cdn/${cdnVersion}/img/profileicon/${iconId}.png`;
};
const getRankedImageUri = (tier: string, division: string) => {
	const romanToArabicMap: Record<string, string> = {
		I: "1",
		II: "2",
		III: "3",
		IV: "4",
	};
	if (tier === "UNRANKED") return `https://cdn.lolchess.gg/images/lol/tier/provisional.png`;
	else {
		return `https://cdn.lolchess.gg/images/lol/tier/${tier.toLowerCase()}_${
			romanToArabicMap[division]
		}.png`;
	}
};

const parseRank = (rankedData: RankedApiResponse | undefined, type: string) => {
	const tier = rankedData?.tier ?? "UNRANKED";
	const division = rankedData?.rank ?? "";
	const leaguePoints = rankedData?.leaguePoints ?? "0";
	const wins = rankedData?.wins?.toString() ?? "0";
	const losses = rankedData?.losses?.toString() ?? "0";
	const image = getRankedImageUri(tier, division);
	return {
		type,
		tier,
		division,
		leaguePoints,
		wins,
		losses,
		image,
	} as Rank;
};
const getMatchApiData = async (matchId: number): Promise<MatchApiResponse> => {
	return (
		await fetch(`${RIOT_API_URI}/lol/match/v4/matches/${matchId}`, {headers: API_HEADERS})
	).json();
};

const getChampionApiData = async (cdnVersion: string, championId: number) => {
	const allChampionsData = await (
		await fetch(`https://ddragon.leagueoflegends.com/cdn/${cdnVersion}/data/en_US/champion.json`)
	).json();
	const championsList = Object.values(allChampionsData.data);
	const championInfo = championsList.find((x: any) => x.key === championId.toString());
	return championInfo;
};

const parseChampionData = (championInfo: any) => {
	return {
		imageUri: getChampionLoadingUri(championInfo),
		name: championInfo.name,
	};
};
const getChampionLoadingUri = (championInfo: any) => {
	return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championInfo.id}_0.jpg`;
};
const parseMatch = (summonerId: string, match: MatchApiResponse, championData: any) => {
	const participantIdentity = match.participantIdentities.find(
		(x) => x.player.summonerId === summonerId
	);
	const participant = match.participants.find(
		(x) => x.participantId === participantIdentity?.participantId
	) as Participant;

	// TODO: get all the items' images from http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${itemId}.png

	const items: ItemData[] = [];
	for (let i = 0; i <= 5; i++)
		participant.stats[("item" + i) as ItemKey] &&
			items.push({
				imageUri: `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${
					participant.stats[("item" + i) as ItemKey]
				}.png`,
				key: i,
			});
	const kills = participant?.stats.kills;
	const deaths = participant?.stats.deaths;
	const assists = participant?.stats.assists;
	const goldEarned = participant?.stats.goldEarned;
	const gameModeKey = match.gameMode;
	const endgameStatus = participant.stats.win
		? `http://raw.communitydragon.org/10.18/game/assets/ux/endofgame/en_us/victory.png`
		: `http://raw.communitydragon.org/10.18/game/assets/ux/endofgame/en_us/defeat.png`;
	const gameDuration = match.gameDuration;
	const gameDate = new Date(match.gameCreation).toLocaleDateString();
	const primaryPerk = `https://opgg-static.akamaized.net/images/lol/perk/${participant.stats.perk0}.png`;
	const secondaryPerk = `https://opgg-static.akamaized.net/images/lol/perkStyle/${participant.stats.perkSubStyle}.png`;

	const gameModeMap = {
		CLASSIC: "Classic",
		ODIN: "Dominion/Crystal Scar",
		ARAM: "ARAM",
		TUTORIAL: "Tutorial",
		URF: "URF",
		DOOMBOTSTEEMO: "Doom Bot",
		ONEFORALL: "One for All",
		ASCENSION: "Ascension",
		FIRSTBLOOD: "Snowdown Showdown",
		KINGPORO: "Legend of the Poro King",
		SIEGE: "Nexus Siege",
		ASSASSINATE: "Blood Hunt Assassin",
		ARSR: "All Random Summoner's Rift",
		DARKSTAR: "Dark Star: Singularity",
		STARGUARDIAN: "Star Guardian Invasion",
		PROJECT: "PROJECT: Hunters",
		GAMEMODEX: "Nexus Blitz",
		ODYSSEY: "Odyssey: Extraction",
	};
	// const totalDamageDealt = participant.stats.totalDamageDealt;
	// const totalDamageTaken = participant.stats.totalDamageTaken;
	const physicalDamageDealt = participant.stats.physicalDamageDealt;
	const magicDamageDealt = participant.stats.magicDamageDealt;
	const trueDamageDealt = participant.stats.trueDamageDealt;
	const physicalDamageTaken = participant.stats.physicalDamageTaken;
	const magicDamageTaken = participant.stats.magicalDamageTaken;
	const trueDamageTaken = participant.stats.trueDamageTaken;
	const visionScore = participant.stats.visionScore;
	const creepScore = participant.stats.totalMinionsKilled;
	const damageHealed = participant.stats.totalHeal;
	const ccTime = participant.stats.timeCCingOthers;
	const damageDealt = [
		{
			name: "Physical",
			value: physicalDamageDealt,
		},
		{
			name: "Magic",
			value: magicDamageDealt,
		},
		{
			name: "True",
			value: trueDamageDealt,
		},
	];
	const damageTaken = [
		{
			name: "Physical",
			value: physicalDamageTaken,
		},
		{
			name: "Magic",
			value: magicDamageTaken,
		},
		{
			name: "True",
			value: trueDamageTaken,
		},
	];
	console.log(participant);
	return {
		gameMode: gameModeMap[gameModeKey],
		endgameStatus,
		goldEarned: getCommaDelimitedNumber(goldEarned),
		kills: getCommaDelimitedNumber(kills),
		deaths: getCommaDelimitedNumber(deaths),
		assists: getCommaDelimitedNumber(assists),
		gameDuration: secondsToHms(gameDuration),
		damageTaken,
		damageDealt,
		gameDate,
		items,
		champion: parseChampionData(championData),
		physicalDamageDealt,
		magicDamageDealt,
		trueDamageDealt,
		physicalDamageTaken,
		magicDamageTaken,
		trueDamageTaken,
		visionScore,
		creepScore,
		damageHealed,
		ccTime,
		primaryPerk,
		secondaryPerk,
	};
};
const getCommaDelimitedNumber = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const secondsToHms = (d: number) => {
	const h = Math.floor(d / 3600);
	const m = Math.floor((d % 3600) / 60);
	const s = Math.floor((d % 3600) % 60);

	const hDisplay = h > 0 ? h + ":" : "";
	const mDisplay = m > 0 ? m + ":" : "";
	const sDisplay = s > 0 ? s + "" : "";
	return hDisplay + mDisplay + sDisplay;
};
export default Profile;
