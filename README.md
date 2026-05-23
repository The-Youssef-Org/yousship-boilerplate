# 🚀 Yousship Boilerplate

Welcome to **Yousship**! You now have access to the ultimate foundation for your next SaaS project. This boilerplate is designed to save you weeks of setup time so you can focus on building your features and making sales.

---

## 🛠️ Step 1: Getting Started

Since this is a private repository, **do not fork this repository**. To start your own project, follow these steps to "detach" the code and move it to your own private GitHub account:

1. **Create a NEW private repository** on your personal GitHub account (e.g., `my-new-saas`).
2. **Clone this boilerplate** to your local machine:
   ```bash
   git clone https://github.com/Built-by-Youssef/yousship-boilerplate.git my-app
   ```
3. **Enter the folder and remove the link to the original repo**:
   ```bash
   cd my-app
   rm -rf .git
   ```
4. **Initialize your own git history**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit from YouSShip"
   ```
5. **Add your new repository as the origin and push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
   git branch -M main
   git push -u origin main
   ```

---

## ⚙️ Step 2: Configuration

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. **Setup Environment Variables**:
   - Copy the example file: `cp .env.example .env.local`
   - Open `.env.local` and fill in your credentials (Supabase, Stripe etc.).

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see your app running.

---

## 📦 What's Inside?

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Google OAuth, Magic Links)
- **Payments:** [Stripe](https://stripe.com/) (Checkout + Webhooks)
- **Emails:** [Resend](https://resend.com/) (Transactional Emails)

---

## 📜 License & Usage

- Your purchase grants you a license to use this boilerplate for **unlimited personal and commercial projects**.
- **Redistribution is strictly prohibited.** You cannot resell this boilerplate or share this private repository with others.
- You have lifetime access to updates made to this repository.

---

## 🆘 Support

If you run into any issues or have questions, feel free to reach out:
- **Email:** hello@yousship.com
- **Discord/Twitter:** Yousship

Happy building! 🚀
```
