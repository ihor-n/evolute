# Technical Assessment: User Management Dashboard

**Duration**: 2 days
**Stack**: Express, Mongodb, React, TypeScript, Tailwind CSS

## Background

Our product is a survey platform for manufacturing companies. Companies build panels of 50-100 users and send surveys to these panels. We have a large user database but lack internal tools for efficient user management.

## TASK OVERVIEW

Create a simplified user management dashboard that allows internal staff to:

1. View user data in a table format
2. Filter and search users based on specific criteria
3. Add multiple users simultaneously to a new manufacturer
4. Add a users statistics page (see "Backend"-Chapter)

## Technical Requirements

### Backend

- Implement a Node.js Express Server with a class-based, object-oriented architecture
- Create the necessary API endpoints to provide the functionality listed in "Task Overview"
- Create a MongoDB aggregation pipeline to analyze user engagement based on their participation and activity data. The goal is to generate a report that includes the following:
  - User Engagement Score: Calculate a score for each user based on their participation in surveys and their last active date.
  - Engagement Level: Categorize users into different engagement levels (e.g., "Highly Engaged", "Moderately Engaged", "Low Engagement") based on their engagement score.
  - Demographic Insights: Provide insights into the engagement levels across different demographic groups (e.g., age range, gender).
  - Technical Requirements:
    - Use MongoDB's aggregation framework to perform the operations.
    - Ensure the aggregation is efficient and handles large datasets.

### Frontend

- Create a dashboard using React and Tailwind CSS (You can also use frameworks and component libraries of your choice)
- Implement a data table with the following features:
  - Sortable & filterable columns
  - server-side filtering
  - Multi-select functionality

## Sample Data

We provided some sample data for you in ./SAMPLE_DATA.ts

## Implementation Guidelines

0. AI Usage is allowed but be prepared to explain where and how you used it

1. Backend Architecture

   - Create a UserService class with dependency injection
   - Implement repository pattern for data access
   - Use proper separation of concerns

2. Frontend Implementation

   - Use React hooks effectively
   - Implement proper state management
   - You can use any of your desired libraries for data fetching
   - Create reusable components where appropriate

3. Code Quality
   - Write clean, maintainable code
   - Use TypeScript features appropriately

## Starting Point

In this project you'll find:

- Sample user data see `SAMPLE_DATA.ts`

## Evaluation Criteria

- Decisionmaking & Priotization
- Code organization and architecture
- TypeScript usage and type safety
- Problem-solving approach
- Component design and reusability
- Error handling
- Code style and clarity
- Time management

## Bonus Points

- Unit tests for critical functions
- Loading states
- Error boundary implementation
