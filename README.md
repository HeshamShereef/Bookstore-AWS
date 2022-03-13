# Bookstore-AWS

A book store application where you can browse and search for books, manage your cart, checkout.


*Project Components Summary*

The goal of AWS Bookstore Demo App is to provide a fully-functional web application that utilizes multiple purpose-built AWS databases and native AWS components like Amazon API Gateway and AWS CodePipeline. Increasingly, modern web apps are built using a multitude of different databases. Developers break their large applications into individual components and select the best database for each job. Let's consider AWS Bookstore Demo App as an example. The app contains multiple experiences such a shopping cart, product search, recommendations, and a top sellers list. For each of these use cases, the app makes use of a purpose-built database so the developer never has to compromise on functionality, performance, or scale. 

The provided CloudFormation template automates the entire creation and deployment of AWS Bookstore Demo App.  The template includes the following components:

In this project I used CloudFormation template to automate the creation and deployment of the app with the following components:

**Database components**

* Product catalog/shopping cart - Amazon DynamoDB 
* Search - Amazon Elasticsearch Service 

**Application components**

* Serverless service backend – Amazon API Gateway powers the interface layer between the frontend and backend, and invokes serverless compute with AWS Lambda.  
* Web application blueprint – I included a React web application pre-integrated out-of-the-box with tools such as React Bootstrap, Redux, React Router, internationalization, and more.

**Infrastructure components**

* Continuous deployment code pipeline – AWS CodePipeline and AWS CodeBuild 
* Serverless web application – Amazon CloudFront and Amazon S3 


## Architecture

**Frontend**

Amazon CloudFront caches the frontend content from S3, presenting the application to the user via a CloudFront distribution.  The frontend interacts with Amazon Cognito and Amazon API Gateway only.  Amazon Cognito is used for all authentication requests, whereas API Gateway (and Lambda) is used for all API calls interacting across DynamoDB, Elasticsearch, ElastiCache, and Neptune. 

**Backend**

The core of the backend infrastructure consists of Amazon Cognito, Amazon DynamoDB, AWS Lambda, and Amazon API Gateway. The application leverages Amazon Cognito for user authentication, and Amazon DynamoDB to store all of the data for books, orders, and the checkout cart. As books and orders are added, Amazon DynamoDB Streams push updates to AWS Lambda functions that update the Amazon Elasticsearch cluster and Amazon ElasticCache for Redis cluster.  Amazon Elasticsearch powers search functionality for books 


**Developer Tools**

The code is hosted in AWS CodeCommit. AWS CodePipeline builds the web application using AWS CodeBuild. After successfully building, CodeBuild copies the build artifacts into a S3 bucket where the web application assets are maintained (like book cover photos, web graphics, etc.). Along with uploading to Amazon S3, CodeBuild invalidates the cache so users always see the latest experience when accessing the storefront through the Amazon CloudFront distribution.  AWS CodeCommit. AWS CodePipeline, and AWS CodeBuild are used in the deployment and update processes only, not while the application is in a steady-state of use.




### Amazon DynamoDB

The backend of AWS Bookstore Demo App leverages Amazon DynamoDB to enable dynamic scaling and the ability to add features as we rapidly improve our e-commerce application. The application create three tables in DynamoDB: Books, Orders, and Cart.  DynamoDB's primary key consists of a partition (hash) key and an optional sort (range) key. The primary key (partition and sort key together) must be unique.

### Amazon API Gateway

Amazon API Gateway acts as the interface layer between the frontend (Amazon CloudFront, Amazon S3) and AWS Lambda, which calls the backend (databases, etc.). Below are the different APIs the application uses:

**Books (DynamoDB)**

GET /books (ListBooks)  
GET /books/{:id} (GetBook)

**Cart (DynamoDB)**

GET /cart (ListItemsInCart)  
POST /cart (AddToCart)  
PUT /cart (UpdateCart)  
DELETE /cart (RemoveFromCart)  
GET /cart/{:bookId} (GetCartItem)


**Search (Elasticsearch)**

GET /search (SearchES)

### Amazon Elasticsearch

Amazon Elasticsearch Service powers the search capability in the bookstore web application, available towards the top of every screen in a search bar.  Users can search by title, author, and category.

### Amazon Cognito

Amazon Cognito handles user account creation and login for the bookstore application. 

### Amazon CloudFront and Amazon S3

Amazon CloudFront hosts the web application frontend that users interface with. 

### Amazon VPC

Amazon VPC (Virtual Private Cloud) is used with Amazon Elasticsearch Service



### Pipeline tools

 AWS CodeCommit, AWS CodePipeline, AWS CodeBuild
 
