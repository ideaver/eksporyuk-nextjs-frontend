# Project Workflow Guidelines

This repository follows a structured workflow to maintain code integrity and facilitate collaboration among team members. Below are the guidelines to follow:

## Table of Contents

1. [Project Details](#project-details)
2. [Workflow Steps](#workflow-steps)
   - [Pull 'dev' Branch](#pull-dev-branch)
   - [Create New Integration Branch](#create-new-integration-branch)
   - [Submit Pull Request to 'dev' Branch](#submit-pull-request-to-dev-branch)
   - [Code Review and Merge](#code-review-and-merge)
   - [Repeat](#repeat)
3. [Branch Naming Guide](#branch-naming-guide)
4. [Additional Notes](#additional-notes)

## Project Details

- **Project Name**: EksporYuk Web
- **Stack**: NextJS, Storybook, Redux Toolkit, GraphQL

## Workflow Steps

### Pull 'dev' Branch

- Make sure to pull the latest changes from the 'dev' branch before starting any work.

### Create New Integration Branch

- For each integration task, create a new branch following the naming convention: `type-username-feature`.
- Example: `bugfix-johndoe-login`

### Submit Pull Request to 'dev' Branch

- Once the integration is complete, submit a pull request to merge your changes into the 'dev' branch.
- Ensure the pull request includes necessary details and follows the project's guidelines.

### Code Review and Merge

- After thorough review and testing, merge the changes into the 'dev' branch.
- Ensure all conflicts are resolved and the code meets the project standards.

### Repeat

- Repeat the process for subsequent tasks or iterations.

## Branch Naming Guide

| Branch Type | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| hotfix      | For quickly fixing critical issues, usually with a temporary solution |
| bugfix      | For fixing a bug                                                      |
| feature     | For adding, removing, or modifying a feature                          |
| test        | For experimenting with something which is not an issue                |
| wip         | For a work in progress                                                |

## Additional Notes

- Collaboration:

  - Feel free to collaborate and communicate with team members regarding tasks and updates.

- Code Quality:

  - Maintain high code quality standards and adhere to best practices throughout the development process.

- Communication:
  - Effective communication is key. Discuss any concerns or issues promptly with the team.

By adhering to these guidelines, we aim to streamline the development process and ensure the reliability and stability of our codebase. Happy coding!
