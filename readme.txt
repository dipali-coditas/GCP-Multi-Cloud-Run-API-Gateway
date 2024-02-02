Cloud run with API Gateway:

Explore multi-language APIs (Node.js, Python) orchestrated with Docker, Google Cloud Run, and an API Gateway. Easily deploy, manage, and access APIs through Google Cloud Artifact Registry and Cloud Run services. Follow provided instructions to run locally and experience seamless integration with a consolidated API Gateway endpoint. Enhance your cloud-native development skills with this concise and interactive project! 🌐💻
___________________________________________________________________________________

Step 1 : Coding , VS code
________________________________________________________________________________________

file 1 : 

index.js

-$ npm install express

-$ node.index.js

access it using 

http://localhost:8080/nodeapi1
- Hello from my node API 1

http://localhost:8080/nodeapi2
- Hello from my node API 2
______________________________________________________________________________________

file 2 : 

main.py

-$ pip install flask

-$ pyhton main.py

http://127.0.0.1:8080/pythonapi1
- Hello from my Python API 1

http://127.0.0.1:8080/pythonapi2
- Hello from my Python API 2
______________________________________________________________________________________

Step 2 : Docker Docker engine, command prompt
___________________________________________________________________________________________

node app : 

Dockerfile.1

FROM node:21-slim

WORKDIR /app

COPY . /app

RUN npm install express

EXPOSE 8080

CMD [ "node","index.js" ]
________________________________________________________________________________

python app :

FROM python:slim

WORKDIR /app

COPY . /app

RUN pip install flask

EXPOSE 8080

CMD [ "python","main.py" ]

__________________________________________________________________________________________

Docker commands :

Docker build:

$ docker buildx build -f Dockerfile.1 -t nodeapp .
$ docker buildx build -f Dockerfile.2 -t pythonapp .

$ docker images 

REPOSITORY                         TAG             IMAGE ID       CREATED          SIZE
pythonapp                          latest          0f32aedf17db   9 minutes ago    147MB
nodeapp                            latest          c49964356285   26 minutes ago   210MB

$ docker run -d -p 4006:8080 --name nodecontainer nodeapp:latest
$ docker run -d -p 4007:8080 --name pythoncontainer pythonapp:latest

$ docker ps

CONTAINER ID   IMAGE              COMMAND                  CREATED          STATUS          PORTS                    NAMES
855bb5e85535   pythonapp:latest   "python main.py"         11 seconds ago   Up 10 seconds   0.0.0.0:4007->8080/tcp   pythoncontainer
1fe99ba46a9f   nodeapp:latest     "docker-entrypoint.s…"   58 seconds ago   Up 57 seconds   0.0.0.0:4006->8080/tcp   nodecontainer

___________________________________________________________________________________________________

Step 3 : Push Images to google cloud artifact registry.
___________________________________________________________________________________________________________________________

In Command prompt :

> gcloud auth login
> gcloud projects list

- gcloud config set project <project_name>
> gcloud config set project dipalis-project
__________________________________________________________________________________________________________________________________

In GCP : In artifact registry create one ne repo -named like "cloud run repo"

- copy down the path 

"asia-south1-docker.pkg.dev/dipalis-project/cloudrun" 

and then modify it in tagging process with  /<dockerhub_username>/<images_name>

nodeapp:

docker tag nodeapp:latest asia-south1-docker.pkg.dev/dipalis-project/cloudrun/dipalidocker15/nodeapp:latest

docker push asia-south1-docker.pkg.dev/dipalis-project/cloudrun/dipalidocker15/nodeapp:latest

pythonapp:

docker tag pythonapp:latest asia-south1-docker.pkg.dev/dipalis-project/cloudrun/dipalidocker15/pythonapp:latest

docker push asia-south1-docker.pkg.dev/dipalis-project/cloudrun/dipalidocker15/pythonapp:latest

- Now you can see this 2 images in artifact registry inside your artifact repository
__________________________________________________________________________________________________________________________________________________

Step 4  : Create Cloud Run Service
_____________________________________________________________________________________________________________________________________________________

1. Create a cloud run service 1 by selecting image node app image

https://nodeapp-zhr5mnjaia-el.a.run.app/nodeapi1
https://nodeapp-zhr5mnjaia-el.a.run.app/nodeapi2

2. Create a cloud run service 2 by selecting image python app image

https://pythonapp-zhr5mnjaia-el.a.run.app/pythonapi1
https://pythonapp-zhr5mnjaia-el.a.run.app/pythonapi2

__________________________________________________________________________________________________________________________________________________

Step 5  : Create An Api Gateway
_____________________________________________________________________________________________________________________________________________________

1.Create yaml file for api redirection in cloud runs and api's

fileanme : cr_node_python_gateway.yaml : Ref : github yaml_docs_sample.txt

2. Create api gateway 

- API : add "Display name" and "API ID"
- API Config : 1.add fields then browse file cr_node_python_gateway.yaml and upload it, 2.add "Display name", 3.add default service account
- Gateway details : add "Display name", add "location"
- Create Gateway

> https://cr-node-py-gateway-1s54bnfh.ue.gateway.dev/

Hello from my node API 1

> https://cr-node-py-gateway-1s54bnfh.ue.gateway.dev/nodeapi2

Hello from my node node API 2

> https://cr-node-py-gateway-1s54bnfh.ue.gateway.dev/pythonapi1

Hello from my Python API 1

> https://cr-node-py-gateway-1s54bnfh.ue.gateway.dev/pythonapi2

Hello from my Python API 2






















 
