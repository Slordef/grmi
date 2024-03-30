# GRMI (GitHub Runners Manager Instance)
GRMI is a tool designed to manage GitHub Actions Runners on a self-hosted machine.
It offers a panel for easy management of your runners and creates endpoints to streamline runner operations.

## Requirements
To use GRMI, you need:

- Docker and Docker Compose for container management.
- A GitHub account and a repository to connect with the self-hosted runners.

## How GRMI Works
- **Docker Container Management**: Dynamically creates and destroys Docker containers that host GitHub Runners,
connecting them to your specified GitHub repository.
- **Configuration**: Utilizes JSON files for user and repository configuration, allowing for a tailored runner setup.
- **Webhooks and Endpoints**: Responds to GitHub webhooks to manage runner instances,
ensuring they are active when needed and cleaned up after use.

### Use

#### Setup 1
1. **Configuration**: Set up your runner configurations in the `config` directory.
You can create multiple configurations for different repositories.\
Configuration files should be named `user.json` and `repositories.json`.\
Example configurations are available in the `config` directory:
[user.json](config/user.json) and [repositories.json](config/repositories.json)\
Notice that the `repositories.json` file should contain an array of objects and `user.json` should contain a single object.
2. **Start GRMI**: Run the following command to start the GRMI service:
```bash
docker run --privileged -d -p 9997:9997 -v ./config:/app/config --name grmi slordefweb/grmi:latest
```
3. **Webhook Configuration**: Set up a webhook in your GitHub repository to point to the GRMI instance.
The webhook should be triggered on the `repository` event.
4. **Runner Registration**: Once the webhook is set up,
the runner will automatically register with the GRMI instance.
You can view the runner status and manage it through the GRMI panel.

#### Setup 2
1. **Configuration**: Set up your runner configurations in the `config` directory.
Like in Setup 1, you can create multiple configurations for different repositories.
2. **Extract the zip file**: Extract the zip file `build.tar.gz` containing the GRMI application.
3. **Start GRMI**: Run the following command to start the GRMI service:
```bash
npm start
```
4. **Webhook Configuration**: Set up a webhook in your GitHub repository to point to the GRMI instance.
The webhook should be triggered on the `repository` event.
5. **Runner Registration**: Once the webhook is set up, the runner will automatically register with the GRMI instance.
You can view the runner status and manage it through the GRMI panel.

## Future Enhancements
- **UI Client**: Plans are in place to develop a user interface,
making the configuration process more intuitive and less dependent on manual file edits.
- **State Management**: Efforts are underway to enhance the application's ability to maintain state,
providing robust control over runner instances.

## Security and Configuration
- Manage your runner configurations securely with JSON files,
ensuring sensitive information like GitHub tokens are appropriately handled.

## Contributing
Your contributions are welcome! Whether it's feature development, bug fixes, or enhancements,
feel free to fork, modify, and submit pull requests.

### Development
Contributing to the development of this project is straightforward.
If you're ready to contribute, just fork the repository and clone it to your local machine.

### Requirements
Before you start, ensure you have the following installed:

- **Docker**: The project uses Docker to ensure a consistent development environment.
No specific version is required as the Docker setup is designed to work with the latest versions.
- **Docker Compose**:   Used to manage multi-container Docker applications.
The docker-compose.yml file is fully configured and manages all necessary services automatically.
- **NodeJS**: Version 18 is recommended for compatibility with the project's dependencies.
- **PNPM**: This project uses PNPM for package management.
It handles all dependencies and triggers necessary post-installation scripts.

### Installation
To set up your development environment, follow these steps:

1. Clone the repository: If you're familiar with Git, fork and clone the repository to get started.
```bash
git clone <repository-url>
```

2. Install dependencies: Run the following command to install the necessary Node.js packages using PNPM:
```bash
pnpm install
```
This command also triggers any post-installation scripts required for setting up the project.

### Run Development Configuration
To run the project in development mode, use the following command:
```bash
pnpm run dev
```
This command starts a nodemon instance of the application, allowing for live reloading and real-time updates during development.

### Contributing
- **Code Contributions**: Ensure all dependencies and prerequisites are installed before starting.
There's no strict coding style guide, but please keep your code clean and comment where necessary.
- **Discussions and Issues**: Feel free to open issues for bugs or feature requests.
If you have any questions or suggestions, you can initiate discussions in the designated
discussion section (if available) or use the issues section.

### Updates and Maintenance
- **Dependencies**: Keep your local development environment up-to-date by regularly pulling changes
from the main branch and updating dependencies with pnpm update.

### Troubleshooting
- **Issues**: If you encounter any problems during the setup or development, check the project's issues section.
You might find solutions or you can open a new issue for assistance.