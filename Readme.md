### Description

Example project nextjs + material ui + nestjs + docker   
Implements and Auth system based on cookies   
Showcases an example backend system


NOTE:
Both api and ui are in the same folder to ease the use of showcasing the examples.


### How to run

Clone the project.   
Add an alias, the new security rules from chrome need it for the cookie auth:

```shell
echo '127.0.0.1 omni.localhost' | sudo tee -a /etc/hosts
```

On first start

```shell
make init
```

Start the api in one terminal tab

```shell
make start
```

Add some demo data to the app
```shell
make seeds
```

Start the ui in another terminal tab

```shell
cd omni-ui
npm run dev
```

## URLS
Urls for UI: http://omni.localhost:1090/   
Urls for API: http://omni.localhost:3033/ 

User accounts are seeded through the `user.seed-provider.ts`  
Example user: `test1@test.de`, pass: `test123`