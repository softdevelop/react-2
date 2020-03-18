Task

Hello! Here we're going to create a small app that consists of one button, one table, and one modal window. To implement this you need to use React (create-react-app environment is not allowed).

Let's start with the page description. Initially, we have: 

1. Button "Add record". This button will open modal window if you click on it.
2. Table with the columns: Name, Email, Phone, Action. In the first three columns (Name, Email, Phone) we're going to show saved text data. And in the last one (Action column), user has to icons: first to edit the row content, second to remove the row. 

Name	Email	Phone	Action

3. The modal window includes three tabs: Name, Email, Phone. Each tab includes an input text field without labels. At the bottom of the modal window, the user has the ability to Add/Save(depends on context) the form data or Cancel changes. No matter if it is Add or Edit operation, it's required to use the same modal window. All the data in the modal window should be removed if "Add record" clicked. All the data of the row should be passed to the modal window if the "Edit icon" clicked. No special requirements for input-fields.

It is expected that after reloading the page, the table filled with data will retain its values.

The app should be available on localhost:3000 after "npm install && npm start".

Result
We expect the opportunity to fill in the table with data and the ability to edit them through a modal window. It is also expected that each row can be deleted. Please note that in the modal window each field should be located in a separate tab and filled in with the corresponding value in case of editing. After the page refresh, all the data should be retrieved.

We're waiting for your code in GitHub or Bitbucket.