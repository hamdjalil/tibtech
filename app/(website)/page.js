import { useEffect, useRef } from "react";

export default function Home() {
  
  const element = useRef();

  useEffect(() => {
    const titles = [
      "health-tech partner",
      "drug discovery explorer",
      "bioimaging analyst",
      "multimodal data cruncher"
    ]

    const sleep = async (delay) => {
      return new Promise((res, _) => {
        setTimeout(res, delay)
      })
    }

    const textRoutine = async (ele) => {
      while (1) {
        for (let title of titles) {
          console.log(title)
          for (let c of title) {
            ele.innerHTML += c
            await sleep(50);
          }

          await sleep(500);

          for (let i = title.length - 2; i >= 0; i--) {
            ele.innerHTML = title.slice(0, i)
            await sleep(50);
          }
        }
      }
    }

    textRoutine(element.current)

  }, [])

  return (
    <body style="background-color: rgb(198, 198, 198);">
      <div class="center-col" style="row-gap: 60px;">
        <div class="center-row top-row" style="width: 100%;">
          <div class="center-col" style="flex: 1">
            <div class="" style="width: 100%; padding-top: 20px;">
              <img src="assets/logo.svg" style="height: 100px;" />
            </div>
            <div>Request a Demo</div>
          </div>
          <div class="center-row" style="flex: 1">
            <div class="center-col noto" style="margin: 40px; font-size: 27px;">
              <div>We're your AI-first</div>
              <div>
                <span ref={element} class="gradient-text"></span>
                <span class="blinker">|</span>
              </div>
              <div>to help get it done</div>
            </div>
          </div>
        </div>
        <div class="center-col audiowide" style="row-gap: 5px; margin-top: 100px;">
          <div class="experience-title" style="font-size: 25px; font-weight: bold; margin-bottom: 20px;">
            Our Experience
          </div>
          <div class="experience-row center-row" style="column-gap: 20px; row-gap: 10px;">
            <img src="assets/experience/industry/1.png" height="30" />
            <img src="assets/experience/industry/2.svg" height="70" />
            <img src="assets/experience/industry/3.png" height="40" />
            <img src="assets/experience/industry/4.png" height="40" />
            <img src="assets/experience/industry/5.png" height="40" />
          </div>
          <div class="experience-row center-row" style="column-gap: 20px; row-gap: 10px;">
            <img src="assets/experience/academia/1.svg" height="70" />
            <img src="assets/experience/academia/2.png" height="18" />
            <img src="assets/experience/academia/3.svg" height="60" />
            <img src="assets/experience/academia/4.png" height="40" />
            <img src="assets/experience/academia/5.png" height="40" />
            <img src="assets/experience/academia/6.png" height="40" />
            <img src="assets/experience/academia/7.png" height="40" />
          </div>
        </div>
        <div class="center-col" style="margin-top: 40px;">© Tibbling AI · All Rights Reserved</div>
      </div>
    </body>
  );
}
