# Deploy your portfolio to Vercel

This folder is a standard Next.js project. Deploy the contents of `D:\portfolio\website`, not the parent folder's temporary files.

## Run in VS Code

Open `D:\portfolio\website` with File > Open Folder. In Terminal > New Terminal:

```powershell
cd "D:\portfolio\website"
npm install
npm run dev
```

Open the Local URL printed in the terminal. Stop the server with Ctrl+C.

## Publish the source to GitHub yourself

1. In VS Code, open Source Control (Ctrl+Shift+G).
2. Stage your changes, enter a message such as `Prepare portfolio for Vercel`, and commit.
3. Open the Command Palette (Ctrl+Shift+P), choose `Git: Publish to GitHub`, and sign in if prompted.
4. Create a private repository named `rakesh-portfolio`. A private source repository can still serve a public website through Vercel.
5. Confirm that the repository root contains `package.json`, `app`, and `public`.

The existing `.gitignore` excludes installed dependencies, generated builds, and local environment files. Your photo, badges, and certificates are intentionally included in `public` and will be available to visitors when you publish the website.

## Deploy on Vercel

1. Visit https://vercel.com/new and sign in with GitHub.
2. Allow Vercel to access the portfolio repository, then import it.
3. Framework Preset: **Next.js**.
4. Root Directory: **./** if `package.json` is at the repository root. If the repository contains a `website` subfolder instead, select **website**.
5. Build Command: **npm run build** (default).
6. Install Command: leave the default npm setting.
7. Output Directory: leave the Next.js default; do not enter `dist`.
8. Node.js Version: **22.x**.
9. No API keys or database are required. Leave automatic system environment variables enabled so social-preview images use your Vercel address.
10. Click **Deploy** and wait for Ready. Use the project's production `.vercel.app` address as your portfolio link.
11. Open that address in a signed-out/private browser window to confirm recruiters can access it. Check the project cards, certificate links, and contact links.

If you add a custom domain and want to explicitly control the social-preview address, set `SITE_ORIGIN` to the full HTTPS address in Vercel and redeploy. Otherwise the project uses Vercel's provided production domain automatically.

## Update later

Edit locally, commit, and push to the production branch. Vercel will build a new deployment. Your production address remains the same.

## References

- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/environment-variables/system-environment-variables
