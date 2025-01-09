# ALX Files Manager

ALX Files Manager is a robust file management system designed to handle user file operations efficiently. It supports uploading, downloading, and organizing files with ease.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gasimhacker/alx-files_manager.git
   ```
2. Navigate to the project directory:
   ```bash
   cd alx-files_manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run start-server
   ```

## Usage

After installation, you can start the server:

```bash
npm run start-server
```

### Example

#### Authenticate a user:
Sign-in the user by generating a new authentication token:

```bash
curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
```

Response:
```json
{"token":"031bffac-3edc-4e51-aaae-1c121317da8a"}
```

#### Retrieve the user:
Retrieve the user base on the token used:

```bash
curl 0.0.0.0:5000/users/me -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" ; echo ""
```

Response:
```json
{"id":"5f1e7cda04a394508232559d","email":"bob@dylan.com"}
```

#### Create (Upload a File):
Send a POST request to `/files` with the file data in JSON format:

```bash
curl -XPOST 0.0.0.0:5000/files -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" -H "Content-Type: application/json" -d '{ "name": "myText.txt", "type": "file", "data": "SGVsbG8gV2Vic3RhY2shCg==" }' ; echo ""
```

Response:
```json
{
  "id": "5f1e879ec7ba06511e683b22",
  "userId": "5f1e7cda04a394508232559d",
  "name": "myText.txt",
  "type": "file",
  "isPublic": false,
  "parentId": 0
}
```

#### Read (Retrieve a File):
Send a GET request to `/files/:id` to retrieve the file details:

```bash
curl -XGET 0.0.0.0:5000/files/5f1e879ec7ba06511e683b22 -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" ; echo ""
```

Response:
```json
{
  "id": "5f1e879ec7ba06511e683b22",
  "userId": "5f1e7cda04a394508232559d",
  "name": "myText.txt",
  "type": "file",
  "isPublic": false,
  "parentId": 0
}
```

#### Update (Publish a File):
Send a PUT request to `/files/:id/publish` to make a file public:

```bash
curl -XPUT 0.0.0.0:5000/files/5f1e879ec7ba06511e683b22/publish -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" ; echo ""
```

Response:
```json
{
  "id": "5f1e879ec7ba06511e683b22",
  "userId": "5f1e7cda04a394508232559d",
  "name": "myText.txt",
  "type": "file",
  "isPublic": true,
  "parentId": 0
}
```

#### Disconnect a user:
Sign-out the user based on the token:

```bash
curl 0.0.0.0:5000/disconnect -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" ; echo ""
```

Response:
```json

```

## Features

- **File Upload**: Upload files seamlessly.
- **File Download**: Download stored files.
- **File Organization**: Organize files into directories.
- **User Authentication**: Secure user access.
- **Image Thumbnails**: Automatically generate image thumbnails for uploaded image files, making it easier to preview images without downloading them.
- **Queuing System**: Efficiently handle tasks like file processing and thumbnail generation using Bull, a high-performance Node.js queue library.
- **Scalable Architecture**: Built to handle large-scale file operations with ease.
- **Error Handling**: Robust error handling mechanisms ensure smooth operation even under unexpected conditions.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
