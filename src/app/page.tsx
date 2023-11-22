"use client"

import React, { useState } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube, faTwitch } from "@fortawesome/free-brands-svg-icons"
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons"

const ProfileCard = () => {
  const [isDarkMode, setDarkMode] = useState(true)

  const handleThemeToggle = () => {
    return
  }

  return (
    <div
      className={`font-sans antialiased text-gray-100  leading-normal tracking-wider bg-cover min-h-[100vh]`}
      style={{ backgroundImage: "url('/bg.gif')", backgroundPosition: "center", backgroundSize: "100% 100%" }}
    >
      <div className="max-w-4xl flex items-center  lg:h-screen flex-wrap mx-auto">
        {/* Main Col */}
        <div
          id="profile"
          className={`w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl ${
            isDarkMode ? "bg-black" : "bg-white"
          } opacity-80 mx-6 lg:mx-0`}
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center opacity-100"
              style={{ backgroundImage: "url('/oficial.png')" }}
            ></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-white">Mentoria Exclusiva</h1>
            <h1 className="font-bold pt-8 lg:pt-0 text-white">Analisador Football Studio</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-yellow-300 opacity-70"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              {" "}
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="h-4 fill-current text-yellow-300 pr-4 text-white"
              />{" "}
              Acesso a áreas exclusivas no site do analisador
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              {" "}
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="h-4 fill-current text-yellow-300 pr-4 text-white"
              />{" "}
              Sala exclusiva no whatsapp{" "}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              {" "}
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="h-4 fill-current text-yellow-300 pr-4 text-white"
              />{" "}
              Adendo a fórmula 3C de forma exclusiva{" "}
            </p>
            <p className="pt-8 text-sm">
              Total apoio e suporte para você conseguir atingir suas metas diárias, semanais e mensais e principalmente:{" "}
              <span className="text-red-500 font-extrabold">NÃO</span> ser mais escravo de robos, gales e grupos de
              sinais.
            </p>

            <div className="pt-12 pb-8 flex flex-col">
              <div className="flex justify-center">
                <h2 className="font-bold pt-8 lg:pt-0 flex items-center text-white">
                  Clique e adquira por apenas <span className="text-4xl ml-2 text-yellow-300">R$299,99</span>
                </h2>
              </div>

              <a href="https://bit.ly/01Suporte" target="_blank" className="flex justify-center mt-3">
                <button className="bg-white hover:bg-yellow-500 text-black hover:text-white font-bold py-2 px-4 rounded-full">
                  Adquirir minha vaga exclusiva
                </button>
              </a>
            </div>

            <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-evenly">
              <a
                className="link"
                target="_blank"
                href="https://www.instagram.com/dinhutech/"
                data-tippy-content="@instagram_handle"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-6 fill-current text-white hover:text-yellow-300" />
              </a>
              <a
                className="link"
                target="_blank"
                href="https://www.youtube.com/@dinhuinvest"
                data-tippy-content="@youtube_handle"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-6 fill-current text-white hover:text-yellow-300" />
              </a>
              <a
                className="link"
                target="_blank"
                href="https://www.twitch.tv/dinhutech"
                data-tippy-content="@twitch_handle"
              >
                <FontAwesomeIcon icon={faTwitch} className="h-6 fill-current text-white hover:text-yellow-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Img Col */}
        <div className="w-full lg:w-2/5">
          {/* ... (rest of your code) */}
          <video
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            controls // Adicione este atributo se desejar controles de reprodução (pausar, reproduzir, etc.)
            autoPlay
            loop // Adicione este atributo se desejar que o vídeo seja reproduzido em um loop
            playsInline // Adicione este atributo para suportar a reprodução em dispositivos móveis
          >
            <source src="/fimvideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
