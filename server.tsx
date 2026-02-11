import { Elysia } from "elysia"
import { html, Html } from "@elysiajs/html"
import { staticPlugin } from "@elysiajs/static"

new Elysia()
    .use(html())
    .use(staticPlugin())
    .get('/', () => (
        <html>
            <head>
                <link rel="stylesheet" href="public/styles.css" />
            </head>
            <body>
                <h1>Demo Hop</h1>
                <div id="notifications"></div>
                <button id="btnDemo01" data-get="/say-hello">Say hello !</button>
                <button id="btnDemo02" data-get="/say-hello-and-notify">Say hello and notify !</button>
            </body>
            <script src="/public/hop.js"></script>
        </html>
    ))
    .get('/say-hello', () => (
        <>
        <button id="btnDemo01" class="done" data-get="/hide">Hello ! Click me to hide !</button>
        </>
    ))
    .get('/say-hello-and-notify', () => (
        <>
        <button id="btnDemo02" class="done" data-get="/hide">Hello ! Notified !</button>
        <div id="notifications">
            <p>New notification !</p>
        </div>
        </>
    ))
    .get('/hide', () => (
        <>
        <button id="btnDemo01" class="hide">Bye !</button>
        </>
    ))
    .listen(8080)
    
console.log("Server running at http://localhost:8080")