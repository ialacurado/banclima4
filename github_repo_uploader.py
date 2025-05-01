import os
import subprocess
import requests
import json
import argparse
from getpass import getpass

def create_github_repo(token, repo_name, description="", private=False):
    """
    Create a new GitHub repository using the GitHub API
    """
    url = "https://api.github.com/user/repos"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    data = {
        "name": repo_name,
        "description": description,
        "private": private
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    if response.status_code == 201:
        print(f"Repository '{repo_name}' created successfully!")
        return response.json()["html_url"]
    else:
        print(f"Failed to create repository. Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None

def init_and_push_to_repo(repo_url, folder_path, github_username, token):
    """
    Initialize a Git repository, add files, and push to GitHub
    """
    # Change to the specified directory
    os.chdir(folder_path)
    
    # Initialize Git repository
    subprocess.run(["git", "init"], check=True)
    
    # Add all files
    subprocess.run(["git", "add", "."], check=True)
    
    # Commit changes
    subprocess.run(["git", "commit", "-m", "Initial commit"], check=True)
    
    # Add remote origin with authentication
    remote_url = repo_url.replace("https://", f"https://{github_username}:{token}@")
    subprocess.run(["git", "remote", "add", "origin", remote_url], check=True)
    
    # Push to GitHub
    subprocess.run(["git", "push", "-u", "origin", "master"], check=True)
    
    print(f"Files successfully pushed to {repo_url}")

def main():
    parser = argparse.ArgumentParser(description="Upload files to a new GitHub repository")
    parser.add_argument("--folder", required=True, help="Path to the folder containing files to upload")
    parser.add_argument("--repo-name", required=True, help="Name for the new GitHub repository")
    parser.add_argument("--description", default="", help="Description for the new GitHub repository")
    parser.add_argument("--private", action="store_true", help="Make the repository private")
    parser.add_argument("--username", required=True, help="GitHub username")
    
    args = parser.parse_args()
    
    # Get GitHub personal access token securely
    token = getpass("Enter your GitHub personal access token: ")
    
    # Create GitHub repository
    repo_url = create_github_repo(token, args.repo_name, args.description, args.private)
    
    if repo_url:
        # Initialize and push to the repository
        init_and_push_to_repo(repo_url, args.folder, args.username, token)
        print(f"Repository URL: {repo_url}")

if __name__ == "__main__":
    main()