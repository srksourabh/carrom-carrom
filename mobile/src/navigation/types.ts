export type AuthStackParamList = {
  Login: undefined;
  Otp: { email: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  RankingsTab: undefined;
  MatchTab: undefined;
  PlayTab: undefined;
  ProfileTab: undefined;
};

export type RankingsStackParamList = {
  Rankings: undefined;
  PlayerDetail: { userId: string };
};

export type MatchStackParamList = {
  MatchHub: undefined;
  RecordMatch: { opponentId?: string; opponentName?: string } | undefined;
  MatchHistory: undefined;
  MatchDetail: { matchId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};
