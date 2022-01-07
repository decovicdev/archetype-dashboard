# Python WSGI 
## Instructions for installing Archetype's Python SDK with WSGI Backends

### What is Archetype

Archetype is a powerful, reliable purchase server with cross-platform support. Our open-source framework provides a backend and a wrapper around Stripe to make implementing API keys and creating quotas and subscriptions easy. 

### Requirements
Python WSGI Backends: 
* __Django__
* __Flask__
* __Bottle__
This will not for work for ASGI Services like Quart

## Step 1: Import Archetype

When you initialize your WSGI app you'll probably have something similar to this

```python
from flask import Flask


app  =  Flask(__name__,  static_folder="web/build",  static_url_path="/")
```
Now you need to import and actually integrate Archetype into your initialization step.

Archetype will be created as a Middleware service that lives asynchronously to your main function run so it's non-blocking.
```python
from flask import Flask
from Archetype import Archetype, ArchetypeWSGI

config = { 
	"app_id": "YOUR_APP_ID", 
	"secret_key": "YOUR_SECRET_KEY" 
} 
archetype = Archetype(
	app_id=config["app_id"], 
	secret_key=config["secret_key"]
)
app = Flask(__name__,  static_folder="web/build",  static_url_path="/")
app.wsgi_app = ArchetypeWSGI(app.wsgi_app, config=config)
```

```YOUR_APP_ID ``` and ```YOUR_SECRET_KEY ``` can be found in your [API settings page](https://www.archetype.dev/settings) like so:

![Settings](https://res.cloudinary.com/getarchetype/image/upload/v1641446080/api-settings.png)


