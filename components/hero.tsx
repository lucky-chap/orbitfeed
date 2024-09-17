"use client";

import { useEffect } from "react";
import Image from "next/image";
import Avatar01 from "@/public/images/avatar-01.webp";
import Avatar02 from "@/public/images/avatar-02.webp";
import Avatar03 from "@/public/images/avatar-03.webp";
import Avatar04 from "@/public/images/avatar-04.webp";
import Avatar05 from "@/public/images/avatar-05.webp";
import home from "@/public/images/landing.png";
import AOS from "aos";

import "aos/dist/aos.css";

import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { ArrowRight } from "lucide-react";

import PageIllustration from "@/components/page-illustration";

import Header from "./header";
import { Button } from "./ui/button";

export default function Hero() {
  const { signIn } = useAuthActions();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <section className="relative min-h-screen overflow-x-hidden">
      <Header />
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.zinc.200/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar01}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar05}
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
              </div>
            </div>
            <h1
              className="mx-auto mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.zinc.200/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              The feedback tool that gets <br className="max-lg:hidden" /> the
              job done
              {/* The website builder you're <br className="max-lg:hidden" />
              looking for */}
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mx-auto mb-8 max-w-2xl text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                {/* Simple is a modern website builder powered by AI that changes
                how companies create user interfaces together. */}
                {/* Uniter is a collaborative event planner built to simplify
                    scheduling and bring people together seamlessly. */}
                Orbitfeed makes it simple to collect feedback from your users or
                page visitors in just a few steps!
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.zinc.200/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <Unauthenticated>
                    <Button
                      onClick={() =>
                        void signIn("github", {
                          redirectTo: "/orbits",
                        })
                      }
                      className="btn group mb-4 w-full rounded-lg bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] p-2 px-4 text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    >
                      <p className="relative inline-flex items-center">
                        Login with GitHub{" "}
                        <span className="ml-1 tracking-normal text-white transition-transform group-hover:translate-x-0.5">
                          <ArrowRight size={20} />
                        </span>
                      </p>
                    </Button>
                  </Unauthenticated>
                  <Authenticated>
                    <Link href={"/orbits"} className="w-full sm:w-auto">
                      <Button className="btn w-full rounded-lg bg-white p-2 px-4 text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto">
                        Dashboard
                      </Button>
                    </Link>
                  </Authenticated>
                  <Button className="w-full rounded-lg bg-white p-2 px-4 text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto">
                    Source Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <Image
              className="rounded-lg"
              src={home}
              width={1024}
              height={432}
              alt="Hero image"
            />
          </div>
        </div>
      </div>
      <div className="my-10 flex items-center justify-center">
        <p className="text-xs text-zinc-500">
          Crafted by{" "}
          <a
            href="https://github.com/lucky-chap"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-600 underline"
          >
            Quavo
          </a>
        </p>
      </div>
    </section>
  );
}
