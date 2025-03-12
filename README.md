# **No-Build Filterable List (Preact + HTM + JSDoc)**  

This is a **re-implementation** of the **Filterable List** example from the official React documentation:  
🔗 [Thinking in React – Step 5: Add Inverse Data Flow](https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow)  

## **What's Different?**  

Instead of **React + TSX + TypeScript**, this app uses:  
✅ **Preact** – Lightweight alternative to React  
✅ **HTM** – JSX-like templates without a build step  
✅ **JSDoc** – TypeScript-like autocompletion without compilation  

The entire script **runs as-is** in the browser—no transpilation, no bundling.  
This is **fully no-build.**  

## **Should You Use This in Production?**  

⚠️ **Probably not.** Here’s why:  
- **HTM parses template strings at runtime**, making it less efficient than JSX (which is compiled).  
- **No minification or whitespace stripping**, meaning larger files and unnecessary bandwidth use.  

That said, there are **reasons** you might want to try this approach:  
- **You love FOSS transparency** – Every line of code is visible and human-readable.  
- **You're experimenting** – Modern JS can now run something **very close to JSX** natively.  
- **You just think it's cool** – And so do I!

## **Live Demo**  

🚀 **Check out the live version of this app:**  
🔗 [Live Demo on Netlify](https://nimble-smakager-14389f.netlify.app/)  

**I encourage you to inspect the page's source code** and marvel at **client-side JSX without a compiler!**  

## **Learn More**  

🔹 **HTM (JSX-like syntax in template literals)**  
[👉 HTM GitHub Repo](https://github.com/developit/htm)  
