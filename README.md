# GEN-UX: Generative UX proof-of-concept via Adaptive Cards
GEN-UX is a project that showcases how GPT can be used to create a multi-screen app. You don't need to write any code, just specify the type of app you want, and GPT, along with some clever prompt-engineering, take care of the rest.

Adaptive Cards are written in JSON format and can adjust to different platforms. Adaptive Cards make it easy to design lightweight UIs for different frameworks and platforms. SDKs are available for JavaScript, iOS, and Android to render Adaptive Card JSONs. Large language models like GPT have knowledge of Adaptive Cards because they have been open-source for several years.

## List app - GEN-UX Demo
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/4107912/227872778-cfd9fd0a-411b-47be-a9e3-be1f9a97d8a8.gif)

## Workout tracker app - GEN-UX Demo
![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/4107912/227877647-701df5f2-b3ed-4970-a2fa-bedbcd632f26.gif)

## High-level flow
![mermaid-diagram-2023-03-27-014337](https://user-images.githubusercontent.com/4107912/227889716-b4649a8c-b193-43db-acfb-a10069dfcfa5.svg)

## Running locally
- Update the OpenAI key in `.env.sample` file and cp it to `.env`.
- Just run `npm start`
