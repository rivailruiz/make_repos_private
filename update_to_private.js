const { Octokit } = require('@octokit/rest');

// Replace 'YOUR_ACCESS_TOKEN' with your personal access token
const accessToken = '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';

// Create an Octokit instance using your access token
const octokit = new Octokit({ auth: accessToken });

// Function to set a repository to private
async function setRepositoryToPrivate(repo) {
  try {
    await octokit.repos.update({
      owner: repo.owner.login,
      repo: repo.name,
      private: true
    });
    console.log(`Set ${repo.name} to private.`);
  } catch (error) {
    console.log(`Failed to set ${repo.name} to private: ${error.message}`);
  }
}

// Function to fetch and update repositories
async function updateRepositories() {
  try {
    // Get the authenticated user
    const { data: user } = await octokit.users.getAuthenticated();

    // Get all repositories owned by the user
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100 // Adjust the number of repositories per page as needed
    });

    // Iterate over each repository and set it to private
    for (const repo of repos) {
      await setRepositoryToPrivate(repo);
    }
  } catch (error) {
    console.log(`Error fetching repositories: ${error.message}`);
  }
}

// Call the function to update repositories
updateRepositories();
