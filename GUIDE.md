<!-- # Expense Tracker: Step-by-Step Guide

Follow the tasks in order. Each one builds on the last.
Tick off every task as you finish it.

---

## PART 1: Setup (30 min)

- [ ] **1.1 Install VS Code** from https://code.visualstudio.com (a code editor).
- [ ] **1.2 Install Git** from https://git-scm.com/downloads (keep all default options).
      Check it worked: open a terminal and run `git --version`.
- [ ] **1.3 Create a GitHub account** at https://github.com (free). Pick a professional username, because it appears on your resume.
- [ ] **1.4 Make a folder** called `expense-tracker`. Put these 4 files in it: `index.html`, `style.css`, `script.js`, `README.md`.
- [ ] **1.5 Open the folder in VS Code** (File > Open Folder).
- [ ] **1.6 Install the "Live Server" extension** in VS Code. Right-click `index.html` > Open with Live Server. The page now refreshes automatically when you save. -->

---

## PART 2: Run it and understand it (about 5 hrs, spread over days)

First, use the app: add 3-4 expenses, refresh the page (they stay), delete one, try the filter.

Then read `script.js` in this order. For each chunk, do the **Try it** task before moving on.

| # | Chunk (in script.js) | What it teaches | Try it |
|---|----------------------|-----------------|--------|
| 1 | Section 1: grab elements | The DOM | Add `console.log(titleInput)` at the bottom. Open the browser console (F12) and look at the output. |
| 2 | Sections 2-3: data and localStorage | Arrays, objects, JSON | In the console type `localStorage.getItem("expenses")`. See your data as text. |
| 3 | Section 4: add expense | Events, validation | Remove `event.preventDefault()`, submit the form, see what happens, then put it back. |
| 4 | Section 5: delete | `filter()` | Add `console.log(expenses)` before and after the filter line. |
| 5 | Sections 6-7: filter and total | `filter()`, `reduce()` | Change `sum + expense.amount` to `sum + 1`. The total now counts items. Change it back. |
| 6 | Section 9: render | Creating HTML from JS | Change `"₹"` to `"Rs. "` and see it update. |
| 7 | Section 8: chart | Using a library | Change `type: "doughnut"` to `"bar"` or `"pie"`. |

**Rule:** if you can't explain a chunk in your own words, ask me. Paste the part you're confused about and I'll explain it.

- [ ] **2.1** Completed all 7 "Try it" tasks
- [ ] **2.2** Make **one small change of your own**, such as a new category, different colours, or a different currency symbol

---

## PART 3: GitHub (about 1 hr)

GitHub stores your code online. Git is the tool on your computer that tracks changes.

### 3.1 Tell Git who you are (one time only)
Open the terminal in VS Code (Terminal > New Terminal) and run:
```
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

### 3.2 Start tracking your folder
```
git init
git branch -M main
```

### 3.3 Make your first commits
A commit is a saved snapshot. Make several small ones, so your history shows real progress:
```
git add index.html
git commit -m "Add HTML structure"

git add style.css
git commit -m "Add styling"

git add script.js
git commit -m "Add expense logic with localStorage and chart"

git add README.md GUIDE.md
git commit -m "Add README"
```
Check your history with `git log --oneline`.

### 3.4 Create the repo on GitHub
1. On github.com click **+** (top right) > **New repository**.
2. Name: `expense-tracker`. Keep it **Public**.
3. Do **not** tick "Add a README" (you already have one).
4. Click **Create repository**.

### 3.5 Connect and upload (push)
GitHub shows these commands on the next page. Run them with your username:
```
git remote add origin https://github.com/YOUR-USERNAME/expense-tracker.git
git push -u origin main
```
A browser window will ask you to sign in to GitHub. Do it. Then refresh the repo page and your files are online.

### 3.6 Your daily routine from now on
After every working session:
```
git add .
git commit -m "Describe what you changed"
git push
```

- [ ] **3.1** Git configured
- [ ] **3.2** 4+ commits made locally
- [ ] **3.3** Repo created and code pushed
- [ ] **3.4** Made a small change, then committed and pushed it using the daily routine

---

## PART 4: Deployment (about 30 min)

Deploying puts your app on a public link anyone can open.

### Option A: GitHub Pages (easiest, since you're already on GitHub)
1. Open your repo on GitHub > **Settings** > **Pages** (left sidebar).
2. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
3. Wait 1-2 minutes and refresh. A link appears: `https://YOUR-USERNAME.github.io/expense-tracker/`
4. Open it on your phone too.

### Option B: Netlify (optional, also free)
1. Sign up at https://netlify.com with your GitHub account.
2. **Add new site** > **Import an existing project** > choose your repo > **Deploy**.
3. You get a link like `something.netlify.app`. You can rename it in Site settings.

Once deployed, every `git push` updates the live site automatically (give it a minute).

- [ ] **4.1** App is live on a public link
- [ ] **4.2** Tested on your phone
- [ ] **4.3** Link added to your GitHub repo's About section (the gear icon on the repo page)

---

## PART 5: Make it showcase-ready (about 2 hrs)

- [ ] **5.1** Take 2-3 screenshots (with a few sample expenses added). Save them in a folder called `screenshots` in your project.
- [ ] **5.2** Update `README.md`: add the screenshots (`![App screenshot](screenshots/home.png)`) and your live link, and tick the features list.
- [ ] **5.3** Add a "What I learned" section to the README with 3-4 honest lines.
- [ ] **5.4** Add **one feature of your own** (ideas: monthly budget warning, edit button, dark mode, CSV export). Ask me and I'll explain how it works. Commit and push it with a clear message.
- [ ] **5.5** Add the project to your resume and LinkedIn.

Resume line:
> **Expense Tracker** | HTML, CSS, JavaScript, Chart.js | Live · GitHub
> Built a responsive web app to record and filter expenses, with persistent storage using localStorage and a category-wise spending chart. Deployed on GitHub Pages.

---

## PART 6: Interview prep

Be able to answer these without looking at the code:
1. What does `event.preventDefault()` do, and why is it needed?
2. How does your data stay after a page refresh?
3. What does `render()` do, and why call it after every change?
4. What is the difference between `filter()` and `reduce()`?
5. Why use `textContent` instead of `innerHTML`?
6. What is the difference between Git and GitHub?
7. How did you deploy it?
8. What would you improve? (Good answer: add a backend with Java Spring Boot and a database so data is not tied to one browser.)

---

## Common problems

- **Page doesn't update after editing:** hard refresh with Ctrl+Shift+R, or use Live Server.
- **Chart missing:** you need internet, since Chart.js loads from a CDN.
- **`git push` rejected or asks for a password:** GitHub no longer accepts passwords in the terminal. Sign in through the browser window that appears, or tell me the exact error.
- **GitHub Pages shows 404:** make sure the file is named exactly `index.html` and wait 2 minutes.
- **Anything else:** copy the exact error message and paste it to me.
