import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { RankingsScreen } from '../screens/rankings/RankingsScreen';
import { PlayerDetailScreen } from '../screens/rankings/PlayerDetailScreen';
import { RecordMatchScreen } from '../screens/match/RecordMatchScreen';
import { MatchHistoryScreen } from '../screens/match/MatchHistoryScreen';
import { MatchDetailScreen } from '../screens/match/MatchDetailScreen';
import { ChallengesListScreen } from '../screens/challenge/ChallengesListScreen';
import { CreateChallengeScreen } from '../screens/challenge/CreateChallengeScreen';
import { ChallengeDetailScreen } from '../screens/challenge/ChallengeDetailScreen';
import { ClubsListScreen } from '../screens/club/ClubsListScreen';
import { ClubDetailScreen } from '../screens/club/ClubDetailScreen';
import { FeedScreen } from '../screens/feed/FeedScreen';
import { CreatePostScreen } from '../screens/feed/CreatePostScreen';
import { PostDetailScreen } from '../screens/feed/PostDetailScreen';
import { ConversationsListScreen } from '../screens/chat/ConversationsListScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { NewChatScreen } from '../screens/chat/NewChatScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { colors } from '../theme';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator();
const RankingsStack = createNativeStackNavigator();
const MatchStack = createNativeStackNavigator();
const ChallengesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ClubsList" component={ClubsListScreen} options={{ title: 'Clubs' }} />
      <HomeStack.Screen name="ClubDetail" component={ClubDetailScreen} options={{ title: 'Club' }} />
      <HomeStack.Screen name="Feed" component={FeedScreen} options={{ title: 'Community Feed' }} />
      <HomeStack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'New Post' }} />
      <HomeStack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Post' }} />
      <HomeStack.Screen name="Conversations" component={ConversationsListScreen} options={{ title: 'Messages' }} />
      <HomeStack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
      <HomeStack.Screen name="NewChat" component={NewChatScreen} options={{ title: 'New Message' }} />
    </HomeStack.Navigator>
  );
}

function RankingsStackScreen() {
  return (
    <RankingsStack.Navigator>
      <RankingsStack.Screen name="Rankings" component={RankingsScreen} options={{ headerShown: false }} />
      <RankingsStack.Screen
        name="PlayerDetail"
        component={PlayerDetailScreen}
        options={{ title: 'Player Profile' }}
      />
    </RankingsStack.Navigator>
  );
}

function MatchStackScreen() {
  return (
    <MatchStack.Navigator>
      <MatchStack.Screen name="RecordMatch" component={RecordMatchScreen} options={{ title: 'Record Match' }} />
      <MatchStack.Screen name="MatchHistory" component={MatchHistoryScreen} options={{ title: 'Match History' }} />
      <MatchStack.Screen name="MatchDetail" component={MatchDetailScreen} options={{ title: 'Match Details' }} />
    </MatchStack.Navigator>
  );
}

function ChallengesStackScreen() {
  return (
    <ChallengesStack.Navigator>
      <ChallengesStack.Screen name="ChallengesList" component={ChallengesListScreen} options={{ title: 'Challenges' }} />
      <ChallengesStack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} options={{ title: 'Challenge' }} />
      <ChallengesStack.Screen name="CreateChallenge" component={CreateChallengeScreen} options={{ title: 'New Challenge' }} />
    </ChallengesStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
    </ProfileStack.Navigator>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="RankingsTab"
        component={RankingsStackScreen}
        options={{
          tabBarLabel: 'Rankings',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="MatchTab"
        component={MatchStackScreen}
        options={{
          tabBarLabel: 'Match',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="ChallengesTab"
        component={ChallengesStackScreen}
        options={{
          tabBarLabel: 'Challenges',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
