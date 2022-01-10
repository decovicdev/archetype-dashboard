# Getting Started


## Create an Account

### 1. Sign up on [beta.getarchetype.io/signup](http://beta.getarchetype.io/signup)

![Sign up](https://res.cloudinary.com/getarchetype/image/upload/v1641330730/homepage.png)



### 2. Create an Account 
![Create an account](https://res.cloudinary.com/getarchetype/image/upload/v1641330912/signup.png)

Enter your company email, name and create a password to get started!

### 3.  Create an API

Once you create your account and verify your email, on the next page, you can create an API. Enter the name of the API and your company name and then the authentication type. 

The authentication type setting refers to where your end users have to pass up their API key to your endpoints to be authorized. 

If you select no auth, your API is free to access without an API key and won't require a plan.

URL auth means that your users can add the ```apikey```field to the url query: 

[```https://api.uselantern.com/v2/company/list?apikey=d7b6bcf04a8441daae9e0829b36ee791```](https://api.uselantern.com/v2/company/list?apikey=d7b6bcf04a8441daae9e0829b36ee791)

Body means that we'll expect the ```apikey``` is in the request body. In these cases, we recommend against this if you have any secured GET requests.

Header means that we'll expect the ```apikey``` is in the request header like standard auth.

The most secure and reliable way you can use the  ```apikey```  would be sending the request in the header.

If you toggle the "Include a base free tier" button, all users who are registered are initialized with a valid API key with a certain quota. 

You can modify the quota limit of the free tier in the __Products__ page. The default limit is set to __1000__ API calls a month.


![Create an API](https://res.cloudinary.com/getarchetype/image/upload/v1641398643/createapi.png)

### 5.  Enter a Redirect and Return URL
Once you've clicked Create, you'll be taken to the settings page. Enter the return and redirect URL fields and then click save to save your changes.

![Settings](https://res.cloudinary.com/getarchetype/image/upload/v1641398915/api_settings.png)

For the return and redirect URL, enter any url that is within your domain. Typically, people set the redirect URL to be their users' setting page and the return url to the pricing page. 

These urls are set for the checkout session (the page where your users actually enter their credit card details and pay for your API) once they finish their checkout session. The redirect url is for a successful payment processing and return url is for when the user cancels the transaction.

### 6.  Link your Stripe Account

We use Stripe to process payments on your behalf. While you're on the settings page, click on "__Connect your stripe account__". 

![Link Stripe](https://res.cloudinary.com/getarchetype/image/upload/v1641399950/link-stripe.png)

This will take you through the flow to link Stripe to Archetype. If you don't already have a Stripe account, no worries, Stripe will walk you through the account creation process. 

Once you've successfully linked your Stripe account, it should take you back to the settings page. And then you can get started fully monetizing your API!

### 7.  Create a Product

Now that you've linked your API to your Stripe account, head over to the Product tab.
![Products](https://res.cloudinary.com/getarchetype/image/upload/v1641413782/products-list.png)

Here you can see a list of all the __currently offered__ products.

Products are all subscription plans that APIs can offer their end user. For more details head over to the [Product docs](docs.getarchetype.io/docs/products). 
Each product has a few features displayed:

* __Product Name__: This is the displayed name to your end user
* __Price__: This is how much users pay for this plan.
* __Length__: This is the duration of the plan. Currently we have the option of setting it as monthly and yearly. 
* __Subscribers__: This is how many people are currently on this plan (this includes both people in trial and those who have cancelled but their plan has not expired). 
* __Quota__: If you've set a quota for your plan, this is where you go. Currently it is measured by number of total calls per day. 

Products are all subscription plans that APIs can offer their end user. For more details head over to the [Product docs](docs.getarchetype.io/docs/products). 

You can create new products via the __Add Product__ button at the top right and edit/delete a current product with the 3 dots button on the far right of each product.

Once you've clicked __Add Product__ you'll be taken to the edit product page. ![Edit Product](https://res.cloudinary.com/getarchetype/image/upload/v1641413782/product-edit.png)
Here you need to edit the name, description, price, billing period and trial option.

If the usage is metered, that means that you can set a daily quota. If not, access will be unlimited. Best for the top tiers.

If you also want to add a free trial, we offer the ability to set a trial based on number of days/weeks/months. 

Once you're done modifying the product, you can hit __Save__ and it'll  add the product to your API immediately and that'll be reflected everywhere. 

When you __delete__ a product, it is removed from the available products list. There's some specific extra behavior that we cover in the [product docs](docs.getarchetype.io/docs/products).


### 8. Add your Endpoints

By default, any endpoint that is in your domain and not registered will allow full unrestricted access even to those who __DON'T__ have a valid API key. This way all your endpoints are safely still accessible.

Once you do add an endpoint to the Endpoint Page, it'll automatically be tied to Archetype's authorization protocol and count against user's quota.

![Add Endpoint](https://res.cloudinary.com/getarchetype/image/upload/v1641417817/endpoints-list.png) 

Once you select __Add New Endpoint__ you get taken to the edit endpoint page. Here you enter the

* __Name__: Name of the endpoint
* __Description__: Description of what the endpoint does
* __Methods__: Methods that your endpoint works with
* __Path__: The path to the endpoint. You don't need the full url to the endpoint, only the path For example:
	* uselantern.com/api/v1/companies/AAPL is entered as /api/v1/companies/AAPL

Then click __Create__ to actually register that endpoint. 

Right now all endpoints are valued at 1 API call for each query but we'll soon be allowing dynamic endpoint values 

![Add Endpoint](https://res.cloudinary.com/getarchetype/image/upload/v1641418848/edit-endpoint.png)


### 9. Integrate Archetype into your backend

We integrate with several backends right now but we'll be adding support as we develop them. The guides for each backend are linked as follows:

1. [Python WSGI](docs.archetype.dev/docs/python-wsgi-installation)
This is for backends in Python built in Django, Flask or Bottle services. 
2. [Python Lambda](docs.archetype.dev/docs/python-lambda-installation)
This is for backend services using AWS Lambda with Python. It's the easiest integration 


### 10. Integrate Archetype into your frontend

