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
import { PlayScreen } from '../screens/play/PlayScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { colors } from '../theme';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const RankingsStack = createNativeStackNavigator();
const MatchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

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

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
    </ProfileStack.Navigator>
  );
}

// Simple icon text component since we avoid vector-icons dependency complexity
function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: 'H',
    Rankings: 'R',
    Match: '+',
    Play: 'P',
    Profile: 'U',
  };
  return null; // Icons handled by tabBarLabel
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
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => null,
        }}
      />
      <Tab.Screen
        name="RankingsTab"
        component={RankingsStackScreen}
        options={{
          tabBarLabel: 'Rankings',
          tabBarIcon: ({ color, size }) => null,
        }}
      />
      <Tab.Screen
        name="MatchTab"
        component={MatchStackScreen}
        options={{
          tabBarLabel: 'Match',
          tabBarIcon: ({ color, size }) => null,
        }}
      />
      <Tab.Screen
        name="PlayTab"
        component={PlayScreen}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({ color, size }) => null,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => null,
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
