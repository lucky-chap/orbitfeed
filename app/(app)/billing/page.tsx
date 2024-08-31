"use client";

import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "convex/react";
import { CheckIcon, Loader2, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const freeFeatures = [
  "Receive feedback for your project",
  "Future updates once a year",
  "Free entry to annual conference",
];

const paidFeatures = [
  "Everything in Free Plan",
  "Unlimited orbits & feedback",
  "Free future updates",
  "24/7 Customer Support",
];

export default function Billing() {
  const user = useQuery(api.user.viewer);

  // const { results, status, loadMore, proUser == undefined } = usePaginatedQuery(
  //   api.proUsers.checkIfUserIsPro,
  //   {
  //     // ideally, we'd want to use the orb_ck1 as the userId instead, but since convex validates the
  //     // values, this would likely cause a 500 internal server error and we wouldn't want our users to
  //     // see that would we?
  //     userId: user?._id as Id<"users">,
  //     email: user?.email as string,
  //   },
  //   { initialNumItems: 1 }
  // );

  const proUser = useQuery(api.proUsers.checkIfUserIsPro, {
    userId: user?._id as Id<"users">,
    email: user?.email as string,
  });

  console.log("Pro User: ", proUser);
  console.log(
    "id same?: ",
    proUser !== undefined && proUser?.userId === user?._id
  );

  // console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        return;
      }

      const { session } = await (
        await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
            unit_amount: 200, // $2.00
            userId: user?._id,
            email: user?.email,
          }),
        })
      ).json();

      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple no-tricks pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
            quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
          </p>
        </div> */}
        {/* FREE */}
        <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Free
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Free access to basic features. No credit card required.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">
                What&apos;s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-blue-600"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Free forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $0.00
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                <Button
                  disabled
                  className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Active
                </Button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  This is the basic plan available to all users without using a
                  credit card.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* UPGRADE */}

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Lifetime membership
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Pay once, own it forever. Credit card required.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">
                What&apos;s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {paidFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-blue-600"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, own it forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $2.00
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                <Button
                  className="mt-10 flex w-full items-center rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  onClick={
                    proUser == null || proUser == undefined
                      ? undefined
                      : () => handleCheckout()
                  }
                  // disabled={proUser !== null}
                  disabled={proUser !== null && proUser !== undefined}
                >
                  {proUser?.userId === user?._id &&
                    proUser !== undefined &&
                    "On Pro Plan"}
                  {proUser === undefined && proUser == null && "Checking..."}
                  {proUser !== undefined && proUser === null && "Buy Pro Plan"}
                </Button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Buy OrbitFeed and get access to tons of features and future
                  updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
