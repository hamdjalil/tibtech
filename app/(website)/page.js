'use client'

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
    console.log("here")

  }, [])

  return (
    <div className="center-col gap-16 bg-slate-400 h-full">
      <div className="center-row top-row w-full">
        <div className="center-col flex-1">
          <div className="w-full pt-5">
            <img src="/assets/logo.svg" className="h-[100px]" />
          </div>
          <div>Request a Demo</div>
        </div>
        <div className="center-row flex-1">
          <div className="center-col noto m-10 text-[27px]">
            <div>We're your AI-first</div>
            <div>
              <span ref={element} className="gradient-text"></span>
              <span className="blinker">|</span>
            </div>
            <div>to help get it done</div>
          </div>
        </div>
      </div>
      <div className="center-col audiowide gap-1 mt-[100px]">
        <div className="experience-title text-[25px] font-bold mb-5">
          Our Experience
        </div>
        <div className="experience-row center-row gap-5">
          <img src="/assets/experience/industry/1.png" className="h-[30px]" />
          <img src="/assets/experience/industry/2.svg" className="h-[70px]" />
          <img src="/assets/experience/industry/3.png" className="h-[40px]" />
          <img src="/assets/experience/industry/4.png" className="h-[40px]" />
          <img src="/assets/experience/industry/5.png" className="h-[40px]" />
        </div>
        <div className="experience-row center-row gap-5">
          <img src="/assets/experience/academia/1.svg" className="h-[70px]" />
          <img src="/assets/experience/academia/2.png" className="h-[18px]" />
          <img src="/assets/experience/academia/3.svg" className="h-[60px]" />
          <img src="/assets/experience/academia/4.png" className="h-[40px]" />
          <img src="/assets/experience/academia/5.png" className="h-[40px]" />
          <img src="/assets/experience/academia/6.png" className="h-[40px]" />
          <img src="/assets/experience/academia/7.png" className="h-[40px]" />
        </div>
      </div>
      <div className="center-col mt-10">© Tibbling AI · All Rights Reserved</div>
    </div>
  );
}
