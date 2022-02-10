# incompl - the incomplete URL Shortener

My first full stack app with React and a REST API.
The goal of this project was to build a functioning prototype URL shortener using C#, ReactJS, and a SQLite database,
while learning the basics of C#, .NET, and back end development.

### Prerequisites

* [.NET SDK 6.0](https://dotnet.microsoft.com/en-us/download)
* [Node.js v16.13.2](https://nodejs.org/dist/v16.13.2/)  
   ```sh
   npm install node@16.13.2
   
   or
  
   nvm install 16.13.2
   nvm use 16.13.2
   ```

### Installation

#### Back end
1. Clone the repo 
   ```sh
   git clone https://github.com/Gamedolf/incompl.git
   ```
2. Use NuGet to restore dependencies
   ```sh
   cd incompl/API
   dotnet restore
   ```
3. Run the server from the API folder
   ```sh
   dotnet run
   ```
   
   
#### Front end
1. Install NPM Packages
   ```sh
   cd incompl/client
   npm install
   ```
2. Run the client from the client folder
   ```sh
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in a browser to view the app.
