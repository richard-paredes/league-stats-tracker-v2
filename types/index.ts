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

export type ProfileData = {
	summonerName?: string;
	summonerIconUri?: string;
	soloRank?: Rank;
	flexRank?: Rank;
	tftRank?: Rank;
	lastPlayedDate?: string;
	matchData?: MatchData;
};
