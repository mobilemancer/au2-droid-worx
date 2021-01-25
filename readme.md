# Droid Worx - An Aurelia 2 Azure Static Web App Demo

This is an Aurelia 2 demo app. It's hosted on Azure Static Web Apps, and uses C# for the API.

Check out the live app [here](https://www.droidworx.dev/).

## Running The Code

To run this example on your local machine I recommend using VSCode.

### Pre Requisites

1. An Azure account.
2. Install the Azure Static Web App extension in VSCode.
3. Install the Azure Functions extension for VSCode.
4. Install Node and npm.

### Setup of the Azure Static Web App

1. Fork or copy the code from this repository.
2. Remove the files in the .github folder.
3. Use the Azure Static Web App plugin in VSCode to create a new Azure Static Web App.

   - Use the following parameters for the setup
   - app_location: "/"
   - api_location: "api"
   - output_location: "dist"

4. Push the updated files to your repository.
5. Go to GitHub and approve the Workflow to access your Azure Subscription.

### Running the App on Your Local Machine

1. Run `npm install`.
2. Press F5 in VSCode to start the API.
3. Run `npm start`.
4. Have fun playing around with the code! 😁

## For more Aurelia 2 Content

Sign up for our newsletter at [aureliaweekly.com](https://www.aureliaweekly.com/).

Check out my blog at [mobilemancer.com](https://mobilemancer.com), where I occasionally blog about Aurelia, .NET and Azure topics.

Get a hold on me on Twitter [@mobilemancer](https://twitter.com/mobilemancer) or [LinkedIn](https://www.linkedin.com/in/awanqvist/).
