# Backend Challenge - Origin

## Table of Contents

- [Challenge and Solution Architecture](#challenge-solution-architecture)
- [Install](#install)
- [Run](#run)
- [Test](#test)
- [Schema](#schema)
- [HTTP verbs available](#http-verbs-available)
- [API Documentation](#api-documentation)

## Challenge and Solution Architecture
The proposed challenge can be viewed in the [challenge.md] (challenge.md) file and the proposed solution can be viewed in the [solution-architecture.md] file (solution-architecture.md)

## Install
The solution uses [node](http://nodejs.org) and [npm](https://npmjs.com). Please go check them out if you don't have them locally installed.

```sh
$ cd package/services/suitability-api
$ npm install
```

## Run

```sh
$ cd package/services/suitability-api
$ npm start
```

## Test

```sh
$ cd package/services/suitability-api
$ npm test
```


## Schema

All API access is over HTTPS, and accessed from `http://localhost:3001/suitability/`. All data is sent and received as JSON.

```bash
curl -X POST "http://localhost:3001/suitability/" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"age\": 29, \"dependents\": 1, \"income\": 300000, \"marital_status\": \"married\", \"house\": { \"ownership_status\": \"Mortgaged\" }, \"vehicle\": { \"year\": 2020 },  \"risk_questions\": [1,1,1] }"

HTTP/1.1 200 OK
access-control-allow-origin: http://localhost:3001 
connection: keep-alive 
content-length: 75 
content-security-policy: default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests 
content-type: application/json; charset=utf-8 
date: Fri,11 Dec 2020 15:23:07 GMT 
etag: W/"4b-GydE9zeBIKipuw77XmcmStuKuPg" 
expect-ct: max-age=0 
referrer-policy: no-referrer 
strict-transport-security: max-age=15552000; includeSubDomains 
vary: Origin,Accept-Encoding 
x-content-type-options: nosniff 
x-dns-prefetch-control: off 
x-download-options: noopen 
x-frame-options: SAMEORIGIN 
x-permitted-cross-domain-policies: none 
x-xss-protection: 0 

{"auto":"regular","disability":"regular","home":"regular","life":"regular"}
```

## HTTP verbs available


  Where possible, API strives to use appropriate HTTP verbs for each action.

  | Verb    | Description                                 |
  | ------- | ------------------------------------------- |
  | `POST`  | Used to calculate product suitability                |

## API Documentation

Great! Now you're ready to go to `http://localhost:3001/suitability/docs/` and try out the example!