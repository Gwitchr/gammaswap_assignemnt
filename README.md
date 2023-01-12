# Challenge 

## XD Prototype 

Comments: 

in no particular order

- I realise that I express a lot better when it comes to tuning the final version than the prototype, I feel short of states and other elements
- This is more of a raw draft just to understand elements and weights and make sure that that the structure, colors in general work 
- I saw a lot of prototypes and mockups for crypto traders and almost all of them are dark theme based 
- Compared to banks and other institutions I went for a ligher tone and transparente cards to transmit well transpraency 
- Changed the order of the elements compared to other examples cause is my opinion that for ltr reading most important elements come first and in my case it was easily the money I'm investing, risk and other operations 
- I didn't have a ton of time to conduct research or maybe try a second option to validate a design thinking journey, but this would serve a starting point


<img width="802" alt="image" src="https://user-images.githubusercontent.com/22302890/211977455-fa7a7671-fcca-4b15-ade4-f035a106cb5d.png">

## Code 

Comments: 

in no particular order

- All is written in typescript 
- Typings I realise are rough and minimal versions, maybe some duplication could be avoided 
- Didn't leverage next ssr features, I believe it's ssr by default but I'd have to double check 
- It is connected to the binance api, and it refreshes every 10000 seconds 
- Last time I connected something like this was using sockets. Websockets aren't that great. 
- In terms of the elements most are custom versions of flowbits the tailwind components library 
- tailwind is what I used to style the whole thing, if you spot it closely you start to see patterns emerging, specially related to how the design sort of has the same elements, but it's my visual education pulling harder than anything else 
- I would probably re write the logic, although I think in general terms it works pretty perfomantly and is aligned with the current state of "the react way of doing stuff" 

### Running it locally 
- If you want to connect to the Binance API locally you need an .env with a public key assigned to BIN_KEY at the root level

you can start the project with 
```shell
npm i 
npm run dev 
```
or 
```shell 
yarn install 
yarn dev
```

then if it gets mounted on port 3000 then you go to `http://localhost:3000/app`



## Deployed version 



![gammaswap-assignemnt vercel app_app](https://user-images.githubusercontent.com/22302890/211977718-5a7d4791-8414-4b20-b094-711f3458ad72.png)


[mvp-demo](https://gammaswap-assignemnt.vercel.app/app)



