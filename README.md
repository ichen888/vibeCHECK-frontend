# vibeCHECK Frontend

VibeCHECK is a web-based application that allows users to analyze influencer behavior and public sentiment. Users can view content related to influencers, such as YouTube videos and comments, and vote whether the influencer's vibe is 'good' or 'bad.' The system analyzes scraped data from YouTube and stores it in a MySQL database. Users will be able to vote on influencer behavior based on publicly available content and comments in the future. (will be further developed to input datas from tmz too.)

## Project Overview

vibeCHECK is an interactive platform that allows users to:
- Search for celebrities
- View real-time sentiment analysis
- Participate in voting
- Track media sentiment and viewer reactions
- View recent news and community comments

## Design Reference

We started our planning process on Figma by designing a complete wireframe of what we expect the public user facing experience to look like. This mainly consists of the home page and the celebrity profile page. The Enterprise login flow was developed but we have yet to visualize the final dashboard for our celebrity clients.
The application's design is based on [this Figma wireframe](https://www.figma.com/design/tnI1ROfsFqTrYPKUdABruG/vibeCheck?node-id=4-99&t=WS81IPDE2VkEVD72-1), which outlines our final envisioned user experience.
- We have only built out the Celebrity Profile page from this wireframe but we expect to implement the full experience at completion.

![Figma Prototyping Wireframe](wireframe.png)

Versus our Current React Prototype

![React Prototype](reactprototype.png)

## Component Structure

Under the guidance from the assignment instructions, we split the functionality of the profile page between multiple components that each provide a certain feature for the celebrity profile page.

This development was heavily assisted with Claude 3.5 Sonnett. Human debugging was required although there may be some efficiencies/redundant/messy code we aim to clean up on final release.

### App.js
The main application container that:
- Manages global state
- Handles routing and component composition
- Coordinates data flow between components
- Maintains the overall layout and structure

### SearchBar.js
A search component that:
- Fetches celebrity data from the API
- Provides real-time search functionality
- Returns matched celebrity information
- Handles error states and loading conditions

### NewsSection.js
Displays recent news and updates:
- Fetches content from the API's /content endpoint
- Filters content by celebrity ID
- Shows the three most recent news items
- Provides placeholder content when needed

### RecentContent.js
Manages user comments and interactions:
- Pulls data from the API's /comments endpoint
- Displays recent community feedback
- Filters comments by celebrity ID
- Shows placeholder content when no data is available

### VoteSection.js
Handles user voting functionality:
- Displays current vibe scores
- Manages voting buttons
- Shows good/bad vibe percentages
- Integrates with the API for vote submission

This has yet to be fully built out as it will require us to perform push calls to our API which is not fully set up yet. This will be completed by the final release.

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/ichen888/vibeCHECK-frontend.git
cd vibeCHECK-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Dependencies

- React 18.x
- React Router 6.x
- Other dependencies can be found in package.json

## Backend Integration

This frontend application integrates with the [vibeCHECK Backend](https://github.com/Kyrie21323/FinalProject), which provides:
- Celebrity data management
- Sentiment analysis
- Content aggregation
- User interaction handling

Ensure the backend server is running before starting the frontend application.

## API Endpoints

The application currently interacts with the following endpoints:

- `GET /influencers`: Retrieves celebrity list
- `GET /content`: Fetches news and updates
- `GET /comments`: Retrieves user comments
- `POST /votes`: Submits user votes (future implementation)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Backend development by our team here (https://github.com/Kyrie21323/FinalProject)
- UI/UX design reference from Figma
- React.js community and documentation

## Future Improvements

- Implement user authentication
- Add social media integration
- Expand celebrity database
- Enhance voting system
- Add real-time updates
- Implement comment functionality

For more information about the backend implementation, visit the [Backend Repository](https://github.com/Kyrie21323/FinalProject).

Citations:
[1] https://github.com/ichen888/vibeCHECK-frontend.
