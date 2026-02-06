# Carrom Carrom - Product Requirements Document (PRD)
## West Bengal Carrom Community Platform

**Version:** 1.0  
**Date:** February 6, 2026  
**Project Owner:** Ultimate Digital Solutions Pvt Ltd  
**Location Focus:** West Bengal, India

---

## Executive Summary

**Carrom Carrom** is a comprehensive mobile-first community platform designed to unite, engage, and elevate the carrom playing community across West Bengal. The platform combines social networking, competitive gaming, live streaming, player rankings, and virtual gameplay into a unified ecosystem that serves recreational players, competitive athletes, tournament organizers, and carrom enthusiasts.

### Vision Statement
To become the definitive digital home for West Bengal's carrom community, fostering connections, competition, and growth of the sport through technology.

### Key Differentiators
- **Hyperlocal Focus:** Exclusive to West Bengal, ensuring relevant content and regional connectivity
- **Dual Gaming Experience:** Real-world match tracking + virtual carrom gameplay
- **Live Broadcasting:** Overhead camera system for professional-quality game streaming
- **Complete Ecosystem:** Rankings, profiles, matchmaking, chat, and community features
- **Mobile-First Design:** Optimized for smartphones, the primary device for the target audience

---

## Table of Contents

1. [Market Research & Context](#1-market-research--context)
2. [Target Audience](#2-target-audience)
3. [Core Features & User Stories](#3-core-features--user-stories)
4. [MVP Definition](#4-mvp-definition)
5. [Post-MVP Roadmap](#5-post-mvp-roadmap)
6. [Wireframes](#6-wireframes)
7. [Database Architecture](#7-database-architecture)
8. [Technical Architecture](#8-technical-architecture)
9. [Live Streaming Setup](#9-live-streaming-setup)
10. [Security & Compliance](#10-security--compliance)
11. [Success Metrics](#11-success-metrics)
12. [Timeline & Resources](#12-timeline--resources)

---

## 1. Market Research & Context

### 1.1 Carrom in West Bengal

**Cultural Significance:**
- Carrom is deeply embedded in Bengali culture, played in clubs, streets, schools, and homes
- Active tournament ecosystem with established clubs like:
  - Naba Balak Sangha
  - Kalighat Carrom Corner
  - Topsia Carrom Fan's
  - Behala Carrom Club
  - Calcutta Carrom Association

**Existing Tournament Structure:**
- Premier Carrom Championship rankings tracked manually
- Multiple competition formats: Championship, Runner-up, Quarterfinals, Semifinals
- Points-based ranking system (PQ, Semi, Qtr, Runner, Champion categories)
- Active player base of 200+ ranked competitive players

**Current Pain Points:**
- No centralized digital platform for player rankings
- Difficulty in organizing matches and finding opponents
- Limited visibility for tournaments and events
- No mechanism for remote audience engagement
- Fragmented communication across WhatsApp groups
- Manual scorekeeping and record management

### 1.2 Competitive Landscape

**Existing Carrom Apps:**

1. **Carrom Pool (Miniclip)**
   - Strengths: Polished virtual gameplay, large user base, global reach
   - Weaknesses: No real-world match integration, generic (not community-focused), no live streaming

2. **Carrom League**
   - Strengths: Online multiplayer, tournament mode, VIP rooms
   - Weaknesses: No real-world player profiles, no regional focus, limited social features

3. **Sports Community Apps (Reference):**
   - **Tribe Fitness:** Community-based platform with athlete profiles, challenges, business pages
   - **MVP Sports:** Loyalty/rewards program with club management
   - Insights: Successful community apps blend profiles, challenges, and engagement features

**Gap in Market:**
No platform exists that:
- Combines virtual gameplay with real-world match tracking
- Provides hyperlocal community features for a specific region
- Offers live streaming with professional camera setup
- Integrates comprehensive ranking and profile systems

### 1.3 Target Market Size

**West Bengal Demographics:**
- Population: ~100 million
- Urban centers: Kolkata, Howrah, Durgapur, Siliguri, Asansol
- Smartphone penetration: ~60% (60 million potential users)
- Youth (15-35 years): ~35% of population

**Carrom Player Segments:**
- **Competitive Players:** 500-1,000 (immediate target)
- **Recreational Club Players:** 10,000-20,000 (primary target)
- **Casual Enthusiasts:** 100,000+ (secondary target)
- **Spectators/Fans:** 500,000+ (tertiary target)

---

## 2. Target Audience

### Primary Personas

#### Persona 1: Competitive Raj
- **Age:** 22-35
- **Occupation:** Mix of students, small business owners, service professionals
- **Carrom Experience:** 5+ years competitive play, club member
- **Goals:**
  - Track tournament rankings and performance
  - Find challenging opponents for practice
  - Build reputation in carrom community
  - Access tournament schedules and results
- **Pain Points:**
  - Difficult to find opponents at similar skill level
  - Rankings not readily accessible
  - Limited visibility of achievements
  - Tournament information scattered
- **Tech Savvy:** Moderate to high; comfortable with mobile apps

#### Persona 2: Club Organizer Priya
- **Age:** 30-45
- **Role:** Club administrator, tournament organizer
- **Goals:**
  - Organize and manage tournaments efficiently
  - Communicate with club members
  - Stream matches to wider audience
  - Maintain accurate records and rankings
- **Pain Points:**
  - Manual tournament management is time-consuming
  - Difficult to reach all members simultaneously
  - Limited tools for match recording and sharing
  - Updating rankings manually is error-prone
- **Tech Savvy:** Moderate; needs intuitive interfaces

#### Persona 3: Casual Player Amit
- **Age:** 18-30
- **Occupation:** Student or young professional
- **Carrom Experience:** 2-3 years, plays recreationally
- **Goals:**
  - Play virtual carrom for entertainment
  - Learn from watching competitive matches
  - Connect with other carrom enthusiasts
  - Improve skills through practice
- **Pain Points:**
  - Limited access to physical carrom boards
  - Wants to play anytime, anywhere
  - Interested in learning but lacks structured guidance
- **Tech Savvy:** High; early adopter of gaming apps

#### Persona 4: Spectator/Fan Mohan
- **Age:** 35-50
- **Occupation:** Professional, former player
- **Goals:**
  - Watch live matches and tournaments
  - Follow favorite players
  - Stay connected with carrom community
  - Relive the nostalgia of playing
- **Pain Points:**
  - Cannot attend all tournaments in person
  - Limited access to match recordings
  - Wants to support local players
- **Tech Savvy:** Moderate; primarily consumes content

---

## 3. Core Features & User Stories

### 3.1 Authentication & Onboarding

**Features:**
- Email/OTP-based authentication (no password required)
- Optional phone number verification
- Profile creation wizard
- Regional verification (West Bengal only)

**User Stories:**
```
As a new user, I want to sign up using my email or phone number
So that I can quickly join the community without remembering passwords

As a competitive player, I want to create a detailed profile with my carrom history
So that others can see my achievements and connect with me

As a club organizer, I want to verify my club affiliation during onboarding
So that I can manage official club activities on the platform
```

### 3.2 User Profiles & Rankings

**Features:**
- Rich player profiles with photo, bio, and statistics
- Comprehensive match history
- Tournament participation records
- Performance analytics (win rate, average points, streaks)
- Badge/achievement system
- Skill rating (ELO-style system)
- Club/team affiliations
- Public and private profile sections

**Profile Elements:**
- **Basic Info:** Name, photo, location (West Bengal district), club affiliation
- **Stats Dashboard:**
  - Total matches played
  - Win/loss/draw record
  - Current ranking (overall, district, club)
  - Highest ranking achieved
  - Tournament wins
  - Championship points
- **Match History:** Chronological list with scores, opponents, dates, venues
- **Media Gallery:** Match photos and video highlights
- **Achievements:** Digital badges for milestones

**User Stories:**
```
As a competitive player, I want to view my comprehensive statistics
So that I can track my progress and identify areas for improvement

As a spectator, I want to browse top-ranked players in my district
So that I can follow players from my area

As a player, I want to earn badges for achievements
So that I feel recognized for my accomplishments
```

### 3.3 Player Rankings System

**Features:**
- Real-time updated leaderboards
- Multiple ranking categories:
  - Overall West Bengal ranking
  - District-wise rankings
  - Club rankings
  - Age group rankings (U-18, U-25, Open, Veterans 40+)
- Points-based system tied to tournament performance
- Historical ranking tracking (see rank progression over time)
- Filtering and search capabilities

**Ranking Algorithm:**
Points awarded based on:
- Tournament type (Premier, District, Club)
- Placement (Champion, Runner-up, Semi-finalist, Quarter-finalist, Preliminary round)
- Opponent strength (defeating higher-ranked players = more points)
- Consistency bonus (regular play)
- Decay factor (inactive players gradually lose points)

**User Stories:**
```
As a player, I want to see where I rank compared to others in my club
So that I understand my competitive standing

As a tournament organizer, I want rankings to automatically update after tournaments
So that I don't have to manually calculate and publish results

As a spectator, I want to filter rankings by district and age group
So that I can find relevant players to follow
```

### 3.4 Match Recording & Scorekeeping

**Features:**
- Quick match logging interface
- Score entry (board-wise and match-wise)
- Opponent selection (search by name/username)
- Venue selection/custom entry
- Match type (friendly, club, tournament)
- Photo/video attachment
- Post-match verification (opponent confirmation)
- Automatic stats update

**Match Recording Flow:**
1. Initiate match (select opponent, venue, match type)
2. Score entry (board by board or final score)
3. Add media (optional photos/videos)
4. Submit for opponent verification
5. Upon confirmation, stats update automatically

**User Stories:**
```
As a player, I want to quickly log my match results
So that my statistics and ranking stay current

As a player, I want my opponent to verify match results
So that there's transparency and accuracy in records

As a club organizer, I want to bulk-enter tournament results
So that I can efficiently update multiple matches at once
```

### 3.5 Matchmaking & Challenges

**Features:**
- Challenge system (send/accept challenges)
- Automated matchmaking based on:
  - Skill rating (ELO)
  - Location/proximity
  - Availability
  - Preferred game format
- Challenge customization:
  - Stakes (friendly, ranked)
  - Time and venue proposal
  - Board count (best of 3, 5, 7)
- Challenge notifications
- Scheduling calendar integration
- Reminders

**User Stories:**
```
As a competitive player, I want to challenge opponents of similar skill level
So that I have competitive and enjoyable matches

As a casual player, I want the app to suggest opponents near me
So that I can easily organize matches without extensive searching

As a player, I want to receive notifications when someone challenges me
So that I don't miss opportunities to play
```

### 3.6 Chat & Messaging

**Features:**
- One-on-one direct messaging
- Group chats (clubs, teams)
- Match-specific chat threads
- Push notifications
- Media sharing (photos, videos, voice notes)
- Read receipts
- Message search and filtering
- Emojis and reactions
- Report/block functionality

**Chat Categories:**
- **Direct Messages:** Private conversations between two users
- **Club Groups:** All members of a club
- **Tournament Threads:** Discussion around specific tournaments
- **Match Threads:** Post-match discussion between players and spectators

**User Stories:**
```
As a player, I want to message my opponent to coordinate match details
So that we can agree on time and venue efficiently

As a club member, I want to participate in club group discussions
So that I stay informed about club activities and events

As a spectator, I want to discuss ongoing matches in tournament threads
So that I can engage with the community while watching
```

### 3.7 Live Match Broadcasting

**Features:**
- Live video streaming with overhead camera view
- Multi-camera support (90° overhead + player angle optional)
- Real-time score overlay
- Viewer chat/comments
- Viewer count display
- Share live link
- Recording for later viewing
- Highlight reel creation
- Low-latency streaming (< 5 seconds)
- Adaptive quality based on network

**Camera Setup:**
- **Primary:** 90° overhead camera positioned above carrom board
- **Focus:** Entire board visible, minimal player distraction
- **Hands visible:** Players' hands and strikers in frame
- **Optional Secondary:** Side angle for player expressions/reactions

**Streaming Workflow:**
1. Organizer sets up overhead camera rig
2. Connects camera to mobile device via app
3. Starts live stream with match details
4. Viewers receive notification
5. Live score updates appear as overlay
6. Automatic recording saved
7. Post-match highlights generated

**User Stories:**
```
As a tournament organizer, I want to live stream matches with professional quality
So that I can reach a wider audience and showcase tournaments

As a spectator, I want to watch live matches with minimal latency
So that I can experience the excitement in real-time

As a player, I want to review recordings of my matches
So that I can analyze my technique and improve
```

### 3.8 Virtual Carrom Game

**Features:**
- Realistic physics engine
- Multiple game modes:
  - Practice (vs. AI)
  - 1v1 online multiplayer
  - Tournament mode
  - Challenges with friends
- Customizable boards and strikers (unlockables)
- Tutorial and skill-building modes
- Replay system
- Leaderboards for virtual gameplay
- Integration with main profile (display virtual achievements)

**Game Modes:**

**Practice Mode:**
- Play against AI of varying difficulty
- Skill drills (pocket all coins in X moves, precision shots)
- No stakes, purely for practice

**Online Multiplayer:**
- Matchmaking based on virtual ELO rating
- Ranked and unranked modes
- Best of 3/5/7 boards
- In-game chat

**Tournament Mode:**
- Scheduled virtual tournaments
- Entry fee (virtual coins, purchasable)
- Prize pools
- Bracket system
- Spectator mode

**User Stories:**
```
As a casual player, I want to play virtual carrom when I don't have access to a physical board
So that I can enjoy the game anytime, anywhere

As a beginner, I want to practice against AI opponents
So that I can improve my skills before playing real matches

As a competitive player, I want to compete in virtual tournaments
So that I can demonstrate my skills online and win recognition
```

### 3.9 Tournament Management

**Features:**
- Create and manage tournaments
- Tournament formats:
  - Single elimination
  - Double elimination
  - Round robin
  - Swiss system
- Registration and entry management
- Automated bracket generation
- Schedule management
- Result entry and verification
- Prize/award tracking
- Participant communication
- Spectator view (public bracket)

**Tournament Creation Workflow:**
1. Organizer inputs tournament details (name, date, venue, format, entry fee)
2. Set eligibility criteria (skill rating range, region, club)
3. Open registration
4. Automated or manual participant selection
5. Bracket generated
6. Schedule published with match times
7. Real-time result updates
8. Automatic ranking updates upon completion

**User Stories:**
```
As a tournament organizer, I want to create and manage tournaments digitally
So that I can reduce manual work and reach more participants

As a player, I want to register for tournaments through the app
So that I can easily find and join competitions

As a spectator, I want to follow tournament brackets in real-time
So that I can track my favorite players' progress
```

### 3.10 Community & Social Features

**Features:**
- News feed (community posts, match highlights, announcements)
- Follow players, clubs, tournaments
- Like, comment, share posts
- Photo and video sharing
- Event calendar
- Club pages (official club profiles)
- Discussion forums
- Polls and surveys
- Notifications for followed entities

**Content Types:**
- **Match Highlights:** Video clips of great shots
- **Announcements:** Tournament schedules, club events
- **Discussions:** Strategy tips, equipment recommendations
- **Celebrations:** Tournament wins, milestone achievements
- **Educational:** Technique videos, rule clarifications

**User Stories:**
```
As a club organizer, I want to post announcements on our club page
So that all members stay informed about events

As a player, I want to share videos of my best shots
So that I can showcase my skills to the community

As a spectator, I want to follow top players and receive updates
So that I never miss their matches or achievements
```

---

## 4. MVP Definition

### 4.1 MVP Philosophy

**Goal:** Launch a functional, valuable product quickly to validate the concept, gather user feedback, and establish the community foundation.

**Timeline:** 4-6 months from development start to beta launch

**Core Principle:** Focus on features that provide immediate value to competitive players and club organizers—the core user base that will drive adoption.

### 4.2 MVP Features (Must-Have)

#### Phase 1A: Foundation (Months 1-2)

**1. Authentication & User Management**
- Email/OTP login
- Basic profile creation (name, photo, club affiliation, location)
- Profile viewing and editing

**2. Player Profiles (Simplified)**
- Basic statistics (matches played, wins, losses)
- Current ranking (overall only, no sub-categories)
- Match history (list view)
- Profile photo and bio

**3. Rankings System (Basic)**
- Overall West Bengal leaderboard
- Manual point entry by admins (tournament results)
- Search and filter by name
- Top 50 display

**4. Match Recording**
- Simple match entry form (opponent, score, date, venue)
- Submit match (no opponent verification in MVP)
- View match history on profile

**5. Admin Panel**
- Tournament organizers can manually enter tournament results
- Bulk point allocation for tournament placements
- Basic user management

#### Phase 1B: Engagement (Months 3-4)

**6. Chat & Messaging**
- One-on-one direct messaging
- Text and image sharing
- Push notifications
- Basic group chat for clubs

**7. Challenge System (Basic)**
- Send challenge to another player
- Accept/decline challenges
- Basic scheduling (date, time, venue)

**8. Community Feed (Simplified)**
- Post text and images
- View feed of posts from followed users
- Like and comment
- Follow/unfollow users

**9. Club Pages (Basic)**
- Official club profiles
- Club members list
- Club announcements

#### Phase 1C: Differentiation (Months 5-6)

**10. Live Match Streaming (Beta)**
- Single camera streaming (overhead view)
- Mobile device as camera and streaming source
- Basic live chat for viewers
- Automatic recording
- Manual score overlay (organizer enters scores during match)

**11. Virtual Carrom Game (Simple Version)**
- Practice mode only (vs. AI)
- Basic physics
- Single board design
- 1v1 local multiplayer (pass-and-play on same device)

### 4.3 MVP Non-Goals (Explicitly Out of Scope)

**Deferred to Post-MVP:**
- Advanced analytics and insights
- Multiple ranking categories (district, age group, club)
- Automated matchmaking algorithm
- In-app payments and virtual currency
- Multi-camera streaming
- Advanced virtual game features (online multiplayer, tournaments, cosmetics)
- Opponent verification for match results
- Video editing and highlight reel generation
- Advanced tournament management (brackets, schedules)
- Third-party integrations (Google Calendar, social media sharing)

### 4.4 MVP Success Criteria

**Adoption Metrics:**
- 200+ registered users (competitive players and organizers) within 2 months of beta launch
- 50+ active users (use app at least once per week)
- 100+ matches logged

**Engagement Metrics:**
- Average session duration: 8+ minutes
- 60% of users create a complete profile
- 40% of users send at least one message
- 10+ live streams conducted

**Feedback Metrics:**
- 70% of beta users complete feedback survey
- Net Promoter Score (NPS) > 40
- < 20% churn rate (users who stop using app after initial usage)

**Technical Metrics:**
- App crash rate < 2%
- API response time < 500ms (p95)
- Stream latency < 8 seconds

---

## 5. Post-MVP Roadmap

### Phase 2: Enhanced Engagement (Months 7-9)

**Features:**

**1. Advanced Rankings System**
- District-wise rankings
- Age group categories
- Club rankings
- Historical rank tracking and progression graphs

**2. Match Verification System**
- Opponent must confirm match results
- Dispute resolution workflow
- Admin review for contested matches

**3. Automated Matchmaking**
- AI-powered opponent suggestions based on ELO, location, availability
- "Find a Match" feature
- Calendar integration

**4. Enhanced Profiles**
- Performance analytics dashboard
- Win streaks, personal bests
- Achievement badges (visual flair)
- Trophy cabinet

**5. Advanced Live Streaming**
- Multi-camera support
- Automated score detection (AI-based)
- Real-time score overlay (automatic)
- Stream quality selection
- Picture-in-picture (player reactions)

**6. Tournament Management System**
- Create tournaments with various formats
- Online registration
- Automated bracket generation
- Schedule management

### Phase 3: Monetization & Gamification (Months 10-12)

**Features:**

**1. Virtual Currency & Economy**
- In-app currency (coins)
- Purchase coins (IAP)
- Earn coins through activity (matches, challenges, tournaments)
- Spend coins on virtual game items, tournament entries, profile customization

**2. Premium Features (Subscription)**
- Advanced analytics
- Unlimited cloud storage for match videos
- Priority customer support
- Exclusive tournaments
- Ad-free experience

**3. Enhanced Virtual Carrom Game**
- Online multiplayer (real-time)
- Virtual tournaments with entry fees and prizes
- Customizable boards, strikers, and pucks (cosmetics)
- Seasonal events and limited-time modes
- Global leaderboards

**4. Advertising (Non-Intrusive)**
- Banner ads on feed (free users)
- Sponsored posts (local businesses)
- Tournament sponsorships

**5. E-Commerce Integration**
- Carrom equipment shop (boards, strikers, powder)
- Partner with local vendors
- Affiliate commissions

### Phase 4: Ecosystem Expansion (Months 13-18)

**Features:**

**1. Coaching & Learning Platform**
- Video tutorials from top players
- Technique breakdowns
- Strategy guides
- Personalized coaching sessions (marketplace)

**2. Federation Integration**
- Official partnerships with West Bengal Carrom Federation
- Sanctioned tournament results automatically sync
- Official player ID integration

**3. Spectator Engagement**
- Fantasy carrom leagues
- Prediction games
- Betting (if legally permissible and regulated)

**4. Advanced AI Features**
- Shot analysis (computer vision)
- Performance predictions
- Personalized training recommendations

**5. Regional Expansion**
- Expand beyond West Bengal to other states
- Multi-language support (Hindi, Bengali, English)

**6. Web Platform**
- Desktop/web version for tournament organizers
- Advanced analytics dashboard
- Content management system

---

## 6. Wireframes

### 6.1 Wireframing Approach

**Tool Recommendation:** Figma (collaborative, component-based, mobile prototyping)

**Fidelity Levels:**
- **Low-Fidelity:** Initial sketches, user flows (completed in this document)
- **Mid-Fidelity:** Grayscale wireframes with actual content structure
- **High-Fidelity:** Final designs with branding, colors, images

**Design Principles:**
- **Mobile-First:** All screens optimized for smartphones (primary device)
- **Simple Navigation:** Bottom tab bar with 5 main sections
- **Quick Actions:** Floating action buttons for common tasks
- **Visual Hierarchy:** Clear headings, card-based layouts
- **Accessibility:** High contrast, readable fonts, touch targets ≥ 44x44px

### 6.2 Information Architecture

```
Carrom Carrom App
│
├── Home (Feed)
│   ├── Community posts
│   ├── Match highlights
│   ├── Announcements
│   └── Stories (optional)
│
├── Rankings
│   ├── Overall leaderboard
│   ├── District filter
│   ├── Club filter
│   ├── Search players
│   └── Player profile view
│
├── Match
│   ├── Log match
│   ├── Quick challenge
│   ├── Find opponent
│   ├── Match history
│   └── Live matches (ongoing)
│
├── Play (Virtual Game)
│   ├── Practice mode
│   ├── Online multiplayer (Phase 2)
│   ├── Tournaments (Phase 3)
│   └── Leaderboards
│
└── Profile
    ├── My profile
    ├── Edit profile
    ├── Statistics
    ├── Match history
    ├── Settings
    ├── Notifications
    └── Logout
```

### 6.3 Key Screen Wireframes

#### Screen 1: Splash & Onboarding

```
+---------------------------+
|                           |
|        [APP LOGO]         |
|      Carrom Carrom        |
|                           |
|   West Bengal's Carrom    |
|       Community App       |
|                           |
|                           |
|    [Get Started Button]   |
|                           |
+---------------------------+

Flow: Splash → Onboarding Slides (3 screens) → Login/Signup
```

**Onboarding Slides:**
1. "Connect with Players" (visual: network of players)
2. "Track Your Rankings" (visual: leaderboard)
3. "Live Stream & Play" (visual: streaming + virtual game)

#### Screen 2: Login/Signup

```
+---------------------------+
|         [← Back]          |
|                           |
|    Welcome to Carrom!     |
|                           |
|  +---------------------+  |
|  | [Email/Phone]       |  |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  | [Send OTP Button]   |  |
|  +---------------------+  |
|                           |
|  ─────── OR ───────       |
|                           |
|  +---------------------+  |
|  | [📧 Email Login]    |  |
|  +---------------------+  |
|                           |
+---------------------------+

Flow: Enter email/phone → OTP sent → Enter OTP → Profile creation → Home
```

#### Screen 3: Profile Creation

```
+---------------------------+
|  [← Back]  Create Profile |
|                           |
|     [Upload Photo]        |
|      [Placeholder]        |
|                           |
|  +---------------------+  |
|  | Full Name           |  |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  | District ▼          |  |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  | Club (Optional) ▼   |  |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  | Bio (Optional)      |  |
|  |                     |  |
|  +---------------------+  |
|                           |
|    [Complete Button]      |
+---------------------------+
```

#### Screen 4: Home Feed

```
+---------------------------+
|  Carrom Carrom    [🔔][⚙️] |
|                           |
| +----------------------+  |
| | [Stories Row]        |  |
| | (Player1)(Player2)...|  |
| +----------------------+  |
|                           |
| +----------------------+  |
| | 📷 Rajesh Kumar      |  |
| | ⏱️ 2 hours ago       |  |
| |                      |  |
| | [Match Photo]        |  |
| |                      |  |
| | Won against Amit!    |  |
| | Score: 25-18         |  |
| |                      |  |
| | ❤️ 45   💬 12        |  |
| +----------------------+  |
|                           |
| +----------------------+  |
| | 🏆 Tournament Alert  |  |
| | Premier Championship |  |
| | Feb 15, Howrah       |  |
| | [Register Now]       |  |
| +----------------------+  |
|                           |
|          ⋮                |
+---------------------------+
| [🏠] [📊] [⚡] [🎮] [👤] |
+---------------------------+

Bottom Navigation:
🏠 Home | 📊 Rankings | ⚡ Match | 🎮 Play | 👤 Profile
```

#### Screen 5: Rankings Leaderboard

```
+---------------------------+
|  Rankings        [Filter] |
|                           |
|  +---------------------+  |
|  | [Search Players...] |  |
|  +---------------------+  |
|                           |
|  West Bengal Overall ▼    |
|                           |
| +----------------------+  |
| | 1. 👑 Sunil Mallick  |  |
| |    ⭐ 2500 pts       |  |
| |    Ekata Club        |  |
| +----------------------+  |
|                           |
| +----------------------+  |
| | 2. Shamim Mondal     |  |
| |    ⭐ 2450 pts       |  |
| |    48 Pally Jubasree |  |
| +----------------------+  |
|                           |
| +----------------------+  |
| | 3. Krishnendu Das    |  |
| |    ⭐ 2400 pts       |  |
| |    Naba Balak Sangha |  |
| +----------------------+  |
|                           |
|          ⋮                |
+---------------------------+
| [🏠] [📊] [⚡] [🎮] [👤] |
+---------------------------+
```

#### Screen 6: Player Profile

```
+---------------------------+
|  [← Back]         [⋮ Menu]|
|                           |
|     [Profile Photo]       |
|     Rajesh Kumar          |
|     Howrah | Kalighat CC  |
|                           |
|  [💬 Message] [⚡Challenge]|
|                           |
| ┌─────────────────────┐  |
| │ Rank #12  | 🏆 15    │  |
| │ 2250 pts  | Wins 45  │  |
| └─────────────────────┘  |
|                           |
|  Stats | Matches | Media  |
|  ────                     |
|                           |
|  Matches Played:  52      |
|  Win Rate:       86%      |
|  Current Streak:  5W      |
|                           |
|  Recent Matches:          |
| +----------------------+  |
| | ✅ vs Amit Kumar     |  |
| | 25-18 • Jan 15       |  |
| +----------------------+  |
| | ✅ vs Priya Singh    |  |
| | 25-22 • Jan 12       |  |
| +----------------------+  |
|          ⋮                |
+---------------------------+
| [🏠] [📊] [⚡] [🎮] [👤] |
+---------------------------+
```

#### Screen 7: Log Match

```
+---------------------------+
|  [← Back]    Log Match    |
|                           |
|  Opponent                 |
|  +---------------------+  |
|  | [Search Player...]  |  |
|  +---------------------+  |
|                           |
|  Your Score               |
|  +---------------------+  |
|  | [25]                |  |
|  +---------------------+  |
|                           |
|  Opponent Score           |
|  +---------------------+  |
|  | [18]                |  |
|  +---------------------+  |
|                           |
|  Date                     |
|  +---------------------+  |
|  | Feb 6, 2026 ▼       |  |
|  +---------------------+  |
|                           |
|  Venue                    |
|  +---------------------+  |
|  | Kalighat Club ▼     |  |
|  +---------------------+  |
|                           |
|  [📷 Add Photos]          |
|                           |
|  [Submit Match]           |
+---------------------------+
| [🏠] [📊] [⚡] [🎮] [👤] |
+---------------------------+
```

#### Screen 8: Challenge Player

```
+---------------------------+
|  [← Back]  Send Challenge |
|                           |
|  To: Amit Kumar           |
|  [Profile Photo]          |
|  Rank #25 | Howrah        |
|                           |
|  Match Details            |
|                           |
|  Date & Time              |
|  +---------------------+  |
|  | Feb 8, 5:00 PM ▼    |  |
|  +---------------------+  |
|                           |
|  Venue                    |
|  +---------------------+  |
|  | Kalighat Club ▼     |  |
|  +---------------------+  |
|                           |
|  Boards                   |
|  +---------------------+  |
|  | Best of 5 ▼         |  |
|  +---------------------+  |
|                           |
|  Message (Optional)       |
|  +---------------------+  |
|  | Let's have a match! |  |
|  +---------------------+  |
|                           |
|  [Send Challenge]         |
+---------------------------+
| [🏠] [📊] [⚡] [🎮] [👤] |
+---------------------------+
```

#### Screen 9: Live Match Streaming

```
+---------------------------+
|  [Video Player Area]      |
|                           |
|  [Live Camera Feed]       |
|  Overhead view of board   |
|                           |
|  🔴 LIVE  👁️ 142 viewers  |
|                           |
|  ┌─────────────────────┐ |
|  │ Rajesh  25 - 18  Amit│ |
|  │ [●●●○○] Board 4/5   │ |
|  └─────────────────────┘ |
|                           |
| +----------------------+  |
| | 💬 Live Chat         |  |
| | User1: Great shot!   |  |
| | User2: Amazing!      |  |
| | [Type message...]    |  |
| +----------------------+  |
+---------------------------+
|  [Share] [Record] [End]   |
+---------------------------+
```

#### Screen 10: Virtual Carrom Game (MVP)

```
+---------------------------+
|  [← Back]      [⚙️ Settings]|
|                           |
|    [Carrom Board View]    |
|                           |
|  +---------------------+  |
|  |                     |  |
|  |    [Game Board]     |  |
|  |   [Coins Layout]    |  |
|  |                     |  |
|  |   [Your Striker]    |  |
|  |                     |  |
|  +---------------------+  |
|                           |
|  You: 12   |   AI: 8      |
|  ┌─────┐        ┌─────┐  |
|  │●●●○○│        │●●○○○│  |
|  └─────┘        └─────┘  |
|                           |
|  [Aim: Drag to shoot]     |
+---------------------------+

Tap and drag striker to set angle and power, release to shoot
```

#### Screen 11: Chat / Messages

```
+---------------------------+
|  [← Back]    Messages     |
|                           |
|  [🔍 Search...]           |
|                           |
| +----------------------+  |
| | [Photo] Amit Kumar   |  |
| | See you at 5pm       |  |
| | 2 min ago            |  |
| +----------------------+  |
|                           |
| +----------------------+  |
| | [Photo] Priya Singh  |  |
| | Great match!         |  |
| | 1 hour ago           |  |
| +----------------------+  |
|                           |
| +----------------------+  |
| | 👥 Kalighat Club     |  |
| | Tournament on Sunday |  |
| | 3 hours ago          |  |
| +----------------------+  |
|                           |
|          ⋮                |
+---------------------------+
| [🏠] [📊] [⚡] [🎮] [👤] |
+---------------------------+
```

#### Screen 12: User Settings & Profile

```
+---------------------------+
|  [← Back]      My Profile |
|                           |
|     [Profile Photo]       |
|     Your Name             |
|     Rank #12 • 2250 pts   |
|                           |
|  [Edit Profile]           |
|                           |
| +----------------------+  |
| | 📊 Statistics        | →|
| +----------------------+  |
| | 📜 Match History     | →|
| +----------------------+  |
| | 🏆 Achievements      | →|
| +----------------------+  |
| | ⚙️ Settings          | →|
| +----------------------+  |
| | 🔔 Notifications     | →|
| +----------------------+  |
| | ❓ Help & Support    | →|
| +----------------------+  |
| | 🚪 Logout            |  |
| +----------------------+  |
|                           |
+---------------------------+
| [🏠] [📊] [⚡] [🎮] [👤] |
+---------------------------+
```

### 6.4 User Flow Diagrams

#### Flow 1: New User Onboarding
```
Splash Screen
    ↓
Onboarding Slides (Skip option)
    ↓
Login/Signup
    ↓
Enter Email/Phone
    ↓
Enter OTP
    ↓
Create Profile (Photo, Name, District, Club)
    ↓
Welcome Tutorial (Quick tour)
    ↓
Home Feed
```

#### Flow 2: Log a Match
```
Home → Tap "Match" tab
    ↓
Match Hub Screen
    ↓
Tap "Log Match"
    ↓
Search and select Opponent
    ↓
Enter Scores
    ↓
Select Date & Venue
    ↓
Add Photos (optional)
    ↓
Submit Match
    ↓
Confirmation & Stats Update
    ↓
Return to Profile (updated stats visible)
```

#### Flow 3: Challenge a Player
```
Rankings → Tap Player Profile
    ↓
Player Profile Screen
    ↓
Tap "Challenge" button
    ↓
Set Match Details (Date, Time, Venue, Boards)
    ↓
Add Message (optional)
    ↓
Send Challenge
    ↓
Opponent receives notification
    ↓
Opponent Accepts/Declines
    ↓
If Accepted: Match scheduled, calendar reminder set
```

#### Flow 4: Watch Live Match
```
Home Feed → See "Live Match" post
    ↓
Tap to join stream
    ↓
Live Video Player Screen
    ↓
Watch match with live score overlay
    ↓
Participate in live chat
    ↓
Match ends → Recording available
    ↓
Option to share or save highlights
```

#### Flow 5: Play Virtual Carrom
```
Home → Tap "Play" tab
    ↓
Virtual Game Hub
    ↓
Select "Practice Mode"
    ↓
Choose AI Difficulty
    ↓
Game loads
    ↓
Play match (drag and shoot mechanics)
    ↓
Match ends → Results screen
    ↓
Stats updated (virtual game profile)
    ↓
Option to Rematch or Exit
```

---

## 7. Database Architecture

### 7.1 Database Selection

**Recommended Database:** PostgreSQL (primary) + Firebase Realtime Database (for chat)

**Rationale:**
- **PostgreSQL:**
  - Relational structure ideal for user profiles, matches, rankings, tournaments
  - ACID compliance for data integrity
  - Excellent support for complex queries (leaderboards, filtering, aggregations)
  - JSON field support for flexible attributes
  - Scalable with proper indexing and partitioning
  - Cost-effective for primary data

- **Firebase Realtime Database (or Firestore):**
  - Real-time synchronization for chat messages
  - Offline support for mobile apps
  - WebSocket-based push notifications
  - Simplifies chat feature development
  - Handles concurrent messaging well

**Hybrid Approach:**
- PostgreSQL for structured data (users, matches, rankings, tournaments)
- Firebase for real-time features (chat, live match updates)
- Redis for caching (leaderboards, frequently accessed profiles)

### 7.2 Database Schema (PostgreSQL)

#### Table: `users`
**Purpose:** Store user profiles and authentication details

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique user identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email (login) |
| `phone` | VARCHAR(20) | UNIQUE | Phone number (optional) |
| `full_name` | VARCHAR(150) | NOT NULL | User's full name |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Unique username (auto-generated or custom) |
| `profile_photo_url` | TEXT | | Profile picture URL |
| `bio` | TEXT | | User biography |
| `district` | VARCHAR(100) | NOT NULL | West Bengal district |
| `club_id` | UUID | FOREIGN KEY → clubs(id) | Associated club (nullable) |
| `skill_rating` | INTEGER | DEFAULT 1000 | ELO-style rating |
| `total_matches` | INTEGER | DEFAULT 0 | Total matches played |
| `wins` | INTEGER | DEFAULT 0 | Total wins |
| `losses` | INTEGER | DEFAULT 0 | Total losses |
| `draws` | INTEGER | DEFAULT 0 | Total draws |
| `championship_points` | INTEGER | DEFAULT 0 | Ranking points |
| `current_rank` | INTEGER | | Overall rank (calculated) |
| `is_verified` | BOOLEAN | DEFAULT FALSE | Account verification status |
| `role` | ENUM | DEFAULT 'player' | player, organizer, admin |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |
| `last_active_at` | TIMESTAMP | | Last activity timestamp |

**Indexes:**
- `idx_users_email` on `email`
- `idx_users_username` on `username`
- `idx_users_district` on `district`
- `idx_users_club_id` on `club_id`
- `idx_users_championship_points` on `championship_points DESC` (for leaderboards)

---

#### Table: `clubs`
**Purpose:** Store club information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique club identifier |
| `name` | VARCHAR(200) | UNIQUE, NOT NULL | Club name |
| `short_name` | VARCHAR(50) | | Abbreviated name |
| `logo_url` | TEXT | | Club logo |
| `description` | TEXT | | Club description |
| `district` | VARCHAR(100) | | Primary district |
| `founded_year` | INTEGER | | Year established |
| `contact_email` | VARCHAR(255) | | Contact email |
| `contact_phone` | VARCHAR(20) | | Contact phone |
| `is_verified` | BOOLEAN | DEFAULT FALSE | Official verification |
| `member_count` | INTEGER | DEFAULT 0 | Number of members |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- `idx_clubs_name` on `name`
- `idx_clubs_district` on `district`

---

#### Table: `matches`
**Purpose:** Store individual match records

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique match identifier |
| `player1_id` | UUID | FOREIGN KEY → users(id), NOT NULL | First player |
| `player2_id` | UUID | FOREIGN KEY → users(id), NOT NULL | Second player |
| `player1_score` | INTEGER | NOT NULL | Player 1 final score |
| `player2_score` | INTEGER | NOT NULL | Player 2 final score |
| `winner_id` | UUID | FOREIGN KEY → users(id) | Winner (NULL for draw) |
| `match_date` | DATE | NOT NULL | Date match played |
| `venue` | VARCHAR(255) | | Venue name/location |
| `venue_lat` | DECIMAL(9,6) | | Latitude (optional) |
| `venue_lng` | DECIMAL(9,6) | | Longitude (optional) |
| `match_type` | ENUM | NOT NULL | friendly, club, tournament, ranked |
| `tournament_id` | UUID | FOREIGN KEY → tournaments(id) | If tournament match |
| `boards_played` | INTEGER | DEFAULT 1 | Number of boards |
| `is_verified` | BOOLEAN | DEFAULT FALSE | Opponent confirmed |
| `media_urls` | JSON | | Array of photo/video URLs |
| `notes` | TEXT | | Additional notes |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- `idx_matches_player1` on `player1_id`
- `idx_matches_player2` on `player2_id`
- `idx_matches_date` on `match_date DESC`
- `idx_matches_tournament` on `tournament_id`
- Composite: `idx_matches_player_date` on `(player1_id, match_date)` and `(player2_id, match_date)`

**CHECK Constraint:**
- `player1_id != player2_id` (cannot play against self)

---

#### Table: `tournaments`
**Purpose:** Store tournament information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique tournament identifier |
| `name` | VARCHAR(255) | NOT NULL | Tournament name |
| `description` | TEXT | | Description |
| `tournament_type` | ENUM | NOT NULL | premier, district, club, online |
| `format` | ENUM | NOT NULL | single_elimination, round_robin, etc. |
| `start_date` | DATE | NOT NULL | Start date |
| `end_date` | DATE | | End date |
| `registration_deadline` | TIMESTAMP | | Registration cutoff |
| `venue` | VARCHAR(255) | | Primary venue |
| `district` | VARCHAR(100) | | District |
| `organizer_id` | UUID | FOREIGN KEY → users(id), NOT NULL | Organizer |
| `club_id` | UUID | FOREIGN KEY → clubs(id) | Host club |
| `max_participants` | INTEGER | | Max entries |
| `entry_fee` | DECIMAL(10,2) | | Entry fee (INR) |
| `prize_pool` | DECIMAL(10,2) | | Total prize money |
| `status` | ENUM | DEFAULT 'upcoming' | upcoming, ongoing, completed, cancelled |
| `participant_count` | INTEGER | DEFAULT 0 | Current participants |
| `winner_id` | UUID | FOREIGN KEY → users(id) | Winner |
| `runner_up_id` | UUID | FOREIGN KEY → users(id) | Runner-up |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- `idx_tournaments_status` on `status`
- `idx_tournaments_start_date` on `start_date DESC`
- `idx_tournaments_organizer` on `organizer_id`

---

#### Table: `tournament_participants`
**Purpose:** Many-to-many relationship between users and tournaments

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | |
| `tournament_id` | UUID | FOREIGN KEY → tournaments(id), NOT NULL | |
| `user_id` | UUID | FOREIGN KEY → users(id), NOT NULL | |
| `registration_date` | TIMESTAMP | DEFAULT NOW() | |
| `seed` | INTEGER | | Seeding position |
| `final_position` | INTEGER | | Final placement |
| `points_earned` | INTEGER | DEFAULT 0 | Championship points |
| `status` | ENUM | DEFAULT 'registered' | registered, confirmed, withdrawn, disqualified |

**Indexes:**
- Composite PRIMARY KEY: `(tournament_id, user_id)`
- `idx_tourn_part_user` on `user_id`

---

#### Table: `challenges`
**Purpose:** Store challenge requests between players

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique challenge identifier |
| `challenger_id` | UUID | FOREIGN KEY → users(id), NOT NULL | Player who sends challenge |
| `challenged_id` | UUID | FOREIGN KEY → users(id), NOT NULL | Player being challenged |
| `proposed_date` | TIMESTAMP | | Proposed match time |
| `proposed_venue` | VARCHAR(255) | | Proposed venue |
| `boards` | INTEGER | DEFAULT 5 | Best of X boards |
| `message` | TEXT | | Optional message |
| `status` | ENUM | DEFAULT 'pending' | pending, accepted, declined, expired, completed |
| `match_id` | UUID | FOREIGN KEY → matches(id) | Resulting match if accepted and played |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |
| `responded_at` | TIMESTAMP | | Time of response |
| `expires_at` | TIMESTAMP | | Challenge expiration (7 days) |

**Indexes:**
- `idx_challenges_challenger` on `challenger_id`
- `idx_challenges_challenged` on `challenged_id`
- `idx_challenges_status` on `status`

---

#### Table: `rankings_history`
**Purpose:** Track historical rankings for progression analysis

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | |
| `user_id` | UUID | FOREIGN KEY → users(id), NOT NULL | |
| `rank` | INTEGER | NOT NULL | Rank at this snapshot |
| `points` | INTEGER | NOT NULL | Championship points |
| `category` | ENUM | NOT NULL | overall, district, club, age_group |
| `category_value` | VARCHAR(100) | | Specific district/club/age group |
| `snapshot_date` | DATE | NOT NULL | Date of snapshot |

**Indexes:**
- Composite: `idx_ranking_user_date` on `(user_id, snapshot_date DESC)`
- `idx_ranking_category` on `(category, snapshot_date)`

---

#### Table: `live_streams`
**Purpose:** Store live streaming sessions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | |
| `streamer_id` | UUID | FOREIGN KEY → users(id), NOT NULL | User streaming |
| `match_id` | UUID | FOREIGN KEY → matches(id) | Associated match |
| `tournament_id` | UUID | FOREIGN KEY → tournaments(id) | Associated tournament |
| `title` | VARCHAR(255) | NOT NULL | Stream title |
| `description` | TEXT | | Description |
| `stream_url` | TEXT | NOT NULL | Live stream URL (RTMP/HLS) |
| `thumbnail_url` | TEXT | | Preview thumbnail |
| `status` | ENUM | DEFAULT 'scheduled' | scheduled, live, ended |
| `viewer_count` | INTEGER | DEFAULT 0 | Current viewers (live) |
| `peak_viewers` | INTEGER | DEFAULT 0 | Peak concurrent viewers |
| `recording_url` | TEXT | | Recorded video URL |
| `started_at` | TIMESTAMP | | Stream start time |
| `ended_at` | TIMESTAMP | | Stream end time |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- `idx_streams_streamer` on `streamer_id`
- `idx_streams_status` on `status`
- `idx_streams_started` on `started_at DESC`

---

#### Table: `posts`
**Purpose:** Community feed posts

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | |
| `user_id` | UUID | FOREIGN KEY → users(id), NOT NULL | Post author |
| `content` | TEXT | | Text content |
| `media_urls` | JSON | | Array of image/video URLs |
| `post_type` | ENUM | DEFAULT 'general' | general, match_result, announcement, achievement |
| `match_id` | UUID | FOREIGN KEY → matches(id) | If match-related |
| `tournament_id` | UUID | FOREIGN KEY → tournaments(id) | If tournament-related |
| `likes_count` | INTEGER | DEFAULT 0 | Total likes |
| `comments_count` | INTEGER | DEFAULT 0 | Total comments |
| `is_pinned` | BOOLEAN | DEFAULT FALSE | Pin to top (club announcements) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- `idx_posts_user` on `user_id`
- `idx_posts_created` on `created_at DESC`
- `idx_posts_type` on `post_type`

---

#### Table: `comments`
**Purpose:** Comments on posts

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | |
| `post_id` | UUID | FOREIGN KEY → posts(id), NOT NULL | |
| `user_id` | UUID | FOREIGN KEY → users(id), NOT NULL | Commenter |
| `content` | TEXT | NOT NULL | Comment text |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- `idx_comments_post` on `post_id`
- `idx_comments_user` on `user_id`

---

#### Table: `follows`
**Purpose:** User follow relationships

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `follower_id` | UUID | FOREIGN KEY → users(id), NOT NULL | User who follows |
| `following_id` | UUID | FOREIGN KEY → users(id), NOT NULL | User being followed |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- Composite PRIMARY KEY: `(follower_id, following_id)`
- `idx_follows_following` on `following_id`

---

#### Table: `notifications`
**Purpose:** User notifications

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | |
| `user_id` | UUID | FOREIGN KEY → users(id), NOT NULL | Recipient |
| `type` | ENUM | NOT NULL | challenge, match_result, comment, like, follow, tournament, stream |
| `title` | VARCHAR(255) | NOT NULL | Notification title |
| `message` | TEXT | NOT NULL | Notification message |
| `action_url` | TEXT | | Deep link to relevant screen |
| `is_read` | BOOLEAN | DEFAULT FALSE | Read status |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- Composite: `idx_notif_user_unread` on `(user_id, is_read, created_at DESC)`

---

#### Table: `achievements`
**Purpose:** Define available achievements/badges

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | |
| `name` | VARCHAR(100) | UNIQUE, NOT NULL | Achievement name |
| `description` | TEXT | | Description |
| `icon_url` | TEXT | | Badge icon |
| `criteria` | JSON | | Unlock criteria |

---

#### Table: `user_achievements`
**Purpose:** Track user-earned achievements

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `user_id` | UUID | FOREIGN KEY → users(id), NOT NULL | |
| `achievement_id` | UUID | FOREIGN KEY → achievements(id), NOT NULL | |
| `unlocked_at` | TIMESTAMP | DEFAULT NOW() | |

**Indexes:**
- Composite PRIMARY KEY: `(user_id, achievement_id)`

---

### 7.3 Firebase Schema (Chat)

#### Collection: `conversations`
**Purpose:** Chat conversations (1-on-1 or group)

```json
{
  "id": "conversation_uuid",
  "type": "direct" | "group",
  "participants": ["user_id_1", "user_id_2"],
  "participantDetails": {
    "user_id_1": {
      "name": "Rajesh Kumar",
      "photoUrl": "https://...",
      "lastRead": "timestamp"
    }
  },
  "lastMessage": {
    "text": "See you at 5pm",
    "senderId": "user_id_1",
    "timestamp": "timestamp"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### Sub-collection: `conversations/{id}/messages`
**Purpose:** Messages within a conversation

```json
{
  "id": "message_uuid",
  "senderId": "user_id",
  "text": "Great match today!",
  "mediaUrl": "https://..." // optional
  "type": "text" | "image" | "video",
  "timestamp": "timestamp",
  "readBy": ["user_id_1"] // array of user IDs who read this
}
```

**Indexes:**
- Query by `timestamp` descending for pagination

---

### 7.4 Database Relationships Diagram

```
users ──┬─── matches (player1_id, player2_id)
        ├─── tournaments (organizer_id)
        ├─── tournament_participants (user_id)
        ├─── challenges (challenger_id, challenged_id)
        ├─── live_streams (streamer_id)
        ├─── posts (user_id)
        ├─── comments (user_id)
        ├─── follows (follower_id, following_id)
        ├─── notifications (user_id)
        └─── user_achievements (user_id)

clubs ──┬─── users (club_id)
        └─── tournaments (club_id)

tournaments ──┬─── tournament_participants (tournament_id)
              ├─── matches (tournament_id)
              └─── live_streams (tournament_id)

matches ──┬─── live_streams (match_id)
          └─── posts (match_id)

achievements ─── user_achievements (achievement_id)

posts ──── comments (post_id)
```

### 7.5 Data Integrity & Constraints

**Foreign Key Cascades:**
- `users` deleted → SET NULL on `club_id` in `matches` (preserve match records)
- `tournaments` deleted → CASCADE on `tournament_participants`, `matches` with `tournament_id`
- `posts` deleted → CASCADE on `comments`

**Triggers:**
- Update `users.total_matches`, `wins`, `losses` when new match inserted
- Update `users.championship_points` when tournament results finalized
- Calculate `users.current_rank` based on `championship_points` (scheduled job)
- Update `clubs.member_count` when user joins/leaves club
- Update `posts.likes_count`, `comments_count` on like/comment insert
- Update `live_streams.viewer_count` in real-time (WebSocket)

**Scheduled Jobs:**
- Daily: Update rankings snapshot in `rankings_history`
- Daily: Expire old challenges (set status to 'expired')
- Weekly: Calculate and update user statistics
- Monthly: Archive old notifications

---

## 8. Technical Architecture

### 8.1 Technology Stack

#### Mobile App (Frontend)

**Primary Framework:** React Native + Expo

**Rationale:**
- Cross-platform (iOS + Android) with single codebase
- Strong community and ecosystem
- Expo simplifies development, OTA updates, and native module integration
- Excellent performance for media-rich apps
- Your team's existing JavaScript/TypeScript expertise

**Key Libraries:**
- **UI:** React Native Paper (Material Design) or NativeBase
- **Navigation:** React Navigation
- **State Management:** Zustand or Redux Toolkit
- **API Client:** Axios + React Query
- **Auth:** Firebase Auth or custom JWT
- **Real-time:** Firebase SDK for chat
- **Video Streaming:** react-native-video, expo-av
- **Camera:** expo-camera
- **Maps:** react-native-maps (for venue location)
- **Notifications:** Expo Notifications + Firebase Cloud Messaging
- **Form Management:** React Hook Form
- **Animations:** Reanimated 2

#### Backend (API)

**Framework:** Node.js + Express.js or NestJS

**Alternative:** Python + FastAPI (if team prefers Python)

**Rationale:**
- JavaScript/TypeScript consistency with frontend
- High performance for I/O-heavy operations (chat, streaming)
- Rich ecosystem for real-time features (Socket.io)
- Easy integration with PostgreSQL and Firebase
- Your team's existing Node.js experience

**Key Libraries:**
- **Database ORM:** Prisma (PostgreSQL) or TypeORM
- **Authentication:** Passport.js or custom JWT
- **Validation:** Joi or Zod
- **File Upload:** Multer + AWS S3 or Cloudinary
- **Real-time:** Socket.io
- **Scheduling:** node-cron or Bull (job queue)
- **Email/SMS:** SendGrid, Twilio, or Exotel
- **Logging:** Winston or Pino

#### Virtual Carrom Game

**Framework:** Phaser 3 (JavaScript game engine)

**Alternative:** Unity + WebGL export (if you want 3D graphics)

**Rationale:**
- Phaser: HTML5 game engine, integrates easily with React Native (WebView)
- Physics engine (Matter.js) for realistic carrom mechanics
- Lightweight and web-based
- If Phaser in WebView has performance issues, consider native game development (Unity + C#)

#### Database & Storage

**Primary Database:** PostgreSQL (managed: AWS RDS, DigitalOcean, or Supabase)

**Real-time Database:** Firebase Realtime Database or Firestore

**Caching:** Redis (for leaderboards, session management)

**File Storage:** AWS S3, Cloudinary, or Firebase Storage

**CDN:** Cloudflare or AWS CloudFront (for media delivery)

#### Video Streaming

**Protocol:** RTMP (ingest) → HLS (delivery)

**Options:**

1. **AWS IVS (Interactive Video Service):**
   - Managed live streaming
   - Low latency (< 5 seconds)
   - Automatic recording to S3
   - Pay-as-you-go pricing

2. **Mux:**
   - Developer-friendly API
   - Automatic transcoding and adaptive bitrate
   - Built-in analytics
   - Moderately priced

3. **Self-Hosted (OBS → Nginx RTMP → HLS):**
   - Most cost-effective
   - Full control
   - Requires server management
   - Good for MVP, may need migration later

**Recommendation for MVP:** Self-hosted Nginx RTMP on AWS EC2/DigitalOcean

**Recommendation for Scale:** AWS IVS or Mux

#### Hosting & Infrastructure

**API Hosting:** AWS EC2, DigitalOcean Droplets, or Vercel (for serverless functions)

**Database:** AWS RDS PostgreSQL or Supabase

**File Storage:** AWS S3 or Cloudinary

**Video Streaming:** AWS IVS (production) or Nginx RTMP (MVP)

**Mobile App Distribution:**
- iOS: TestFlight (beta) → App Store
- Android: Firebase App Distribution (beta) → Google Play

### 8.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (React Native + Expo)          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Home    │ │Rankings  │ │  Match   │ │ Profile  │      │
│  │  Feed    │ │  & Stats │ │  & Play  │ │ Settings │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │  Chat    │ │ Virtual  │ │  Live    │                    │
│  │  System  │ │  Carrom  │ │ Streaming│                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
└─────────────────────────────────────────────────────────────┘
        │                  │                    │
        │ REST API         │ WebSocket/Firebase │ Video Stream
        │                  │                    │
        ▼                  ▼                    ▼
┌────────────────┐  ┌────────────────┐  ┌─────────────────┐
│  API Gateway   │  │    Firebase    │  │  Video Streaming│
│  (Node.js +    │  │   (Realtime    │  │   (AWS IVS or   │
│   Express)     │  │   Database)    │  │   Nginx RTMP)   │
│                │  │                │  │                 │
│ ┌────────────┐ │  │ - Chat msgs    │  │ - RTMP ingest   │
│ │ Auth       │ │  │ - Presence     │  │ - HLS delivery  │
│ │ Matches    │ │  │ - Live updates │  │ - Recording     │
│ │ Rankings   │ │  │                │  │ - Adaptive rate │
│ │ Tournaments│ │  └────────────────┘  └─────────────────┘
│ │ Profiles   │ │
│ │ Challenges │ │
│ │ Feed       │ │
│ │ Streaming  │ │
│ └────────────┘ │
└────────────────┘
        │
        │ Database Queries
        │
        ▼
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  PostgreSQL    │────▶│     Redis      │     │   File Storage │
│   (Primary DB) │     │   (Caching)    │     │  (S3/Cloudinary│
│                │     │                │     │                │
│ - Users        │     │ - Leaderboards │     │ - Profile pics │
│ - Matches      │     │ - Sessions     │     │ - Match photos │
│ - Rankings     │     │ - Rate limits  │     │ - Videos       │
│ - Tournaments  │     │                │     │ - Recordings   │
│ - Clubs        │     └────────────────┘     └────────────────┘
│ - Posts        │
└────────────────┘

        ▼ Notifications
┌────────────────────────────────────────┐
│     Push Notifications                 │
│  Firebase Cloud Messaging (FCM)        │
│  - Challenge notifications             │
│  - Match updates                       │
│  - Tournament reminders                │
│  - Chat messages                       │
└────────────────────────────────────────┘
```

### 8.3 API Design (RESTful Endpoints)

**Base URL:** `https://api.carromcarrom.in/v1`

**Authentication:** JWT tokens in Authorization header: `Bearer <token>`

#### Authentication Endpoints

```
POST   /auth/send-otp          Send OTP to email/phone
POST   /auth/verify-otp        Verify OTP and return JWT
POST   /auth/refresh           Refresh access token
POST   /auth/logout            Logout and invalidate token
```

#### User Endpoints

```
GET    /users/me               Get current user profile
PUT    /users/me               Update current user profile
GET    /users/:id              Get user profile by ID
GET    /users/:id/stats        Get user statistics
GET    /users/:id/matches      Get user match history
GET    /users/:id/achievements Get user achievements
POST   /users/:id/follow       Follow a user
DELETE /users/:id/follow       Unfollow a user
GET    /users/search           Search users (query params: name, district, club)
```

#### Rankings Endpoints

```
GET    /rankings               Get leaderboard (query: category, district, limit, offset)
GET    /rankings/:userId       Get user's ranking details
GET    /rankings/history/:userId  Get rank progression over time
```

#### Matches Endpoints

```
POST   /matches                Log a new match
GET    /matches/:id            Get match details
PUT    /matches/:id            Update match details (for corrections)
DELETE /matches/:id            Delete match (admin only)
POST   /matches/:id/verify     Opponent verifies match result
GET    /matches                Get matches (filters: userId, tournamentId, date range)
```

#### Challenges Endpoints

```
POST   /challenges             Send a challenge
GET    /challenges             Get user's challenges (sent and received)
GET    /challenges/:id         Get challenge details
PUT    /challenges/:id/accept  Accept challenge
PUT    /challenges/:id/decline Decline challenge
DELETE /challenges/:id         Cancel challenge
```

#### Tournaments Endpoints

```
POST   /tournaments            Create tournament (organizers only)
GET    /tournaments            Get tournaments (filters: status, district, date)
GET    /tournaments/:id        Get tournament details
PUT    /tournaments/:id        Update tournament (organizer only)
POST   /tournaments/:id/register  Register for tournament
GET    /tournaments/:id/participants  Get participant list
POST   /tournaments/:id/results      Submit tournament results (organizer)
```

#### Clubs Endpoints

```
GET    /clubs                  Get all clubs
GET    /clubs/:id              Get club details
GET    /clubs/:id/members      Get club members
GET    /clubs/:id/posts        Get club announcements/posts
POST   /clubs/:id/join         Join club request
```

#### Posts & Feed Endpoints

```
POST   /posts                  Create a post
GET    /posts                  Get feed (following users + clubs)
GET    /posts/:id              Get post details
PUT    /posts/:id              Update post
DELETE /posts/:id              Delete post
POST   /posts/:id/like         Like a post
DELETE /posts/:id/like         Unlike a post
POST   /posts/:id/comments     Add comment
GET    /posts/:id/comments     Get comments
```

#### Live Streaming Endpoints

```
POST   /streams                Create/start stream
GET    /streams                Get live and recent streams
GET    /streams/:id            Get stream details
PUT    /streams/:id/end        End stream
GET    /streams/:id/viewers    Get current viewer count
```

#### Notifications Endpoints

```
GET    /notifications          Get user notifications
PUT    /notifications/:id/read Mark as read
PUT    /notifications/read-all Mark all as read
```

### 8.4 Security Considerations

**Authentication:**
- JWT tokens with short expiration (15 min access, 7 day refresh)
- Secure token storage (mobile: Secure Store/Keychain)
- OTP-based passwordless auth reduces password-related vulnerabilities

**Authorization:**
- Role-based access control (player, organizer, admin)
- Verify user owns resource before modification (match results, profiles)

**Data Protection:**
- HTTPS only (TLS 1.2+)
- Encrypt sensitive data at rest (PII in database)
- Sanitize all user inputs (prevent SQL injection, XSS)
- Rate limiting on API endpoints (prevent abuse)

**File Uploads:**
- Validate file types (images/videos only)
- Scan for malware
- Size limits (10MB photos, 100MB videos)
- Use signed URLs for private content

**Live Streaming:**
- Authenticate streamers before allowing broadcast
- Content moderation (report/block system)
- Stream access control (public vs. private streams)

**Privacy:**
- GDPR/local compliance (user data export, deletion)
- Users control profile visibility (public/private sections)
- Chat encryption (Firebase handles this)

---

## 9. Live Streaming Setup

### 9.1 Overhead Camera System

**Goal:** Capture entire carrom board from 90° overhead angle for professional broadcast quality.

#### Hardware Requirements

**Camera Options:**

1. **Smartphone (MVP Approach):**
   - **Device:** Any modern smartphone (2019+) with 1080p/60fps camera
   - **Pros:** Readily available, app-integrated, no extra hardware
   - **Cons:** Requires dedicated phone, battery life concern
   - **Cost:** ₹0 (using existing device)

2. **Action Camera (GoPro/DJI Osmo Action):**
   - **Pros:** Wide-angle lens, excellent stabilization, compact
   - **Cons:** Requires HDMI/USB capture card for mobile integration
   - **Cost:** ₹20,000-40,000

3. **Webcam (Logitech C920/C922):**
   - **Pros:** Direct USB connection, 1080p, good for laptops
   - **Cons:** Requires laptop/PC, not mobile-friendly for MVP
   - **Cost:** ₹5,000-10,000

4. **PTZ Camera (Pan-Tilt-Zoom - Professional):**
   - **Pros:** Remote control, multiple preset positions, professional quality
   - **Cons:** Expensive, requires dedicated control system
   - **Cost:** ₹50,000-1,50,000 (for Phase 3)

**Recommendation for MVP:** Smartphone on tripod/mount

**Recommendation for Scale:** Action camera or PTZ camera

#### Camera Mount/Rig

**Options:**

1. **Ceiling Mount (Permanent Installation - Club Setting):**
   - Bolt camera mount to ceiling above carrom board
   - Height: 5-6 feet above board for full view
   - Ensure stability (no vibration/swaying)
   - **Cost:** ₹2,000-5,000 (mount + installation)

2. **Overhead Tripod Stand (Portable):**
   - Heavy-duty tripod with boom arm extending over board
   - Height: Adjustable, 5-6 feet recommended
   - Requires counterweight for stability
   - **Cost:** ₹5,000-15,000

3. **DIY PVC Pipe Rig:**
   - Construct overhead frame using PVC pipes
   - Budget-friendly and customizable
   - **Cost:** ₹1,000-3,000

**Recommendation:** Overhead tripod stand (portable for tournaments)

#### Additional Equipment

- **Power Bank (10,000-20,000 mAh):** For extended smartphone streaming (₹1,500-3,000)
- **LED Ring Light (Optional):** For consistent board lighting (₹1,500-5,000)
- **Microphone (Optional for Phase 2):** Capture audio commentary (₹2,000-10,000)
- **Secondary Camera (Optional for Phase 2):** Player reactions (₹15,000-30,000)

**Total MVP Streaming Setup Cost:** ₹10,000-20,000 (assuming existing smartphone)

### 9.2 Streaming Workflow

#### Option A: Mobile App Direct Streaming (MVP)

**Flow:**
1. Organizer opens app → "Start Live Stream" button
2. Mount smartphone overhead (camera facing down)
3. App accesses camera, starts RTMP stream to server
4. Server converts RTMP to HLS for viewer playback
5. Viewers join via app notification/feed
6. Organizer manually enters scores during match (overlayed on stream)
7. End stream → Automatic recording saved

**Tech Stack:**
- **Mobile:** React Native + expo-camera + expo-av
- **Streaming Library:** react-native-nodemediaclient (RTMP publishing)
- **Server:** Nginx RTMP module on AWS EC2/DigitalOcean
- **Playback:** HLS in react-native-video

#### Option B: OBS to App Integration (Phase 2)

**Flow:**
1. Organizer uses laptop with OBS Studio
2. OBS captures camera feed (via USB/HDMI capture card)
3. OBS adds overlays (scores, player names, timer)
4. OBS streams to RTMP server
5. App pulls HLS stream and displays to viewers

**Pros:** Professional overlays, multi-camera switching in OBS
**Cons:** Requires laptop + OBS knowledge

### 9.3 Streaming Server Configuration (Self-Hosted MVP)

**Server:** DigitalOcean Droplet (4GB RAM, 2 vCPU) - ₹2,500/month

**Software:** Nginx with RTMP module

**Setup:**

```bash
# Install Nginx RTMP
sudo apt update
sudo apt install nginx libnginx-mod-rtmp

# Configure nginx.conf
rtmp {
    server {
        listen 1935;
        chunk_size 4096;

        application live {
            live on;
            record off;
            
            # Enable HLS
            hls on;
            hls_path /tmp/hls;
            hls_fragment 3;
            hls_playlist_length 60;
            
            # Authentication (verify streamer token)
            on_publish http://your-api.com/verify-stream;
        }
    }
}

http {
    server {
        listen 8080;
        
        location /hls {
            types {
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /tmp;
            add_header Cache-Control no-cache;
            add_header Access-Control-Allow-Origin *;
        }
    }
}
```

**Streaming URLs:**
- **RTMP Ingest (Mobile App publishes to):** `rtmp://your-server.com/live/stream-key`
- **HLS Playback (Viewers watch):** `http://your-server.com:8080/hls/stream-key.m3u8`

### 9.4 Score Overlay System

**MVP (Manual Entry):**
- Organizer has "Score Entry" screen while streaming
- Enters scores after each board
- App overlays score graphic on video using WebView or React Native canvas

**Phase 2 (Automated - AI):**
- Computer vision model detects coin positions
- Calculates score automatically
- Real-time overlay updates

---

## 10. Security & Compliance

### 10.1 Data Privacy

**User Data Protection:**
- Minimal data collection (only essential for app functionality)
- Explicit consent for data usage during onboarding
- Users can export/delete their data (GDPR compliance)

**Sensitive Data:**
- Email/phone encrypted in database
- Passwords NOT stored (OTP-based auth)
- Match locations anonymized (city-level, not exact GPS)

### 10.2 Content Moderation

**Chat & Posts:**
- Report/block functionality
- Automated profanity filter
- Admin review queue for reported content
- Sanctions: warning, temporary suspension, permanent ban

**Live Streams:**
- Streamers must agree to community guidelines
- Report stream button for viewers
- Admin can terminate live stream remotely if ToS violated

### 10.3 Age Verification

**Tournament Entry:**
- Age groups require verification (U-18, U-25)
- ID upload for age-restricted tournaments
- Admin approval process

### 10.4 Compliance

**Indian IT Act & Personal Data Protection Bill:**
- Data localization (store Indian user data in India if required)
- Consent management
- Grievance officer appointed

**Payment Compliance (Phase 3):**
- PCI-DSS compliance for in-app purchases
- Use certified payment gateways (Razorpay, Paytm, Stripe)

---

## 11. Success Metrics

### 11.1 MVP Success Metrics (First 3 Months)

**Adoption:**
- 200+ registered users (competitive players and organizers)
- 50+ active weekly users (WAU)
- 100+ matches logged
- 10+ live streams conducted

**Engagement:**
- Average session duration: 8+ minutes
- 60% of users create a complete profile
- 40% of users send at least one message
- 30% of users log at least one match

**Technical:**
- App crash rate < 2%
- API response time p95 < 500ms
- Stream latency < 8 seconds
- App store rating ≥ 4.0

**Feedback:**
- 70% of beta users complete feedback survey
- Net Promoter Score (NPS) > 40
- < 20% churn rate

### 11.2 Phase 2 Metrics (Months 4-9)

**Growth:**
- 1,000+ registered users
- 300+ weekly active users
- 50+ clubs onboarded
- 20+ tournaments organized

**Engagement:**
- 50% of users log matches monthly
- 60% of users watch at least one live stream
- 40% of users participate in virtual carrom game
- 25% of users engage with community feed weekly

**Monetization Readiness:**
- 10% of users indicate willingness to pay for premium features
- 50+ views per sponsored post/ad (testing ads)

### 11.3 Phase 3 Metrics (Months 10-18)

**Scale:**
- 10,000+ registered users
- 3,000+ monthly active users
- 100+ clubs
- 100+ tournaments

**Revenue:**
- ₹50,000-1,00,000/month from virtual currency sales
- ₹20,000-50,000/month from ads
- ₹10,000-30,000/month from premium subscriptions

**Ecosystem:**
- 100+ coaching sessions booked
- 500+ equipment purchases through e-commerce integration
- 50% of competitive players use app as primary carrom tool

---

## 12. Timeline & Resources

### 12.1 Development Timeline

**Phase 1: MVP Development (Months 1-6)**

**Month 1-2: Foundation**
- Week 1-2: Project setup, database design, API architecture
- Week 3-4: Authentication, user management backend
- Week 5-6: User profiles frontend (mobile app)
- Week 7-8: Rankings system backend + frontend

**Month 3-4: Engagement Features**
- Week 9-10: Match recording backend + frontend
- Week 11-12: Chat system integration (Firebase)
- Week 13-14: Challenge system backend + frontend
- Week 15-16: Community feed backend + frontend

**Month 5-6: Differentiation & Testing**
- Week 17-18: Live streaming setup + integration (beta)
- Week 19-20: Virtual carrom game (simple version)
- Week 21-22: Admin panel for tournament organizers
- Week 23-24: Testing, bug fixes, beta launch preparation

**Month 7: Beta Testing**
- Week 25-26: Closed beta with 50 competitive players
- Week 27-28: Feedback collection, bug fixes, iterative improvements

**Phase 2: Enhanced Engagement (Months 8-10)**
- Advanced rankings, match verification, automated matchmaking
- Enhanced profiles with analytics
- Multi-camera live streaming
- Tournament management system

**Phase 3: Monetization (Months 11-13)**
- Virtual currency & in-app purchases
- Premium subscriptions
- Enhanced virtual carrom game (online multiplayer)
- Advertising integration
- E-commerce

**Phase 4: Ecosystem Expansion (Months 14-18)**
- Coaching platform
- Federation partnerships
- Spectator engagement features (fantasy leagues)
- AI-powered features
- Regional expansion beyond West Bengal

### 12.2 Team Requirements

**MVP Team (Months 1-6):**

**Core Team (Full-time):**
- **1 Project Manager / Product Owner** (You - strategic direction, stakeholder management)
- **2 Full-Stack Developers** (React Native + Node.js + PostgreSQL)
- **1 UI/UX Designer** (Wireframes → high-fidelity designs, usability testing)
- **1 QA Engineer** (Testing, bug tracking)

**Part-time/Contract:**
- **1 DevOps Engineer** (Server setup, CI/CD pipelines) - 50% time
- **1 Game Developer** (Virtual carrom game - Phaser/Unity) - contract
- **1 Community Manager** (Beta tester coordination, feedback collection) - 50% time

**Total MVP Team:** 4-5 FTE (full-time equivalent)

**Post-MVP Team (Scaling):**
- Add 1-2 more developers
- Add backend specialist (for streaming optimization)
- Add marketing manager (user acquisition)
- Add customer support representative

### 12.3 Budget Estimate

**Development Costs (MVP - 6 months):**

**Team Salaries (Kolkata rates):**
- 2 Full-Stack Developers: ₹60,000-80,000/month each × 6 = ₹7,20,000-9,60,000
- 1 UI/UX Designer: ₹40,000-60,000/month × 6 = ₹2,40,000-3,60,000
- 1 QA Engineer: ₹30,000-50,000/month × 6 = ₹1,80,000-3,00,000
- 1 DevOps (50%): ₹40,000/month × 0.5 × 6 = ₹1,20,000
- 1 Game Dev (contract): ₹1,50,000-3,00,000 (one-time)
- **Total Team Cost:** ₹14,10,000-20,40,000

**Infrastructure (6 months):**
- AWS/DigitalOcean servers: ₹5,000-10,000/month × 6 = ₹30,000-60,000
- Firebase (Realtime DB, Auth, Storage): ₹2,000-5,000/month × 6 = ₹12,000-30,000
- Domain + SSL: ₹2,000
- Video streaming (Nginx RTMP on server): Included above
- File storage (S3/Cloudinary): ₹2,000-5,000/month × 6 = ₹12,000-30,000
- **Total Infrastructure:** ₹56,000-1,22,000

**Tools & Software:**
- Figma (design): ₹1,000/month × 6 = ₹6,000
- Project management (Jira/Notion): Free or ₹5,000
- Analytics (Mixpanel/Amplitude): Free tier for MVP
- Error tracking (Sentry): Free tier
- **Total Tools:** ₹11,000

**Hardware (Live Streaming Setup):**
- Overhead camera mount: ₹10,000
- Power banks, lights: ₹5,000
- **Total Hardware:** ₹15,000

**Miscellaneous:**
- Legal (ToS, Privacy Policy): ₹20,000
- App Store fees (iOS $99/yr, Android $25 one-time): ₹10,000
- Beta testing incentives: ₹20,000
- Contingency (10%): ₹1,50,000
- **Total Misc:** ₹2,00,000

**Total MVP Budget:** ₹16,92,000 - ₹24,88,000 (~₹17-25 lakhs)

**Post-MVP Operating Costs (Monthly):**
- Team: ₹2,50,000-4,00,000/month (expanding team)
- Infrastructure: ₹20,000-50,000/month (scaling with users)
- Marketing: ₹50,000-1,00,000/month (user acquisition)
- **Total Monthly (Phase 2):** ₹3,20,000-5,50,000

---

## Conclusion & Next Steps

### Summary

**Carrom Carrom** has the potential to become the central digital hub for West Bengal's carrom community by combining social networking, competitive gaming, live streaming, and comprehensive player management into a mobile-first platform.

**Key Strengths:**
- **First-mover advantage** in hyperlocal carrom community platform
- **Dual value proposition:** Real-world match tracking + virtual gameplay
- **Differentiated feature:** Professional live streaming with overhead camera
- **Strong product-market fit:** Addresses real pain points of existing carrom ecosystem
- **Scalable architecture:** Foundation for multi-state expansion

### Immediate Next Steps

**Week 1-2: Validation & Planning**
1. **Stakeholder Interviews:**
   - Interview 10-15 competitive players (understand needs, validate features)
   - Interview 3-5 tournament organizers (validate tournament management needs)
   - Interview 2-3 club leaders (understand club dynamics)

2. **Competitive Analysis:**
   - Deep dive into Carrom Pool, Carrom League
   - Analyze successful regional sports apps (if any)
   - Document differentiation strategy

3. **Finalize PRD:**
   - Incorporate feedback from stakeholder interviews
   - Prioritize MVP features based on feedback
   - Refine timeline and budget

**Week 3-4: Design & Setup**
1. **High-Fidelity Wireframes:**
   - Move from low-fidelity to interactive Figma prototypes
   - Conduct usability testing with 5-10 users
   - Iterate based on feedback

2. **Team Recruitment:**
   - Hire/assign core team members
   - Onboard team with PRD and design assets

3. **Technical Setup:**
   - Set up development environments
   - Configure version control (GitHub/GitLab)
   - Set up project management (Jira/Trello/Notion)
   - Provision initial servers (staging environment)

**Week 5-6: Development Kickoff**
1. **Sprint Planning:**
   - Break down MVP into 2-week sprints
   - Assign tasks to team members

2. **Development Begins:**
   - Database schema implementation
   - API foundation (auth, user management)
   - Mobile app scaffolding

3. **Weekly Reviews:**
   - Demo progress every Friday
   - Iterate based on feedback

**Month 2-6: Iterative Development → Beta Launch → Feedback → Scale**

---

This PRD provides a comprehensive roadmap for building Carrom Carrom from concept to launch. The document should be treated as a living document, updated regularly as you gather user feedback and market insights.

**Would you like me to dive deeper into any specific section, such as:**
- Detailed API specifications
- Database migration scripts
- User testing protocols
- Marketing & launch strategy
- Specific technology implementation guides

Let me know how I can further support this exciting project!