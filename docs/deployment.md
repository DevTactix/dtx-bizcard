# Deployment Instructions

This document outlines the deployment process for the project.

## Versioning and Publishing to NPM

### Prerequisites:

- Ensure you have the correct NPM token stored as a secret in GitHub (e.g., `NPM_TOKEN`).
- Ensure you have access to the repository and have configured the proper GitHub Actions workflow.

### Running the Versioning and Publish Script

To bump the version and publish the package to NPM, use the following command:

```bash
npm run npm:version-publish:<type>
```

Where `type` can be one of the following:

- `patch`
- `minor`
- `major`

Example:

```bash
npm run npm:version-publish:patch
```
