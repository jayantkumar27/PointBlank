## What I Built

I built **PointBlank**, an unforgiving, brutally honest AI speech coach designed in a strict Neo-Brutalist aesthetic. 

I built this for a close friend who is an incredibly talented developer but struggles with "rambling" during high-stakes technical interviews and executive design reviews. Whenever they get nervous, they stack qualifiers, use filler words ("um," "like"), and take forever to get to the core point. 

PointBlank solves this by enforcing the **PREP Framework** (Point, Reason, Example, Point). It records their speech and uses an AI model to ruthlessly audit their cadence and structure. If they ramble, the AI issues a failing grade, calls out their filler words, and provides a polished rewrite of what they *should* have said.

## Demo

**Live App:** [https://point-blank-alpha.vercel.app/](https://point-blank-alpha.vercel.app/)

## Code


*(GitHub Repo: [https://github.com/jayantkumar27/PointBlank](https://github.com/jayantkumar27/PointBlank))*

## How I Built It

PointBlank is built using **React (Vite)** and **Tailwind CSS v4** to achieve a high-contrast, zero-border-radius Neo-Brutalist UI that matches the harsh nature of the coach.

For the AI pipeline:
1. **Acoustic Intake:** I used the browser's native Web Speech API to capture speech in real-time.
2. **Analysis Engine:** I integrated the **Google GenAI SDK**, leveraging the open-weight **Gemma-4-26b-a4b-it** model. I provided strict system instructions for the model to act as a "brutally honest, unforgiving English communication coach." The model takes the raw transcript, evaluates it strictly against the PREP framework, returns boolean metrics on whether each stage was hit, outputs scathing critique, and finally generates a "Master Speechwriter" rewrite.

## Why Does Open Innovation Matter?

Open innovation and open-weight models like Gemma are critical for a project like PointBlank. Closed APIs often have heavy alignment layers that mistakenly flag "brutally honest" or "harsh" personas as violations of safety policies, watering down the feedback into polite, unhelpful suggestions. 

By building around open-weight models, developers have the freedom to construct specific, highly-tuned agent personas (even unapologetically brutal ones) that serve a specific behavioral conditioning purpose without being restricted by a corporate safety filter.

## My Agent Session

This project was built iteratively with the assistance of an AI coding agent that helped translate high-fidelity neo-brutalist design mockups into raw Tailwind/React components, wired up the Web Speech API, and structured the GenAI evaluation prompts. 