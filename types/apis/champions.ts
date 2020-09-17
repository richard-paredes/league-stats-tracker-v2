export type ChampionMasteryApiResponse = {
	championPointsUntilNextLevel: number;
	chestGranted: boolean;
	championId: number;
	lastPlayTime: number;
	championLevel: string;
	summonerId: string;
	championPoints: number;
	championPointsSinceLastLevel: number;
	tokensEarned: number;
};
