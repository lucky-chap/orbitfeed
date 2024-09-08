<p align="center">
  <img src="public/images/landing.png" alt="Next.js and TypeScript">
</p>

<p align="left">
  <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&style=for-the-badge&color=24B36B&labelColor=000000" alt="PRs welcome!" />

</p>

<p align="left">
  <img alt="License" src="https://img.shields.io/github/license/lucky-chap/orbitfeed?style=for-the-badge&color=24B36B&labelColor=000000">
  </a>
</p>

## Intro 📜

Orbitfeed is a powerful, user-friendly platform designed to help teams gather, manage, and analyze feedback efficiently. Whether you're looking to improve a product, service, or process, this tool enables you to collect feedback from multiple users, categorize it, and derive actionable insights.

## Inspiration 🔮

In today's fast-paced, feedback-driven world, collecting and acting on user input is crucial for continuous improvement. However, existing tools often lack the collaboration features necessary to make feedback management a seamless experience for teams. Our inspiration was to create a tool that not only simplifies feedback collection but also fosters collaboration among team members, making the process more efficient and productive.

## Tech Stack 🛠️

- **[Next.js 14](https://nextjs.org)**
- **[Convex](https://convex.dev)**
- **[Tailwind UI](https://tailwindui.com)**
- **[Shadcn](https://ui.shadcn.com)**
- **[Resend](https://resend.com)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[ESLint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)**
- **[Jest](https://jestjs.io/)**

## Features ✨

- **Real-time Feedback Collection:** Collect feedback from multiple users in real-time and see responses as they come in. This was made possible by Convex's robust realtime architectrue
- **Categorization and Tagging:** Categorize feedback by type, making it easier to organize and analyze.
- **Sentiment Analysis:** Leverage AI to assess the sentiment of the feedback, providing insights into user satisfaction and concerns
- **Feedback Summarization:** Generate concise summaries of user feedback, highlighting the key points for quick decision-making
- **User-friendly Interface:** Built with Tailwind UI and Shadcn, the tool offers a clean and intuitive user interface that enhances the user experience.
- **Collaborative Workflows:** Share feedback with your team and track progress in a collaborative environment.
- **Email notifications:** Stay updated on new feedback and important actions
- **Secure Data Management:** All feedback data is securely stored and managed, ensuring privacy and compliance with data protection regulations.

## How to use 🖊️

- Make sure you are [logged in](https://orbitfeed.lol/login).
- After login, you will be redirected to the dashboard where you can [create](https://orbitfeed.lol/create) orbits (feedback projects)
- After creating an orbit, you will be redirected to [/orbits](https://orbitfeed.lol/create) route where you can see your newly created orbit. Choose any one to get started
- On the orbit page, click on the `code` button to configure your orbit
- Follow the instructions from the above step to start collecting feedback on your website
- Good luck!

## Local development 🧑‍💻

- Clone the project to get started

```
git clone https://github.com/lucky-chap/orbitfeed.git
```

- Copy the contents of `.env.example` into `.env.local` and fill with right values

Run the following commands inside the project folder:

1. `pnpm install`
2. `npx convex dev` (to get convex functions ready)
3. `pnpm dev`

To view the project open `http://localhost:3000`.

## Star ✨

Give me a star would you...

## Contributing 🤝

1. Fork this repository;
2. Create your branch: `git checkout -b my-new-feature`;
3. Commit your changes: `git commit -m 'Add some feature'`;
4. Push to the branch: `git push origin my-new-feature`.

**After your pull request is merged**, you can safely delete your branch.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more information.

## 🔗 Useful links

- https://labs.convex.dev/auth/setup
- https://labs.convex.dev/auth/config/email
- https://authjs.dev/getting-started/providers/resend
- https://labs.convex.dev/auth/authz/nextjs#preloading-and-loading-data
- https://labs.convex.dev/auth/authz/nextjs#calling-authenticated-mutations-and-actions
