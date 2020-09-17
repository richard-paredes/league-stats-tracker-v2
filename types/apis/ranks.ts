export type RankedApiResponse = {
	leagueId: string;
	summonerId: string;
	summonerName: string;
	queueType: string;
	tier: string;
	rank: string;
	leaguePoints: string;
	wins: number;
	losses: number;
	hotStreak: boolean;
	veteran: boolean;
	freshBlood: boolean;
	inactive: boolean;
	miniSeries: MiniSeries;
};

type MiniSeries = {
	losses: number;
	progress: string;
	target: number;
	wins: number;
};
